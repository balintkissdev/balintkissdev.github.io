import * as React from 'react'
import Badge from './Badge'

function ExperienceSection({ experiences }) {
    return (
        <>
            {
                experiences.map((experience) => (
                    <div className="container mb-3">
                        <h2 className="mb-2">{experience.heading}</h2>
                        {
                            experience.roles.map((role) => (
                                <div className="row mb-3">
                                    <div className="col-sm-2 fw-bold">
                                        {role.start} -<br />{role.end ? role.end : "Present"}
                                    </div>
                                    <div className="col">
                                        <h3>{role.name}</h3>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            experience.badges &&
                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <p>
                                        {
                                            experience.badges.map((badge) => (
                                                <Badge>{badge}</Badge>
                                            ))
                                        }
                                    </p>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <ul className="list-group list-group-flush">
                                    {
                                        experience.responsibilities.map((responsibility) => (
                                            <li className="list-group-item">{responsibility}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ExperienceSection