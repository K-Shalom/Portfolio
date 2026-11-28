# Portfolio V2 authoritative master specification

Approved scope: November 28, 2026. Future sessions must read this file, AGENTS.md, the plan, audit, progress, code review and content review. The final scope confirmation below resolves the missing-master-prompt blocker. Do not request that earlier prompt again.

Precedence: final scope confirmation > mandatory GitHub workflow > detailed design/RP specification > inspected existing inventory. Later explicit owner instructions override these documents. Historical source wording about missing prompts is superseded. GitHub commits, phase pushes, PRs and qualifying merges are authorized; production deployment is not. Future branches use portfolio-v2-phase-NN-description, avoiding the existing portfolio-v2 ref prefix conflict. Phase 0 remains portfolio-v2.

The complete supplied source texts follow, preserved to avoid losing individual project, skill, capstone, layout or workflow requirements. Content provenance/status verification is deferred to the relevant phase through CONTENT_REVIEW.md; it does not block Phase 0. Existing stored content is part of scope and must be preserved alongside these requirements.

---

# Portfolio V2 — Final Scope Confirmation and Phase 0 Authorization

Yes. Treat the existing repository inventory, previously supplied design requirements, RP Smart Attendance specification, GitHub workflow instructions and the additional information below as the complete authoritative scope.

You no longer need to request the previous master prompt.

This instruction resolves the outstanding Phase 0 requirements blocker.

## 1. Professional information

- Full name: Shalom Kubwimbabazi.

- Location: Rwanda.

- GitHub: https://github.com/K-Shalom

- Portfolio: https://shalomk.me

- Professional identity: Full-Stack Developer, UI/UX Designer and Multidisciplinary IT Professional.

- Institution: Rwanda Polytechnic – RP Karongi College.

- Program: Advanced Diploma in Information Technology.

- Academic level: Final year, Year 3.

- Expected completion: 2027.

- Leadership experience: Class Representative, academic coordination, student communication and team collaboration.

Do not describe me as a senior software engineer or claim qualifications I have not yet obtained.

## 2. Industrial attachment experience

Organization: Tajyire Training Center — TAJYIRE Electronics/Group.

Location: Kigali, Rwanda.

Period: May 4 to June 19, 2026.

Duration: Seven weeks.

Practical experience includes:

- Arduino programming.

- ESP32 microcontroller development.

- ESP32 motion counter with LCD.

- FC-28 soil moisture sensor integration.

- Relay control.

- Servo pump automation.

- RFID RC522 integration.

- SIM800L GSM and SMS communication.

- Smart parking gate automation.

- Node.js WebSocket server development.

- Real-time hardware communication.

- LCD 20x4 I2C integration.

- Arduino UNO and LCD integration.

- Servo-controlled gates.

- Sensor data collection.

- IoT system prototyping.

- Hardware and software troubleshooting.

Include this experience in the professional journey and Developer Lab where appropriate.

Use authentic internship photographs and project evidence where available.

## 3. Complete project inventory

Preserve the nine existing stored projects and any other authentic project records discovered in the repository.

Reconcile them with the following inventory. Update existing records rather than creating duplicates.

### Project 1 — RP Smart Attendance

Primary featured project.

An IoT-based biometric attendance management system designed for all eight Rwanda Polytechnic colleges.

Technologies:

- Laravel 13.

- PHP 8.4.

- PostgreSQL.

- Laravel Sanctum.

- React.

- Vite.

- Tailwind CSS.

- React Router.

- Recharts.

- Material UI icons.

- ESP32.

- R307/AS608 fingerprint sensor.

- Postman.

- Mailtrap.

Preserve the complete RP Smart Attendance specification already supplied, including the five user roles, timetable integration, attendance scoring, email notifications, CSV operations, dashboards and adjustable exam eligibility threshold.

My role: Sole developer.

Status: In progress — Final Year Capstone Project.

The backend and web dashboards are working. ESP32 hardware integration is the next stage.

Repositories:

- https://github.com/K-Shalom/rp-smart-attendance

- https://github.com/K-Shalom/rp-smart-attendance-frontend

### Project 2 — Menyesha System

A digital lost-and-found platform for identifiable items such as identity cards, passports and other documents with unique identifiers.

Features include lost and found reporting, automated matching, SMS notifications, agent-assisted reporting, USSD accessibility and finder rewards.

The proposed business model allocates 5% of the reward to platform operations and agent support.

Technologies: PHP, React, MySQL, REST API, SMS and USSD.

### Project 3 — OPTW: Online Players Transfer Window

A football player transfer management platform connecting administrators, football clubs and players.

Features include transfer offers, negotiations, transfer deadlines, analytics, fraud detection concepts and QR-enabled transfer certificates.

Technologies: Laravel, React, Material UI and PostgreSQL.

### Project 4 — MyIkibina

Full title: MyIkibina: Design and Evaluation of a Cash Contribution Verification and Dispute Resolution System for Ibimina in Huye District.

A financial management and contribution verification system for cash-based savings groups.

Features include member contribution confirmation, dispute reporting, two-officer correction approval, audit history, savings balances, loan information and repayment tracking.

Proposed access channels include web, Android and USSD.

The prototype may demonstrate USSD using a simulator.

### Project 5 — Chattova

A communication platform combining global internet-based messaging and local offline peer-to-peer communication.

Technologies and planned architecture:

- Flutter and Dart.

- Node.js.

- Express.js.

- Socket.IO.

- PostgreSQL.

- Redis.

- SQLite.

- WebRTC.

- MinIO/S3-compatible storage.

- mDNS and UDP discovery.

