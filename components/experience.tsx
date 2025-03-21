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
    <section id="experience" className="py-12 sm:py-16 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Experience & Education</h2>

        <div className="space-y-8 sm:space-y-12">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-semibold">Work Experience</h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {workExperience.map((job, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <CardTitle className="text-lg sm:text-xl">{job.title}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {job.period}
                      </Badge>
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground">
                      {job.company}, {job.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
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
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-semibold">Education</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <CardTitle className="text-lg sm:text-xl">{edu.degree}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {edu.period}
                      </Badge>
                    </div>
                    <div className="text-sm sm:text-base text-muted-foreground">{edu.institution}</div>
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

