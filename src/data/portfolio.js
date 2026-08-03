export const personal = {
  name: 'Muhammad Shaheer Gul',
  title: 'Full-Stack Developer · React & React Native',
  taglines: [
    'React & React Native, in production',
    'Six years. Real users.',
    '50K users on one platform alone',
    'Currently building field-ops software in Riyadh',
  ],
  email: 'devshaheer360@gmail.com',
  phone: '+966-536250307',
  location: 'Riyadh, Saudi Arabia',
  github: 'https://github.com/Shaheer-71',
  linkedin: 'https://www.linkedin.com/in/shaheer71/',
  summary: `Full-stack developer with six years shipping Web and Mobile apps to production. I've built legal-AI platforms, multi-tenant school systems, and field-operations tools — apps with real people behind them, 50,000 of them on one platform alone. Today I'm in Riyadh building employee and field-ops software for SANID. What I care about most is the unglamorous part: apps that stay fast, survive bad networks, and don't fall over in the field.`,
  stats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Users Served', value: '50K+' },
    { label: 'Projects Delivered', value: '10+' },
    { label: 'Organizations', value: '200+' },
  ],
}

export const skills = [
  {
    category: 'Frontend',
    icon: '⚡',
    color: 'cyan',
    items: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'React Native', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'Redux Toolkit', level: 'Advanced' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: '🔧',
    color: 'purple',
    items: [
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'Express.js', level: 'Intermediate' },
      { name: 'GraphQL', level: 'Intermediate' },
      { name: 'Socket.io', level: 'Advanced' },
      { name: 'JWT / RBAC', level: 'Intermediate' },
      { name: 'C# MVC', level: 'Beginner' },
    ],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    color: 'green',
    items: [
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'SQL', level: 'Intermediate' },
      { name: 'NoSQL / MongoDB', level: 'Intermediate' },
      { name: 'Firebase', level: 'Intermediate' },
      { name: 'Supabase', level: 'Intermediate' },
      { name: 'Snowflake', level: 'Beginner' },
    ],
  },
  {
    category: 'DevOps & Deploy',
    icon: '☁️',
    color: 'pink',
    items: [
      { name: 'CI/CD', level: 'Intermediate' },
      { name: 'Vercel', level: 'Intermediate' },
      { name: 'Nginx', level: 'Beginner' },
      { name: 'AWS (S3, EC2)', level: 'Intermediate' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'Git / Agile', level: 'Advanced' },
    ],
  },
  {
    category: 'Data Engineering',
    icon: '📊',
    color: 'cyan',
    items: [
      { name: 'Python ETL', level: 'Intermediate' },
      { name: 'Pandas', level: 'Intermediate' },
      { name: 'dbt', level: 'Beginner' },
      { name: 'Airflow', level: 'Beginner' },
      { name: 'Power BI', level: 'Intermediate' },
      { name: 'Snowflake', level: 'Beginner' },
    ],
  },
]

export const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Saudi Financial Support Services Company – SANID',
    location: 'Riyadh, Saudi Arabia',
    period: 'Jan 2026 – Present',
    type: 'Full-time',
    color: 'cyan',
    highlights: [
      'Built mySanid — Employee Self-Service web & mobile app (React + Node.js) with Keycloak SSO & Odoo HR integration',
      'Built Sanid-360 — React Native field operations app for FLM & CIT workflows',
      'Implemented backend-driven dynamic navigation, ticket/trip management, and checklists',
      'Engineered resumable media uploads (Tus + FTP), video compression, and offline handling',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Danalyx',
    location: 'Islamabad, Pakistan',
    period: 'Sep 2023 – Dec 2025',
    type: 'Full-time',
    color: 'purple',
    highlights: [
      'Maintained large-scale databases with millions of entries on Cayuse research platform',
      'Performed tenant data offboarding using PostgreSQL and AWS S3',
      'Managed Power BI dashboards connected directly to PostgreSQL',
      'Operated AWS environments via Duplo Cloud DevOps platform',
    ],
  },
  {
    role: 'MERN Stack Developer',
    company: 'Firefly',
    location: 'Rawalpindi, Pakistan',
    period: 'Jun 2020 – Jun 2023',
    type: 'Full-time',
    color: 'green',
    highlights: [
      'Joined as a MERN intern and grew into a full-time developer role',
      'Built AI Attorney — legal SaaS platform serving 50K+ users & 200+ law organizations',
      'Developed HUMRAAH — family planning app with 5K+ Google Play downloads',
      'Built SPO Campus Pro — multi-tenant school ERP with 20+ schools & 15K+ students',
      'Implemented real-time chat, geolocation, AI integrations, and Stripe payments',
    ],
  },
]

