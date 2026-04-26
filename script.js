/* =========================
   NAVBAR — scroll, mobile menu, active link
   ========================= */
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navlinks = document.getElementById("navlinks");
const links = document.querySelectorAll(".navlinks a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // navbar shadow / shrink
  if (window.scrollY > 30) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  // active link based on scroll position
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
  });
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navlinks.classList.toggle("open");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Close mobile menu when clicking a link
links.forEach((link) =>
  link.addEventListener("click", () => {
    navlinks.classList.remove("open");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  }),
);

/* =========================
   TYPEWRITER — rotating roles
   ========================= */
const typewriterEl = document.getElementById("typewriter");
const roles = [
  "Full-Stack Developer",
  "CS Student",
  "Software developer",
  "Database Designer",
  "Network Engineer",
  "Penetration tester",
  "Problem Solver",
];

let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const current = roles[roleIndex];

  if (typing) {
    typewriterEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      typing = false;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, typing ? 90 : 45);
}
typeLoop();

/* =========================
   SCROLL REVEAL — animate elements as they enter
   ========================= */
const revealTargets = document.querySelectorAll(
  ".section-title, .service-card, .timeline-item, .exp-card, .skills-col, .home-content, .home-img, .contact-form",
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealTargets.forEach((el) => revealObserver.observe(el));

/* =========================
   SKILL BARS — animate fill on first view
   ========================= */
const bars = document.querySelectorAll(".bar .line");
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);
bars.forEach((bar) => barObserver.observe(bar));

/* =========================
   CONTACT FORM — friendly fake submit
   ========================= */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  status.textContent = "Sending your message...";
  status.style.color = "var(--muted)";

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent =
        "Thanks! Your message has been received. I'll get back to you soon.";
      status.style.color = "var(--primary)";
    } else {
      status.textContent =
        "Opps! Something went wrong.";
      status.style.color = "var(--primary)";
    }
  } catch (e) {
    status.textContent = "Network Error.";
    status.style.color = "red";
  }

  // setTimeout(() => {
  //   status.textContent =
  //     "Thanks! Your message has been received. I'll get back to you soon.";
  //   status.style.color = "var(--primary)";
  //   form.reset();
  // }
  // , 900);
});



/* =========================
   FOOTER YEAR
   ========================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
