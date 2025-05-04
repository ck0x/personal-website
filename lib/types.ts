export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  highlights: string[]
  demoUrl?: string
  githubUrl?: string
  detailsUrl?: string
}

export interface SkillCategory {
  name: string
  icon: string
  skills: string[]
}