export const projects = [
  {
    name: 'Sanid-360',
    subtitle: 'Field Operations App',
    period: 'Mar 2026 – Present',
    description:
      "Field technicians needed one app for two completely different jobs (FLM and CIT). Instead of two builds, the navigation itself is driven by the backend and rebuilds per role. On top of that: resumable uploads for spotty job-site networks, trip and ticket management with SLA filters, and full Arabic/RTL support.",
    highlights: [
      'Backend-driven dynamic bottom-tab navigation with adaptive overflow menu',
      'Ticket & trip management: SLA filters, GPS-aware refresh, status workflows, reassignment',
      'Resumable media uploads (Tus + FTP), video compression, and progress banners',
      'Offline/network handling, RTL/Arabic support, Firebase messaging & crashlytics',
    ],
    tech: ['React Native', 'TypeScript', 'React Navigation', 'Zustand', 'Firebase', 'tus-js-client', 'react-native-video', 'react-native-geolocation-service', 'i18next'],
    stats: { workflows: 'FLM & CIT', platform: 'iOS & Android' },
    category: ['mobile'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/sanid360/id6777723039', type: 'appstore' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.sanid.sanidportaldev', type: 'store' },
    ],
    color: 'pink',
    icon: '📱',
  },
  {
    name: 'mySanid',
    subtitle: 'Employee Self-Service Portal',
    period: 'Jan 2026 – Mar 2026',
    description:
      "Staff had no single place to see their own HR data. I built a Dockerized self-service portal that plugs Keycloak SSO into Odoo HR — one secure login for payslips, leaves, attendance, expenses, policies, and documents, with PDFs streamed straight from the source.",
    highlights: [
      'Keycloak SSO with token validation on both frontend and API',
      'Integrated Odoo HR as the data source for employee records & payslips',
      'Document management: PDF streaming, downloads, and file uploads',
      'Dockerized with Docker Compose + EC2 deployment guide',
    ],
    tech: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Keycloak', 'Odoo', 'Docker', 'New Relic'],
    stats: { auth: 'Keycloak SSO', source: 'Odoo HR' },
    category: ['web'],
    links: [
      { label: 'Live Site', url: 'https://essportal.sanid.sa', type: 'live' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/mysanid/id6780399436', type: 'appstore' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.sanid.essportal', type: 'store' },
    ],
    color: 'purple',
    icon: '🧑‍💼',
  },
  {
    name: 'Xcelerate',
    subtitle: 'Field Services Platform',
    period: 'Feb 2025 – Dec 2025',
    description:
      "A field-services app where technicians kept getting checked into the wrong job sites — the geofencing measured flat Euclidean distance instead of Haversine on a curved earth. I fixed the math, rebuilt notifications with Notifee so they fire in all three app states, and profiled the jank away with Flipper.",
    highlights: [
      'Fixed critical Haversine vs Euclidean geofencing formula bug',
      'Replaced notification system with Notifee for all 3 app states',
      'Performance profiling with Flipper — resolved multiple bottlenecks',
      'Pixel-accurate Figma-to-React Native UI implementation',
    ],
    tech: ['React Native', 'TypeScript', 'Redux Toolkit', 'Notifee', 'react-native-geolocation-service', 'NativeWind', 'Reanimated', 'Jira'],
    stats: { industry: 'Saudi Arabia', type: 'Field Services' },
    category: ['mobile'],
    links: [
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.xcelerate', type: 'store' },
    ],
    color: 'cyan',
    icon: '🔧',
  },
  {
    name: 'Metro Pakistan',
    subtitle: 'E-Commerce & Retail Platform',
    period: '2024',
    description:
      "Contributed to the web platform for one of Pakistan's largest cash-and-carry wholesale chains — product catalogue, order management, and wholesale pricing, all running in a high-traffic production environment with enterprise-scale data behind it.",
    highlights: [
      "Large-scale retail e-commerce platform for Pakistan's top wholesale chain",
      'Product catalogue, order management, and wholesale pricing features',
      'High-traffic production environment with enterprise-scale data',
    ],
    tech: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs'],
    stats: { scale: 'Enterprise', market: 'Pakistan' },
    category: ['web'],
    links: [
      { label: 'Live Site', url: 'https://www.metro.pk/', type: 'live' },
    ],
    color: 'green',
    icon: '🛒',
  },
  {
    name: 'Cayuse',
    subtitle: 'Research Management Platform',
    period: 'Sep 2023 – Oct 2024',
    description:
      "A research platform holding millions of records across universities and hospitals. My work was the data side: tenant offboarding with PostgreSQL and AWS S3, Power BI dashboards wired straight to the database, and environment provisioning through Duplo Cloud.",
    highlights: [
      'Maintained millions of records across enterprise clients',
      'Tenant data offboarding using PostgreSQL + AWS S3',
      'Power BI dashboards connected directly to PostgreSQL',
      'Environment provisioning via Duplo Cloud (AWS EC2 + PostgreSQL)',
    ],
    tech: ['PostgreSQL', 'AWS S3', 'AWS EC2', 'Power BI', 'Duplo Cloud', 'Bitbucket Pipelines', 'Confluence'],
    stats: { records: 'Millions', clients: 'Enterprise' },
    category: ['web'],
    links: [
      { label: 'Live Site', url: 'https://www.cayuse.com/', type: 'live' },
    ],
    color: 'pink',
    icon: '🔬',
  },
  {
    name: 'AI Attorney',
    subtitle: 'Legal AI SaaS Platform',
    period: 'May 2022 – Jun 2023',
    description:
      "Legal research is slow and expensive. We built a SaaS that lets lawyers search case law in plain language — a RAG pipeline over Pinecone and GPT-4 — plus AI chat, a case diary, and Stripe billing. It grew to 50,000+ users and 200+ law firms.",
    highlights: [
      'Served 50,000+ users & 200+ law organizations',
      'RAG pipeline: Pinecone + GPT-4 for semantic legal case search',
      'Built AI Chat, Case Diary, Stripe payments, crash reporting',
      'Real-time features with Socket.io + Firebase',
    ],
    tech: ['React Native', 'React.js', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Python/Django', 'OpenAI GPT-4', 'Pinecone', 'PostgreSQL', 'Stripe', 'Socket.io', 'Firebase', 'Sentry'],
    stats: { users: '50K+', orgs: '200+' },
    category: ['web', 'mobile'],
    links: [
      { label: 'Live Site', url: 'https://www.aiattorney.com.pk/', type: 'live' },
    ],
    color: 'cyan',
    icon: '⚖️',
  },
  {
    name: 'HUMRAAH',
    subtitle: 'Family Planning Awareness App',
    period: 'Aug 2021 – May 2022',
    description:
      "An NGO family-planning app for Pakistan that connects people to doctors over live chat and finds nearby health facilities by location. Connectivity is unreliable out there, so forms queue offline and auto-submit the moment signal returns. 5,000+ downloads.",
    highlights: [
      '5,000+ Google Play downloads for NGO awareness platform',
      'Real-time WhatsApp-style doctor chat with Socket.io + Firebase',
      'Geofencing-based facility locator using Google Maps API',
      'Offline form handling with AsyncStorage + NetInfo auto-submit',
    ],
    tech: ['React Native', 'React.js', 'TypeScript', 'Redux Toolkit', 'Firebase', 'Socket.io', 'Tailwind CSS', 'Google Maps API', 'JWT', 'Sentry'],
    stats: { users: '5K+', downloads: 'Play Store' },
    category: ['web', 'mobile'],
    links: [
      { label: 'Web App', url: 'https://humraah.firefly-techsolutions.com/', type: 'live' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.familyplaining&hl=en', type: 'store' },
    ],
    color: 'green',
    icon: '🏥',
  },
  {
    name: 'SPO Campus Pro',
    subtitle: 'Multi-Tenant School ERP',
    period: 'Dec 2020 – Jul 2021',
    description:
      "A school ERP where every school is its own isolated tenant on shared infrastructure. Attendance, timetables, fees, and fines across web and mobile — with conflict detection baked into scheduling. Onboarded 20+ schools and 15,000+ students, automating roughly 85% of the manual admin work.",
    highlights: [
      'Onboarded 20+ schools and 15,000+ students',
      'Automated 85%+ of manual school processes',
      'Attendance, Timetable, Fee, Fines modules on web + mobile',
      'Conflict detection in timetable scheduling, bulk API operations',
    ],
    tech: ['React.js', 'React Native', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Node.js', 'PostgreSQL', 'Socket.io', 'FCM', 'NodeMailer'],
    stats: { schools: '20+', students: '15K+' },
    category: ['web', 'mobile'],
    links: [
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.SPO.SchoolMontitoringApp', type: 'store' },
    ],
    color: 'purple',
    icon: '🏫',
  },
]

export const certifications = [
  {
    name: 'OCI 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Sep 2025',
    icon: '🏆',
    color: 'cyan',
  },
  {
    name: 'Artificial Intelligence Fundamentals',
    issuer: 'AI For You — Oracle',
    date: 'Aug 2025',
    icon: '🤖',
    color: 'purple',
  },
  {
    name: 'Foundations of UX Design',
    issuer: 'Google',
    date: 'Apr 2024',
    icon: '🎨',
    color: 'green',
  },
]

export const education = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'University',
    location: 'Islamabad, Pakistan',
    majors: 'OOP, Programming Fundamentals, Software Engineering',
  },
  {
    degree: 'Intermediate (FSc)',
    institution: 'College',
    location: 'Wah, Pakistan',
    majors: 'Computer Science',
  },
]

