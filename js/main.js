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
  " t/m 30 december (zoals ALTIJD, want de LAN is ALTIJD van 28 t/m 30 december) ☜";

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
      (src, i) =>
        `<img src="${src}" alt="Bewijsmateriaal van een vorige LAN" loading="lazy" data-idx="${i}" title="klik voor DE MONTAGE">`
    ).join("");
    grid.querySelectorAll("img").forEach((img) =>
      img.addEventListener("click", () => startMontage(parseInt(img.dataset.idx, 10)))
    );
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

// ================================================================
// DE MONTAGE — Miami Vice, maar dan een kelder in Nederland.
// Crossfades, Ken Burns, VHS-timestamp en een volledig
// gesynthetiseerde synthwave-soundtrack. Geen mp3's. Alleen wiskunde.
// ================================================================

const MONTAGE_CAPTIONS = [
  "DE MANNEN. DE MACHINES. DE MELKZUUR.",
  "ZE KWAMEN VOOR DE GAMES. ZE BLEVEN VOOR DE KABELS.",
  "RENDEZ-VOUS OM MIDDERNACHT. EN OM 03:00. EN OM 05:30.",
  "GEEN GENADE. WEL BITTERBALLEN.",
  "ÉÉN HUIS. ZES HELDEN. NUL SLAAP.",
  "DE PING WAS LAAG. DE INZET WAS HOOG.",
  "SOMMIGE LEGENDES DRAGEN CAPES. DEZE DRAGEN KOPTELEFOONS.",
  "28 DECEMBER. ELK JAAR. VOOR ALTIJD.",
  "ER WERD GELACHEN. ER WERD VERLOREN. ER WERD GERAGEQUIT.",
  "DE KOELKAST HEEFT ALLES GEZIEN.",
  "BROEDERS IN DE STRIJD. VIJANDEN IN DE GAME.",
  "GEBOREN OM TE FRAGGEN. GEDWONGEN OM TE WERKEN.",
];

const montageEl = $("montage");
const imgA = $("montage-img-a");
const imgB = $("montage-img-b");
let montageIdx = 0;
let montageTimer = null;
let montageClockTimer = null;
let activeImg = null; // wisselt tussen imgA en imgB voor de crossfade

function montagePhotos() {
  return typeof PHOTOS !== "undefined" && PHOTOS.length ? PHOTOS : null;
}

function showMontageSlide(idx) {
  const photos = montagePhotos();
  if (!photos) return;
  montageIdx = ((idx % photos.length) + photos.length) % photos.length;

  const incoming = activeImg === imgA ? imgB : imgA;
  const outgoing = activeImg;
  activeImg = incoming;

  incoming.src = photos[montageIdx];
  incoming.classList.remove("kenburns-a", "kenburns-b", "visible");
  void incoming.offsetWidth; // herstart de ken burns animatie
  incoming.classList.add(montageIdx % 2 ? "kenburns-b" : "kenburns-a", "visible");
  if (outgoing) outgoing.classList.remove("visible");

  $("montage-caption").textContent = rand(MONTAGE_CAPTIONS);
}

