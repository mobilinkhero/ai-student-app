import { env } from "cloudflare:workers";
import { validateRequest } from "./v1/auth";

export async function GET({ request }) {
  const authError = validateRequest(request);
  if (authError) return authError;
  const apiKey = env.GROQ_API_KEY;
  const model = env.GROQ_MODEL || "llama-3.1-8b-instant";

  return new Response(JSON.stringify({ key: apiKey, model: model }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Add CORS headers so Flutter web/emulator can access it if needed
      "Access-Control-Allow-Origin": "*",
    },
  });
}
