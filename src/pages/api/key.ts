import { env } from "cloudflare:workers";

export async function GET({ request }) {
  const apiKey = env.GROQ_API_KEY || "gsk_P19sW9c4tZ5K2y2eB6T2WGdyb3FYoR8A5M7Xj2q2Z5N4b9y3L";

  return new Response(JSON.stringify({ key: apiKey }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Add CORS headers so Flutter web/emulator can access it if needed
      "Access-Control-Allow-Origin": "*",
    },
  });
}
