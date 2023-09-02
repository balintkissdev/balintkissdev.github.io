import { StaticImage } from "gatsby-plugin-image";
import ResumeSection from "./ResumeSection";

import * as React from "react";

export default function AboutSection() {
  return (
    <ResumeSection id="about">
      <div className="w-full min-h-screen flex flex-col items-center lg:mt-64 lg:gap-16">
        {/* HACK: gatsby-image-wrapper overrides with "inline-block" */}
        <div className="inline-block lg:hidden">
          <StaticImage
            className={`
              rounded-full
              w-40 h-40
              md:w-80 md:h-80
            `}
            src="../images/cv_profile.jpg"
          />
        </div>
        <h1 className="text-center font-bold">
          Balint<span class="text-gray-500">&nbsp;Kiss</span>
        </h1>
        <div className="flex flex-col items-stretch gap-4 lg:gap-8 md:text-lg text-justify">
          <p>
            Passionate software developer with a Master's degree in Computer
            Science followed by {new Date().getFullYear() - 2017}+ years of
            experience in the industry. I'm a software technology enthusiast who
            keeps improving his skills and I always apply best practices and
            engineering principles when providing technical solutions in order to
            solve the business needs of my client.
          </p>
          <p>
            This site was created by me using <i>React</i>,
            <i>Tailwind CSS</i> and <i>GatsbyJS</i>.
          </p>
        </div>
      </div>
    </ResumeSection>
  );
}
