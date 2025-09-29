-- Create content management tables for the BnB landing page
-- This will store customizable text content in multiple languages

-- Content sections table to define different areas of the site
CREATE TABLE IF NOT EXISTS content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL, -- e.g., 'hero_title', 'pricing_description'
  section_name TEXT NOT NULL, -- Human readable name for admin panel
  content_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'rich_text', 'image_url'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content translations table to store text in multiple languages
CREATE TABLE IF NOT EXISTS content_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES content_sections(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL, -- 'en', 'nl', 'fr'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section_id, language_code)
);

-- BnB property information table
CREATE TABLE IF NOT EXISTS property_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  max_guests INTEGER DEFAULT 1,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  price_per_night DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  amenities TEXT[], -- Array of amenities
  images TEXT[], -- Array of image URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_info ENABLE ROW LEVEL SECURITY;

-- Public read access for content (no auth required for viewing)
CREATE POLICY "Allow public read access to content_sections" ON content_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read access to content_translations" ON content_translations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to property_info" ON property_info FOR SELECT USING (true);

-- Admin write access (authenticated users only)
CREATE POLICY "Allow authenticated users to manage content_sections" ON content_sections FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to manage content_translations" ON content_translations FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to manage property_info" ON property_info FOR ALL USING (auth.uid() IS NOT NULL);
