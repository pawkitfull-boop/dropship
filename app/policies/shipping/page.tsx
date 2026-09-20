import * as React from "react"
import type { Metadata } from "next"
import { PolicyPage, PolicySection, PolicyCallout, PolicyList } from "@/components/layout/policy"
import { storeDetails } from "@/lib/config/store-details"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "How Pawkitfull orders are processed, dispatched and delivered, including tracking, customs and delivery issues.",
  alternates: { canonical: "/policies/shipping" },
}

const SUPPORT = storeDetails.supportEmail

export default function ShippingPolicy() {
  return (
    <PolicyPage
      title="Shipping Policy"
      lede="Free shipping on every order. Here is how dispatch, tracking and delivery work, and what happens when something goes wrong."
      updated="20 September 2026"
    >
      <PolicySection title="Order processing">
        <p>
          Orders are prepared for dispatch once payment has been authorised and the delivery
          details have been verified. Orders placed over weekends, public holidays or during
          promotional periods are processed on the next working day.
        </p>
        <p>
          We may need to contact you before dispatch if the address looks incomplete or if the
          payment requires additional verification. Responding quickly keeps your order moving.
        </p>
      </PolicySection>

      <PolicySection title="Delivery estimates are estimates">
        <p>
          Any delivery timeframe shown on this website, at checkout, in your order confirmation
          or in correspondence from us is an estimate offered in good faith. It is not a
          guarantee, a contractual term, or a promised delivery date.
        </p>
        <p>
          We are not able to guarantee delivery by a specific date, and we cannot accept
          liability for any loss, cost or disappointment caused by an order arriving later than
          an estimate — including for birthdays, holidays or other occasions. If a delivery
          date is critical for you, please contact us before you order.
        </p>
      </PolicySection>

      <PolicySection title="Things outside our control">
        <p>
          Once a parcel has been handed to the carrier, it is in their network and moving at
          their pace. Delays commonly arise from:
        </p>
        <PolicyList
          items={[
            "Carrier backlogs, sorting errors, failed delivery attempts or reattempted deliveries.",
            "Customs inspection and clearance on international orders.",
            "Severe weather, strikes, transport disruption and other events beyond our control.",
            "Peak periods such as seasonal sales and public holidays.",
            "An address that is incomplete, mistyped or no longer current.",
          ]}
        />
        <p>
          We will always help you chase a delayed parcel, but we cannot be held responsible for
          delays caused by any of the above.
        </p>
      </PolicySection>

      <PolicySection title="Tracking">
        <p>
          Where tracking is available for your order, we will send it to the email address used
          at checkout once the parcel is dispatched. Tracking information is generated and
          updated by the carrier, and it can take time to show its first movement. A tracking
          number that has not updated for a short period is normal and does not mean the parcel
          is lost.
        </p>
      </PolicySection>

      <PolicySection title="Multiple items and part shipments">
        <p>
          Orders containing more than one item may be sent in separate parcels, arriving at
          different times and sometimes from different facilities, at no extra cost to you. If
          part of your order has arrived and the rest has not, please allow the remaining
          parcels time to arrive before contacting us.
        </p>
      </PolicySection>

      <PolicySection title="Customs, duties and import taxes">
        <p>
          International orders may attract customs duties, import taxes or handling fees set by
          the destination country. These charges are not included in the price you pay us and
          are the responsibility of the recipient.
        </p>
        <p>
          We have no control over these charges and cannot predict their amount. If a parcel is
          refused at customs or abandoned because a charge was not paid, we are not able to
          refund the order.
        </p>
      </PolicySection>

      <PolicySection title="Delivery addresses">
        <p>
          You are responsible for entering a complete and accurate delivery address. We dispatch
          to the address exactly as it is given at checkout.
        </p>
        <p>
          If an incorrect address is supplied and the parcel is lost as a result, or is returned
          to sender, we cannot be held liable for the loss. Where a parcel is successfully
          returned to us, any refund may exclude shipping costs already incurred.
        </p>
      </PolicySection>

      <PolicySection title="Lost, stolen or undelivered parcels">
        <p>
          If tracking shows no movement for an extended period, contact us and we will open an
          enquiry with the carrier. Carriers set their own timeframes before a parcel can
          formally be treated as lost, and we have to work within them.
        </p>
        <p>
          Where a carrier records a parcel as delivered to the address provided, we are not able
          to accept responsibility for it going missing afterwards — including parcels left in a
          safe place, with a neighbour or in a communal area. In that situation we will give you
          the delivery evidence we hold so you can pursue a claim with the carrier.
        </p>
      </PolicySection>

      <PolicyCallout>
        Nothing in this policy removes or limits any right you have under the consumer law of
        your country. Where that law gives you a stronger right than this policy does, that law
        applies.
        {SUPPORT ? (
          <>
            {" "}
            Questions before you order? Email{" "}
            <a className="font-medium text-black underline underline-offset-4" href={`mailto:${SUPPORT}`}>
              {SUPPORT}
            </a>
            .
          </>
        ) : null}
      </PolicyCallout>
    </PolicyPage>
  )
}
