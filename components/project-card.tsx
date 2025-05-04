"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/types"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden flex flex-col h-full border border-white/10 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary)/0.2)] group">
        <div className="aspect-video relative bg-muted overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardHeader className="relative">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="transition-colors duration-300 group-hover:text-primary">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {project.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex gap-2">
          {project.demoUrl && (
            <Button variant="outline" size="sm" asChild className="bg-white/5 border-white/10 hover:bg-white/10">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Demo <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="bg-white/5 border-white/10 hover:bg-white/10">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                Code <Github className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
          {project.detailsUrl && (
            <Button
              variant="default"
              size="sm"
              className={cn(
                "ml-auto relative overflow-hidden transition-all duration-300",
                "before:absolute before:inset-0 before:bg-white/10 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-300 before:rounded-md",
              )}
              asChild
            >
              <Link href={project.detailsUrl}>
                <span className="relative z-10">Details</span>
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
