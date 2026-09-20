export interface ImageAsset {
  url: string
  altText: string
  aspectRatio: "square" | "portrait" | "landscape" | "auto"
  width?: number
  height?: number
}

export interface FAQ {
  question: string
  answer: string
}

export interface Variant {
  id: string
  title: string
  price: number
  compareAtPrice?: number | null
  sku: string
  availableForSale: boolean
}

export interface Product {
  id: string
  handle: string
  title: string
  positioning: string // Ritual-led one-line positioning
  description: string
  benefits: string[]
  included: string[]
  materialsAndCare: string
  sizeAndSpecs: string
  shippingExpectations: string
  faqs: FAQ[]
  images: ImageAsset[]
  variants: Variant[]
  availableForSale: boolean
  tags: string[]
}

export interface BundleItem {
  productId: string
  quantity: number
}

export interface Bundle {
  id: string
  handle: string
  title: string
  description: string
  items: BundleItem[]
  price: number
  compareAtPrice: number
  images: ImageAsset[]
  availableForSale: boolean
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  productIds: string[]
  image?: ImageAsset
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  date: string
  content: string
  verifiedBuyer: boolean
  photos?: ImageAsset[]
}

export interface Policy {
  id: string
  handle: string
  title: string
  content: string
}
