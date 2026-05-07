const form = document.querySelector("#leak-check-form");
const scoreEl = document.querySelector("#score");
const titleEl = document.querySelector("#result-title");
const copyEl = document.querySelector("#result-copy");

function getResult(score) {
  if (score >= 80) {
    return {
      title: "Strong foundation. Keep pressure-testing.",
      copy: "Your setup has many of the right pieces. The next opportunity is usually improving city pages, service pages, review depth, and call tracking."
    };
  }

  if (score >= 50) {
    return {
      title: "Some calls may be slipping away.",
      copy: "You have part of the system in place, but there are likely leaks in Maps visibility, service-area coverage, or page structure that competitors can use against you."
    };
  }

  return {
    title: "Your local SEO may be leaking calls.",
    copy: "Missing basics can keep a plumbing company buried on Google. Start with your Google profile, service pages, service-area pages, reviews, and tap-to-call paths."
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const checked = [...form.querySelectorAll("input[type='checkbox']:checked")];
  const score = checked.reduce((total, input) => total + Number(input.dataset.score || 0), 0);
  const result = getResult(score);

  scoreEl.textContent = `${score}%`;
  titleEl.textContent = result.title;
  copyEl.textContent = result.copy;
});
