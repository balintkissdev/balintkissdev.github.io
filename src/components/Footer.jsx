import * as React from 'react'

const Footer = ({children}) => {
    return (
        <footer className={`d-flex align-items-center justify-content-center`}>
            <span className="py-3 text-muted">© 2022 Balint Kiss</span>
        </footer>
    )
}

export default Footer