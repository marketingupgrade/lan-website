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
