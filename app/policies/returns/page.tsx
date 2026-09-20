import * as React from "react"
import type { Metadata } from "next"
import { PolicyPage, PolicySection, PolicyCallout, PolicyList } from "@/components/layout/policy"
import { storeDetails } from "@/lib/config/store-details"

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How returns, refunds, exchanges and damaged items are handled for Pawkitfull orders.",
  alternates: { canonical: "/policies/returns" },
}

const RETURN_WINDOW = storeDetails.returnsWindowDays
const SUPPORT = storeDetails.supportEmail

export default function RefundPolicy() {
  return (
    <PolicyPage
      title="Refund Policy"
      lede={`You have ${RETURN_WINDOW} days from delivery to request a return. Here is exactly how it works and what we need from you.`}
      updated="20 September 2026"
    >
      <PolicySection title="The return window">
        <p>
          You may request a return within {RETURN_WINDOW} days of the date your order is
          delivered. Requests made after that window has closed cannot be accepted, except
          where consumer law in your country requires otherwise.
        </p>
        <p>
          A return is only valid once we have approved it in writing. Please do not send an
          item back before contacting us — see &ldquo;How to start a return&rdquo; below.
        </p>
      </PolicySection>

      <PolicySection title="Condition of returned items">
        <p>To be accepted, an item must be:</p>
        <PolicyList
          items={[
            "Unused, unwashed and free from pet hair, odour, dirt and damage.",
            "In its original packaging, with every accessory, strap, hose and insert included.",
            "In resalable condition, as it arrived to you.",
          ]}
        />
        <p>
          Because this is a product that comes into direct contact with animals, we cannot
          resell an item that has been used. Items returned in a used or soiled condition may
          be declined or refunded in part, at our reasonable discretion, and we may return the
          item to you at your cost.
        </p>
      </PolicySection>

      <PolicySection title="How to start a return">
        <p>
          Email {SUPPORT ? <a className="font-medium text-black underline underline-offset-4" href={`mailto:${SUPPORT}`}>{SUPPORT}</a> : "our support team"}{" "}
          with your order number, the item you want to return and the reason for the return.
          Photographs help us resolve things faster, particularly for damaged or incorrect
          items.
        </p>
        <p>
          We will reply with a return authorisation and the correct return address. Parcels
          sent back without an authorisation, or to any address not given to you by us in
          writing, may not be traceable and may not be refundable.
        </p>
      </PolicySection>

      <PolicySection title="Who pays for return shipping">
        <p>
          If the item is faulty, damaged in transit or not what you ordered, we cover the cost
          of returning it.
        </p>
        <p>
          If you are returning an item because you changed your mind, ordered the wrong size or
          no longer want it, the cost of return shipping is yours. We recommend a tracked
          service — we cannot issue a refund for a return we never receive, and the item
          remains your responsibility until it reaches us.
        </p>
      </PolicySection>

      <PolicySection title="Damaged, faulty or incorrect items">
        <p>
          Please check your order as soon as it arrives. If something is damaged, faulty or
          incorrect, contact us promptly with your order number and clear photographs of both
          the item and the packaging it arrived in.
        </p>
        <p>
          Where a fault is confirmed, we will arrange a replacement or a full refund, including
          any shipping you paid. Reporting a transit issue promptly matters, because carrier
          claims have their own strict deadlines that we cannot extend.
        </p>
      </PolicySection>

      <PolicySection title="Refunds">
        <p>
          Once your return arrives and has been inspected, we will let you know whether it has
          been approved. Approved refunds are issued to the original payment method — we are
          not able to refund to a different card, account or person.
        </p>
        <p>
          After we process a refund, the time it takes to appear on your statement is
          controlled by your bank or card issuer, not by us. If your refund has been confirmed
          by us but has not yet appeared, please contact your bank first, then come back to us
          if it remains missing.
        </p>
      </PolicySection>

      <PolicySection title="Items we cannot refund">
        <PolicyList
          items={[
            "Items returned outside the return window.",
            "Items that have been used, washed, soiled or damaged after delivery.",
            "Items returned without their original packaging or with parts missing.",
            "Items damaged by misuse, or by use that does not follow the product instructions.",
            "Any item returned without a return authorisation from us.",
          ]}
        />
      </PolicySection>

      <PolicySection title="Cancellations and delivery failures">
        <p>
          If you need to cancel, contact us as quickly as possible. We can usually cancel an
          order that has not yet been dispatched. Once an order has been handed to the carrier
          it cannot be recalled, and it will need to be handled as a return instead.
        </p>
        <p>
          Please double-check your delivery address at checkout. If a parcel is returned to us
          because the address was incomplete or incorrect, or because it went unclaimed, any
          refund we issue may exclude the shipping cost we have already paid.
        </p>
      </PolicySection>

      <PolicyCallout>
        Nothing in this policy removes or limits any right you have under the consumer law of
        your country. Where that law gives you a stronger right than this policy does, that
        law applies.
      </PolicyCallout>
    </PolicyPage>
  )
}
