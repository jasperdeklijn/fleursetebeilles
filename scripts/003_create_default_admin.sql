-- Create default admin user for the BnB admin panel
-- This script creates a default admin user with email: jasperdeklijn@gmail.com
-- Password: admintest123

-- Note: In Supabase, users are typically created through the auth.users table
-- However, for development purposes, we'll create this user through the dashboard
-- or using the Supabase client in the application

-- For now, we'll create a placeholder that documents the default credentials
-- The actual user creation will happen through the Supabase Auth API

-- Default admin credentials:
-- Email: jasperdeklijn@gmail.com  
-- Password: admintest123

-- This user will have full access to the admin panel once created
-- You can create this user by:
-- 1. Going to your Supabase dashboard > Authentication > Users
-- 2. Click "Add user" and enter the above credentials
-- 3. Or use the sign-up functionality in the app (if enabled)

-- For development, we'll add a note in the database
CREATE TABLE IF NOT EXISTS admin_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO admin_notes (note) VALUES 
('jasperdeklijn@gmail.com', 'admintest123')
ON CONFLICT DO NOTHING;
