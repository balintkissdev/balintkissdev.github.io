import Layout from "../components/Layout";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import AchievementsSection from "../components/AchievementsSection";
import SideProjectsSection from "../components/SideProjectsSection";

import * as React from "react";

export default function IndexPage() {
  return (
    <Layout>
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SideProjectsSection />
      <SkillsSection />
      <AchievementsSection />
    </Layout>
  );
}
