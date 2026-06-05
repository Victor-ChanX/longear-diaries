import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="site-footer-brand">LongEar Diaries</p>
          <p className="site-footer-tagline">
            Field notes from the front lines of biodiversity.
          </p>
        </div>
        <nav aria-label="Social and contact" className="site-footer-nav">
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
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <p className="site-footer-meta">
        &copy; 2025 LongEar Diaries. Built as a bridge for endangered species
        storytelling.
      </p>
    </footer>
  );
}
