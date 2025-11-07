"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { useReveal } from "@/hooks/use-reveal";

export function AboutSection({
  scrollToSection,
}: {
  scrollToSection?: (index: number) => void;
}) {
  const { ref, isVisible } = useReveal(0.3);

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                Building the
                <br />
                Future of
                <br />
                <span className="text-foreground/40">Web3</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                I'm a passionate Software Engineer with great interest in
                building applications that leverage decentralised systems.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Every project is an opportunity to push the boundaries of what's
                possible!
              </p>
            </div>
          </div>

          {/* Right side - Stats with creative layout */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              {
                value: "4+",
                label: "Projects",
                sublabel: "Contributed to",
                direction: "right",
              },
              {
                value: "4+",
                label: "Years",
                sublabel: "Developing",
                direction: "left",
              },
              {
                value: "Multi",
                label: "Awards",
                sublabel: "ETHGlobal Winner",
                direction: "right",
              },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left"
                    ? "-translate-x-16 opacity-0"
                    : "translate-x-16 opacity-0";
                }
                return "translate-x-0 opacity-100";
              };

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l border-foreground/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">
                    {stat.value}
                  </div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-xl">
                      {stat.label}
                    </div>
                    <div className="font-mono text-xs text-foreground/60">
                      {stat.sublabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton
            size="lg"
            variant="primary"
            onClick={() => scrollToSection?.(4)}
          >
            Get in Touch
          </MagneticButton>
          <MagneticButton
            size="lg"
            variant="secondary"
            onClick={() => scrollToSection?.(1)}
          >
            View Projects
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
