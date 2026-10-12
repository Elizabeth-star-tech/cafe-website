(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const dotsBox = document.getElementById("slider-dots");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  const hero = document.getElementById("home");

  if (slides.length === 0 || !dotsBox || !prevBtn || !nextBtn) {
    return;
  }

  let current = 0;
  let timer = null;

  slides.forEach(function (slide, index) {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", "Show photo " + (index + 1));
    dot.addEventListener("click", function () {
      showSlide(index);
      restartTimer();
    });
    dotsBox.appendChild(dot);
  });

  const dots = dotsBox.querySelectorAll(".slider-dot");

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
  }

  function startTimer() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }
    timer = setInterval(function () {
      showSlide(current + 1);
    }, 5000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  prevBtn.addEventListener("click", function () {
    showSlide(current - 1);
    restartTimer();
  });

  nextBtn.addEventListener("click", function () {
    showSlide(current + 1);
    restartTimer();
  });

  hero.addEventListener("mouseenter", stopTimer);
  hero.addEventListener("mouseleave", startTimer);

  showSlide(0);
  startTimer();
})();