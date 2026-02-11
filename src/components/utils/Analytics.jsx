import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize PostHog only if the API key is present
    const apiKey = import.meta.env.VITE_POSTHOG_KEY;
    // Use local proxy /ph-new to bypass ad blockers and avoid Vercel 405
    const apiHost = '/ph-new';
    const uiHost = 'https://eu.posthog.com'; // For links to dashboard if needed

    if (apiKey && !posthog.__loaded) {
      posthog.init(apiKey, {
        api_host: apiHost,
        ui_host: uiHost,
        person_profiles: 'identified_only',
        capture_pageview: false, // We handle pageviews manually for SPA
        debug: false,
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
