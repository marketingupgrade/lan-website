// =====================================================================
// CONFIGURATIE — het enige bestand dat je hoeft aan te passen
// =====================================================================

// De LAN is ALTIJD van 28 t/m 30 december. Traditie is traditie.
const LAN_MONTH = 11; // december (maanden zijn 0-gebaseerd, vraag niet waarom)
const LAN_DAY = 28;
const LAN_START_HOUR = 18; // starttijd op de 28e, pas aan naar wens
const LAN_END_DAY = 30;    // t/m de 30e (de site feest tot middernacht)

// Berekent automatisch de eerstvolgende editie.
// Tijdens de LAN zelf (28e t/m einde 30e) blijft het gewoon JA.
function getLanDates() {
  const now = new Date();
  let start = new Date(now.getFullYear(), LAN_MONTH, LAN_DAY, LAN_START_HOUR, 0);
  let end = new Date(now.getFullYear(), LAN_MONTH, LAN_END_DAY + 1, 0, 0);
  if (now >= end) {
    start = new Date(now.getFullYear() + 1, LAN_MONTH, LAN_DAY, LAN_START_HOUR, 0);
    end = new Date(now.getFullYear() + 1, LAN_MONTH, LAN_END_DAY + 1, 0, 0);
  }
  return { start, end };
}

// De kandidaat-spellen. Stemmen gebeurt op de site (via het Rad van
// Bestuur), de uitslag is bindend behalve als iemand harder roept.
const GAMES = [
  "Heroes of the Storm (traditie)",
  "Age of Empires II",
  "Counter-Strike (de oude)",
  "Unreal Tournament 2004",
  "Trackmania",
  "Worms Armageddon",
  "StarCraft II",
  "Rocket League",
  "Jackbox (voor de moraal)",
  "GeoGuessr (schreeuwen mag)",
];

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
