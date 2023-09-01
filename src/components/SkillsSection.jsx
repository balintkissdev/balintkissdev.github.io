import ResumeSection from "./ResumeSection";
import TechSkillRow from "./TechSkillRow";
import Button from './Button'

import * as React from "react";

export default function SkillsSection() {
  return (
    <ResumeSection id="skills" title="Skills">
      <div className="mb-3">
        <h3>Technical skills</h3>
        <div className="flex flex-col divide-y">
          <TechSkillRow
            title="Programming languages"
            skills={["C++", "Go", "Python", "Bash", "Java", "JavaScript", "R"]}
          />
          <TechSkillRow
            title="C++-related technologies"
            skills={[
              "CMake",
              "Make",
              "Qt",
              "QML",
              "Boost",
              "Google Test",
              "Clang Tools",
            ]}
          />
          <TechSkillRow
            title="Cloud computing"
            skills={["Microsoft Azure", "Azure IoT Edge", "Cloud Foundry"]}
          />
          <TechSkillRow
            title="Web development"
            skills={["React", "JSX", "HTML5", "CSS", "Tailwind CSS"]}
          />
          <TechSkillRow
            title="Database systems"
            skills={["PostgreSQL", "MongoDB"]}
          />
          <TechSkillRow title="Containerization" skills={["Docker"]} />
          <TechSkillRow
            title="Operating systems"
            skills={[
              "Microsoft Windows",
              "Debian",
              "Ubuntu",
              "Red Hat",
              "Fedora",
              "Solaris",
            ]}
          />
          <TechSkillRow
            title="Version control"
            skills={["Git", "Perforce", "ClearCase"]}
          />
          <TechSkillRow
            title="Editors and IDEs"
            skills={[
              "Vim",
              "Visual Studio Code",
              "Visual Studio",
              "Qt Creator",
            ]}
          />
          <TechSkillRow
            title="Other"
            skills={[
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
            ]}
          />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="mb-4">Certifications</h3>
        <Button href="http://scr.istqb.org/?name=B%C3%A1lint+Kiss&number=&orderBy=relevancy&orderDirection=&dateStart=2018-06-29&dateEnd=2018-06-29&expiryStart=&expiryEnd=&certificationBody=23&examProvider=&certificationLevel=1&country=101&resultsPerPage=10">
          ISTQB Certified Tester Foundation Level, International Software
          Testing Qualifications Board
        </Button>
      </div>
      <div className="mb-2">
        <h3>Other skills</h3>
        <ul className="ml-4 list-disc list-inside">
          <li>Mentoring</li>
          <li>
            Software design skills, knowledge of Design Patterns, Anti-patterns
            and UML
          </li>
          <li>Interest for new technologies, continous self-education</li>
          <li>Presentation skills</li>
        </ul>
      </div>
    </ResumeSection>
  );
}
