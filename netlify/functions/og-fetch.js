// Netlify Function to fetch Open Graph metadata from URLs
const https = require('https');
const http = require('http');

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MinytsFetcher/1.0)'
      },
      timeout: 8000
    }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchPage(res.headers.location).then(resolve).catch(reject);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function extractMetaTags(html) {
  const meta = {};

  // Extract Open Graph tags
  const ogRegex = /<meta\s+(?:property|name)=["']og:([^"']+)["']\s+content=["']([^"']*)["']/gi;
  let match;
  while ((match = ogRegex.exec(html)) !== null) {
    meta['og:' + match[1]] = match[2];
  }

  // Also try reversed attribute order
  const ogRegex2 = /<meta\s+content=["']([^"']*)["']\s+(?:property|name)=["']og:([^"']+)["']/gi;
  while ((match = ogRegex2.exec(html)) !== null) {
    meta['og:' + match[2]] = match[1];
  }

  // Extract Twitter tags as fallback
  const twitterRegex = /<meta\s+(?:property|name)=["']twitter:([^"']+)["']\s+content=["']([^"']*)["']/gi;
  while ((match = twitterRegex.exec(html)) !== null) {
    if (!meta['og:' + match[1]]) {
      meta['og:' + match[1]] = match[2];
    }
  }

  // Extract title tag as fallback
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch && !meta['og:title']) {
    meta['og:title'] = titleMatch[1].trim();
  }

  // Extract meta description as fallback
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (descMatch && !meta['og:description']) {
    meta['og:description'] = descMatch[1];
  }

  return meta;
}

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // Get URL from query parameter
  const url = event.queryStringParameters?.url;

  if (!url) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing url parameter' })
    };
  }

  try {
    // Validate URL
    new URL(url);

    const html = await fetchPage(url);
    const meta = extractMetaTags(html);

    // Extract domain for site name
    const domain = new URL(url).hostname.replace('www.', '');

    const result = {
      url: url,
      title: meta['og:title'] || '',
      description: meta['og:description'] || '',
      image: meta['og:image'] || '',
      siteName: meta['og:site_name'] || domain,
      domain: domain
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch URL: ' + error.message })
    };
  }
};
