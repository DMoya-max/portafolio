"use client";

import { Mouse } from "lucide-react";
import { useEffect, useRef } from "react";

type RainMeta = {
  x: number;
  baseY: number;
  speed: number;
  alpha: number;
};

type Glyph = {
  x: number;
  y: number;
  ex: number;
  ey: number;
  spin: number;
  char: string;
  color: string;
  size: number;
  bold?: boolean;
  rain?: RainMeta;
};

type RasterizedParticle = {
  originX: number;
  originY: number;
  char: string;
  explodedX: number;
  explodedY: number;
  color: string;
};

type Drawable = Pick<Glyph, "ex" | "ey" | "spin" | "char" | "color" | "size" | "bold">;

const WEB_COLORS = ["#7F1D1D", "#991B1B", "#DC2626"];
const FONT_STACK = "ui-monospace, SFMono-Regular, Menlo, monospace";
const ENTRY_DURATION = 1800;
const EXPLOSION_LIMIT = 0.85;
const SPRITE_SIZE = 24;
const RAIN_WRAP = 20;

function randomChar() {
  return Math.random() > 0.5 ? "1" : "0";
}

function webColor() {
  return WEB_COLORS[Math.floor(Math.random() * WEB_COLORS.length)];
}

function explosionTarget(x: number, y: number, spread: number) {
  const angle = Math.atan2(y, x) + (Math.random() - 0.5) * 0.55;
  const speed = spread + Math.random() * spread * 1.8;
  return {
    x: x + Math.cos(angle) * speed,
    y: y + Math.sin(angle) * speed,
  };
}

function makeGlyph(x: number, y: number, size: number, color: string, spread: number): Glyph {
  const target = explosionTarget(x, y, spread);
  return {
    x,
    y,
    ex: target.x,
    ey: target.y,
    spin: (Math.random() - 0.5) * Math.PI * 2.6,
    char: randomChar(),
    color,
    size,
  };
}

function buildWeb(radius: number): Glyph[] {
  const glyphs: Glyph[] = [];
  const spacing = 22;

  for (let spoke = 0; spoke < 16; spoke += 1) {
    const angle = (spoke / 16) * Math.PI * 2;
    const count = Math.floor(radius / spacing);
    for (let i = 1; i <= count; i += 1) {
      const distance = i * spacing;
      glyphs.push(
        makeGlyph(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          9,
          webColor(),
          radius * 0.55,
        ),
      );
    }
  }

  for (let ring = 1; ring <= 6; ring += 1) {
    const ringRadius = (ring / 6) * radius;
    const count = Math.max(8, Math.round((Math.PI * 2 * ringRadius) / spacing));
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + ring * 0.07;
      glyphs.push(
        makeGlyph(
          Math.cos(angle) * ringRadius,
          Math.sin(angle) * ringRadius,
          9,
          webColor(),
          radius * 0.5,
        ),
      );
    }
  }
  return glyphs;
}

