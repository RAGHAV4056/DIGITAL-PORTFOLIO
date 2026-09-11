const projects = {
  minilang: {
    name: 'MiniLang Interpreter',
    status: 'Live repository',
    description: 'A C++ command-based programming language interpreter covering lexical analysis, parsing, command interpretation, variables and runtime execution.',
    stack: 'C++ · Compiler Concepts · Git/GitHub',
    link: 'github.com/RAGHAV4056/MiniLang-Interpreter'
  },
  forgelang: {
    name: 'ForgeLang',
    status: 'In build',
    description: 'A custom programming-language direction focused on structured syntax, interpretation, developer-friendly tooling and an AI-free error explainer.',
    stack: 'C++ · Language Design · Systems',
    link: 'github.com/RAGHAV4056'
  },
  ace: {
    name: 'Ace Roofings and Acoustic Solutions',
    status: 'Client web prototype',
    description: 'A business-focused website prototype designed to present services, solutions and company information through a clean digital experience.',
    stack: 'Web · UI/UX · Figma',
    link: 'rabid-patch-16556176.figma.site'
  },
  bitbox: {
    name: 'BITBOX Hackathon 6.0',
    status: 'Prototype',
    description: "A prototype created for GDG's BITBOX Hackathon 6.0, exploring interactive web experiences with a design-first approach.",
    stack: 'Figma · UI/UX · Prototype',
    link: 'cable-eel-47876249.figma.site'
  },
  parallel: {
    name: 'Parallel',
    status: 'Coming soon',
    description: 'A planned collaborative coding platform for simultaneous editing, presence and a shared workspace, built around realtime collaboration and shared coding sessions.',
    stack: 'Realtime · Collaboration · Web',
    link: 'To be made soon'
  },
  codenexus: {
    name: 'CodeNexus',
    status: 'Coming soon',
    description: 'A planned syllabus-focused Git-like developer tool inspired by version control concepts, designed as the next evolution of the MiniGit / RepoForge direction.',
    stack: 'Git · Systems · C++',
    link: 'To be made soon'
  }
};

const projectAliases = {
  minilang: 'minilang', 'mini lang': 'minilang', 'minilang interpreter': 'minilang',
  forgelang: 'forgelang', 'forge lang': 'forgelang',
  ace: 'ace', 'ace roofings': 'ace', 'ace roofings and acoustic solutions': 'ace',
  bitbox: 'bitbox', 'bitbox 6': 'bitbox', 'bitbox hackathon': 'bitbox',
  parallel: 'parallel',
  codenexus: 'codenexus', 'code nexus': 'codenexus'
};

const commands = {
  help: [
    'Available commands:',
    '  about             Show a quick profile',
    '  skills            List technical skills',
    '  projects          Show selected projects',
    '  project <name>    Get details about a project',
    '  experience        Show roles',
    '  clubs             Show clubs + communities',
    '  achievements      Show highlights',
    '  contact           Show contact links',
    '  whoami            Show current user',
    '  ls                List sandbox files',
    '  pwd               Show current path',
    '  date              Show local date',
    '  clear             Clear the terminal',
    '',
    'Project names: minilang, forgelang, ace, bitbox, parallel, codenexus'
  ],
  about: [
    'Raghav Sharma',
    "B.Tech CSE @ JIIT'29 · CGPA 9.06/10 (Year 1)",
    'Full-Stack Developer · Open Source Contributor',
    'Focus: DSA, Full-Stack, Systems, AI/ML',
    'Mission: build → learn → refine'
  ],
  skills: ['C++ 90%', 'Python 84%', 'JavaScript 82%', 'HTML 94%', 'CSS 90%', 'Java 76%', 'React 76%', 'Node.js 70%', 'MongoDB 72%', 'MySQL 78%', 'Git & GitHub 88%', 'Figma / Canva 84%'],
  projects: [
    '01 · MiniLang Interpreter — LIVE REPO',
    '02 · ForgeLang — IN BUILD',
    '03 · Ace Roofings and Acoustic Solutions — CLIENT WEB',
    '04 · BITBOX Hackathon 6.0 — PROTOTYPE',
    '05 · Parallel — SOON',
    '06 · CodeNexus — SOON',
    "Tip: use 'project minilang' or another project name for details."
  ],
  experience: [
    'Campus Ambassador — Elip AI (YC W25) · 2026',
    'Google Gemini Student Ambassador · 2026',
    'GSSoC 2026 — Contributor & Ambassador'
  ],
  clubs: [
    'GDG JIIT-128 — Volunteer · UI/UX Team',
    'JODC-128 — Core Team · Technical Member',
    'JYC-128 — Member · Technical + PR Team'
  ],
  achievements: [
    'GSSoC 2026 — Contributor & Ambassador · Open-Source Track',
    'Google Gemini Student Ambassador Program · 2026',
    'Deloitte Cyber Job Simulation · 2026',
    'Deloitte Data Analytics Job Simulation · 2026',
    "Let's Upgrade Git & GitHub Bootcamp · 2026",
    "Innovate NSUT'26 · Certificate of Participation",
    'Freshmen Clash 25.1 — Ranked 5th · 2025',
    'Smart India Hackathon — Internal Round Selectee · 2025',
    'Techno-Wizard Award · 2025',
    'Indian Silicon Valley Challenge — Round 1 cleared · 2024'
  ],
  contact: [
    'LinkedIn: linkedin.com/in/raghav-sharma-9a2729358',
    'GitHub: github.com/RAGHAV4056',
    'Instagram: instagram.com/raghavsharma732',
    'Email: raghavsharma4056@gmail.com',
    'Phone: +91 801 000 9477'
  ],
  whoami: ['visitor@raghav-sandbox'],
  ls: ['about.txt', 'skills.txt', 'projects/', 'experience/', 'clubs/', 'achievements/', 'contact.txt', 'README.md'],
  pwd: ['/home/visitor/raghav-sandbox']
};