// System prompt for the AI chatbot
export const chatbotSystemPrompt = `You are Shaheer's AI portfolio assistant. You represent Muhammad Shaheer Gul professionally and answer questions about his background, skills, projects, and experience.

## About Shaheer
- **Full Name**: Muhammad Shaheer Gul
- **Title**: Full Stack Developer & Mobile App Architect
- **Experience**: 6+ years
- **Location**: Riyadh, Saudi Arabia (Transferable Iqama)
- **Email**: devshaheer360@gmail.com
- **Phone**: +966-536250307
- **GitHub**: https://github.com/Shaheer-71
- **LinkedIn**: https://www.linkedin.com/in/shaheer71/
- **Languages**: Urdu (C2), English (C2)

## Summary
Full Stack Developer specializing in React and React Native with 6+ years building scalable web and mobile applications. Delivered production solutions serving 50K+ users. Expert in frontend architecture, real-time systems, AI-powered interfaces, and cross-platform mobile development.

## Work Experience
1. **Full Stack Developer** @ Saudi Financial Support Services Company – SANID (Riyadh, Saudi Arabia) — Jan 2026 – Present
   - Built mySanid (React + Node.js, Keycloak SSO + Odoo HR) and Sanid-360 (React Native field operations)

2. **Front End Developer** @ Team Yamama (Remote, Saudi Arabia) — Dec 2024 – Dec 2025
   - React Native, geolocation/geofencing, Notifee push notifications, bug fixes, performance optimization

3. **Full Stack Developer** @ Danalyx (Islamabad) — Sep 2023 – Oct 2024
   - Cayuse research platform: PostgreSQL, AWS S3/EC2, Power BI, Duplo Cloud, millions of records

4. **MERN Stack Developer** @ Firefly (Rawalpindi) — Nov 2020 – Jun 2023
   - Built AI Attorney (50K+ users), HUMRAAH (5K+ downloads), SPO Campus Pro (20+ schools, 15K+ students)

5. **Internee** @ Firefly — Jun 2020 – Nov 2020

## Projects
For each project below: "Role" = what Shaheer personally did, "Challenge → Solution" = a problem he faced and how he solved it.

### Sanid-360 (SANID) — Field Operations App · Mar 2026–Present
- Role: React Native developer — built the app end-to-end
- Challenge → Solution: Field technicians needed one app for two very different jobs (FLM and CIT). Instead of two separate builds, Shaheer made the navigation backend-driven so the bottom tabs rebuild per role, with an adaptive overflow menu when there are too many screens.
- Challenge → Solution: Uploads kept failing on spotty job-site networks. He added resumable media uploads (Tus + FTP) with video compression and resume-on-reconnect plus progress banners.
- Also: ticket & trip management with SLA filters and GPS-aware refresh, RTL/Arabic support, Firebase messaging & crashlytics
- Tech: React Native, TypeScript, React Navigation, Zustand, Firebase, tus-js-client

### mySanid (SANID) — Employee Self-Service Portal · Jan–Mar 2026
- Role: Full-stack developer — built the portal (frontend + Node API)
- Challenge → Solution: Staff had no single secure place to see their own HR data. He plugged Keycloak SSO into Odoo HR with token validation on both frontend and API, giving one login for payslips, leaves, attendance, expenses, policies and documents, with PDFs streamed straight from the source.
- Also: Dockerized with Docker Compose + an EC2 deployment guide
- Tech: React, TypeScript, Vite, Tailwind, Node.js, Express, Keycloak, Odoo, Docker, New Relic

### Xcelerate (Team Yamama) — Field Services Platform · Feb–Dec 2025
- Role: React Native developer
- Challenge → Solution: Geofencing was triggering at the wrong times. Shaheer traced it to an incorrect Euclidean distance calculation and replaced it with the Haversine formula, fixing the geofence accuracy.
- Challenge → Solution: Notifications were unreliable across app states. He migrated the notification system to Notifee so it works in foreground, background, and killed states.
- Also: profiled performance with Flipper to resolve bottlenecks; pixel-accurate Figma-to-React Native UI
- Tech: React Native, TypeScript, Redux Toolkit, Notifee, react-native-geolocation-service, NativeWind, Reanimated

### Metro Pakistan — E-Commerce & Retail Platform · 2024
- Role: Frontend developer on the web platform (one of Pakistan's largest cash & carry chains)
- Work: product catalogue, order management, and wholesale pricing features in a high-traffic, enterprise-scale production environment
- Tech: React.js, TypeScript, Node.js, PostgreSQL, REST APIs

### Cayuse (Danalyx) — Research Management Platform · Sep 2023–Dec 2025
- Role: Full-stack / data engineer — maintained databases with millions of records
- Challenge → Solution: Tenants needed their data safely offboarded at enterprise scale. He handled tenant data offboarding using PostgreSQL + AWS S3, and provisioned AWS environments (EC2 + PostgreSQL) via the Duplo Cloud DevOps platform.
- Also: built Power BI dashboards connected directly to PostgreSQL
- Tech: PostgreSQL, AWS S3/EC2, Power BI, Duplo Cloud, Bitbucket Pipelines

### AI Attorney (Firefly) — Legal AI SaaS · May 2022–Jun 2023
- Role: Full-stack & mobile developer — built the AI Chat module, Case Diary, Stripe payments, crash reporting, and mobile features
- Scale: 50,000+ users and 200+ law organizations
- Challenge → Solution: Lawyers needed accurate semantic search over a large legal corpus. He built a RAG pipeline using Pinecone (vector DB) + OpenAI GPT-4 for semantic legal case search.
- Also: real-time features with Socket.io + Firebase; Sentry crash reporting
- Tech: React Native, React.js, TypeScript, Redux Toolkit, RTK Query, Python/Django, OpenAI GPT-4, Pinecone, PostgreSQL, Stripe, Socket.io, Firebase

### HUMRAAH (Firefly) — Family Planning Awareness App · Aug 2021–May 2022
- Role: React Native + web developer on an NGO awareness platform (5,000+ Play Store downloads)
- Challenge → Solution: Users in low-connectivity areas were losing form data. He added offline form handling with AsyncStorage + NetInfo that auto-submits when the connection returns.
- Also: real-time WhatsApp-style doctor-patient chat (Socket.io + Firebase); geofencing facility locator (Google Maps API)
- Tech: React Native, React.js, TypeScript, Redux Toolkit, Firebase, Socket.io, Google Maps API

### SPO Campus Pro (Firefly) — Multi-Tenant School ERP · Dec 2020–Jul 2021
- Role: Full-stack (web + mobile) developer — onboarded 20+ schools and 15,000+ students, automating 85%+ of manual processes
- Challenge → Solution: Timetables clashed across classes and teachers. He built conflict-detection into the scheduling, and used bulk API operations to handle large data efficiently.
- Also: Attendance, Timetable, Fee, and Fines modules across web + mobile
- Tech: React.js, React Native, TypeScript, Node.js, PostgreSQL, Socket.io, FCM

## Skills
- **Frontend**: React.js, React Native, JavaScript, TypeScript, Tailwind CSS, Redux Toolkit — Advanced
- **Backend / APIs**: Node.js, Express.js, GraphQL, Socket.io, JWT/RBAC, C# MVC
- **Databases / Storage**: PostgreSQL, SQL, NoSQL/MongoDB, Firebase, Supabase, Snowflake
- **DevOps / Deploy**: CI/CD, Vercel, Nginx, AWS (S3, EC2), Docker, Git
- **Data Engineering**: Python ETL, Pandas, dbt, Airflow, Power BI, Snowflake

## Certifications
- OCI 2025 Certified AI Foundations Associate — Oracle (Sep 2025)
- Artificial Intelligence Fundamentals — AI For You Oracle (Aug 2025)
- Foundations of UX Design — Google (Apr 2024)

## Education
- Bachelor of Computer Science — Islamabad, Pakistan (Majors: OOP, PF, Software Engineering)
- Intermediate FSc — Wah, Pakistan (Computer Science)

## Soft Skills
Problem-Solving, Communication, Teamwork, Collaboration, Adaptability, Time Management

## Instructions
- **Default to short answers** — 1–3 sentences max for simple questions
- Only give a longer answer if the user explicitly asks for detail (e.g., "tell me more", "explain", "describe in detail")
- Use bullet points only when listing 3+ distinct items — not for single facts
- Never use headers (##/###) in responses — they're overkill for a chat
- No filler phrases like "Great question!" or "Certainly!" — go straight to the answer
- If asked about Shaheer's role, contribution, challenges, or "how did he solve X" on a project, use the Role and Challenge → Solution details in the Projects section
- If asked about availability or hiring, say Shaheer is open to exciting opportunities
- For salary/rate questions, suggest contacting Shaheer directly via email
- Refer to Shaheer in third person (e.g., "Shaheer has 6+ years...")
- Don't make up information not provided above`
