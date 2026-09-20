import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { PolicyPage, PolicySection, PolicyCallout, PolicyList } from "@/components/layout/policy"
import { storeDetails } from "@/lib/config/store-details"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal information Pawkitfull collects, how it is used and shared, and the choices you have.",
  alternates: { canonical: "/policies/privacy" },
}

const SUPPORT = storeDetails.supportEmail

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      lede="What we collect, why we collect it, who it is shared with, and how to ask us to delete it."
      updated="20 September 2026"
    >
      <PolicySection title="Information you give us">
        <p>When you order, contact us or subscribe, we collect:</p>
        <PolicyList
          items={[
            "Your name, email address, delivery address and phone number where provided.",
            "Order details, including what you bought and any correspondence about it.",
            "Messages you send us through our contact form or by email.",
          ]}
        />
        <p>
          We do not receive or store your full card number. Payments are processed by our
          payment provider, Stripe, which handles your card details directly under its own
          privacy policy and security standards.
        </p>
      </PolicySection>

      <PolicySection title="Information collected automatically">
        <p>
          Like most websites, we receive technical information when you visit: your device and
          browser type, approximate location derived from your IP address, the pages you view
          and the site or advertisement that referred you.
        </p>
        <p>
          We use your approximate country to preset the currency shown on the site, which is
          stored in a cookie so the site remembers your preference. Your cart and a small number
          of display preferences are stored in your own browser and are not transmitted to us.
        </p>
      </PolicySection>

      <PolicySection title="Cookies and advertising pixels">
        <p>
          We use the Meta (Facebook and Instagram) pixel and the TikTok pixel to measure the
          performance of our advertising and to show relevant ads. These tools set cookies and
          share event data — such as pages viewed, items added to cart and purchases — with those
          platforms.
        </p>
        <p>
          These pixels only load after you give consent through the cookie banner shown on your
          first visit. If you decline, they are not loaded. You can change your mind at any time
          by clearing your browser data for this site, which will cause the banner to appear
          again.
        </p>
        <p>
          Under some privacy laws, this kind of advertising activity counts as
          &ldquo;sharing&rdquo; or &ldquo;selling&rdquo; personal information. If you would like
          us to stop, decline the cookie banner or contact us and we will action it.
        </p>
      </PolicySection>

      <PolicySection title="How we use your information">
        <PolicyList
          items={[
            "To process, fulfil and deliver your order, and to contact you about it.",
            "To provide customer support and handle returns, refunds and warranty questions.",
            "To detect, prevent and investigate fraud, chargebacks and misuse of the site.",
            "To measure and improve our website and our advertising.",
            "To send marketing email where you have asked to receive it.",
            "To meet our legal, tax and accounting obligations.",
          ]}
        />
      </PolicySection>

      <PolicySection title="Who we share it with">
        <p>
          We do not sell your personal information. We share it only with parties who need it to
          run the business:
        </p>
        <PolicyList
          items={[
            "Payment providers, to take payment and process refunds.",
            "Suppliers and fulfilment partners, to pick, pack and dispatch your order.",
            "Shipping carriers, to deliver your parcel and provide tracking.",
            "Analytics and advertising platforms, as described above and subject to your consent.",
            "Professional advisers or authorities, where we are required to do so by law.",
          ]}
        />
        <p>
          Some of these partners operate in other countries, so your information may be
          transferred and processed outside the country you live in.
        </p>
      </PolicySection>

      <PolicySection title="Marketing email">
        <p>
          If you subscribe, we will send you product news and offers. Every marketing email
          contains an unsubscribe link, and unsubscribing takes effect for all marketing email.
          We will still send you transactional messages about orders you have placed.
        </p>
      </PolicySection>

      <PolicySection title="How long we keep it">
        <p>
          We keep order and transaction records for as long as we need them to run the business
          and to satisfy tax, accounting and legal requirements. Where information is no longer
          needed for those purposes, we delete it or remove details that identify you.
        </p>
      </PolicySection>

      <PolicySection title="Security">
        <p>
          Our checkout runs over an encrypted connection and payment details go directly to our
          payment provider. We take reasonable steps to protect the information we hold, but no
          website or method of transmission is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </PolicySection>

      <PolicySection title="Your rights">
        <p>
          Depending on where you live, you may have the right to request a copy of the personal
          information we hold about you, to have it corrected or deleted, to object to certain
          processing, and to opt out of targeted advertising.
        </p>
        <p>
          To make a request, email{" "}
          {SUPPORT ? (
            <a className="font-medium text-black underline underline-offset-4" href={`mailto:${SUPPORT}`}>
              {SUPPORT}
            </a>
          ) : (
            "our support team"
          )}{" "}
          from the address used on your order. We may need to verify your identity before
          acting, and we will respond within the period required by the law that applies to you.
        </p>
      </PolicySection>

      <PolicySection title="Children">
        <p>
          This site is intended for adults. We do not knowingly collect personal information
          from children. If you believe a child has provided us with information, contact us and
          we will delete it.
        </p>
      </PolicySection>

      <PolicySection title="Changes to this policy">
        <p>
          We may update this policy as our business or the law changes. The date at the top of
          this page shows when it was last revised, and the current version always governs.
        </p>
        <p>
          See also our{" "}
          <Link className="font-medium text-black underline underline-offset-4" href="/policies/cookie-notice">
            Cookie Notice
          </Link>
          .
        </p>
      </PolicySection>

      <PolicyCallout>
        Nothing in this policy removes or limits any right you have under the privacy or
        consumer law of your country. Where that law gives you a stronger right than this policy
        does, that law applies.
      </PolicyCallout>
    </PolicyPage>
  )
}