function generateSpiderManBinaryParticles(width: number, height: number): RasterizedParticle[] {
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return [];

  const cx = width / 2;
  const cy = height * 0.46;
  // Escala responsiva para que quepa completa tanto en móvil como en escritorio
  const scale =
    width < 640
      ? Math.min(width * 0.78, height * 0.5)
      : Math.min(width * 0.62, height * 0.56);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";

  // Helper para transformar coordenadas normalizadas (-1 a 1) a píxeles de pantalla
  const px = (nx: number) => cx + nx * scale;
  const py = (ny: number) => cy + ny * scale;

  // 1. CEFALOTÓRAX (Cabeza / Tórax central afilado)
  ctx.beginPath();
  ctx.moveTo(px(0), py(-0.24));
  ctx.lineTo(px(0.085), py(-0.14));
  ctx.lineTo(px(0.095), py(-0.02));
  ctx.lineTo(px(0), py(0.05));
  ctx.lineTo(px(-0.095), py(-0.02));
  ctx.lineTo(px(-0.085), py(-0.14));
  ctx.closePath();
  ctx.fill();

  // Quelíceros (dos pequeñas pinzas frontales arriba)
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(px(s * 0.02), py(-0.22));
    ctx.lineTo(px(s * 0.045), py(-0.29));
    ctx.lineTo(px(s * 0.015), py(-0.26));
    ctx.closePath();
    ctx.fill();
  }

  // 2. ABDOMEN (Forma de diamante alargado / reloj de arena estilo Spider-Man)
  ctx.beginPath();
  ctx.moveTo(px(0), py(0.04));
  ctx.quadraticCurveTo(px(0.13), py(0.16), px(0), py(0.46));
  ctx.quadraticCurveTo(px(-0.13), py(0.16), px(0), py(0.04));
  ctx.closePath();
  ctx.fill();

  // 3. LAS 8 PATAS ANGULARES DE SPIDER-MAN (Simetría perfecta: s = -1 izquierda, s = 1 derecha)
  const legs = [
    // Pata 1: Superior delantera (sube hacia arriba con quiebre angular)
    [
      [0.06, -0.15],
      [0.28, -0.24],
      [0.24, -0.62],
      [0.16, -0.84],
      [0.19, -0.6],
      [0.21, -0.29],
      [0.05, -0.2],
    ],
    // Pata 2: Media-superior (se abre ancho y sube en ángulo)
    [
      [0.08, -0.1],
      [0.44, -0.15],
      [0.46, -0.5],
      [0.37, -0.72],
      [0.4, -0.48],
      [0.37, -0.2],
      [0.08, -0.14],
    ],
    // Pata 3: Media-inferior (se abre y cae larga en ángulo recto afilado)
    [
      [0.08, -0.04],
      [0.48, 0.08],
      [0.5, 0.52],
      [0.38, 0.8],
      [0.43, 0.5],
      [0.4, 0.14],
      [0.07, 0],
    ],
    // Pata 4: Inferior trasera (envuelve el abdomen hacia abajo y adentro)
    [
      [0.06, 0.02],
      [0.3, 0.18],
      [0.28, 0.62],
      [0.15, 0.9],
      [0.21, 0.6],
      [0.22, 0.23],
      [0.04, 0.06],
    ],
  ];

  for (const s of [-1, 1]) {
    for (const poly of legs) {
      ctx.beginPath();
      poly.forEach(([nx, ny], idx) => {
        if (idx === 0) ctx.moveTo(px(s * nx), py(ny));
        else ctx.lineTo(px(s * nx), py(ny));
      });
      ctx.closePath();
      ctx.fill();
    }
  }

  // 4. ESCANEAR PÍXELES ACTIVOS Y CONVERTIRLOS EN MATRIZ DE 0 Y 1
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const step = width < 640 ? 9 : 11;
  const particles: RasterizedParticle[] = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = imageData[(y * width + x) * 4 + 3];
      if (alpha > 128) {
        const angle = Math.atan2(y - cy, x - cx);
        const dist = Math.hypot(x - cx, y - cy);
        particles.push({
          originX: x,
          originY: y,
          char: Math.random() > 0.5 ? "1" : "0",
          explodedX: x + Math.cos(angle) * (dist * 2.4 + 180 + Math.random() * 220),
          explodedY: y + Math.sin(angle) * (dist * 2.4 + 180 + Math.random() * 220),
          color: Math.random() > 0.3 ? "#EF4444" : "#DC2626",
        });
      }
    }
  }

  return particles;
}

