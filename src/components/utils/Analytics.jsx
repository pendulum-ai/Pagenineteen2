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
      posthog.init(apiKey, {
        api_host: apiHost,
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        capture_pageview: false, // We handle pageviews manually for SPA
      });
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (posthog.__loaded) {
      posthog.capture('$pageview');
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;
