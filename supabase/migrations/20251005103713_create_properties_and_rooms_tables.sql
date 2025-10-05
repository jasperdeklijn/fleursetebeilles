/*
  # Create Properties and Rooms System

  ## Overview
  This migration creates a comprehensive system for managing BnB properties and individual rooms.
  It allows admins to create and manage multiple rooms with full details.

  ## New Tables Created

  ### 1. `content_sections`
    - Stores customizable content sections for the website
    - Columns:
      - `id` (uuid): Primary key
      - `section_key` (text): Unique identifier for the section
      - `section_name` (text): Human-readable name
      - `content_type` (text): Type of content (text, rich_text, image_url)
      - `created_at`, `updated_at` (timestamptz): Timestamps

  ### 2. `content_translations`
    - Stores translations for content sections in multiple languages
    - Columns:
      - `id` (uuid): Primary key
      - `section_id` (uuid): Foreign key to content_sections
      - `language_code` (text): Language code (en, nl, fr)
      - `content` (text): Translated content
      - `created_at`, `updated_at` (timestamptz): Timestamps
    - Unique constraint on (section_id, language_code)

  ### 3. `property_info`
    - Stores main property/BnB information
    - Columns:
      - `id` (uuid): Primary key
      - `name` (text): Property name
      - `description` (text): Property description
      - `address` (text): Property address
      - `max_guests` (integer): Maximum guests
      - `bedrooms` (integer): Number of bedrooms
      - `bathrooms` (integer): Number of bathrooms
      - `price_per_night` (numeric): Base price per night
      - `currency` (text): Currency code
      - `amenities` (text[]): Array of amenities
      - `images` (text[]): Array of image URLs
      - `created_at`, `updated_at` (timestamptz): Timestamps

  ### 4. `rooms`
    - Stores individual room details
    - Columns:
      - `id` (uuid): Primary key
      - `name` (text): Room name
      - `description` (text): Room description
      - `max_guests` (integer): Maximum guests per room
      - `bed_type` (text): Type of bed
      - `size_sqm` (numeric): Room size in square meters
      - `price_per_night` (numeric): Price per night
      - `amenities` (text[]): Room-specific amenities
      - `images` (text[]): Room images
      - `is_available` (boolean): Availability status
      - `sort_order` (integer): Display order
      - `created_at`, `updated_at` (timestamptz): Timestamps

  ## Security
    - Row Level Security (RLS) enabled on all tables
    - Public read access for all content (anonymous users can view)
    - Write access restricted to authenticated users only
    - Separate policies for SELECT, INSERT, UPDATE, DELETE operations

  ## Important Notes
    1. All tables use UUID primary keys for security and scalability
    2. Timestamps automatically track creation and modification times
    3. RLS policies ensure data security while allowing public viewing
    4. Arrays store multiple values (amenities, images) efficiently
*/

-- Create content management tables
CREATE TABLE IF NOT EXISTS content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  section_name TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES content_sections(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section_id, language_code)
);

-- Create property info table
CREATE TABLE IF NOT EXISTS property_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  max_guests INTEGER DEFAULT 1,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  price_per_night NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  max_guests INTEGER DEFAULT 2,
  bed_type TEXT DEFAULT 'Queen Bed',
  size_sqm NUMERIC(6,2),
  price_per_night NUMERIC(10,2) NOT NULL,
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can view content sections"
  ON content_sections
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view content translations"
  ON content_translations
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view property info"
  ON property_info
  FOR SELECT
  USING (true);

CREATE POLICY "Public can view rooms"
  ON rooms
  FOR SELECT
  USING (true);

-- Authenticated users can manage content_sections
CREATE POLICY "Authenticated users can insert content sections"
  ON content_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update content sections"
  ON content_sections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete content sections"
  ON content_sections
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage content_translations
CREATE POLICY "Authenticated users can insert content translations"
  ON content_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update content translations"
  ON content_translations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete content translations"
  ON content_translations
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage property_info
CREATE POLICY "Authenticated users can insert property info"
  ON property_info
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update property info"
  ON property_info
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete property info"
  ON property_info
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can manage rooms
CREATE POLICY "Authenticated users can insert rooms"
  ON rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update rooms"
  ON rooms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete rooms"
  ON rooms
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_content_translations_section_id ON content_translations(section_id);
CREATE INDEX IF NOT EXISTS idx_content_translations_language ON content_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_rooms_available ON rooms(is_available);
CREATE INDEX IF NOT EXISTS idx_rooms_sort_order ON rooms(sort_order);