"use client"

import * as React from "react"
import { Wind, Shield, Clock, Search } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "Dries in minutes",
    description: "Powerful internal airflow ensures your dog is completely dry in a fraction of the time.",
    icon: <Clock size={24} className="text-green-600" />,
    align: "right"
  },
  {
    title: "Whisper-quiet operation",
    description: "Designed to minimize noise, keeping even the most anxious pets calm and relaxed.",
    icon: <Wind size={24} className="text-green-600" />,
    align: "right"
  },
  {
    title: "Universal perfect fit",
    description: "Adjustable velcro straps and elastic bands ensure a snug, comfortable fit for any breed.",
    icon: <Search size={24} className="text-green-600" />,
    align: "left"
  },
  {
    title: "Safe temperature control",
    description: "Breathable materials prevent overheating while maintaining a cozy, warm environment.",
    icon: <Shield size={24} className="text-green-600" />,
    align: "left"
  }
]

export function ProductFeaturesCross() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const blockVariants = {
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[3rem] lg:text-[4.5rem] font-bold text-black leading-tight tracking-tight max-w-[20ch] mx-auto">
            Smooth Drying for <span className="text-green-700">Every Breed</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-[40ch] mx-auto">
            Reveal a perfectly fluffy, clean coat with gentle yet effective airflow.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={blockVariants} className="bg-green-50/50 p-8 rounded-2xl border border-green-100/50 transform transition-transform hover:-translate-y-1 h-full">
              <div className="bg-white size-12 rounded-full flex items-center justify-center shadow-sm mb-6 text-green-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}} />
    </section>
  )
}
