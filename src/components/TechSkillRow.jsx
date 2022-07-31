import * as React from 'react'
import Badge from './Badge'

function TechSkillRow({ title, skills }) {
    return (
        <div class="row">
            <div class="col-sm-3 fw-bold">
                {title}
            </div>
            <div class="col-sm-8">
                {
                    Badge.makeBadges(skills)
                }
            </div>
            <hr className="my-1" />
        </div>
    )
}

export default TechSkillRow