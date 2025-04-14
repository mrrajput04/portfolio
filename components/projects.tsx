"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import ScrollAnimation, { StaggerGroup, StaggerItem } from "@/components/ui/scroll-animation"

export default function Projects() {
  const projects = [
    {
      title: "Pratham Digital",
      client: "India",
      period: "May 2024 – Present",
      description:
        "Developed a user-friendly web application facilitating user login and access to personalized Power BI reports. Implemented an admin portal enabling efficient management of user assignments, report access, and user activation/deactivation. Ensured seamless user experience through intuitive interface design and responsive web development techniques. Leveraged MySQL databases to streamline data storage and retrieval, ensuring operational efficiency.",
      technologies: ["Node.js", "Express.js", "MySQL", "Power BI"],
    },
    {
      title: "Renesas Chirp Designer Application",
      client: "Japan",
      period: "November 2023 – April 2024",
      description:
        "The Chirp Designer Application project, developed for Renesas, a leading Japanese company specializing in chirping technologies, aims to streamline chirp waveform design and manipulation. Integrated version control and collaboration using Git and GitHub.",
      technologies: ["Node.js", "Express.js", "Git", "GitHub"],
    },
    {
      title: "Koing AI Web Application",
      client: "South Korea",
      period: "July 2023 – October 2023",
      description:
        "Built a web application with Nest.js, TypeORM, and MySQL, focusing on CRUD API development. Key objectives include creating a RESTful API, User authentication, version control with Git/GitHub, thorough documentation, and robust testing. Implemented user authentication and ensured secure data management.",
      technologies: ["Nest.js", "TypeORM", "MySQL", "RESTful API"],
    },
    {
      title: "Super Exchange Betting Application",
      client: "Dubai",
      period: "February 2023 – June 2023",
      description:
        "Designed and developed a high-performance betting platform using Node.js, Express.js, MongoDB, and WebSocket. The site effortlessly handles massive amounts of user data. This innovative platform provides a dynamic and engaging betting experience for users, all while ensuring efficient data management and real-time interactions. Focused on real-time data handling and scalability to manage large user bases.",
      technologies: ["Node.js", "Express.js", "MongoDB", "WebSocket", "Git"],
    },
  ]

  return (
    <section id="projects" className="py-12 sm:py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <ScrollAnimation type="fade-up" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Projects</h2>
        </ScrollAnimation>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" rootMargin="0px 0px -100px 0px">
          {projects.map((project, index) => (
            <StaggerItem key={index} index={index + 1}>
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3 relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <CardTitle className="text-lg sm:text-xl relative z-10">{project.title}</CardTitle>
                    <Badge className="w-fit relative z-10">{project.client}</Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm relative z-10">{project.period}</CardDescription>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </CardHeader>
                <CardContent className="flex-grow p-4 sm:p-6 pt-2 sm:pt-3">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{project.description}</p>
                  <div className="mb-2">
                    <span className="text-xs text-primary font-medium">Technologies:</span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="outline" 
                          className="bg-primary/10 text-xs transition-all hover:bg-primary/20 cursor-default"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6 pt-2 sm:pt-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs sm:text-sm hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

