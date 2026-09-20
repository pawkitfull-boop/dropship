import { Collection } from "@/lib/commerce/types"

export const collections: Collection[] = [
  {
    id: "col_bestsellers",
    handle: "best-sellers",
    title: "Best Sellers",
    description: "Our most loved pet upgrades.",
    productIds: ["prod_dryer_bag"]
  },
  {
    id: "col_shopall",
    handle: "shop-all",
    title: "Shop All",
    description: "Clever pet essentials that make grooming, playtime, walks and everyday routines a little easier.",
    productIds: ["prod_dryer_bag"]
  },
  {
    id: "col_groom",
    handle: "groom",
    title: "Groom & Clean",
    description: "Tools to keep their coat healthy and your home clean.",
    productIds: ["prod_dryer_bag"]
  },
  {
    id: "col_hydrate",
    handle: "hydrate",
    title: "Hydrate",
    description: "Smarter ways to keep them refreshed, at home or on the go.",
    productIds: []
  },
  {
    id: "col_play",
    handle: "play",
    title: "Play",
    description: "Engaging toys designed for their natural instincts.",
    productIds: []
  },
  {
    id: "col_adventure",
    handle: "adventure",
    title: "Adventure",
    description: "Gear built for the walk, the hike, and the road trip.",
    productIds: []
  }
]
