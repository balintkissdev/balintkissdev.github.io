import * as React from 'react'

const SideProjectCard = ({ title, url, children }) => {
    return (
        <div className="col-sm-5">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="d-grid gap-2">
                        <a className="btn btn-secondary mb-3" href={url} target="_blank">{title}</a>
                    </div>
                    <p className="card-text">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SideProjectCard