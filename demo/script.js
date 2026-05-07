const form = document.querySelector("#leak-check-form");
const scoreEl = document.querySelector("#score");
const progressEl = document.querySelector("#score-progress");
const titleEl = document.querySelector("#result-title");
const copyEl = document.querySelector("#result-copy");
const priorityListEl = document.querySelector("#priority-list");
const breakdownEl = document.querySelector("#breakdown");

const categoryOrder = [
  "Google profile",
  "Maps visibility",
  "Pages",
  "Website health",
  "Call conversion"
];

function getResult(score) {
  if (score >= 82) {
    return {
      label: "strong",
      title: "Strong foundation. Now chase the gaps.",
      copy: "The basics are in place. The next wins usually come from better city coverage, stronger service pages, fresher reviews, and cleaner call tracking."
    };
  }

  if (score >= 58) {
    return {
      label: "leaking",
      title: "Some calls may be slipping away.",
      copy: "There is enough here to work with, but the unchecked items can hold back Google Maps visibility and make it easier for competitors to win calls."
    };
  }

  return {
    label: "urgent",
    title: "Your local SEO may be leaking calls.",
    copy: "Start with the basics closest to revenue: Google Business Profile, Maps visibility, service pages, city coverage, and tap-to-call paths."
  };
}

function getInputs() {
  return [...form.querySelectorAll("input[type='checkbox']")];
}

function calculateCategoryScores(inputs) {
  const scores = {};

  for (const category of categoryOrder) {
    scores[category] = { earned: 0, possible: 0 };
  }

  for (const input of inputs) {
    const category = input.dataset.category;
    const score = Number(input.dataset.score || 0);
    scores[category].possible += score;
    if (input.checked) scores[category].earned += score;
  }

  return scores;
}

function renderBreakdown(scores) {
  breakdownEl.innerHTML = categoryOrder.map((category) => {
    const item = scores[category];
    const percent = item.possible ? Math.round((item.earned / item.possible) * 100) : 0;
    return `
      <div>
        <span>${category}</span>
        <b>${percent}%</b>
        <i style="--bar:${percent}%"></i>
      </div>
    `;
  }).join("");
}

function renderPriorityList(inputs) {
  const missing = inputs
    .filter((input) => !input.checked)
    .sort((a, b) => Number(b.dataset.score || 0) - Number(a.dataset.score || 0))
    .slice(0, 5);

  if (!missing.length) {
    priorityListEl.innerHTML = "<li>Pressure-test rankings by city and service, then keep improving pages and reviews before competitors catch up.</li>";
    return;
  }

  priorityListEl.innerHTML = missing
    .map((input) => `<li>${input.dataset.fix}</li>`)
    .join("");
}

function updateScore() {
  const inputs = getInputs();
  const total = inputs.reduce((sum, input) => sum + Number(input.dataset.score || 0), 0);
  const earned = inputs.reduce((sum, input) => {
    return input.checked ? sum + Number(input.dataset.score || 0) : sum;
  }, 0);
  const score = total ? Math.round((earned / total) * 100) : 0;
  const result = getResult(score);
  const circumference = 327;

  scoreEl.textContent = `${score}%`;
  scoreEl.nextElementSibling.textContent = result.label;
  progressEl.style.strokeDashoffset = String(circumference - (circumference * score / 100));
  titleEl.textContent = result.title;
  copyEl.textContent = result.copy;

  const scores = calculateCategoryScores(inputs);
  renderBreakdown(scores);
  renderPriorityList(inputs);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateScore();
});

form.addEventListener("change", updateScore);
