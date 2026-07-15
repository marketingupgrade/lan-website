// =====================================================================
// IS HET AL TIJD VOOR DE LAN?! — hoofdscript
// Bevat: countdown, leugenachtige statistieken, hype-o-meter,
// toeter (WebAudio), wijsheden, popup, cursor trail, konami code.
// =====================================================================

// ---------------------------------------------------------------- utils
const $ = (id) => document.getElementById(id);
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pad = (n) => String(n).padStart(2, "0");

// ---------------------------------------------------------------- countdown
const MS_PER_DAY = 86400000;

function updateCountdown() {
  const now = new Date();
  const { start } = getLanDates();
  const diff = start - now;

  if (diff <= 0) {
    itIsLanTime();
    return;
  }

  const days = Math.floor(diff / MS_PER_DAY);
  const hours = Math.floor((diff % MS_PER_DAY) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  $("cd-days").textContent = days;
  $("cd-hours").textContent = pad(hours);
  $("cd-mins").textContent = pad(mins);
  $("cd-secs").textContent = pad(secs);
}

$("countdown-date").textContent =
  "☞ de grote dag: " +
  getLanDates().start.toLocaleDateString("nl-NL", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }) +
  " om " +
  getLanDates().start.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }) +
  " (zoals ALTIJD, want de LAN is ALTIJD op 28 december) ☜";

let lanTimeStarted = false;
function itIsLanTime() {
  if (lanTimeStarted) return;
  lanTimeStarted = true;
  $("the-answer").textContent = "JA!!!";
  $("answer-sub").textContent = "EINDELIJK. START DE MACHINES.";
  $("lan-time-overlay").classList.remove("hidden");
  document.body.classList.add("epic-mode");
  ["cd-days", "cd-hours", "cd-mins", "cd-secs"].forEach((id) => ($(id).textContent = "0"));
  // overlay wegklikken mag, het feest blijft
  $("lan-time-overlay").addEventListener("click", () =>
    $("lan-time-overlay").classList.add("hidden")
  );
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------------------------------------------------------------- statistieken
// Wetenschappelijk verantwoord: elke berekening slaat nergens op.
function renderStats() {
  const diff = Math.max(0, getLanDates().start - new Date());
  const days = diff / MS_PER_DAY;

  const stats = [
    { label: "nachtjes slapen (mits je slaapt)", value: Math.ceil(days) },
    { label: "pizza's die je nog kunt eten tot die tijd", value: Math.floor(days * 2.5) },
    { label: "energiedrankjes tot de LAN (aanbevolen dosis: nee)", value: Math.floor(days * 3.14) },
    { label: "keer dat iemand 'werkt de switch al?' gaat vragen", value: Math.floor(days * 0.8) + 12 },
    { label: "meter netwerkkabel die niemand gaat opruimen", value: Math.floor(days * 4.2) },
    { label: "procent kans dat iemand z'n voeding vergeet", value: 100 },
    { label: "overgebleven kerstkransjes die als LAN-brandstof dienen", value: Math.floor(days * 1.5) + 40 },
  ];

  $("stats-grid").innerHTML = stats
    .map((s) => `<div class="stat"><b>${s.value.toLocaleString("nl-NL")}</b><br>${s.label}</div>`)
    .join("");
}
renderStats();
setInterval(renderStats, 60000);

// ---------------------------------------------------------------- ticker
const TICKER_MESSAGES = [
  "⬅️ deze tekst stuitert omdat het kan ➡️",
  "🍕 nieuws: de pizzabudget-onderhandelingen zijn vastgelopen 🍕",
  "🖱️ gerucht: iemand neemt een BOL-muis mee. een BOL. MUIS. 🖱️",
  "📡 de wifi wordt uitgezet want ECHTE gamers gebruiken KABELS 📡",
  "💾 vergeet niet te saven (dit slaat nergens op maar toch) 💾",
  "🧊 de koelkast is al aan het voorkoelen. respect voor de koelkast. 🧊",
];
setInterval(() => { $("ticker").firstElementChild
  ? ($("ticker").firstElementChild.textContent = rand(TICKER_MESSAGES))
  : ($("ticker").textContent = rand(TICKER_MESSAGES));
}, 6000);

// ---------------------------------------------------------------- bezoekersteller (liegt)
function updateVisitorCounter() {
  const fake = 4877234 + Math.floor((Date.now() / 1000) % 100000);
  $("visitor-counter").textContent = String(fake).padStart(7, "0");
}
updateVisitorCounter();
setInterval(updateVisitorCounter, 3000);

// ---------------------------------------------------------------- hype-o-meter
const HYPE_KEY = "lan-hype-level";
let hype = parseInt(localStorage.getItem(HYPE_KEY) || "0", 10);

const HYPE_STATUSES = [
  [0,  "hype niveau: verdacht rustig..."],
  [10, "hype niveau: er borrelt iets"],
  [30, "hype niveau: buurman heeft er al last van"],
  [50, "hype niveau: KRITIEK (positief bedoeld)"],
  [75, "hype niveau: de RAM-latjes trillen ervan"],
  [95, "hype niveau: MAXIMAAL. dokters staan versteld."],
];

function renderHype() {
  const pct = Math.min(100, hype);
  $("hype-bar").style.width = pct + "%";
  $("hype-pct").textContent = pct + "%";
  const status = HYPE_STATUSES.filter(([min]) => pct >= min).pop();
  $("hype-status").textContent = status[1];
  if (pct >= 100) document.body.classList.add("epic-mode");
}
renderHype();

$("btn-hype").addEventListener("click", () => {
  hype = Math.min(100, hype + 1);
  localStorage.setItem(HYPE_KEY, String(hype));
  renderHype();
  blip(300 + hype * 8);
  spawnTrail(innerWidth / 2 + (Math.random() - 0.5) * 200, innerHeight / 2, "🔥");
});

// ---------------------------------------------------------------- geluid (WebAudio, geen bestanden nodig)
let audioCtx = null;
function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function blip(freq) {
  const ac = ctx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.08, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.15);
}

