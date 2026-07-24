import { useState, useCallback } from 'react';

const SHALOM_KNOWLEDGE = `
Shalom Kubwimbabazi (commonly known as Shalom, Shalx, K-Shalom, or K__Shalom) is an Advanced IT Scholar at Rwanda Polytechnic – Karongi College based in Rwanda.
He is an Advanced Full-Stack Developer, Database Administrator, and Embedded Systems (IoT) Enthusiast.

--- BIOGRAPHY ---
- Name: Shalom Kubwimbabazi
- Aliases: Shalom, Shalx, K-Shalom, K__Shalom
- Education: Advanced IT Scholar, Rwanda Polytechnic – Karongi College
- Location: Rwanda
- Profile: A multi-disciplinary engineer who bridges modern full-stack web architectures with hardware and real-time embedded systems.

--- TECH STACK & COMPETENCY LEVELS ---
1. Enterprise Backend (70% - 80%):
   - Java (75%), Spring Boot (76%), Spring Security (72%), RESTful APIs (80%), PHP (80%), Node.js (72%), C/C++ (70%), JDBC (78%)
2. Frontend Core (75% - 90%):
   - React (75%), HTML5 (90%), CSS3 (88%), JavaScript (82%), Bootstrap (85%), Tailwind CSS (78%)
3. Embedded Systems & IoT (72% - 80%):
   - Arduino Wiring & C++ (78%), IoT Systems (72%), Sensors & Automation (75%), Wokwi Simulation (80%)
4. Databases & Modeling (72% - 85%):
   - MySQL (85%), Oracle DB (72%), ERD Modeling (80%), SQL Optimization (72%)
5. Workflow & Design (60% - 92%):
   - Git & GitHub (83%), VS Code (92%), Linux CLI (68%), GitHub Actions (60%), Figma & UI/UX Thinking (72%)

--- PORTFOLIO PROJECTS ---
1. Smart Small Business Management Web App (Featured)
   - Tech: Java, Spring Boot, Spring Security, MySQL, JSP, JDBC
   - Details: Advanced Spring architecture mapped over secure MySQL structures, featuring granular role-based access control (RBAC) and complex enterprise business workflows.
2. Smart Irrigation Monitoring System (Featured IoT)
   - Tech: Arduino Wiring, Sensors (Soil Moisture), Relay Modules, LCD, Servo Motor, C++
   - Details: Automated agricultural irrigation system utilizing sensor-driven relay controls and intelligent water distribution logic.
3. Smart Attendance System (Featured IoT)
   - Tech: Arduino, IoT, Fingerprint Sensor, C++, Embedded Systems
   - Details: Biometric school attendance infrastructure integrating fingerprint authentication, timetable synchronization, and automated session validation for Rwanda Polytechnic.
4. Local Chat App (Featured Real-Time)
   - Tech: React, Node.js, Socket.io, Oracle DB
   - Details: Real-time multi-user communication workspace utilizing dedicated WebSockets and secure Oracle database channels.
5. Task Management System (Featured Full-Stack)
   - Tech: Java, Spring Boot, React, REST APIs, MySQL
   - Details: Multi-tier enterprise productivity platform exposing Spring Boot endpoints to a responsive React frontend.
6. Green Vehicle Exchange Initiative (GVEI)
   - Tech: Java AWT, MySQL
   - Details: Contracted transportation platform evaluating eco-conscious vehicle exchange datasets and flows.
7. E-Portfolio System
   - Tech: PHP, MySQL, Bootstrap, JavaScript
   - Details: Academic portfolio ecosystem with custom authentication logic for performance tracking.
8. Library Management System
   - Tech: C++, File Handling, Data Structures
   - Details: Native C++ CLI program with sequential file handling for book cataloging and member borrowing.

--- CERTIFICATIONS ---
1. Advanced Full-Stack Engineering & Spring Boot Architecture (Verified)
   - Issuer: Rwanda Polytechnic - Karongi College (Issued: March 2026)
   - Credential ID: RP-KC-2026-FS001
   - Key Skills: Java, Spring Boot, Spring Security, RESTful API Design
2. Embedded Systems & IoT Hardware Engineering Specialist (Verified)
   - Issuer: Rwanda Tech Innovation Lab & Wokwi IoT (Issued: November 2025)
   - Credential ID: IOT-SPEC-8842
   - Key Skills: Arduino, Microcontrollers, Relay Control, Biometric Sensors
3. Relational Database Administration & ERD Systems (Verified)
   - Issuer: Oracle Academy / Rwanda Polytechnic (Issued: August 2025)
   - Credential ID: ORA-DB-99021
   - Key Skills: MySQL, Oracle DB, SQL Optimization, JDBC
4. Modern React & Interactive Frontend Engineering (Verified)
   - Issuer: OpenSource Community Rwanda (Issued: May 2025)
   - Credential ID: REACT-RW-3321
   - Key Skills: React, JavaScript (ES6+), Tailwind CSS, State Management

--- EVENTS & ACHIEVEMENTS ---
1. Rwanda Tech Innovation Summit & IoT Expo (Presenter & Hardware Demonstrator)
   - Date: May 18, 2026 | Organizer: Ministry of ICT & Innovation Rwanda
   - Highlights: Demonstrated the Smart Attendance Biometric IoT System and Smart Agricultural Irrigation Controller to regional tech leaders and advisors at Kigali Convention Centre.
2. Karongi Engineering & Developer Hackathon (Lead Architect & Full-Stack Developer)
   - Date: February 10, 2026 | Organizer: Rwanda Polytechnic
   - Award: 1st Place Innovation Award for rapid prototyping a Spring Boot + React student resource allocation platform in 24 hours.
3. East Africa Open Source Developer Conference (Panel Contributor & Attendee)
   - Date: November 4, 2025 | Organizer: East Africa Developer Network
   - Highlights: Microservice security workshops, Git workflow best practices, and open-source collaboration across Africa.

--- PUBLISHED ARTICLES ---
1. "Architecting Enterprise Backend Systems with Spring Boot & Spring Security"
   - Focus: Role-based access control (RBAC), JWT authentication, and relational database ORM optimization.
2. "Bridging Hardware & Web: Building IoT Micro-Controllers with Arduino & Node.js"
   - Focus: Connecting soil sensors, relay actuators, and Node.js WebSockets to custom React dashboards.
3. "The Full-Stack Developer Roadmap in East Africa"
   - Focus: Personal learning journey, engineering habits, and key regional tech paradigms (FinTech, Agritech, e-Gov).

--- CONTACT & INQUIRIES ---
- Email: shalomkubwimbabazi@gmail.com
- WhatsApp: +250 791 293 634
- GitHub: https://github.com/K-Shalom
- Availability: Open for software engineering roles, full-stack backend contracts, IoT prototyping collaborations, and custom database modeling.
`;

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

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

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

    if (!apiKey) {
      // Graceful local assistant fallback
      setTimeout(() => {
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
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.href : '',
          'X-Title': 'Shalom K. Portfolio',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant for Shalom Kubwimbabazi's portfolio. Here is context about Shalom:\n${SHALOM_KNOWLEDGE}`,
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
        const errData = await response.json().catch(() => ({}));
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
      console.warn('OpenRouter API request failed, falling back to local chat engine:', err);
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
