'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Code2, 
  Database, 
  Server, 
  Cloud, 
  GitBranch, 
  Layers,
  Terminal,
  Cpu,
  Network,
  Shield,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const skillCategories = {
  'Backend Development': {
    icon: <Server className="h-5 w-5" />,
    skills: [
      { 
        name: 'Node.js', 
        level: 90, 
        description: 'Advanced proficiency in building scalable applications',
        projects: ['E-commerce API', 'Real-time Chat Application'],
        certifications: ['Node.js Certified Developer']
      },
      { 
        name: 'Express.js', 
        level: 85, 
        description: 'Expert in RESTful API development',
        projects: ['Payment Gateway Integration', 'Authentication System'],
        certifications: []
      },
      { 
        name: 'Nest.js', 
        level: 80, 
        description: 'Strong experience with enterprise applications',
        projects: ['Microservices Architecture', 'Enterprise Dashboard'],
        certifications: []
      },
      { 
        name: 'TypeScript', 
        level: 85, 
        description: 'Proficient in type-safe development',
        projects: ['Type-safe API Development', 'Frontend Integration'],
        certifications: []
      },
    ]
  },
  'Database': {
    icon: <Database className="h-5 w-5" />,
    skills: [
      { 
        name: 'MongoDB', 
        level: 85, 
        description: 'Expert in NoSQL database design',
        projects: ['Document Management System', 'Real-time Analytics'],
        certifications: ['MongoDB Certified Developer']
      },
      { 
        name: 'PostgreSQL', 
        level: 80, 
        description: 'Proficient in relational databases',
        projects: ['Data Warehousing', 'Complex Queries Optimization'],
        certifications: []
      },
      { 
        name: 'MySQL', 
        level: 75, 
        description: 'Strong SQL query optimization skills',
        projects: ['E-commerce Database', 'Reporting System'],
        certifications: []
      },
      { 
        name: 'Redis', 
        level: 70, 
        description: 'Experience with caching and session management',
        projects: ['Caching Layer', 'Session Management'],
        certifications: []
      },
    ]
  },
  'DevOps & Cloud': {
    icon: <Cloud className="h-5 w-5" />,
    skills: [
      { 
        name: 'Docker', 
        level: 80, 
        description: 'Containerization and deployment',
        projects: ['Microservices Deployment', 'CI/CD Pipeline'],
        certifications: ['Docker Certified Associate']
      },
      { 
        name: 'AWS', 
        level: 75, 
        description: 'Cloud infrastructure management',
        projects: ['Serverless Architecture', 'Cloud Migration'],
        certifications: ['AWS Certified Developer']
      },
      { 
        name: 'CI/CD', 
        level: 70, 
        description: 'Automated deployment pipelines',
        projects: ['GitHub Actions', 'Jenkins Pipeline'],
        certifications: []
      },
      { 
        name: 'Linux', 
        level: 75, 
        description: 'Server administration and scripting',
        projects: ['Server Configuration', 'Automation Scripts'],
        certifications: []
      },
    ]
  },
  'Security & Performance': {
    icon: <Shield className="h-5 w-5" />,
    skills: [
      { 
        name: 'JWT', 
        level: 85, 
        description: 'Authentication and authorization',
        projects: ['Secure API Authentication', 'Role-based Access Control'],
        certifications: []
      },
      { 
        name: 'OAuth', 
        level: 80, 
        description: 'Social authentication integration',
        projects: ['Social Login Integration', 'OAuth Provider'],
        certifications: []
      },
      { 
        name: 'API Security', 
        level: 85, 
        description: 'Security best practices',
        projects: ['API Gateway Security', 'Rate Limiting'],
        certifications: []
      },
      { 
        name: 'Performance', 
        level: 80, 
        description: 'Optimization and caching',
        projects: ['Performance Optimization', 'Caching Strategy'],
        certifications: []
      },
    ]
  }
}

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState('Backend Development')
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="Backend Development" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(skillCategories).map(([category, { icon }]) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex items-center gap-2"
              onClick={() => setActiveCategory(category)}
            >
              {icon}
              <span className="hidden sm:inline">{category}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(skillCategories).map(([category, { skills }]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-4 md:grid-cols-2">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{skill.name}</span>
                        <Badge variant="secondary">{skill.level}%</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={skill.level} className="mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                      
                      <div className="space-y-3">
                        {skill.projects && skill.projects.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Projects</h4>
                            <ul className="space-y-1">
                              {skill.projects.map((project, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <ChevronRight className="h-4 w-4 text-primary" />
                                  <span>{project}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {skill.certifications && skill.certifications.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Certifications</h4>
                            <ul className="space-y-1">
                              {skill.certifications.map((cert, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                  <Badge variant="outline" className="text-xs">
                                    {cert}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Skill Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(skillCategories).map(([category, { icon, skills }]) => {
                const averageLevel = Math.round(
                  skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length
                )
                return (
                  <TooltipProvider key={category}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className="text-center animate-fade-in cursor-pointer transform transition-all duration-300 hover:scale-105"
                          style={{ animationDelay: `${Object.keys(skillCategories).indexOf(category) * 100}ms` }}
                        >
                          <div className="flex justify-center mb-2">{icon}</div>
                          <h3 className="text-sm font-medium mb-1">{category}</h3>
                          <Progress value={averageLevel} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{averageLevel}%</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average proficiency in {category}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 