"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { motion, useScroll } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useScrollTo } from "./smooth-scroll";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const scrollTo = useScrollTo();

  // Update scroll state
  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(scrollY.get() > 50);
    };

    const unsubscribe = scrollY.onChange(updateScrollState);
    updateScrollState();

    return () => unsubscribe();
  }, [scrollY]);

  // Update active section based on scroll position
  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "contact"];

    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActiveSection = sections[0];

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const offsetTop = element.offsetTop - 100;
        if (pageYOffset >= offsetTop) {
          newActiveSection = sectionId;
        }
      });

      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollTo(sectionId);
  };

  const navItems = [
    { name: "About", href: "#about", id: "about" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/ChrisKw0n",
      label: "GitHub",
    },
    {
      icon: <Twitter className="h-4 w-4" />,
      href: "https://x.com/ck0x_",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/chris-kwon-16aa19172",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center justify-center",
          "px-1.5 py-1.5 rounded-full backdrop-blur-md border border-border",
          isScrolled ? "bg-background/80 shadow-lg" : "bg-background/50"
        )}
      >
        <div className="flex items-center gap-1">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeSection === "home"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            Home
          </a>

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {item.name}
            </a>
          ))}

          <div className="h-6 mx-2 border-l border-border" />

          <ThemeToggle />

          <div className="h-6 mx-2 border-l border-border" />

          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden",
          "px-1.5 py-1.5 rounded-full backdrop-blur-md border border-border shadow-lg",
          "bg-background/80"
        )}
      >
        <div className="flex items-center gap-1">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className={cn(
              "p-2 rounded-full transition-colors",
              activeSection === "home"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>

          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className={cn(
              "p-2 rounded-full transition-colors",
              activeSection === "about"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          </a>

          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "projects")}
            className={cn(
              "p-2 rounded-full transition-colors",
              activeSection === "projects"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 3a2 2 0 0 0-2 2" />
              <path d="M19 3a2 2 0 0 1 2 2" />
              <path d="M21 19a2 2 0 0 1-2 2" />
              <path d="M5 21a2 2 0 0 1-2-2" />
              <path d="M9 3h1" />
              <path d="M9 21h1" />
              <path d="M14 3h1" />
              <path d="M14 21h1" />
              <path d="M3 9v1" />
              <path d="M21 9v1" />
              <path d="M3 14v1" />
              <path d="M21 14v1" />
            </svg>
          </a>

          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, "skills")}
            className={cn(
              "p-2 rounded-full transition-colors",
              activeSection === "skills"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20" />
              <path d="M2 5h20" />
              <path d="M3 2h18" />
              <path d="M17.8 14c-1 0-1.5-.5-2.4-.5-.8 0-1.3.5-2.4.5-1 0-1.5-.5-2.4-.5-.8 0-1.3.5-2.4.5-1 0-1.5-.5-2.4-.5" />
              <path d="M17.8 10c-1 0-1.5-.5-2.4-.5-.8 0-1.3.5-2.4.5-1 0-1.5-.5-2.4-.5-.8 0-1.3.5-2.4.5-1 0-1.5-.5-2.4-.5" />
              <path d="M17.8 6c-1 0-1.5-.5-2.4-.5-.8 0-1.3.5-2.4.5-1 0-1.5-.5-2.4-.5-.8 0-1.3.5-2.4.5-1 0-1.5-.5-2.4-.5" />
            </svg>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className={cn(
              "p-2 rounded-full transition-colors",
              activeSection === "contact"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>

          <div className="h-6 mx-1 border-l border-border" />

          <ThemeToggle />
        </div>
      </motion.div>
    </>
  );
}
