// ============================================================
// SEO SUGGESTION FUNCTION
// ============================================================
// Calls the Anthropic Claude API with article content and returns
// suggested meta title, meta description, primary keyword, suggested
// H1, and a list of relevant tags.
//
// Endpoint (after deploy): POST /api/seo-suggest
// Expected body: { "title": "...", "content": "..." }
// Returns: { metaTitle, metaDescription, primaryKeyword, suggestedH1, tags }
//
// Requires environment variable: ANTHROPIC_API_KEY
// Set in Netlify dashboard → Site configuration → Environment variables
// ============================================================

export default async (request, context) => {
  // CORS preflight (in case the helper page is loaded from a different origin)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed. Use POST.' }, 405);
  }

  // Parse incoming JSON
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON in request body' }, 400);
  }

  const { title, content } = body;
  if (!title || !content) {
    return json(
      { error: 'Request body must include "title" and "content" fields' },
      400
    );
  }

  // Pull API key from Netlify environment
  const apiKey = Netlify.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) {
    return json(
      {
        error:
          'ANTHROPIC_API_KEY not configured. Add it in Netlify dashboard → Site configuration → Environment variables.',
      },
      500
    );
  }

  // Trim content to keep prompt size reasonable
  const contentExcerpt = content.length > 10000 ? content.slice(0, 10000) : content;

  const prompt = `You are an SEO expert helping a pet care affiliate site, Pet-GoToPro. Generate SEO metadata for the following article.

ARTICLE TITLE: ${title}

ARTICLE CONTENT:
${contentExcerpt}

---

Generate SEO metadata. Respond with ONLY valid JSON in this exact format — no markdown code fences, no commentary before or after the JSON object:

{
  "metaTitle": "...",
  "metaDescription": "...",
  "primaryKeyword": "...",
  "suggestedH1": "...",
  "tags": ["...", "..."]
}

REQUIREMENTS:
- "metaTitle": 50-60 characters. Include the primary keyword early. Compelling and click-worthy. Don't repeat the brand name; Pet-GoToPro is appended automatically by the site.
- "metaDescription": 140-160 characters. Include the primary keyword. Summarize the article's value to the reader and create curiosity. Active voice.
- "primaryKeyword": The single most important search keyword this article should rank for. 2-5 words. Match how real users would search Google.
- "suggestedH1": A possibly-better article title optimized for SEO. Can match the input title if it's already good. Aim for compelling + keyword-rich.
- "tags": 5-10 lowercase kebab-case keyword tags (e.g., "cat-nutrition", "ragdoll-care", "wet-vs-dry-food"). Used for cross-linking related articles.

Return ONLY the JSON object. No other text.`;

  // Call Claude API
  let apiResponse;
  try {
    apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
  } catch (e) {
    return json({ error: 'Network error calling Anthropic API', details: e.message }, 502);
  }

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text();
    return json(
      {
        error: `Anthropic API returned ${apiResponse.status}`,
        details: errorText,
      },
      apiResponse.status
    );
  }

  // Parse Claude's response
  let claudeData;
  try {
    claudeData = await apiResponse.json();
  } catch (e) {
    return json({ error: 'Failed to parse Anthropic response' }, 502);
  }

  const responseText = claudeData?.content?.[0]?.text;
  if (!responseText) {
    return json({ error: 'Empty response from Anthropic', raw: claudeData }, 502);
  }

  // Strip any accidental markdown code fences, then parse JSON
  let suggestions;
  try {
    const cleaned = responseText.replace(/```json\s*|\s*```/g, '').trim();
    suggestions = JSON.parse(cleaned);
  } catch (e) {
    return json(
      {
        error: 'AI returned non-JSON output',
        raw: responseText,
        hint: 'Try clicking Generate again — Claude usually self-corrects on retry.',
      },
      502
    );
  }

  // Validate response shape
  const required = ['metaTitle', 'metaDescription', 'primaryKeyword', 'suggestedH1', 'tags'];
  const missing = required.filter((k) => !(k in suggestions));
  if (missing.length > 0) {
    return json({ error: `AI response missing fields: ${missing.join(', ')}`, raw: suggestions }, 502);
  }

  return json(suggestions, 200);
};

// ============================================================
// Helpers
// ============================================================

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}