function toSpiderGlyphs(particles: RasterizedParticle[], width: number, height: number): Glyph[] {
  const cx = width / 2;
  const cy = height / 2;
  return particles.map((particle) => ({
    x: particle.originX - cx,
    y: particle.originY - cy,
    ex: particle.explodedX - cx,
    ey: particle.explodedY - cy,
    spin: (Math.random() - 0.5) * Math.PI * 2.6,
    char: particle.char,
    color: particle.color,
    size: width < 640 ? 9 : 11,
    bold: true,
  }));
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function assignRain(glyphs: Glyph[], width: number, height: number) {
  const colSpacing = width < 640 ? 38 : 48;
  const totalCols = Math.max(1, Math.floor(width / colSpacing));
  // El paso real se ajusta a width/totalCols para que la ultima columna
  // llegue hasta el borde derecho sin dejar un margen sin lluvia.
  const gap = width / totalCols;
  const maxRain = totalCols * 16;
  let i = 0;

  for (let index = 0; index < glyphs.length && i < maxRain; index += 1) {
    // Seleccion determinista del ~37.5% de los digitos.
    if (index % 8 >= 3) continue;
    const glyph = glyphs[index];
    const colIndex = i % totalCols;
    i += 1;

    glyph.rain = {
      x: colIndex * gap + gap * 0.5,
      baseY: Math.random() * height,
      speed: 0.4 + Math.random() * 0.7,
      alpha: 0.1 + Math.random() * 0.12,
    };
    glyph.spin = 0;
  }
}

function createDigitSprite(char: "0" | "1", muted = false) {
  const sprite = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  sprite.width = SPRITE_SIZE * dpr;
  sprite.height = SPRITE_SIZE * dpr;

  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;

  ctx.scale(dpr, dpr);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold 14px ${FONT_STACK}`;
  ctx.fillStyle = muted ? "#991B1B" : "#EF4444";
  ctx.shadowColor = muted ? "transparent" : "#DC2626";
  ctx.shadowBlur = muted ? 0 : 8;
  ctx.fillText(char, SPRITE_SIZE / 2, SPRITE_SIZE / 2);

  return sprite;
}

export function BinarySpiderIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const sprite0 = createDigitSprite("0");
    const sprite1 = createDigitSprite("1");
    const rainSprite0 = createDigitSprite("0", true);
    const rainSprite1 = createDigitSprite("1", true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let fitScale = 1;
    let web: Glyph[] = [];
    let spider: Glyph[] = [];
    let currentProgress = 0;
    let frame = 0;
    let animationId = 0;
    const mountedAt = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      fitScale = Math.min(1, (Math.min(width, height) * 0.76) / 470);
      web = buildWeb((Math.max(width, height) * 0.7) / fitScale);
      spider = toSpiderGlyphs(generateSpiderManBinaryParticles(width, height), width, height);
      assignRain(spider, width, height);
    };

    const readScroll = () => {
      const stage = document.getElementById("intro");
      if (!stage) return;
      const top = stage.getBoundingClientRect().top + window.scrollY;
      targetProgress.current = clamp((window.scrollY - top) / Math.max(stage.offsetHeight, 1));
    };

    const onResize = () => {
      resize();
      readScroll();
    };
    const onScroll = () => readScroll();

    resize();
    readScroll();
    currentProgress = targetProgress.current;
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const render = (now: number) => {
      currentProgress += (targetProgress.current - currentProgress) * 0.14;

      const progress = currentProgress;
      const frames = now / (1000 / 60);
      const centerX = width / 2;
      const centerY = height / 2;
      const entryRaw = reduceMotion ? 1 : clamp((now - mountedAt) / ENTRY_DURATION);
      const entry = progress > 0.01 ? 1 : easeOutCubic(entryRaw);
      const burst = easeInOutCubic(clamp(progress / EXPLOSION_LIMIT));
      const particleAlpha = 1 - smoothstep(0.1, EXPLOSION_LIMIT, progress);
      const webScale = 0.02 + 0.98 * entry;
      const breath = 1 + Math.sin(now / 720) * 0.008 * (1 - burst);
      const spiderScale = (0.05 + 0.95 * entry) * breath;
      const reveal = smoothstep(0.04, 0.82, progress);

      frame += 1;
      if (frame % 6 === 0) {
        for (const glyph of spider) {
          if (Math.random() < (progress > 0.02 ? 0.2 : 0.12)) glyph.char = randomChar();
        }
        for (const glyph of web) {
          if (Math.random() < 0.042) glyph.char = randomChar();
        }
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgba(9,9,11,${1 - reveal})`;
      context.fillRect(0, 0, width, height);

      const drawGlyph = (
        glyph: Drawable,
        x: number,
        y: number,
        alpha: number,
        spriteSize: number,
        muted: boolean,
      ) => {
        if (alpha <= 0.01) return;
        if (x < -40 || x > width + 40 || y < -40 || y > height + 40) return;

        const sprite = glyph.char === "1"
          ? (muted ? rainSprite1 : sprite1)
          : (muted ? rainSprite0 : sprite0);
        context.globalAlpha = alpha;

        const rotation = glyph.spin * burst;
        if (Math.abs(rotation) > 0.002) {
          context.save();
          context.translate(x, y);
          context.rotate(rotation);
          context.drawImage(sprite, -spriteSize / 2, -spriteSize / 2, spriteSize, spriteSize);
          context.restore();
        } else {
          context.drawImage(sprite, x - spriteSize / 2, y - spriteSize / 2, spriteSize, spriteSize);
        }
      };

      for (const glyph of web) {
        const distance = Math.hypot(glyph.x, glyph.y);
        const woven = clamp((entry * Math.max(width, height) * 0.72 - distance * webScale * fitScale) / 90 + 0.25);
        const originX = glyph.x * webScale * fitScale;
        const originY = glyph.y * webScale * fitScale;
        const x = centerX + originX + (glyph.ex * fitScale - originX) * burst;
        const y = centerY + originY + (glyph.ey * fitScale - originY) * burst;
        drawGlyph(glyph, x, y, 0.42 * particleAlpha * woven, Math.max(11, glyph.size * fitScale * 1.4), false);
      }

      for (const glyph of spider) {
        const originX = glyph.x * spiderScale;
        const originY = glyph.y * spiderScale;

        if (glyph.rain) {
          const rain = glyph.rain;
          const rainY =
            ((rain.baseY + frames * rain.speed) % (height + RAIN_WRAP * 2)) - RAIN_WRAP;
          // origin y rain son coordenadas absolutas del viewport: interpolar
          // directamente evita sumar dos veces el centro de la pantalla.
          const originAbsX = centerX + originX;
          const originAbsY = centerY + originY;
          const x = originAbsX + (rain.x - originAbsX) * burst;
          const y = originAbsY + (rainY - originAbsY) * burst;
          const alpha = 1 + (rain.alpha - 1) * burst;

          if (burst < 0.999) drawGlyph(glyph, x, y, alpha * (1 - burst), SPRITE_SIZE, false);
          if (burst > 0.001) drawGlyph(glyph, x, y, alpha * burst, SPRITE_SIZE, true);
          continue;
        }

        const x = centerX + originX + (glyph.ex - originX) * burst;
        const y = centerY + originY + (glyph.ey - originY) * burst;
        drawGlyph(glyph, x, y, particleAlpha, SPRITE_SIZE, false);
      }

      context.globalAlpha = 1;

      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - smoothstep(0.02, 0.18, progress));
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 h-screen w-screen">
      <canvas ref={canvasRef} className="block h-screen w-screen" />
      <div
        ref={hintRef}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-4 text-center sm:bottom-12"
      >
        <Mouse size={20} className="animate-pulse text-ruby sm:size-6" strokeWidth={1.4} />
        <p className="font-mono text-xs tracking-[0.12em] text-red-200/90 sm:text-sm sm:tracking-[0.24em]">
          [ DESLIZA PARA EXPLORAR ]
        </p>
      </div>
    </div>
  );
}
