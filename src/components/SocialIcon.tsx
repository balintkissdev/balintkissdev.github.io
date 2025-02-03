import * as React from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

const SocialIcon: React.FC<Props> = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block w-14 py-4 bg-[whitesmoke] rounded-full text-[#383838] text-center fa-xl link-bg-hover"
    >
      {children}
    </a>
  );
};

export default SocialIcon;
