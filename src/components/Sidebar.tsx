import SocialIcon from "./SocialIcon.tsx";
import profile from "../assets/cv_profile.jpg";

import { Link, animateScroll } from "react-scroll";

import * as React from "react";

interface SideBarLink {
  name: string;
  href: string;
}

const sideBarLinks: SideBarLink[] = [
  { name: "About", href: "about" },
  { name: "Experience", href: "experience" },
  { name: "Education", href: "education" },
  { name: "Side projects", href: "projects" },
  { name: "Skills", href: "skills" },
  { name: "Academic achievements", href: "achievements" },
];

interface SidebarState {
  opened: boolean;
}

class Sidebar extends React.Component<{}, SidebarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  hamburgerLine =
    "h-1 w-6 my-1 bg-[whitesmoke] transition ease transform duration-200";

  toggleIsOpen = () => {
    this.setState((prev) => ({
      opened: !prev.opened,
    }));
  };

  render() {
    return (
      <>
        <button
          className={`fixed flex flex-col justify-center items-center top-4 right-6 h-12
      w-12 p-2 cursor-pointer rounded-lg bg-[#383837] lg:hidden`}
          onClick={this.toggleIsOpen}
        >
          <span
            className={`${this.hamburgerLine} ${
              this.state.opened && "rotate-45 translate-y-[0.65rem]"
            }`}
          ></span>
          <span
            className={`${this.hamburgerLine} ${
              this.state.opened && "opacity-0"
            }`}
          ></span>
          <span
            className={`${this.hamburgerLine} ${
              this.state.opened && "-rotate-45 -translate-y-[0.65rem]"
            }`}
          ></span>
        </button>
        <nav
          className={`
        fixed lg:flex flex-col items-center justify-start max-w-screen-sm lg:max-w-[16rem]
        h-full bg-[#383837] text-[whitesmoke] px-6 transition lg:transition-none duration-200 ease-in z-10
        ${
          this.state.opened
            ? "translate-x0"
            : "-translate-x-96 lg:translate-x-0"
        }
      `}
        >
          <div className="py-8">
            <div className="hidden lg:flex justify-center pb-4">
              <a
                href="#top"
                className="transition ease-in-out hover:brightness-110 duration-300"
              >
                <img className="rounded-full" src={profile.src} />
              </a>
            </div>
            <div className="flex justify-center gap-4">
              <SocialIcon href="https://linkedin.com/in/balintkissdev">
                <i className="fa-brands fa-linkedin"></i>
              </SocialIcon>
              <SocialIcon href="https://github.com/balintkissdev">
                <i className="fa-brands fa-github"></i>
              </SocialIcon>
              <SocialIcon href="mailto:balintkissdev@gmail.com">
                <i className="fa-solid fa-envelope"></i>
              </SocialIcon>
            </div>
          </div>
          <ul className="flex flex-col mx-2 gap-4 uppercase font-bold tracking-wider">
            {sideBarLinks.map((link) => {
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    smooth={true}
                    duration={500}
                    className="transition ease-in-out hover:text-[burlywood] duration-300"
                    onClick={() => this.setState({ opened: false })}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  }
}

export default Sidebar;