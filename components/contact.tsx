"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Mail, Phone } from "lucide-react"

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Contact Me</h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <Card>
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="text-lg sm:text-xl">Get In Touch</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Fill out the form and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid gap-1.5 sm:gap-2">
                  <Label htmlFor="name" className="text-xs sm:text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-1.5 sm:gap-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-1.5 sm:gap-2">
                  <Label htmlFor="subject" className="text-xs sm:text-sm">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-1.5 sm:gap-2">
                  <Label htmlFor="message" className="text-xs sm:text-sm">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="text-sm"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-4 sm:p-6 pt-2 sm:pt-3">
              <Button
                type="submit"
                className="w-full text-xs sm:text-sm"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col justify-center gap-4 sm:gap-6">
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                    <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">Location</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Noida, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                    <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">Email</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground break-all">rajpootdivesh5@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                    <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">Phone</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">+91 8477072098</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-2 sm:mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224356.9006163!2d77.2035977!3d28.5269961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710159123456!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="sm:h-[250px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

