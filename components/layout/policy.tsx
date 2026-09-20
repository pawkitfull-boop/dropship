import * as React from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { storeDetails } from "@/lib/config/store-details"

/**
 * All four policy pages share one shell so they read as a single set of
 * documents rather than four separately styled pages.
 */
export function PolicyPage({
  title,
  lede,
  updated,
  children,
}: {
  title: string
  lede: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader
        title={title}
        lede={lede}
        crumbs={[{ href: "/faq", label: "Support" }]}
        meta={`Last updated ${updated}`}
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-12">{children}</div>

          <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-h3 text-black">Questions about this policy?</h2>
            <p className="mt-3 text-body text-gray-600">
              We are happy to walk you through any of it before or after you order.
            </p>
            {storeDetails.supportEmail && (
              <a
                href={`mailto:${storeDetails.supportEmail}`}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-black px-6 text-body font-medium text-white transition-colors hover:bg-gray-900"
              >
                Email {storeDetails.supportEmail}
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

export function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-h2 text-black">{title}</h2>
      <div className="space-y-4 text-body text-gray-600">{children}</div>
    </section>
  )
}

/** A pulled-out clause that customers and payment processors both look for. */
export function PolicyCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-black bg-gray-50 px-6 py-5 text-body text-gray-700">
      {children}
    </div>
  )
}

export function PolicyList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gray-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
