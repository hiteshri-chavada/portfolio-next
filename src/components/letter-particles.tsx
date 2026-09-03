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
  'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

export function LetterParticles({
  letter = "H",
  className,
  masterSize = 320,
  formed = false,
  tone = "dark",
  interactive = true,
  fontFamily = DEFAULT_FONT_FAMILY,
  fontWeight = 800,
  fontScale = 0.92,
  animated = true,
  intensity = 1,
  density,
  coverage = 1,
  sizeVariance = 1.4,
  glow = false,
}: {
  letter?: string;
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
  /** Font size as a fraction of masterSize; lower for scripts with wide swashes. */
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
}) {
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

    let dots: Dot[] = [];
    const size = masterSize;
    let raf = 0;
    const cycleMs = 7000;
    const pointer = { x: 0, y: 0, active: false };
    const pointerEased = { x: 0, y: 0 };
    const baseColor = tone === "light" ? "255, 255, 255" : "10, 10, 10";
    const fontSpec = `${fontWeight} ${size * fontScale}px ${fontFamily}`;

    function buildDots() {
      const s = size;
      const offscreen = document.createElement("canvas");
      offscreen.width = s;
      offscreen.height = s;
      const octx = offscreen.getContext("2d");
      if (!octx) return;

      octx.fillStyle = "#000";
      octx.font = fontSpec;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(letter, s / 2, s / 2 + s * 0.04);

      const imageData = octx.getImageData(0, 0, s, s);
      const step = density ?? Math.max(3, Math.round(s / 46));
      const dotR = s * 0.0055;
      const next: Dot[] = [];
      for (let y = 0; y < s; y += step) {
        for (let x = 0; x < s; x += step) {
          const alpha = imageData.data[(y * s + x) * 4 + 3];
          if (alpha > 120 && Math.random() < coverage) {
            next.push({
              tx: x + (Math.random() - 0.5) * step * 0.6,
              ty: y + (Math.random() - 0.5) * step * 0.6,
              sx: Math.random() * s * 1.2 - s * 0.1,
              sy: Math.random() * s * 1.2 - s * 0.1,
              r: Math.random() * dotR * sizeVariance + dotR * 0.6,
              baseOpacity: Math.random() * 0.5 + 0.4,
              phase: Math.random() * Math.PI * 2,
              speed: Math.random() * 0.5 + 0.75,
              isAccent: Math.random() < 0.08,
            });
          }
        }
      }
      dots = next;
    }

    function resizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(elapsed: number) {
      const rect = canvas!.getBoundingClientRect();
      const scale = Math.min(rect.width / size, rect.height / size);
      const offsetX = (rect.width - size * scale) / 2;
      const offsetY = (rect.height - size * scale) / 2;

      let eased: number;
      if (!animated) {
        eased = 1;
      } else if (formed) {
        eased = prefersReducedMotion
          ? 1
          : 0.92 + 0.08 * Math.sin(elapsed / 2200);
      } else {
        const tNorm = (elapsed % cycleMs) / cycleMs;
        const formAmount =
          0.5 + 0.5 * Math.sin(tNorm * Math.PI * 2 - Math.PI / 2);
        eased = formAmount * formAmount * (3 - 2 * formAmount);
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
          ? `rgba(42, 92, 218, ${opacity})`
          : `rgba(${baseColor}, ${opacity * 0.85})`;

        if (glow) {
          ctx!.shadowColor = d.isAccent
            ? `rgba(42, 92, 218, ${opacity * 0.9})`
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
        raf = requestAnimationFrame((t) => draw(t));
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * -24;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    // Paint immediately with whatever font is synchronously available so the
    // mark is never blank while a web font (if any) is still loading.
    buildDots();
    resizeCanvas();

    if (!animated || prefersReducedMotion) {
      draw(formed ? 0 : cycleMs * 0.25);
    } else {
      draw(0);
      raf = requestAnimationFrame((t) => draw(t));
      if (interactive) {
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerleave", handlePointerLeave);
      }
    }

    // Once the requested font is actually ready, rebuild against correct
    // glyph metrics. The running rAF loop (if any) picks this up next frame.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts
        .load(fontSpec)
        .then(() => {
          if (cancelled) return;
          buildDots();
          if (!animated || prefersReducedMotion) {
            draw(formed ? 0 : cycleMs * 0.25);
          }
        })
        .catch(() => {});
    }

    // Resizing a <canvas> always clears its bitmap. When there's no running
    // rAF loop (static/non-animated marks) nothing would ever repaint it, so
    // force a redraw here too.
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
  ]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
