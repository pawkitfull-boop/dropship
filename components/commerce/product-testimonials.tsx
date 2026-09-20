"use client"

import * as React from "react"
import { Image as CustomImage } from "@/components/ui/image"
import { Star, ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Lucas M.",
    avatar: "/images/avatars/lucas.jpg",
    quote: "This got my Golden Retriever completely dry in under 15 minutes! The wet dog smell is finally gone from my house. Absolute lifesaver during winter.",
    rating: 5,
    tag: "Golden Retriever",
    duration: "3 years old"
  },
  {
    name: "Noah A.",
    avatar: "/images/avatars/noah.jpg",
    quote: "The wrinkles and fear he used to have around the hair dryer vanished. He actually falls asleep inside the bag while it dries him. Highly recommend!",
    rating: 4.9,
    tag: "Bulldog",
    duration: "Anxious pet"
  },
  {
    name: "Olivia R.",
    avatar: "/images/avatars/olivia.jpg",
    quote: "My doodle has such thick fur, it used to take hours to dry her. With this bag, she's fluffy and dry in 20 minutes. It's so much easier on my back.",
    rating: 4.8,
    tag: "Goldendoodle",
    duration: "Thick coat"
  },
  {
    name: "Emma S.",
    avatar: "/images/avatars/emma.jpg",
    quote: "Best investment for a multiple dog household. The universal fit really does work for both my small terrier and my large lab mix.",
    rating: 5,
    tag: "Multiple dogs",
    duration: "Various sizes"
  }
]

export function ProductTestimonials() {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-[#fcf8f3] px-gutter py-24 border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-[88rem]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-[3rem] lg:text-[4.5rem] font-bold text-black leading-tight tracking-tight">
            Visible Results <span className="text-gray-400 font-normal">Real people</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              key={index} 
              className="snap-start shrink-0 w-[350px] md:w-[400px] bg-white rounded-3xl p-10 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="mb-8 relative size-16 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center font-bold text-xl shadow-sm uppercase shrink-0">
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-full">
                      {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  )}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap">
                    <Star size={8} fill="currentColor" /> {testimonial.rating}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{testimonial.name}</h3>
                <p className="text-gray-600 leading-relaxed min-h-[100px]">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>{testimonial.tag}</span>
                <span>{testimonial.duration}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="size-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="size-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </motion.button>
        </div>

      </div>
    </section>
  )
}
