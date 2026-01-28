export async function sendMsgToOpenRouter(message) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Chatbot"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 256
      })
    }
  );

  const data = await response.json();
  return data.choices[0].message.content;
}
