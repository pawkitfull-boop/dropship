import { Product } from "@/lib/commerce/types"

export const products: Product[] = [
  {
    id: "prod_dryer_bag",
    handle: "pawkitfull-airdry-bag",
    title: "Pawkitfull AirDry Bag",
    positioning: "Dry your dog in minutes, not hours.",
    description: "Stop wrestling with towels and terrifying your pet with loud hair dryers. This portable, foldable blow dryer bag turns bath time from a chore into a breeze. Fast, safe, and stress-free for both you and your furry friend.",
    benefits: [
      "Fast drying with hot/cold air function",
      "Universal fit for all dog sizes (S to XL)",
      "Portable foldable design for easy storage",
      "Energy-efficient (under 1000W) and safe for home use",
      "Made with safe, chemical-free materials"
    ],
    included: [
      "1x Pawkitfull AirDry Bag"
    ],
    materialsAndCare: "Made with no high-concerned chemicals, ensuring pet safety during grooming. Hand wash or wipe clean.",
    sizeAndSpecs: "Available in S, M, L, XL. Weighs only 0.125 kg and packs down to 20 x 20 x 2 cm. Features an EU plug for European compatibility.",
    shippingExpectations: "Standard delivery is 3-5 business days.",
    faqs: [
      { question: "Will this fit my large dog?", answer: "Yes! It comes in sizes from Small to XL, ensuring a secure and comfortable fit for pets of all breeds and weights." },
      { question: "Is it safe for my pet?", answer: "Absolutely. It's made with safe, chemical-free materials and is designed to minimize heat risk." },
      { question: "How does it work?", answer: "Simply towel dry your pet, place them in the bag, secure it, and attach your hair dryer to the hose. Watch them dry quickly and safely!" }
    ],
    images: [
      { url: "/images/white-dog.jpg", altText: "Small white dog wearing Pawkitfull AirDry Bag", aspectRatio: "square" },
      { url: "/images/gallery-golden.jpg", altText: "Golden Retriever using the dryer bag", aspectRatio: "square" },
      { url: "/images/gallery-frenchie.jpg", altText: "French Bulldog studio shot", aspectRatio: "portrait" },
      { url: "/images/gallery-hose.jpg", altText: "Hose detail connection", aspectRatio: "square" }
    ],
    variants: [
      { id: "gid://shopify/ProductVariant/56359890321700", title: "Small", price: 34.99, sku: "PDB-S", availableForSale: true },
      { id: "gid://shopify/ProductVariant/56359890354468", title: "Medium", price: 34.99, sku: "PDB-M", availableForSale: true },
      { id: "gid://shopify/ProductVariant/56359890387236", title: "Large", price: 34.99, sku: "PDB-L", availableForSale: true },
      { id: "gid://shopify/ProductVariant/56359890420004", title: "Extra Large", price: 34.99, sku: "PDB-XL", availableForSale: true }
    ],
    availableForSale: true,
    tags: ["dogs", "cats", "clean", "hero"]
  }
]
