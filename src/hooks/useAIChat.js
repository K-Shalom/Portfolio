import { useState, useCallback } from 'react';

export function useAIChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hey! 👋 I\'m Shalom\'s AI Assistant. Ask me about his projects, skills, experience, or anything else!',
      timestamp: Date.now(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setError('API key not configured. Set VITE_OPENROUTER_API_KEY in .env');
      return;
    }

    // Add user message
    const newUserMsg = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Shalom K. Portfolio',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant for Shalom Kubwimbabazi's portfolio. Here is comprehensive information about Shalom:

## ABOUT SHALOM
- **Name**: Shalom Kubwimbabazi (Shalom K.)
- **Location**: Rwanda- Huye
- **Current Status**: Advanced IT Scholar at Rwanda Polytechnic – Karongi College
- **Status**: Available for Collaboration

## CORE COMPETENCIES
### Backend Systems
- Java (OOP, design patterns, enterprise architecture)
- Spring Boot & Spring Security (production-grade systems)

## ADDITIONAL CONTEXT
- Today's date is ${new Date().toLocaleDateString()}.
- Current time is ${new Date().toLocaleTimeString()}.

Please ensure all date-related responses are accurate based on this context.`,
            },
            ...messages
              .filter((m) => m.id !== 'welcome')
              .map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'API request failed');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I couldn\'t process that.';

      const newAssistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: assistantMessage,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newAssistantMsg]);
    } catch (err) {
      setError(err.message);
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hey! 👋 I\'m Shalom\'s AI Assistant. Ask me about his projects, skills, experience, or anything else!',
        timestamp: Date.now(),
      },
    ]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
}
