import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="site-footer-brand">LongEar Diaries</p>
          <p className="site-footer-tagline">
            A student-led field diary for endangered and overlooked species.
            We&apos;re a bridge to the organisations doing the conservation
            work, never a fundraiser.
          </p>
        </div>

        <nav aria-label="Explore" className="site-footer-nav">
          <span className="site-footer-nav-label">Explore</span>
          <Link href="/content">Animal catalogue</Link>
          <Link href="/events">Events &amp; comics</Link>
          <Link href="/leadership">Leadership</Link>
          <Link href="/about">Our story</Link>
        </nav>

        <nav aria-label="Reach us" className="site-footer-nav">
          <span className="site-footer-nav-label">Reach us</span>
          <a
            href="https://www.xiaohongshu.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            RedNote
          </a>
          <a
            href="https://www.instagram.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <Link href="/contact">Email &amp; Q&amp;A</Link>
        </nav>
      </div>
      <p className="site-footer-meta">
        &copy; 2025 LongEar Diaries · Built as a bridge for endangered species
        storytelling.
      </p>
    </footer>
  );
}
