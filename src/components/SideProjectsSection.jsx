import ResumeSection from "../components/ResumeSection";
import SideProjectCard from "../components/SideProjectCard";

import GitHubButton from "react-github-btn";

import * as React from "react";

export default function SideProjectSection() {
  return (
    <ResumeSection id="projects" title="Side projects">
      <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-8">
        <SideProjectCard
          title="Raycasting pseudo-3D graphics engine"
          url="https://github.com/balintkissdev/raycaster-engine"
          domain="Graphics"
          badges={["C++", "SDL2", "CMake", "Emscripten", "WebAssembly"]}
        >
          <p>
            Retro 3D graphics engine inspired by the one used in Wolfenstein 3D.
            Uses vector math and CPU-based software rendering to turn 2D maps
            into 3D space, includes double-buffering and texture mapping.
          </p>
          <p>
            A{" "}
            <a
              href="https://balintkissdev.github.io/raycaster-engine/"
              target="_blank"
              rel="noreferrer"
            >
              browser-playable live demo
            </a>{" "}
            is compiled with Emscripten.
          </p>
        </SideProjectCard>

        <SideProjectCard
          title="Awesome DOS"
          url="https://github.com/balintkissdev/awesome-dos#readme"
        >
          <p>
            <GitHubButton
              href="https://github.com/balintkissdev/awesome-dos"
              data-size="large"
              data-show-count="true"
              aria-label="Star balintkissdev/awesome-dos on GitHub"
            >
              Star
            </GitHubButton>
          </p>
          <p>
            Curated list of references for development of DOS applications and
            learning about the system itself. The goal of this list is to
            collect information and act as a starting point for someone who
            wants to start out retro-programming for the DOS platform.
          </p>
          <p>
            This list is{" "}
            <a
              href="https://twitter.com/awesome__re/status/1355813614469271555"
              target="_blank"
              rel="noreferrer"
            >
              featured
            </a>{" "}
            on the official{" "}
            <a
              href="https://github.com/sindresorhus/awesome"
              target="_blanK"
              rel="noreferrer"
            >
              Awesome collection
            </a>{" "}
            made by Sindre Sorhus.
          </p>
        </SideProjectCard>
      </div>
    </ResumeSection>
  );
}
