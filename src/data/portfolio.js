export const personal = {
  name: 'Muhammad Shaheer Gul',
  title: 'Full Stack Developer & Mobile App Architect',
  taglines: [
    'Building scalable React & React Native apps',
    'Crafting AI-powered interfaces',
    'Delivering production solutions for 50K+ users',
    'Full-Stack Engineer with 5+ years experience',
  ],
  email: 'devshaheer360@gmail.com',
  phone: '+966-536250307',
  location: 'Riyadh, Saudi Arabia',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/',
  summary: `Full Stack Developer and Mobile App Architect specializing in React and React Native with 5+ years of experience building scalable web and mobile applications. Proven experience developing multi-tenant platforms, real-time chat systems, dashboards, geolocation features, and AI-powered applications. Delivered production solutions serving 50K+ users and multiple organizations, focusing on clean UI/UX, reusable components, cross-platform development, and maintainable code.`,
  stats: [
    { label: 'Years Experience', value: '5+' },
    { label: 'Users Served', value: '50K+' },
    { label: 'Projects Delivered', value: '5+' },
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
    role: 'Front End Developer',
    company: 'Team Yamama',
    location: 'Remote, Saudi Arabia',
    period: 'Dec 2024 – Dec 2025',
    type: 'Full-time',
    color: 'cyan',
    highlights: [
      'Implemented real-time geolocation & geofencing with React Native',
      'Developed advanced push notifications with Notifee (foreground, background, killed state)',
      'Fixed critical geofencing bug using Haversine formula replacing incorrect Euclidean calculation',
      'Optimized app performance using React.memo, FlatList, and InteractionManager',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Danalyx',
    location: 'Islamabad, Pakistan',
    period: 'Sep 2023 – Oct 2024',
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
    period: 'Nov 2020 – Jun 2023',
    type: 'Full-time',
    color: 'green',
    highlights: [
      'Built AI Attorney — legal SaaS platform serving 50K+ users & 200+ law organizations',
      'Developed HUMRAAH — family planning app with 5K+ Google Play downloads',
      'Built SPO Campus Pro — multi-tenant school ERP with 20+ schools & 15K+ students',
      'Implemented real-time chat, geolocation, AI integrations, and Stripe payments',
    ],
  },
  {
    role: 'Internee',
    company: 'Firefly',
    location: 'Rawalpindi, Pakistan',
    period: 'Jun 2020 – Nov 2020',
    type: 'Internship',
    color: 'pink',
    highlights: [
      'Started career with full MERN stack training',
      'Contributed to frontend and mobile features',
    ],
  },
]

export const projects = [
  {
    name: 'AI Attorney',
    subtitle: 'Legal AI SaaS Platform',
    period: 'May 2022 – Jun 2023',
    description:
      'A legal tech SaaS platform for the Pakistani legal market. Helps lawyers, law firms, and legal organizations do legal research, review documents, draft agreements, and manage court cases using AI.',
    highlights: [
      'Served 50,000+ users & 200+ law organizations',
      'RAG pipeline: Pinecone + GPT-4 for semantic legal case search',
      'Built AI Chat, Case Diary, Stripe payments, crash reporting',
      'Real-time features with Socket.io + Firebase',
    ],
    tech: ['React Native', 'React.js', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Python/Django', 'OpenAI GPT-4', 'Pinecone', 'PostgreSQL', 'Stripe', 'Socket.io', 'Firebase', 'Sentry'],
    stats: { users: '50K+', orgs: '200+' },
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
      'A family planning awareness mobile app for Pakistan. Connects the public with doctors for live consultation and health guidance, including nearby health facility locator.',
    highlights: [
      '5,000+ Google Play downloads for NGO awareness platform',
      'Real-time WhatsApp-style doctor chat with Socket.io + Firebase',
      'Geofencing-based facility locator using Google Maps API',
      'Offline form handling with AsyncStorage + NetInfo auto-submit',
    ],
    tech: ['React Native', 'React.js', 'TypeScript', 'Redux Toolkit', 'Firebase', 'Socket.io', 'Tailwind CSS', 'Google Maps API', 'JWT', 'Sentry'],
    stats: { users: '5K+', downloads: 'Play Store' },
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
      'Multi-tenant school management ERP platform. Multiple schools enroll as separate tenants, each getting isolated data and workflows on the same platform.',
    highlights: [
      'Onboarded 20+ schools and 15,000+ students',
      'Automated 85%+ of manual school processes',
      'Attendance, Timetable, Fee, Fines modules on web + mobile',
      'Conflict detection in timetable scheduling, bulk API operations',
    ],
    tech: ['React.js', 'React Native', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Node.js', 'PostgreSQL', 'Socket.io', 'FCM', 'NodeMailer'],
    stats: { schools: '20+', students: '15K+' },
    links: [
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.SPO.SchoolMontitoringApp', type: 'store' },
    ],
    color: 'purple',
    icon: '🏫',
  },
  {
    name: 'Cayuse',
    subtitle: 'Research Management Platform',
    period: 'Sep 2023 – Oct 2024',
    description:
      'Cloud-based research management platform used by universities, hospitals, and research organizations worldwide. Manages the full research lifecycle — proposals, grants, budgets, approvals, compliance.',
    highlights: [
      'Maintained millions of records across enterprise clients',
      'Tenant data offboarding using PostgreSQL + AWS S3',
      'Power BI dashboards connected directly to PostgreSQL',
      'Environment provisioning via Duplo Cloud (AWS EC2 + PostgreSQL)',
    ],
    tech: ['PostgreSQL', 'AWS S3', 'AWS EC2', 'Power BI', 'Duplo Cloud', 'Bitbucket Pipelines', 'Confluence'],
    stats: { records: 'Millions', clients: 'Enterprise' },
    links: [
      { label: 'Live Site', url: 'https://www.cayuse.com/', type: 'live' },
    ],
    color: 'pink',
    icon: '🔬',
  },
  {
    name: 'Xcelerate',
    subtitle: 'Field Services Platform',
    period: 'Feb 2025 – Dec 2025',
    description:
      'A field services and restoration platform connecting customers with repair/restoration service companies and their workers using real-time geolocation.',
    highlights: [
      'Fixed critical Haversine vs Euclidean geofencing formula bug',
      'Replaced notification system with Notifee for all 3 app states',
      'Performance profiling with Flipper — resolved multiple bottlenecks',
      'Pixel-accurate Figma-to-React Native UI implementation',
    ],
    tech: ['React Native', 'TypeScript', 'Redux Toolkit', 'Notifee', 'react-native-geolocation-service', 'NativeWind', 'Reanimated', 'Jira'],
    stats: { industry: 'Saudi Arabia', type: 'Field Services' },
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
      "Metro Pakistan's digital retail platform — one of Pakistan's largest cash & carry wholesale chains. Contributed to the web platform enabling customers to browse products, manage orders, and access wholesale pricing online.",
    highlights: [
      "Large-scale retail e-commerce platform for Pakistan's top wholesale chain",
      'Product catalogue, order management, and wholesale pricing features',
      'High-traffic production environment with enterprise-scale data',
    ],
    tech: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs'],
    stats: { scale: 'Enterprise', market: 'Pakistan' },
    links: [
      { label: 'Live Site', url: 'https://www.metro.pk/', type: 'live' },
    ],
    color: 'green',
    icon: '🛒',
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
- **Experience**: 5+ years
- **Location**: Riyadh, Saudi Arabia (Transferable Iqama)
- **Email**: devshaheer360@gmail.com
- **Phone**: +966-536250307
- **Languages**: Urdu (C2), English (C2)

## Summary
Full Stack Developer specializing in React and React Native with 5+ years building scalable web and mobile applications. Delivered production solutions serving 50K+ users. Expert in frontend architecture, real-time systems, AI-powered interfaces, and cross-platform mobile development.

## Work Experience
1. **Front End Developer** @ Team Yamama (Remote, Saudi Arabia) — Dec 2024 – Dec 2025
   - React Native, geolocation/geofencing, Notifee push notifications, bug fixes, performance optimization

2. **Full Stack Developer** @ Danalyx (Islamabad) — Sep 2023 – Oct 2024
   - Cayuse research platform: PostgreSQL, AWS S3/EC2, Power BI, Duplo Cloud, millions of records

3. **MERN Stack Developer** @ Firefly (Rawalpindi) — Nov 2020 – Jun 2023
   - Built AI Attorney (50K+ users), HUMRAAH (5K+ downloads), SPO Campus Pro (20+ schools, 15K+ students)

4. **Internee** @ Firefly — Jun 2020 – Nov 2020

## Projects
### AI Attorney — Legal AI SaaS
- 50,000+ users, 200+ law organizations
- RAG pipeline: Pinecone vector DB + OpenAI GPT-4 for semantic legal case search
- Built: AI Chat module, Case Diary, Stripe payments, crash reporting (Sentry), mobile features
- Tech: React Native, React.js, TypeScript, Redux Toolkit, RTK Query, Python/Django, Socket.io, Firebase, PostgreSQL, Stripe

### HUMRAAH — Family Planning App
- 5,000+ Google Play downloads
- Real-time doctor-patient chat (Socket.io + Firebase)
- Geofencing facility locator (Google Maps API)
- Offline form handling with AsyncStorage + NetInfo
- Tech: React Native, React.js, TypeScript, Redux Toolkit, Firebase, Tailwind CSS

### SPO (Campus Pro) — Multi-Tenant School ERP
- 20+ schools, 15,000+ students onboarded
- Automated 85%+ manual processes
- Modules: Attendance, Timetable, Fees, Fines (web + mobile)
- Tech: React.js, React Native, TypeScript, Node.js, PostgreSQL, Socket.io, FCM

### Cayuse (Danalyx) — Research Management Platform
- Enterprise-scale: millions of records
- Tenant data offboarding via PostgreSQL + AWS S3
- Power BI dashboards, Duplo Cloud environment management

### Xcelerate (Team Yamama) — Field Services Platform
- Fixed critical geofencing bug (Haversine formula vs wrong Euclidean formula)
- Replaced notification system with Notifee for all 3 app states
- Performance profiling and optimization with Flipper

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
- If asked about availability or hiring, say Shaheer is open to exciting opportunities
- For salary/rate questions, suggest contacting Shaheer directly via email
- Refer to Shaheer in third person (e.g., "Shaheer has 5+ years...")
- Don't make up information not provided above`
