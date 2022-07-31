import * as React from 'react'
import { button } from './Button.module.css'

function Button({ href, children }) {
    return (
        <a className={`${button} mb-3`} href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    )
}

export default Button