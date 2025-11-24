export async function POST(req) {
  try {
    const { msg } = await req.json();

    const url = `https://tele-bridge.vercel.app/api/send?msg=${msg}`;
    const res = await fetch(url);
    const j = await res.json();

    return Response.json(j);
  } catch (err) {
    return Response.json({ success: false, error: "SERVER_FAILED" });
  }
}