- Wi-Fi Direct and Bluetooth concepts.

Features include private messaging, group messaging, media sharing, voice notes, presence, typing indicators, device management, blocking and offline communication.

Distinguish implemented features from planned features.

### Project 6 — CungaAI

An AI-assisted credit scoring and financial management platform for Rwandan village savings groups.

Features include member registration, group management, loan tracking, repayment monitoring, credit risk scoring and USSD accessibility.

Proposed technologies include Node.js, Python, FastAPI, PostgreSQL/MySQL and machine learning model integration.

### Project 7 — Course Evaluation Survey System

A web-based educational platform for creating course evaluation surveys, collecting student feedback and analyzing responses.

Features include survey creation, question management, response collection and administrative reporting.

Uses PHP and MySQL. Verify the remaining technologies against the actual implementation.

### Project 8 — Smart LPG Gas Safety and Usage Prediction System

An IoT and AI-assisted gas monitoring concept.

Features include gas leakage detection, local alarms, cylinder weight monitoring, consumption tracking, remote notifications and estimated gas depletion dates.

Technologies include ESP32, MQ-2, load cell, HX711, buzzer and predictive analytics concepts.

Do not present this as a certified gas safety device.

### Project 9 — Library Management System

An object-oriented PHP academic project.

Features include books, authors, publishers, categories, members, librarians, loans, returns and fines.

Includes UML class diagrams and object-oriented software design.

### Project 10 — Laravel Student Management System

An academic CRUD application managing students and departments.

Technologies include Laravel, PHP, MySQL, Blade, Eloquent ORM and Laravel Breeze where implemented.

Demonstrates migrations, relationships, CRUD, validation, authentication and other Laravel database operations.

### Project 11 — Smart Parking System

An IoT parking gate automation project developed during industrial attachment.

Technologies include ESP32, servo motors, Node.js and WebSockets.

### Project 12 — Smart Small Business Management System

A business management system covering products, services, sales, expenses, customers and reports.

Technologies include Java, MVC and Spring Boot concepts.

### Project 13 — Automated Voting System

A PHP and MySQL-based digital voting system.

Verify the actual implementation and functionality.

### Project 14 — One Click Partition Creator

A Java desktop application concept designed to simplify Oracle Database partition management.

Technologies include Java, Oracle Database 21c and SQL.

### Project 15 — Smart Beehive Monitoring System

An IoT and AI-assisted beehive monitoring concept.

Proposed monitoring includes temperature, humidity, sound, vibration, movement and weight, with anomaly detection and a web dashboard.

### Project 16 — Visitors Management System

A digital visitor management concept supporting visitor registration, check-in, check-out and visitor records.

### Project 17 — E-commerce and WhatsApp Ordering Website

A lightweight e-commerce website allowing customers to browse products and initiate orders through WhatsApp.

### Project 18 — Stemma Worship Team Website

Website and branding work involving responsive navigation, administrative interface design, logo redesign and light/dark mode assets.

Verify available implementation evidence.

### Project 19 — Personal Portfolio V2

The existing portfolio renovation itself should eventually become a professional case study.

Website: https://shalomk.me

Repository: https://github.com/K-Shalom/Portfolio

Technologies include React, Vite, Tailwind CSS, Material UI, Node.js, Express.js, Render, Resend and OpenRouter where verified.

Document the completed renovation, architecture improvements, security improvements and design decisions.

## 4. Complete technical skills inventory

Organize my technical knowledge into meaningful categories.

Do not use arbitrary percentage-based skill ratings.

Use classifications such as Practical Experience, Familiar and Currently Learning.

Where proficiency is uncertain, mark it for later confirmation rather than inventing expertise.

### Programming languages

- JavaScript.

- PHP.

- Java.

- Python.

- SQL.

- Dart.

- HTML.

- CSS.

- C/C++ for embedded development.

### Frontend development

- React.

- Vite.

- Tailwind CSS.

- Material UI.

- React Router.

- Recharts.

- HTML5.

- CSS3.

- Responsive web design.

- DOM manipulation.

- AJAX.

- XMLHttpRequest.

- JSON.

- XML.

- API integration.

- Component-based development.

- State management.

- Light and dark theme development.

### Backend development

- PHP.

- Object-oriented PHP.

- Laravel.

- Laravel Eloquent.

- Laravel migrations.

- Laravel relationships.

- Laravel Tinker.

- Laravel Blade.

- Laravel Breeze.

- Laravel Sanctum.

- CRUD operations.

- Mass assignment.

- Validation.

- File uploads.

- Sessions.

- Soft deletion and restoration.

- Node.js.

- Express.js.

- Java Servlets.

- JSP.

- JSTL.

- Spring MVC.

- Spring Boot concepts.

- Python.

- FastAPI concepts.

- REST API development.

- MVC architecture.

- Authentication.

- Authorization.

- Role-based access control.

- Multi-college and scoped data architecture.

### Database management

- MySQL.

- PostgreSQL.

- Oracle Database.

- SQLite.

- Redis.

- Firebase concepts.

- SQL queries.

- Database normalization.

- Entity Relationship Diagrams.

- Relational database design.

- Database relationships.

- Constraints.

- Indexing.

- Transactions.

- Database migrations.

- Data import and export.

- Database backup and restoration.

- Oracle partitioning concepts.

### Software engineering

- Object-oriented programming.

- Encapsulation.

- Abstraction.

- Inheritance.

- Polymorphism.

- MVC architecture.

- Modular architecture.

- Software development life cycle.

- Requirements analysis.

- System analysis and design.

- UML.

- Use case diagrams.

- Class diagrams.

