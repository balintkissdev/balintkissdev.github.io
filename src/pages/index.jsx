import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import ExperienceSection from '../components/ExperienceSection'
import Layout from '../components/Layout'
import ResumeSection from '../components/ResumeSection'
import Sidebar from '../components/Sidebar'
import SideProjectCard from '../components/SideProjectCard'

const fullTimeExperiences = [
  {
    company: "DMG MORI Heitec Digital Ltd.",
    roles: [
      {
        name: "Senior Software Engineer (C++, Go)",
        start: "January 2022",
      },
      {
        name: "Software Engineer (C++, Go)",
        start: "October 2020",
        end: "January 2022"
      }
    ],
    responsibilities: [
      `Developing Industry 4.0 cloud backend microservices for the CELOS Next
      product using C++17 and Go.`,
      `Implementing messaging with the following communication protocols: REST
      (OpenAPI, Swagger), NATS, gRPC, OPC UA, MQTT.`,
      `PLC/NC machine data serialization using Google's Protocol Buffers.`,
      `Maintaining IoT Edge modules in the Microsoft Azure IoT Edge cloud platform.`,
    ]
  },
  {
    company: "evosoft Hungary Ltd.",
    roles: [
      {
        name: "Senior Software Engineer (C++)",
        start: "November 2018",
        end: "October 2020",
      },
      {
        name: "Software Engineer (C++)",
        start: "November 2017",
        end: "November 2018"
      },
      {
        name: "Junior Software Engineer (C++)",
        start: "January 2017",
        end: "November 2017"
      }
    ],
    responsibilities: [
      `Developed product- and test code to multiple in-house software products
      for the Siemens SINUMERIK system platform in the field of industrial
      automation using C++11/14, Qt 5 and Win32 API.`,
      `Refactored legacy Perl testing framework to BDD tests using Python,
      reducing test maintenance effort by 70%.`,
      `Took responsibility in improving the workflow processes and introduced tools to the team`,
      `Maintained automation scripts written in Bash, Tcl, Perl and Python.`,
    ]
  },
  {
    company: "GE Healthcare",
    roles: [
      {
        name: "Software Intern (Java)",
        start: "July 2015",
        end: "July 2016",
      }
    ],
    responsibilities: [
      `Developed REST-based microservices for a cloud-based medical imaging
      software within the Predix platform using Java with Spring Framework.
      Communication between microservices was done through AMQP messaging
      protocol (RabbitMQ).`,
      `Created unit tests with JUnit and Mockito, BDD tests with JBehave and
      Selenium.`,
      `Member of the division's "DevOps Guild", maintaining applications
      deployed to Cloud Foundry cloud environment, virtualization with Docker.`
    ]
  },
]

const contractingExperiences = [
  {
    company: "ME Embedded Ltd.",
    roles: [
      {
        name: "Freelance Embedded Developer (C++)",
        start: "February 2019",
        end: "June 2019",
      },
    ],
    responsibilities: [
      `Developed IoT software using C++11/14, serial communication and MQTT.`,
      `Created embedded UI with Qt 5 and QML.`,
    ]
  },
  {
    company: "University of West Hungary",
    roles: [
      {
        name: "Research Software Developer (Java, R)",
        start: "June 2013",
        end: "January 2015"
      }
    ],
    responsibilities: [
      `Developed an analytic logic module using Java for a data analytic
      framework used in 25294/207 TÁMOP-4.2.2.C-11/1/KONV-2012-0015 Earth-system
      research project.`,
      `Implemented a scientific data analytic process using R statistical
      programming language and RapidMiner data science platform.`,
      `Created a RapidMiner plugin and interfaced RapidMiner with our data analytic framework.`,
      `Administered an Apache Tomcat web server and a MongoDB database on a
      virtual Debian machine running on VMware ESXi.`
    ]
  }
]

