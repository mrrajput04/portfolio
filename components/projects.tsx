import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Pratham Digital",
      client: "India",
      period: "May 2023 – Present",
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
      technologies: ["Node.js", "Express.js", "MongoDB", "WebSocket", "Git", "GitHub"],
    },
  ]

  return (
    <section id="projects" className="py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle>{project.title}</CardTitle>
                  <Badge>{project.client}</Badge>
                </div>
                <CardDescription>{project.period}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="bg-primary/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

