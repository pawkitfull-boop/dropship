import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBundle, getBundles, getProductById } from "@/lib/commerce/api"
import { Product } from "@/lib/commerce/types"

import { Section } from "@/components/layout/section"
import { Gallery } from "@/components/commerce/gallery"
import { BundleBuyBoxClient } from "@/components/commerce/bundle-buy-box-client"
import { Image as CustomImage } from "@/components/ui/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ShieldCheck, Truck } from "lucide-react"

export async function generateStaticParams() {
  const bundles = await getBundles()
  return bundles.map((bundle) => ({
    handle: bundle.handle,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const bundle = await getBundle(resolvedParams.handle)
  if (!bundle) return {}

  return {
    title: bundle.title,
    description: bundle.description,
    alternates: {
      canonical: `/bundles/${bundle.handle}`,
    },
  }
}

export default async function BundlePage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params
  const bundle = await getBundle(resolvedParams.handle)
  
  if (!bundle) {
    notFound()
  }

  // Fetch all component products
  const products = await Promise.all(
    bundle.items.map(async (item) => {
      const product = await getProductById(item.productId)
      return { product, quantity: item.quantity }
    })
  )

  const savings = bundle.compareAtPrice - bundle.price

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[88rem] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(26rem,34rem)]">
          <div className="lg:sticky lg:top-24 lg:self-start lg:py-10 lg:pl-gutter lg:pr-10">
            <Gallery images={bundle.images} />
          </div>

          <div className="flex flex-col border-line px-gutter py-10 lg:border-l lg:py-14 lg:pl-10 lg:pr-gutter">
            <div>
              <h1 className="text-h1 text-bone">{bundle.title}</h1>
              <p className="measure mt-4 text-body-large text-text-secondary">{bundle.description}</p>
            </div>

            {/* Breakdown */}
            <div className="mt-8 border-t border-line pt-8">
              <h2 className="text-mono-caption mb-4 text-text-muted">What is in it</h2>
              <div className="flex flex-col gap-3">
                {products.map(({ product, quantity }, i) => (
                  product ? (
                    <div key={i} className="flex items-center gap-4 border border-line p-3">
                      <div className="size-16 shrink-0 bg-ink-raised">
                        <CustomImage src={product.images[0]?.url || ""} alt={product.title} aspectRatio="square" />
                      </div>
                      <div className="flex-1">
                        <p className="text-body font-medium text-text-primary">{product.title} {quantity > 1 ? `(x${quantity})` : ''}</p>
                        <p className="mt-0.5 font-mono text-body-small text-text-muted tabular-nums">${product.variants[0]?.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </div>

            {/* Honest Math */}
            <dl className="mt-8 border-t border-line">
              <div className="flex items-baseline justify-between border-b border-line py-3">
                <dt className="text-body text-text-muted">Bought separately</dt>
                <dd className="font-mono text-body-small text-text-muted tabular-nums line-through">
                  ${bundle.compareAtPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <dt className="text-body text-bone">Bundle price</dt>
                <dd className="font-mono text-[2rem] leading-none text-bone tabular-nums">
                  ${bundle.price.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line py-3">
                <dt className="text-body-small text-text-secondary">You save</dt>
                <dd className="text-mono-caption bg-ember-deep px-2 py-1 text-bone">
                  ${savings.toFixed(2)}
                </dd>
              </div>
            </dl>

            {/* Client CTA */}
            <div className="mt-8">
              <BundleBuyBoxClient bundle={bundle} products={products.filter(p => p.product !== null) as { product: Product, quantity: number }[]} />
            </div>

            {/* Reassurance */}
            <dl className="mt-8 border-t border-line text-body-small">
              <div className="flex items-start gap-3.5 border-b border-line py-4">
                <Truck size={17} strokeWidth={1.5} aria-hidden="true" className="mt-px shrink-0 text-text-muted" />
                <div>
                  <dt className="sr-only">Shipping</dt>
                  <dd className="text-text-secondary">
                    Ships within 24 hours. Free standard delivery on every bundle.
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3.5 border-b border-line py-4">
                <ShieldCheck size={17} strokeWidth={1.5} aria-hidden="true" className="mt-px shrink-0 text-text-muted" />
                <div>
                  <dt className="sr-only">Guarantee</dt>
                  <dd className="text-text-secondary">
                    Thirty days to try the whole system. Free returns.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Story / Specs */}
      <Section spacing="none" border="bottom" bleed>
        <div className="grid grid-cols-1 border-t border-line md:grid-cols-2">
          <div className="flex flex-col justify-center px-gutter py-section-md md:px-14">
            <h2 className="text-h2 text-bone">Three sensations, one sequence.</h2>
            <p className="measure mt-6 text-body-large text-text-secondary">
              The three tools work on different parts of the same problem: the
              mat for the back, the weighted mask for the eyes, and the cold
              steel roller for the face and neck. Five minutes covers all three.
            </p>
          </div>
          <div className="flex flex-col justify-center bg-gray-50 px-gutter py-section-md md:px-14">
            <h2 className="text-h2 mb-8 text-black">What each one does.</h2>
            <Accordion type="single" collapsible className="w-full">
              {products.map(({ product }, i) => (
                product ? (
                  <AccordionItem key={i} value={`product-${i}`}>
                    <AccordionTrigger className="text-h3">{product.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4">
                        <p>{product.description}</p>
                        <div>
                          <span className="text-mono-caption mb-2 block text-text-muted">Specs</span>
                          <p>{product.sizeAndSpecs}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : null
              ))}
            </Accordion>
          </div>
        </div>
      </Section>
    </>
  )
}
