"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Terminal, Code, Braces, Database, Server, Cpu, Globe, Cloud } from "lucide-react"
import { motion } from "framer-motion"

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [terminalText, setTerminalText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  const skillCategories = [
    {
      id: "languages",
      name: "Languages",
      icon: <Braces className="h-5 w-5" />,
      color: "from-purple-500 to-blue-500",
      skills: ["Golang", "Python", "TypeScript", "JavaScript", "C/C++", "Java", "C#/.NET", "SQL", "Rust", "Bash", "R"],
      description: "Programming languages I've mastered for building robust applications.",
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: <Globe className="h-5 w-5" />,
      color: "from-cyan-500 to-blue-500",
      skills: [
        "React",
        "Next.js",
        "Vue",
        "Angular",
        "HTML/CSS",
        "Tailwind CSS",
        "Electron",
        "Redux",
        "Svelte",
        "SASS",
        "Framer Motion",
        "Three.js",
      ],
      description: "Technologies I use to create engaging user interfaces and experiences.",
    },
    {
      id: "backend",
      name: "Backend",
      icon: <Server className="h-5 w-5" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        "Node.js",
        "Django",
        "REST APIs",
        "GraphQL",
        "gRPC",
        "WebSockets",
        "WebRTC",
        "Express.js",
        "Flask",
        "FastAPI",
        "Spring Boot",
        "Microservices",
      ],
      description: "Tools and frameworks I leverage to build powerful server-side applications.",
    },
    {
      id: "databases",
      name: "Databases",
      icon: <Database className="h-5 w-5" />,
      color: "from-amber-500 to-orange-500",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Kafka", "SQLite", "DynamoDB", "Firebase", "Elasticsearch"],
      description: "Database systems I'm proficient in for efficient data management.",
    },
    {
      id: "devops",
      name: "DevOps & Cloud",
      icon: <Cloud className="h-5 w-5" />,
      color: "from-pink-500 to-rose-500",
      skills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "GCP",
        "Azure",
        "Git",
        "CI/CD",
        "Terraform",
        "Jenkins",
        "GitHub Actions",
        "Prometheus",
        "Grafana",
      ],
      description: "Infrastructure and deployment technologies I use to streamline development workflows.",
    },
    {
      id: "ai",
      name: "AI & ML",
      icon: <Cpu className="h-5 w-5" />,
      color: "from-purple-500 to-violet-500",
      skills: [
        "TensorFlow",
        "PyTorch",
        "OpenCV",
        "NLP",
        "Computer Vision",
        "Reinforcement Learning",
        "Neural Networks",
        "Data Analysis",
        "Pandas",
        "NumPy",
        "Scikit-learn",
      ],
      description: "AI and machine learning technologies I work with to build intelligent systems.",
    },
  ]

  // Terminal typing effect
  useEffect(() => {
    const defaultText = "echo 'Select a skill category to explore my tech stack'"
    let currentText = ""
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex < defaultText.length) {
        currentText += defaultText[currentIndex]
        setTerminalText(currentText)
        currentIndex++
        setTimeout(typeText, 50)
      }
    }

    typeText()

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Handle category hover
  const handleCategoryHover = (category: string) => {
    setActiveCategory(category)
    const selectedCategory = skillCategories.find((c) => c.id === category)

    if (selectedCategory) {
      setTerminalText("")
      let currentText = ""
      let currentIndex = 0
      const commandText = `ls -la ./skills/${category}`

      const typeCommand = () => {
        if (currentIndex < commandText.length) {
          currentText += commandText[currentIndex]
          setTerminalText(currentText)
          currentIndex++
          setTimeout(typeCommand, 50)
        } else {
          setTimeout(() => {
            setTerminalText((prev) => `${prev}\n\n${selectedCategory.description}\n`)
          }, 300)
        }
      }

      typeCommand()
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <section id="skills" className="space-y-8">
      <div className="flex items-center gap-2">
        <Award className="h-6 w-6 text-purple-500" />
        <h2 className="text-3xl font-bold">Skills</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Terminal-inspired category selector */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border h-full">
            <div className="space-y-4">
              <div className="terminal-header">
                <div className="terminal-header-dot bg-red-500"></div>
                <div className="terminal-header-dot bg-yellow-500"></div>
                <div className="terminal-header-dot bg-green-500"></div>
                <span className="text-xs text-zinc-400 ml-2">pranay@skills:~</span>
              </div>

              <div className="terminal-content h-[200px] overflow-y-auto">
                <p className="text-green-400">
                  $ <span className="text-zinc-300">{terminalText}</span>
                  {cursorVisible && <span className="text-zinc-300 animate-pulse">_</span>}
                </p>
              </div>

              <div className="space-y-2">
                {skillCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ${
                      activeCategory === category.id
                        ? "bg-zinc-800 border-l-2 border-purple-500"
                        : "hover:bg-zinc-800/50"
                    }`}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                  >
                    <div
                      className={`h-8 w-8 rounded-md bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right side: Skills visualization */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold gradient-text">
                  {activeCategory
                    ? skillCategories.find((c) => c.id === activeCategory)?.name || "Tech Stack"
                    : "Tech Stack"}
                </h3>
                <Code className="h-5 w-5 text-purple-400" />
              </div>

              <div className="relative min-h-[300px] flex items-center justify-center">
                {activeCategory ? (
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={activeCategory}
                  >
                    {skillCategories
                      .find((c) => c.id === activeCategory)
                      ?.skills.map((skill, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-zinc-900 ring-1 ring-zinc-800 rounded-lg p-4 flex items-center justify-center h-full">
                              <span className="text-center">{skill}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </motion.div>
                ) : (
                  <div className="tech-orbit">
                    <div className="orbit-container">
                      {skillCategories.flatMap((category) =>
                        category.skills.slice(0, 3).map((skill, idx) => (
                          <div
                            key={`${category.id}-${idx}`}
                            className="orbit-item"
                            style={{
                              animationDelay: `${Math.random() * 10}s`,
                              top: `${Math.random() * 80}%`,
                              left: `${Math.random() * 80}%`,
                            }}
                          >
                            <Badge className="bg-zinc-800/80 backdrop-blur-sm">{skill}</Badge>
                          </div>
                        )),
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Terminal className="h-10 w-10 text-purple-500 mx-auto" />
                        <p className="text-zinc-400">Hover over a category to explore skills</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Code snippet section
      <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-purple-400" />
            <h3 className="text-xl font-semibold gradient-text">My Tech DNA</h3>
          </div>

          <div className="relative">
            <pre className="text-xs md:text-sm overflow-x-auto p-4 bg-zinc-950 rounded-lg">
              <code className="language-javascript">
                {`const pranayJoshi = {
  languages: ["Golang", "Python", "TypeScript", "JavaScript", "C/C++"],
  frontend: ["React", "Next.js", "Vue", "Tailwind CSS"],
  backend: ["Node.js", "Django", "REST APIs", "GraphQL"],
  databases: ["PostgreSQL", "MongoDB", "Redis"],
  devOps: ["Docker", "Kubernetes", "AWS", "GCP"],
  ai: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
  
  currentFocus: "Building innovative solutions at the intersection of AI and web technologies",
  
  getExpertise: function() {
    return this.languages
      .concat(this.frontend)
      .concat(this.backend)
      .concat(this.databases)
      .concat(this.devOps)
      .concat(this.ai);
  }
};

// The result of continuous learning and practice
console.log(\`Skills count: \${pranayJoshi.getExpertise().length}+\`);`}
              </code>
            </pre>

            <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs">
              Skills count: 30+
            </div>
          </div>
        </div>
      </Card> */}

      {/* Specialized skills hexagon grid
      <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-400" />
            <h3 className="text-xl font-semibold gradient-text">Specialized Expertise</h3>
          </div>

          <div className="hex-grid">
            {[
              { name: "Brain-Computer Interface", color: "from-purple-600 to-blue-600" },
              { name: "EEG Signal Processing", color: "from-blue-600 to-cyan-600" },
              { name: "Computer Vision", color: "from-cyan-600 to-teal-600" },
              { name: "Natural Language Processing", color: "from-teal-600 to-green-600" },
              { name: "Cloud Architecture", color: "from-green-600 to-yellow-600" },
              { name: "Microservices", color: "from-yellow-600 to-orange-600" },
              { name: "Distributed Systems", color: "from-orange-600 to-red-600" },
              { name: "Real-time Data Processing", color: "from-red-600 to-pink-600" },
              { name: "Robotics", color: "from-pink-600 to-purple-600" },
            ].map((skill, index) => (
              <div key={index} className="hex-item">
                <div className={`hex-content bg-gradient-to-br ${skill.color}`}>
                  <span>{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card> */}

      <style jsx global>{`
        .tech-orbit {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
        
        .orbit-container {
          position: absolute;
          inset: 0;
        }
        
        .orbit-item {
          position: absolute;
          animation: float 15s infinite ease-in-out;
          transform: translateZ(0);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        
        .hex-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          padding: 1rem 0;
        }
        
        .hex-item {
          position: relative;
          width: 100%;
          padding-bottom: 115%;
        }
        
        .hex-content {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: transform 0.3s ease;
          padding: 1rem;
          text-align: center;
        }
        
        .hex-content:hover {
          transform: scale(1.05);
        }
        
        .hex-content span {
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.2;
        }
        
        @media (max-width: 640px) {
          .hex-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
