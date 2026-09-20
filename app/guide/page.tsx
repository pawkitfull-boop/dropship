"use client"

import * as React from "react"
import { NewsletterForm } from "@/components/marketing/newsletter-form"
import { Image as CustomImage } from "@/components/ui/image"

export default function GuideLandingPage() {
  return (
    <>
      {/* A link-in-bio destination: one screen, one decision. */}
      <section className="grid min-h-[calc(100svh-5rem)] grid-cols-1 border-b border-line lg:grid-cols-2">
        <div className="relative order-1 min-h-[16rem] lg:order-2 lg:min-h-full">
          <CustomImage
            src="/images/mask-hero.jpg"
            alt="A weighted eye mask resting on dark fabric"
            sizes="(max-width: 1024px) 100vw, 50vw"
            preload
          />
        </div>

        <div className="order-2 flex flex-col justify-center px-gutter py-section-md lg:order-1 lg:py-section-lg lg:pl-[max(3.5rem,calc((100vw-88rem)/2+1.5rem))] lg:pr-14">
          <p className="text-mono-caption mb-5 text-text-muted">Free guide</p>
          <h1 className="text-display text-bone">The five-minute evening reset.</h1>
          <p className="measure mt-5 text-body-large text-text-secondary">
            A short sequence for putting the working day down. No equipment,
            no app, no audio — just the order to do things in.
          </p>

          <ul className="mt-9 border-t border-line">
            {[
              "Five minutes, start to finish.",
              "What to do with the first two, which are the hard ones.",
              "How to use heat, cold and pressure to end the day.",
            ].map((item) => (
              <li key={item} className="border-b border-line py-3.5 text-body text-text-secondary">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <NewsletterForm location="landing" />
          </div>
        </div>
      </section>
      </>
  )
}
