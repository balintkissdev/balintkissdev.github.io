import * as React from 'react'
import {
    mainBody
} from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <main className={mainBody + " h-100 d-flex align-items-center justify-content-center"}>
            {children}
        </main >
    )
}

export default Layout