import * as React from 'react'

function Footer() {
    return (
        <footer className={`d-flex align-items-center justify-content-center`}>
            <span className="py-3 text-muted">&copy; {new Date().getFullYear()} Balint Kiss</span>
        </footer>
    )
}

export default Footer