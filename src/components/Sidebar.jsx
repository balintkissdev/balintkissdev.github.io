import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image'
import {
    navItem,
    navLink,
    navbarAvatar,
    navbarLinks,
    navbarNav,
    sideNav,
    socialIcons,
} from './Sidebar.module.css';

const sideBarLinks = [
    { name: "About", href: "about" },
    { name: "Full-time experience", href: "experience" },
    { name: "Contracting experience", href: "freelance" },
    { name: "Education", href: "education" },
    { name: "Side projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Academic achievements", href: "achievements" },
]

const Sidebar = () => {
    return (
        <nav
            className="navbar fixed-top"
            id={sideNav}
        >
            <div className={navbarAvatar + " mb-3"}>
                <a href="#top">
                    <StaticImage
                        className="rounded-circle"
                        src="../images/cv_profile.jpg"
                    />
                </a>
            </div>

            <div className={socialIcons + " mb-3"}>
                <a class="fab fa-linkedin" href="https://linkedin.com/in/balintkissdev" target="_blank"></a>
                <a class="fab fa-github" href="https://github.com/balintkissdev" target="_blank"></a>
                <a class="fa-solid fa-envelope" href="mailto:balintkissdev@gmail.com"></a>
            </div>

            <div className={navbarLinks}>
                <ul className={navbarNav}>
                    {
                        sideBarLinks.map((link) => {
                            return (
                                <li className={navItem} key={link.href}>
                                    <a className={navLink} href={`#${link.href}`}>
                                        {link.name}
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
