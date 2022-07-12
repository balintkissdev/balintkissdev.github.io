import * as React from 'react'
import { badge } from './Badge.module.css'

const Badge = ({ children }) => {
    return (
        <span className={badge}>{children}</span>
    )
}

export default Badge