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

// Foto's van vorige edities. Zet de bestanden in assets/images/
// en voeg ze hier toe. Lege lijst = absurde placeholders.
const PHOTOS = [
  // "assets/images/lan-2024-pizza-incident.jpg",
  // "assets/images/lan-2025-kabelspaghetti.jpg",
];
