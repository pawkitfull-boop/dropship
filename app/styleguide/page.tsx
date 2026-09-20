import * as React from "react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldGroup } from "@/components/ui/field"
import { Section } from "@/components/layout/section"
import { Wordmark } from "@/components/layout/wordmark"

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
}

const SURFACES = [
  ["Ink", "--color-ink", "#16130F", "Dominant ground"],
  ["Ink deep", "--color-ink-deep", "#0C0A08", "Wells, footer, page heads"],
  ["Ink raised", "--color-ink-raised", "#211C16", "Cards, image wells"],
  ["Bone", "--color-bone", "#EFEBE3", "Primary text, lit surfaces"],
  ["Paper", "--color-paper", "#F7F4EF", "Lit hover"],
  ["Clay", "--color-clay", "#DDD5C8", "Lit sunken"],
  ["Ember", "--color-ember", "#D8521F", "Signal only"],
]

const TYPE = [
  ["text-mega", "Ten minutes", "Hero only"],
  ["text-display", "Ten minutes on the floor.", "Page titles"],
  ["text-h1", "You cannot think your way out.", "Section titles"],
  ["text-h2", "What ten minutes looks like.", "Sub-sections"],
  ["text-h3", "The build", "Card and block titles"],
  ["text-body-large", "Sharp for two minutes, warm for eight.", "Lede"],
  ["text-body", "Ten hours at a desk leaves a mark.", "Body"],
  ["text-body-small", "Free returns within thirty days.", "Secondary"],
  ["text-caption", "3 products", "Meta"],
  ["text-mono-caption", "00:00 — 10:00", "Data labels"],
]

export default function StyleguidePage() {
  return (
    <>
      <Section tone="ink-deep" spacing="sm" border="bottom">
        <Wordmark className="h-5 text-bone" title="The 10-Minute Reset" />
        <h1 className="text-display mt-8 text-bone">Evening Index</h1>
        <p className="measure mt-4 text-body-large text-text-secondary">
          The identity is built out of the product photography rather than
          against it. Ink is the ground; lit surfaces are the deliberate
          reading and buying moments; ember is a signal, never a decoration.
        </p>
      </Section>

      <Section spacing="md" border="bottom">
        <h2 className="text-h2 mb-8 text-bone">Surfaces</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {SURFACES.map(([name, token, hex, use]) => (
            <li key={token} className="border border-line">
              <div className="h-20 w-full" style={{ background: hex }} />
              <div className="border-t border-line p-3">
                <p className="text-body-small text-text-primary">{name}</p>
                <p className="text-mono-caption mt-1 text-text-muted">{hex}</p>
                <p className="mt-2 text-caption text-text-muted">{use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="md" border="bottom">
        <h2 className="text-h2 mb-8 text-bone">Type</h2>
        <div className="border-t border-line">
          {TYPE.map(([cls, sample, use]) => (
            <div
              key={cls}
              className="grid grid-cols-1 gap-2 border-b border-line py-5 md:grid-cols-[10rem_1fr_8rem] md:items-baseline md:gap-6"
            >
              <code className="text-mono-caption text-text-muted">{cls}</code>
              <p className={`${cls} text-bone`}>{sample}</p>
              <span className="text-caption text-text-muted">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="md" border="bottom">
        <h2 className="text-h2 mb-8 text-bone">Actions</h2>
        <p className="measure mb-8 text-body text-text-secondary">
          Contrast is the accent. The strongest action on any surface is also
          the most legible one. Ember is reserved for savings and heat.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Add the set</Button>
          <Button variant="outline">Buy it now</Button>
          <Button variant="ember">Save $24</Button>
          <Button variant="ghost">Quiet action</Button>
          <Button isLoading>Sending</Button>
          <Button disabled>Out of stock</Button>
        </div>

        <div className="mt-10 on-lit border border-line-on-lit p-8">
          <p className="text-mono-caption mb-5 text-text-on-lit-muted">On a lit surface</p>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="onLit">Checkout securely</Button>
            <Button variant="outlineLit">Keep shopping</Button>
          </div>
        </div>
      </Section>

      <Section spacing="md" border="bottom" width="narrow">
        <h2 className="text-h2 mb-8 text-bone">Forms</h2>
        <FieldGroup>
          <Label htmlFor="sg-email">Email address</Label>
          <Input id="sg-email" type="email" placeholder="you@example.com" autoComplete="email" />
        </FieldGroup>
      </Section>

      <Section spacing="md" width="narrow">
        <h2 className="text-h2 mb-6 text-bone">Rules</h2>
        <ul className="border-t border-line text-body text-text-secondary">
          {[
            "Zero border radius. Shape is structural, not decorative.",
            "Hairlines and ground shifts do the work that shadows would.",
            "Monospace is for values that are read as data, never for labels.",
            "Sentence case everywhere, including buttons.",
            "One orchestrated reveal per view. Exits run faster than entrances.",
            "No fabricated reviews, urgency, scarcity or statistics.",
          ].map((rule) => (
            <li key={rule} className="border-b border-line py-3.5">
              {rule}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
