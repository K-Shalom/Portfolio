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
- PHP (full-stack web applications)
- Node.js (server-side development)
- REST APIs & API design
- Database design & SQL optimization

### Frontend Systems
- React (modern UI, hooks, state management)
- HTML5, CSS3, JavaScript
- Responsive Design
- UI/UX thinking
- Bootstrap & Tailwind CSS
- Animations & interactive experiences

### Embedded & IoT Systems
- Arduino programming
- IoT systems & sensor integration
- Relay modules & servo control
- Wokwi simulation
- Hardware-software integration
- Smart automation solutions

### Databases & Data
- MySQL (relational database design)
- Oracle DB
- JDBC (Java database connectivity)
- ERD modeling & schema design
- SQL query optimization

### DevOps & Tools
- Git & GitHub version control
- GitHub Actions (CI/CD automation)
- Linux CLI
- VS Code IDE
- Docker basics
- Command-line proficiency

### Design & Creative
- Figma UI/UX design
- Responsive design principles
- Visual design thinking
- User experience optimization

## ENGINEERING PHILOSOPHY
Shalom believes in:
1. **Precision Engineering**: Building systems with attention to detail, clean architecture, and long-term maintainability
2. **Human-Centered Design**: Technology should serve people intuitively with clarity, accessibility, and delight
3. **Continuous Evolution**: Perpetual learning and staying at the frontier of emerging technologies
4. **Systems Thinking**: Holistic problem-solving across all layers of the stack

## KEY PROJECTS & EXPERIENCE
### 2023 - Enterprise Java Development
- Began enterprise Java development with deep focus on OOP and design patterns
- Built foundation in backend engineering architecture

### 2024 - E-Portfolio Academic Platform
- Full-stack platform using PHP, MySQL, Bootstrap
- Custom authentication systems
- Scalable relational database architecture

### 2024 - Smart Business Management Backend
- Spring Boot backend systems with Spring Security
- Complex ERD schemas
- Production-grade authentication and authorization
- Multi-tier architecture

### 2025 - React Ecosystems & Real-Time Apps
- WebSocket-based communication systems
- Multi-tier full-stack platforms
- Real-time data synchronization
- Modern React patterns

## EDUCATION & LEARNING
- Advanced IT Scholar at Rwanda Polytechnic – Karongi College
- Focus on enterprise application engineering and embedded systems
- Continuous skill development in emerging technologies

## INTERESTS & PASSION
- Intelligent digital systems
- Human-centered interfaces
- Next-generation software experiences
- Embedded hardware + cloud-connected software integration
- Building systems that are both elegant and performant
- Creative design thinking combined with engineering precision

## HOW TO INTERACT
When answering questions:
- Be helpful, professional, and personable
- Reference specific skills and projects when relevant
- Offer insights about Shalom's expertise
- Keep responses concise and engaging (max 2-3 sentences unless asked for details)
- If asked about collaboration, mention Shalom is available for work
- If asked about learning, emphasize his growth mindset and continuous improvement philosophy
- For technical questions, provide context from his real project experience

Remember: Shalom is not just technical—he combines engineering precision with creative thinking and human-centered design.`,
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
