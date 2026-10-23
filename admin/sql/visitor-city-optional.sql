-- Run once on existing CM Infinia installations before deploying the new form.
begin;
alter table public.visitors drop constraint if exists visitors_city_check;
alter table public.visitors alter column city set default '';
commit;
