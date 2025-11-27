import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "./assets/styles.css";
import AdminNav from "./AdminNav";

export default async function AdminLayout({ children }) {
  // ---- SERVER-SIDE AUTH CHECK ----
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  // Allow ONLY logged-in users
  if (session !== "verified") {
    redirect("/admin-login");
  }

  // ---- UI Layout ----
  return (
    <>
      <header className="admin-header">
        <AdminNav />
      </header>

      <main>{children}</main>
    </>
  );
}
