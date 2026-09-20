"use client"

import * as React from "react"
import { Product } from "@/lib/commerce/types"
import { Image as CustomImage } from "@/components/ui/image"
import { ArrowLeft, ArrowRight, Check, Plus, Minus } from "lucide-react"
import * as Accordion from "@radix-ui/react-accordion"
import { motion, AnimatePresence } from "framer-motion"
import { FlashSaleTimer } from "./flash-sale-timer"
import { BundleBuyBox } from "./bundle-buy-box"

export function ProductOverview({ product }: { product: Product }) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length)
  }
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
  }

  return (
    <section className="w-full bg-white px-gutter py-12 lg:py-20 border-b border-gray-100">
      <div className="mx-auto grid max-w-[80rem] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        
        {/* Left Column: Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 lg:sticky lg:top-24"
        >
          
          {/* Main Image */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#e6bfa5]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <CustomImage 
                  src={product.images[activeImageIndex]?.url || "/images/dryer-hero.jpg"}
                  alt={product.title}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover size-full"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Arrows */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 shadow-md hover:bg-white transition-colors z-10"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 shadow-md hover:bg-white transition-colors z-10"
            >
              <ArrowRight size={20} strokeWidth={2} />
            </motion.button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-2">
            {product.images.slice(0, 5).map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveImageIndex(index)}
                className={`relative w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === index ? 'border-blue-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <CustomImage 
                  src={image.url} 
                  alt={`Thumbnail ${index + 1}`} 
                  sizes="80px"
                  className="object-cover size-full"
                />
              </motion.button>
            ))}
          </div>

        </motion.div>

        {/* Right Column: Buy Box */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:pl-4"
        >
          
          {/* Pills */}
          <motion.div variants={staggerItem} className="flex gap-3 mb-6">
            <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
              <div className="size-1.5 bg-blue-500 rounded-full"></div>
              Pet Drying Bag
            </div>
            <div className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
              <div className="size-1.5 bg-white rounded-full animate-pulse"></div>
              HOT
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div variants={staggerItem} className="flex items-center gap-2 mb-4">
            <div className="flex text-[#eec765]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <span className="text-gray-800 text-sm font-semibold">
              4.8 Stars <span className="font-normal text-gray-500 ml-1">| 472 reviews</span>
            </span>
          </motion.div>

          {/* Title & Subtitle */}
          <motion.h1 variants={staggerItem} className="text-[2.5rem] lg:text-[3.5rem] leading-[1.1] font-bold text-black tracking-tight mb-4">
            {product.title}
          </motion.h1>
          <motion.p variants={staggerItem} className="text-gray-500 text-lg leading-relaxed mb-8">
            Gentle drying that targets moisture, odor, and anxiety.
          </motion.p>

          {/* Checklist */}
          <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-gray-500 text-sm font-medium">

            <div className="flex items-center gap-2">
              <div className="size-4 bg-[#e6bfa5] text-white rounded-full flex items-center justify-center p-0.5">
                <Check size={10} strokeWidth={4} />
              </div>
              All-Natural Materials
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 bg-[#e6bfa5] text-white rounded-full flex items-center justify-center p-0.5">
                <Check size={10} strokeWidth={4} />
              </div>
              Pet-Friendly
            </div>
          </motion.div>

          {/* Timer */}
          <motion.div variants={staggerItem}>
            <FlashSaleTimer />
          </motion.div>

          {/* Bundle Buy Box */}
          <motion.div variants={staggerItem}>
            <BundleBuyBox product={product} />
          </motion.div>
          

          {/* Accordion */}
          <motion.div variants={staggerItem} className="mt-12">
            <Accordion.Root type="single" collapsible className="w-full" defaultValue="item-1">
              <Accordion.Item value="item-1" className="border-t border-gray-200">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="group flex flex-1 items-center justify-between py-6 text-left text-lg font-bold text-black transition-all">
                    What makes it special?
                    <div className="text-black group-data-[state=open]:hidden">
                      <Plus size={20} strokeWidth={2} />
                    </div>
                    <div className="text-black hidden group-data-[state=open]:block">
                      <Minus size={20} strokeWidth={2} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm text-gray-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-6 leading-relaxed">
                    {product.description}
                    <ul className="mt-4 list-disc pl-5 space-y-2">
                      {product.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-2" className="border-t border-gray-200">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="group flex flex-1 items-center justify-between py-6 text-left text-lg font-bold text-black transition-all">
                    How to use it?
                    <div className="text-black group-data-[state=open]:hidden">
                      <Plus size={20} strokeWidth={2} />
                    </div>
                    <div className="text-black hidden group-data-[state=open]:block">
                      <Minus size={20} strokeWidth={2} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm text-gray-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-6 leading-relaxed">
                    {product.materialsAndCare || "Place your pet inside the bag, secure the straps, and connect your standard hair dryer to the hose attachment. Turn on low heat and watch them dry in minutes."}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-3" className="border-t border-gray-200 border-b">
                <Accordion.Header className="flex">
                  <Accordion.Trigger className="group flex flex-1 items-center justify-between py-6 text-left text-lg font-bold text-black transition-all">
                    Expert tip
                    <div className="text-black group-data-[state=open]:hidden">
                      <Plus size={20} strokeWidth={2} />
                    </div>
                    <div className="text-black hidden group-data-[state=open]:block">
                      <Minus size={20} strokeWidth={2} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm text-gray-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-6 leading-relaxed">
                    Always start with the lowest heat setting on your hair dryer to ensure your pet is comfortable, and gradually increase if needed.
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </motion.div>
          
          <motion.div variants={staggerItem} className="mt-8 text-xs text-gray-400 leading-relaxed max-w-[60ch]">
            Each set includes the foldable drying bag and a universal hose attachment. Suitable for all breeds from small terriers to large retrievers. Store in a dry place when not in use.
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
