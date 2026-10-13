import './Footer.css';

const socials = [
  { href: 'https://github.com/birhan21457', icon: 'fab fa-github',         label: 'GitHub' },
  { href: 'www.linkedin.com/in/birhan19',  icon: 'fab fa-linkedin-in',    label: 'LinkedIn' },
  { href: 'mailto:birhanassefa2127@gmail.com', icon: 'fas fa-envelope',   label: 'Email' },
  { href: 'https://t.me/B1rhan27',          icon: 'fab fa-telegram-plane', label: 'Telegram' },
];

export default function Footer() {
  const scrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-name">Birhan <span>Assefa</span></h2>
        <p className="footer-tagline">Building digital experiences, one line of code at a time.</p>
        <div className="footer-socials">
          {socials.map(({ href, icon, label }) => (
            <a key={label} href={href} aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
              <i className={icon}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Birhan Assefa. All rights reserved.</p>
        <p>Designed &amp; Built by <span>Birhan Assefa</span></p>
      </div>

      <a href="#hero" className="back-to-top" aria-label="Back to top" onClick={scrollTop}>
        <i className="fas fa-chevron-up"></i>
      </a>
    </footer>
  );
}
