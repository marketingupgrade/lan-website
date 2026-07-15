// =====================================================================
// CONFIGURATIE — het enige bestand dat je hoeft aan te passen
// =====================================================================

// De LAN start ALTIJD op 28 december. Traditie is traditie.
const LAN_MONTH = 11; // december (maanden zijn 0-gebaseerd, vraag niet waarom)
const LAN_DAY = 28;
const LAN_START_HOUR = 18; // starttijd, pas aan naar wens

// Hoe lang duurt de LAN? Zolang duurt het "JA!!!"-feest op de site.
const LAN_DURATION_DAYS = 3;

// Berekent automatisch de eerstvolgende 28 december.
// Tijdens de LAN zelf (start + duur) blijft het gewoon JA.
function getLanDates() {
  const now = new Date();
  let start = new Date(now.getFullYear(), LAN_MONTH, LAN_DAY, LAN_START_HOUR, 0);
  let end = new Date(start.getTime() + LAN_DURATION_DAYS * 86400000);
  if (now >= end) {
    start = new Date(now.getFullYear() + 1, LAN_MONTH, LAN_DAY, LAN_START_HOUR, 0);
    end = new Date(start.getTime() + LAN_DURATION_DAYS * 86400000);
  }
  return { start, end };
}

// Het jaar-op-jaar klassement. Scores in pizzapunten (uiteraard).
// Voeg elk jaar op 29 december de nieuwe uitslag toe. Of niet. Zie maar.
const LEADERBOARD = {
  2022: [
    { naam: "xX_Kevin_Xx", score: 74, prestatie: "vergat zijn voeding (traditie sindsdien)" },
    { naam: "PizzaGandalf", score: 91, prestatie: "at de laatste pizzapunt zonder te vragen" },
    { naam: "Tante Ping", score: 58, prestatie: "bracht eigen router mee (niemand had dat gevraagd)" },
    { naam: "KabelKoning", score: 66, prestatie: "legde 40 meter kabel voor een afstand van 3 meter" },
    { naam: "Muismat Marco", score: 43, prestatie: "sliep als eerste (03:12, een record)" },
    { naam: "Excel_Emiel", score: 82, prestatie: "hield de score bij in een draaitabel" },
    { naam: "RageQuit Ruben", score: 12, prestatie: "ragequit om 21:15 (voor het eten)" },
  ],
  2023: [
    { naam: "xX_Kevin_Xx", score: 88, prestatie: "won 1 potje en praat er nog steeds over" },
    { naam: "PizzaGandalf", score: 79, prestatie: "probeerde een pizza te bestellen naar het verkeerde huis" },
    { naam: "Tante Ping", score: 95, prestatie: "laagste ping, hoogste arrogantie" },
    { naam: "KabelKoning", score: 51, prestatie: "struikelde over zijn eigen kabelgoot" },
    { naam: "Muismat Marco", score: 60, prestatie: "nam een BOL-muis mee. een BOL. MUIS." },
    { naam: "Excel_Emiel", score: 71, prestatie: "maakte een grafiek van de teleurstellingen" },
    { naam: "RageQuit Ruben", score: 34, prestatie: "bleef dit jaar tot 22:00 (groei)" },
    { naam: "De Boekhouder", score: 68, prestatie: "nieuw, telde alle bitterballen (194)" },
  ],
  2024: [
    { naam: "xX_Kevin_Xx", score: 45, prestatie: "installeerde windows updates tijdens de finale" },
    { naam: "PizzaGandalf", score: 102, prestatie: "won alles, at alles, zei niks" },
    { naam: "Tante Ping", score: 89, prestatie: "verloor expres om spanning te creëren (zegt ze)" },
    { naam: "KabelKoning", score: 77, prestatie: "kwam met glasvezel onder de arm binnen" },
    { naam: "Muismat Marco", score: 55, prestatie: "wakker gebleven tot 04:00 (nieuw persoonlijk record)" },
    { naam: "Excel_Emiel", score: 63, prestatie: "presenteerde de jaarcijfers om middernacht" },
    { naam: "RageQuit Ruben", score: 49, prestatie: "geen enkele ragequit. iedereen ongerust." },
    { naam: "De Boekhouder", score: 72, prestatie: "vond een boekhoudfout in de score van 2022" },
  ],
  2025: [
    { naam: "xX_Kevin_Xx", score: 93, prestatie: "comeback van het jaar (voeding mee: 2 stuks)" },
    { naam: "PizzaGandalf", score: 98, prestatie: "titelverdediger, at de troostpizza van de verliezer" },
    { naam: "Tante Ping", score: 97, prestatie: "verloor met 1 pizzapunt en eist een hertelling" },
    { naam: "KabelKoning", score: 80, prestatie: "netwerk lag er 0 minuten uit (verdacht)" },
    { naam: "Muismat Marco", score: 61, prestatie: "heeft nu 2 muismatten (dubbele setup)" },
    { naam: "Excel_Emiel", score: 75, prestatie: "voorspelde de uitslag in een regressiemodel (fout)" },
    { naam: "RageQuit Ruben", score: 70, prestatie: "won het potje waar hij vroeger om ragequitte" },
    { naam: "De Boekhouder", score: 66, prestatie: "afgeschreven maar niet uitgeschakeld" },
  ],
};

// Foto's van vorige edities (assets/images/). Deze draaien mee in
// zowel het fotorooster als DE MONTAGE. Lege lijst = absurde placeholders.
const PHOTOS = [
  "assets/images/0cc64601.jpg",
  "assets/images/256cf3e2.jpg",
  "assets/images/30478f4a.jpg",
  "assets/images/3536576e.jpg",
  "assets/images/38241607.jpg",
  "assets/images/56f35da9.jpg",
  "assets/images/57aedc03.jpg",
  "assets/images/62c553d8.jpg",
  "assets/images/6440ace8.jpg",
  "assets/images/6a73ac68.jpg",
  "assets/images/6e7179dc.jpg",
  "assets/images/6eb85723.jpg",
  "assets/images/8249affc.jpg",
  "assets/images/872e775e.jpg",
  "assets/images/89d06602.jpg",
  "assets/images/8cc69f9f.jpg",
  "assets/images/a0e253d9.jpg",
  "assets/images/aaeaa9be.jpg",
  "assets/images/ac9d1866.jpg",
  "assets/images/c74e21e3.jpg",
  "assets/images/e8e6f205.jpg",
  "assets/images/ef5e697b.jpg",
  "assets/images/f0a03f7c.jpg",
  "assets/images/fbd15b45.jpg",
];
