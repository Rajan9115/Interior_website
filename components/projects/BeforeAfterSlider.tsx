"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Hammer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  RotateCcw,
} from "lucide-react";
import { BeforeAfterPair } from "@/types/project";

interface BeforeAfterSliderProps {
  pair: BeforeAfterPair;
  aspectRatio?: string;
}

export function BeforeAfterSlider({
  pair,
  aspectRatio = "aspect-[16/10] sm:aspect-[16/9]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    const clampedPos = Math.max(0, Math.min(100, rawPos));
    setSliderPosition(clampedPos);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already lost
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setSliderPosition(0);
    } else if (e.key === "End") {
      setSliderPosition(100);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen]);

  const { before, after } = pair;

  return (
    <div className="space-y-3 select-none">
      {/* Interactive Drag Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Before and after transformation comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-[#172B40] border border-[#E5E0D7] shadow-lg cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A58] touch-none`}
      >
        {/* Layer 1: AFTER Image (Base Layer) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={after.url}
            alt={after.altText || "Finished handover after renovation"}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Layer 2: BEFORE Image (Clipped Top Layer) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: isDragging ? "none" : "clip-path 200ms ease-out",
          }}
        >
          <Image
            src={before.url}
            alt={before.altText || "Raw site state before renovation"}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Floating Badges */}
        {/* Left Badge: BEFORE */}
        <div
          className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md transition-opacity duration-200 ${
            sliderPosition < 15
              ? "opacity-30"
              : "opacity-100 bg-[#172B40]/85 text-amber-200 border border-amber-300/30"
          }`}
        >
          <Hammer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{before.label || "BEFORE · Raw Site"}</span>
        </div>

        {/* Right Badge: AFTER */}
        <div
          className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md transition-opacity duration-200 ${
            sliderPosition > 85
              ? "opacity-30"
              : "opacity-100 bg-emerald-950/85 text-emerald-200 border border-emerald-400/30"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{after.label || "AFTER · Handover"}</span>
        </div>

        {/* Vertical Divider Handle Line */}
        <div
          className="absolute inset-y-0 z-20 pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            transition: isDragging ? "none" : "left 200ms ease-out",
          }}
        >
          {/* Vertical Line */}
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)]" />

          {/* Center Grab Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#172B40] shadow-2xl border-2 border-white/80 flex items-center justify-center backdrop-blur-xs transition-transform duration-150 group-active:scale-95">
            <div className="flex items-center text-[#B58A58]">
              <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
              <ChevronRight className="w-3.5 h-3.5 -ml-1" />
            </div>
          </div>
        </div>

        {/* Contractor Authenticity Pill (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium border border-white/10 pointer-events-none">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Authentic On-Site Transformation</span>
        </div>

        {/* Fullscreen Viewer Button (Bottom Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          aria-label="View side-by-side fullscreen comparison"
          className="absolute bottom-4 right-4 z-10 p-2 rounded-lg bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A58]"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quick View Controls Bar & Captions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
        {/* Caption */}
        <p className="text-[#687381] font-medium max-w-xl leading-relaxed">
          {pair.description || (
            <span>
              Slide horizontally or use quick buttons to inspect the raw site execution versus turnkey handover finish.
            </span>
          )}
        </p>

        {/* Quick Position Switcher Pills */}
        <div className="inline-flex items-center p-1 rounded-lg bg-[#F7F5F0] border border-[#E5E0D7] gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              sliderPosition === 100
                ? "bg-[#172B40] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            Raw Site (Before)
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1 ${
              sliderPosition === 50
                ? "bg-[#172B40] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            <RotateCcw className="w-3 h-3 text-[#B58A58]" />
            50/50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              sliderPosition === 0
                ? "bg-[#172B40] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-white"
            }`}
          >
            Handover (After)
          </button>
        </div>
      </div>

      {/* Fullscreen Comparison Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen before and after comparison"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <h4 className="text-base font-bold tracking-tight">
                {pair.roomName} — Transformation Comparison
              </h4>
              <p className="text-xs text-white/60">
                Side-by-side comparison of raw on-site execution vs finished handover.
              </p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen viewer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Side-by-Side Dual View Stage */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 py-4 min-h-0">
            {/* Before Stage */}
            <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 flex flex-col">
              <div className="relative flex-1 min-h-0">
                <Image
                  src={before.url}
                  alt={before.altText || "Before"}
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>
              <div className="p-3 bg-black/80 border-t border-white/10 flex items-center justify-between text-xs text-amber-200">
                <span className="font-semibold flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-amber-400" />
                  <span>{before.label || "Raw Site / Before"}</span>
                </span>
                <span className="text-white/60 truncate max-w-xs">{before.caption}</span>
              </div>
            </div>

            {/* After Stage */}
            <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 flex flex-col">
              <div className="relative flex-1 min-h-0">
                <Image
                  src={after.url}
                  alt={after.altText || "After"}
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>
              <div className="p-3 bg-black/80 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200">
                <span className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{after.label || "Turnkey Handover / After"}</span>
                </span>
                <span className="text-white/60 truncate max-w-xs">{after.caption}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
