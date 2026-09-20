"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CARDS = [
  {
    problem: "Wet dog smell lingering?",
    action: "Dry them fast",
    href: "/products/foldable-pet-hair-blow-dryer-bag",
    bgColor: "bg-[#cde4f0]", // Light blue
  },
  {
    problem: "Towels just not cutting it?",
    action: "Dry them fast",
    href: "/products/foldable-pet-hair-blow-dryer-bag",
    bgColor: "bg-[#b6efc4]", // Light green
  },
  {
    problem: "Dog terrified of loud dryers?",
    action: "Dry them safely",
    href: "/products/foldable-pet-hair-blow-dryer-bag",
    bgColor: "bg-[#ffc7ba]", // Peach
  },
  {
    problem: "Bath time takes too long?",
    action: "Dry them fast",
    href: "/products/foldable-pet-hair-blow-dryer-bag",
    bgColor: "bg-[#faebd7]", // Cream
  }
]

export function PawkitfullProblemSolution() {
  return (
    <section className="w-full bg-white px-gutter py-16 md:py-24">
      <div className="mx-auto max-w-[88rem]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Make bath time a breeze</h2>
          <p className="text-lg text-gray-600">
            A single tool to fix the biggest frustrations of washing your pet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, idx) => (
            <Link 
              key={idx} 
              href={card.href}
              className={`group flex flex-col justify-between p-8 rounded-3xl ${card.bgColor} min-h-[300px] transition-transform hover:-translate-y-2 hover:shadow-xl`}
            >
              <div>
                <h3 className="text-3xl font-bold text-black leading-tight mb-4">
                  {card.problem}
                </h3>
              </div>
              
              <div className="flex items-center justify-between mt-8">
                <span className="text-sm font-bold uppercase tracking-widest text-black/70 group-hover:text-black transition-colors">
                  {card.action}
                </span>
                <div className="flex size-10 items-center justify-center rounded-full bg-black text-white group-hover:bg-[#00c881] transition-colors">
                  <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
