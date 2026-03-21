-- Create tables for OBASSTEEL PROJECT LIMITED website

-- Settings table (company info)
CREATE TABLE IF NOT EXISTS settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  company_name TEXT NOT NULL DEFAULT 'OBASSTEEL PROJECT LIMITED',
  address TEXT NOT NULL DEFAULT '33 Enerhen Road, Enerhen, Uvwie LGA, Delta State, Ughelli South LGA',
  email_1 TEXT DEFAULT 'obassteelenergy@gmail.com',
  email_2 TEXT DEFAULT 'tobaroara@gmail.com',
  phone TEXT DEFAULT '08076066860',
  mission TEXT DEFAULT '',
  vision TEXT DEFAULT '',
  values JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Flow Station',
  problem TEXT,
  solution TEXT,
  result TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  company TEXT,
  feedback TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);
CREATE INDEX IF NOT EXISTS services_order_idx ON services("order");
CREATE INDEX IF NOT EXISTS testimonials_created_at_idx ON testimonials(created_at DESC);

-- Enable RLS if needed (optional - leaving open for now as no auth)
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
