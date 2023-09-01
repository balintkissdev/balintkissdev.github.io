import ResumeSection from "./ResumeSection";

import * as React from "react";

function EducationItem({
  institute,
  degree,
  duration,
  location,
  specialization,
  thesisLevel,
  thesisTitle,
  research
}) {
  return (
      <div className="flex flex-col sm:grid grid-cols-12 gap-4 border-solid rounded-lg border-2 p-4 mb-8">
        <div className="col-span-10 mb-4">
          <h3 className="text-xl">{institute}</h3>
            <p className="text-gray-500">{location}</p>
            <div className="pt-1 col-span-2">
              <h4 className="">{degree}</h4>
              <p className="py-2 font-bold">{duration}</p>
            </div>
              <p className="pb-2">
                {specialization}
              </p>
              <p>
                {thesisLevel} thesis: <i>{thesisTitle}</i>
              </p>
              <p>
                Participated in <i>{research}</i> research project.
              </p>
        </div>
      </div>
  );
}

export default function EducationSection() {
  return (
    <ResumeSection id="education" title="Education">
        <EducationItem
          institute="Eötvös Loránd University"
          degree="Master of Science (M.Sc.), Computer Science"
          duration="2015 - 2017"
          location="Budapest"
          specialization="Software Technology specialization"
          thesisLevel="Master"
          thesisTitle="Information retrieval from Java archive format"
          research="CodeCompass"
        />

        <EducationItem
          institute="University of West Hungary"
          degree="Bachelor of Science (B.Sc.), Business Informatics Engineer"
          duration="2011 - 2015"
          location="Sopron"
          specialization="Software Development specialization"
          thesisLevel="Bachelor"
          thesisTitle="NoSQL Database System and Creation of Related Analytic Methods"
          research="25294/207 TÁMOP-4.2.2.C-11/1/KONV-2012-0015 Earth-system"
        />
    </ResumeSection>
  );
}
