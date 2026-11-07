CREATE TABLE public.google_reviews_cache (
  place_id text PRIMARY KEY,
  rating double precision,
  user_rating_count integer,
  fetched_at timestamptz,
  last_attempt_at timestamptz,
  next_attempt_at timestamptz NOT NULL DEFAULT '-infinity',
  refresh_token uuid,
  CONSTRAINT google_reviews_known_place CHECK (place_id = 'ChIJNwxPMyNDmSMRqfrpaqAitZY'),
  CONSTRAINT google_reviews_rating_valid CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5)),
  CONSTRAINT google_reviews_count_valid CHECK (user_rating_count IS NULL OR user_rating_count >= 0)
);
GRANT SELECT (place_id, rating, user_rating_count) ON public.google_reviews_cache TO anon, authenticated;
GRANT ALL ON public.google_reviews_cache TO service_role;
ALTER TABLE public.google_reviews_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public business review stats" ON public.google_reviews_cache FOR SELECT TO anon, authenticated USING (true);

CREATE FUNCTION public.claim_google_reviews_refresh()
RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE claimed uuid;
BEGIN
  INSERT INTO public.google_reviews_cache (place_id)
  VALUES ('ChIJNwxPMyNDmSMRqfrpaqAitZY') ON CONFLICT DO NOTHING;
  UPDATE public.google_reviews_cache
  SET last_attempt_at = clock_timestamp(), next_attempt_at = clock_timestamp() + interval '24 hours', refresh_token = gen_random_uuid()
  WHERE place_id = 'ChIJNwxPMyNDmSMRqfrpaqAitZY' AND next_attempt_at <= clock_timestamp()
  RETURNING refresh_token INTO claimed;
  RETURN claimed;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_google_reviews_refresh() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_google_reviews_refresh() TO service_role;

CREATE FUNCTION public.complete_google_reviews_refresh(p_token uuid, p_rating double precision, p_count integer)
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  UPDATE public.google_reviews_cache
  SET rating = p_rating, user_rating_count = p_count, fetched_at = clock_timestamp(), refresh_token = NULL
  WHERE place_id = 'ChIJNwxPMyNDmSMRqfrpaqAitZY' AND refresh_token = p_token;
  RETURN FOUND;
END;
$$;
REVOKE ALL ON FUNCTION public.complete_google_reviews_refresh(uuid, double precision, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.complete_google_reviews_refresh(uuid, double precision, integer) TO service_role;

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;