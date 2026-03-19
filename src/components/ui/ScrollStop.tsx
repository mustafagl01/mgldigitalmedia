"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface FeatureCard {
  title: string;
  description: string;
  startProgress: number;
  endProgress: number;
}

interface ScrollStopProps {
  frameCount: number;
  frameFolder: string;
  title: React.ReactNode;
  subtitle: string;
  features: FeatureCard[];
  fps?: number; // Added fps option for smoother scaling tuning
}

export default function ScrollStop({ frameCount, frameFolder, title, subtitle, features }: ScrollStopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    // The ffmpeg extraction used %03d, so 001, 002, etc.
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `${frameFolder}/${paddedIndex}.jpg`;

      img.onload = () => {
        loaded += 1;
        setImagesLoaded(loaded);
      };

      // Also handle errors so it doesn't get stuck loading forever
      img.onerror = () => {
        loaded += 1;
        setImagesLoaded(loaded);
        console.warn(`Failed to load ${img.src}`);
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [frameCount, frameFolder]);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Canvas drawing
  useEffect(() => {
    if (images.length === 0 || imagesLoaded < Math.min(10, frameCount)) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawImageExact = (img: HTMLImageElement) => {
      if (!img.complete || img.naturalHeight === 0) return;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobileView = window.innerWidth < 768;
      
      // MGL Digital uses Math.min on mobile specifically as ordered by the workflow
      const scale = isMobileView
        ? Math.min(window.innerWidth / img.naturalWidth, window.innerHeight / img.naturalHeight) * 1.05
        : Math.max(window.innerWidth / img.naturalWidth, window.innerHeight / img.naturalHeight);

      const x = window.innerWidth / 2 - (img.naturalWidth / 2) * scale;
      const y = window.innerHeight / 2 - (img.naturalHeight / 2) * scale;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Black background for MGL Digital
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    // Draw the first frame immediately once loaded
    if (images[0]) drawImageExact(images[0]);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(latest * frameCount)));
      const targetImage = images[frameIndex];

      if (targetImage?.complete) {
        requestAnimationFrame(() => drawImageExact(targetImage));
      }
    });

    const handleResize = () => {
      const targetImage = images[0];
      if (targetImage?.complete) {
        requestAnimationFrame(() => drawImageExact(targetImage));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress, images, imagesLoaded, frameCount]);

  // Height multiplier determines how "long" the scroll is.
  return (
    <section ref={containerRef} className="relative w-full bg-black" style={{ height: isMobile ? "250vh" : "350vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        {/* Loading overlay */}
        {imagesLoaded < frameCount && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
              <p className="text-sm font-light tracking-[0.2em] text-white/70">
                INITIALIZING {Math.round((imagesLoaded / frameCount) * 100)}%
              </p>
            </div>
          </div>
        )}

        {/* Hero Title */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.15], [0, -100]),
            filter: useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(10px)"])
          }}
          className="pointer-events-none absolute inset-x-0 bottom-1/4 z-20 mx-auto flex max-w-5xl flex-col items-center justify-center text-center px-6"
        >
          <div className="mb-6">{title}</div>
          <p className="max-w-2xl text-lg font-light tracking-wide text-neutral-300 md:text-xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Scroll Story Features */}
        {features.map((feature, idx) => (
          <FeatureCardItem key={idx} feature={feature} progress={scrollYProgress} index={idx} />
        ))}
      </div>
    </section>
  );
}

function FeatureCardItem({ feature, progress, index }: { feature: FeatureCard; progress: MotionValue<number>; index: number }) {
  const { startProgress, endProgress } = feature;
  const padding = 0.05; // Quick fade in/out

  const opacity = useTransform(
    progress,
    [startProgress - padding, startProgress, endProgress - padding, endProgress],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [startProgress - padding, startProgress, endProgress - padding, endProgress],
    [100, 0, 0, -100]
  );

  const blur = useTransform(
    progress,
    [startProgress - padding, startProgress, endProgress - padding, endProgress],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  return (
    <motion.div
      style={{ opacity, y, filter: blur }}
      className={`pointer-events-none absolute z-30 max-w-md px-6 md:px-0 md:max-w-lg ${
        index % 2 === 0 
          ? "bottom-20 md:bottom-1/2 md:left-24 md:-translate-y-1/2" 
          : "bottom-20 md:bottom-1/2 md:right-24 md:-translate-y-1/2"
      }`}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-[80px]" />
        <h3 className="relative z-10 mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {feature.title}
        </h3>
        <p className="relative z-10 text-base leading-relaxed text-neutral-400 sm:text-lg">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
