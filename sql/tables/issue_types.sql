-- Table: public.issue_types
-- DROP TABLE IF EXISTS public.issue_types;
CREATE TABLE
    IF NOT EXISTS public.issue_types (
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (
            INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1
        ),
        name text COLLATE pg_catalog."default",
        is_active boolean DEFAULT true,
        created_at timestamp
        with
            time zone DEFAULT now (),
        updated_at timestamp
        with
            time zone DEFAULT now (),
        CONSTRAINT issue_types_pkey PRIMARY KEY (id)
    ) TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.issue_types OWNER to postgres;

ALTER TABLE IF EXISTS public.issue_types ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.issue_types TO anon;

GRANT ALL ON TABLE public.issue_types TO authenticated;

GRANT ALL ON TABLE public.issue_types TO postgres;

GRANT ALL ON TABLE public.issue_types TO service_role;

-- POLICY: Enable read access for all users
-- DROP POLICY IF EXISTS "Enable read access for all users" ON public.issue_types;
CREATE POLICY "Enable read access for all users" ON public.issue_types AS PERMISSIVE FOR
SELECT
    TO public USING (true);


INSERT INTO public.issue_types (name) VALUES ('Pothole'), ('Street Lighting'), ('Graffiti'), ('Anti-Social Behaviour'), ('Fly-Tipping'), ('Blocked Drain'), ('Other');