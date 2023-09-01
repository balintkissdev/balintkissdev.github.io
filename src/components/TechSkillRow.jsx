import Badge from "./Badge";

import * as React from "react";

export default function TechSkillRow({ title, skills }) {
  return (
    <div className="flex flex-col sm:flex-row py-2">
      <div className="sm:flex-grow-0 sm:flex-shrink-0 sm:w-[25%] font-bold">{title}</div>
      <div className="sm:flex-grow-0 sm:flex-shrink-0 sm:w-[66.66666667%]">
        {Badge.makeBadges(skills)}
      </div>
    </div>
  );
}
