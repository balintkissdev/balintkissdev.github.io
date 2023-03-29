import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Button from '../components/Button'
import ExperienceSection from '../components/ExperienceSection'
import Layout from '../components/Layout'
import ResumeSection from '../components/ResumeSection'
import Sidebar from '../components/Sidebar'
import SideProjectCard from '../components/SideProjectCard'
import TechSkillRow from '../components/TechSkillRow'

const professionalExperience = [
  {
    heading: "DMG MORI Heitec Digital Ltd.",
    roles: [
      {
        name: "Senior Software Engineer",
        start: "January 2022",
      },
      {
        name: "Software Engineer",
        start: "October 2020",
        end: "January 2022"
      }
    ],
    badges: ["C++17", "Go", "NATS", "gRPC", "OPC UA", "MQTT", "REST", "OpenAPI",
      "Google Protocol Buffers", "Google Test", "Google Mock", "Microsoft Azure", "Docker"],
    responsibilities: [
      `Developing Industry 4.0 cloud backend microservices for the CELOS Next
      product.`,
      `Forwarding PLC/NC machine data to various industrial communication protocol standards.`,
      `Maintaining IoT Edge modules in the Microsoft Azure IoT Edge cloud platform.`,
    ]
  },
  {
    heading: "Freelance Embedded Developer",
    roles: [
      {
        name: "ME Embedded Ltd.",
        start: "February 2019",
        end: "June 2019",
      },
    ],
    badges: ["C++14", "Raspberry Pi", "Qt 5", "QML", "MQTT"],
    responsibilities: [
      `Developed embedded UI for a medical equipment's touch screen device.`,
      `Forwarded machine state from serial I/O to an IoT server.`,
    ]
  },
  {
    heading: "evosoft Hungary Ltd.",
    roles: [
      {
        name: "Senior Software Engineer",
        start: "November 2018",
        end: "October 2020",
      },
      {
        name: "Software Engineer",
        start: "November 2017",
        end: "November 2018"
      },
      {
        name: "Junior Software Engineer",
        start: "January 2017",
        end: "November 2017"
      }
    ],
    badges: ["C++14", "Qt 5", "Google Test", "Google Mock", "Win32 API", "Python", "Bash", "Perl", "Tcl"],
    responsibilities: [
      `Developed product- and test code to multiple in-house software products
      for the Siemens SINUMERIK system platform in the field of industrial
      automation.`,
      `Refactored legacy testing framework to BDD tests, reducing test
      maintenance effort by 70%.`,
      `Took responsibility in improving the workflow processes and introduced tools to the team.`,
      `Maintained in-house tooling and automation scripts.`,
    ]
  },
  {
    heading: "GE Healthcare",
    roles: [
      {
        name: "Software Intern",
        start: "July 2015",
        end: "July 2016",
      }
    ],
    badges: ["Java", "Spring Boot", "REST", "RabbitMQ", "Redis", "Cloud Foundry", "Docker", "JUnit", "Mockito", "JBehave", "Selenium"],
    responsibilities: [
      `Developed microservices for a cloud-based medical imaging software
        within the Predix platform.`,
      `Member of the division's "DevOps Guild", shared Docker best practices.`
    ]
  },
  {
    heading: "University of West Hungary",
    roles: [
      {
        name: "Research Software Developer",
        start: "June 2013",
        end: "January 2015"
      }
    ],
    badges: ["Java", "R", "RapidMiner", "Apache Tomcat", "MongoDB", "VMware ESXi"],
    responsibilities: [
      `Developed a multivariate regression analytic plugin for our data analytic
      framework used in the 25294/207 TÁMOP-4.2.2.C-11/1/KONV-2012-0015 Earth-system
      research project.`,
      `Presented my research work on multiple conferences and was co-author in
      the publications.`,
      `Administered a virtual web server running in the cloud, supporting
      multiple members of the research project.`
    ]
  }
]

