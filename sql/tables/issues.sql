-- Table: public.issues
-- DROP TABLE IF EXISTS public.issues;
CREATE TABLE
    IF NOT EXISTS public.issues (
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (
            INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1
        ),
        lat INTEGER,
        long INTEGER,
        issue_type_id INTEGER DEFAULT 1,
        description text COLLATE pg_catalog."default",
        address text COLLATE pg_catalog."default",
        image_filename text COLLATE pg_catalog."default",
        status_id INTEGER DEFAULT 1,
        created_at timestamp
        with
            time zone DEFAULT now (),
        updated_at timestamp
        with
            time zone DEFAULT now (),
        CONSTRAINT issues_pkey PRIMARY KEY (id)
    ) TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.issues OWNER to postgres;

ALTER TABLE IF EXISTS public.issues ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.issues TO anon;

GRANT ALL ON TABLE public.issues TO authenticated;

GRANT ALL ON TABLE public.issues TO postgres;

GRANT ALL ON TABLE public.issues TO service_role;

-- POLICY: Enable read access for all users
-- DROP POLICY IF EXISTS "Enable read access for all users" ON public.issues;
CREATE POLICY "Enable read access for all users" ON public.issues AS PERMISSIVE FOR
SELECT
    TO public USING (true);

-- POLICY: Enable insert access for all users
-- DROP POLICY IF EXISTS "Enable insert access for all users" ON public.issues;
CREATE POLICY "Enable insert access for all users" ON public.issues AS PERMISSIVE FOR INSERT TO public
WITH
    CHECK (true);