- System architecture diagrams.

- API documentation.

- Software testing.

- Debugging.

- Error handling.

- Technical documentation.

- Version control.

- Software maintenance.

- Design thinking.

### Networking

- Cisco Packet Tracer.

- Cisco Packet Tracer Builder scripting.

- IPv4 addressing.

- Subnetting.

- Network topology design.

- Routing.

- Switching.

- VLANs.

- Trunking.

- DHCP.

- DNS.

- NAT.

- PAT.

- Standard and extended ACLs.

- AAA.

- TACACS+.

- RADIUS.

- IPsec VPN.

- Cisco ASA firewalls.

- Network troubleshooting.

- Windows Server.

- Zabbix.

- Network monitoring.

- LAN configuration.

- WAN concepts.

### Cybersecurity

- Authentication and authorization.

- Role-based access control.

- API security.

- Password hashing.

- Cryptography fundamentals.

- Cryptanalysis fundamentals.

- Symmetric encryption.

- Asymmetric encryption.

- Hashing.

- Digital signatures.

- Public Key Infrastructure.

- HTTPS.

- TLS.

- Firewall configuration.

- Network access control.

- VPN security.

- Secure session management.

- Dependency vulnerability auditing.

- Input validation.

- SQL injection prevention.

- XSS prevention.

- CSRF protection.

- Rate limiting.

- Data privacy fundamentals.

### IoT and embedded systems

- Arduino.

- ESP32.

- Arduino IDE.

- Embedded programming.

- GPIO.

- Sensor integration.

- RFID RC522.

- R307 fingerprint sensor.

- AS608 fingerprint sensor.

- SIM800L GSM.

- MQ-2 gas sensor.

- FC-28 soil moisture sensor.

- HX711.

- Load cells.

- PIR motion sensors.

- LCD displays.

- I2C communication.

- Servo motors.

- Relay modules.

- Buzzers.

- Automated control systems.

- IoT monitoring dashboards.

- Sensor data collection.

- WebSocket communication.

- Hardware-to-API integration.

### Mobile development and telecommunications

- Flutter.

- Dart.

- Android application concepts.

- USSD application development.

- USSD menu design.

- Session-based USSD navigation.

- SMS integration.

- GSM communication.

- WebRTC.

- Peer-to-peer communication.

- Offline communication concepts.

- Real-time messaging.

- Socket.IO.

- WebSockets.

### Artificial intelligence and machine learning

- AI API integration.

- OpenRouter.

- AI-assisted application development.

- Prompt engineering.

- Machine learning fundamentals.

- Credit risk scoring concepts.

- Predictive analytics concepts.

- Linear regression concepts.

- Time-series forecasting concepts.

- Python-based AI services.

- FastAPI model deployment concepts.

Do not claim production machine learning expertise without evidence.

### UI/UX and visual design

- Figma.

- Wireframing.

- Prototyping.

- User interface design.

- User experience design.

- Design systems.

- Responsive layouts.

- Typography.

- Color theory.

- Visual hierarchy.

- User-centered design.

- Dashboard design.

- Mobile interface design.

- Accessibility.

- Branding.

- Logo design.

- Light and dark mode design.

- Design thinking.

### Development and deployment tools

- Git.

- GitHub.

- GitHub SSH authentication.

- Visual Studio Code.

- Codex.

- Composer.

- npm.

- Postman.

- Mailtrap.

- Render.

- Linux.

- Deepin Linux.

- Windows.

- XAMPP.

- Apache.

- PHP development server.

- Browser developer tools.

- Environment variable configuration.

- Deployment workflows.

- Dependency auditing.

### Business, research and professional knowledge

- Business Model Canvas.

- Design thinking.

- Research methodology.

- Project planning.

- Business monitoring and evaluation.

- Business auditing fundamentals.

- Key performance indicators.

- Technical report writing.

- Professional communication.

- Team collaboration.

- Academic leadership.

- Project presentation.

- Problem-solving.

- Innovation.

- Entrepreneurship.

## 5. Developer Lab requirements

Create a dedicated Developer Lab section during the appropriate implementation phase.

Use this section to showcase practical work that does not require a full software project case study.

Include categories for:

- Networking and Cisco Packet Tracer labs.

- Cisco ASA firewall configuration.

- AAA, TACACS+ and RADIUS.

- ACLs and IPsec VPN.

- Windows Server and Zabbix.

- Arduino and ESP32 experiments.

- RFID and GSM communication.

- Sensors and hardware automation.

- Laravel practical exercises.

- PHP object-oriented programming.

- USSD application development.

- Java Servlet and JSP exercises.

- Python programming exercises.

- SQL and Oracle database experiments.

- AJAX and REST API experiments.

- UI/UX design and branding.

Support authentic screenshots, code snippets, technical explanations, repository links, challenges and lessons learned.

## 6. Content accuracy and project status

The inventory above includes completed academic work, ongoing software projects, prototypes and proposed concepts.

Do not classify every project as completed.

Use the existing repository, available project repositories and authentic evidence to verify statuses.

Where information is missing:

- Preserve the project as a draft where appropriate.

- Record missing information in CONTENT_REVIEW.md.

- Request confirmation during the relevant content implementation phase.

- Never fabricate screenshots, deployments, users, achievements or technical capabilities.

Missing screenshots or unverified project details must not prevent Phase 0 completion.

They should become tracked content verification tasks for later phases.

## 7. Design requirements

Preserve the previously agreed electric indigo visual identity.

Primary accent: #6366F1.

Secondary accent: #818CF8.

Dark background: #0B0D12.

Light background: #F8FAFC.

