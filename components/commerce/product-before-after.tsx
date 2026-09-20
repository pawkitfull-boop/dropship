"use client"

import * as React from "react"
import { Image as CustomImage } from "@/components/ui/image"
import { ShieldCheck, Stethoscope } from "lucide-react"
import { motion } from "framer-motion"

export function ProductBeforeAfter() {
  const [sliderPosition, setSliderPosition] = React.useState(50)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    let clientX: number
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX
    } else {
      clientX = (event as React.MouseEvent).clientX
    }
    
    const x = clientX - containerRect.left
    const percent = Math.max(0, Math.min(100, (x / containerRect.width) * 100))
    setSliderPosition(percent)
  }

  const [isDragging, setIsDragging] = React.useState(false)

  return (
    <section className="bg-[#fcf8f3] px-gutter py-24 border-b border-gray-100">
      <div className="mx-auto max-w-[88rem]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-[3rem] lg:text-[4.5rem] font-bold text-black leading-tight tracking-tight">
            Proven transformations, trusted by <br className="hidden lg:block"/>
            <span className="text-orange-700">thousands</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Content Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f4ebe1] rounded-[2rem] p-10 lg:p-16 flex flex-col justify-between"
          >
            <div className="flex gap-4 mb-20">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full text-sm font-semibold text-orange-900 backdrop-blur-sm border border-white/40 cursor-default">
                <ShieldCheck size={16} /> Clinical evidence
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full text-sm font-semibold text-orange-900 backdrop-blur-sm border border-white/40 cursor-default">
                <Stethoscope size={16} /> Medical research
              </motion.div>
            </div>

            <div>
              <h3 className="text-[2.5rem] font-bold text-black mb-4 leading-tight">
                Tangible Results
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-[40ch]">
                The Pawkitfull AirDry+ helps dry your dog in minutes, eliminating wet dog smell, preventing skin irritations, and keeping your home clean—without heaviness.
              </p>
              <div className="text-sm font-medium text-orange-800">
                98% saw a completely dry coat in under 15 minutes.
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Slider */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#f4ebe1] rounded-[2rem] p-4 flex flex-col min-h-[500px] overflow-hidden group"
          >
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 }}
              className="absolute top-8 right-8 z-30 bg-white shadow-xl px-6 py-3 rounded-full flex items-center gap-4 cursor-default"
            >
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Your improvements</span>
              <span className="text-2xl font-bold text-black">100%</span>
            </motion.div>

            <div 
              ref={containerRef}
              className="relative w-full h-full rounded-2xl overflow-hidden cursor-ew-resize select-none flex-1"
              onMouseMove={isDragging ? handleMove : undefined}
              onMouseDown={(e) => { setIsDragging(true); handleMove(e); }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchMove={isDragging ? handleMove : undefined}
              onTouchStart={(e) => { setIsDragging(true); handleMove(e); }}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* Before Image (Underneath) */}
              <div className="absolute inset-0 pointer-events-none">
                <CustomImage 
                  src="/images/before-dog.jpg" 
                  alt="Wet dog before" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover size-full"
                />
              </div>

              {/* After Image (Overlay clipped by slider) */}
              <motion.div 
                animate={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                transition={{ type: "tween", duration: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <CustomImage 
                  src="/images/after-dog.jpg" 
                  alt="Dry dog after" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover size-full"
                />
              </motion.div>

              {/* Slider Handle Line */}
              <motion.div 
                animate={{ left: `calc(${sliderPosition}% - 2px)` }}
                transition={{ type: "tween", duration: 0 }}
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none z-10"
              ></motion.div>

              {/* Slider Handle Knob */}
              <motion.div 
                animate={{ left: `${sliderPosition}%` }}
                transition={{ type: "tween", duration: 0 }}
                className="absolute top-1/2 -translate-y-1/2 -ml-6 size-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize pointer-events-none z-20"
              >
                <div className="flex gap-1">
                  <div className="w-0.5 h-4 bg-gray-300 rounded-full"></div>
                  <div className="w-0.5 h-4 bg-gray-300 rounded-full"></div>
                </div>
              </motion.div>
              
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm z-20">
                After (Dry & Fluffy)
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm z-20">
                Before (Wet)
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
