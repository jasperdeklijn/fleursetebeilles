export interface Room {
  id: string
  name: string
  name_nl?: string
  name_en?: string
  name_fr?: string
  description: string
  description_nl?: string
  description_en?: string
  description_fr?: string
  max_guests: number
  bed_type: string
  size_sqm: number
  price_per_night: number
  amenities: string[]
  amenities_nl?: string[]
  amenities_en?: string[]
  amenities_fr?: string[]
  images: string[]
  is_available: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}
