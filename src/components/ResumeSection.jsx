import * as React from 'react'
import {
    resumeSection
} from './ResumeSection.module.css'

const ResumeSection = ({ id, title, children }) => {
    return (
        <>
            <section id={id} className={resumeSection + " p-3 p-lg-5 d-flex align-items-center"}>
                <div class="w-100">
                    {title && <h1 class="mb-5">{title}</h1>}
                    {children}
                </div>
            </section>
            <hr className="m-0" />
        </>
    )
}

export default ResumeSection