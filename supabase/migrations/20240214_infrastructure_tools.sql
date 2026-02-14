-- Create grievances table
CREATE TABLE IF NOT EXISTS grievances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID, -- Optional link to a projects table if it exists
    complainant_name TEXT,
    contact_info TEXT,
    issue_category TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_url TEXT,
    status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inspections table
CREATE TABLE IF NOT EXISTS inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name TEXT NOT NULL,
    inspector_name TEXT NOT NULL,
    inspection_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create punchlist_items table
CREATE TABLE IF NOT EXISTS punchlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inspection_id UUID REFERENCES inspections(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('Low', 'High', 'Critical')),
    description TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table for Executive Dashboard
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    schedule_status TEXT DEFAULT 'On Track',
    budget_status TEXT DEFAULT 'Healthy',
    risk_factor TEXT DEFAULT 'Low',
    physical_progress INTEGER DEFAULT 0,
    financial_burn INTEGER DEFAULT 0,
    last_brief_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE punchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects (Public view for client portal, Admin manage)
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (true);

-- Policies for grievances (Public submit, Admin view)
CREATE POLICY "Public can insert grievances" ON grievances FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all grievances" ON grievances FOR SELECT USING (true); -- Simplified for now
CREATE POLICY "Admins can update grievances" ON grievances FOR UPDATE USING (true);

-- Policies for inspections
CREATE POLICY "Users can manage their inspections" ON inspections FOR ALL USING (true);
CREATE POLICY "Users can manage their punchlist items" ON punchlist_items FOR ALL USING (true);

-- Storage Buckets (Note: SQL for storage varies by Supabase version, usually done via UI or API)
-- insert into storage.buckets (id, name, public) values ('grievance-evidence', 'grievance-evidence', true);
-- insert into storage.buckets (id, name, public) values ('inspection-photos', 'inspection-photos', true);
