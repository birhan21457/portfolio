import { useState } from 'react';
import './Projects.css';

const projects = [
  {
    category: 'web',
    icon: 'fas fa-laptop-code',
    image: null,
    title: 'E-Commerce Website',
    desc: 'A fully responsive e-commerce platform built with React and Node.js.',
    tags: ['React', 'Node.js', 'MongoDB'],
    live: '#', code: '#',
  },
  {
    category: 'app',
    icon: 'fas fa-mobile-alt',
    image: null,
    title: 'Task Manager App',
    desc: 'A productivity app with real-time sync and drag-and-drop functionality.',
    tags: ['JavaScript', 'Firebase', 'CSS'],
    live: '#', code: '#',
  },
  {
    category: 'design',
    icon: 'fas fa-paint-brush',
    image: null,
    title: 'UI Design System',
    desc: 'A comprehensive design system with reusable components and style guide.',
    tags: ['Figma', 'CSS', 'Design'],
    live: '#', code: '#',
  },
  {
    category: 'web',
    icon: 'fas fa-chart-line',
    image: null,
    title: 'Analytics Dashboard',
    desc: 'A data visualization dashboard with interactive charts and filters.',
    tags: ['React', 'D3.js', 'API'],
    live: '#', code: '#',
  },
  {
    category: 'web',
    icon: null,
    image: '/imge/Net.jpg',
    title: 'Design & Implementation of Healthcare Networks',
    desc: 'Designed and implemented a secure, scalable network infrastructure for a healthcare facility, covering topology, IP addressing, VLANs, and data security protocols.',
    tags: ['Networking', 'VLAN', 'Cisco', 'Security'],
    live: '#', code: '#',
  },
];

const filters = ['all', 'web', 'app', 'design'];

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered = projects.filter(p => active === 'all' || p.category === active);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 className="section-title">My <span>Projects</span></h2>

        <div className="filter-btns">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map(({ icon, image, title, desc, tags, live, code }) => (
            <div className="project-card" key={title}>
              <div className={`project-img${image ? ' project-img-photo' : ''}`}>
                {image ? <img src={image} alt={title} /> : <i className={icon}></i>}
              </div>
              <div className="project-info">
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="project-tags">
                  {tags.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={live} aria-label="View Live">
                    <i className="fas fa-external-link-alt"></i> Live
                  </a>
                  <a href={code} aria-label="View Code">
                    <i className="fab fa-github"></i> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
