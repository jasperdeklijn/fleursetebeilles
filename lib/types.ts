export interface Room {
  id: string
  name: string
  description: string
  max_guests: number
  bed_type: string
  size_sqm: number
  price_per_night: number
  amenities: string[]
  images: string[]
  is_available: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}
