import { useEffect, useRef } from 'react';
import './Hero.css';

const phrases = [
  'Computer Engineering Student',
  'Full-Stack Web Developer',
  'Network Engineer',
];

export default function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    let timer;

    function type() {
      const el = typedRef.current;
      if (!el) return;
      const current = phrases[phraseIndex];

      el.textContent = isDeleting
        ? current.slice(0, --charIndex)
        : current.slice(0, ++charIndex);

      let delay = isDeleting ? 60 : 110;
      if (!isDeleting && charIndex === current.length) {
        delay = 1800; isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }
      timer = setTimeout(type, delay);
    }
    type();
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">Birhan Assefa</h1>
        <h2 className="hero-title">
          <span ref={typedRef} className="typed"></span>
        </h2>
        <p className="hero-bio">
          A passionate developer who loves building clean, modern web experiences.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
            View My Work
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
            Hire Me
          </button>
        </div>
      </div>

      <div className="hero-image">
        <div className="avatar-ring">
          <div className="avatar-placeholder">
            <img src="/imge/profile.png" alt="Birhan Assefa" />
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
}
