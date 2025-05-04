"use client"

import { Badge } from "@/components/ui/badge"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { skillCategories } from "@/lib/data"
import { motion } from "framer-motion"
import { GlassCard } from "./ui-elements"

export default function SkillsSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <GlassCard variant="dark" hover="glow" animated={false} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 transition-colors duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}
