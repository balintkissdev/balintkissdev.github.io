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
    { name: "Experience", href: "experience" },
    { name: "Education", href: "education" },
    { name: "Side projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Academic achievements", href: "achievements" },
]

const Sidebar = () => {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark fixed-top"
            id={sideNav}
        >
            <button className="navbar-toggler mx-1" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">
                <div className="container-fluid">
                    <div className={`${navbarAvatar} d-none d-lg-block mb-3`}>
                        <a href="#top">
                            <StaticImage
                                className="rounded-circle"
                                src="../images/cv_profile.jpg"
                            />
                        </a>
                    </div>

                    <div className={socialIcons + " d-flex mb-3 justify-content-center"}>
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
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
