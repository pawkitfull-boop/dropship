import * as React from "react"
import { Section } from "@/components/layout/section"
import { Image as CustomImage } from "@/components/ui/image"

const SPECS = [
  {
    label: "Materials",
    items: [
      "Unbleached linen cover",
      "Coconut fibre filling, mat",
      "Buckwheat hull filling, pillow",
      "HIPS points, recyclable",
    ],
  },
  {
    label: "Dimensions",
    items: ['Mat 28.5 × 17 × 1"', 'Pillow 15 × 6 × 4"', "2.2 lbs together"],
  },
  {
    label: "In the box",
    items: ["Acupressure mat", "Acupressure pillow", "Heavy canvas bag"],
  },
  {
    label: "Care",
    items: ["Remove fillings first", "Hand wash cold", "Dry in the shade", "Never tumble dry"],
  },
]

/**
 * The specification block, set as an index against a full-height
 * material shot. Data is data — it gets the mono face and a rule
 * structure rather than being dressed up as marketing.
 */
export function ProductDetails() {
  return (
    <Section tone="ink" spacing="none" border="bottom" bleed>
      <div className="mx-auto grid max-w-[100rem] grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col justify-center px-gutter py-section-md lg:col-span-7 lg:py-section-lg">
          <h2 data-reveal className="text-h1 text-bone">The build.</h2>

          <dl className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {SPECS.map((group, i) => (
              <div
                key={group.label}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="border-t border-line pt-4"
              >
                <dt className="text-mono-caption mb-3 text-text-muted">{group.label}</dt>
                <dd>
                  <ul className="flex flex-col gap-1.5 text-body text-text-secondary">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-wipe className="relative min-h-[22rem] lg:col-span-5 lg:min-h-full">
          <CustomImage
            src="/images/mat-hero.jpg"
            alt="The linen cover and point field in close detail"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
      </div>
    </Section>
  )
}
