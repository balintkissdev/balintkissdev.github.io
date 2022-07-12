import * as React from 'react'
import Badge from './Badge'

const SideProjectCard = ({ title, url, badges, children }) => {
    return (
        <div className="col">
            <div className="card" style={{ width: "18rem" }}> {/* TODO: Avoid inline style */}
                <div className="card-body">
                    <div className="d-grid gap-2">
                        <a className="btn btn-secondary mb-3" href={url} target="_blank">
                            <div className="row">
                                <div classNme="col"><i className="fab fa-github fa-xl"></i></div>
                                <div classNme="col">{title}</div>
                            </div>
                        </a>
                    </div>
                    {badges &&
                        <div>
                            <p>
                                {
                                    badges.map((badge) => (
                                        <Badge>{badge}</Badge>
                                    ))
                                }
                            </p>
                        </div>
                    }
                    <p className="card-text">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SideProjectCard