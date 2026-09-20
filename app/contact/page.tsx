"use client"

import * as React from "react"
import { useActionState } from "react"
import { Section } from "@/components/layout/section"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FieldGroup, FieldError } from "@/components/ui/field"
import { storeDetails } from "@/lib/config/store-details"
import { submitContactForm, ContactFormState } from "@/app/actions/contact"
import Link from "next/link"

const initialState: ContactFormState = {
  status: "idle",
  errors: {},
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const errorSummaryRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (state.status === "error" && errorSummaryRef.current) {
      errorSummaryRef.current.focus()
    }
  }, [state.status])

  return (
    <>
      <PageHeader
        title="Contact"
        lede={`A real person reads every message. We aim to reply within ${storeDetails.supportResponseTime || "24 hours"}.`}
      />

      <Section spacing="md" border="bottom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-20">
          {/* Where to reach us, beside the form rather than buried under it. */}
          <div className="flex flex-col gap-10">
            {storeDetails.supportEmail && (
              <div>
                <h2 className="text-mono-caption mb-3 text-text-muted">Support</h2>
                <a
                  href={`mailto:${storeDetails.supportEmail}`}
                  className="text-h3 text-text-primary underline decoration-line underline-offset-[6px] transition-colors hover:decoration-bone"
                >
                  {storeDetails.supportEmail}
                </a>
              </div>
            )}
            <div>
              <h2 className="text-mono-caption mb-3 text-text-muted">Before you write</h2>
              <ul className="flex flex-col text-body text-text-secondary">
                <li>
                  <Link href="/track-order" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 transition-colors hover:text-text-primary hover:decoration-bone">
                    Track an order
                  </Link>
                </li>
                <li>
                  <Link href="/policies/returns" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 transition-colors hover:text-text-primary hover:decoration-bone">
                    Start a return
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 transition-colors hover:text-text-primary hover:decoration-bone">
                    Read the FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-line p-6 md:p-8">
            {state.status === "success" ? (
              <div className="text-center space-y-4 py-8" role="status" aria-live="polite">
                <h2 className="text-h3 text-text-primary">Message sent.</h2>
                <p className="text-body text-text-muted">
                  We&apos;ve received your message and will be in touch shortly.
                </p>
                <Button variant="outline" className="mt-8" onClick={() => window.location.reload()}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-6" noValidate>
                {state.status === "error" && state.errors?.form && (
                  <div 
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    className="border border-ember/50 bg-ember/10 p-3.5 text-body-small text-text-primary"
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

                <FieldGroup>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={isPending}
                    error={!!state.errors?.message}
                    aria-invalid={!!state.errors?.message}
                    aria-describedby={state.errors?.message ? "message-error" : undefined}
                  />
                  {state.errors?.message && (
                    <FieldError id="message-error">{state.errors.message[0]}</FieldError>
                  )}
                </FieldGroup>

                <Button type="submit" size="lg" className="w-full" isLoading={isPending} disabled={isPending}>
                  {isPending ? "Sending" : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
