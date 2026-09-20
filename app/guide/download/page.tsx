import * as React from "react"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { Image as CustomImage } from "@/components/ui/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "The 5-Minute Evening Reset Guide",
  robots: {
    index: false,
  }
}

export default function GuideDownloadPage() {
  return (
    <>
      <Section spacing="lg" border="bottom">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <span className="text-mono-caption text-text-muted uppercase tracking-widest border border-line px-3 py-1 inline-block">
              Your Guide
            </span>
            <h1 className="text-display md:text-[5rem] leading-[0.9]">The 5-Minute<br/>Evening Reset.</h1>
            <p className="text-body-large text-text-secondary max-w-xl mx-auto">
              Digital fatigue requires a physical intervention. You cannot think your way out of physical tension built up over 10 hours at a desk. You have to physically override it.
            </p>
          </div>

          <div className="bg-ember/10 border border-ember/40 p-6 text-body-small text-text-secondary italic">
            Note: This sequence is intended for general relaxation and routine-building. It is not a medical treatment. If you have an existing condition, chronic pain, or are pregnant, we recommend checking in with a healthcare professional before beginning any new physical regimen.
          </div>

          <div className="space-y-6 pt-8">
            <p className="text-body-large text-text-primary">
              This sequence is designed to bridge the gap between a high-cognitive-load workday and deep rest. It takes exactly five minutes. It requires no screens, no apps, and no audio.
            </p>
          </div>

          <div className="w-full aspect-[16/9] relative overflow-hidden bg-ink-raised border border-line">
            <CustomImage 
              src="/images/mat-use.jpg" 
              alt="Setting up the acupressure mat" 
              aspectRatio="auto"
              className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 py-8">
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <span className="text-h2 text-text-muted">00</span>
                <h2 className="text-h2">The Setup</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="text-mono-caption uppercase tracking-wide">The Environment</h3>
                  <p className="text-body">Drop the ambient light. If you have overheads on, turn them off. Use a single low-wattage lamp.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-mono-caption uppercase tracking-wide">The Tools</h3>
                  <p className="text-body">Roll out the Acupressure Mat on a hard floor (a carpet makes it too forgiving; you want the sharp, uncompromising resistance of the floor). Place the Pillow at the top.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <span className="text-h2 text-text-muted">01</span>
                <h2 className="text-h2">The Drop <span className="text-body text-text-muted ml-2 font-normal">(0:00 - 1:00)</span></h2>
              </div>
              <p className="text-body-large">Sit at the base of the mat. Slowly lower your back onto the spikes. Position the pillow directly under the curve of your neck.</p>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h3 className="text-mono-caption uppercase tracking-wide">The Sensation</h3>
                  <p className="text-body">The first 30 seconds are uncomfortable. This is intentional. The sharp physical input of the points forces your brain to stop processing email and start processing the immediate physical sensation of your back.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-mono-caption uppercase tracking-wide">The Action</h3>
                  <p className="text-body">Do not fight the sharpness. Take three deep, slow breaths. With each exhale, let your physical weight sink heavier into the mat.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <span className="text-h2 text-text-muted">02</span>
                <h2 className="text-h2">The Shift <span className="text-body text-text-muted ml-2 font-normal">(1:00 - 3:00)</span></h2>
              </div>
              <p className="text-body-large">As you hit the one-minute mark, the initial sharpness will recede, replaced by a distinct, spreading warmth across your back and neck. This is the physiological shift.</p>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mt-6">
                <h3 className="text-mono-caption uppercase tracking-wide mb-3">The Action</h3>
                <p className="text-body">If you have the Heated Neck & Shoulder Wrap, place it across your chest (not your neck, as the pillow is there). The heavy, grounding weight acts as a physical anchor. Let your arms fall to your sides, palms facing the ceiling. Keep your eyes closed.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-line pb-4">
                <span className="text-h2 text-text-muted">03</span>
                <h2 className="text-h2">The Dark <span className="text-body text-text-muted ml-2 font-normal">(3:00 - 5:00)</span></h2>
              </div>
              <p className="text-body-large">Your body has adjusted to the mat. The warmth is established. Now we remove the final sensory input: light.</p>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h3 className="text-mono-caption uppercase tracking-wide">The Action</h3>
                  <p className="text-body">Place the Cooling Eye Mask (keep it in the fridge during the day) over your eyes. The immediate contrast—warmth on your back, heavy coolness on your face—is highly grounding.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-mono-caption uppercase tracking-wide text-transparent select-none hidden md:block">The Action</h3>
                  <p className="text-body">Lie perfectly still for the remaining two minutes. Notice the tactile differences: the sharp pressure underneath you, the heavy weight on your chest, the cold against your temples.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center border-t border-line pt-16">
              <h2 className="text-display mb-4">The Finish.</h2>
              <p className="text-body-large text-text-secondary max-w-xl mx-auto">
                Bend your knees and plant your feet on the floor. Roll gently to your side and push yourself up.
              </p>
              <p className="text-h2 py-8">
                Do not look at your phone.<br/>Do not open your laptop.
              </p>
              <p className="text-body-large text-text-secondary max-w-xl mx-auto">
                The physical reset is complete. Transition immediately to your evening wind-down.
              </p>

              <div className="pt-12">
                <Link 
                  href="/collections/shop-all"
                  className="inline-block h-14 px-8 bg-ink-raised text-bone text-body font-medium transition-colors leading-[56px]"
                >
                  Shop the tools you need
                </Link>
              </div>
            </div>

          </div>
        </div>
      </Section>
    </>
  )
}