Avoid monolithic visual design.

Use distinct layouts for the homepage, featured projects, project case studies, skills, professional journey, Developer Lab, articles and certifications.

Avoid repetitive card grids, excessive glassmorphism, unnecessary gradients and generic AI-generated website patterns.

Maintain modular frontend and backend architecture without introducing unnecessary microservices.

This is a renovation of the existing application, not a new application.

## 8. Functional scope

Preserve and improve:

- Homepage.

- About page.

- Project showcase.

- Project case studies.

- Project filters and search.

- Multiple repository links.

- Skills.

- Professional journey.

- Education.

- Industrial attachment.

- Certifications.

- Events.

- Articles.

- Developer Lab.

- Contact form.

- CV access.

- Light, dark and system themes.

- Existing AI portfolio assistant.

- Existing admin dashboard.

- Global search.

- Command palette.

- GitHub integration where beneficial.

- SEO.

- Accessibility.

- Performance.

- Security.

- Data persistence.

- Technical documentation.

All major content must be manageable through the existing admin dashboard.

Preserve authentic existing content and functionality.

## 9. Implementation phases

Retain the existing 13-phase implementation plan:

- Phase 0: Repository inspection and baseline.

- Phase 1: Critical security improvements.

- Phase 2: Modular architecture and data persistence.

- Phase 3: Indigo design system and global layout.

- Phase 4: Homepage renovation.

- Phase 5: Projects and professional case studies.

- Phase 6: Professional profile, skills and journey.

- Phase 7: Developer Lab and articles.

- Phase 8: Admin dashboard renovation.

- Phase 9: AI assistant and advanced features.

- Phase 10: SEO, accessibility and performance.

- Phase 11: Comprehensive testing.

- Phase 12: Documentation and deployment readiness.

Develop each phase independently and sequentially.

Do not implement the entire renovation at once.

## 10. Permanent documentation

Create or update:

- AGENTS.md

- PORTFOLIO_MASTER_SPEC.md

- PORTFOLIO_AUDIT.md

- IMPLEMENTATION_PLAN.md

- PROGRESS.md

- CODE_REVIEW.md

- CONTENT_REVIEW.md

Store the complete authoritative requirements in PORTFOLIO_MASTER_SPEC.md, including the previously supplied RP Smart Attendance specification and design requirements.

Future Codex sessions must use these repository files instead of relying on conversation history.

## 11. Mandatory GitHub workflow

At the end of every implementation phase:

1. Verify phase acceptance criteria.
2. Run relevant tests, linting and production builds.
3. Perform a comprehensive code review.
4. Record findings in CODE_REVIEW.md.
5. Resolve blocking findings.
6. Re-run affected tests.
7. Update progress documentation.
8. Review the final Git diff.
9. Commit the completed phase.
10. Push the phase branch to GitHub.
11. Create a pull request.
12. Review the pull request.
13. Resolve blocking review findings.
14. Verify required CI checks and approvals.
15. Merge the pull request when all conditions are satisfied.
16. Synchronize the local default branch.
17. Provide a phase completion report.

Use a separate branch for each future phase.

Use branch names such as portfolio-v2-phase-01-security and portfolio-v2-phase-02-architecture.

Avoid branch naming conflicts with the existing portfolio-v2 branch.

For Phase 0, continue using the existing portfolio-v2 branch.

Do not bypass branch protection or fabricate approvals.

If an independent reviewer is unavailable, clearly distinguish your own code review from independent approval.

If merging triggers automatic production deployment, report that dependency and obtain authorization before triggering the deployment.

## 12. Finalize Phase 0 now

The requirements blocker is resolved.

You are authorized to treat this document and the previously supplied detailed RP Smart Attendance, design and workflow specifications as the complete scope.

Do not request the original master prompt again.

Proceed with the following:

- Reconcile the complete project inventory.

- Reconcile the complete skills inventory.

- Add education and industrial attachment requirements.

- Finalize PORTFOLIO_MASTER_SPEC.md.

- Finalize IMPLEMENTATION_PLAN.md.

- Update AGENTS.md.

- Update PORTFOLIO_AUDIT.md.

- Update PROGRESS.md.

- Update CODE_REVIEW.md.

- Create CONTENT_REVIEW.md.

- Preserve actual baseline test results.

- Perform a documentation review.

- Resolve inconsistencies.

- Verify Phase 0 acceptance criteria.

- Mark Phase 0 implementation as completed when verified.

- Commit the documentation.

- Push the branch.

- Create the pull request.

- Review the pull request.

- Merge when required conditions are satisfied.

- Synchronize the local repository.

- Provide the final Phase 0 report.

Do not restart the repository audit unnecessarily.

Do not modify application source code unnecessarily during Phase 0.

Do not begin Phase 1 until I authorize it.

Proceed now.

---

# Detailed design and RP Smart Attendance specification

# Portfolio V2 — Updated Design and Project Requirements

Update the previous Portfolio V2 renovation instructions according to the following requirements. All previous security, functionality, performance, accessibility, documentation and deployment requirements remain applicable.

## 1. Updated brand identity

Remove the previously proposed green accent color from the portfolio design system.

Use a premium indigo-based visual identity.

### Dark theme

- Main background: #0B0D12

- Secondary surface: #151821

- Elevated surface: #1E2230

- Primary accent: #6366F1

- Secondary accent: #818CF8

- Primary text: #F8FAFC

- Secondary text: #94A3B8

- Borders: #2D3342

### Light theme

- Main background: #F8FAFC

- Secondary surface: #FFFFFF

- Primary accent: #4F46E5

- Secondary accent: #6366F1

