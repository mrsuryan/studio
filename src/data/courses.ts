
// Shared course data
export const allCourses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn HTML, CSS, and JavaScript fundamentals. Build your first website from scratch and understand the core concepts that power the web.",
        progress: 65,
        image: "https://picsum.photos/seed/webdevintro/600/400",
        modules: [{ id: 'm1', title: 'HTML Basics', completed: true }, { id: 'm2', title: 'CSS Fundamentals', completed: true }, { id: 'm3', title: 'JavaScript Introduction', completed: false }, { id: 'm4', title: 'DOM Manipulation', completed: false }],
        duration: "10 hours",
        rating: 4.7
    },
    {
        id: 2,
        title: "Advanced React Concepts",
        description: "Dive deep into hooks, state management patterns like Context API and Redux, and performance optimization techniques for complex React applications.",
        progress: 30,
        image: "https://picsum.photos/seed/reactadvanced/600/400",
        modules: [{ id: 'm5', title: 'React Hooks Deep Dive', completed: true }, { id: 'm6', title: 'State Management (Context API)', completed: false }, { id: 'm7', title: 'Performance Optimization', completed: false }, {id: 'm8', title: 'Testing React Apps', completed: false}],
        duration: "15 hours",
        rating: 4.8
    },
    {
        id: 3,
        title: "Data Structures and Algorithms",
        description: "Master essential computer science concepts, including arrays, linked lists, trees, graphs, sorting, and searching algorithms. Prepare for technical interviews.",
        progress: 0,
        image: "https://picsum.photos/seed/datastructures/600/400",
        modules: [{ id: 'm9', title: 'Arrays and Strings', completed: false }, { id: 'm10', title: 'Linked Lists', completed: false }, { id: 'm11', title: 'Trees and Graphs', completed: false }, {id: 'm12', title: 'Sorting Algorithms', completed: false}],
        duration: "20 hours",
        rating: 4.6
    },
    {
        id: 4,
        title: "Python for Data Science",
        description: "Explore data analysis, visualization, and machine learning using Python libraries like NumPy, Pandas, Matplotlib, and Scikit-learn.",
        progress: 15,
        image: "https://picsum.photos/seed/datasciencepy/600/400",
        modules: [{ id: 'm13', title: 'NumPy Essentials', completed: true }, { id: 'm14', title: 'Pandas DataFrames', completed: false }, { id: 'm15', title: 'Introduction to Matplotlib', completed: false }, {id: 'm16', title: 'Basic Machine Learning', completed: false}],
        duration: "18 hours",
        rating: 4.9
    },
    {
        id: 5,
        title: "Cloud Computing Basics (AWS)",
        description: "Understand the fundamentals of cloud services on AWS, including EC2, S3, and basic architecture patterns.",
        progress: 0,
        image: "https://picsum.photos/seed/awsbasics/600/400",
        modules: [{ id: 'm17', title: 'What is Cloud Computing?', completed: false }, { id: 'm18', title: 'Core AWS Services (EC2, S3)', completed: false }, { id: 'm19', title: 'AWS Architecture Basics', completed: false }, {id: 'm20', title: 'Cloud Security Fundamentals', completed: false}],
        duration: "12 hours",
        rating: 4.5
    },
    {
        id: 6,
        title: "UI/UX Design Principles",
        description: "Learn the core concepts of user interface and experience design, including user research, wireframing, prototyping, and visual design principles.",
        progress: 50,
        image: "https://picsum.photos/seed/uiuxdesign/600/400",
        modules: [{ id: 'm21', title: 'User Research Methods', completed: true }, { id: 'm22', title: 'Wireframing and Prototyping', completed: true }, { id: 'm23', title: 'Visual Design Principles', completed: false }, {id: 'm24', title: 'Usability Testing', completed: false}],
        duration: "14 hours",
        rating: 4.7
    },
    {
        id: 7,
        title: "Cybersecurity Fundamentals",
        description: "Learn the basics of cybersecurity threats, defenses, and best practices to protect digital assets.",
        progress: 10,
        image: "https://picsum.photos/seed/cybersecurity/600/400",
        modules: [{ id: 'm25', title: 'Introduction to Threats', completed: true }, { id: 'm26', title: 'Network Security Basics', completed: false }, { id: 'm27', title: 'Cryptography Essentials', completed: false }, { id: 'm28', title: 'Security Best Practices', completed: false }],
        duration: "16 hours",
        rating: 4.6
    },
    {
        id: 8,
        title: "Database Management (SQL)",
        description: "Master SQL for querying, managing, and manipulating relational databases effectively.",
        progress: 40,
        image: "https://picsum.photos/seed/sqlbasics/600/400",
        modules: [{ id: 'm29', title: 'Relational Database Concepts', completed: true }, { id: 'm30', title: 'Basic SQL Queries', completed: true }, { id: 'm31', title: 'Advanced SQL Joins', completed: false }, { id: 'm32', title: 'Database Design Principles', completed: false }],
        duration: "15 hours",
        rating: 4.8
    },
    {
        id: 9,
        title: "Introduction to DevOps",
        description: "Understand the culture, practices, and tools that enable faster and more reliable software delivery.",
        progress: 5,
        image: "https://picsum.photos/seed/devopsintro/600/400",
        modules: [{ id: 'm33', title: 'What is DevOps?', completed: true }, { id: 'm34', title: 'CI/CD Pipelines', completed: false }, { id: 'm35', title: 'Infrastructure as Code', completed: false }, { id: 'm36', title: 'Monitoring and Logging', completed: false }],
        duration: "12 hours",
        rating: 4.4
    },
    {
        id: 10,
        title: "Machine Learning Basics",
        description: "Get introduced to the core concepts of machine learning, including supervised and unsupervised learning.",
        progress: 25,
        image: "https://picsum.photos/seed/machinelearning/600/400",
        modules: [{ id: 'm37', title: 'Introduction to ML', completed: true }, { id: 'm38', title: 'Supervised Learning Algorithms', completed: false }, { id: 'm39', title: 'Unsupervised Learning', completed: false }, { id: 'm40', title: 'Model Evaluation', completed: false }],
        duration: "22 hours",
        rating: 4.7
    },
    {
        id: 11,
        title: "Networking Essentials",
        description: "Learn the fundamentals of computer networks, protocols, and the OSI model.",
        progress: 0,
        image: "https://picsum.photos/seed/networking/600/400",
        modules: [{ id: 'm41', title: 'OSI Model Explained', completed: false }, { id: 'm42', title: 'TCP/IP Protocol Suite', completed: false }, { id: 'm43', title: 'IP Addressing and Subnetting', completed: false }, { id: 'm44', title: 'Common Network Devices', completed: false }],
        duration: "14 hours",
        rating: 4.5
    },
    {
        id: 12,
        title: "Linux Command Line Basics",
        description: "Become proficient in using the Linux terminal for system administration and development tasks.",
        progress: 70,
        image: "https://picsum.photos/seed/linuxcli/600/400",
        modules: [{ id: 'm45', title: 'Navigating the Filesystem', completed: true }, { id: 'm46', title: 'File Permissions', completed: true }, { id: 'm47', title: 'Process Management', completed: true }, { id: 'm48', title: 'Shell Scripting Introduction', completed: false }],
        duration: "10 hours",
        rating: 4.9
    },
    {
        id: 13,
        title: "Agile Project Management",
        description: "Learn Agile methodologies like Scrum and Kanban for efficient project delivery.",
        progress: 15,
        image: "https://picsum.photos/seed/agilepm/600/400",
        modules: [{ id: 'm49', title: 'Agile Principles', completed: true }, { id: 'm50', title: 'Scrum Framework', completed: false }, { id: 'm51', title: 'Kanban Method', completed: false }, { id: 'm52', title: 'User Stories and Backlogs', completed: false }],
        duration: "8 hours",
        rating: 4.3
    },
    {
        id: 14,
        title: "Introduction to Blockchain",
        description: "Understand the technology behind cryptocurrencies and distributed ledger systems.",
        progress: 0,
        image: "https://picsum.photos/seed/blockchain/600/400",
        modules: [{ id: 'm53', title: 'What is Blockchain?', completed: false }, { id: 'm54', title: 'Cryptography in Blockchain', completed: false }, { id: 'm55', title: 'Consensus Mechanisms', completed: false }, { id: 'm56', title: 'Blockchain Use Cases', completed: false }],
        duration: "12 hours",
        rating: 4.2
    },
    {
        id: 15,
        title: "API Design and Development",
        description: "Learn how to design, build, and document RESTful APIs using best practices.",
        progress: 35,
        image: "https://picsum.photos/seed/apidesign/600/400",
        modules: [{ id: 'm57', title: 'REST Principles', completed: true }, { id: 'm58', title: 'API Design Patterns', completed: false }, { id: 'm59', title: 'API Documentation (Swagger/OpenAPI)', completed: false }, { id: 'm60', title: 'API Security Basics', completed: false }],
        duration: "16 hours",
        rating: 4.7
    },
    {
        id: 16,
        title: "Ethical Hacking Fundamentals",
        description: "Explore the techniques used by hackers to find vulnerabilities, but for ethical purposes.",
        progress: 20,
        image: "https://picsum.photos/seed/ethicalhacking/600/400",
        modules: [{ id: 'm61', title: 'Ethical Hacking Overview', completed: true }, { id: 'm62', title: 'Reconnaissance Techniques', completed: false }, { id: 'm63', title: 'Scanning Networks', completed: false }, { id: 'm64', title: 'Web Application Hacking Basics', completed: false }],
        duration: "20 hours",
        rating: 4.6
    },
    {
        id: 17,
        title: "Advanced CSS and Sass",
        description: "Master modern CSS features and Sass preprocessor.",
        progress: 0,
        image: "https://picsum.photos/seed/advancedcss/600/400",
        modules: [{ id: 'm65', title: 'Advanced Selectors', completed: false }, { id: 'm66', title: 'CSS Grid Layout', completed: false }, { id: 'm67', title: 'Sass Variables & Mixins', completed: false }, { id: 'm68', title: 'Responsive Design with Sass', completed: false }],
        duration: "14 hours",
        rating: 4.8
    },
    {
        id: 18,
        title: "Node.js Backend Development",
        description: "Build scalable server-side applications with Node.js.",
        progress: 45,
        image: "https://picsum.photos/seed/nodejsdev/600/400",
        modules: [{ id: 'm69', title: 'Node.js Basics', completed: true }, { id: 'm70', title: 'Express.js Framework', completed: true }, { id: 'm71', title: 'Asynchronous JavaScript', completed: false }, { id: 'm72', title: 'Working with Databases', completed: false }],
        duration: "18 hours",
        rating: 4.7
    },
    {
        id: 19,
        title: "Mobile App Development (React Native)",
        description: "Create cross-platform mobile apps.",
        progress: 10,
        image: "https://picsum.photos/seed/reactnative/600/400",
        modules: [{ id: 'm73', title: 'React Native Setup', completed: true }, { id: 'm74', title: 'Core Components', completed: false }, { id: 'm75', title: 'Navigation', completed: false }, { id: 'm76', title: 'State Management in RN', completed: false }],
        duration: "25 hours",
        rating: 4.5
    },
    {
        id: 20,
        title: "Cloud Security Best Practices",
        description: "Secure cloud infrastructure on major platforms.",
        progress: 0,
        image: "https://picsum.photos/seed/cloudsecurity/600/400",
        modules: [{ id: 'm77', title: 'IAM and Access Control', completed: false }, { id: 'm78', title: 'Network Security Groups', completed: false }, { id: 'm79', title: 'Data Encryption', completed: false }, { id: 'm80', title: 'Monitoring and Auditing', completed: false }],
        duration: "16 hours",
        rating: 4.6
    },
    {
        id: 21,
        title: "Introduction to Docker & Kubernetes",
        description: "Learn containerization and orchestration.",
        progress: 20,
        image: "https://picsum.photos/seed/dockerk8s/600/400",
        modules: [{ id: 'm81', title: 'Docker Fundamentals', completed: true }, { id: 'm82', title: 'Building Docker Images', completed: false }, { id: 'm83', title: 'Kubernetes Architecture', completed: false }, { id: 'm84', title: 'Deploying Applications with K8s', completed: false }],
        duration: "18 hours",
        rating: 4.7
    },
    {
        id: 22,
        title: "Software Testing Fundamentals",
        description: "Understand different testing methodologies.",
        progress: 5,
        image: "https://picsum.photos/seed/softwaretesting/600/400",
        modules: [{ id: 'm85', title: 'Types of Testing', completed: true }, { id: 'm86', title: 'Unit Testing', completed: false }, { id: 'm87', title: 'Integration Testing', completed: false }, { id: 'm88', title: 'Test Automation Basics', completed: false }],
        duration: "10 hours",
        rating: 4.4
    },
    {
        id: 23,
        title: "Version Control with Git & GitHub",
        description: "Master Git for collaboration and code management.",
        progress: 80,
        image: "https://picsum.photos/seed/gitgithub/600/400",
        modules: [{ id: 'm89', title: 'Git Basics', completed: true }, { id: 'm90', title: 'Branching and Merging', completed: true }, { id: 'm91', title: 'Working with GitHub', completed: true }, { id: 'm92', title: 'Collaboration Workflows', completed: true }],
        duration: "6 hours",
        rating: 4.9
    },
    {
        id: 24,
        title: "Building RESTful APIs with Python (Flask)",
        description: "Develop web APIs using the Flask framework.",
        progress: 0,
        image: "https://picsum.photos/seed/pythonflaskapi/600/400",
        modules: [{ id: 'm93', title: 'Flask Introduction', completed: false }, { id: 'm94', title: 'Routing and Views', completed: false }, { id: 'm95', title: 'Request Handling', completed: false }, { id: 'm96', title: 'Building JSON APIs', completed: false }],
        duration: "14 hours",
        rating: 4.6
    },
  ];
