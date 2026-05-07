const phrases = [
  "I'm eager to learn and build cool things.",
  "I turn ideas into real projects.",
  "I'm looking for my first internship.",
  "I code, learn, repeat.",
];

const projects = [
  {
    title: "Personal Portfolio",
    description: "My first portfolio website built to practice web development.",
    longDescription:
      "A responsive personal website built with HTML, CSS, and JavaScript. This was my first project to learn the basics of web layout, styling, and interactivity.",
    image:
      "./assets/project1.png",
    tags: ["HTML", "CSS", "JavaScript"],
    category: ["Web"],
    liveUrl: "#",
    githubUrl: "https://github.com/Nangcoding/project_build_web_site",
  },
  {
    title: "Visual Company(VC1)",
    description: "The real project for VC1 did for PNC student stars for following students.",
    longDescription:
      "Awarded as a VC1 Student Star at PNC (Passerelles Numériques Cambodia), I responce role backend developer and QA, demonstrating strong commitment to learning, teamwork, and consistent academic performance in the foundation year",
    image:
      "./assets/project2.png",
    tags: ["React", "Node.js", "Redis", "Postman"],
    category: ["Web"],
    liveUrl: "#",
    githubUrl: "https://github.com/sapiia/pnc_student_star",
  },
  {
    title: "Loan Calculator",
    description: "A Loan calculator app built as a final Algorithm project.",
    longDescription:
      "A functional Loan Calculator with basic arithmetic operations. Built first with Python and later recreated on the web to practice DOM manipulation.",
    image:
      "./assets/project3.png",
    tags: ["Python", "JavaScript", "Flask"],
    category: ["School"],
    liveUrl: "#",
    githubUrl: "https://github.com/Nangcoding/Loan_calculator_Algorithm",
  },
  {
    title: "E-commerce Web site",
    description: "An E-commerce web site building for final JavaScript project",
    longDescription:
      "An E-commerce web site build for JavaScript project build for platform selling computer that have mant funtion. Havr many feature in the web site can allow customer order.",
    image:
      "./assets/project4.png",
    tags: ["HTML", "CSS", "JavaScript", "Locallfirebase"],
    category: ["School"],
    liveUrl: "#",
    githubUrl: "https://github.com/Nangcoding/E-comerce.project-js",
  },
  {
    title: "Form login",
    description: "The form login build for practice at school.",
    longDescription:
      "Small practice with the form login for register on web site that have button and flow of othentication",
    image:
      "./assets/project5.png",
    tags: ["HTML", "CSS", ],
    category: ["School"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "UX/UI Design",
    description: "The ux/ui desing figma with static web site and prototype. ",
    longDescription:
      "The ux/ui desing figma for the static web site with prototype and interact web site with the real example",
    image:
      "./assets/project6.png",
    tags: ["figma",],
    category: ["School"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const html = document.documentElement;
const header = document.getElementById("site-header");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const menuBackdrop = document.getElementById("menu-backdrop");
const typingText = document.getElementById("typing-text");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const projectsGrid = document.getElementById("projects-grid");
const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const modalLive = document.getElementById("modal-live");
const modalCode = document.getElementById("modal-code");
const contactForm = document.getElementById("contact-form");
const contactSubmit = document.getElementById("contact-submit");
const formSuccess = document.getElementById("form-success");
const year = document.getElementById("year");
const backToTop = document.getElementById("back-to-top");
const reveals = document.querySelectorAll(".reveal");
const skillItems = document.querySelectorAll(".skill-item");

let currentFilter = "All";
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function setTheme(mode) {
  if (mode === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  localStorage.setItem("portfolio-theme", mode);
}

function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));
}

function toggleTheme() {
  const nextTheme = html.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
}

function openMenu() {
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  mobileMenu.setAttribute("aria-hidden", "true");
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function typeLoop() {
  const phrase = phrases[phraseIndex];
  const delay = deleting ? 30 : 60;

  if (!deleting) {
    typingText.textContent = phrase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex > phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingText.textContent = phrase.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, delay);
}

function renderProjects() {
  const filteredProjects =
    currentFilter === "All"
      ? projects
      : projects.filter((project) => project.category.includes(currentFilter));

  projectsGrid.innerHTML = filteredProjects
    .map(
      (project) => `
        <article class="glass-card project-card reveal is-visible" data-project="${project.title}">
          <div class="project-card-image">
            <img src="${project.image}" alt="${project.title}" />
          </div>
          <div class="project-card-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tag-list small">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const selected = projects.find((project) => project.title === card.dataset.project);
      if (selected) {
        openProjectModal(selected);
      }
    });
  });
}

function updateFilters(button) {
  filterButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  currentFilter = button.dataset.filter;
  renderProjects();
}

function openProjectModal(project) {
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.longDescription;
  modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  modalLive.href = project.liveUrl;
  modalCode.href = project.githubUrl;
  projectModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  projectModal.hidden = true;
  document.body.style.overflow = "";
}

function initReveal() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((item) => revealObserver.observe(item));
}

function initSkillBars() {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level");
          const fill = entry.target.querySelector(".skill-bar span");
          if (fill) {
            fill.style.width = `${level}%`;
          }
        }
      });
    },
    { threshold: 0.45 }
  );

  skillItems.forEach((item) => skillObserver.observe(item));
}

function initContactForm() {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactSubmit.textContent = "Sending...";
    contactSubmit.disabled = true;

    setTimeout(() => {
      contactSubmit.textContent = "Send Message";
      contactSubmit.disabled = false;
      formSuccess.hidden = false;
      contactForm.reset();
    }, 1200);
  });
}

function bindEvents() {
  themeToggle.addEventListener("click", toggleTheme);
  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuBackdrop.addEventListener("click", closeMenu);
  window.addEventListener("scroll", updateHeader, { passive: true });
  filterButtons.forEach((button) =>
    button.addEventListener("click", () => updateFilters(button))
  );
  modalClose.addEventListener("click", closeProjectModal);
  projectModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true") {
      closeProjectModal();
    }
  });
  document.querySelectorAll(".mobile-nav a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function init() {
  initTheme();
  updateHeader();
  renderProjects();
  initReveal();
  initSkillBars();
  initContactForm();
  bindEvents();
  typeLoop();
  year.textContent = new Date().getFullYear();
}

init();
