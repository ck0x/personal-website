"use client";

import { useState } from "react";

import {
  AnimatedContainer,
  AnimatedItem,
  GlassCard,
  GradientBackground,
  Heading,
  Section,
  Text,
} from "@/components/ui-elements";
import { projects, skillCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/animated-background";
import FloatingNav from "@/components/floating-nav";
import {
  ScrollToTopButton,
  SmoothScroll,
  useScrollTo,
} from "@/components/smooth-scroll";

export default function ModernPage() {
  const scrollTo = useScrollTo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "" | "success" | "error";
    message: string;
  }>({ type: "", message: "" });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollTo(sectionId);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Store a reference to the form
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    const formData = new FormData(form); // Use the stored reference
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      recipient: "chriskwon0@gmail.com",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Failed to send message");

      setFormStatus({
        type: "success",
        message: "Message sent! I'll get back to you as soon as possible.",
      });

      // Reset the form using the stored reference
      form.reset();
    } catch (error: any) {
      setFormStatus({
        type: "error",
        message:
          error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <FloatingNav />
      <SmoothScroll />
      <ScrollToTopButton />

      <main className="flex-1">
        {/* Hero Section */}
        <Section id="home" className="min-h-[90vh] flex items-center">
          <GradientBackground />
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <AnimatedContainer className="space-y-8">
              <AnimatedItem>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                  <span className="block">
                    Software <span className="text-primary">Engineer</span>
                  </span>
                  <span className="block">& Blockchain Enthusiast</span>
                </h1>
              </AnimatedItem>
              <AnimatedItem delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  I build decentralized applications and blockchain solutions
                  that bridge the gap between web2 and web3.
                </p>
              </AnimatedItem>
              <AnimatedItem delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="group"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("projects");
                    }}
                  >
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                  >
                    Get in Touch
                  </Button>
                </div>
              </AnimatedItem>
              <AnimatedItem delay={0.3}>
                <div className="flex gap-4 pt-4">
                  <a
                    href="https://github.com/ck0x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background/50 border border-border hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com/ck0x_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background/50 border border-border hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/chris-kwon-16aa19172"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background/50 border border-border hover:border-primary/50 hover:text-primary transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </AnimatedItem>
            </AnimatedContainer>

            <AnimatedItem direction="left">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-75 blur-xl"></div>
                <div className="relative aspect-square rounded-full bg-gradient-to-br from-background via-background to-background/80 border border-white/10 p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
                  <div className="relative text-5xl sm:text-6xl md:text-8xl break-all md:break-normal leading-none select-none">
                    chris0.eth
                  </div>
                  <div className="absolute h-40 w-40 rounded-full bg-primary/20 animate-pulse blur-3xl"></div>
                </div>
              </div>
            </AnimatedItem>
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" className="bg-muted/30">
          <GradientBackground className="opacity-10" />
          <Heading size="4xl" className="mb-12">
            About Me
          </Heading>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedContainer className="space-y-6">
              <AnimatedItem>
                <Text className="text-lg">
                  Hi, I'm Chris! I'm a passionate web3 developer with expertise
                  in building decentralized applications, smart contracts, and
                  blockchain infrastructure.
                </Text>
              </AnimatedItem>
              <AnimatedItem delay={0.1}>
                <Text className="text-lg">
                  My journey in web3 began when I discovered the potential of
                  blockchain technology to revolutionize how we interact with
                  digital systems. Since then, I've been dedicated to creating
                  innovative solutions that leverage the power of
                  decentralization.
                </Text>
              </AnimatedItem>
              <AnimatedItem delay={0.2}>
                <Text className="text-lg">
                  When I'm not coding, you can find me exploring new blockchain
                  protocols, participating in hackathons, or contributing to
                  open-source projects.
                </Text>
              </AnimatedItem>
            </AnimatedContainer>

            <GlassCard variant="default" hover="glow" className="h-full">
              <h3 className="text-xl font-semibold mb-6">Quick Facts</h3>
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start">
                  <span className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    🌐
                  </span>
                  <div>
                    <span className="font-medium">Location</span>
                    <p className="text-muted-foreground">Auckland, NZ</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    🎓
                  </span>
                  <div>
                    <span className="font-medium">Education</span>
                    <p className="text-muted-foreground">
                      Software Engineering, University of Auckland
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    💼
                  </span>
                  <div>
                    <span className="font-medium">Experience</span>
                    <p className="text-muted-foreground">
                      Previously at Rocket Lab
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    🏆
                  </span>
                  <div>
                    <span className="font-medium">Achievement</span>
                    <p className="text-muted-foreground">
                      ETHGlobal Multi Award Winner
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    🔭
                  </span>
                  <div>
                    <span className="font-medium">Current Focus</span>
                    <p className="text-muted-foreground">
                      ZK-rollups and Layer 2 solutions
                    </p>
                  </div>
                </li>
              </ul>
            </GlassCard>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <GradientBackground className="opacity-10" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <Heading size="4xl">My Projects</Heading>
            <Button variant="outline" className="mt-4 md:mt-0 group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <AnimatedItem
                key={project.id}
                delay={index * 0.1}
                className="h-full"
              >
                <GlassCard hover="scale" className="h-full flex flex-col">
                  <div className="aspect-video relative bg-muted/30 rounded-lg overflow-hidden mb-4">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 hover:bg-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="bg-background/50">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="mt-auto flex gap-2">
                    {project.demoUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="group"
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo{" "}
                          <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code <Github className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {project.detailsUrl && (
                      <Button
                        variant="default"
                        size="sm"
                        className="ml-auto group"
                        asChild
                      >
                        <Link href={project.detailsUrl}>
                          Details{" "}
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </Section>

        {/* Skills Section */}
        <Section id="skills" className="bg-muted/30">
          <GradientBackground className="opacity-10" />
          <Heading size="4xl" className="mb-12">
            Skills & Technologies
          </Heading>

          <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, index) => (
              <AnimatedItem key={category.name} delay={index * 0.1}>
                <GlassCard hover="border" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl p-2 rounded-lg bg-primary/10">
                      {category.icon}
                    </span>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 bg-background/50 hover:bg-background/80 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <GradientBackground className="opacity-10" />
          <Heading size="4xl" className="mb-12">
            Get In Touch
          </Heading>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedContainer className="space-y-8">
              <AnimatedItem>
                <Text className="text-lg">
                  I'm always open to discussing new projects, opportunities, or
                  partnerships. Feel free to reach out if you have any questions
                  or just want to say hi!
                </Text>
              </AnimatedItem>

              <AnimatedItem delay={0.1}>
                <div className="flex flex-col space-y-6">
                  <motion.a
                    href="https://github.com/ck0x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Github className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                        github.com/ck0x
                      </div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://twitter.com/ck0x_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium">Twitter</div>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                        @ck0x_
                      </div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/chris-kwon-16aa19172"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                        linkedin.com/in/chris-kwon
                      </div>
                    </div>
                  </motion.a>
                </div>
              </AnimatedItem>
            </AnimatedContainer>

            <AnimatedItem direction="left">
              <GlassCard hover="glow" className="h-full">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm resize-none focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
                      placeholder="Your message"
                      required
                    />
                  </div>

                  {formStatus.type && (
                    <div
                      className={`p-3 rounded-md ${
                        formStatus.type === "success"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {formStatus.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </GlassCard>
            </AnimatedItem>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Chris. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ck0x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="https://x.com/ck0x_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/chris-kwon-16aa19172"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
