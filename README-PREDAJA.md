# Vila & SPA Stević, sajt v4, uputstvo za predaju

Statični sajt: 9 HTML stranica, jedan CSS, jedna skripta, folder sa fotografijama.
Nema baze, nema build koraka, nema pretplate. Sve se menja u tekstualnim fajlovima.

## 1. Postavljanje na hosting

Ceo sadržaj ovog foldera ide u koreni folder sajta na serveru, onako kako jeste.
`index.html` mora da bude u korenu, ne u podfolderu. Struktura se ne menja.

```
index.html  smestaj.html  spa.html  galerija.html  vauceri.html
o-nama.html  kucni-red.html  kontakt.html  404.html
robots.txt  sitemap.xml  site.webmanifest  .htaccess
favicon.ico  favicon-32.png  apple-touch-icon.png  icon-192.png  icon-512.png
css/stil.css
js/skripta.js
slike/
```

Sajt radi i bez `.htaccess`. Taj fajl služi samo da Apache prikaže `404.html` kad
neko otvori adresu koja ne postoji, i da uključi kompresiju i keširanje.
Ako hosting nije Apache, 404 stranica se podešava u panelu hostinga, a `404.html`
ostaje na serveru i može se otvoriti direktno.

Povezivanje domena `vilastevic.com` nije deo ovog paketa. Domen i sadašnji sajt stoje
kod firme Loopia, u nalogu kojim raspolaže Aleksandar (066/4444-17). Prebacivanje je
jedna izmena u tom nalogu i radi se posle pregleda sajta.

## 2. Adresa za primanje upita iz forme

Forma šalje upit u Google Apps Script koji upisuje red u tabelu i šalje mejl.

- Tabela: **VILA STEVIC UPITI**, list **Upiti**, u Google nalogu `nikola.jovanovic.mef@gmail.com`
- Skripta: projekat **VILA STEVIC forma**, vezan za tu tabelu
- Adresa servisa stoji u `js/skripta.js`, konstanta `FORM_ENDPOINT`, jedna linija

**Promena primaoca mejla, korak koji se radi pri predaji:**

1. Otvoriti tabelu, pa Proširenja (Extensions), pa Apps skripta
2. Levo, zupčanik, Podešavanja projekta (Project Settings)
3. Deo Svojstva skripte (Script Properties), ključ `PRIMALAC`
4. Vrednost promeniti iz `nikola.jovanovic.mef@gmail.com` u `vilastevic@gmail.com`
5. Sačuvati. Kod se ne dira i sajt se ne dira

Provera da servis radi: otvoriti `FORM_ENDPOINT` adresu u pregledaču. Treba da vrati
`{"ok":true,"poruka":"Servis radi"}`. Ta provera ništa ne upisuje i ne šalje.

Šta forma traži od gosta: ime, kratka poruka, i bar jedan kontakt, telefon ili mejl.
Nije obavezno oboje. Datumi su opcioni i dolazak sme da bude današnji dan.
Telefon se u tabelu upisuje kao tekst, pa nula na početku broja ostaje.

Ako se ikada menja kod skripte, izmena mora da se i objavi: Deploy, pa Manage deployments,
pa olovka, pa New version, pa Deploy. Adresa ostaje ista, menja se samo verzija.

Ako mejl ikada prestane da radi, sajt se ne kvari: forma pokaže grešku, ispiše telefon
i WhatsApp, i otvori mejl program sa popunjenom porukom.

## 3. Podaci koje vlasnik tek treba da pošalje

Na vrhu `js/skripta.js` stoji objekat `PODACI`. Svaka prazna vrednost je jedno mesto
koje na sajtu prikazuje žutu oznaku `[potvrditi: ...]`. Kad odgovor stigne, tekst se
upiše između navodnika i žuta oznaka nestaje sa svih stranica gde se taj podatak vidi.

```js
const PODACI = {
  putBeograd:          '',
  putPozarevac:        '',
  recepcijaRadnoVreme: '',
  spaSpoljniGosti:     '',
  spaTermin:           '',
  vaucerSadrzaj:       '',
  vaucerPlacanje:      '',
  vaucerDostava:       '',
  trokrevetnaMeta:     '',
  trokrevetnaOpis:     ''
};
```

Spisak sa objašnjenjem šta tačno ide u koje polje je u `CEKA-ZORANA.md`.

## 4. Fotografije

Sve fotografije su u folderu `slike/`, smanjene na 1600 px i bez EXIF podataka.
Putanje stoje na jednom mestu, u objektu `SLIKE` na vrhu `js/skripta.js`.
Zamena fotografije: novi fajl u `slike/`, pa promena jedne vrednosti u tom objektu.
Svaka slika u HTML-u ima i `src`, `width`, `height` i `alt`, pa sajt radi i bez skripte.

Fotografije trokrevetne sobe još nisu stigle. Na `smestaj.html` na tom mestu stoji
prazan okvir sa oznakom, bez tuđih slika.

## 5. Tekstovi, kontakt, Booking

- Tekstovi su u HTML fajlovima, svaka stranica za sebe
- Telefon, WhatsApp broj, mejl i Booking adresa stoje u `KONTAKT` i `BOOKING_URL`
  na vrhu `js/skripta.js`, a isti podaci su i u `href` atributima u HTML-u
- Navigacija i podnožje se ponavljaju u svakom fajlu i menjaju se u svakom posebno
- `og:image` i `canonical` već pokazuju na `https://vilastevic.com/`. Ako domen bude
  drugi, te adrese se menjaju u svih 9 HTML fajlova i u `sitemap.xml`

## 6. Favicon

`favicon.ico`, `favicon-32.png` i `apple-touch-icon.png` su predlog: slova VS na plavoj
boji iz sajta. Ako vlasnik pošalje logo, ovi fajlovi se zamene istim imenima i to je sve.
