"use client";

import { useEffect, useRef } from "react";

type Dot = {
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  r: number;
  baseOpacity: number;
  phase: number;
  speed: number;
  isAccent: boolean;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const DEFAULT_FONT_FAMILY =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export function LetterParticles({
  letter = "H",
  letters,
  className,
  masterSize = 320,
  formed = false,
  tone = "dark",
  interactive = true,
  fontFamily = DEFAULT_FONT_FAMILY,
  fontWeight = 800,
  fontScale = 0.85,
  animated = true,
  intensity = 1,
  density,
  coverage = 1,
  sizeVariance = 1.4,
  glow = false,
  holdFormedAfterFirstComplete = false,
  onComplete,
  onFormedChange,
}: {
  letter?: string;
  /** List of technology icons/monograms to cycle through at each scatter interval */
  letters?: string[];
  className?: string;
  masterSize?: number;
  /** Skip the scatter/assemble cycle and hold a near-formed, gently breathing shape. */
  formed?: boolean;
  /** Base dot color: "dark" dots for light backgrounds, "light" dots for dark backgrounds. */
  tone?: "dark" | "light";
  interactive?: boolean;
  /** CSS font-family used to rasterize the letter silhouette. */
  fontFamily?: string;
  fontWeight?: number;
  /** Font size as a fraction of masterSize. */
  fontScale?: number;
  /** Render a single static frame instead of the continuous twinkle/breathing loop. */
  animated?: boolean;
  /** Opacity multiplier for a lighter/softer look without shrinking dots to invisibility. */
  intensity?: number;
  /** Sampling step in master-canvas px; larger = fewer, more spaced-out dots. Overrides the auto formula. */
  density?: number;
  /** Fraction of sampled dots to keep (0-1). Lower values give a sparser, half-formed look. */
  coverage?: number;
  /** Multiplier for dot radius randomness range; higher gives more size variety/texture. */
  sizeVariance?: number;
  /** Add a soft glow behind each dot for a luminous look. */
  glow?: boolean;
  /** Once initial formation completes, lock into gentle breathing formed state instead of scattering again. */
  holdFormedAfterFirstComplete?: boolean;
  /** Callback fired when the letter first reaches full formation. */
  onComplete?: () => void;
  /** Callback reporting formation progress (0 to 1). */
  onFormedChange?: (progress: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onFormedChangeRef = useRef(onFormedChange);
  onFormedChangeRef.current = onFormedChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let hasCompleted = false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const shapesList = letters && letters.length > 0 ? letters : [letter];
    let currentShapeIndex = 0;

    let dots: Dot[] = [];
    const size = masterSize;
    let raf = 0;
    const cycleMs = 6400;
    const pointer = { x: 0, y: 0, active: false };
    const pointerEased = { x: 0, y: 0 };
    const baseColor = tone === "light" ? "255, 255, 255" : "10, 10, 10";

    const targetPointsCache: Record<string, { x: number; y: number }[]> = {};

    function rasterizeTechIcon(shape: string): { x: number; y: number }[] {
      const normalizedKey = shape.trim().toLowerCase();
      if (targetPointsCache[normalizedKey]) return targetPointsCache[normalizedKey];

      const s = size;
      const offscreen = document.createElement("canvas");
      offscreen.width = s;
      offscreen.height = s;
      const octx = offscreen.getContext("2d");
      if (!octx) return [];

      const cx = s / 2;
      const cy = s / 2;

      octx.fillStyle = "#000";
      octx.strokeStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      switch (normalizedKey) {
        case "h": {
          octx.font = `800 ${s * 0.65}px ${fontFamily}`;
          octx.fillText("H", cx, cy + s * 0.035);
          break;
        }

        case "react": {
          // React Nucleus
          octx.beginPath();
          octx.arc(cx, cy, s * 0.045, 0, Math.PI * 2);
          octx.fill();

          // 3 Orbital Ellipses
          octx.lineWidth = s * 0.024;
          for (const angle of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
            octx.save();
            octx.translate(cx, cy);
            octx.rotate(angle);
            octx.beginPath();
            octx.ellipse(0, 0, s * 0.27, s * 0.095, 0, 0, Math.PI * 2);
            octx.stroke();
            octx.restore();
          }
          break;
        }

        case "nextjs":
        case "next.js": {
          // Next.js Circle Frame
          octx.lineWidth = s * 0.024;
          octx.beginPath();
          octx.arc(cx, cy, s * 0.28, 0, Math.PI * 2);
          octx.stroke();

          // 'N' Stems
          octx.lineWidth = s * 0.038;
          octx.beginPath();
          octx.moveTo(cx - s * 0.12, cy - s * 0.16);
          octx.lineTo(cx - s * 0.12, cy + s * 0.16);
          octx.stroke();

          octx.beginPath();
          octx.moveTo(cx - s * 0.12, cy - s * 0.16);
          octx.lineTo(cx + s * 0.14, cy + s * 0.18);
          octx.stroke();

          octx.beginPath();
          octx.moveTo(cx + s * 0.14, cy - s * 0.16);
          octx.lineTo(cx + s * 0.14, cy + s * 0.04);
          octx.stroke();
          break;
        }

        case "typescript":
        case "ts": {
          // Rounded square badge
          const bw = s * 0.54;
          octx.lineWidth = s * 0.024;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, s * 0.10);
          octx.stroke();

          octx.font = `800 ${s * 0.27}px ${fontFamily}`;
          octx.fillText("TS", cx, cy + s * 0.02);
          break;
        }

        case "tailwind":
        case "tailwind css": {
          // Twin aerodynamic waves
          octx.lineWidth = s * 0.032;
          octx.beginPath();
          // Wave 1
          octx.moveTo(cx - s * 0.24, cy - s * 0.04);
          octx.bezierCurveTo(
            cx - s * 0.14,
            cy - s * 0.20,
            cx - s * 0.04,
            cy - s * 0.20,
            cx + s * 0.06,
            cy - s * 0.05
          );
          octx.bezierCurveTo(
            cx + s * 0.13,
            cy + s * 0.05,
            cx + s * 0.18,
            cy - s * 0.02,
            cx + s * 0.23,
            cy - s * 0.12
          );
          // Wave 2
          octx.moveTo(cx - s * 0.24, cy + s * 0.11);
          octx.bezierCurveTo(
            cx - s * 0.14,
            cy - s * 0.05,
            cx - s * 0.04,
            cy - s * 0.05,
            cx + s * 0.06,
            cy + s * 0.10
          );
          octx.bezierCurveTo(
            cx + s * 0.13,
            cy + s * 0.20,
            cx + s * 0.18,
            cy + s * 0.13,
            cx + s * 0.23,
            cy + s * 0.03
          );
          octx.stroke();
          break;
        }

        case "javascript":
        case "js": {
          // Rounded square badge
          const bw = s * 0.54;
          octx.lineWidth = s * 0.024;
          octx.beginPath();
          octx.roundRect(cx - bw / 2, cy - bw / 2, bw, bw, s * 0.10);
          octx.stroke();

          octx.font = `800 ${s * 0.27}px ${fontFamily}`;
          octx.fillText("JS", cx, cy + s * 0.02);
          break;
        }

        case "html5":
        case "html": {
          // Shield outline
          octx.lineWidth = s * 0.024;
          octx.beginPath();
          octx.moveTo(cx - s * 0.22, cy - s * 0.25);
          octx.lineTo(cx + s * 0.22, cy - s * 0.25);
          octx.lineTo(cx + s * 0.18, cy + s * 0.16);
          octx.lineTo(cx, cy + s * 0.27);
          octx.lineTo(cx - s * 0.18, cy + s * 0.16);
          octx.closePath();
          octx.stroke();

          octx.font = `800 ${s * 0.26}px ${fontFamily}`;
          octx.fillText("5", cx, cy + s * 0.02);
          break;
        }

        case "wordpress":
        case "wp": {
          // Circle + W
          octx.lineWidth = s * 0.024;
          octx.beginPath();
          octx.arc(cx, cy, s * 0.28, 0, Math.PI * 2);
          octx.stroke();

          octx.font = `800 ${s * 0.30}px ${fontFamily}`;
          octx.fillText("W", cx, cy + s * 0.03);
          break;
        }

        case "figma": {
          const r = s * 0.075;
          octx.lineWidth = s * 0.024;
          // 5 Figma Bubbles
          octx.beginPath();
          octx.arc(cx - r, cy - 2 * r, r, 0, Math.PI * 2);
          octx.stroke();
          octx.beginPath();
          octx.arc(cx + r, cy - 2 * r, r, 0, Math.PI * 2);
          octx.stroke();
          octx.beginPath();
          octx.arc(cx - r, cy, r, 0, Math.PI * 2);
          octx.stroke();
          octx.beginPath();
          octx.arc(cx + r, cy, r, 0, Math.PI * 2);
          octx.stroke();
          octx.beginPath();
          octx.arc(cx - r, cy + 2 * r, r, 0, Math.PI * 2);
          octx.stroke();
          break;
        }

        case "git": {
          // Diamond badge
          octx.save();
          octx.translate(cx, cy);
          octx.rotate(Math.PI / 4);
          octx.lineWidth = s * 0.024;
          const d = s * 0.35;
          octx.beginPath();
          octx.roundRect(-d / 2, -d / 2, d, d, s * 0.06);
          octx.stroke();
          octx.restore();

          // Branch lines
          octx.lineWidth = s * 0.026;
          octx.beginPath();
          octx.moveTo(cx - s * 0.06, cy - s * 0.10);
          octx.lineTo(cx - s * 0.06, cy + s * 0.10);
          octx.moveTo(cx - s * 0.06, cy);
          octx.quadraticCurveTo(cx, cy, cx + s * 0.09, cy - s * 0.06);
          octx.stroke();

          // Nodes
          octx.beginPath();
          octx.arc(cx - s * 0.06, cy - s * 0.10, s * 0.03, 0, Math.PI * 2);
          octx.fill();
          octx.beginPath();
          octx.arc(cx - s * 0.06, cy + s * 0.10, s * 0.03, 0, Math.PI * 2);
          octx.fill();
          octx.beginPath();
          octx.arc(cx + s * 0.09, cy - s * 0.06, s * 0.03, 0, Math.PI * 2);
          octx.fill();
          break;
        }

        default: {
          // Fallback glyph
          octx.font = `800 ${s * 0.50}px ${fontFamily}`;
          octx.fillText(shape, cx, cy + s * 0.03);
          break;
        }
      }

      const imageData = octx.getImageData(0, 0, s, s);
      const step = density ?? Math.max(3, Math.round(s / 46));
      const points: { x: number; y: number }[] = [];

      for (let y = 0; y < s; y += step) {
        for (let x = 0; x < s; x += step) {
          const alpha = imageData.data[(y * s + x) * 4 + 3];
          if (alpha > 110 && Math.random() < coverage) {
            points.push({
              x: x + (Math.random() - 0.5) * step * 0.6,
              y: y + (Math.random() - 0.5) * step * 0.6,
            });
          }
        }
      }

      targetPointsCache[normalizedKey] = points;
      return points;
    }

    function buildInitialDots() {
      const initialShape = shapesList[0];
      const targetPts = rasterizeTechIcon(initialShape);
      const dotR = size * 0.0055;
      const next: Dot[] = [];

      const count = Math.max(targetPts.length, 360);

      for (let i = 0; i < count; i++) {
        const pt = targetPts[i % targetPts.length] || {
          x: size / 2,
          y: size / 2,
        };

        const randomAngle = Math.random() * Math.PI * 2;
        const randomDist = Math.random() * size * 0.6 + size * 0.15;

        const sx = size / 2 + Math.cos(randomAngle) * randomDist;
        const sy = size / 2 + Math.sin(randomAngle) * randomDist;

        next.push({
          tx: pt.x,
          ty: pt.y,
          sx,
          sy,
          r: Math.random() * dotR * sizeVariance + dotR * 0.6,
          baseOpacity: Math.random() * 0.5 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.75,
          isAccent: Math.random() < 0.12,
        });
      }
      dots = next;
    }

    function updateTargetsForShape(shape: string) {
      const targetPts = rasterizeTechIcon(shape);
      if (targetPts.length === 0) return;

      dots.forEach((d, idx) => {
        const pt = targetPts[idx % targetPts.length];
        d.tx = pt.x;
        d.ty = pt.y;
      });
    }

    function resizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let lastCycleIndex = -1;

    function draw(elapsed: number) {
      const rect = canvas!.getBoundingClientRect();
      const scale = Math.min(rect.width / size, rect.height / size);
      const offsetX = (rect.width - size * scale) / 2;
      const offsetY = (rect.height - size * scale) / 2;

      let eased: number;
      if (!animated) {
        eased = 1;
        if (!hasCompleted) {
          hasCompleted = true;
          onCompleteRef.current?.();
        }
      } else if (formed || (holdFormedAfterFirstComplete && hasCompleted)) {
        eased = prefersReducedMotion
          ? 1
          : 0.94 + 0.06 * Math.sin(elapsed / 2200);
      } else {
        const cycleIndex = Math.floor(elapsed / cycleMs);
        if (cycleIndex !== lastCycleIndex) {
          lastCycleIndex = cycleIndex;
          if (shapesList.length > 1) {
            currentShapeIndex = cycleIndex % shapesList.length;
            updateTargetsForShape(shapesList[currentShapeIndex]);
          }
        }

        const tNorm = (elapsed % cycleMs) / cycleMs;
        const formAmount =
          0.5 + 0.5 * Math.sin(tNorm * Math.PI * 2 - Math.PI / 2);
        eased = formAmount * formAmount * (3 - 2 * formAmount);

        if (!hasCompleted && (eased >= 0.95 || tNorm >= 0.48)) {
          hasCompleted = true;
          onCompleteRef.current?.();
        }
      }
      onFormedChangeRef.current?.(eased);

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

      for (const d of dots) {
        const drift = animated ? 1 - eased * 0.65 : 0;
        const driftX =
          Math.sin((elapsed / 1400) * d.speed + d.phase) * 2.2 * drift;
        const driftY =
          Math.cos((elapsed / 1700) * d.speed + d.phase) * 2.2 * drift;

        const px =
          lerp(d.sx, d.tx, eased) +
          driftX +
          pointerEased.x * (0.3 + drift * 0.4);
        const py =
          lerp(d.sy, d.ty, eased) +
          driftY +
          pointerEased.y * (0.3 + drift * 0.4);

        const twinkle =
          !animated || prefersReducedMotion
            ? 1
            : 0.7 + 0.3 * Math.sin(elapsed / 900 + d.phase);
        const rawOpacity = d.baseOpacity * twinkle * (0.55 + 0.45 * eased);
        const opacity =
          (formed ? Math.max(rawOpacity, 0.3) : rawOpacity) * intensity;

        const finalRadius = Math.max(d.r * scale, formed ? 0.95 : 0.4);
        const dotColor = d.isAccent
          ? `rgba(255, 56, 76, ${opacity})`
          : `rgba(${baseColor}, ${opacity * 0.85})`;

        if (glow) {
          ctx!.shadowColor = d.isAccent
            ? `rgba(255, 56, 76, ${opacity * 0.9})`
            : `rgba(${baseColor}, ${opacity * 0.6})`;
          ctx!.shadowBlur = finalRadius * 2.5;
        }

        ctx!.beginPath();
        ctx!.arc(
          offsetX + px * scale,
          offsetY + py * scale,
          finalRadius,
          0,
          Math.PI * 2
        );
        ctx!.fillStyle = dotColor;
        ctx!.fill();

        if (glow) {
          ctx!.shadowBlur = 0;
        }
      }

      if (animated && !prefersReducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    buildInitialDots();
    resizeCanvas();

    if (!animated || prefersReducedMotion) {
      draw(formed ? 0 : cycleMs * 0.25);
    } else {
      draw(0);
      raf = requestAnimationFrame(draw);
      if (interactive) {
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerleave", handlePointerLeave);
      }
    }

    const handleResize = () => {
      resizeCanvas();
      if (!animated || prefersReducedMotion) {
        draw(formed ? 0 : cycleMs * 0.25);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [
    letter,
    letters,
    masterSize,
    formed,
    tone,
    interactive,
    fontFamily,
    fontWeight,
    fontScale,
    animated,
    intensity,
    density,
    coverage,
    sizeVariance,
    glow,
    holdFormedAfterFirstComplete,
  ]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
