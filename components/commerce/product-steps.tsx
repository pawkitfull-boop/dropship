"use client"

import * as React from "react"
import { Image as CustomImage } from "@/components/ui/image"
import { motion } from "framer-motion"

const steps = [
  {
    title: "Towel Dry",
    description: "Start by giving your pet a quick towel dry to remove excess water.",
    image: "/images/step-1.jpg"
  },
  {
    title: "Secure the Bag",
    description: "Place your pet inside the bag and secure the comfortable velcro straps.",
    image: "/images/luna-dog.jpg"
  },
  {
    title: "Attach & Dry",
    description: "Connect your hair dryer to the hose and watch them get fluffy in minutes!",
    image: "/images/step-2.jpg"
  }
]

export function ProductSteps() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  }

  return (
    <section className="bg-white px-gutter py-24 border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-[88rem]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[2.5rem] lg:text-[4rem] font-bold text-black leading-tight tracking-tight">
            How It Works: <span className="text-gray-400 font-normal">Just 3<br/>Simple Steps</span>
          </h2>
          {/* Decorative dotted line */}
          <div className="mt-8 flex justify-center gap-2 text-gray-300">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`size-3 rounded-full ${i === 3 || i === 7 ? 'bg-purple-400' : 'bg-gray-200'}`} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16"
        >
          {steps.map((step, index) => (
            <motion.div variants={stepVariants} key={index} className="flex flex-col items-center text-center group">
              <div className="text-sm font-bold text-gray-400 tracking-widest mb-8">
                0{index + 1}
              </div>
              
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-8 shadow-xl border-4 border-white group-hover:scale-105 transition-transform duration-500">
                <CustomImage 
                  src={step.image} 
                  alt={step.title} 
                  sizes="200px"
                  className="object-cover size-full"
                />
              </div>

              <h3 className="text-2xl font-bold text-black mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-[28ch]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
