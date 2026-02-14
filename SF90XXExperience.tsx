"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { heroData, designData, powertrainData } from "@/data/carData";

interface SF90XXExperienceProps {
    scrollYProgress: MotionValue<number>;
    className?: string;
}

export default function SF90XXExperience({
    scrollYProgress,
    className = "",
}: SF90XXExperienceProps) {
    return (
        <div className={`${className}`}>
            <HeroPhase scrollYProgress={scrollYProgress} />
            <DesignPhase scrollYProgress={scrollYProgress} />
            <PowertrainPhase scrollYProgress={scrollYProgress} />
        </div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO PHASE (0 → 0.33)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroPhase({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.33], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.33], [40, 0, 0, -30]);
    const titleScale = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.33], [0.95, 1, 1, 0.97]);

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
            style={{ opacity, y }}
        >
            {/* Top line accent */}
            <motion.div
                className="w-16 h-[1px] bg-rosso-corsa mb-8"
                style={{ scaleX: useTransform(scrollYProgress, [0, 0.08], [0, 1]) }}
            />

            {/* Title */}
            <motion.h1
                className="font-[family-name:var(--font-orbitron)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[0.1em] text-center text-white text-glow-red leading-tight"
                style={{ scale: titleScale }}
            >
                {heroData.title.split(" ").map((word, i) => (
                    <span key={i}>
                        {word === "SF90" || word === "XX" || word === "STRADALE" ? (
                            <span className="text-rosso-corsa">{word}</span>
                        ) : (
                            word
                        )}
                        {i < heroData.title.split(" ").length - 1 && " "}
                    </span>
                ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="font-[family-name:var(--font-rajdhani)] text-base sm:text-lg md:text-xl tracking-[0.25em] uppercase text-white/60 mt-4 md:mt-6 text-center"
                style={{
                    opacity: useTransform(scrollYProgress, [0.02, 0.08], [0, 1]),
                }}
            >
                {heroData.subtitle}
            </motion.p>

            {/* Price */}
            <motion.div
                className="mt-6 md:mt-8 flex flex-col items-center gap-1"
                style={{
                    opacity: useTransform(scrollYProgress, [0.04, 0.1], [0, 1]),
                }}
            >
                <span className="font-[family-name:var(--font-orbitron)] text-sm md:text-base tracking-[0.15em] text-bright-gold text-glow-gold">
                    {heroData.price}
                </span>
                <span className="font-[family-name:var(--font-rajdhani)] text-xs tracking-[0.2em] text-white/30">
                    {heroData.priceAlt}
                </span>
            </motion.div>

            {/* CTA */}
            <motion.div
                className="mt-8 md:mt-10 pointer-events-auto"
                style={{
                    opacity: useTransform(scrollYProgress, [0.05, 0.12], [0, 1]),
                }}
            >
                <button className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.25em] uppercase px-8 py-3 border border-bright-gold/60 text-bright-gold hover:bg-bright-gold/10 hover:border-bright-gold transition-all duration-300 hud-glow-gold cursor-pointer">
                    {heroData.cta}
                </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{
                    opacity: useTransform(scrollYProgress, [0, 0.02, 0.08, 0.15], [0, 1, 1, 0]),
                }}
            >
                <span className="font-[family-name:var(--font-rajdhani)] text-[10px] tracking-[0.4em] uppercase text-white/30">
                    Scroll to explore
                </span>
                <motion.div
                    className="w-[1px] h-8 bg-gradient-to-b from-rosso-corsa/60 to-transparent"
                    animate={{ scaleY: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DESIGN PHASE (0.33 → 0.66)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DesignPhase({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const opacity = useTransform(
        scrollYProgress,
        [0.30, 0.38, 0.58, 0.66],
        [0, 1, 1, 0]
    );
    const x = useTransform(
        scrollYProgress,
        [0.30, 0.38, 0.58, 0.66],
        [-60, 0, 0, 60]
    );

    return (
        <motion.div
            className="absolute inset-0 flex items-center z-10 pointer-events-none px-8 md:px-16 lg:px-24"
            style={{ opacity }}
        >
            <motion.div className="max-w-xl" style={{ x }}>
                {/* Phase label */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-[1px] bg-rosso-corsa" />
                    <span className="font-[family-name:var(--font-rajdhani)] text-xs tracking-[0.4em] uppercase text-white/40">
                        Aerodynamics
                    </span>
                </div>

                {/* Title */}
                <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.08em] text-rosso-corsa text-glow-red mb-6">
                    {designData.title}
                </h2>

                {/* Description */}
                <p className="font-[family-name:var(--font-rajdhani)] text-base md:text-lg leading-relaxed text-white/70 mb-8">
                    {designData.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                    {designData.highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            style={{
                                opacity: useTransform(
                                    scrollYProgress,
                                    [0.36 + i * 0.03, 0.39 + i * 0.03],
                                    [0, 1]
                                ),
                                x: useTransform(
                                    scrollYProgress,
                                    [0.36 + i * 0.03, 0.39 + i * 0.03],
                                    [-20, 0]
                                ),
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-rosso-corsa mt-2 shrink-0" />
                            <span className="font-[family-name:var(--font-rajdhani)] text-sm md:text-base text-white/50 tracking-wide">
                                {item}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                    className="mt-8 h-[1px] bg-gradient-to-r from-rosso-corsa/40 to-transparent"
                    style={{
                        scaleX: useTransform(scrollYProgress, [0.38, 0.45], [0, 1]),
                        transformOrigin: "left",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   POWERTRAIN PHASE (0.66 → 1.0)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PowertrainPhase({
    scrollYProgress,
}: {
    scrollYProgress: MotionValue<number>;
}) {
    const opacity = useTransform(
        scrollYProgress,
        [0.63, 0.71, 0.92, 1.0],
        [0, 1, 1, 0.8]
    );
    const x = useTransform(
        scrollYProgress,
        [0.63, 0.71, 0.92, 1.0],
        [60, 0, 0, 0]
    );

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-end z-10 pointer-events-none px-8 md:px-16 lg:px-24"
            style={{ opacity }}
        >
            <motion.div className="max-w-lg text-right" style={{ x }}>
                {/* Phase label */}
                <div className="flex items-center justify-end gap-4 mb-6">
                    <span className="font-[family-name:var(--font-rajdhani)] text-xs tracking-[0.4em] uppercase text-white/40">
                        Hybrid Performance
                    </span>
                    <div className="w-8 h-[1px] bg-bright-gold" />
                </div>

                {/* Title */}
                <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.08em] text-bright-gold text-glow-gold mb-8">
                    {powertrainData.title}
                </h2>

                {/* Specs */}
                <div className="space-y-5">
                    {powertrainData.specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-end"
                            style={{
                                opacity: useTransform(
                                    scrollYProgress,
                                    [0.69 + i * 0.04, 0.73 + i * 0.04],
                                    [0, 1]
                                ),
                                x: useTransform(
                                    scrollYProgress,
                                    [0.69 + i * 0.04, 0.73 + i * 0.04],
                                    [30, 0]
                                ),
                            }}
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <span className="w-2 h-2 rounded-full bg-bright-gold/80" />
                                <span className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.2em] uppercase text-bright-gold/80">
                                    {spec.label}
                                </span>
                            </div>
                            <span className="font-[family-name:var(--font-rajdhani)] text-sm md:text-base text-white/60 tracking-wide pl-5">
                                {spec.value}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent */}
                <motion.div
                    className="mt-8 h-[1px] bg-gradient-to-l from-bright-gold/40 to-transparent"
                    style={{
                        scaleX: useTransform(scrollYProgress, [0.71, 0.78], [0, 1]),
                        transformOrigin: "right",
                    }}
                />

                {/* Total power callout */}
                <motion.div
                    className="mt-6 hud-border rounded-sm px-6 py-4 inline-block"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.80, 0.86], [0, 1]),
                        scale: useTransform(scrollYProgress, [0.80, 0.86], [0.95, 1]),
                    }}
                >
                    <div className="font-[family-name:var(--font-orbitron)] text-2xl md:text-3xl font-bold text-rosso-corsa text-glow-red">
                        1,030 <span className="text-lg text-white/50">PS</span>
                    </div>
                    <div className="font-[family-name:var(--font-rajdhani)] text-xs tracking-[0.3em] uppercase text-white/30 mt-1">
                        Total System Power
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
