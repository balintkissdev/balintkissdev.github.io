import * as React from 'react'
import {footer} from './Footer.module.css'

const Footer = ({children}) => {
    return (
        <footer className={`${footer} d-flex align-items-center justify-content-center`}>
            <span className="py-3">© 2022 Balint Kiss</span>
        </footer>
    )
}

export default Footer