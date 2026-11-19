"use client";

import React, { useState } from "react";
import {
  Hammer,
  Sparkles,
  Columns,
  Square,
  ShieldCheck,
} from "lucide-react";
import { BeforeAfterPair } from "@/types/project";

interface BeforeAfterVideoProps {
  pair: BeforeAfterPair;
}

export function BeforeAfterVideo({ pair }: BeforeAfterVideoProps) {
  const [activeStage, setActiveStage] = useState<"before" | "after">("after");
  const [viewMode, setViewMode] = useState<"single" | "dual">("single");

  const { before, after } = pair;

  return (
    <div className="space-y-4">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#E5E0D7]">
        {/* Stage Toggle Pills (for Single Player Mode) */}
        {viewMode === "single" ? (
          <div className="inline-flex items-center p-1 rounded-lg bg-[#F7F5F0] border border-[#E5E0D7] gap-1">
            <button
              type="button"
              onClick={() => setActiveStage("before")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeStage === "before"
                  ? "bg-[#172B40] text-amber-300 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Hammer className="w-3.5 h-3.5 text-amber-400" />
              <span>{before.label || "Raw Site Walkthrough (Before)"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveStage("after")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeStage === "after"
                  ? "bg-[#172B40] text-emerald-300 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{after.label || "Handover Walkthrough (After)"}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172B40]">
            <ShieldCheck className="w-4 h-4 text-[#21865B]" />
            <span>Side-by-Side On-Site Video Comparison</span>
          </div>
        )}

        {/* View Mode Switcher (Single vs Dual View) */}
        <div className="inline-flex items-center p-1 rounded-lg bg-[#F7F5F0] border border-[#E5E0D7] gap-1 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("single")}
            aria-label="Single video player view"
            className={`p-1.5 rounded-md font-medium transition-all ${
              viewMode === "single"
                ? "bg-white text-[#172B40] shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Single Player with A/B Toggle"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("dual")}
            aria-label="Side-by-side dual video view"
            className={`p-1.5 rounded-md font-medium transition-all ${
              viewMode === "dual"
                ? "bg-white text-[#172B40] shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
            title="Side-by-Side Dual Players"
          >
            <Columns className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Stage: Single Player Mode */}
      {viewMode === "single" && (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#E5E0D7] shadow-md group">
          <video
            key={activeStage === "before" ? before.url : after.url}
            src={activeStage === "before" ? before.url : after.url}
            controls
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Active Stage Floating Badge */}
          <div className="absolute top-4 left-4 pointer-events-none">
            {activeStage === "before" ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#172B40]/90 text-amber-300 text-xs font-bold backdrop-blur-md border border-amber-400/30 shadow-md">
                <Hammer className="w-3.5 h-3.5 text-amber-400" />
                <span>{before.label || "Raw Site Walkthrough"}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 text-xs font-bold backdrop-blur-md border border-emerald-400/30 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{after.label || "Turnkey Handover Walkthrough"}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Video Stage: Side-by-Side Dual View Mode */}
      {viewMode === "dual" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before Video */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800">
              <span className="flex items-center gap-1.5">
                <Hammer className="w-3.5 h-3.5 text-amber-600" />
                <span>{before.label || "Raw Site Video"}</span>
              </span>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#E5E0D7] shadow-sm">
              <video
                src={before.url}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* After Video */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{after.label || "Handover Video"}</span>
              </span>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#E5E0D7] shadow-sm">
              <video
                src={after.url}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Caption */}
      <p className="text-xs text-[#687381] font-medium leading-relaxed">
        {activeStage === "before" ? before.caption : after.caption}
      </p>
    </div>
  );
}
