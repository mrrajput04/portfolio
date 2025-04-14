"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone, User } from "lucide-react"
import ScrollAnimation from "@/components/ui/scroll-animation"
import Image from "next/image"

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const fullHeaderText = "About Me";
  const sectionRef = useRef(null);
  const animationFrameId = useRef<number | null>(null);
  const typewriterTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Memoize the observer callback
  const observerCallback = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [observerCallback]);

  // Optimize the typewriter effect
  useEffect(() => {
    const handleTypewriter = () => {
      if (isVisible && headerText.length < fullHeaderText.length) {
        if (typewriterTimeoutId.current) {
          clearTimeout(typewriterTimeoutId.current);
        }
        
        typewriterTimeoutId.current = setTimeout(() => {
          animationFrameId.current = requestAnimationFrame(() => {
            setHeaderText(fullHeaderText.slice(0, headerText.length + 1));
          });
        }, 100);
      }
    };
    
    handleTypewriter();
    
    return () => {
      if (typewriterTimeoutId.current) {
        clearTimeout(typewriterTimeoutId.current);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible, headerText, fullHeaderText]);

  return (
    <section id="about" className="py-12 sm:py-16 px-4 md:px-6 bg-muted/50" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          {headerText}
          {headerText.length < fullHeaderText.length && (
            <span className="animate-blink">|</span>
          )}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div 
            className={`flex justify-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
            style={{ animationDelay: '0.2s', transform: 'translateZ(0)' }}
          >
            <div 
              ref={imgRef}
              className={`aspect-square relative rounded-full overflow-hidden w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] border-4 border-primary/20 shadow-lg ${isVisible ? 'animate-float' : 'opacity-0'}`} 
              style={{ animationDelay: '0.4s', transform: 'translateZ(0)' }}
            >
              <span className="absolute inset-[-5px] rounded-full animate-ripple"></span>
              <Image 
                src="/mypic.jpg" 
                alt="Divesh Kumar - Backend Developer" 
                className="object-cover relative z-10"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, 300px"
                priority
              />
            </div>
          </div>
          <div 
            className={`space-y-6 ${isVisible ? 'animate-reveal-right' : 'opacity-0'}`} 
            style={{ animationDelay: '0.4s', transform: 'translateZ(0)' }}
          >
            <Card className="transform transition-all duration-500 hover:shadow-lg transform-gpu overflow-hidden relative">
              <span className="absolute h-full w-1 bg-primary/20 left-0 top-0"></span>
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
                  <div className="flex items-center gap-3 text-muted-foreground transform transition hover:translate-x-1 duration-300 transform-gpu">
                    <dt className="sr-only">Location</dt>
                    <div className="relative">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="absolute inset-0 animate-spotlight opacity-0 hover:opacity-100 rounded-full"></span>
                    </div>
                    <dd className="text-sm sm:text-base">Noida, India</dd>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground transform transition hover:translate-x-1 duration-300 transform-gpu">
                    <dt className="sr-only">Email</dt>
                    <div className="relative">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="absolute inset-0 animate-spotlight opacity-0 hover:opacity-100 rounded-full"></span>
                    </div>
                    <dd className="text-sm sm:text-base break-all">
                      <a href="mailto:rajpootdivesh5@gmail.com" className="hover:text-primary transition-colors">
                        rajpootdivesh5@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground transform transition hover:translate-x-1 duration-300 transform-gpu">
                    <dt className="sr-only">Phone</dt>
                    <div className="relative">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <span className="absolute inset-0 animate-spotlight opacity-0 hover:opacity-100 rounded-full"></span>
                    </div>
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

