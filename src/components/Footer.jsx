import * as React from 'react'

export default function Footer() {
    return (
        <footer className="flex justify-center py-4 text-gray-500">
            <p>&copy; {new Date().getFullYear()} Balint Kiss</p>
        </footer>
    )
}
