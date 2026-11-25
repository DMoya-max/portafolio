"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { getBrandPaths } from "@/lib/brand-paths";

type IconPart = {
  geometry: THREE.ExtrudeGeometry;
  useAccent: boolean;
};

function createExtrudedIcon(iconKey: string): IconPart[] {
  const loader = new SVGLoader();
  const pathData = getBrandPaths(iconKey);
  const isMobile = iconKey === "reactnative";

  const shapeGroups = pathData.map((data) => {
    const parsed = loader.parse(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${data}" /></svg>`,
    );
    return parsed.paths.flatMap((path) => SVGLoader.createShapes(path));
  });
  const atomShapeCount = isMobile ? (shapeGroups[0]?.length ?? 0) : 0;
  const shapes = shapeGroups.flat();

  const geometries = shapes.map(
    (shape) =>
      new THREE.ExtrudeGeometry(shape, {
        depth: 1.5,
        bevelEnabled: true,
        bevelThickness: 0.18,
        bevelSize: 0.14,
        bevelOffset: 0,
        bevelSegments: 2,
        curveSegments: 8,
        steps: 1,
      }),
  );

  geometries.forEach((geometry, index) => {
    if (isMobile) {
      if (index < atomShapeCount) {
        geometry.scale(0.56, 0.56, 0.56);
        geometry.translate(5.28, 5.28, 0.45);
      } else {
        geometry.translate(0, 0, -0.45);
      }
    }
    geometry.scale(1, -1, 1);
    geometry.computeVertexNormals();
  });

  const combined = new THREE.Box3();
  for (const geometry of geometries) {
    geometry.computeBoundingBox();
    if (geometry.boundingBox) combined.union(geometry.boundingBox);
  }

  const center = combined.getCenter(new THREE.Vector3());
  const size = combined.getSize(new THREE.Vector3());
  const factor = 2.35 / Math.max(size.x, size.y, 1);
  const totalArea = Math.max(size.x * size.y, 1);

  for (const geometry of geometries) {
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.scale(factor, factor, factor);
  }

  return geometries.map((geometry, index) => {
    const box = new THREE.Box3().setFromBufferAttribute(
      geometry.getAttribute("position") as THREE.BufferAttribute,
    );
    const partSize = new THREE.Vector3();
    box.getSize(partSize);
    return {
      geometry,
      useAccent: isMobile
        ? index >= atomShapeCount
        : partSize.x * partSize.y < totalArea * 0.045,
    };
  });
}

export function TechIcon3D({ iconKey, hovered = false }: { iconKey: string; hovered?: boolean }) {
  const parts = useMemo(() => createExtrudedIcon(iconKey), [iconKey]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(
    () => () => parts.forEach((part) => part.geometry.dispose()),
    [parts],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.x = 0;
    group.rotation.z = 0;
    group.rotation.y += delta * (hovered ? 0.85 : 0.45);
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 3, 4]} color="#ffffff" intensity={1.0} />
      <pointLight position={[-2, -1, 3]} color="#DC2626" intensity={0.9} />

      <group ref={groupRef} rotation={[0, 0, 0]} scale={1.05}>
        {parts.map((part, index) => (
          <mesh key={index} geometry={part.geometry}>
            <meshStandardMaterial
              color={part.useAccent ? "#B91C1C" : "#71717A"}
              metalness={0.55}
              roughness={0.42}
              emissive={part.useAccent ? "#7F1D1D" : "#000000"}
              emissiveIntensity={part.useAccent ? 0.15 : 0}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
