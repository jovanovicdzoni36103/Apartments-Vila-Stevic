# Vila &amp; SPA Stević — sajt

Statični sajt za Vilu &amp; SPA Stević na Srebrnom jezeru. Osam stranica, bez build koraka,
bez biblioteka i bez backenda. Otvara se duplim klikom na `index.html` ili se okači na bilo
koji hosting koji servira fajlove.

Cilj sajta je jednostavan: gost treba da završi ili na Booking stranici objekta (gde stoje
cena i slobodni dani) ili na telefonu, WhatsApp-u, Viberu odnosno mejlu. Sajt nema svoj
sistem rezervacija i namerno ga ne pokušava imitirati.

---

## Struktura

```
index.html          Početna
smestaj.html        Tri apartmana i četiri vrste soba
spa.html            SPA centar
vauceri.html        Poklon vaučeri
galerija.html       Galerija po grupama
o-nama.html         O nama i ko dočekuje goste
kucni-red.html      Kućni red vile i kućni red SPA centra
kontakt.html        Kontakt, forma i lokacija
404.html            Stranica koja ne postoji

css/stil.css        Ceo dizajn sistem. Boje, pismo, razmaci i krive su u :root na vrhu.
js/skripta.js       Kalendar, Booking link, forme, galerija, animacije. Bez biblioteka.
slike/              Fotografije. Svaka ima .jpg i .webp verziju istog imena.

.htaccess           Apache: 404, keširanje, kompresija, bezbednosna zaglavlja
robots.txt          Dozvoljava indeksiranje, pokazuje na sitemap
sitemap.xml         Osam stranica
site.webmanifest    Ikonice i boja za telefon
```

`Dokumenta za sajt 2026/` je originalni materijal vlasnika (fotografije u punoj rezoluciji,
PDF-ovi). Nije deo sajta i izuzet je kroz `.gitignore`.

---

## Šta se gde menja

**Telefon, mejl, Booking adresa i endpoint forme** — vrh `js/skripta.js`, objekti
`KONTAKT`, `BOOKING_URL` i `FORM_ENDPOINT`.

**Boje, pismo i razmaci** — `:root` na vrhu `css/stil.css`. Sve ostalo u fajlu koristi te
promenljive, pa promena jedne vrednosti menja ceo sajt.

**Tekst i fotografije** — direktno u HTML fajlovima. Navigacija i podnožje su isti u svakom
fajlu, pa se menjaju u svih devet.

**Nova fotografija** — dodati i `.jpg` i `.webp` u `slike/` pod istim imenom, pa upisati oba
u `<picture>` blok. Fotografije jedinica su uspravne, 4:5, 900 ili 1200 px široke.
Široke fotografije su 3:2.

---

## Forma

Forme nemaju backend. Šalju `POST` na Google Apps Script web aplikaciju (`FORM_ENDPOINT`),
u formatu `application/x-www-form-urlencoded`, da bi izbegle CORS preflight. Ako slanje ne
uspe, forma otvara mejl program sa već popunjenom porukom. Drugo dugme šalje isti sadržaj
preko WhatsApp-a.

Primalac mejla se ne menja u ovom kodu nego u samom Apps Script projektu, u
Script Properties, ključ `PRIMALAC`.

Forme imaju skriveno polje `website` (honeypot). Ako je popunjeno, upit se tiho odbacuje.

---

## Termin

Izabrani termin živi u adresi stranice: `?dolazak=2026-07-12&odlazak=2026-07-15&odrasli=2&deca=1&g=7`.
Skripta ga čita pri učitavanju, prenosi kroz sve interne linkove i ugrađuje u Booking deep
link (`checkin`, `checkout`, `group_adults`, `group_children`, `age`, `no_rooms`,
`selected_currency`). Kalendar je pisan ručno; nema native `<input type="date">` jer on
prikazuje američki format i izgleda kao deo šablona.

Kalendar **ne prikazuje slobodne dane**. Objekat nema digitalni kalendar zauzeća, pa bi
svaki prikaz dostupnosti bio izmišljen.

---

## Pokretanje

Nije potreban nikakav alat. Za lokalni pregled sa ispravnim putanjama:

```bash
python3 -m http.server 8000
# pa otvoriti http://localhost:8000
```

Nema build komande, nema `npm install`, nema zavisnosti.

---

## Pre puštanja u rad

1. U `js/skripta.js` prebaciti `FORM_ENDPOINT` na produkcioni Apps Script i podesiti
   `PRIMALAC` na `vilastevic@gmail.com`.
2. U `.htaccess` odkomentarisati preusmeravanje na https, kada domen dobije sertifikat.
3. Proveriti da `og:image` u svim stranicama pokazuje na pravi domen.
4. Odgovoriti na pitanja iz `PITANJA-ZA-ZORANA.md` i upisati podatke koji nedostaju.
