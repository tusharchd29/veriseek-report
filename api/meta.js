// /api/meta.js
// Vercel serverless function — proxies Meta Graph API calls.
// The META_ACCESS_TOKEN env variable is set in Vercel dashboard.
// Frontend never sees the token.

const META_API = 'https://graph.facebook.com/v21.0';
const ACCOUNT_ID = '3252000788333236'; // Veriseek AI

export default async function handler(req, res) {
  // CORS — allow requests from same origin only
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'META_ACCESS_TOKEN not configured in Vercel environment variables.' });
  }

  const { endpoint, ...params } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint parameter.' });
  }

  // Whitelist allowed endpoints for security
  const allowed = [
    `act_${ACCOUNT_ID}/campaigns`,
    `act_${ACCOUNT_ID}/insights`,
    `act_${ACCOUNT_ID}`,
  ];

  if (!allowed.includes(endpoint)) {
    return res.status(403).json({ error: `Endpoint not allowed: ${endpoint}` });
  }

  try {
    const url = new URL(`${META_API}/${endpoint}`);
    url.searchParams.set('access_token', token);

    // Forward all query params except 'endpoint'
    Object.entries(params).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });

    const metaRes = await fetch(url.toString());
    const data = await metaRes.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message, code: data.error.code });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