function IndexPage() {
  return (
    <div>
      <Sidebar />
      <Layout>
        <div className="p-0">
          <ResumeSection id="about">
            <div className="d-flex justify-content-center d-lg-none pt-5">
              <StaticImage
                className="rounded-circle w-50"
                src="../images/cv_profile.jpg"
              />
            </div>
            <h1 className="d-flex justify-content-center display-1 fw-bold mb-3">Balint<span class="text-muted">&nbsp;Kiss</span></h1>
            <p className="lead mb-5">
              Passionate software developer with 6+ years of experience, providing
              my talent in the field of cloud computing and IoT. I'm a software
              technology enthusiast who keeps improving his skills and always
              apply best practices and engineering principles when providing
              technical solutions in order to solve the business needs of my
              client.
            </p>
            <p className="lead mb-5">
              This site was created by me using <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a> with <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer">GatsbyJS</a>.
            </p>
          </ResumeSection>

          <ResumeSection id="experience" title="Professional experience">
            <ExperienceSection experiences={professionalExperience} />
          </ResumeSection>

          <ResumeSection id="education" title="Education">
            <div className="row">
              <div className="col-sm-2 fw-bold">
                February 2015 - June 2017
              </div>
              <div className="col-sm-8">
                <h2>Eötvös Loránd University</h2>
                <p>Master of Science (M.Sc.), Computer Science - Software Technology specialization</p>
                <p>Master thesis: <i>Information retrieval from Java archive format</i></p>
              </div>

              <div className="row">
                <div className="col-sm-2 fw-bold">
                  September 2011 - January 2015
                </div>
                <div className="col-sm-8">
                  <h2>University of West Hungary</h2>
                  <p>Bachelor of Science (B.Sc.), Business Informatics Engineer - Software Development specialization</p>
                  <p>Bachelor thesis: <i>NoSQL Database System and Creation of
                    Related Analytic Methods</i></p>
                </div>
              </div>
            </div>
          </ResumeSection>

          <ResumeSection id="projects" title="Side projects">
            <div className="row g-4">
              <SideProjectCard
                title="Raycasting pseudo-3D graphics engine"
                url="https://github.com/balintkissdev/raycaster-engine"
                domain="Graphics"
                badges={["C++", "SDL2", "CMake", "Emscripten", "WebAssembly"]}
              >
                <p>
                  Retro 3D graphics engine inspired by the one used in Wolfenstein
                  3D. Uses vector math and CPU-based software rendering to turn 2D maps into 3D space, includes
                  double-buffering and texture mapping.
                </p>
                <p>
                  A <a href="https://balintkissdev.github.io/raycaster-engine/"
                  target="_blank" rel="noreferrer">browser-playable live
                  demo</a> is compiled with Emscripten.
                </p>
              </SideProjectCard>

              <SideProjectCard
                title="My resume website"
                url="https://github.com/balintkissdev/balintkissdev.github.io"
                domain="Web development"
                badges={["React", "HTML", "CSS", "GatsbyJS", "Bootstrap 5"]}
              >
                <a href="#top">This</a> mobile-first responsive site for my resume
                to showcase my web development abilities.
              </SideProjectCard>

              <SideProjectCard
                title="Awesome DOS"
                url="https://github.com/balintkissdev/awesome-dos#readme"
              >
                <p>
                  Curated list of references for development of DOS applications
                  and learning about the system itself. The goal of this list is
                  to collect information and act as a starting point for someone
                  who wants to start out retro-programming for the DOS platform.
                </p>
                <p>
                  This list is <a
                  href="https://twitter.com/awesome__re/status/1355813614469271555"
                  target="_blank" rel="noreferrer">featured</a> on the official
                  <a href="https://github.com/sindresorhus/awesome"
                  target="_blanK" rel="noreferrer">Awesome collection</a> made
                  by Sindre Sorhus.
                </p>
              </SideProjectCard>
            </div>
          </ResumeSection>

          <ResumeSection id="skills" title="Skills">
            <div className="mb-3">
              <h2>Technical skills</h2>
              <TechSkillRow
                title="Programming languages"
                skills={["C++", "Go", "Python", "Bash", "Java", "JavaScript", "R"]}
              />
              <TechSkillRow
                title="C++-related technologies"
                skills={
                  ["CMake", "Make", "Qt", "QML", "Boost", "Google Test", "Clang Tools"]
                }
              />
              <TechSkillRow
                title="Cloud computing"
                skills={
                  ["Microsoft Azure", "Azure IoT Edge", "Cloud Foundry"]
                }
              />
              <TechSkillRow
                title="Web development"
                skills={
                  ["React", "JSX", "HTML5", "CSS", "Bootstrap 5"]
                }
              />
              <TechSkillRow
                title="Database systems"
                skills={
                  ["PostgreSQL", "MongoDB"]
                }
              />
              <TechSkillRow
                title="Containerization"
                skills={
                  ["Docker"]
                }
              />
              <TechSkillRow
                title="Operating systems"
                skills={
                  ["Microsoft Windows", "Debian", "Ubuntu", "Red Hat", "Fedora", "Solaris"]
                }
              />
              <TechSkillRow
                title="Version control"
                skills={
                  ["Git", "Perforce", "ClearCase"]
                }
              />
              <TechSkillRow
                title="Editors and IDEs"
                skills={
                  ["Vim", "Visual Studio Code", "Visual Studio", "Qt Creator"]
                }
              />
              <TechSkillRow
                title="Other"
                skills={
                  [
                    "Design patterns",
                    "Anti-patterns",
                    "Agile methodologies (Scrum, SAFE)",
                    "Test automation",
                    "TDD",
                    "BDD",
                    "CI/CD",
                    "UML",
                    "API and library programming",
                    "Functional programming",
                  ]
                }
              />
            </div>
            <div className="mb-3">
              <h2 className="mb-3">Certifications</h2>
              <Button href="http://scr.istqb.org/?name=B%C3%A1lint+Kiss&number=&orderBy=relevancy&orderDirection=&dateStart=2018-06-29&dateEnd=2018-06-29&expiryStart=&expiryEnd=&certificationBody=23&examProvider=&certificationLevel=1&country=101&resultsPerPage=10">
                ISTQB Certified Tester Foundation Level, International Software
                Testing Qualifications Board
              </Button>
            </div>
            <div className="mb-3">
              <h2>Other skills</h2>
              <ul>
                <li>Mentoring</li>
                <li>Software design skills, knowledge of Design Patterns, Anti-patterns and UML</li>
                <li>Interest for new technologies, continous self-education</li>
                <li>Presentation skills</li>
              </ul>
            </div>
          </ResumeSection>

          <ResumeSection id="achievements" title="Academic achievements">
            <div class="row">
              <div class="col-sm-3 fw-bold">
                Publications
              </div>
              <div class="col-sm-8">
                <ul>
                  <li>
                    Zoltán Pödör, Bálint Kiss, György Csóka, László Jereb<br />
                    Possible climatic correlation of individual great buttefly
                    species catch data – examinal methodology and preliminary
                    results <br />University of West Hungary, Faculty of Forestry,
                    Faculty Scientific Conference
                    <br />Sopron, Hungary, 10 December 2013
                  </li>

                  <li>
                    Zoltán Pödör, György Csóka, Bálint Kiss<br />
                    Simple- and
                    Multivariate data analysis of light trap catching data by a
                    systematic window procedure<br />
                    Decision Support System Workshop
                    and ForestDSS Community of Practice
                    <br />Lisbon, Portugal, 4-6 December 2013
                  </li>
                </ul>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 fw-bold">
                Conference presentations
              </div>
              <div class="col-sm-8">
                <ul>
                  <li>
                    Development of data analytic system for forest data in
                    RapidMiner and R environment
                    <br />XXXII. National Conference of
                    Scientific Students Associations (OTDK)<br />
                    Szeged, Hungary, 16-18
                    April 2015
                  </li>

                  <li>
                    Development of CReMIT-based data analytic method for
                    processing of forestry time series data
                    <br />HTE Infokom 2014, 19th
                    HTE Infocommunication Networks and Applications Conference and
                    Exhibition, Student section
                    <br />Kecskemét, Hungary, 9 October 2014
                  </li>

                  <li>
                    Development of data analytic system for forest data in
                    RapidMiner and R environment<br />
                    University of West Hungary,
                    Simonyi Károly Faculty of Engineering, Wood Sciences and
                    Applied Arts, Faculty Conference of Scientific Students
                    Associations (TDK)
                    <br />Sopron, Hungary, 24 April 2014
                  </li>
                </ul>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 fw-bold">
                Research projects
              </div>
              <div class="col-sm-8">
                <p>
                  25294/207 TÁMOP-4.2.2.C-11/1/KONV-2012-0015 „Scientific
                  processing of Earth-system data and socialization of knowledge
                  with the help of modern IT resources
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 fw-bold">
                Awards, honors
              </div>
              <div class="col-sm-8">
                <p>
                  Earned II. place for presented research paper at University of West Hungary Faculty Conference of Scientific
                  Students Associations (TDK)
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3 fw-bold">
                Memberships
              </div>
              <div class="col-sm-8">
                Richter Réz Géza College for Advanced Studies (2013 - 2015)
              </div>
            </div>
          </ResumeSection>
        </div>
      </Layout>
    </div>
  )
}

export default IndexPage
