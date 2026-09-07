"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  r: number;
  baseOpacity: number;
  phase: number;
  speed: number;
  isAccent: boolean;
  accentColor?: string;
};

type ShapeType =
  | "H"
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "javascript"
  | "html5"
  | "wordpress"
  | "figma"
  | "git";

interface ShapeConfig {
  id: ShapeType;
  label: string;
  sublabel: string;
  accentColor: string; // RGB string "r, g, b"
}

const TECH_STACK_SHAPES: ShapeConfig[] = [
  { id: "H", label: "H", sublabel: "Hiteshri", accentColor: "42, 92, 218" },
  { id: "react", label: "React", sublabel: "React.js", accentColor: "8, 126, 164" },
  { id: "nextjs", label: "Next.js", sublabel: "Next.js", accentColor: "30, 30, 30" },
  { id: "typescript", label: "TS", sublabel: "TypeScript", accentColor: "49, 120, 198" },
  { id: "tailwind", label: "Tailwind", sublabel: "Tailwind CSS", accentColor: "56, 189, 248" },
  { id: "javascript", label: "JS", sublabel: "JavaScript", accentColor: "234, 179, 8" },
  { id: "html5", label: "HTML5", sublabel: "HTML5 & CSS3", accentColor: "228, 77, 38" },
  { id: "wordpress", label: "WordPress", sublabel: "WP Theme Dev", accentColor: "33, 117, 155" },
  { id: "figma", label: "Figma", sublabel: "UI & Design", accentColor: "162, 89, 255" },
  { id: "git", label: "Git", sublabel: "Version Control", accentColor: "240, 80, 50" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const DEFAULT_FONT_FAMILY =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export function HeroParticlesVisual({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const size = 360;
    const TOTAL_PARTICLES = 520;
    let particles: Particle[] = [];
    let raf = 0;

    const pointer = { x: 0, y: 0, active: false };
    const pointerEased = { x: 0, y: 0 };
    const baseColor = "15, 15, 15";

    const shapeTargetsCache: Record<string, { x: number; y: number }[]> = {};

    function rasterizeShape(shapeId: ShapeType): { x: number; y: number }[] {
      if (shapeTargetsCache[shapeId]) return shapeTargetsCache[shapeId];

      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const octx = offscreen.getContext("2d");
      if (!octx) return [];

      const cx = size / 2;
      const cy = size / 2;

      octx.fillStyle = "#000";
      octx.strokeStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      switch (shapeId) {
        case "H": {
          octx.font = `800 ${size * 0.68}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("H", cx, cy + size * 0.03);
          break;
        }

        case "react": {
          // Bold React Atom Badge
          octx.beginPath();
          octx.arc(cx, cy, size * 0.075, 0, Math.PI * 2);
          octx.fill();

          octx.lineWidth = size * 0.045;
          for (const angle of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
            octx.save();
            octx.translate(cx, cy);
            octx.rotate(angle);
            octx.beginPath();
            octx.ellipse(0, 0, size * 0.31, size * 0.12, 0, 0, Math.PI * 2);
            octx.stroke();
            octx.restore();
          }
          break;
        }

        case "nextjs": {
          // Bold Next.js 'N' Badge
          octx.font = `800 ${size * 0.52}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("N", cx, cy + size * 0.03);

          octx.lineWidth = size * 0.038;
          octx.beginPath();
          octx.arc(cx, cy, size * 0.33, 0, Math.PI * 2);
          octx.stroke();
          break;
        }

        case "typescript": {
          // Bold TypeScript 'TS' in Square Badge
          octx.font = `800 ${size * 0.40}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("TS", cx, cy + size * 0.02);

          const bw = size * 0.66;
          octx.lineWidth = size * 0.036;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, size * 0.12);
          octx.stroke();
          break;
        }

        case "tailwind": {
          // Bold Tailwind 'TW' in Square Badge
          octx.font = `800 ${size * 0.38}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("TW", cx, cy + size * 0.02);

          const bw = size * 0.66;
          octx.lineWidth = size * 0.036;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, size * 0.12);
          octx.stroke();
          break;
        }

        case "javascript": {
          // Bold JavaScript 'JS' in Square Badge
          octx.font = `800 ${size * 0.40}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("JS", cx, cy + size * 0.02);

          const bw = size * 0.66;
          octx.lineWidth = size * 0.036;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, size * 0.12);
          octx.stroke();
          break;
        }

        case "html5": {
          // Bold 'HTML' in Square Badge
          octx.font = `800 ${size * 0.34}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("HTML", cx, cy + size * 0.02);

          const bw = size * 0.66;
          octx.lineWidth = size * 0.036;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, size * 0.12);
          octx.stroke();
          break;
        }

        case "wordpress": {
          // Bold WordPress 'WP' in Circle Badge
          octx.font = `800 ${size * 0.40}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("WP", cx, cy + size * 0.02);

          octx.lineWidth = size * 0.038;
          octx.beginPath();
          octx.arc(cx, cy, size * 0.33, 0, Math.PI * 2);
          octx.stroke();
          break;
        }

        case "figma": {
          // Bold Figma 'FIG' in Square Badge
          octx.font = `800 ${size * 0.36}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("FIG", cx, cy + size * 0.02);

          const bw = size * 0.66;
          octx.lineWidth = size * 0.036;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, size * 0.12);
          octx.stroke();
          break;
        }

        case "git": {
          // Bold 'GIT' in Square Badge
          octx.font = `800 ${size * 0.38}px ${DEFAULT_FONT_FAMILY}`;
          octx.fillText("GIT", cx, cy + size * 0.02);

          const bw = size * 0.66;
          octx.lineWidth = size * 0.036;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, size * 0.12);
          octx.stroke();
          break;
        }
      }

      const imageData = octx.getImageData(0, 0, size, size);
      const points: { x: number; y: number }[] = [];
      const step = 5;

      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const alpha = imageData.data[(y * size + x) * 4 + 3];
          if (alpha > 100) {
            points.push({
              x: x + (Math.random() - 0.5) * step * 0.6,
              y: y + (Math.random() - 0.5) * step * 0.6,
            });
          }
        }
      }

      shapeTargetsCache[shapeId] = points;
      return points;
    }

    function initParticles() {
      const hPoints = rasterizeShape("H");
      const dotR = size * 0.0055;
      const next: Particle[] = [];

      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const pt = hPoints[i % hPoints.length] || {
          x: size / 2 + (Math.random() - 0.5) * size * 0.6,
          y: size / 2 + (Math.random() - 0.5) * size * 0.6,
        };

        const randomAngle = Math.random() * Math.PI * 2;
        const randomDist = Math.random() * size * 0.8 + size * 0.2;

        const sx = size / 2 + Math.cos(randomAngle) * randomDist;
        const sy = size / 2 + Math.sin(randomAngle) * randomDist;

        next.push({
          x: sx,
          y: sy,
          sx,
          sy,
          tx: pt.x,
          ty: pt.y,
          r: Math.random() * dotR * 1.5 + dotR * 0.6,
          baseOpacity: Math.random() * 0.45 + 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.75,
          isAccent: Math.random() < 0.16,
          accentColor: TECH_STACK_SHAPES[0].accentColor,
        });
      }
      particles = next;
    }

    function assignTargetShape(shapeIndex: number) {
      const shapeConfig = TECH_STACK_SHAPES[shapeIndex];
      const targetPts = rasterizeShape(shapeConfig.id);
      if (targetPts.length === 0) return;

      particles.forEach((p, idx) => {
        const targetPt = targetPts[idx % targetPts.length];
        p.sx = p.x;
        p.sy = p.y;
        p.tx = targetPt.x + (Math.random() - 0.5) * 2;
        p.ty = targetPt.y + (Math.random() - 0.5) * 2;
        p.accentColor = shapeConfig.accentColor;
      });
    }

    function resizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let currentShapeIndex = 0;
    let phase: "initial_assemble" | "holding" | "morphing" = "initial_assemble";
    let phaseStartTime = performance.now();

    const INITIAL_ASSEMBLE_MS = 2200;
    const HOLD_MS = 3200;
    const MORPH_MS = 1300;

    function draw(now: number) {
      const elapsedInPhase = now - phaseStartTime;
      const rect = canvas!.getBoundingClientRect();
      const scale = Math.min(rect.width / size, rect.height / size) * 0.90;
      const offsetX = (rect.width - size * scale) / 2;
      const offsetY = (rect.height - size * scale) / 2;

      let morphT = 1;

      if (phase === "initial_assemble") {
        const rawT = Math.min(1, elapsedInPhase / INITIAL_ASSEMBLE_MS);
        morphT = easeInOutCubic(rawT);
        if (rawT >= 1) {
          phase = "holding";
          phaseStartTime = now;
        }
      } else if (phase === "morphing") {
        const rawT = Math.min(1, elapsedInPhase / MORPH_MS);
        morphT = easeInOutCubic(rawT);
        if (rawT >= 1) {
          phase = "holding";
          phaseStartTime = now;
        }
      } else if (phase === "holding") {
        morphT = 1;
        if (!prefersReducedMotion && elapsedInPhase >= HOLD_MS) {
          const nextIndex = (currentShapeIndex + 1) % TECH_STACK_SHAPES.length;
          currentShapeIndex = nextIndex;
          assignTargetShape(nextIndex);
          phase = "morphing";
          phaseStartTime = now;
        }
      }

      pointerEased.x = lerp(
        pointerEased.x,
        pointer.active ? pointer.x : 0,
        0.06
      );
      pointerEased.y = lerp(
        pointerEased.y,
        pointer.active ? pointer.y : 0,
        0.06
      );

      ctx!.clearRect(0, 0, rect.width, rect.height);

      for (const p of particles) {
        const baseX = lerp(p.sx, p.tx, morphT);
        const baseY = lerp(p.sy, p.ty, morphT);

        const isFormedState = phase === "holding" || morphT > 0.85;
        const driftAmount = isFormedState ? 1.5 : 2.8;
        const driftX = Math.sin((now / 1500) * p.speed + p.phase) * driftAmount;
        const driftY = Math.cos((now / 1800) * p.speed + p.phase) * driftAmount;

        const currentX = baseX + driftX + pointerEased.x * (0.3 + p.speed * 0.2);
        const currentY = baseY + driftY + pointerEased.y * (0.3 + p.speed * 0.2);

        p.x = currentX;
        p.y = currentY;

        const twinkle =
          prefersReducedMotion
            ? 1
            : 0.75 + 0.25 * Math.sin(now / 900 + p.phase);
        const opacity = p.baseOpacity * twinkle * (0.6 + 0.4 * morphT);

        const radius = Math.max(p.r * scale, 0.95);
        const accent = p.accentColor || TECH_STACK_SHAPES[currentShapeIndex].accentColor;
        const color = p.isAccent
          ? `rgba(${accent}, ${opacity})`
          : `rgba(${baseColor}, ${opacity * 0.88})`;

        ctx!.beginPath();
        ctx!.arc(
          offsetX + currentX * scale,
          offsetY + currentY * scale,
          radius,
          0,
          Math.PI * 2
        );
        ctx!.fillStyle = color;
        ctx!.fill();
      }

      if (!cancelled) {
        raf = requestAnimationFrame(draw);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * -18;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    initParticles();
    resizeCanvas();
    phaseStartTime = performance.now();
    raf = requestAnimationFrame(draw);

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className={`relative aspect-square w-full max-w-[440px] ${className ?? ""}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
}
