"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./assets/styles.css"; // <-- external CSS file

export default function InstagramDashboardPage() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [instaName, setInstaName] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [instaImage, setInstaImage] = useState("");
  const [followers, setFollowers] = useState(0);
  const [recent, setRecent] = useState([]);
  const counterRef = useRef(null);

  const fmt = (n) => {
    if (n >= 1_000_000) return Math.round(n / 100_000) / 10 + "M";
    if (n >= 1000) return Math.round(n / 100) / 10 + "k";
    return String(n);
  };

  useEffect(() => {
    const u = localStorage.getItem("insta_user");
    if (!u) return router.push("/instagram/");

    const n = localStorage.getItem("insta_name") || u;
    const h = localStorage.getItem("insta_handle") || u;
    const img = localStorage.getItem("insta_image") || "";

    let savedFollowers = Number(localStorage.getItem("followers"));

    if (!savedFollowers) {
      savedFollowers = Math.max(
        Math.floor(Math.random() * 1300) + 300,
        u.length * 120
      );
      localStorage.setItem("followers", savedFollowers);
    }

    setUsername(u);
    setInstaName(n);
    setInstaHandle(h);
    setInstaImage(img);
    setFollowers(savedFollowers);

    const names = [
      "Rohan", "Anjali", "Priya", "Amit", "Neha", "Vikram",
      "Simran", "Karan", "Isha", "Rahul"
    ];

    setRecent(
      names.slice(0, 6).map((nm) => ({
        name: nm,
        handle: nm.toLowerCase() + Math.floor(Math.random() * 900),
        since: Math.floor(Math.random() * 48) + 1,
      }))
    );

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.innerText = fmt(followers);
    }
  }, [followers]);

  useEffect(() => {
    if (!loaded) return;

    const tick = setInterval(() => {
      const inc = Math.floor(Math.random() * 30) + 1;
      const newVal = followers + inc;
      localStorage.setItem("followers", newVal);
      setFollowers(newVal);

      setRecent((prev) => [
        { name: "New Follower", handle: "nf" + inc, since: 0 },
        ...prev,
      ]);
    }, 20000);

    return () => clearInterval(tick);
  }, [followers, loaded]);

  const handleLogout = () => {
    localStorage.removeItem("insta_user");
    router.push("/instagram/");
  };

  const handleGainSubmit = (e) => {
    e.preventDefault();
    const amount = Number(new FormData(e.target).get("amount"));
    if (!amount) return;
    const newVal = followers + amount;
    setFollowers(newVal);
    localStorage.setItem("followers", newVal);
  };

  const renderAvatar = () => {
    if (instaImage)
      return <img src={instaImage} className="avatar-img" />;

    return (
      <div className="avatar-placeholder">
        {instaName.charAt(0).toUpperCase()}
      </div>
    );
  };

  if (!loaded) return null;

  const posts = Array.from({ length: 3 }).map((_, i) => ({
    img: `https://picsum.photos/id/${110 + i}/900/600`,
    likes: Math.floor(Math.random() * 15000) + 200,
  }));

  return (
    <div className="ig-bg">

      <header className="ig-topbar">
        <div className="left"><div className="ig-brand">FollowersGain</div></div>

        <div className="center search-wrap">
          <input placeholder="Search" />
        </div>

        <div className="right">
          <a className="icon">🏠</a>
          <a className="icon">✉️</a>
          <a className="icon">➕</a>
          <a className="icon">❤️</a>
          <button onClick={handleLogout} className="avatar">Logout</button>
        </div>
      </header>

      <main className="ig-main container">

        <aside className="left-col ig-card profile-card">

          <div className="profile-top">
            {renderAvatar()}
            <div>
              <div className="pf-name">{instaName}</div>
              <div className="pf-handle">@{instaHandle}</div>
              <span ref={counterRef} className="followers-counter">
                {fmt(followers)}
              </span>
            </div>
          </div>

          <form onSubmit={handleGainSubmit} className="gain-form">
            <input
              name="amount"
              type="number"
              placeholder="Enter followers"
              className="ig-input"
            />
            <button className="ig-btn">Gain Followers</button>
          </form>

          <h4 className="recent-title">Recent Activity</h4>

          <div className="activity-list">
            {recent.map((r, i) => (
              <div className="act-row" key={i}>
                <div className="act-avatar">{r.name[0]}</div>
                <div className="act-info">
                  <div>
                    {r.name} <span className="small-muted">@{r.handle}</span>
                  </div>
                  <div className="small-muted">{r.since}h ago</div>
                </div>
              </div>
            ))}
          </div>

        </aside>

        <section className="feed-col">
          {posts.map((p, i) => (
            <div className="post ig-card" key={i}>
              <div className="post-header">
                <div className="post-avatar">{instaName[0]}</div>
                <div className="small-muted">@{instaHandle}</div>
              </div>

              <img src={p.img} className="post-media" />

              <div className="post-actions">
                <button>♡</button>
                <button>💬</button>
                <button>↗️</button>
                <div>{p.likes} likes</div>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}
