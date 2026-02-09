export default async function handler(req, res) {
  const target = 'https://eu.i.posthog.com';
  
  // Strip the /api prefix if present in the path to get the correct PostHog path
  // Our rewrite maps /ph-new/* -> /api/ph?path=*
  // But simpler: just take the full URL and replace the host.
  
  // Wait, req.url in Vercel function is relative to the function.
  // If we rewrite /ph-new/e/ -> /api/ph, req.url might be /api/ph?path=...
  
  // Let's use a simpler approach:
  // We'll receive the full path in query if we configure vercel.json right.
  // Or we just proxy everything.
  
  // Fix for "405 Method Not Allowed" on Vercel:
  // We need to ensure we support POST/GET/OPTIONS.
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Construct the destination URL
    // We expect the path to be passed or we infer it.
    // If request is to /ph-new/e/, and we rewrite to /api/ph,
    // we need to know the suffix "/e/".
    
    // Changing vercel.json to:
    // "source": "/ph-new/:path*", "destination": "/api/ph?path=:path*"
    
    const { path } = req.query;
    const pathString = Array.isArray(path) ? path.join('/') : path;
    
    if (!pathString) {
      return res.status(400).json({ error: 'No path provided' });
    }

    const url = `${target}/${pathString}`;
    
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: 'eu.i.posthog.com', // Override host
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Copy headers from PostHog response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const data = await response.text();
    res.status(response.status).send(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error' });
  }
}
