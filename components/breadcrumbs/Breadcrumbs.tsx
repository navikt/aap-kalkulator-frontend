import React, { ReactElement, ReactNode } from "react"

const Breadcrumbs = ({ children }: { children: ReactNode }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="p-0 m-0 breadcrumb list-none text-primary-main">
                {children}
            </ol>
        </nav>
    )
}

export interface CrumbProps {
    href: string
    isCurrentPage?: boolean
    ariaLabel?: string
    children: ReactNode
}

const Crumb = ({ children, href }: CrumbProps): ReactElement => {
    return (
        <li className="inline">
            <a
                className="text-inherit no-underline hover:underline"
                href={href}
            >
                {children}
            </a>
        </li>
    )
}

export { Breadcrumbs, Crumb }
