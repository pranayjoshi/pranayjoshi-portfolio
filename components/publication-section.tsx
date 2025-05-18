"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { FileText, BookOpen } from "lucide-react"
import PublicationCard from "./publication-card"

export default function PublicationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="publications" className="space-y-8" ref={sectionRef}>
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-purple-500" />
        <h2 className="text-3xl font-bold">Publications</h2>
      </div>

      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        <PublicationCard
          title="PhysioBots: Engaging K-12 Students with Physiological Computing and Robotics"
          authors={[
            "Myles Lewis",
            "Pranay Joshi",
            "Wesley Cade Junkins",
            "Vincent Ingram",
            "Chris S. Crawford",
          ]}
          venue="CHI Conference on Human Factors in Computing Systems Extended Abstracts (CHI EA '24)"
          date="May 2024"
          doi="10.1145/3706599.3720106"
          url="https://dl.acm.org/doi/10.1145/3706599.3720106"
          abstract="Physiological computing, which involves using physiological signals to control technology, has the potential to engage K-12 students in computing education. However, there is limited research on how to effectively introduce physiological computing concepts to K-12 students. In this paper, we present PhysioBots, a novel approach that combines physiological computing with robotics to engage K-12 students in computing education. We describe the design and implementation of PhysioBots, as well as preliminary findings from a pilot study with K-12 students. Our results suggest that PhysioBots can effectively engage students in learning about physiological computing and robotics, while also fostering creativity and problem-solving skills."
          keywords={[
            "Physiological Computing",
            "Robotics",
            "K-12 Education",
            "EEG",
            "EMG",
            "Human-Computer Interaction",
            "STEM Education",
          ]}
        />

        
      </div>

      <style jsx global>{`
        .publication-visualization {
          position: relative;
          width: 100%;
          height: 150px;
        }
        
        .vis-node {
          position: absolute;
          padding: 0.5rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 0.5rem;
          font-size: 0.75rem;
          color: #d4b5ff;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 3s infinite;
        }
        
        .vis-node-1 {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .vis-node-2 {
          top: 60%;
          left: 15%;
          animation-delay: 0.5s;
        }
        
        .vis-node-3 {
          top: 40%;
          right: 15%;
          animation-delay: 1s;
        }
        
        .vis-node-4 {
          bottom: 10%;
          right: 25%;
          animation-delay: 1.5s;
        }
        
        .vis-node-5 {
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 2s;
        }
        
        .vis-line {
          position: absolute;
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.3), rgba(45, 212, 191, 0.3));
          height: 1px;
          transform-origin: left center;
        }
        
        .vis-line-1 {
          top: 20%;
          left: 30%;
          width: 40%;
          transform: rotate(15deg);
        }
        
        .vis-line-2 {
          top: 45%;
          left: 25%;
          width: 50%;
          transform: rotate(-10deg);
        }
        
        .vis-line-3 {
          top: 60%;
          left: 35%;
          width: 30%;
          transform: rotate(30deg);
        }
        
        .vis-line-4 {
          top: 40%;
          left: 55%;
          width: 25%;
          transform: rotate(-45deg);
        }
      `}</style>
    </section>
  )
}
