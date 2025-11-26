"use client";
import { useState } from "react";

export default function PhoneInfoPage() {
  const [mode, setMode] = useState("");
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Select Phone, Email or ID");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 NEW

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults(null);
    setLoading(true); // 🔥 Start loading

    if (!consent) {
      setLoading(false);
      return setError("⚠️ Please confirm legal consent.");
    }

    if (!query.trim()) {
      setLoading(false);
      return setError("📱 Enter a value to lookup.");
    }

    if (mode === "phone" && !/^\+91\d{10}$/.test(query)) {
      setLoading(false);
      return setError("📵 Invalid phone number. Format: +911234567890");
    }

    if (mode === "email" && !query.includes("@")) {
      setLoading(false);
      return setError("📧 Invalid email address.");
    }

    if (mode === "id" && query.length < 6) {
      setLoading(false);
      return setError("🆔 ID must be minimum 6 characters.");
    }

    try {
      const res = await fetch("/api/osint", {
        method: "POST",
        body: JSON.stringify({ query, mode }),
      });

      const json = await res.json();
      json.error ? setError(json.error) : setResults(json);
    } catch {
      setError("⚡ Server error. Try again.");
    }

    setLoading(false); // 🔥 Stop loading
  };

  return (
    <div className="phone-info-page" style={{ padding: "20px 0" }}>
      {/* ---------------- TITLE ---------------- */}
      <h2 style={{ textAlign: "center", fontWeight: "700" }}>
        📞 Phone & Email Lookup
      </h2>
      <p style={{ textAlign: "center", color: "#aaa" }}>
        Search OSINT public data using multiple APIs
      </p>

      {/* ---------------- FORM CARD ---------------- */}
      <div className="lookup-card container" style={{ marginTop: 20 }}>
        <form className="lookup-form" onSubmit={handleSearch}>
          {/* --- MODE SELECTION --- */}
          <div className="lookup-radio">
            <label>
              <input
                type="radio"
                checked={mode === "phone"}
                onChange={() => {
                  setMode("phone");
                  setQuery("+91");
                  setPlaceholder("Enter phone number (ex: +911234567890)");
                }}
              />
              Phone
            </label>

            <label>
              <input
                type="radio"
                checked={mode === "email"}
                onChange={() => {
                  setMode("email");
                  setQuery("");
                  setPlaceholder("email@example.com");
                }}
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                checked={mode === "id"}
                onChange={() => {
                  setMode("id");
                  setQuery("");
                  setPlaceholder("Enter ID number (Aadhaar / PAN / DL)");
                }}
              />
              ID
            </label>
          </div>

          {/* --- INPUT BOX --- */}
          <input
            className="lookup-input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* --- CONSENT CHECKBOX --- */}
          <label className="lookup-checkbox">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            I confirm this search is for legal & educational use only.
          </label>

          {/* --- BUTTON WITH LOADING --- */}
          <button className="btn lookup-btn" disabled={loading}>
            {loading ? "⏳ Searching..." : "🔍 Search"}
          </button>
        </form>

        {/* --- LOADING BAR --- */}
        {loading && (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <div className="loader-bar"></div>
            <p style={{ color: "#aaa", marginTop: 8 }}>
              Fetching OSINT data…
            </p>
          </div>
        )}
      </div>

      {/* ---------------- ERROR ---------------- */}
      {error && (
        <div className="api-error-box" style={{ marginTop: 20 }}>
          {error}
        </div>
      )}

      {/* ---------------- RESULTS ---------------- */}
      {results?.List &&
        Object.entries(results.List).map(([dbName, content], dbIndex) => (
          <div
            className="card lookup-result-card"
            key={`db-${dbIndex}`}
            style={{ marginTop: 25 }}
          >
            <h3>📁 Database: {dbName}</h3>

            {content.Data.map((entry, entryIndex) => (
              <div
                className="lookup-table-container"
                key={`entry-${dbIndex}-${entryIndex}`}
                style={{ marginTop: 10 }}
              >
                <table className="lookup-table">
                  <tbody>
                    {Object.entries(entry).map(
                      ([field, value], rowIndex) => (
                        <tr
                          key={`row-${dbIndex}-${entryIndex}-${rowIndex}`}
                        >
                          <th>{field}</th>
                          <td>
                            {typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