- Primary text: #0F172A

- Secondary text: #64748B

- Borders: #E2E8F0

Use semantic colors for success, warning, error and informational states. Green may be used for functional success indicators but must not be the primary brand accent.

Use CSS variables and centralized design tokens. Do not hardcode colors repeatedly throughout components.

Suggested typography:

- Headings: Space Grotesk or Manrope.

- Body: Inter.

- Technical information: JetBrains Mono.

Choose the final combination based on readability, visual quality and the existing brand.

## 2. Avoid monolithic visual design

The portfolio must not look like a single repetitive template where every section uses the same cards, containers, spacing and layout.

Create a cohesive but visually diverse experience.

Each major section should have a distinct visual composition:

- Homepage: Asymmetrical editorial layout.

- Featured projects: Large product showcases with alternating image and text arrangements.

- All projects: Filterable, responsive project gallery.

- Project details: Professional case-study layouts.

- Skills: Modular bento grid.

- About: Editorial storytelling layout.

- Professional journey: Vertical timeline.

- Developer Lab: Experimental gallery.

- Articles: Digital magazine layout.

- Certifications: Clean credential gallery.

- Contact: Minimal, welcoming and functional layout.

Maintain consistent typography, spacing tokens, colors, interaction patterns and navigation across these different layouts.

Avoid:

- Repetitive three-column card grids everywhere.

- Identical section structures.

- Excessive rounded containers.

- Putting every element inside a card.

- Excessive glassmorphism.

- Excessive gradients and glowing effects.

- Generic AI-generated visual patterns.

- Unnecessary decorative icons.

- Fake dashboard statistics.

- Excessive technology badges.

- Large amounts of empty space without purpose.

Use visual rhythm, typography, alignment, composition and meaningful whitespace to create a premium experience.

The website should feel like a custom-designed professional portfolio rather than a downloaded template.

## 3. Avoid monolithic software architecture

Do not implement the entire frontend in App.jsx or the entire backend in server.js.

Use a modular, feature-based architecture while preserving the existing technology stack.

Suggested frontend structure:

```text
src/
├── app/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
│   ├── home/
│   ├── about/
│   ├── projects/
│   ├── skills/
│   ├── journey/
│   ├── articles/
│   ├── certificates/
│   ├── events/
│   ├── lab/
│   ├── contact/
│   ├── assistant/
│   └── admin/
├── hooks/
├── services/
├── contexts/
├── config/
├── styles/
├── utils/
└── routes/
```

Suggested backend structure:

```text
backend/
├── src/
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── articles/
│   │   ├── certificates/
│   │   ├── events/
│   │   ├── profile/
│   │   ├── skills/
│   │   ├── lab/
│   │   ├── contact/
│   │   └── assistant/
│   ├── middleware/
│   ├── database/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
└── tests/
```

Adapt these structures to the actual existing repository.

Requirements:

- Separation of concerns.

- Reusable UI components.

- Feature-specific business logic.

- Centralized API communication.

- Independent feature modules.

- Consistent error handling.

- Centralized configuration.

- Maintainable routing.

- Shared authentication middleware.

- Lazy-loaded feature routes where beneficial.

- Minimal coupling between unrelated modules.

Do not introduce microservices or micro-frontends unnecessarily. A well-structured modular application is sufficient for this portfolio.

## 4. Add a new primary featured project

### Project name

RP Smart Attendance

### Suggested slug

rp-smart-attendance

### Category

IoT, Education Technology, Full-Stack Development and Biometric Systems.

### One-line summary

An IoT-based biometric attendance management system for Rwanda Polytechnic that records student attendance through ESP32 fingerprint scanners and connects attendance records to academic timetables.

### Full description

RP Smart Attendance replaces manual, lecturer-led attendance marking with an automated fingerprint-based system designed for all eight Rwanda Polytechnic colleges.

When a student scans their fingerprint at an ESP32 device installed in a classroom, the backend identifies the room, matches the current time to the appropriate timetable slot and records attendance automatically.

The system aims to reduce lecturer bias, proxy attendance and attendance-recording errors associated with students arriving late or not hearing their names called.

Instead of recording attendance only as present or absent, the system assigns a percentage score to each academic session.

Attendance scoring:

- 0%: Absent.

- 50%: Check-in only.

- 95%: Late or excused.

- 100%: Full check-in and check-out.

The system tracks cumulative attendance per student and course and applies an adjustable exam eligibility threshold, with 80% as the default.

### Problem statement

Traditional attendance recording can be time-consuming, inconsistent and vulnerable to human error or proxy attendance.

Manual records also make it difficult to monitor cumulative attendance, identify at-risk students and determine exam eligibility efficiently.

### Proposed solution

A centralized, multi-college attendance management platform combining biometric authentication, IoT devices, academic timetable integration, automated scoring, reporting and role-based dashboards.

### Key features

- Fingerprint check-in and check-out API.

- Timetable-aware attendance recording.

- Duplicate attendance protection.

- Percentage-based attendance scoring.

- Automated exam eligibility calculation.

- Adjustable eligibility threshold.

- Check-in confirmation emails.

- Checkout reminder emails.

- Low-attendance warnings.

- Weekly attendance reports.

- Multi-college data management.

- College-scoped authorization.

- College, department and program management.

- Course and classroom management.

- ESP32 device management.

- Academic timetable management.

- Attendance trend charts.

- At-risk student identification.

- Filterable reports.

- CSV report export.

- Bulk student import through CSV.

- Responsive dashboards.

- Device-aware light and dark themes.

- Tabbed settings interface.

### User roles

The system supports five roles:

