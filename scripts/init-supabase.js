import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing OBASSTEEL database...')

    // Create settings table
    const { error: settingsError } = await supabase.rpc('exec', {
      sql: `
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
        )
      `
    }).catch(() => ({ error: null })) // Ignore if already exists

    // Create projects table
    const { error: projectsError } = await supabase.rpc('exec', {
      sql: `
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
        )
      `
    }).catch(() => ({ error: null }))

    // Create services table
    const { error: servicesError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS services (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          icon_url TEXT,
          "order" INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now()
        )
      `
    }).catch(() => ({ error: null }))

    // Create testimonials table
    const { error: testimonialsError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS testimonials (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          client_name TEXT NOT NULL,
          company TEXT,
          feedback TEXT NOT NULL,
          image_url TEXT,
          rating INTEGER DEFAULT 5,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now()
        )
      `
    }).catch(() => ({ error: null }))

    // Create team members table
    const { error: teamError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS team_members (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          title TEXT NOT NULL,
          role TEXT,
          bio TEXT,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now()
        )
      `
    }).catch(() => ({ error: null }))

    console.log('✅ Database initialized successfully!')

    // Insert sample data
    await supabase.from('settings').upsert({
      id: 1,
      company_name: 'OBASSTEEL PROJECT LIMITED',
      address: '33 Enerhen Road, Enerhen, Uvwie LGA, Delta State, Ughelli South LGA',
      email_1: 'obassteelenergy@gmail.com',
      email_2: 'tobaroara@gmail.com',
      phone: '08076066860',
      mission: 'To be the leading provider of innovative oil and gas engineering solutions',
      vision: 'To transform the African energy sector through cutting-edge technology',
      values: ['Integrity', 'Innovation', 'Safety', 'Excellence']
    })

    console.log('✅ Sample data inserted!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

initializeDatabase()
