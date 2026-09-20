import Link from "next/link"
import { storeDetails } from "@/lib/config/store-details"

const POLICIES = [
  { href: "/policies/returns", label: "Refund Policy" },
  { href: "/policies/shipping", label: "Shipping Policy" },
  { href: "/policies/terms", label: "Terms of Service" },
  { href: "/policies/privacy", label: "Privacy Policy" },
]

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-12 md:pt-20">
      <div className="mx-auto max-w-[88rem] px-gutter">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr]">
          <div className="lg:pr-8">
            <span className="text-3xl font-bold tracking-tight text-white">Pawkitfull</span>
            <p className="mt-5 max-w-sm text-base font-medium text-gray-400">
              Clever pet essentials that make everyday routines a little easier.
            </p>

            {storeDetails.supportEmail && (
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-500">
                  Contact us
                </h3>
                <a
                  href={`mailto:${storeDetails.supportEmail}`}
                  className="inline-flex min-h-9 items-center text-base font-bold text-white underline decoration-gray-700 underline-offset-4 transition-colors hover:text-[#00c881] hover:decoration-[#00c881]"
                >
                  {storeDetails.supportEmail}
                </a>
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">
              Policies
            </h3>
            <ul className="flex flex-col gap-3">
              {POLICIES.map((l) => (
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
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-gray-800 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="text-sm font-bold text-gray-500">
            © {new Date().getFullYear()} Pawkitfull. All rights reserved.
          </p>
          <p className="text-sm font-bold text-gray-500">
            Secure checkout. Free shipping on all orders.
          </p>
        </div>
      </div>
    </footer>
  )
}
