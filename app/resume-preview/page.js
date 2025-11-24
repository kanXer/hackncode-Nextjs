import './assets/resumepreview.css';
export const metadata = {
  title: "Sahil Srivastava (KanXer) | PDF Preview",
  description:
    "This is my professional CV showcasing my skills, projects, and experience.",
  openGraph: {
    title: "Sahil Srivastava (KanXer) | Resume Preview",
    description:
      "Professional CV showcasing skills, projects, and experience.",
    url: "https://hackncode.live/res_preview",
    images: ["https://hackncode.live/logo.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Srivastava (KanXer) | Resume Preview",
    description:
      "Professional CV showcasing skills, projects, and experience.",
    images: ["https://hackncode.live/logo.jpeg"],
  },
};

export default function ResumePreview() {
  const year = new Date().getFullYear();

  return (
    <>

      <div className="container">
        <section className="pdf-preview" id="pdf">
          <h2>Portfolio PDF Preview</h2>
          <p className="small">Preview my full portfolio below</p>

          <a href="/Sahil.pdf" target="_blank" className="btn">
            <i className="fa-solid fa-download"></i> Download PDF
          </a>

          <iframe
            src="/Sahil.pdf"
            style={{ height: "1200px", width: "100%", border: "none" }}
          ></iframe>
        </section>
      </div>
    </>
  );
}
