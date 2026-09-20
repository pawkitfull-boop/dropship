import { Bundle } from "@/lib/commerce/types"

export const bundles: Bundle[] = [
  {
    id: "bundle_2pack",
    handle: "pawkitfull-dryer-bag-2-pack",
    title: "Pawkitfull Blow Dryer Bag 2-Pack",
    description: "Perfect for multi-dog households. Get two and save.",
    items: [
      { productId: "prod_dryer_bag", quantity: 2 }
    ],
    price: 59.95, // Total individual: $79.90 (Savings: $19.95)
    compareAtPrice: 79.90,
    images: [
      { url: "/images/bundle-dogs.png", altText: "Two Pawkitfull Blow Dryer Bags", aspectRatio: "landscape" }
    ],
    availableForSale: true
  }
]
