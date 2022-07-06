import * as React from 'react'
import {
    mainBody
} from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <div className={mainBody}>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout