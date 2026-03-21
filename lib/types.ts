export interface Settings {
  id: number
  company_name: string
  address: string
  email_1: string
  email_2: string
  phone: string
  mission: string
  vision: string
  values: string[]
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  location: string
  description: string
  image_url: string | null
  category: string
  problem: string | null
  solution: string | null
  result: string | null
  slug: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon_url: string | null
  order: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  company: string | null
  feedback: string
  image_url: string | null
  rating: number
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  role: string | null
  bio: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}
