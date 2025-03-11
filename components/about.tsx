import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-16 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="aspect-square relative rounded-full overflow-hidden max-w-[300px] mx-auto border-4 border-primary/20">
              <img src="/placeholder.svg?height=300&width=300" alt="Divesh Kumar" className="object-cover" />
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  Motivated and detail-oriented Software Developer with experience in full stack development. Proficient
                  in Node.js, Express.js, and Nest.js, with a strong foundation in backend technologies such as MongoDB
                  and MySQL.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Adept at collaborating with cross-functional teams to deliver high-quality software solutions. Seeking
                  to leverage my skills and experience to contribute to innovative projects and eagerness to learn new
                  technologies.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Noida, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>rajpootdivesh5@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+91 8477072098</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

