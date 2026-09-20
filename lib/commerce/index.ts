export interface Product {
  id: string
  title: string
  description: string
  price: {
    amount: string
    currencyCode: string
  }
  images: {
    url: string
    altText: string
  }[]
  handle: string
  availableForSale: boolean
}

export interface CommerceAdapter {
  getProducts(): Promise<Product[]>
  getProduct(handle: string): Promise<Product | null>
  // Add more methods for cart, checkout, collections etc.
}

export const mockCommerceAdapter: CommerceAdapter = {
  async getProducts() {
    return [
      {
        id: '1',
        title: 'Acupressure Mat & Pillow Set',
        description: 'The ultimate 10-minute reset for your daily tension and recovery routine.',
        price: { amount: '79.00', currencyCode: 'USD' },
        images: [{ url: '/images/mat-pillow.jpg', altText: 'Acupressure Mat and Pillow Set' }],
        handle: 'acupressure-mat-pillow-set',
        availableForSale: true,
      }
      // Add more mock products here based on the brief
    ]
  },
  
  async getProduct(handle: string) {
    const products = await this.getProducts()
    return products.find(p => p.handle === handle) || null
  }
}

// In the future, this export will simply be swapped to the Shopify adapter
export const commerce: CommerceAdapter = mockCommerceAdapter