1. Super Admin: Centralized system administration across colleges.
2. Quality Assurance: College-scoped attendance monitoring and reporting.
3. HOD: Department-level academic and attendance management.
4. Lecturer: Course-related attendance monitoring.
5. Student: Personal attendance records and exam eligibility information.

### Technology stack

Backend:

- Laravel 13.

- PHP 8.4.

- PostgreSQL.

- Laravel Sanctum.

- REST API.

Frontend:

- React.

- Vite.

- Tailwind CSS.

- React Router.

- Recharts.

- Material UI icons.

Hardware:

- ESP32 microcontroller.

- R307 or AS608 fingerprint sensor.

Development tools:

- Postman.

- Mailtrap.

- Git.

- GitHub.

### My contribution

I am the sole developer of RP Smart Attendance.

I designed the database schema and backend API, developed the role-based React frontend, implemented the web dashboards and am currently integrating the ESP32 fingerprint hardware.

### Current project status

In progress — Final Year Capstone Project.

The backend and web dashboards are working.

ESP32 hardware integration is the next development stage.

Do not claim that the biometric hardware is already fully integrated, that the system is deployed across Rwanda Polytechnic or that all eight colleges currently use it.

### Repository links

Backend:

https://github.com/K-Shalom/rp-smart-attendance

Frontend:

https://github.com/K-Shalom/rp-smart-attendance-frontend

Support multiple repository links within a single project record.

Display separate Backend Repository and Frontend Repository actions on the project details page.

Do not invent a live demo URL.

## 5. RP Smart Attendance case study

Create a dedicated, premium project case-study page containing:

- Project overview.

- Problem statement.

- Proposed solution.

- Target users.

- System architecture.

- Attendance workflow.

- Attendance scoring model.

- User roles and permissions.

- Multi-college architecture.

- Technology stack.

- Database architecture.

- Actual system screenshots.

- My contribution.

- Development challenges.

- Current implementation status.

- Future improvements.

- Repository links.

### Architecture visualization

Create a responsive architecture diagram representing the planned system:

```text
Student Fingerprint
        |
        v
Fingerprint Sensor
        |
        v
ESP32 Microcontroller
        |
        v
Laravel REST API
        |
        +-- Device and Room Identification
        +-- Timetable Matching
        +-- Attendance Scoring
        +-- Duplicate Protection
        +-- Exam Eligibility
        +-- Email Notifications
        |
        v
PostgreSQL Database
        |
        v
React Web Dashboards
```

Clearly distinguish working software components from hardware integration that is still in progress.

### Attendance scoring visualization

Create a clean visual representation of the four attendance scores:

- Absent: 0%.

- Check-in only: 50%.

- Late or excused: 95%.

- Full attendance: 100%.

Explain the default 80% exam eligibility threshold.

### Privacy and security

Because the project involves biometric information, include a responsible discussion of biometric data protection, device authentication, role-based authorization, college-level data isolation and privacy considerations.

Only describe security controls as implemented if they are verified in the actual project.

Never publish real student information, fingerprint templates, authentication credentials or private attendance records in portfolio screenshots.

### Screenshot gallery

Prepare image slots for actual screenshots of:

- Super Admin dashboard.

- Quality Assurance dashboard.

- HOD dashboard.

- Lecturer dashboard.

- Student dashboard.

- Attendance reports.

- Timetable management.

- ESP32 device management.

- Student management.

- Settings.

- Hardware prototype when available.

Use existing authentic screenshots where available.

If screenshots are missing, provide clearly labeled placeholders that can be replaced through the CMS.

Do not generate fake application screenshots and present them as the actual system.

## 6. Update the project management data model

Extend the existing project data model where necessary to support:

- Multiple repository links.

- Project category.

- Featured status.

- Featured display order.

- Project status.

- Project type.

- My role.

- Development progress.

- Problem statement.

- Solution.

- Architecture.

- Key features.

- Technology groups.

- Screenshot galleries.

- Hardware components.

- Challenges.

- Future improvements.

- Optional live demo.

- Optional documentation links.

- SEO metadata.

Preserve existing project records and maintain backward compatibility.

All fields must be manageable through the existing admin dashboard.

## 7. Update featured project ordering

Use the following suggested featured project order:

1. RP Smart Attendance.
2. Menyesha System.
3. OPTW — Online Players Transfer Window.
4. MyIkibina.
5. Chattova.
6. CungaAI.

Allow the administrator to change the ordering.

Preserve all other existing projects.

Avoid duplicating RP Smart Attendance under an older generic Smart Attendance System entry. Inspect the existing content and merge records only if they represent the same project.

## 8. Update the professional profile

Ensure the professional profile reflects my multidisciplinary technical capabilities.

Highlight:

- Full-stack software development.

- UI/UX design.

- REST API architecture.

- Laravel and React development.

- Database design.

- PostgreSQL and MySQL.

- Multi-tenant application concepts.

- Role-based access control.

- IoT and embedded systems.

- ESP32 integration.

- Biometric system development.

- Networking.

- USSD development.

- Technical problem-solving.

Do not describe me as an expert in every listed technology. Accurately distinguish practical experience, familiar technologies and skills currently being developed.

## 9. Final implementation requirements

Apply these updated requirements to the previous master renovation plan.

Before implementing:

1. Inspect the cloned repository.
2. Review the existing frontend and backend architecture.
3. Run the current application.
4. Identify existing reusable components.
5. Update PORTFOLIO_AUDIT.md.
6. Update IMPLEMENTATION_PLAN.md.
7. Establish the new indigo design system.
8. Address critical security issues.
9. Implement the modular renovation.
10. Add RP Smart Attendance as the primary featured project.
11. Test all affected functionality.

