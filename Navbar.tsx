"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

interface NavbarProps {
    scrollYProgress: MotionValue<number>;
}

export default function Navbar({ scrollYProgress }: NavbarProps) {
    const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
            style={{
                backgroundColor: useTransform(
                    bgOpacity,
                    (v) => `rgba(15, 15, 15, ${v * 0.7})`
                ),
                backdropFilter: useTransform(bgOpacity, (v) =>
                    v > 0.1 ? `blur(${v * 20}px)` : "none"
                ),
                borderBottom: useTransform(
                    bgOpacity,
                    (v) => `1px solid rgba(255, 255, 255, ${v * 0.06})`
                ),
            }}
        >
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                    <span
                        className="font-[family-name:var(--font-orbitron)] text-lg md:text-xl font-bold tracking-[0.2em] text-rosso-corsa text-glow-red"
                    >
                        SF90 XX
                    </span>
                    <span className="font-[family-name:var(--font-rajdhani)] text-[10px] tracking-[0.35em] uppercase text-white/40">
                        Stradale
                    </span>
                </div>
            </div>

            {/* CTA */}
            <motion.button
                className="relative font-[family-name:var(--font-orbitron)] text-xs tracking-[0.2em] uppercase px-6 py-2.5 border border-bright-gold/50 text-bright-gold cursor-pointer transition-all duration-300 hover:border-bright-gold hover:bg-bright-gold/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                <span className="relative z-10">Inquire</span>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 hud-glow-gold" />
            </motion.button>
        </motion.nav>
    );
}
