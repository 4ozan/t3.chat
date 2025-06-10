if (!process.env.TOGETHER_API_KEY) {
  throw new Error('TOGETHER_API_KEY environment variable is not configured.');
}

export async function generateResponse(prompt: string) {
  try {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('No response from Together AI');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Together AI API error:', error);
    throw error;
  }
}
