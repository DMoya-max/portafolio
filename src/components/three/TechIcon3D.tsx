"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { brandPaths } from "@/lib/brand-paths";

type IconPart = {
  geometry: THREE.ExtrudeGeometry;
  useAccent: boolean;
};

function createExtrudedIcon(pathData: string): IconPart[] {
  const loader = new SVGLoader();
  const parsed = loader.parse(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${pathData}" /></svg>`,
  );

  const shapes: THREE.Shape[] = [];
  for (const path of parsed.paths) {
    shapes.push(...SVGLoader.createShapes(path));
  }

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

  for (const geometry of geometries) {
    geometry.scale(1, -1, 1);
    geometry.computeVertexNormals();
  }

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

  return geometries.map((geometry) => {
    const box = new THREE.Box3().setFromBufferAttribute(
      geometry.getAttribute("position") as THREE.BufferAttribute,
    );
    const partSize = new THREE.Vector3();
    box.getSize(partSize);
    return {
      geometry,
      useAccent: partSize.x * partSize.y < totalArea * 0.045,
    };
  });
}

export function TechIcon3D({
  iconKey,
  hovered,
}: {
  iconKey: string;
  hovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const path = brandPaths[iconKey] ?? "";
  const parts = useMemo(() => createExtrudedIcon(path), [path]);

  useEffect(
    () => () => parts.forEach((part) => part.geometry.dispose()),
    [parts],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetY = (hovered ? 0.85 : 0.16) + state.pointer.x * (hovered ? 0.55 : 0.18);
    const targetX = (hovered ? -0.22 : -0.08) - state.pointer.y * (hovered ? 0.38 : 0.12);

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 4.5, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 4.5, delta);
    group.rotation.z += delta * (hovered ? 0.12 : 0.035);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ffffff", "#050505", 0.9]} />
      <pointLight position={[3, 3, 5]} color="#FF4D4D" intensity={70} distance={18} />
      <pointLight position={[-3, -2, 3]} color="#FFFFFF" intensity={30} distance={18} />
      <pointLight position={[0, 1, -4]} color="#DC2626" intensity={22} distance={16} />

      <Float speed={1.5} rotationIntensity={0.22} floatIntensity={0.5}>
        <group ref={groupRef}>
          {parts.map((part, index) => (
            <mesh key={index} geometry={part.geometry}>
              <meshStandardMaterial
                color={part.useAccent ? "#18181B" : "#DC2626"}
                metalness={0.72}
                roughness={0.24}
                emissive="#DC2626"
                emissiveIntensity={0.09}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </>
  );
}
