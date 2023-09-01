import Badge from './Badge'
import Button from './Button'

import * as React from 'react'

export default function SideProjectCard({ title, url, badges, domain, children }) {
    return (
        <div className="p-4 border-solid rounded-lg border-2 lg:w-80">
            <div>
                <Button href={url}>
                    {title}
                </Button>
                <div><i className="fab fa-github fa-xl"></i></div>
            </div>
            {(domain || badges) && <div><p>
                {
                    domain &&
                    <Badge style={{ backgroundColor: "#702963" }}>
                        {domain}
                    </Badge>
                }
                {badges &&
                    Badge.makeBadges(badges)

                }
            </p></div>
            }
            <p className="pt-4">
                {children}
            </p>
        </div>
    )
}
