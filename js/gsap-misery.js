// =====================================================================
// GSAP-MISÈRE — professionele animatiesoftware, onprofessioneel ingezet.
// GSAP is een prachtige library. Wat wij ermee doen is dat niet.
// Alles hier degradeert netjes: geen gsap = gewoon de oude ellende.
// =====================================================================

(function () {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  // ------------------------------------------------ de titel: elke letter zweeft zelf
  // De WordArt-titel wordt per letter opgeknipt zodat elke letter
  // onafhankelijk kan dobberen. Leesbaarheid was toch al opgegeven.
  const title = document.querySelector(".wordart");
  if (title) {
    title.innerHTML = title.innerHTML
      .split(/(<br\s*\/?>)/i)
      .map((part) =>
        /^<br/i.test(part)
          ? part
          : part.replace(/\S/g, '<span class="ga-letter" style="display:inline-block">$&</span>')
      )
      .join("");
    gsap.to(".ga-letter", {
      y: () => gsap.utils.random(-14, 14),
      rotation: () => gsap.utils.random(-20, 20),
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      stagger: { each: 0.08, from: "random" },
    });
  }

  // ------------------------------------------------ secondenblok: elastische dreun per tik
  const secsEl = document.getElementById("cd-secs");
  if (secsEl) {
    const secsBlock = secsEl.closest(".time-block");
    new MutationObserver(() => {
      gsap.fromTo(
        secsBlock,
        { scale: 1.35, rotation: gsap.utils.random(-8, 8) },
        { scale: 1, rotation: 0, duration: 0.9, ease: "elastic.out(1, 0.3)" }
      );
    }).observe(secsEl, { childList: true });
  }

  // ------------------------------------------------ foto's: ademen en langzaam scheefzakken
  gsap.utils.toArray("#photo-grid img").forEach((img, i) => {
    gsap.to(img, {
      rotation: () => gsap.utils.random(-6, 6),
      scale: () => gsap.utils.random(0.96, 1.05),
      duration: gsap.utils.random(2, 4),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      delay: i * 0.1,
    });
  });

  // ------------------------------------------------ secties draaien binnen bij het scrollen
  if (typeof ScrollTrigger !== "undefined") {
    gsap.utils.toArray(".content-box").forEach((box, i) => {
      gsap.from(box, {
        rotation: i % 2 ? 14 : -14,
        skewX: i % 2 ? -8 : 8,
        scale: 0.7,
        opacity: 0.2,
        duration: 0.9,
        ease: "back.out(2.5)",
        scrollTrigger: { trigger: box, start: "top 88%" },
      });
    });
  }

  // ------------------------------------------------ de toeter-knop vlucht (soepel, dat wel)
  const horn = document.getElementById("btn-horn");
  if (horn) {
    let fled = 0;
    horn.addEventListener("mouseenter", () => {
      if (fled >= 3) return; // daarna heeft hij vrede met zijn lot
      fled++;
      gsap.to(horn, {
        x: gsap.utils.random(-120, 120),
        y: gsap.utils.random(-40, 40),
        rotation: gsap.utils.random(-25, 25),
        duration: 0.35,
        ease: "power3.out",
        onComplete: fled >= 3
          ? () => gsap.to(horn, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "elastic.out(1,0.4)" })
          : undefined,
      });
    });
  }

  // ------------------------------------------------ popup: elastische binnenkomst
  const popup = document.getElementById("popup-ad");
  if (popup) {
    new MutationObserver(() => {
      if (!popup.classList.contains("hidden")) {
        gsap.from(popup, {
          y: -600,
          rotation: 25,
          duration: 1.1,
          ease: "bounce.out",
        });
      }
    }).observe(popup, { attributes: true, attributeFilter: ["class"] });
  }

  // ------------------------------------------------ de gremlin: elke 15s doet een
  // willekeurig element een rondje. Geen reden. Geen waarschuwing.
  const GREMLIN_TARGETS = [
    ".counter-box", ".badge", ".btn", ".stat", ".sponsors li",
    ".nav-list li", ".time-block", "#mt-knob", ".wisdom",
  ];
  setInterval(() => {
    const pool = document.querySelectorAll(GREMLIN_TARGETS.join(","));
    if (!pool.length) return;
    const victim = pool[Math.floor(Math.random() * pool.length)];
    gsap.fromTo(victim,
      { rotation: 0 },
      { rotation: 360, duration: 1.4, ease: "elastic.out(0.8, 0.3)" }
    );
  }, 15000);

  // ------------------------------------------------ epische modus: gsap doet er een schep bovenop
  const epicBtn = document.getElementById("btn-epic");
  if (epicBtn) {
    epicBtn.addEventListener("click", () => {
      if (!document.body.classList.contains("epic-mode")) return;
      gsap.fromTo(".content-box",
        { scale: 0.9 },
        {
          scale: 1,
          rotation: () => gsap.utils.random(-3, 3),
          duration: 0.5,
          ease: "elastic.out(1.2, 0.2)",
          stagger: { each: 0.05, from: "random" },
        }
      );
    });
  }
})();
