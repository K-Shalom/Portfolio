import { apiRequest } from '../services/api';
import { useState, useCallback } from 'react';



export function useAIChat() {
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hey! 👋 I\'m Shalom\'s (Shalx) AI Assistant. Ask me about his projects, skills, experience, or anything else!',
      timestamp: Date.now(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLocalResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Name & Identity
    if (q.includes('shalx') || q.includes('who is') || q.includes('name') || q.includes('identity') || q.includes('shalom')) {
      return "Shalom Kubwimbabazi (known as Shalom, Shalx, K-Shalom, or K__Shalom) is an Advanced IT Scholar at Rwanda Polytechnic – Karongi College. He is a Full-Stack Developer, Database Administrator, and Embedded Systems (IoT) Enthusiast based in Rwanda!";
    }

    // 2. Contact & Hire
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach')) {
      return "You can reach Shalom (Shalx) directly via:\n\n" +
             "📧 Email: shalomkubwimbabazi@gmail.com\n" +
             "💬 WhatsApp: +250 791 293 634\n" +
             "🐙 GitHub: https://github.com/K-Shalom\n\n" +
             "He is open to software engineering roles, full-stack backend contracts, and IoT prototyping collaborations!";
    }

    // 3. Education
    if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('degree') || q.includes('school') || q.includes('polytechnic')) {
      return "Shalom is an Advanced IT Scholar at Rwanda Polytechnic – Karongi College. He holds verified qualifications and has been recognized for his outstanding academic and practical engineering achievements, including winning the 1st Place Innovation Award at the Karongi Developer Hackathon!";
    }

    // 4. Certificates
    if (q.includes('certificat') || q.includes('credential') || q.includes('certified')) {
      return "Shalom (Shalx) holds 4 verified certifications:\n\n" +
             "1. 🚀 **Advanced Full-Stack Engineering & Spring Boot Architecture** (Rwanda Polytechnic - Karongi College, 2026-03)\n" +
             "2. ⬢ **Embedded Systems & IoT Hardware Engineering Specialist** (Rwanda Tech Innovation Lab & Wokwi, 2025-11)\n" +
             "3. 🗄️ **Relational Database Administration & ERD Systems** (Oracle Academy / Rwanda Polytechnic, 2025-08)\n" +
             "4. 🎨 **Modern React & Interactive Frontend Engineering** (OpenSource Community Rwanda, 2025-05)";
    }

    // 5. Hackathon & Events
    if (q.includes('hackathon') || q.includes('event') || q.includes('summit') || q.includes('award') || q.includes('present') || q.includes('expo')) {
      return "Shalom is highly active in the East African tech scene:\n\n" +
             "🏆 **Karongi Hackathon (2026)**: Won 1st Place Innovation Award for rapid-prototyping an enterprise student resource allocation platform (Spring Boot + React) in 24 hours.\n\n" +
             "🎤 **Rwanda Tech Innovation Summit & IoT Expo (2026)**: Presented and live-demonstrated his Smart Biometric Attendance IoT System and Smart Agricultural Irrigation controller to regional leaders at the Kigali Convention Centre.\n\n" +
             "🔌 **East Africa Open Source Developer Conference (2025)**: Panel contributor on microservice security and open-source practices.";
    }

    // 6. Specific Irrigation IoT Project
    if (q.includes('irrigation') || q.includes('farm') || q.includes('agriculture') || q.includes('water')) {
      return "Shalom's **Smart Irrigation Monitoring System** is an automated agricultural IoT ecosystem. It uses soil moisture sensors, relay control modules, servo water gates, and LCD readouts to intelligently manage water distribution and automate precision agriculture. He demonstrated this system live at the Rwanda Tech Innovation Summit!";
    }

    // 7. Specific Attendance IoT Project
    if (q.includes('attendance') || q.includes('biometric') || q.includes('fingerprint') || q.includes('sensor')) {
      return "Shalom's **Smart Attendance System** is a biometric school attendance infrastructure. It integrates physical fingerprint scanners, automated timetable synchronization, and real-time database logging to streamline classroom attendance in Rwanda Polytechnic environments.";
    }

    // 8. Specific Business Project
    if (q.includes('business') || q.includes('enterprise') || q.includes('spring boot') || q.includes('spring security')) {
      return "Shalom engineered a **Smart Small Business Management Web App** using Spring Boot, Spring Security (RBAC), and relational MySQL. It features complex relational ERD schemas, dynamic indices, secure JWT session authentication, and automated workflows designed for production business workloads.";
    }

    // 9. Specific Chat Project
    if (q.includes('chat') || q.includes('websocket') || q.includes('socket')) {
      return "His **Local Chat App** is a real-time communications workspace. It utilizes active WebSocket channels managed through a Node.js gateway and backed by Oracle Database, serving a highly responsive React chat frontend.";
    }

    // 10. Articles
    if (q.includes('article') || q.includes('blog') || q.includes('write') || q.includes('published')) {
      return "Shalom has published 3 comprehensive tech articles:\n\n" +
             "1. **Architecting Enterprise Backend Systems with Spring Boot & Spring Security** (Covers JWT, RBAC, and database optimization)\n" +
             "2. **Bridging Hardware & Web: Building IoT Micro-Controllers with Arduino & Node.js** (Telemetry, serial loops, and WebSockets)\n" +
             "3. **The Full-Stack Developer Roadmap in East Africa** (Personal journey, learning strategies, and regional tech paradigms)";
    }

    // 11. General Skills & Tech
    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('language') || q.includes('java') || q.includes('php') || q.includes('react') || q.includes('database') || q.includes('mysql') || q.includes('oracle')) {
      return "Shalom's professional tech stack is divided into four main pillars:\n\n" +
             "• **Backend**: Java (Spring Boot, Spring Security, REST APIs, JDBC), PHP, Node.js, C/C++\n" +
             "• **Frontend**: React, JavaScript (ES6+), Tailwind CSS, Bootstrap, HTML5/CSS3\n" +
             "• **Databases**: MySQL, Oracle DB, relational ERD database modeling, and query optimization\n" +
             "• **Hardware & IoT**: Arduino, Wokwi IoT simulations, biometric/environmental sensors, and relay automation";
    }

    // 12. Default Fallback
    return "Shalom Kubwimbabazi (Shalx) is an Advanced IT Scholar at Rwanda Polytechnic – Karongi College. He is highly skilled in Spring Boot, React, Oracle DB/MySQL, and IoT/Arduino embedded automation.\n\n" +
           "Feel free to ask me specifics about his:\n" +
           "• 📁 **Featured Projects** (Business Web App, Smart Irrigation, Biometric Attendance, Chat App)\n" +
           "• 🎓 **Certifications** (Spring Boot, IoT Specialist, Oracle Database)\n" +
           "• 🏆 **Hackathons & Awards** (1st Place Hackathon, Presenting at Rwanda Tech Summit)\n" +
           "• ✍️ **Published Articles** (Backend Architecture, IoT Web Gateway, Tech Roadmap)\n" +
           "• 📧 **Contact details** to hire or collaborate!";
  };

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;



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
      const data = await apiRequest('/api/assistant', { method: 'POST', body: {
        message: userMessage.trim().slice(0, 1500),
        history: messages.filter(m => m.id !== 'welcome').slice(-6).map(m => ({ role: m.role, content: m.content.slice(0, 1500) })),
      } });
      const assistantMessage = data.content || 'Sorry, I could not process that.';

      const newAssistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: assistantMessage,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newAssistantMsg]);
    } catch (err) {
      void err;
      // Fallback response on error
      const assistantReply = generateLocalResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: assistantReply,
          timestamp: Date.now(),
        },
      ]);
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
