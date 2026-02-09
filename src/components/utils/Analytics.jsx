import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize PostHog only if the API key is present
    const apiKey = import.meta.env.VITE_POSTHOG_KEY;
    const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

    if (apiKey && !posthog.__loaded) {
      console.log('PostHog: Initializing with host:', apiHost);
      posthog.init(apiKey, {
        api_host: apiHost,
        person_profiles: 'identified_only',
        capture_pageview: false, // We handle pageviews manually for SPA
        debug: true, // Enable debug mode to see events in console
        loaded: (ph) => {
          console.log('PostHog: Loaded successfully', ph);
        },
      });
    } else {
      console.log('PostHog: Skipped init (No Key or already loaded)', { apiKey: !!apiKey, loaded: !!posthog.__loaded });
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (posthog.__loaded) {
      console.log('PostHog: Capturing pageview', location.pathname);
      posthog.capture('$pageview');
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;
