import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/#projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4 mb-8">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  View Code <Github className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Project Details</h2>
            <p className="mb-4">
              This project showcases my expertise in {project.tags.join(", ")}. I developed it to solve real-world
              challenges in the web3 space and to demonstrate my ability to build complex decentralized applications.
            </p>
            <p>
              The development process involved extensive research, prototyping, and testing to ensure the solution was
              both technically sound and user-friendly. I paid special attention to security considerations, gas
              optimization, and creating an intuitive user experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Technical Implementation</h2>
            <p className="mb-4">
              For this project, I utilized a stack of modern technologies including{" "}
              {project.tags.slice(0, 3).join(", ")}, and more. The architecture was designed to be scalable,
              maintainable, and secure.
            </p>
            <p>
              Some of the technical challenges I overcame included optimizing gas usage, ensuring cross-chain
              compatibility, and implementing robust security measures to protect user assets and data.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Other Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => p.id !== project.id)
            .slice(0, 3)
            .map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="group">
                <div className="border rounded-lg overflow-hidden transition-all group-hover:shadow-md">
                  <div className="aspect-video bg-muted">
                    <img src={p.image || "/placeholder.svg"} alt={p.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
