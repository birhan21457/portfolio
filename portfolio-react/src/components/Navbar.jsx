import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let current = '#hero';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = `#${sec.id}`;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href) => {
    setOpen(false);
    document.body.style.overflow = '';
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">Portfolio</div>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={active === href ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleLink(href); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </nav>
  );
}
