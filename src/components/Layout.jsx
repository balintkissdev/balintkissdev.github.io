import * as React from 'react'
import Footer from './Footer'
import {
    mainBody
} from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <div>
            <main className={mainBody + " h-100 d-flex align-items-center justify-content-center"}>
                {children}
            </main >
            <Footer />
        </div>
    )
}

export default Layout