import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap } from "lucide-react"

export default function Experience() {
  const workExperience = [
    {
      title: "Node.js Developer",
      company: "Excellence Technologies",
      location: "Noida, India",
      period: "February 2023 – Present",
      responsibilities: [
        "Developed and maintained backend solutions using Node.js and Express.js.",
        "Utilized Git for efficient collaboration and version control among team members.",
        "Collaborated with cross-functional teams to meet project goals and deadlines.",
        "Ensured the performance, quality, and responsiveness of applications.",
        "Participated in code reviews and provided constructive feedback to peers.",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "MJP Rohilkhand University, Bareilly",
      period: "July 2019 – December 2022",
    },
    {
      degree: "Intermediate",
      institution: "UP Board",
      period: "April 2018 – March 2019",
    },
  ]

  return (
    <section id="experience" className="py-16 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">Experience & Education</h2>

        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <Badge variant="outline">{job.period}</Badge>
                    </div>
                    <div className="text-muted-foreground">
                      {job.company}, {job.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex}>{responsibility}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <Badge variant="outline">{edu.period}</Badge>
                    </div>
                    <div className="text-muted-foreground">{edu.institution}</div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

