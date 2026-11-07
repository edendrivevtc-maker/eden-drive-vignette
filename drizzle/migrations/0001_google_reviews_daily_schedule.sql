CREATE FUNCTION public.configure_google_reviews_schedule(p_secret text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE command text;
BEGIN
  IF length(p_secret) < 32 THEN RAISE EXCEPTION 'Refresh secret missing'; END IF;
  command := format('SELECT net.http_post(url := %L, headers := %L::jsonb, body := ''{}''::jsonb, timeout_milliseconds := 20000);',
    'https://project--08f557a4-6d90-459b-8034-a4ee37e1101e.lovable.app/api/public/google-reviews-refresh',
    jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || p_secret)::text);
  PERFORM cron.schedule('google-reviews-daily-refresh', '5 11 * * *', command);
END;
$$;
REVOKE ALL ON FUNCTION public.configure_google_reviews_schedule(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.configure_google_reviews_schedule(text) TO service_role;