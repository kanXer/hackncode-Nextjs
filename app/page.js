// ==============================
// HOME PAGE (100% NO-CACHE)
// ==============================
import "./news/assets/styles.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import ContactSection from "./components/ContactSection";
import LatestPosts from "./components/LatestPosts";

export default function HomePage() {
  return (
    <>
      <div className="container">

        {/* HERO */}
        <section className="hero">
          <div className="card intro">
            <h2 id="about">
              Hi, I'm <span style={{ color: "var(--accent)" }}>
                Sahil Srivastava (KanXer)
              </span>
            </h2>

            <p>
              I'm a full-stack developer and designer building clean,
              modern web experiences.
            </p>

            <div className="skills">
              {[
                "PHP",
                "HTML/CSS",
                "JavaScript",
                "Next.js",
                "Python",
                "MySQL",
                "Nmap",
                "Metasploit",
                "Burp Suite",
                "Bug Hunting"
              ].map((s, i) => (
                <div className="skill" key={i}>{s}</div>
              ))}
            </div>

            <div className="cta">
              <a className="btn" href="/resume-preview">Resume</a>
            </div>
          </div>

          {/* PROFILE */}
          <aside className="card profile">
            <div className="avatar">
              <img src="/logo.jpeg" alt="Sahil Srivastava" />
            </div>
            <div className="meta">
              <p><strong>Sahil Srivastava (KanXer)</strong></p>
              <p>India • Black Hat • Open to work</p>
            </div>
            <a className="btn" href="#projects">View Projects</a>
          </aside>
        </section>
        
        {/* PROJECTS */}
        <h1>Projects</h1>
        <section id="projects" className="projects">

          <a href="/phone_info" className="project">
            <h3>Phone & Email OSINT</h3>
            <p>Search public OSINT data (via LeakOSINT API). Tech: Next.js/PHP.</p>
          </a>

          <a
            href="https://github.com/kanXer/The-Ultimate-Weapon"
            target="_blank"
            className="project"
          >
            <h3>The-Ultimate-Weapon</h3>
            <p>Python-based tool to create EXE or binary using Telegram bot.</p>
          </a>

          <a
            href="https://github.com/kanXer/"
            target="_blank"
            className="project"
          >
            <h3>My Github</h3>
            <p>Hi, I’m @Sahil. Open to collaboration.</p>
          </a>

          <a href="/instagram" className="project">
            <h3>Instagram Followers Increaser</h3>
            <p>Boost your Instagram reach instantly.</p>
          </a>

        </section>

        {/* LATEST POSTS */}
        <LatestPosts />

        {/* CONTACT */}
        <ContactSection />

      </div>
    </>
  );
            }

