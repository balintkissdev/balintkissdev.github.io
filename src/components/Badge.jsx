import React from 'react'
import { badge } from './Badge.module.css'

class Badge extends React.Component {
    static makeBadges(items) {
        const badges = items.map((i) => {
            return <Badge>{i}</Badge>
        })
        return badges
    }

    render() {
        return (
            <span className={badge}>{this.props.children}</span>
        )
    }
}

export default Badge