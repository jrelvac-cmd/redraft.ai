-- Table pour stocker les emails des subscribers Coming Soon
CREATE TABLE IF NOT EXISTS coming_soon_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_coming_soon_subscribers_email ON coming_soon_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_coming_soon_subscribers_created_at ON coming_soon_subscribers(created_at);

-- Politique RLS
ALTER TABLE coming_soon_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON coming_soon_subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role select" ON coming_soon_subscribers
  FOR SELECT
  USING (auth.role() = 'service_role');
