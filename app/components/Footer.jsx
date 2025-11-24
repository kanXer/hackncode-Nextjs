export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "var(--muted)",
        padding: "20px 0",
        textAlign: "center"
      }}
    >
      <footer>
        Made with ❤️ — All rights reserved to <strong>Sahil Srivastava (KanXer)</strong> • {year}
      </footer>
    </div>
  );
}
