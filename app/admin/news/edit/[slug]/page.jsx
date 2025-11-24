import EditNewsClient from "./EditNewsClient";
import "./assets/styles.css"
export default async function Page({ params }) {
  const { slug } = await params; // <-- THIS FIXES IT

  return <EditNewsClient slug={slug} />;
}

