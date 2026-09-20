"use client"

import * as React from "react"
import { useActionState } from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldGroup, FieldError } from "@/components/ui/field"
import { storeDetails } from "@/lib/config/store-details"
import { submitTrackOrderForm, TrackOrderFormState } from "@/app/actions/track-order"

const initialState: TrackOrderFormState = {
  status: "idle",
  errors: {},
}

export default function TrackOrderPage() {
  const [state, formAction, isPending] = useActionState(submitTrackOrderForm, initialState)
  const errorSummaryRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (state.status === "error" && errorSummaryRef.current) {
      errorSummaryRef.current.focus()
    }
  }, [state.status])

  return (
    <>
      <PageHeader
        title="Track order"
        lede="Enter your order number and the email address you used at checkout."
      />

      <Section spacing="md" border="bottom" width="narrow">
        <div className="mx-auto max-w-xl">
          <div className="border border-line p-6 md:p-8">
            {state.status === "success" ? (
              <div className="text-center space-y-4 py-8" role="status" aria-live="polite">
                <h2 className="text-h3 text-text-primary">Shipment found.</h2>
                <p className="text-body text-text-muted">
                  Your order is currently in transit. [This would connect to a real tracking UI in production.]
                </p>
                <Button variant="outline" className="mt-8" onClick={() => window.location.reload()}>
                  Track another order
                </Button>
              </div>
            ) : state.status === "not_found" ? (
              <div className="text-center space-y-4 py-8" role="status" aria-live="polite">
                <h2 className="text-h2">Tracking not found.</h2>
                <p className="text-body text-text-muted">
                  We couldn&apos;t find a shipment with those details. Check the order number. If you just ordered, tracking takes {storeDetails.supportResponseTime || "24 hours"} to update.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => window.location.reload()}>
                  Try again
                </Button>
              </div>
            ) : (
              <form action={formAction} className="space-y-6" noValidate>
                {state.status === "error" && state.errors?.form && (
                  <div 
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    className="p-4 border border-ember bg-ember/10 text-ember text-body"
                    role="alert"
                    aria-live="assertive"
                  >
                    {state.errors.form[0]}
                  </div>
                )}

                {/* Honeypot field - visually hidden but available to bots */}
                <div aria-hidden="true" className="opacity-0 absolute -left-[9999px] h-0 w-0 z-[-1]">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <FieldGroup>
                  <Label htmlFor="order">Order number</Label>
                  <Input 
                    id="order"
                    name="order"
                    type="text" 
                    required
                    placeholder="e.g. #12345"
                    disabled={isPending}
                    error={!!state.errors?.order}
                    aria-invalid={!!state.errors?.order}
                    aria-describedby={state.errors?.order ? "order-error" : undefined}
                  />
                  {state.errors?.order && (
                    <FieldError id="order-error">{state.errors.order[0]}</FieldError>
                  )}
                </FieldGroup>
                
                <FieldGroup>
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    autoComplete="email"
                    inputMode="email"
                    disabled={isPending}
                    error={!!state.errors?.email}
                    aria-invalid={!!state.errors?.email}
                    aria-describedby={state.errors?.email ? "email-error" : undefined}
                  />
                  {state.errors?.email && (
                    <FieldError id="email-error">{state.errors.email[0]}</FieldError>
                  )}
                </FieldGroup>

                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                  {isPending ? "Searching..." : "Track shipment"}
                </Button>
              </form>
            )}
          </div>
          
        </div>
      </Section>
    </>
  )
}