// De Toeter des Oordeels: drie detuned zaagtanden die omhoog glijden.
function airhorn() {
  const ac = ctx();
  const now = ac.currentTime;
  [0, 3, -5].forEach((detune) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sawtooth";
    osc.detune.value = detune * 10;
    osc.frequency.setValueAtTime(392, now);
    osc.frequency.setValueAtTime(392, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(466, now + 0.22);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.setValueAtTime(0.12, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    osc.connect(gain).connect(ac.destination);
    osc.start(now);
    osc.stop(now + 1.4);
  });
}

$("btn-horn").addEventListener("click", () => {
  airhorn();
  for (let i = 0; i < 12; i++) {
    setTimeout(
      () => spawnTrail(Math.random() * innerWidth, Math.random() * innerHeight, "🎺"),
      i * 60
    );
  }
});

// ---------------------------------------------------------------- epische modus
$("btn-epic").addEventListener("click", () => {
  document.body.classList.toggle("epic-mode");
  blip(150);
});

// ---------------------------------------------------------------- wijsheden
const WISDOMS = [
  '"Wie zijn kabel vergeet, is gedoemd tot wifi."',
  '"Een LAN zonder pizza is slechts een vergadering."',
  '"Ping is tijdelijk, glorie is voor altijd."',
  '"Hij die het verlengsnoer beheert, beheert de wereld."',
  '"Slaap is een minigame die niemand speelt."',
  '"Eerst de switch, dan de vragen."',
  '"Een echte gamer blaast nog steeds in dingen. Voor de zekerheid."',
  '"De laatste 1% van de download duurt 40% van je leven."',
  '"Wie het laatst lacht heeft de laagste ping."',
  '"Breng een extra netwerkkabel mee. Niet voor jezelf. Voor Kevin."',
];
$("btn-wisdom").addEventListener("click", () => {
  let next = rand(WISDOMS);
  while (next === $("wisdom").textContent && WISDOMS.length > 1) next = rand(WISDOMS);
  $("wisdom").textContent = next;
  blip(600);
});

// ---------------------------------------------------------------- foto's
function renderPhotos() {
  const grid = $("photo-grid");
  if (typeof PHOTOS !== "undefined" && PHOTOS.length > 0) {
    grid.innerHTML = PHOTOS.map(
      (src) => `<img src="${src}" alt="Bewijsmateriaal van een vorige LAN" loading="lazy">`
    ).join("");
    return;
  }
  const placeholders = [
    ["📷", "foto's worden nog in beslag genomen door justitie"],
    ["🕵️", "deze foto is geheim (hij bestaat niet)"],
    ["🍕", "hier stond een pizza. de pizza is op."],
    ["🖥️", "foto van een pc (stel je voor)"],
    ["😴", "iemand die om 06:00 'nog even 1 potje' zei"],
    ["🔌", "kabelspaghetti (artistieke impressie)"],
  ];
  grid.innerHTML = placeholders
    .map(([emoji, text]) => `<div class="photo-placeholder"><span class="big">${emoji}</span>${text}</div>`)
    .join("");
}
renderPhotos();

// ---------------------------------------------------------------- popup "advertentie"
// De sluitknop ontwijkt je cursor twee keer. Daarna mag het. Genade bestaat.
setTimeout(() => $("popup-ad").classList.remove("hidden"), 4000);
let closeDodges = 0;
$("popup-close").addEventListener("mouseenter", () => {
  if (closeDodges < 2) {
    closeDodges++;
    const ad = $("popup-ad");
    ad.style.top = 10 + Math.random() * 60 + "%";
    ad.style.left = 20 + Math.random() * 60 + "%";
  }
});
$("popup-close").addEventListener("click", () => $("popup-ad").classList.add("hidden"));
$("popup-claim").addEventListener("click", () => {
  $("popup-ad").querySelector(".popup-body").innerHTML =
    '<p class="blink">⏳ prijs wordt verwerkt...</p><p class="fine-print">geschatte wachttijd: tot de LAN</p>';
});

// ---------------------------------------------------------------- cursor trail
const TRAIL_EMOJI = ["✨", "💾", "🖱️", "⭐", "🔥"];
let lastTrail = 0;
function spawnTrail(x, y, emoji) {
  const p = document.createElement("div");
  p.className = "trail-particle";
  p.textContent = emoji || rand(TRAIL_EMOJI);
  p.style.left = x + "px";
  p.style.top = y + "px";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 900);
}
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrail > 70) {
    lastTrail = now;
    spawnTrail(e.clientX, e.clientY);
  }
});