const IndexPage = () => {
  return (
    <Layout>
      <Sidebar />
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
            Experienced software developer in the field of IoT with Master's in
            Computer Science. Fluent in modern C++, Go, Python and using Linux for
            development. I'm a software technology enthusiast and always apply best
            practices and engineering principles to my work.
            I'm a software technology enthusiast who keeps improving his skills
            and always apply best practices and engineering principles to my
            work.
          </p>
          <p className="lead mb-5">
            This site was created by me using <a href="https://reactjs.org/" target="_blank">React</a> with <a href="https://www.gatsbyjs.com/" target="_blank">GatsbyJS</a>.
          </p>
        </ResumeSection>

        <ResumeSection id="experience" title="Full-time professional experience">
          <ExperienceSection experiences={fullTimeExperiences} />
        </ResumeSection>

        <ResumeSection id="freelance" title="Contracting experience">
          <ExperienceSection experiences={contractingExperiences} />
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
          <div className="row">
            <SideProjectCard
              title="Raycasting pseudo-3D graphics engine"
              url="https://github.com/balintkissdev/raycaster-engine"
            >
              A 3D graphics engine inspired by the one used in Wolfenstein 3D.
              Written in C++ with SDL2. Uses vector math to turn 2D maps into 3D
              space, includes double buffering and texture mapping. <a
                href="https://balintkissdev.github.io/raycaster-engine/"
                target="_blank">Browser-playable live demo</a> is compiled with
              Emscripten.
            </SideProjectCard>

            <SideProjectCard
              title="Awesome DOS"
              url="https://github.com/balintkissdev/awesome-dos"
            >
              Curated list of references for development of DOS applications and
              learning about the system itself. The goal of this list is to collect
              information and act as a starting point for someone who wants to start
              out retro-programming for the DOS platform.
            </SideProjectCard>
          </div>
        </ResumeSection>

        <ResumeSection id="skills" title="Skills">
          <div>
            <h2>Technical skills</h2>
            <div class="mb-3">
              <div class="row">
                <div class="col-sm-3 fw-bold">
                  C++-related skills
                </div>
                <div class="col-sm-8">
                  C++98/11/14/17, STL, Make, CMake
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 fw-bold">
                  C++ libraries and APIs
                </div>
                <div class="col-sm-8">
                  Qt 5, QML, Boost, Win32 API, Google Test, SDL2
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 fw-bold">
                  Other programming languages
                </div>
                <div class="col-sm-8">
                  Go, Rust, C, Python, Java, Bash, LaTeX, Tcl, Perl
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 fw-bold">
                  Version control
                </div>
                <div class="col-sm-8">
                  Git, Perforce, ClearCase
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 fw-bold">
                  Operating systems
                </div>
                <div class="col-sm-8">
                  Microsoft Windows, Linux (Ubuntu, Debian, Red Hat), Solaris
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 fw-bold">
                  Development tools
                </div>
                <div class="col-sm-8">
                  GDB, Doxygen, Clang Tools, OpenAPI/Swagger, Google’s Protocol
                  Buffers, Docker, CI Tools (Jenkins, Travis CI, AppVeyor)
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3 fw-bold">
                  IDEs and editors
                </div>
                <div class="col-sm-8">
                  Vim, Visual Studio 2019, Visual Studio Code, Qt Creator
                </div>
              </div>

            </div>
          </div>
          <div className="mb-3">
            <h2>Certifications</h2>
            <p>
              ISTQB Certified Tester Foundation Level, International Software
              Testing Qualifications Board.
            </p>
          </div>
          <div className="mb-3">
            <h2>Other skills</h2>
            <ul>
              <li>Library API design, knowledge of Design Patterns, Anti-patterns and UML</li>
              <li>Interest for new technologies, continous self-education</li>
              <li>Quick learning and adapting to new environments and domains</li>
              <li>Analytical skills, attention, precision</li>
              <li>Presentation skills</li>
            </ul>
          </div>

          <div className="mb-3">
            <h2>Hobbies and interests</h2>
            <ul>
              <li>Guitar playing</li>
              <li>Home studio mixing and mastering</li>
              <li>Learning about game development</li>
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
  )
}

export default IndexPage
