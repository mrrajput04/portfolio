import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Database,
  GitGraphIcon as Git,
  Cloud,
  Terminal,
  Layers,
} from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      skills: ["JavaScript", "TypeScript", "Third Party Integration"],
    },
    {
      title: "Frameworks",
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
      skills: ["Node.js", "Express.js", "Nest.js"],
    },
    {
      title: "Operating Systems",
      icon: <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />,
      skills: ["Windows", "Linux"],
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    },
    {
      title: "Tools",
      icon: <Git className="w-5 h-5 sm:w-6 sm:h-6" />,
      skills: ["Git/Github", "VS-Code", "Nginx", "Docker"],
    },
    {
      title: "Cloud",
      icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
      skills: ["AWS (S3, SNS, EC2, Lambda)"],
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="overflow-hidden border-t-4 border-t-primary hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="text-primary">{category.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-1 sm:space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                      <span className="text-sm sm:text-base">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
