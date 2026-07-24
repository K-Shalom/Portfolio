export const initialArticles = [
  {
    id: 'art-1',
    title: 'Architecting Enterprise Backend Systems with Spring Boot & Spring Security',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    summary: 'A deep dive into role-based access control, JWT authentication, and relational database ORM optimization for mission-critical enterprise applications.',
    content: `Building scalable enterprise applications requires careful consideration of security, modularity, and database performance. In this article, I share my framework for structuring Spring Boot services with Spring Security, handling OAuth2/JWT tokens safely, and optimizing MySQL database indices for sub-millisecond query execution.

Key Topics Covered:
1. Enterprise Spring Boot Project Architecture & Package Organization
2. Implementing Granular Role-Based Access Control (RBAC) with Spring Security
3. Database ERD Design & High-Performance JDBC / JPA Mapping
4. Production Security Hardening & Rate Limiting Guidelines`,
    date: '2026-06-15',
    readTime: '6 min read',
    tags: ['Java', 'Spring Boot', 'Backend Architecture', 'Security'],
    author: 'Shalom Kubwimbabazi',
    link: '#',
    published: true,
  },
  {
    id: 'art-2',
    title: 'Bridging Hardware & Web: Building IoT Micro-Controllers with Arduino & Node.js',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    summary: 'Connecting embedded sensors and relay modules to web dashboards in real-time using serial protocols and WebSocket channels.',
    content: `Embedded systems development becomes immensely powerful when connected to modern web dashboards. By combining Arduino hardware sensors, relay actuators, and Node.js WebSocket gateways, we can build real-time monitoring platforms for smart agriculture, biometric attendance, and industrial automation.

Key Takeaways:
- Setting up Arduino Serial Communication & Non-Blocking Loops
- Building a Node.js WebSocket Gateway for Hardware Telemetry
- Designing High-Density Visual Dashboards in React
- Managing Power & Relay Actuation Safely`,
    date: '2026-05-20',
    readTime: '8 min read',
    tags: ['Arduino', 'IoT', 'Embedded Systems', 'Node.js', 'WebSockets'],
    author: 'Shalom Kubwimbabazi',
    link: '#',
    published: true,
  },
  {
    id: 'art-3',
    title: 'The Full-Stack Developer Roadmap in East Africa',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    summary: 'My journey and strategic advice for aspiring software engineers at Rwanda Polytechnic and across the continent mastering modern software paradigms.',
    content: `Software engineering in Rwanda and East Africa is experiencing an unprecedented revolution. From fintech to agricultural tech and smart governance, developers who master both enterprise backends (Java, PHP, Node) and responsive frontend frameworks (React, Tailwind) are driving transformation.

In this piece, I outline my personal learning roadmap, key projects to build, and technical habits that build long-term engineering excellence.`,
    date: '2026-04-10',
    readTime: '5 min read',
    tags: ['Career', 'Software Engineering', 'Rwanda Tech', 'Full-Stack'],
    author: 'Shalom Kubwimbabazi',
    link: '#',
    published: true,
  },
];

export const articles = initialArticles;
export default articles;
