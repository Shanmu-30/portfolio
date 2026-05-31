const initialPortfolioData = {
  name: "N SHANMUGAPRIYA",
  title: "Electronics & Communication Engineering Student",
  location: "Salem, Tamil Nadu",
  email: "shanmu30112006@gmail.com",
  phone: "+91 63742 88126",
  about: "Motivated second-year Electronics and Communication Engineering (ECE) student at Sona College of Technology. Keen interest in bridging electronics, foundational programming, and cybersecurity. Seeking to leverage analytical abilities, circuit-design concepts, and cyberthreat awareness in dynamic, collaborative environments.",
  education: [
    {
      institution: "Sona College of Technology",
      degree: "B.E. in Electronics and Communication Engineering",
      period: "2024 - Present",
      grade: "CGPA: 8.6",
      details: "Enrolled in core electrical courses, electronic circuit analysis, digital system design, and communication system fundamentals. Maintaining a strong academic performance."
    },
    {
      institution: "SSV Matrix Higher Secondary School, Kuttapati",
      degree: "Higher Secondary Certificate (12th Grade)",
      period: "Graduated 2024",
      grade: "Score: 537 / 600",
      details: "Completed standard secondary curriculum with exceptional scores in Mathematics, Physics, and Chemistry."
    }
  ],
  skills: {
    programming: ["C", "Basic Python"],
    electronics: ["Circuit Design", "Digital Electronics", "Embedded Systems Basics"],
    cybersecurity: ["Fundamentals", "Awareness of Cyber Threats", "Data Protection Basics"],
    tools: ["MS Office", "Basic Simulation Tools"],
    softSkills: ["Communication", "Teamwork", "Problem Solving", "Time Management", "Adaptability", "Quick Learner"]
  },
  projects: [
    {
      id: "project-1",
      title: "Cyber Security for Women",
      category: "Cybersecurity",
      description: "Developed a comprehensive conceptual and educational campaign addressing crucial digital safety measures for women. The project maps current threat landscapes (phishing, social engineering, identity theft), details strong prevention models, and advocates for data-privacy best practices.",
      tech: ["Security Awareness", "Threat Prevention", "Data Protection"]
    },
    {
      id: "project-2",
      title: "Basic Circuit Design & Analysis",
      category: "Electronics",
      description: "Designed, analyzed, and characterized fundamental electronic circuits using resistors, capacitors, diodes, and transistors. Performed numerical analysis and simulated parameters to ensure stable operating conditions and verified the circuits against practical laboratory measurements.",
      tech: ["Circuit Design", "Component Analysis", "Simulation Tools"]
    }
  ],
  certifications: [
    "NPTEL Certification",
    "LoRaWAN Workshop & Certification",
    "Paper Presentation Participant"
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:shanmu30112006@gmail.com"
  },
  theme: {
    primaryColor: "#00f0ff", // Neon Cyan
    secondaryColor: "#ff7b00", // Electric Amber
    fontFamily: "'Outfit', sans-serif"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = initialPortfolioData;
} else {
  window.portfolioData = initialPortfolioData;
}
