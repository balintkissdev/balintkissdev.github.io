import * as React from 'react'
import Badge from './Badge'
import Button from './Button'

const SideProjectCard = ({ title, url, badges, domain, children }) => {
    return (
        <div className="col">
            <div className="card" style={{ width: "18rem" }}> {/* TODO: Avoid inline style */}
                <div className="card-body">
                    <div className="d-grid gap-2">
                        <Button href={url}>
                            <div className="row">
                                <div classNme="col"><i className="fab fa-github fa-xl"></i></div>
                                <div classNme="col">{title}</div>
                            </div>
                        </Button>
                    </div>
                    {(domain || badges) && <div><p>
                        {
                            domain &&
                            <Badge style={{ backgroundColor: "#702963" }}>
                                {domain}
                            </Badge>
                        }
                        {badges &&
                            Badge.makeBadges(badges)

                        }
                    </p></div>
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