// ---------------------------------------------------------------- cookie banner uit de hel
// "accepteer te weigeren" is de juiste knop. Uiteraard.
$("cookie-wrong").addEventListener("click", () => {
  const banner = $("cookie-banner");
  banner.classList.toggle("flipped");
  banner.querySelector("p").textContent =
    "🍪 Verkeerde knop. De banner staat nu op z'n kop. Dat is jouw schuld.";
  blip(120);
});
$("cookie-right").addEventListener("click", () => {
  $("cookie-banner").remove();
  blip(800);
});

// ---------------------------------------------------------------- "ben je er nog?" interrupt
// Verschijnt periodiek. Beide knoppen betekenen hetzelfde. Zo hoort dat.
function showStillHere() {
  $("stillhere-modal").classList.remove("hidden");
  blip(200);
}
setInterval(showStillHere, 45000);
["stillhere-ja", "stillhere-ja2"].forEach((id) =>
  $(id).addEventListener("click", () => $("stillhere-modal").classList.add("hidden"))
);

// ---------------------------------------------------------------- AANMELDFORMULIER (gecondoleerd)

// Naam bouwen via dropdown, één letter per keer. De letters staan
// uiteraard NIET op alfabetische volgorde, en husselen na elke keuze.
const ALPHABET = "abcdefghijklmnopqrstuvwxyz -".split("");
let builtName = "";

function shuffleLetters() {
  const picker = $("letter-picker");
  const shuffled = [...ALPHABET].sort(() => Math.random() - 0.5);
  picker.innerHTML =
    '<option value="">-- kies letter --</option>' +
    shuffled.map((l) => `<option value="${l}">${l === " " ? "(spatie)" : l}</option>`).join("");
}
shuffleLetters();

function renderName() {
  $("name-preview").textContent = builtName || "_";
}

$("btn-add-letter").addEventListener("click", () => {
  const letter = $("letter-picker").value;
  if (!letter) return;
  builtName += letter;
  // Elke 4e letter wordt er stiekem eentje verwijderd. Kwaliteitscontrole.
  if (builtName.length % 4 === 0) {
    const idx = Math.floor(Math.random() * builtName.length);
    builtName = builtName.slice(0, idx) + builtName.slice(idx + 1);
    $("signup-result").textContent = "⚠️ er is een letter weggevallen (netwerkfout, waarschijnlijk)";
  }
  renderName();
  shuffleLetters();
  blip(500);
});

