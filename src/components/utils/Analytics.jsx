import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics — PostHog with deferred loading.
 * PostHog is loaded via dynamic import after the main thread is idle,
 * removing ~155KB from the critical rendering path.
 */
const Analytics = () => {
  const location = useLocation();
  const posthogRef = useRef(null);
  const pendingPageviews = useRef([]);

  // Deferred PostHog initialization
  useEffect(() => {
    const apiKey = import.meta.env.VITE_POSTHOG_KEY;
    if (!apiKey) return;

    const initPostHog = async () => {
      try {
        const { default: posthog } = await import('posthog-js');
        
        if (!posthog.__loaded) {
          posthog.init(apiKey, {
            api_host: '/ph-new',
            ui_host: 'https://eu.posthog.com',
            person_profiles: 'identified_only',
            capture_pageview: false,
            debug: false,
          });
        }
        
        posthogRef.current = posthog;

        // Flush any pageviews that happened before PostHog loaded
        pendingPageviews.current.forEach(path => {
          posthog.capture('$pageview', { $current_url: path });
        });
        pendingPageviews.current = [];
      } catch (e) {
        console.warn('PostHog failed to load:', e);
      }
    };

    // Wait for idle time before loading analytics
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => initPostHog(), { timeout: 4000 });
    } else {
      setTimeout(initPostHog, 3000);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (posthogRef.current?.__loaded) {
      posthogRef.current.capture('$pageview');
    } else {
      // Queue pageview until PostHog loads
      pendingPageviews.current.push(window.location.href);
    }
  }, [location]);

  return null;
};

export default Analytics;

