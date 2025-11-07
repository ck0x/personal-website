"use client";

import { useReveal } from "@/hooks/use-reveal";

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3);

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Expertise
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / What I bring to the table
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Smart Contract Development",
              description:
                "Building smart contracts using Solidity and Rust primarily for EVM networks",
              direction: "top",
            },
            {
              title: "Web3 Integration",
              description:
                "Seamlessly connecting blockchain functionality with modern web applications",
              direction: "right",
            },
            {
              title: "Systems Architecture",
              description: "Creating robust and scalable system designs",
              direction: "left",
            },
            {
              title: "Full-Stack Development",
              description:
                "Creating scalable applications from frontend to blockchain infrastructure",
              direction: "bottom",
            },
          ].map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string };
  index: number;
  isVisible: boolean;
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0";
        case "right":
          return "translate-x-16 opacity-0";
        case "top":
          return "-translate-y-16 opacity-0";
        case "bottom":
          return "translate-y-16 opacity-0";
        default:
          return "translate-y-12 opacity-0";
      }
    }
    return "translate-x-0 translate-y-0 opacity-100";
  };

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">
          0{index + 1}
        </span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">
        {service.title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">
        {service.description}
      </p>
    </div>
  );
}
