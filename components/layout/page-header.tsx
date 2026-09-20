import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  lede?: string
  /** Breadcrumb trail, excluding Home and the current page. */
  crumbs?: { href: string; label: string }[]
  /** Slot for a meta line — last updated, response times, and so on. */
  meta?: React.ReactNode
  className?: string
}

/**
 * Every non-commerce page opens the same way: a compact band with the
 * trail, the title and a single line of orientation. It replaces the
 * old pattern of a title floating in a screen of empty space, and
 * keeps the supporting pages feeling like one site.
 */
export function PageHeader({ title, lede, crumbs = [], meta, className }: PageHeaderProps) {
  return (
    <header className={cn("border-b border-line bg-surface-deep", className)}>
      <div className="mx-auto max-w-[88rem] px-gutter pb-12 pt-10 md:pb-14 md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-text-muted">
            <li>
              <Link href="/" className="inline-flex min-h-6 items-center transition-colors hover:text-text-primary">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <React.Fragment key={c.href}>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={c.href} className="inline-flex min-h-6 items-center transition-colors hover:text-text-primary">
                    {c.label}
                  </Link>
                </li>
              </React.Fragment>
            ))}
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page" className="text-text-secondary">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="text-display max-w-[16ch] text-bone">{title}</h1>
          {lede && (
            <p className="measure-tight text-body-large text-text-secondary">{lede}</p>
          )}
        </div>

        {meta && <div className="mt-8 text-caption text-text-muted">{meta}</div>}
      </div>
    </header>
  )
}
