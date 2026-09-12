import Header from "./Header";
import Footer from "./Footer";

/* One shell for the three legal pages, so they cannot drift apart in
   typography or in the date at the top of them. */
export default function LegalPage({
  title, updated, children,
}: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="top" className="legal">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated {updated}</p>
          <div className="legal-body">{children}</div>
          <p className="legal-back"><a href="/">← Back to the site</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
