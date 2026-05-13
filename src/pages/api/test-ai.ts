export async function GET({ request, locals }) {
  // Use locals.runtime.env for Cloudflare environment variables, fallback to import.meta.env
  const env = locals?.runtime?.env ?? import.meta.env;
  const apiKey = env.GROQ_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GROQ_API_KEY is not set in environment variables." }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Using a smaller model for a quick test
        messages: [
          { role: "user", content: "Hello! This is a test. Please reply only with the phrase 'AI is working!'" }
        ],
        max_tokens: 50
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: "Groq API error", status: response.status, details: errorText }), {
        status: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "AI connection successful", 
      aiResponse: data.choices[0].message.content 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error", details: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
