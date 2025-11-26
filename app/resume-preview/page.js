"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeTour() {

  const resumeData = {
    name: "Sahil Srivastava",
    avatar: "https://hackncode.live/logo.jpeg",
    slogn: "Developer • Black Hat Hacker • Security Researcher",

    intro:
      "Motivated and detail-oriented computer professional seeking an entry-level role in the IT industry. Skilled in Python programming and computer applications.",

    sections: [
      {
        id: "education",
        title: "EDUCATION",
        items: [
          { label: "B.A., DDU Gorakhpur University (2024)", content: "7.90 CGPA" },
          { label: "Intermediate, U.P. Board (2021)", content: "69%" },
          { label: "High School, U.P. Board (2016)", content: "72%" },
        ],
      },

      {
        id: "skills",
        title: "TECHNICAL SKILLS",
        items: [
          { label: "Programming", content: "Python (Certified 96%)" },
          { label: "Database", content: "Basic SQL" },
          { label: "Office Tools", content: "MS Word, Excel, PowerPoint" },
          { label: "Operating Systems", content: "Windows, Linux" },
        ],
      },

      {
        id: "certifications",
        title: "CERTIFICATIONS",
        items: [
          { label: "Python Programming", content: "ISHT World — 2022" },
          { label: "Diploma in Computer Applications", content: "NBCE — 2021" },
        ],
      },

      {
        id: "projects",
        title: "PROJECTS",
        items: [
          { label: "Camera Movement Tracker", content: "Python motion detection application." },
          { label: "SMTP Keylogger", content: "Ethical monitoring application." },
          { label: "Django Website", content: "Authentication + CRUD + Database integration." },
          { label: "Next.js Website", content: "Full-stack App with MongoDB." },
        ],
      },

      {
        id: "personal",
        title: "PERSONAL DETAILS",
        items: [
          { label: "Father Name", content: "Manoj Srivastava" },
          { label: "DOB", content: "21 June 2002" },
          { label: "Languages", content: "Hindi, English" },
          { label: "Hobbies", content: "Books, Music" },
        ],
      },

      {
        id: "thankyou",
        title: "THANK YOU",
        items: [
          {
            label: "Message",
            content: "Thanks for showing interest in me. If you want a hard copy of my details, download the PDF below."
          },
          { label: "Phone", content: "+91 9696-262-007" },
          { label: "Email", content: "user.kanxer@gmail.com" },
          { label: "Address", content: "Gorakhpur, Uttar Pradesh, India" },
        ],
      },
    ],
  };

  const [step, setStep] = useState(0);
  const total = resumeData.sections.length;

  const next = () => step < total - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div className="resume-page">
      <div className="resume-wrapper">

        {/* Header */}
        <div className="resume-header">
          <img src={resumeData.avatar} alt="profile" className="profile-pic" />
          <div className="name">{resumeData.name}</div>
        </div>

        <p className="resume-slogn">{resumeData.slogn}</p>
        <p className="resume-intro">{resumeData.intro}</p>

        {/* Navigation buttons */}
        <div className="resume-nav-top">
          <button onClick={prev} disabled={step === 0}>← Previous</button>
          <button onClick={next} disabled={step === total - 1}>Next →</button>
        </div>

        {/* Animated Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={resumeData.sections[step].id}
            className="resume-section"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <div className="resume-section-title">
              {resumeData.sections[step].title}
            </div>

            {resumeData.sections[step].items.map((item, i) => (
              <div key={i}>
                <div className="resume-item-label">{item.label}</div>
                <div className="resume-item-content">{item.content}</div>
              </div>
            ))}

            {/* PDF Button */}
            {resumeData.sections[step].id === "thankyou" && (
              <a href="/resume.pdf" download className="download-btn">
                Download Resume ⬇
              </a>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="resume-dots">
          {resumeData.sections.map((_, i) => (
            <div key={i} className={`resume-dot ${i === step ? "active" : ""}`} />
          ))}
        </div>

      </div>
    </div>
  );
}
