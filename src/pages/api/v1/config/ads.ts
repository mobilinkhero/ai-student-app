import type { APIRoute } from 'astro';
import { validateRequest } from '../auth';

export const GET: APIRoute = async ({ request }) => {
  // Security Check
  const authError = validateRequest(request);
  if (authError) return authError;

  const config = {
    // AdMob IDs — update anytime without app release
    ads: {
      banner:       'ca-app-pub-3940256099942544/9214589741',
      interstitial: 'ca-app-pub-3940256099942544/1033173712',
      rewarded:     'ca-app-pub-3940256099942544/5224354917',
      app_open:     'ca-app-pub-3940256099942544/9257395921',
    },
    // In-App Purchase — change subscription ID or price label anytime
    iap: {
      subscription_id:   'studymind_pro_monthly',  // must match Play Console product ID
      display_price:     '$4.99',                  // shown in UI (cosmetic only)
      display_period:    'month',
    },
    // Feature Toggles
    features: {
      essay_writer:    true,
      mind_map:        true,
      ai_chat:         true,
      premium_gating:  true,
    },
    min_app_version: '1.0.0',
    updated_at: new Date().toISOString(),
  };

  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-App-ID',
    },
  });
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-App-ID, Content-Type',
    },
  });
};
