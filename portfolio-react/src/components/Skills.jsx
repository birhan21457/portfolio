import { useEffect, useRef } from 'react';
import './Skills.css';

const skillCategories = [
  {
    icon: 'fas fa-code',
    title: 'Frontend',
    skills: [
      { name: 'HTML / CSS', pct: 90 },
      { name: 'JavaScript', pct: 80 },
      { name: 'React',      pct: 75 },
    ],
  },
  {
    icon: 'fas fa-server',
    title: 'Backend',
    skills: [
      { name: 'Node.js', pct: 70 },
      { name: 'Python',  pct: 65 },
      { name: 'PHP',     pct: 60 },
      { name: 'Java',    pct: 60 },
    ],
  },
  {
    icon: 'fas fa-network-wired',
    title: 'Networking',
    skills: [
      { name: 'Cisco / Routing', pct: 80 },
      { name: 'VLAN / Switching', pct: 75 },
      { name: 'Network Security', pct: 70 },
    ],
  },
];

const tools = ['Git', 'VS Code', 'Figma', 'Docker', 'GitHub', 'Postman', 'MySQL', 'Cisco Packet Tracer'];

export default function Skills() {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          e.target.querySelectorAll('.skill-category').forEach(c => c.classList.add('visible'));
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.2 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <h2 className="section-title">My <span>Skills</span></h2>
        <div className="skills-grid" ref={gridRef}>

          {skillCategories.map(({ icon, title, skills }) => (
            <div className="skill-category fade-in" key={title}>
              <h3><i className={icon}></i> {title}</h3>
              <div className="skill-bars">
                {skills.map(({ name, pct }) => (
                  <div className="skill-item" key={name}>
                    <div className="skill-info">
                      <span>{name}</span><span>{pct}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" data-width={pct} style={{ width: 0 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="skill-category fade-in">
            <h3><i className="fas fa-tools"></i> Tools</h3>
            <div className="tools-tags">
              {tools.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
