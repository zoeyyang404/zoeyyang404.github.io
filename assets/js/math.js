// Keep the delimiters in sync with Goldmark's passthrough settings in hugo.yaml.
(() => {
  const article = document.querySelector('.post__body');
  if (!article) return;

  renderMathInElement(article, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
    throwOnError: false,
  });

  // Make long equations scrollable with a keyboard as well as touch.
  article.querySelectorAll('.katex-display').forEach((equation) => {
    equation.tabIndex = 0;
    equation.setAttribute('role', 'region');
    equation.setAttribute('aria-label', 'Equation');
  });
})();
