import Link from "next/link"
import { Wordmark } from "./wordmark"

const SHOP = [
  { href: "/collections/shop-all", label: "Shop all" },
  { href: "/collections/best-sellers", label: "Best Sellers" },
  { href: "/collections/dogs", label: "For Dogs" },
  { href: "/collections/cats", label: "For Cats" },
]

const SUPPORT = [
  { href: "/faq", label: "FAQ" },
  { href: "/track-order", label: "Track order" },
  { href: "/policies/shipping", label: "Shipping Policy" },
  { href: "/policies/returns", label: "Return Policy" },
  { href: "/contact", label: "Contact" },
]

const COMPANY = [
  { href: "/about", label: "Our story" },
  { href: "/policies/terms", label: "Terms" },
  { href: "/policies/privacy", label: "Privacy Policy" },
]

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex min-h-9 items-center text-base font-bold text-white transition-colors hover:text-[#00c881]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The footer closes the site rather than trailing off. The wordmark is
 * set large as a final brand mark, with the directory beneath it and a
 * single quiet legal line at the foot.
 */
export function Footer() {
  return (
    <footer className="bg-black pt-20 pb-12">
      <div className="mx-auto max-w-[88rem] px-gutter">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 pr-8">
            <span className="text-3xl font-bold text-white tracking-tight">Pawkitfull</span>
            <p className="mt-6 text-base font-medium text-gray-400">
              Clever pet essentials that make grooming, playtime, walks and everyday routines a little easier.
            </p>
          </div>

          <Column title="Shop" links={SHOP} />
          <Column title="Support" links={SUPPORT} />
          <Column title="Company" links={COMPANY} />
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-gray-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-gray-500">
            © {new Date().getFullYear()} Pawkitfull. All rights reserved.
          </p>
          <p className="text-sm font-bold text-gray-500">
            Secure checkout. Free shipping. Thirty-day returns.
          </p>
        </div>
      </div>
    </footer>
  )
}
