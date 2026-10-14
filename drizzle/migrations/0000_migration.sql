CREATE TABLE public.prospects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'formulaire',
  type_demande text,
  nom text NOT NULL,
  societe text,
  ville text,
  telephone text,
  email text,
  volume_mensuel text,
  message text
);
GRANT ALL ON public.prospects TO service_role;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;