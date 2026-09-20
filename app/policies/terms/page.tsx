import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { PolicyPage, PolicySection, PolicyCallout, PolicyList } from "@/components/layout/policy"
import { storeDetails } from "@/lib/config/store-details"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you browse Pawkitfull or place an order with us, including product safety and liability.",
  alternates: { canonical: "/policies/terms" },
}

const SUPPORT = storeDetails.supportEmail

export default function TermsOfService() {
  return (
    <PolicyPage
      title="Terms of Service"
      lede="These terms apply whenever you use this website or place an order. Please read them before you buy."
      updated="20 September 2026"
    >
      <PolicySection title="1. Agreement">
        <p>
          By browsing this website or placing an order, you agree to these terms. If you do not
          agree with them, please do not use the site. You confirm that you are of legal age to
          form a binding contract in the country you are ordering from.
        </p>
        <p>
          We may update these terms at any time. The version published here at the moment you
          place an order is the version that governs that order.
        </p>
      </PolicySection>

      <PolicySection title="2. Products and descriptions">
        <p>
          We describe our products as accurately as we can. Photographs, illustrations and
          videos are provided to show the product in use, and colours, dimensions and packaging
          may vary slightly from what is shown on your screen.
        </p>
        <p>
          Product measurements and sizing guidance are approximate and are offered to help you
          choose. They are not a guarantee of fit for a particular animal.
        </p>
      </PolicySection>

      <PolicySection title="3. Pricing, availability and orders">
        <p>
          All prices are shown in the currency selected on the website and may be converted for
          display. The amount actually charged is processed in the currency confirmed at
          checkout, and your bank may apply its own conversion or fees.
        </p>
        <p>
          We reserve the right to correct pricing or description errors, to change prices and
          promotions, to limit order quantities, and to refuse or cancel any order. If we cancel
          an order that has already been paid for, we will refund it in full.
        </p>
        <p>
          Promotional pricing, bundle discounts and any countdown or limited-stock messaging
          apply while the relevant promotion is running and may be changed or withdrawn.
        </p>
      </PolicySection>

      <PolicySection title="4. Safe use — please read">
        <p>
          Our products are pet accessories for everyday home use. They are not veterinary
          devices, and they are not intended to diagnose, treat or prevent any medical
          condition in an animal.
        </p>
        <PolicyList
          items={[
            "Never leave an animal unattended while using the product. Supervise the entire time it is in use.",
            "Use only with a standard household dryer on a low or warm setting, and check the air temperature regularly. Never use a high-heat setting.",
            "Stop immediately if your pet shows distress, or if the product or your dryer becomes hot to the touch.",
            "Do not use on puppies, kittens, elderly animals, or any animal that is unwell, injured, pregnant or has a skin, breathing or heart condition, without first speaking to your veterinarian.",
            "Follow the instructions supplied with the product, and keep packaging away from children and animals.",
          ]}
        />
        <p>
          You are responsible for supervising your animal and for judging whether a product is
          suitable for it. If you are unsure, speak to your veterinarian before use.
        </p>
      </PolicySection>

      <PolicySection title="5. Disclaimer">
        <p>
          Except for any guarantee that cannot be excluded by law, this website and our products
          are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We do not
          warrant that the website will be uninterrupted or error-free, or that any particular
          result will be achieved by using our products.
        </p>
        <p>
          Customer reviews, testimonials and results shown on this site reflect individual
          experience and are not a promise of the outcome you will get.
        </p>
      </PolicySection>

      <PolicySection title="6. Limitation of liability">
        <p>
          To the fullest extent permitted by law, our total liability to you in connection with
          any order is limited to the amount you actually paid for that order.
        </p>
        <p>
          We are not liable for indirect or consequential loss, including loss of profit, loss
          of use, veterinary or grooming costs, or damage arising from misuse of a product, from
          use that does not follow the instructions, or from failing to supervise an animal
          during use.
        </p>
      </PolicySection>

      <PolicySection title="7. Intellectual property">
        <p>
          The Pawkitfull name, logo, site content, photography and copy are our property or are
          used under licence. You may not copy, reproduce or use them commercially without our
          written permission.
        </p>
      </PolicySection>

      <PolicySection title="8. Your content">
        <p>
          If you send us a review, photograph, video or other content, you confirm that it is
          yours to share and you grant us a non-exclusive, royalty-free licence to use it in
          connection with our products and marketing. We may decline or remove content at our
          discretion.
        </p>
      </PolicySection>

      <PolicySection title="9. Returns, shipping and privacy">
        <p>
          Our{" "}
          <Link className="font-medium text-black underline underline-offset-4" href="/policies/returns">
            Refund Policy
          </Link>
          ,{" "}
          <Link className="font-medium text-black underline underline-offset-4" href="/policies/shipping">
            Shipping Policy
          </Link>{" "}
          and{" "}
          <Link className="font-medium text-black underline underline-offset-4" href="/policies/privacy">
            Privacy Policy
          </Link>{" "}
          form part of these terms.
        </p>
      </PolicySection>

      <PolicySection title="10. General">
        <p>
          If any part of these terms is found to be unenforceable, the rest continues to apply.
          A delay in enforcing a term is not a waiver of it.
        </p>
        <p>
          Questions about these terms can be sent to{" "}
          {SUPPORT ? (
            <a className="font-medium text-black underline underline-offset-4" href={`mailto:${SUPPORT}`}>
              {SUPPORT}
            </a>
          ) : (
            "our support team"
          )}
          .
        </p>
      </PolicySection>

      <PolicyCallout>
        Nothing in these terms removes or limits any right you have under the consumer law of
        your country. Where that law gives you a stronger right than these terms do, that law
        applies.
      </PolicyCallout>
    </PolicyPage>
  )
}
