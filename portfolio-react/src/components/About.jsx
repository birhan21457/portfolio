import { useEffect, useRef } from 'react';
import './About.css';

const quickInfo = [
  { icon: 'fas fa-map-marker-alt', text: 'Bahir Dar, Ethiopia' },
  { icon: 'fas fa-graduation-cap', text: 'Computer Engineering Student' },
  { icon: 'fas fa-university',     text: 'Bahir Dar University' },
  { icon: 'fas fa-code',           text: 'Web Developer & Network END Engineer' },
  { icon: 'fas fa-language',       text: 'English · Amharic . Geez' },
];

const highlights = [
  'Computer Engineering student at Bahir Dar University',
  'Full stack web developer (HTML, CSS, JS, React, Node, Java, PHP)',
 
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">About <span>Me</span></h2>
        <div className="about-grid">

          <div className="about-left fade-in">
            <div className="about-photo">
              <img src="/imge/profile.png" alt="Birhan Assefa" />
            </div>
            <div className="about-quick-info">
              {quickInfo.map(({ icon, text }) => (
                <div className="quick-info-item" key={text}>
                  <i className={icon}></i>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right fade-in">
            <h3 className="about-role">Computer Engineering Student &amp; Web Developer</h3>
            <p className="about-bio">
              I'm <strong>Birhan Assefa</strong>, a Computer Engineering student at{' '}
              <strong>Bahir Dar University</strong>, Ethiopia. I'm passionate about
              technology and innovation, with a strong interest in software development,
              web technologies, Network END Engineer.
            </p>
            <p className="about-bio">
              Throughout my academic journey I've been developing my skills in
              programming, problem-solving, and creating practical solutions. I enjoy
              learning new technologies and applying them to build meaningful projects
              that make a difference.
            </p>

            <p className="about-highlights-title"><strong>Key Highlights:</strong></p>
            <ul className="about-highlights">
              {highlights.map(item => (
                <li key={item}>
                  <i className="fas fa-check-circle"></i>
                  {item}
                </li>
              ))}
              <li>
                <i className="fas fa-check-circle"></i>
                Active on GitHub:{' '}
                <a href="https://github.com/birhan21457" target="_blank" rel="noopener noreferrer">
                  birhan21457
                </a>
              </li>
            </ul>

            <p className="about-bio">
              Beyond developing web applications and configuring network infrastructure, I spend my time analyzing crypto markets, 
              engaging with open-source engineering communities, and guiding students through programming and network fundamentals.
            </p>

            <a href="#contact" className="btn btn-primary about-cta"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Let's Connect
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
