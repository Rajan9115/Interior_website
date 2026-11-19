"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BeforeAfterSlider } from "@/components/projects/BeforeAfterSlider";
import { BeforeAfterVideo } from "@/components/projects/BeforeAfterVideo";
import { BeforeAfterPair } from "@/types/project";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

interface TransformationSectionProps {
  pairs: BeforeAfterPair[];
  projectTitle: string;
}

export function TransformationSection({
  pairs,
  projectTitle,
}: TransformationSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!pairs || pairs.length === 0) return null;

  const activePair = pairs[selectedIndex] || pairs[0];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F5F0] border-b border-[#E5E0D7]">
      <Container size="wide">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D7] text-xs font-bold uppercase tracking-wider text-[#B58A58] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transformation Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#172B40] tracking-tight">
              Before & After: Watch This Space Come to Life
            </h2>
            <p className="text-sm text-[#687381] max-w-2xl mx-auto leading-relaxed">
              Real contractor craftsmanship documented at every step — from raw masonry and structural rough-ins to completed turnkey luxury finishes for{" "}
              <strong className="text-[#172B40]">{projectTitle}</strong>.
            </p>
          </div>

          {/* Multiple Room / Scope Tabs (if > 1 pair) */}
          {pairs.length > 1 && (
            <div className="flex items-center justify-center">
              <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-xl bg-white border border-[#E5E0D7] gap-1.5 shadow-2xs">
                {pairs.map((pair, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={pair.id || idx}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                        isActive
                          ? "bg-[#172B40] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-[#F7F5F0]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-[#D9A84E]" : "bg-slate-300"
                        }`}
                      />
                      <span>{pair.roomName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Comparison Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E5E0D7] shadow-sm">
            {activePair.mediaType === "VIDEO" ? (
              <BeforeAfterVideo pair={activePair} />
            ) : (
              <BeforeAfterSlider pair={activePair} />
            )}
          </div>

          {/* Contractor Trust & Quality Reassurance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-[#E5E0D7] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#21865B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#172B40] mb-0.5">
                  100% Authentic Execution
                </h4>
                <p className="text-[11px] text-[#687381] leading-relaxed">
                  Real photos taken directly on-site under active contractor supervision. No 3D render fabrications.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E0D7] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#B58A58] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#172B40] mb-0.5">
                  Concealed Precision
                </h4>
                <p className="text-[11px] text-[#687381] leading-relaxed">
                  All concealed wiring, plumbing chases, and framing grids inspected and tested before final finishing.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5E0D7] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#21865B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#172B40] mb-0.5">
                  Turnkey Handover Standards
                </h4>
                <p className="text-[11px] text-[#687381] leading-relaxed">
                  Delivered with laser-straight alignment, flush seams, and itemized client accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
