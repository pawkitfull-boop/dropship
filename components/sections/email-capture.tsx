import { Section } from "@/components/layout/section"
import { NewsletterForm } from "@/components/marketing/newsletter-form"

export function EmailCapture() {
  return (
    <Section tone="lit-sunken" spacing="md" border="bottom">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-mono-caption mb-5 text-text-on-lit-muted">Free guide</p>
          <h2 className="text-h1 text-ink">The five-minute evening reset.</h2>
          <p className="measure mt-5 text-body-large text-text-on-lit-secondary">
            A short sequence for putting the working day down — no equipment
            needed. Sent the moment you subscribe, so you can use it tonight.
          </p>
        </div>

        <div className="w-full lg:pt-14">
          <NewsletterForm location="inline" />
        </div>
      </div>
    </Section>
  )
}
