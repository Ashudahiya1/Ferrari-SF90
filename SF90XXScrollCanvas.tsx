"use client";

import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface SF90XXScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
    className?: string;
}

export default function SF90XXScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
    className = "",
}: SF90XXScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>(0);

    // ── Preload all images ──────────────────────────
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${imageFolderPath}/${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }
    }, [totalFrames, imageFolderPath]);

    // ── Handle canvas sizing ────────────────────────
    const updateCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
    }, []);

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, [updateCanvasSize]);

    // ── Draw frame (object-fit: contain) ────────────
    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            if (!canvas || !imagesRef.current.length) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const dpr = window.devicePixelRatio || 1;
            const displayWidth = canvas.width / dpr;
            const displayHeight = canvas.height / dpr;

            ctx.clearRect(0, 0, displayWidth, displayHeight);

            const img = imagesRef.current[frameIndex];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            // Calculate object-fit: contain dimensions
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const canvasAspect = displayWidth / displayHeight;

            let drawWidth: number;
            let drawHeight: number;

            if (imgAspect > canvasAspect) {
                // Image is wider — fit to width
                drawWidth = displayWidth;
                drawHeight = displayWidth / imgAspect;
            } else {
                // Image is taller — fit to height
                drawHeight = displayHeight;
                drawWidth = displayHeight * imgAspect;
            }

            const x = (displayWidth - drawWidth) / 2;
            const y = (displayHeight - drawHeight) / 2;

            ctx.drawImage(img, x, y, drawWidth, drawHeight);
        },
        []
    );

    // ── Sync frame to scroll progress ──────────────
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const frameIndex = Math.min(
            Math.floor(latest * (totalFrames - 1)),
            totalFrames - 1
        );
        frameIndex >= 0 && (currentFrameRef.current = frameIndex);

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawFrame(currentFrameRef.current);
        });
    });

    // ── Draw initial frame once images load ─────────
    useEffect(() => {
        if (imagesLoaded) {
            updateCanvasSize();
            drawFrame(0);
        }
    }, [imagesLoaded, drawFrame, updateCanvasSize]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
            {/* Loading indicator */}
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-ferrari-black z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-rosso-corsa/30 border-t-rosso-corsa rounded-full animate-spin" />
                        <span className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.3em] text-white/50 uppercase">
                            Loading Experience
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
