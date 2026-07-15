# 🖥️ IS HET AL TIJD VOOR DE LAN?! 🖥️

De officiële, wetenschappelijk verantwoorde LAN-countdown website.
Episch van opzet, rampzalig van uitvoering. **Beide met opzet.**

## Wat is dit

Een 100% statische website (geen build, geen dependencies, geen excuses) die
antwoord geeft op de enige vraag die ertoe doet: *is het al tijd voor de LAN?*

Features:

- ⏳ Live countdown naar de grote dag (antwoord verandert vanzelf in **JA!!!**)
- 📊 Wetenschappelijk verantwoorde statistieken (pizza's, energiedrankjes, kabelspaghetti)
- 🔥 De Hype-O-Meter™ (persistent via localStorage, op 100% wordt alles erger)
- 🎺 De Toeter des Oordeels (WebAudio, geen geluidsbestanden nodig)
- 📝 Een aanmeldformulier geïnspireerd op [User Inyerface](https://userinyerface.com/)
  en [BadUI](https://goulartnogueira.github.io/BadUI/): naam kiezen via dropdown,
  pizza in Romeinse cijfers op een omgekeerde slider, dubbele-ontkenning-checkbox
  die zichzelf uitvinkt, knoppen die van plaats wisselen, en een voortgangsbalk
  die op 99% terugvalt naar 12%.
- 🌴 **DE MONTAGE**: een volledige Miami Vice 80's foto-montage — synthwave
  zonsondergang, neon gridvloer, VHS-ruis met ▶ PLAY en 1987-timestamp,
  Ken Burns crossfades én een live gesynthetiseerde synthwave-soundtrack
  (WebAudio: kick, snare, hihat, sawtooth-bas, pads — geen mp3 te bekennen).
- 🍪 Cookie banner met dubbele ontkenningen (verkeerde knop = banner op z'n kop)
- 🚨 Popup-advertentie waarvan de sluitknop je cursor ontwijkt (2x, daarna genade)
- ↑↑↓↓←→←→BA Konami code

## Instellen

De LAN start **altijd op 28 december** — de site telt automatisch af naar de
eerstvolgende editie, elk jaar opnieuw, voor eeuwig. Tijdens de LAN zelf
(standaard 3 dagen) staat de site in "JA!!!"-modus.

Alles staat in **`js/config.js`**:

```js
const LAN_START_HOUR = 18;      // starttijd op 28 december
const LAN_DURATION_DAYS = 3;    // hoe lang het JA!!!-feest duurt
const PHOTOS = [ "assets/images/mijn-foto.jpg", ... ];
```

## Foto's toevoegen

1. Zet de foto's in `assets/images/`
2. Voeg de paden toe aan de `PHOTOS`-lijst in `js/config.js`
3. Klaar. Geen `PHOTOS`? Dan verschijnen er absurde placeholders.

## Draaien

Open `index.html` in een browser. Dat is alles. Zelfs op de LAN zelf werkt hij,
want er is geen enkele externe dependency — precies zoals de LAN-goden het bedoelden.
