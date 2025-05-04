"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export function SmoothScroll() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
  )
}

export function useScrollTo() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleMediaChange)
    return () => mediaQuery.removeEventListener("change", handleMediaChange)
  }, [])

  const scrollTo = (elementId: string) => {
    // Prevent default anchor link behavior
    const element = document.getElementById(elementId)
    if (!element) return

    const navHeight = 100 // Approximate height of the navigation bar
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - navHeight

    // If user prefers reduced motion, jump directly
    if (prefersReducedMotion) {
      window.scrollTo({
        top: offsetPosition,
      })
      return
    }

    // Otherwise, use smooth scrolling
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return scrollTo
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const scrollTo = useScrollTo()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-24 right-6 z-50 p-3 rounded-full bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm md:bottom-6",
        "hover:bg-primary transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      aria-label="Scroll to top"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: visible ? 1 : 0.8,
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </motion.button>
  )
}
