import "./assets/styles.css";

import AdminNav from "./AdminNav";

export default function AdminLayout({ children }) {
  return (
      <>
        <header className="admin-header">
          <AdminNav />
        </header>

        <main>{children}</main>
      </>
  );
}
