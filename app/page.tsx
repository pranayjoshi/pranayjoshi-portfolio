import { Card } from "@/components/ui/card"
import { Code, Github, Linkedin, Mail, Phone, Terminal, ExternalLink, Briefcase, GraduationCap } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SkillsSection from "@/components/skills-section"
import ExperienceCard from "@/components/experience-card"
import ProjectCard from "@/components/project-card"
import HeroSection from "@/components/hero-section"
import PublicationsSection from "@/components/publication-section"

export default function Home() {
  return (
    <main className="min-h-screen grid-background">
      <Navbar />

      <HeroSection />

      <div className="container mx-auto px-4 py-12 space-y-24">
        {/* About Section */}
        <section id="about" className="space-y-8">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold gradient-text">Who I Am</h3>
                <p className="text-zinc-300">
                  I'm a passionate Software Engineer with expertise in Backend Development, Full Stack Engineering, and
                  AI/ML. Currently pursuing my B.S. in Computer Science with a minor in Robotics at The University of
                  Alabama, I combine academic excellence with practical experience in industry and research.
                </p>
                <p className="text-zinc-300">
                  My journey includes contributions to open source through Google Summer of Code, research in
                  Human-Computer Interaction, and development of innovative projects like brain-computer interfaces and
                  AI-powered applications.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold gradient-text">Education</h3>
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium">The University of Alabama</h4>
                    <p className="text-sm text-zinc-400">B.S. in Computer Science, Minor in Robotics</p>
                    <p className="text-sm text-zinc-400">May 2027</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-zinc-300">• GPA: 3.96/4.00</p>
                      <p className="text-sm text-zinc-300">
                        • 2x President's List, University Honors Scholar, Emerging Scholar
                      </p>
                      <p className="text-sm text-zinc-300">
                        • Achievements: Google Summer of Code, ACM ICPC finalist, UGAHacks winner, Google Code-in winner
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-8">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-6">
            <ExperienceCard
              title="Backend Engineer Intern"
              company="Shipt"
              location="Birmingham, Alabama"
              period="June 2025 - August 2025 (Upcoming)"
              description={[
                "Will develop and maintain backend services using Golang to support the Members Payment infrastructure.",
              ]}
            />

            <ExperienceCard
              title="Backend Developer"
              company="Center for Advanced Public Safety"
              location="Tuscaloosa, Alabama"
              period="August 2024 – Present"
              description={[
                "Build an Automation Pipeline tool using Python for ArcGIS users to streamline the process of physically extracting and visualizing CAD objects as feature classes.",
                "Leverage Golang's concurrency with Next.js for development of web-based statistics platform for visualizing different relationships between E-crash data from all 67 counties of Alabama.",
                "Build framework using Docker and company's server to perform instant queries on department's SQL database, to build multiple features for over 170+ divisions.",
              ]}
            />

            <ExperienceCard
              title="Software Developer (Open Source)"
              company="Google Summer of Code (Postman)"
              location="Remote"
              period="May 2024 – August 2024"
              description={[
                "Developed a CLI Source Generator for Corvus.JsonSchema, by integrating Corvus APIs to automatically generate and add Schema code to user's project for compilation.",
                "Leveraged Postman and JSON Schema for data modeling, to generate code adhering to standardized data structures.",
              ]}
            />

            <ExperienceCard
              title="Research Assistant"
              company="Human Technology and Interaction Lab, The University of Alabama"
              location="Tuscaloosa, Alabama"
              period="Jan 2024 – Present"
              description={[
                "Develop a Human-Computer Interaction(HCI) platform powered with AI similar to Google Teachable Machine for EEG/EMG devices, which collects and trains on live data and detects movements and emotions in real time.",
                "Co-authored and published research paper on EEG and EMG device applications for engaging K-12 students with physiological computing and robotics to CHI 2025 Japan, the most prestigious research conference in the HCI field.",
                "Build latest Neuroscope, a brain-computer interface (BCI) and EEG-powered neurotechnology application using JavaScript, Python, Rete.js, and Electron to control robots with the MUSE device by processing brain waves.",
              ]}
            />

            <ExperienceCard
              title="Artificial Intelligence Developer"
              company="Dubverse"
              location="Delhi, India"
              period="Oct 2021 – Oct 2022"
              description={[
                "Led a team of six undergraduates to develop a Computer Vision product for a $30M startup using Python, GCP, TensorFlow, and OpenCV, enhancing Google Lens' text masking and generating $100/week in beta.",
              ]}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <ProjectCard
              title="MindBeats"
              role="Winner, UGAHacks"
              period="Feb 2025"
              githubUrl="https://github.com/pranayjoshi/mindbeat"
              location="Athens, Georgia"
              description="EEG-based music recommendation system that utilizes real-time brain signals and emotion detection via custom CNN model to generate playlist recommendations."
              tags={["Python", "TensorFlow", "Streamlit", "OpenAI API", "EEG", "CNN"]}
            />

            <ProjectCard
              title="Hoister"
              role="Developer"
              githubUrl="https://github.com/pranayjoshi/hoister"
              location="Tuscaloosa, Alabama"
              description="User-friendly web hosting platform for seamless deployment, of backend web services and front-end, full-stack applications."
              tags={["AWS", "React", "Next.js", "Golang", "TypeScript", "Kafka", "Docker"]}
            />

            <ProjectCard
              title="Neuroscope"
              role="Developer"
              githubUrl="https://github.com/htil/neuroscope"
              location="Tuscaloosa, Alabama"
              description="EEG-powered neurotechnology to perform complex robotic simulation using brain waves and writing commands via Scratch like interface."
              tags={["JavaScript", "Python", "Electron", "BCI", "EEG", "Robotics", "Blockly"]}
            />

            <ProjectCard
              title="Medico"
              role="StarStruck project, GitHub"
              githubUrl="https://github.com/pranayjoshi/medico"
              period="May 2020 – Sept 2020"
              location="India"
              description="AI-driven, CLI, and speech-based tool for detecting medical terms with 20+ stars and over 1500 views."
              tags={["Python", "NLP", "NLTK", "Pandas", "NumPy", "Amazon Transcribe API", "CLI"]}
            />
          </div>
        </section>

        {/* Publications Section */}
        <PublicationsSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Contact Section */}
        <section id="contact" className="space-y-8">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold">Contact</h2>
          </div>

          <Card className="p-6 bg-zinc-900/50 border-zinc-800 animated-border">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold gradient-text">Get In Touch</h3>
              <p className="text-zinc-300">
                I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out
                through any of the channels below.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <a
                      href="mailto:pjoshi6@crimson.ua.edu"
                      className="text-zinc-300 hover:text-purple-400 transition-colors"
                    >
                      pjoshi6@crimson.ua.edu
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <a
                      href="mailto:pjoshi6@crimson.ua.edu"
                      className="text-zinc-300 hover:text-purple-400 transition-colors"
                    >
                      pranayjoshi4466@gmail.com
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-purple-400" />
                    <a
                      href="https://linkedin.com/in/pranay-joshi-/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-purple-400 transition-colors flex items-center gap-1"
                    >
                      linkedin.com/in/pranay-joshi-/
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-purple-400" />
                    <a
                      href="https://github.com/pranayjoshi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-purple-400 transition-colors flex items-center gap-1"
                    >
                      github.com/pranayjoshi/
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </main>
  )
}
