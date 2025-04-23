"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Mail, Phone } from "lucide-react"
import ScrollAnimation, { StaggerGroup, StaggerItem } from "@/components/ui/scroll-animation"
import emailjs from '@emailjs/browser'

// Form validation rules
interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

const validationRules: Record<string, ValidationRule> = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]*$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    minLength: 3,
    maxLength: 100,
  },
  message: {
    minLength: 10,
    maxLength: 1000,
  },
}

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0)
  const formRef = useRef<HTMLFormElement>(null)

  // Add loading state for map
  const [isMapLoading, setIsMapLoading] = useState(true)

  // Add progress indicator
  const [formProgress, setFormProgress] = useState(0)

  // Calculate form progress
  useEffect(() => {
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length
    setFormProgress((filledFields / totalFields) * 100)
  }, [formData])

  // Validate form field
  const validateField = (name: string, value: string): string => {
    const rules = validationRules[name as keyof typeof validationRules]
    if (!rules) return ""

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be less than ${rules.maxLength} characters`
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      if (name === 'email') return 'Please enter a valid email address'
      if (name === 'name') return 'Name can only contain letters and spaces'
    }
    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check rate limiting
    const now = Date.now()
    const timeSinceLastSubmission = now - lastSubmissionTime
    const cooldownPeriod = 60000 // 1 minute cooldown
    
    if (timeSinceLastSubmission < cooldownPeriod) {
      const remainingTime = Math.ceil((cooldownPeriod - timeSinceLastSubmission) / 1000)
      toast({
        title: "Please wait",
        description: `You can submit another message in ${remainingTime} seconds.`,
        variant: "destructive",
      })
      return
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
      }

      if (!formRef.current) return

      // Get user's IP address (for analytics)
      const ipResponse = await fetch('https://api.ipify.org?format=json')
      const { ip } = await ipResponse.json()

      // Add additional data to the form
      const formDataWithMetadata = new FormData(formRef.current)
      formDataWithMetadata.append('ip_address', ip)
      formDataWithMetadata.append('submission_time', new Date().toISOString())

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      )

      if (result.text === 'OK') {
        setLastSubmissionTime(Date.now())
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
        setIsSuccess(true)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error: any) {
      console.error('Error sending email:', error)
      
      if (error.text?.includes('insufficient authentication scopes')) {
        toast({
          title: "Authentication Error",
          description: "Please check your Gmail service configuration in EmailJS.",
          variant: "destructive",
        })
      } else if (error.message === 'EmailJS configuration is missing') {
        toast({
          title: "Configuration Error",
          description: "Email service is not properly configured. Please contact the site administrator.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <ScrollAnimation type="fade-up" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Contact Me
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <ScrollAnimation type="slide-in" delay={0.1}>
            <Card className="transform transition duration-500 hover:shadow-lg">
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
              <CardTitle className="text-lg sm:text-xl">Get In Touch</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Fill out the form and I'll get back to you as soon as possible.
              </CardDescription>
                {/* Add progress bar */}
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${formProgress}%` }}
                    role="progressbar"
                    aria-valuenow={formProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-2 sm:pt-3">
                {isSuccess ? (
                  <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-md text-center animate-scale-in">
                    <h3 className="text-green-700 dark:text-green-400 font-medium text-sm sm:text-base mb-1">Message Sent!</h3>
                    <p className="text-green-600 dark:text-green-500 text-xs sm:text-sm">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form 
                    ref={formRef} 
                    onSubmit={handleSubmit} 
                    className="space-y-3 sm:space-y-4"
                    aria-label="Contact form"
                  >
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
                        aria-required="true"
                        aria-label="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`text-sm focus:ring-2 focus:ring-primary/20 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          errors.name ? 'border-red-500' : ''
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.name}
                        </p>
                      )}
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
                        aria-required="true"
                        aria-label="Your email address"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`text-sm focus:ring-2 focus:ring-primary/20 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder="Your email address"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
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
                        aria-required="true"
                        aria-label="Message subject"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        className={`text-sm focus:ring-2 focus:ring-primary/20 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          errors.subject ? 'border-red-500' : ''
                        }`}
                        placeholder="Message subject"
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.subject}
                        </p>
                      )}
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
                        aria-required="true"
                        aria-label="Your message"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`text-sm focus:ring-2 focus:ring-primary/20 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          errors.message ? 'border-red-500' : ''
                        }`}
                        placeholder="Your message"
                      />
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.message}
                        </p>
                      )}
                </div>
                    <CardFooter className="p-0">
                      <Button
                        type="submit"
                        className="w-full text-xs sm:text-sm transition-all hover:shadow-md hover:shadow-primary/10 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? "Sending message..." : "Send message"}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </CardFooter>
              </form>
                )}
            </CardContent>
              {isSuccess && (
            <CardFooter className="p-4 sm:p-6 pt-2 sm:pt-3">
              <Button
                    variant="outline" 
                    className="w-full text-xs sm:text-sm animate-scale-in focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    onClick={() => setIsSuccess(false)}
                    aria-label="Send another message"
                  >
                    Send Another Message
              </Button>
            </CardFooter>
              )}
          </Card>
          </ScrollAnimation>

          <ScrollAnimation type="slide-in" delay={0.3}>
          <div className="flex flex-col justify-center gap-4 sm:gap-6">
              <Card className="transform transition-all duration-500 hover:shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <StaggerGroup className="space-y-4 sm:space-y-6">
                    <StaggerItem index={1}>
                      <div className="flex items-center gap-3 sm:gap-4 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                          <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">Location</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Noida, India</p>
                  </div>
                </div>
                    </StaggerItem>

                    <StaggerItem index={2}>
                      <div className="flex items-center gap-3 sm:gap-4 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                          <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">Email</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground break-all">
                            <a href="mailto:rajpootdivesh5@gmail.com" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" aria-label="Email me at rajpootdivesh5@gmail.com">
                              rajpootdivesh5@gmail.com
                            </a>
                          </p>
                  </div>
                </div>
                    </StaggerItem>

                    <StaggerItem index={3}>
                      <div className="flex items-center gap-3 sm:gap-4 hover:translate-x-1 transition-transform duration-300">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                          <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-medium">Phone</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            <a href="tel:+918477072098" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" aria-label="Call me at +91 8477072098">
                              +91 8477072098
                            </a>
                          </p>
                  </div>
                </div>
                    </StaggerItem>
                  </StaggerGroup>
              </CardContent>
            </Card>

              <ScrollAnimation type="scale-up" delay={0.5}>
                <div className="mt-2 sm:mt-4 overflow-hidden rounded-lg transform transition-all duration-500 hover:shadow-lg">
                  {isMapLoading && (
                    <div className="w-full h-[200px] sm:h-[250px] bg-muted animate-pulse rounded-lg" />
                  )}
                  <div 
                    className={`w-full h-[200px] sm:h-[250px] ${isMapLoading ? 'hidden' : 'block'}`}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224356.9006163!2d77.2035977!3d28.5269961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710159123456!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ 
                        border: 0, 
                        borderRadius: "0.5rem",
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-transform duration-700 hover:scale-105 origin-center"
                      title="Map showing Noida, India"
                      aria-label="Google Maps location of Noida, India"
                      onLoad={() => {
                        setTimeout(() => {
                          setIsMapLoading(false)
                        }, 1000) // Increased delay for better loading
                      }}
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