Do not remove working features or overwrite existing content unnecessarily.

Do not deploy or push changes without approval.

The final portfolio must have a distinctive, non-monolithic visual design, modular software architecture, strong professional storytelling, secure administration and authentic project case studies.

The objective is to create a portfolio that represents me as a multidisciplinary software developer capable of designing and building practical digital systems, not simply as someone who knows several programming languages.

---

# Mandatory phase delivery workflow specification

# Portfolio V2 — Finalize Phase 0 and Update Development Workflow

Thank you for completing the initial repository inspection and creating the required documentation files.

I have now provided the original Portfolio V2 master prompt. Treat it as the authoritative source of renovation requirements.

The instructions below override the previous restrictions concerning Git commits, pushes, pull requests and merges.

## 1. Finalize Phase 0

Read and reconcile:

- The original Portfolio V2 master prompt.

- AGENTS.md.

- PORTFOLIO_AUDIT.md.

- IMPLEMENTATION_PLAN.md.

- PROGRESS.md.

Update the documentation to include every requirement from the master prompt.

Ensure nothing important is missing, especially:

- Complete project inventory.

- RP Smart Attendance as the primary featured project.

- Technical skills and knowledge.

- Education and industrial attachment.

- Developer Lab.

- Professional journey.

- Indigo visual identity.

- Non-monolithic visual design.

- Modular software architecture.

- Security improvements.

- Admin dashboard.

- AI assistant.

- SEO, accessibility and performance.

- All 13 implementation phases.

Preserve the nine existing stored projects and all other authentic content.

Do not create duplicate project records.

## 2. Address baseline findings

Preserve the actual audit findings:

- Production build passed.

- Lint failed with three existing errors in Timeline.jsx.

- Local homepage, health endpoint and four collection endpoints returned HTTP 200.

- No automated test suite was found.

- Offline dependency audit reported zero advisories but was cache-limited.

- Documentation validation passed.

Do not describe the application as fully secure or fully tested.

Assign each identified issue to the appropriate implementation phase.

The existing lint errors must be tracked and resolved during the appropriate phase.

Do not unnecessarily modify application source code during Phase 0.

## 3. Mandatory GitHub workflow for all phases

From now on, every completed implementation phase must follow the workflow below.

Update AGENTS.md, IMPLEMENTATION_PLAN.md and PROGRESS.md to permanently include these instructions.

### Step 1 — Prepare the branch

Before starting a new phase:

- Check Git status.

- Verify the remote repository.

- Fetch the latest remote changes.

- Synchronize the local main branch.

- Preserve unrelated local changes.

- Create a dedicated branch for the phase.

Use meaningful branch names.

Suggested branch names:

- portfolio-v2/phase-01-security

- portfolio-v2/phase-02-architecture

- portfolio-v2/phase-03-design-system

- portfolio-v2/phase-04-homepage

- portfolio-v2/phase-05-projects

- portfolio-v2/phase-06-profile-skills

- portfolio-v2/phase-07-developer-lab

- portfolio-v2/phase-08-admin-dashboard

- portfolio-v2/phase-09-advanced-features

- portfolio-v2/phase-10-optimization

- portfolio-v2/phase-11-testing

- portfolio-v2/phase-12-documentation

For Phase 0, use the existing portfolio-v2 branch because the audit and documentation work is already located there.

Verify the repository's actual default branch instead of assuming its name is main.

### Step 2 — Implement the phase

- Read the phase requirements.

- Review its acceptance criteria.

- Implement actual changes.

- Preserve existing working functionality.

- Avoid unrelated modifications.

- Update relevant documentation.

- Maintain modular architecture.

### Step 3 — Perform automated verification

Run all relevant available checks:

- Linting.

- Production build.

- Unit tests.

- Integration tests.

- Security tests.

- API tests.

- Browser tests.

- Responsive design tests.

- Accessibility checks.

Where a test suite does not exist, document the limitation and introduce appropriate tests during the relevant implementation phase.

Distinguish pre-existing failures from newly introduced regressions.

Never fabricate successful test results.

### Step 4 — Perform mandatory code review

Before committing and pushing, perform a dedicated review of the complete phase diff.

Review the changes as a senior software engineer.

Inspect:

- Functional correctness.

- Security vulnerabilities.

- Authentication.

- Authorization.

- Data privacy.

- Error handling.

- Input validation.

- Architecture.

- Code readability.

- Maintainability.

- Reusability.

- Duplicate code.

- Performance.

- Accessibility.

- Responsive behavior.

- Dependency changes.

- Test coverage.

- Documentation accuracy.

- Potential regressions.

- Accidentally exposed credentials.

For documentation-only phases, review the documentation for completeness, accuracy and consistency.

Classify findings as:

- Critical.

- High.

- Medium.

- Low.

- Informational.

Fix all blocking findings before continuing.

Re-run affected tests after applying fixes.

Create or update CODE_REVIEW.md with:

- Phase reviewed.

- Files reviewed.

- Findings.

- Severity.

- Recommended fixes.

- Applied fixes.

- Remaining concerns.

- Verification results.

- Final review outcome.

Do not treat your own review as an independent human approval.

### Step 5 — Commit the completed phase

After successful implementation and review:

- Inspect the final Git diff.

- Verify that unrelated changes are excluded.

- Verify that no credentials are committed.

- Stage only relevant files.

- Create a meaningful conventional commit.

Suggested commit messages:

- docs: complete portfolio v2 baseline audit

- fix: secure portfolio authentication and admin APIs