function updateVhsClock() {
  const now = new Date();
  // het jaar is uiteraard 1987. de rest van de klok loopt gewoon echt.
  $("vhs-timestamp").textContent =
    `28.12.1987 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function startMontage(startIdx = 0) {
  montageEl.classList.remove("hidden");
  activeImg = null;
  showMontageSlide(startIdx);
  montageTimer = setInterval(() => showMontageSlide(montageIdx + 1), 4600);
  updateVhsClock();
  montageClockTimer = setInterval(updateVhsClock, 1000);
  startSynthwave();
}

function stopMontage() {
  montageEl.classList.add("hidden");
  clearInterval(montageTimer);
  clearInterval(montageClockTimer);
  stopSynthwave();
}

$("btn-montage").addEventListener("click", () => {
  if (!montagePhotos()) {
    $("btn-montage").innerHTML = "🌴 GEEN FOTO'S = GEEN MONTAGE 🌴<br><small>(de placeholders verdienen dit niet)</small>";
    return;
  }
  startMontage(0);
});
$("montage-close").addEventListener("click", stopMontage);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !montageEl.classList.contains("hidden")) stopMontage();
});

// ---------------------------------------------------------------- synthwave soundtrack
// Een klein sequencertje: kick, snare (ruis), hihat, sawtooth-bas
// en een zweverige pad. 100% WebAudio, 0% Spotify.
let swTimer = null;
let swMaster = null;
let swStep = 0;

const SW_TEMPO = 104;
const SW_STEP_SEC = 60 / SW_TEMPO / 2; // achtste noten
// A-mineur verdriet, zoals het hoort: Am - F - C - G (basnoten per maat)
const SW_BASSLINE = [55.0, 55.0, 43.65, 43.65, 65.41, 65.41, 49.0, 49.0];

function swKick(ac, t) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.frequency.setValueAtTime(140, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
  g.gain.setValueAtTime(0.5, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  osc.connect(g).connect(swMaster);
  osc.start(t); osc.stop(t + 0.25);
}

function swSnare(ac, t) {
  const len = 0.18;
  const buf = ac.createBuffer(1, ac.sampleRate * len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = ac.createBufferSource();
  src.buffer = buf;
  const bp = ac.createBiquadFilter();
  bp.type = "highpass"; bp.frequency.value = 1800;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.32, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + len);
  src.connect(bp).connect(g).connect(swMaster);
  src.start(t);
}

function swHat(ac, t) {
  const len = 0.05;
  const buf = ac.createBuffer(1, ac.sampleRate * len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const hp = ac.createBiquadFilter();
  hp.type = "highpass"; hp.frequency.value = 8000;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.08, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + len);
  src.connect(hp).connect(g).connect(swMaster);
  src.start(t);
}

function swBass(ac, t, freq) {
  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.exponentialRampToValueAtTime(200, t + SW_STEP_SEC);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.22, t);
  g.gain.exponentialRampToValueAtTime(0.02, t + SW_STEP_SEC * 0.95);
  osc.connect(lp).connect(g).connect(swMaster);
  osc.start(t); osc.stop(t + SW_STEP_SEC);
}

function swPad(ac, t, root) {
  // klein akkoordje (grondtoon + kwint + octaaf), heel zachtjes, heel 1987
  [1, 1.5, 2].forEach((ratio) => {
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = root * 2 * ratio;
    osc.detune.value = (Math.random() - 0.5) * 12;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.4);
    g.gain.linearRampToValueAtTime(0.0, t + SW_STEP_SEC * 4);
    osc.connect(g).connect(swMaster);
    osc.start(t); osc.stop(t + SW_STEP_SEC * 4);
  });
}

function startSynthwave() {
  const ac = ctx();
  if (ac.state === "suspended") ac.resume();
  swMaster = ac.createGain();
  swMaster.gain.value = 0.9;
  swMaster.connect(ac.destination);
  swStep = 0;
  let nextTime = ac.currentTime + 0.1;

  swTimer = setInterval(() => {
    // plan vooruit zolang we binnen 0.3s van de volgende stap zitten
    while (nextTime < ac.currentTime + 0.3) {
      const stepInBar = swStep % 8;
      const bass = SW_BASSLINE[swStep % SW_BASSLINE.length];
      if (stepInBar % 2 === 0) swKick(ac, nextTime);
      if (stepInBar === 2 || stepInBar === 6) swSnare(ac, nextTime);
      swHat(ac, nextTime + SW_STEP_SEC / 2);
      swBass(ac, nextTime, bass);
      if (stepInBar === 0) swPad(ac, nextTime, bass);
      nextTime += SW_STEP_SEC;
      swStep++;
    }
  }, 25);
}

function stopSynthwave() {
  clearInterval(swTimer);
  if (swMaster) {
    const ac = ctx();
    swMaster.gain.setTargetAtTime(0, ac.currentTime, 0.15);
    const dying = swMaster;
    setTimeout(() => dying.disconnect(), 800);
    swMaster = null;
  }
}

// ---------------------------------------------------------------- popup-budget
// Na 2 popups is de grap klaar. Comedy is timing.
let popupBudget = 2;
function spendPopup() {
  if (popupBudget <= 0) return false;
  popupBudget--;
  return true;
}

// ---------------------------------------------------------------- popup "advertentie"
// De sluitknop ontwijkt je cursor twee keer. Daarna mag het. Genade bestaat.
setTimeout(() => { if (spendPopup()) $("popup-ad").classList.remove("hidden"); }, 4000);
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
// Verschijnt één keer (het popup-budget is heilig). Beide knoppen
// betekenen hetzelfde. Zo hoort dat.
const stillHereTimer = setInterval(() => {
  if (!spendPopup()) {
    clearInterval(stillHereTimer);
    return;
  }
  $("stillhere-modal").classList.remove("hidden");
  blip(200);
}, 45000);
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

// ================================================================
// HET JAAR-OP-JAAR KLASSEMENT — alle data, nul leesbaarheid.
// Jaar kiezen via een scrollende marquee (timing is een skill),
// posities in binair, scores in foute romeinse cijfers, en de
// standaardsortering is "vibes". YoY-groei wel gewoon correct
// berekend, want ergens moeten we een grens trekken.
// ================================================================

let lbYear = null;
let lbOrder = "vibes";

// De jaren-marquee, aangevuld met jaren waarin er niks te kiezen valt.
const YEAR_MARQUEE_ITEMS = [
  ["1987", "dood"], ["2020", "dood"], ["2022", "echt"], ["1994", "dood"],
  ["2023", "echt"], ["geen idee", "dood"], ["2024", "echt"],
  ["2019½", "dood"], ["2025", "echt"], ["volgend jaar", "dood"],
];

function initYearMarquee() {
  $("year-marquee").innerHTML = YEAR_MARQUEE_ITEMS
    .map(([label, soort]) =>
      soort === "echt"
        ? `<span data-year="${label}">${label}</span>`
        : `<span class="dead-year">${label}</span>`
    ).join("");
  $("year-marquee").querySelectorAll("span[data-year]").forEach((el) =>
    el.addEventListener("click", () => {
      lbYear = el.dataset.year;
      $("year-selected").textContent = `geselecteerd: ${lbYear} 🎯 (mooi geklikt)`;
      $("year-selected").classList.remove("blink");
      renderLeaderboard();
      blip(700);
    })
  );
  $("year-marquee").querySelectorAll(".dead-year").forEach((el) =>
    el.addEventListener("click", () => {
      $("lb-status").textContent = `❌ "${el.textContent}" is geen kiesbaar jaar. probeer een echt jaar. tijdens het scrollen. sorry.`;
      blip(90);
    })
  );
}

// Romeins tot ~400, met dezelfde twijfelachtige tabel-filosofie.
function toRomanBig(n) {
  if (n <= 0) return "N";
  const table = [[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
  let out = "";
  for (const [v, s] of table) while (n >= v) { out += s; n -= v; }
  return out;
}

function lbYoY(naam, jaar, score) {
  const vorig = LEADERBOARD[String(Number(jaar) - 1)];
  if (!vorig) return "—";
  const prev = vorig.find((r) => r.naam === naam);
  if (!prev) return "NIEUW (verdacht)";
  const delta = score - prev.score;
  if (delta === 0) return "→ stabiel (saai)";
  return delta > 0 ? `↑ +${toRomanBig(delta)}` : `↓ -${toRomanBig(-delta)} (au)`;
}

function lbSortRows(rows) {
  const sorted = [...rows];
  if (lbOrder === "vibes") sorted.sort(() => Math.random() - 0.5);
  if (lbOrder === "alpha2") sorted.sort((a, b) => (a.naam[1] || "").localeCompare(b.naam[1] || ""));
  return sorted;
}

function renderLeaderboard() {
  const table = $("lb-table");
  if (!lbYear || !LEADERBOARD[lbYear]) {
    table.innerHTML = `<tr><td style="font-size:18px;padding:20px;">hier komt het klassement zodra je een jaar hebt geklikt. in de marquee. terwijl hij beweegt. ja echt.</td></tr>`;
    return;
  }
  const rows = lbSortRows(LEADERBOARD[lbYear]);
  const maxScore = Math.max(...LEADERBOARD[lbYear].map((r) => r.score));
  const minScore = Math.min(...LEADERBOARD[lbYear].map((r) => r.score));
  // positie = plek in de ECHTE ranglijst, getoond in binair. logisch.
  const ranked = [...LEADERBOARD[lbYear]].sort((a, b) => b.score - a.score);

  table.innerHTML =
    `<tr><th>POS (binair)</th><th>GAMER</th><th>PIZZAPUNTEN (romeins)</th><th>YoY</th><th>PRESTATIE</th></tr>` +
    rows.map((r) => {
      const pos = ranked.findIndex((x) => x.naam === r.naam) + 1;
      const rowClass = r.score === maxScore ? "lb-winnaar" : r.score === minScore ? "lb-laatste" : "";
      const kroon = r.score === minScore ? " 🏆" : r.score === maxScore ? " (winnaar ofzo)" : "";
      return `<tr class="${rowClass}">
        <td>${pos.toString(2).padStart(4, "0")}</td>
        <td>${r.naam}${kroon}</td>
        <td>${toRomanBig(r.score)}</td>
        <td>${lbYoY(r.naam, lbYear, r.score)}</td>
        <td class="lb-prestatie" title="${r.prestatie}">${r.prestatie}</td>
      </tr>`;
    }).join("");

  if (typeof gsap !== "undefined") {
    gsap.from("#lb-table tr", {
      x: () => gsap.utils.random(-200, 200),
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "back.out(1.8)",
    });
  }
}

$("lb-sort-vibes").addEventListener("click", () => {
  lbOrder = "vibes";
  $("lb-status").textContent = "⏳ vibes worden gemeten...";
  setTimeout(() => {
    $("lb-status").textContent = "✨ gesorteerd op vibes (elke keer anders, zo werken vibes)";
    renderLeaderboard();
  }, 1200);
});
$("lb-sort-alpha").addEventListener("click", () => {
  lbOrder = "alpha2";
  $("lb-status").textContent = "🔤 gesorteerd op de tweede letter. de eerste letter is een cliché.";
  renderLeaderboard();
});
$("lb-sort-score").addEventListener("click", () => {
  $("lb-status").textContent = "🔒 sorteren op score is een PREMIUM-functie. upgrade naar LAN PRO voor €0,00... betaling mislukt. probeer het volgend jaar.";
  airhorn();
});

// LIVE herberekening: elke 30 seconden husselt het klassement zichzelf.
setInterval(() => {
  if (lbYear && lbOrder === "vibes") {
    $("lb-status").textContent = "⚡ LIVE herberekening... (de vibes zijn verschoven)";
    renderLeaderboard();
  }
}, 30000);

initYearMarquee();
renderLeaderboard();

// ================================================================
// DE MUZIEK WERKBANK™ — altijd aanwezig, nooit gevraagd.
// De playlist speelt via de Spotify embed; alles eromheen is
// nep, kapot, of allebei. Sluiten is niet mogelijk. Muziek is verplicht.
// ================================================================

// De alarm-balk: wij kunnen niet zien of je écht op play hebt gedrukt
// (Spotify vertelt ons niks), dus we werken op basis van vertrouwen.
$("mt-alarm").addEventListener("click", () => {
  $("mt-alarm").classList.remove("blink");
  $("mt-alarm").style.background = "#003300";
  $("mt-alarm").style.color = "#00ff00";
  $("mt-alarm").textContent = "✅ goed zo. we vertrouwen je. (shuffle aanzetten doe je zelf even in spotify)";
});

// De volumeknop draait prachtig en regelt helemaal niets.
let knobAngle = 0;
$("mt-knob").addEventListener("click", () => {
  knobAngle += 45 + Math.random() * 270;
  $("mt-knob").style.transform = `rotate(${knobAngle}deg)`;
  blip(200 + (knobAngle % 800));
});

// De EQ: elke schuif die je aanraakt springt naar een eigen mening.
$("mt-eq").querySelectorAll("input").forEach((slider) => {
  slider.addEventListener("change", () => {
    setTimeout(() => {
      slider.value = Math.floor(Math.random() * 11);
      blip(400);
    }, 300);
  });
});

// Shuffle staat aan. Shuffle blijft aan. Niet aankomen.
const SHUFFLE_EXCUSES = [
  "🔀 SHUFFLE\nBLIJFT AAN",
  "🔀 NEE.",
  "🔀 SHUFFLE IS\nEEN LEVENSSTIJL",
  "🔀 ARTIKEL 12:\nSHUFFLE STAAT AAN",
];
let shuffleClicks = 0;
$("mt-shuffle").addEventListener("click", () => {
  const btn = $("mt-shuffle");
  btn.classList.remove("wiggle");
  void btn.offsetWidth;
  btn.classList.add("wiggle");
  btn.innerText = SHUFFLE_EXCUSES[Math.min(shuffleClicks++, SHUFFLE_EXCUSES.length - 1)];
  blip(120);
});

// De stopknop kent alleen weigeringen.
const STOP_REFUSALS = ["⏹ nee", "⏹ nee.", "⏹ NEE", "⏹ de muziek stopt als de LAN stopt", "⏹ dus nooit"];
let stopClicks = 0;
$("mt-stop").addEventListener("click", () => {
  $("mt-stop").textContent = STOP_REFUSALS[Math.min(stopClicks++, STOP_REFUSALS.length - 1)];
  airhorn();
});

// Minimaliseren maakt hem eerst GROTER. Daarna pas gewoon klein. Les geleerd.
let minimizeAttempts = 0;
$("mt-minimize").addEventListener("click", () => {
  const box = $("music-toolbox");
  if (minimizeAttempts++ === 0) {
    box.classList.add("enlarged");
    blip(90);
    return;
  }
  box.classList.remove("enlarged");
  box.classList.toggle("minimized");
});

// Sluiten kan niet. De werkbank verplaatst zich alleen naar de andere hoek.
$("mt-close").addEventListener("click", () => {
  const box = $("music-toolbox");
  box.style.right = box.style.right === "auto" ? "12px" : "auto";
  box.style.left = box.style.right === "auto" ? "12px" : "auto";
  blip(60);
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
