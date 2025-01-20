-- Table: public.staff_issues
-- DROP TABLE IF EXISTS public.staff_issues;
CREATE TABLE
    IF NOT EXISTS public.staff_issues (
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (
            INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1
        ),
        staff_id INTEGER DEFAULT 1 REFERENCES public.staff (id),
        issue_id INTEGER DEFAULT 1 REFERENCES public.issues (id),
        is_resolved BOOLEAN DEFAULT false,
        assigned_at timestamp
        with
            time zone DEFAULT now (),
        CONSTRAINT staff_issues_pkey PRIMARY KEY (id)
    ) TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.staff_issues OWNER to postgres;

ALTER TABLE IF EXISTS public.staff_issues ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.staff_issues TO anon;

GRANT ALL ON TABLE public.staff_issues TO authenticated;

GRANT ALL ON TABLE public.staff_issues TO postgres;

GRANT ALL ON TABLE public.staff_issues TO service_role;

-- POLICY: Enable read access for all users
-- DROP POLICY IF EXISTS "Enable read access for all users" ON public.staff_issues;
CREATE POLICY "Enable read access for all users" ON public.staff_issues AS PERMISSIVE FOR
SELECT
    TO public USING (true);

-- POLICY: Enable insert access for all users
-- DROP POLICY IF EXISTS "Enable insert access for all users" ON public.staff_issues;
CREATE POLICY "Enable insert access for all users" ON public.staff_issues AS PERMISSIVE FOR INSERT TO public
WITH
    CHECK (true);

-- POLICY: Enable update access for all users
-- DROP POLICY IF EXISTS "Enable update access for all users" ON public.staff_issues;
CREATE POLICY "Enable update access for all users" ON public.staff_issues AS PERMISSIVE FOR
UPDATE TO public USING (true);

-- POLICY: Enable delete access for all users
-- DROP POLICY IF EXISTS "Enable delete access for all users" ON public.staff_issues;
CREATE POLICY "Enable delete access for all users" ON public.staff_issues AS PERMISSIVE FOR DELETE TO public USING (true);