- refactor: modularize portfolio architecture

- feat: introduce indigo design system

- feat: redesign portfolio homepage

- feat: expand projects and RP Smart Attendance case study

- feat: update professional profile and technical skills

- feat: introduce developer lab

- feat: renovate admin dashboard

- feat: improve AI assistant and advanced features

- perf: improve SEO accessibility and performance

- test: verify portfolio functionality

- docs: prepare portfolio v2 production release

### Step 6 — Push to GitHub

Push the completed phase branch to the existing GitHub repository:

https://github.com/K-Shalom/Portfolio

Use the configured Git remote.

Do not force-push.

Do not push implementation changes directly to the default branch.

### Step 7 — Create a pull request

Create a GitHub pull request targeting the repository's default branch.

Use GitHub CLI or another available authenticated GitHub integration.

Every pull request must include:

- Phase number and title.

- Summary of changes.

- Objectives completed.

- Modified files.

- New features.

- Bug fixes.

- Security improvements.

- Architecture changes.

- Screenshots where applicable.

- Test results.

- Code review findings.

- Resolved issues.

- Known limitations.

- Breaking changes, if any.

- Acceptance criteria checklist.

- Rollback considerations.

- Recommended next phase.

Do not create duplicate pull requests.

If a pull request already exists for the phase, update it.

### Step 8 — Review the pull request

Before merging:

- Inspect the pull request diff.

- Verify the target branch.

- Check for merge conflicts.

- Check GitHub Actions and CI results where available.

- Review automated security findings.

- Review comments from human reviewers.

- Resolve blocking review findings.

- Verify phase acceptance criteria.

- Confirm no new regressions.

- Confirm that all required checks and approvals have passed.

If GitHub Copilot Code Review or another authorized automated reviewer is available, request an additional review.

Do not purchase services or enable paid integrations without approval.

### Step 9 — Merge the pull request

I authorize you to merge completed phase pull requests when all the following conditions are satisfied:

- Phase acceptance criteria are met.

- Code review is completed.

- No unresolved critical or high-severity blocking findings remain.

- Required tests pass.

- No new regressions are introduced.

- Required GitHub checks pass.

- Required repository approvals are obtained.

- No merge conflicts remain.

- The changes do not trigger an unauthorized production deployment.

Prefer squash merging to maintain a clean, phase-oriented Git history, unless the repository requires another merge strategy.

Never bypass branch protection rules.

Never fabricate reviewer approvals.

If merging is blocked by permissions, missing approvals, failed checks or authentication, report the exact blocker.

Do not mark a blocked pull request as merged.

### Step 10 — Synchronize the repository

After successful merging:

- Fetch the latest remote changes.

- Switch to the default branch.

- Pull the merged changes.

- Verify the local repository is synchronized.

- Verify the working tree is clean.

- Remove the completed local phase branch where safe.

- Update the progress tracker.

- Record the pull request URL and merge commit.

Ensure progress documentation is committed and synchronized rather than leaving untracked changes after the phase.

### Step 11 — Report phase completion

Provide a phase completion report containing:

- Phase number.

- Phase name.

- Implementation status.

- Completed requirements.

- Files changed.

- Test results.

- Code review results.

- Issues fixed.

- Remaining limitations.

- Commit hash.

- Branch name.

- Pull request URL.

- Pull request status.

- Merge status.

- Next phase.

Use separate statuses for implementation and GitHub integration.

A phase may be implementation-complete while its pull request is still awaiting review or approval.

## 4. Updated progress tracking

Extend PROGRESS.md to track:

- Phase number.

- Implementation status.

- Acceptance criteria status.

- Test status.

- Code review status.

- Git branch.

- Commit hash.

- Push status.

- Pull request URL.

- Pull request status.

- Merge status.

- Known issues.

- Blockers.

- Next phase.

Use accurate status values:

- PENDING

- IN PROGRESS

- IMPLEMENTED

- UNDER REVIEW

- CHANGES REQUESTED

- READY TO MERGE

- MERGED

- BLOCKED

Never mark a phase as MERGED until GitHub confirms the merge.

## 5. Deployment restrictions

GitHub commits, pushes, pull requests and qualifying merges are now authorized for this renovation.

However, production deployment is not automatically authorized.

Inspect whether merging into the default branch triggers automatic deployment to Render or another hosting service.

If merging would automatically deploy the changes to shalomk.me, stop before merging and explain the deployment implications.

Do not:

- Modify production environment variables.

- Modify DNS.

- Delete production data.

- Perform destructive database migrations.

- Bypass repository protection.

- Force-push.

- Introduce paid infrastructure.

## 6. Complete Phase 0 now

Perform the following tasks:

1. Reconcile the original master prompt with the existing documentation.
2. Finalize all 13 implementation phases.
3. Verify the complete project inventory.
4. Verify the complete technical skills inventory.
5. Verify the RP Smart Attendance requirements.
6. Update AGENTS.md with the new GitHub workflow.
7. Update IMPLEMENTATION_PLAN.md.
8. Update PORTFOLIO_AUDIT.md where necessary.
9. Update PROGRESS.md.
10. Create CODE_REVIEW.md.
11. Perform a dedicated documentation review.
12. Resolve documentation inconsistencies.
13. Verify Phase 0 acceptance criteria.
14. Commit the Phase 0 documentation.
15. Push the existing portfolio-v2 branch.
16. Create a pull request.
17. Review the pull request.
18. Merge it if all required conditions are satisfied.
19. Synchronize the local repository.
20. Provide the final Phase 0 completion report.

Do not begin Phase 1 until I explicitly instruct you to continue.

Begin now.