const output = document.querySelector('#terminalOutput');
const form = document.querySelector('#terminalForm');
const input = document.querySelector('#terminalInput');
const cursor = document.querySelector('.cursor-glow');
const portrait = document.querySelector('#portrait');
const scene = document.querySelector('#scene');
const sceneToggle = document.querySelector('#sceneToggle');
const commandHistory = [];
let historyIndex = -1;

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.quick-commands button').forEach((button) => {
  button.addEventListener('click', () => {
    runCommand(button.dataset.command);
    input.focus();
  });
});

function printLine(text, className = 'output-line') {
  const line = document.createElement('div');
  line.className = className;
  line.textContent = text;
  output.appendChild(line);
}

function showProject(name) {
  const key = projectAliases[name.trim().toLowerCase()];
  if (!key) {
    printLine(`Unknown project: ${name}`);
    printLine("Try: project minilang | forgelang | ace | bitbox | parallel | codenexus");
    return;
  }
  const project = projects[key];
  printLine(`${project.name} · ${project.status}`, 'project-info-title');
  printLine(`  ${project.description}`);
  printLine(`  Stack: ${project.stack}`);
  printLine(`  Link: ${project.link}`);
}

function runCommand(raw) {
  const trimmed = raw.trim();
  const command = trimmed.toLowerCase();
  if (!trimmed) return;
  printLine(`$ ${trimmed}`, 'command-line');
  commandHistory.push(trimmed);
  historyIndex = commandHistory.length;

  if (command === 'clear') {
    output.innerHTML = '';
    return;
  }
  if (command === 'date') {
    printLine(new Date().toString());
  } else if (command === 'hello' || command === 'hi') {
    printLine('Hey! Welcome to the sandbox 👋');
    printLine("Type 'help' to see what you can explore.");
  } else if (command.startsWith('project ')) {
    showProject(trimmed.slice(8));
  } else if (commands[command]) {
    commands[command].forEach((line) => printLine(`• ${line}`));
  } else {
    printLine(`Command not found: ${trimmed}`);
    printLine("Type 'help' for available commands.");
  }
  const body = document.querySelector('#terminalBody');
  body.scrollTop = body.scrollHeight;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  runCommand(input.value);
  input.value = '';
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (!commandHistory.length) return;
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = commandHistory[historyIndex] || '';
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (!commandHistory.length) return;
    historyIndex = Math.min(commandHistory.length, historyIndex + 1);
    input.value = commandHistory[historyIndex] || '';
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    const value = input.value.trim().toLowerCase();
    const names = ['about', 'skills', 'projects', 'project ', 'experience', 'clubs', 'achievements', 'contact', 'whoami', 'ls', 'pwd', 'date', 'clear'];
    const match = names.find((name) => name.startsWith(value));
    if (match) input.value = match;
  }
  if (event.ctrlKey && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    output.innerHTML = '';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== input) {
    event.preventDefault();
    document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => input.focus(), 450);
  }
});

if (window.gsap) {
  gsap.from('.hero-copy > *', { y: 28, opacity: 0, duration: .75, stagger: .08, ease: 'power3.out' });
  gsap.from('.portrait-frame', { scale: .82, opacity: 0, rotationY: -18, duration: 1.1, ease: 'back.out(1.5)' });
  gsap.to('.orbit-one', { rotation: 338, duration: 18, repeat: -1, ease: 'none' });
  gsap.to('.orbit-two', { rotation: -332, duration: 24, repeat: -1, ease: 'none' });
  gsap.to('.chip-one', { y: -12, duration: 2.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.chip-two', { y: 10, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.chip-three', { x: 8, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  const skills = document.querySelectorAll('.skill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target.querySelector('em');
      gsap.to(bar, { width: `${entry.target.dataset.level}%`, duration: 1, ease: 'power2.out' });
      observer.unobserve(entry.target);
    });
  }, { threshold: .25 });
  skills.forEach((skill) => skillObserver.observe(skill));
}

window.addEventListener('pointermove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
  if (window.gsap && scene && portrait && window.innerWidth > 850 && !document.body.classList.contains('flat-mode')) {
    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    gsap.to(portrait, { rotateY: x * 16, rotateX: -y * 12, duration: .45, overwrite: true });
  }
});

sceneToggle.addEventListener('click', () => {
  document.body.classList.toggle('flat-mode');
  sceneToggle.textContent = document.body.classList.contains('flat-mode') ? '◉ FLAT MODE' : '◉ 3D MODE';
  if (window.gsap) gsap.to(portrait, { rotateX: 0, rotateY: 0, duration: .4 });
});
