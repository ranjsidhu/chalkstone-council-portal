-- Table: public.issue_statuses
-- DROP TABLE IF EXISTS public.issue_statuses;
CREATE TABLE
    IF NOT EXISTS public.issue_statuses (
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
        CONSTRAINT issue_statuses_pkey PRIMARY KEY (id)
    ) TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.issue_statuses OWNER to postgres;

ALTER TABLE IF EXISTS public.issue_statuses ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.issue_statuses TO anon;

GRANT ALL ON TABLE public.issue_statuses TO authenticated;

GRANT ALL ON TABLE public.issue_statuses TO postgres;

GRANT ALL ON TABLE public.issue_statuses TO service_role;

-- POLICY: Enable read access for all users
-- DROP POLICY IF EXISTS "Enable read access for all users" ON public.issue_statuses;
CREATE POLICY "Enable read access for all users" ON public.issue_statuses AS PERMISSIVE FOR
SELECT
    TO public USING (true);




INSERT INTO public.issue_statuses (name) VALUES ('Open'), ('In Progress'), ('Resolved'), ('Closed');