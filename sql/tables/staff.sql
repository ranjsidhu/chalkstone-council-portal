-- Table: public.staff
-- DROP TABLE IF EXISTS public.staff;
CREATE TABLE
    IF NOT EXISTS public.staff (
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (
            INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1
        ),
        name text COLLATE pg_catalog."default",
        created_at timestamp
        with
            time zone DEFAULT now (),
        updated_at timestamp
        with
            time zone DEFAULT now (),
        CONSTRAINT staff_pkey PRIMARY KEY (id)
    ) TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.staff OWNER to postgres;

ALTER TABLE IF EXISTS public.staff ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.staff TO anon;

GRANT ALL ON TABLE public.staff TO authenticated;

GRANT ALL ON TABLE public.staff TO postgres;

GRANT ALL ON TABLE public.staff TO service_role;

-- POLICY: Enable read access for all users
-- DROP POLICY IF EXISTS "Enable read access for all users" ON public.staff;
CREATE POLICY "Enable read access for all users" ON public.staff AS PERMISSIVE FOR
SELECT
    TO public USING (true);


INSERT INTO public.staff (name) VALUES ('Staff Member 1'), ('Staff Member 2'), ('Staff Member 3');