import { StaticImage } from "gatsby-plugin-image";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import React, { useState } from "react";

const sideBarLinks = [
  { name: "About", href: "about" },
  { name: "Experience", href: "experience" },
  { name: "Education", href: "education" },
  { name: "Side projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Academic achievements", href: "achievements" },
];

function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-14 p-4 bg-[whitesmoke] rounded-full justify-center text-[#383838] transition ease-in-out hover:bg-[burlywood] duration-300"
    >
      {children}
    </a>
  );
}

export default function Sidebar() {
  const hamburgerLine = "h-1 w-6 my-1 bg-[whitesmoke] transition ease transform duration-200"

  const [isOpen, setOpen] = useState(false);

  // BUG: On shorter mobile phones, body still scrolls a little
  const toggleBodyScroll = () => {
    document.body.classList.toggle("overflow-hidden");
  };

  const toggleIsOpen = () => {
    setOpen((prev) => !prev);
    // toggleBodyScroll();
  };

  return (
    <>
    <button
      className={`fixed flex flex-col justify-center items-center top-4 right-6 h-12
      w-12 p-2 cursor-pointer rounded-lg bg-[#383837] lg:hidden`}
      onClick={toggleIsOpen}
    >
      <span
        className={`${hamburgerLine} ${isOpen && "rotate-45 translate-y-[0.65rem]"}`}
      ></span>
      <span
        className={`${hamburgerLine} ${isOpen && "opacity-0"}`}
      ></span>
      <span
        className={`${hamburgerLine} ${isOpen && "-rotate-45 -translate-y-[0.65rem]"}`}
      ></span>
    </button>
    <nav className={`
        fixed lg:flex flex-col justify-center max-w-screen-sm lg:max-w-[16rem]
        h-full bg-[#383837] text-[whitesmoke] px-6 gap-8 transition lg:transition-none duration-200 ease-in z-10
        ${isOpen ? "translate-x0" : "-translate-x-96 lg:translate-x-0"}
      `}>
      <div className="flex justify-center">
        <a
          href="#top"
          className="transition ease-in-out hover:brightness-110 duration-300"
        >
          <StaticImage
            className="hidden lg:inline-block rounded-full"
            src="../images/cv_profile.jpg"
          />
        </a>
      </div>
      <div className="flex justify-center pt-4 gap-4">
        <SocialIcon href="https://linkedin.com/in/balintkissdev">
          <FaLinkedin size={26} />
        </SocialIcon>
        <SocialIcon href="https://github.com/balintkissdev">
          <FaGithub size={26} />
        </SocialIcon>
        <SocialIcon href="mailto:balintkissdev@gmail.com">
          <FaEnvelope size={26} />
        </SocialIcon>
      </div>
      <ul className="mx-2 uppercase font-bold tracking-wider">
        {sideBarLinks.map((link) => {
          return (
            <li className="my-8" key={link.href}>
              <a
                className="transition ease-in-out hover:text-[burlywood] duration-300" href={`#${link.href}`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    </>
  );
}
