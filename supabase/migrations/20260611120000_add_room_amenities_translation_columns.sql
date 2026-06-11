-- Add translated amenities columns for room records

ALTER TABLE rooms
  ADD COLUMN IF NOT EXISTS amenities_nl TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS amenities_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS amenities_fr TEXT[] DEFAULT ARRAY[]::TEXT[];
