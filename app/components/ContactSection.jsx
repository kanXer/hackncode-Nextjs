"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = [];
    if (!form.name.trim()) e.push("Name is required.");
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.push("Valid email is required.");
    if (!form.message.trim()) e.push("Message required.");
    return e;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const v = validate();
    if (v.length) {
      setErrors(v);
      setSuccess("");
      return;
    }

    setErrors([]);

    const text =
      `📩 New Contact Message\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Message: ${form.message}`;

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: text }),
      });

      const json = await res.json();

      if (json?.success) {
        setSuccess("Thank you! Your message was sent.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess(`ERROR: ${json.error || "Unknown API Error"}`);
      }
    } catch (err) {
      setSuccess("ERROR: Could not connect to API server.");
    }
  };

  return (
    <section className="contact-section card" id="contact">
      <h2>Contact</h2>

      {/* ERRORS */}
      {errors.length > 0 && (
        <div className="api-error-box">
          <strong>Validation Errors:</strong>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <>
          {success.startsWith("ERROR:") ? (
            <div className="api-error-box">{success}</div>
          ) : (
            <div className="btn" style={{ marginTop: 10 }}>
              {success}
            </div>
          )}
        </>
      )}

      <div className="contact-grid">
        {/* FORM */}
        <div>
          <p className="small">
            Want to work together? Fill this form or email me at{" "}
            <strong style={{ color: "var(--accent)" }}>
              user.kanxer@gmail.com
            </strong>
          </p>

          <form onSubmit={sendMessage} noValidate>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              autoComplete="off"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              autoComplete="off"
              value={form.message}
              onChange={handleChange}
              required
            />

            <div style={{ marginTop: 10 }}>
              <button type="submit" className="btn">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="card" style={{ margin: "2px", padding: "12px" }}>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Contact Info</h3>
            <p className="small">Email: user.kanxer@gmail.com</p>
            <p className="small">Phone: +91 9696262007</p>
            <p className="small">Location: Uttar Pradesh, India</p>
          </div>

          <hr style={{ opacity: 0.06, margin: "12px 0" }} />

          <h3 style={{ textAlign: "center", marginTop: "10px" }}>
            Follow Me On
          </h3>

          <div
            className="social-icons"
            style={{
              justifyContent: "center",
              display: "flex",
              gap: "36px",
              marginTop: 0,
            }}
          >
            <a
              href="https://facebook.com/sahil.srivastava.1004"
              target="_blank"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com/p.c.kill3r" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/919696262007" target="_blank">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
