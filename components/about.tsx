import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone, User } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="flex justify-center">
            <div className="aspect-square relative rounded-full overflow-hidden max-w-[200px] sm:max-w-[300px] border-4 border-primary/20 shadow-lg">
              <img 
                src="/mypic.jpg" 
                alt="Divesh Kumar - Backend Developer" 
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Bio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-base sm:text-lg leading-relaxed">
                  Motivated and detail-oriented Software Developer with experience in full stack development. Proficient
                  in Node.js, Express.js, and Nest.js, with a strong foundation in backend technologies such as MongoDB
                  and MySQL.
                </p>
                <p className="text-base sm:text-lg leading-relaxed mt-4">
                  Adept at collaborating with cross-functional teams to deliver high-quality software solutions. Seeking
                  to leverage my skills and experience to contribute to innovative projects and eagerness to learn new
                  technologies.
                </p>
                <dl className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <dt className="sr-only">Location</dt>
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <dd className="text-sm sm:text-base">Noida, India</dd>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <dt className="sr-only">Email</dt>
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <dd className="text-sm sm:text-base break-all">
                      <a href="mailto:rajpootdivesh5@gmail.com" className="hover:text-primary transition-colors">
                        rajpootdivesh5@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <dt className="sr-only">Phone</dt>
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <dd className="text-sm sm:text-base">
                      <a href="tel:+918477072098" className="hover:text-primary transition-colors">
                        +91 8477072098
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

