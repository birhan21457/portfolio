import './Experience.css';

const groups = [
  {
    label: 'Work Experience',
    items: [
      {
        icon: 'fas fa-network-wired',
        title: 'Network Engineer Intern',
        org: 'IE Network Solutions',
        badge: 'Work',
        badgeClass: 'exp-badge-work',
        desc: 'Assisted in the design, configuration, and deployment of enterprise network infrastructure. Worked with routers, switches, and firewalls; conducted network troubleshooting and supported VLAN segmentation and IP addressing for client sites.',
        tags: ['Cisco', 'VLAN', 'Routing', 'Switching', 'Troubleshooting'],
      },
      {
        icon: 'fas fa-university',
        title: 'Student Management System Developer',
        org: 'Bahir Dar University',
        badge: 'Work',
        badgeClass: 'exp-badge-work',
        desc: 'Developed and maintained modules for a student management system used at Bahir Dar University. Implemented features for student records, course registration, and grade management.',
        tags: ['Web Dev', 'Database', 'PHP', 'MySQL'],
      },
    ],
  },
  {
    label: 'Leadership & Teaching',
    items: [
      {
        icon: 'fas fa-chalkboard-teacher',
        title: 'Online Education Instructor',
        org: 'Abushakir Qemer',
        badge: 'Leadership',
        badgeClass: 'exp-badge-lead',
        desc: 'Led and instructed online courses on the Abushakir platform, mentoring students . Organized course content, conducted live sessions, and provided learning support.',
        tags: ['Teaching', 'Mentoring', 'Online Education'],
      },
      {
        icon: 'fas fa-book-open',
        title: 'Bahire-Hasab & Qene Course ',
        org: 'Cultural & Traditional Education',
        badge: 'Leadership',
        badgeClass: 'exp-badge-lead',
        desc: 'Taught and guided students in traditional Ethiopian scholarly disciplines — Bahire-Hasab (Ethiopian calendar & astronomy) and Qene (classical Ge\'ez poetry). Demonstrated strong leadership in preserving and passing on cultural knowledge.',
        tags: ['Bahire-Hasab', 'Qene', 'Cultural Education', 'Leadership'],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <h2 className="section-title">My <span>Experience</span></h2>
        <div className="experience-timeline">
          {groups.map(({ label, items }) => (
            <div key={label}>
              <div className="exp-group-label">{label}</div>
              {items.map(({ icon, title, org, badge, badgeClass, desc, tags }) => (
                <div className="exp-card" key={title}>
                  <div className="exp-icon"><i className={icon}></i></div>
                  <div className="exp-body">
                    <div className="exp-header">
                      <div>
                        <h3 className="exp-title">{title}</h3>
                        <p className="exp-org">{org}</p>
                      </div>
                      <span className={`exp-badge ${badgeClass}`}>{badge}</span>
                    </div>
                    <p className="exp-desc">{desc}</p>
                    <div className="exp-tags">
                      {tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
