import { env } from "cloudflare:workers";

/**
 * Validates that the request is coming from our official app.
 */
export function validateRequest(request: Request): Response | null {
  const appId = request.headers.get("X-App-ID");
  const expectedAppId = env.APP_ID || "studymind-pro-2026-secure-v1";

  if (appId !== expectedAppId) {
    return new Response(JSON.stringify({ 
      error: "Unauthorized", 
      message: "Invalid or missing X-App-ID header." 
    }), {
      status: 401,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      }
    });
  }
  return null;
}
