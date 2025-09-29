-- Seed initial content for the BnB landing page

-- Insert content sections
INSERT INTO content_sections (section_key, section_name, content_type) VALUES
('hero_title', 'Hero Title', 'text'),
('hero_subtitle', 'Hero Subtitle', 'text'),
('hero_cta', 'Hero Call to Action', 'text'),
('about_title', 'About Section Title', 'text'),
('about_description', 'About Description', 'rich_text'),
('amenities_title', 'Amenities Title', 'text'),
('pricing_title', 'Pricing Title', 'text'),
('pricing_description', 'Pricing Description', 'text'),
('contact_title', 'Contact Title', 'text'),
('contact_description', 'Contact Description', 'text'),
('footer_text', 'Footer Text', 'text')
ON CONFLICT (section_key) DO NOTHING;

-- Insert English translations
INSERT INTO content_translations (section_id, language_code, content) 
SELECT id, 'en', 
  CASE section_key
    WHEN 'hero_title' THEN 'Welcome to Our Beautiful BnB'
    WHEN 'hero_subtitle' THEN 'Experience comfort and luxury in the heart of the city'
    WHEN 'hero_cta' THEN 'Book Your Stay'
    WHEN 'about_title' THEN 'About Our Property'
    WHEN 'about_description' THEN 'Our charming bed and breakfast offers a perfect blend of modern comfort and traditional hospitality. Located in a peaceful neighborhood, we provide an ideal retreat for travelers seeking authentic experiences.'
    WHEN 'amenities_title' THEN 'Amenities & Features'
    WHEN 'pricing_title' THEN 'Pricing & Availability'
    WHEN 'pricing_description' THEN 'Competitive rates with exceptional value'
    WHEN 'contact_title' THEN 'Get In Touch'
    WHEN 'contact_description' THEN 'Ready to book your stay? Contact us for availability and special offers.'
    WHEN 'footer_text' THEN '© 2025 Beautiful BnB. All rights reserved.'
  END
FROM content_sections
ON CONFLICT (section_id, language_code) DO NOTHING;

-- Insert Dutch translations
INSERT INTO content_translations (section_id, language_code, content) 
SELECT id, 'nl', 
  CASE section_key
    WHEN 'hero_title' THEN 'Welkom bij Onze Prachtige BnB'
    WHEN 'hero_subtitle' THEN 'Ervaar comfort en luxe in het hart van de stad'
    WHEN 'hero_cta' THEN 'Boek Uw Verblijf'
    WHEN 'about_title' THEN 'Over Ons Pand'
    WHEN 'about_description' THEN 'Onze charmante bed and breakfast biedt een perfecte mix van modern comfort en traditionele gastvrijheid. Gelegen in een rustige buurt, bieden wij een ideaal toevluchtsoord voor reizigers die op zoek zijn naar authentieke ervaringen.'
    WHEN 'amenities_title' THEN 'Voorzieningen & Faciliteiten'
    WHEN 'pricing_title' THEN 'Prijzen & Beschikbaarheid'
    WHEN 'pricing_description' THEN 'Concurrerende tarieven met uitzonderlijke waarde'
    WHEN 'contact_title' THEN 'Neem Contact Op'
    WHEN 'contact_description' THEN 'Klaar om uw verblijf te boeken? Neem contact met ons op voor beschikbaarheid en speciale aanbiedingen.'
    WHEN 'footer_text' THEN '© 2025 Prachtige BnB. Alle rechten voorbehouden.'
  END
FROM content_sections
ON CONFLICT (section_id, language_code) DO NOTHING;

-- Insert French translations
INSERT INTO content_translations (section_id, language_code, content) 
SELECT id, 'fr', 
  CASE section_key
    WHEN 'hero_title' THEN 'Bienvenue dans Notre Magnifique BnB'
    WHEN 'hero_subtitle' THEN 'Découvrez le confort et le luxe au cœur de la ville'
    WHEN 'hero_cta' THEN 'Réservez Votre Séjour'
    WHEN 'about_title' THEN 'À Propos de Notre Propriété'
    WHEN 'about_description' THEN 'Notre charmant bed and breakfast offre un mélange parfait de confort moderne et d''hospitalité traditionnelle. Situé dans un quartier paisible, nous offrons une retraite idéale pour les voyageurs en quête d''expériences authentiques.'
    WHEN 'amenities_title' THEN 'Équipements & Caractéristiques'
    WHEN 'pricing_title' THEN 'Tarifs & Disponibilité'
    WHEN 'pricing_description' THEN 'Tarifs compétitifs avec une valeur exceptionnelle'
    WHEN 'contact_title' THEN 'Contactez-Nous'
    WHEN 'contact_description' THEN 'Prêt à réserver votre séjour ? Contactez-nous pour la disponibilité et les offres spéciales.'
    WHEN 'footer_text' THEN '© 2025 Magnifique BnB. Tous droits réservés.'
  END
FROM content_sections
ON CONFLICT (section_id, language_code) DO NOTHING;

-- Insert sample property information
INSERT INTO property_info (name, description, address, max_guests, bedrooms, bathrooms, price_per_night, currency, amenities, images) VALUES
('Beautiful City BnB', 'A charming bed and breakfast in the heart of the city', '123 Main Street, City Center', 4, 2, 2, 89.00, 'EUR', 
 ARRAY['Free WiFi', 'Breakfast Included', 'Air Conditioning', 'Private Bathroom', 'City View', 'Non-Smoking', 'Parking Available'],
 ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'])
ON CONFLICT DO NOTHING;