$("btn-reset-name").addEventListener("click", () => {
  builtName = "";
  renderName();
  $("signup-result").textContent = "";
});

// Pizza-slider: omgekeerd (rtl in CSS) én in Romeinse cijfers.
function toRoman(n) {
  if (n === 0) return "N (nul)";
  const table = [[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let out = "";
  for (const [v, s] of table) while (n >= v) { out += s; n -= v; }
  return out;
}
$("pizza-slider").addEventListener("input", (e) => {
  $("pizza-readout").textContent = "Gekozen: " + toRoman(parseInt(e.target.value, 10));
});

// De verplichte dubbele-ontkenning-checkbox vinkt zichzelf af en toe uit.
setInterval(() => {
  if ($("chk-double-negative").checked && Math.random() < 0.3) {
    $("chk-double-negative").checked = false;
    $("signup-result").textContent = "⚠️ je instemming is verlopen. graag opnieuw niet NIET instemmen.";
  }
}, 20000);

// De knoppen wisselen van plaats zodra je de submit nadert (max 3x, we zijn geen monsters).
let swapCount = 0;
$("btn-submit").addEventListener("mouseenter", () => {
  if (swapCount < 3) {
    swapCount++;
    const row = $("btn-submit").parentElement;
    row.insertBefore($("btn-cancel"), $("btn-submit"));
    if (swapCount === 3)
      $("signup-result").textContent = "oké, de knoppen blijven nu staan. beloofd.";
  }
});

$("btn-cancel").addEventListener("click", () => {
  builtName = "";
  renderName();
  $("pizza-slider").value = 0;
  $("pizza-readout").textContent = "Gekozen: N (nul)";
  $("chk-double-negative").checked = false;
  $("captcha-input").value = "";
  $("signup-result").textContent = "💥 alles gewist. dat wilde je toch? de knop was zo mooi groen.";
  blip(100);
});

$("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const result = $("signup-result");

  if (!builtName.trim()) {
    result.textContent = "❌ geen naam. gebruik de dropdown zoals een beschaafd mens.";
    return;
  }
  if (!$("chk-double-negative").checked) {
    result.textContent = "❌ je hebt niet niet NIET ingestemd. of wel. vink het vakje aan.";
    return;
  }
  if ($("captcha-input").value.trim().toLowerCase() !== "veertien") {
    result.textContent = "❌ anti-NPC verificatie mislukt. een NPC dus. jammer.";
    return;
  }

  // Alles goed? Dan nu: de nepvoortgangsbalk die op 99% terugvalt. Eén keer.
  let pct = 0;
  let fellBack = false;
  result.textContent = "⏳ aanmelden... 0%";
  const iv = setInterval(() => {
    pct += Math.floor(Math.random() * 9) + 3;
    if (pct >= 99 && !fellBack) {
      fellBack = true;
      pct = 12;
      result.textContent = "⏳ aanmelden... 99% ...oeps. 12%. sorry.";
      return;
    }
    if (pct >= 100) {
      clearInterval(iv);
      result.innerHTML = `🎉 GEFELICITEERD <b>${builtName.toUpperCase()}</b>!! je bent aangemeld!! (dit formulier slaat niets op, neem gewoon je pc mee)`;
      airhorn();
      return;
    }
    result.textContent = `⏳ aanmelden... ${pct}%`;
  }, 350);
});

// ---------------------------------------------------------------- konami code
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let konamiPos = 0;
document.addEventListener("keydown", (e) => {
  konamiPos = e.key === KONAMI[konamiPos] ? konamiPos + 1 : (e.key === KONAMI[0] ? 1 : 0);
  if (konamiPos === KONAMI.length) {
    konamiPos = 0;
    document.body.classList.add("epic-mode");
    hype = 100;
    localStorage.setItem(HYPE_KEY, "100");
    renderHype();
    airhorn();
    $("answer-sub").textContent = "⭐ LEGENDE GEDETECTEERD. HYPE GEMAXIMALISEERD. ⭐";
  }
});
