"use client";

import { Shader, ChromaFlow, Swirl } from "shaders/react";
import { CustomCursor } from "@/components/custom-cursor";
import { GrainOverlay } from "@/components/grain-overlay";
import { WorkSection } from "@/components/sections/work-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const scrollThrottleRef = useRef<number | undefined>(undefined);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const isScrollingRef = useRef(false);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas");
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth;
      targetScrollRef.current = sectionWidth * index;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        currentScrollRef.current = scrollContainerRef.current.scrollLeft;

        const smoothScroll = () => {
          if (!scrollContainerRef.current) return;

          const ease = 0.08; // Match the slow, smooth feel
          const diff = targetScrollRef.current - currentScrollRef.current;

          if (Math.abs(diff) > 0.5) {
            currentScrollRef.current += diff * ease;
            scrollContainerRef.current.scrollLeft = currentScrollRef.current;
            animationFrameRef.current = requestAnimationFrame(smoothScroll);
          } else {
            currentScrollRef.current = targetScrollRef.current;
            scrollContainerRef.current.scrollLeft = currentScrollRef.current;
            isScrollingRef.current = false;
          }
        };

        animationFrameRef.current = requestAnimationFrame(smoothScroll);
      }

      setCurrentSection(index);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentSection]);

  // Smooth momentum-based scrolling
  useEffect(() => {
    let rafId: number | undefined;

    const smoothScroll = () => {
      if (!scrollContainerRef.current) return;

      const ease = 0.08; // Lower = smoother, more gradual
      const diff = targetScrollRef.current - currentScrollRef.current;

      if (Math.abs(diff) > 0.5) {
        currentScrollRef.current += diff * ease;
        scrollContainerRef.current.scrollLeft = currentScrollRef.current;
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        currentScrollRef.current = targetScrollRef.current;
        scrollContainerRef.current.scrollLeft = currentScrollRef.current;
        isScrollingRef.current = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!scrollContainerRef.current) return;

      const delta = e.deltaY || e.deltaX;
      const maxScroll =
        scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth;

      // Slow, smooth scrolling with reduced multiplier
      targetScrollRef.current += delta * 0.8; // Lower = slower scroll
      targetScrollRef.current = Math.max(
        0,
        Math.min(targetScrollRef.current, maxScroll)
      );

      // Start animation if not running
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        currentScrollRef.current = scrollContainerRef.current.scrollLeft;
        rafId = requestAnimationFrame(smoothScroll);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      currentScrollRef.current = container.scrollLeft;
      targetScrollRef.current = container.scrollLeft;
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined;
          return;
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newSection = Math.round(scrollLeft / sectionWidth);

        if (
          newSection !== currentSection &&
          newSection >= 0 &&
          newSection <= 4
        ) {
          setCurrentSection(newSection);
        }

        scrollThrottleRef.current = undefined;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [currentSection]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#ffffff"
            colorB="#ff8c42"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#ff8c42"
            upColor="#ff8c42"
            downColor="#ffffff"
            leftColor="#ffb380"
            rightColor="#ff6b1a"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-white/30" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-sans text-xl font-bold text-foreground">
              C
            </span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">
            Chris
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Home", "Work", "Services", "About", "Contact"].map(
            (item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`group relative font-sans text-sm font-medium transition-colors ${
                  currentSection === index
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                    currentSection === index
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            )
          )}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Get in Touch
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">
                Web3 Developer & Blockchain Enthusiast
              </p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                Building the
                <br />
                decentralized future
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Creating innovative blockchain solutions and decentralized
                applications that bridge the gap between web2 and web3.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(1)}
              >
                View Projects
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection(4)}
              >
                Get in Touch
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">
                Scroll to explore
              </p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
