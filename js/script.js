(function () {
  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
      });
    });
  }

  // ---------- Dark mode ----------
  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
  }

  applyTheme(localStorage.getItem("theme"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  // ---------- Gallery lightbox ----------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll(".gallery-grid img").forEach(function (img) {
      img.addEventListener("click", function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.hidden = false;
      });
    });

    lightboxClose.addEventListener("click", function () {
      lightbox.hidden = true;
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.hidden = true;
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        lightbox.hidden = true;
      }
    });
  }

  // ---------- Reservation form ----------
  const reservationForm = document.getElementById("reservation-form");

  if (reservationForm) {
    const reservationSuccess = document.getElementById("reservation-success");
    const resDate = document.getElementById("res-date");
    const todayDate = new Date().toISOString().split("T")[0];
    resDate.min = todayDate;

    function setResError(id, message) {
      document.getElementById(id + "-error").textContent = message;
    }

    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      reservationForm.querySelectorAll(".error").forEach(function (el) {
        el.textContent = "";
      });
      reservationSuccess.hidden = true;

      const name = document.getElementById("res-name").value.trim();
      const phone = document.getElementById("res-phone").value.trim();
      const email = document.getElementById("res-email").value.trim();
      const date = resDate.value;
      const time = document.getElementById("res-time").value;
      const guests = document.getElementById("res-guests").value;

      let isValid = true;

      if (name.length < 3) {
        setResError("res-name", "Please enter your full name (at least 3 letters).");
        isValid = false;
      }

      if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
        setResError("res-phone", "Enter a valid phone number (10 to 15 digits).");
        isValid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setResError("res-email", "Enter a valid email address.");
        isValid = false;
      }

      if (date === "") {
        setResError("res-date", "Choose a date.");
        isValid = false;
      } else if (date < todayDate) {
        setResError("res-date", "The date cannot be in the past.");
        isValid = false;
      }

      if (time === "") {
        setResError("res-time", "Choose a time.");
        isValid = false;
      } else if (time < "07:00" || time > "21:00") {
        setResError("res-time", "We are open from 7:00 AM to 9:00 PM.");
        isValid = false;
      } else if (date === todayDate) {
        const now = new Date();
        const currentTime =
          String(now.getHours()).padStart(2, "0") + ":" +
          String(now.getMinutes()).padStart(2, "0");
        if (time <= currentTime) {
          setResError("res-time", "That time has already passed today.");
          isValid = false;
        }
      }

      if (guests === "") {
        setResError("res-guests", "Choose the number of guests.");
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      reservationSuccess.textContent =
        "Thank you, " + name + "! We have received your request for " +
        new Date(date).toDateString() + " at " + time +
        ". We will confirm by phone or email shortly.";
      reservationSuccess.hidden = false;
      reservationForm.reset();
    });
  }

  // ---------- Scroll reveal ----------
  const revealItems = document.querySelectorAll(
    "#about .about-point, .testimonial, .gallery-grid img"
  );

  revealItems.forEach(function (item) {
    item.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
})();