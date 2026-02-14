"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import SF90XXScrollCanvas from "@/components/SF90XXScrollCanvas";
import SF90XXExperience from "@/components/SF90XXExperience";
import { TOTAL_FRAMES, IMAGE_FOLDER_PATH } from "@/data/carData";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <main className="bg-ferrari-black text-white">
      <Navbar scrollYProgress={scrollYProgress} />

      {/* ── Scroll-locked cinematic section ──────── */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SF90XXScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
            imageFolderPath={IMAGE_FOLDER_PATH}
            className="absolute inset-0 z-0"
          />
          <SF90XXExperience
            scrollYProgress={scrollYProgress}
            className="absolute inset-0 z-10 pointer-events-none"
          />
        </div>
      </section>

      {/* ── Post-sequence content ────────────────── */}
      <section className="relative z-20 bg-ferrari-black">
        <div className="max-w-7xl mx-auto px-8 py-24">
          {/* Divider */}
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-rosso-corsa/30 to-transparent" />
            <span className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.4em] text-white/20 uppercase">
              SF90 XX Stradale
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-rosso-corsa/30 to-transparent" />
          </div>

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "1,030", unit: "PS", label: "Total Power" },
              { value: "2.3", unit: "s", label: "0–100 km/h" },
              { value: "320+", unit: "km/h", label: "Top Speed" },
              { value: "799", unit: "units", label: "Limited Production" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                  <span className="text-sm md:text-base text-rosso-corsa ml-1">
                    {stat.unit}
                  </span>
                </div>
                <div className="font-[family-name:var(--font-rajdhani)] text-xs tracking-[0.3em] uppercase text-white/30 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Heritage blurb */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-[family-name:var(--font-rajdhani)] text-lg text-white/40 leading-relaxed">
              Born from the legendary XX Programme — Ferrari&apos;s exclusive
              track-only development lab — the SF90 XX Stradale is the first
              to bring that extreme engineering philosophy to a road-legal
              hypercar. Every surface, every component, every line of code
              exists to push the boundaries of what&apos;s possible.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 px-8 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-[family-name:var(--font-orbitron)] text-sm tracking-[0.2em] text-rosso-corsa">
              SF90 XX
            </span>
            <span className="font-[family-name:var(--font-rajdhani)] text-xs tracking-[0.2em] text-white/20">
              © {new Date().getFullYear()} Ferrari S.p.A. All rights reserved.
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}
