/* Zaki 99 Property — interactions */
(function () {
  "use strict";
  var WA_NUMBER = "923712646881";

  /* Sticky nav shadow */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* Reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* Animated counters */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animateCount(e.target);
        cio.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-num").forEach(function (el) { cio.observe(el); });

  /* Contact form -> WhatsApp */
  var form = document.getElementById("contactForm");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = document.getElementById("cfName").value.trim();
    var phone = document.getElementById("cfPhone").value.trim();
    var topic = document.getElementById("cfTopic").value;
    var msg = document.getElementById("cfMsg").value.trim();
    var text = "Assalam-o-Alaikum! I am " + name + " (" + phone + "). " +
               "I am interested in: " + topic + ". " + (msg ? msg : "");
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
  });
})();
