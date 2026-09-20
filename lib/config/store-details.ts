/**
 * SINGLE SOURCE OF TRUTH FOR OPERATIONAL FACTS
 * 
 * Update these values before launch. The UI will gracefully adapt if values are unset
 * (e.g. by hiding blocks or using generic fallback copy), rather than rendering raw
 * placeholder tokens to the customer.
 */

export const storeDetails = {
  // Brand
  name: "The 10-Minute Reset",
  legalName: "", // e.g. "Ten Minute Reset LLC"
  
  // Contact
  supportEmail: "", // e.g. "support@the10minutereset.com"
  pressEmail: "",
  
  // Physical Address (Only provide if real and verified)
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  },
  
  // Founding
  foundedYear: "", // e.g. "2024"
  foundedLocation: "", // e.g. "Los Angeles, CA"
  
  // Supply Chain & SLAs
  manufacturingRegion: "", // e.g. "Zhejiang, China"
  manufacturingDetail: "", // e.g. "ISO 9001 certified facility"
  supportResponseTime: "", // e.g. "24 hours"
  shippingCutoff: "", // e.g. "2:00 PM EST"
  
  // Shipping Windows
  shipping: {
    standard: {
      courier: "", // e.g. "USPS"
      window: "", // e.g. "3-5 Business Days"
      price: "Free"
    },
    expedited: {
      window: "", // e.g. "2 Business Days"
      price: "" // e.g. "$15.00"
    }
  },
  
  // Returns
  returnsWindowDays: 30,
}
