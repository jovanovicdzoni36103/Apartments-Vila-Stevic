VILA & SPA STEVIĆ, sajt v3 (materijal vlasnika od 07.09.2026)

index.html       početna: hero, traka za termin, smeštaj, galerija, SPA, o nama, lokacija, vaučer, kontakt, pitanja
smestaj.html     Apartman A, B, C, jednokrevetna soba, dvokrevetna soba, sobe sa bračnim krevetom, trokrevetna (bez materijala)
spa.html         tekst vlasnika, slana soba, finska sauna, đakuzi, masaža, ambijent, radno vreme 12 do 21h
galerija.html    57 fotografija po grupama, klik otvara veliku sliku (lightbox)
vauceri.html     grafika vaučera, tri koraka, forma
o-nama.html      tekst vlasnika, brojke, mesto za domaćine
kucni-red.html   kućni red vlasnika, 11 tačaka
kontakt.html     kanali, forma, adresa, mapa
css/stil.css     stilovi za sve stranice
js/skripta.js    traka za termin, Booking deep link, prenos termina između stranica, forme, animacije, lightbox
slike/           fotografije vlasnika (1600 px, bez EXIF podataka), dron snimci sa starog sajta

Otvaranje: dupli klik na index.html. Hosting: ceo folder na server kakav jeste.
Navigacija i podnožje su isti na svim stranicama i menjaju se u svakom fajlu posebno.
Termin koji gost unese putuje između stranica kroz adresu (?dolazak=...&odlazak=...&odrasli=..&deca=..&g=..), bez kolačića.

FOTOGRAFIJE: nazivi po fasciklama vlasnika
  Apartman A 1..8 -> apartman-a-1..8      Apartman B 1..6 -> apartman-b-1..6      Apartman C 1..7 -> apartman-c-1..7
  1. Jednokrevetna soba 1..6 -> soba-jednokrevetna-1..6
  2. Dvokrevetna soba 1..6 -> soba-dvokrevetna-1..6
  4. Sobe sa bračnim krevetom 1,2,3,4,5,7,8,9 -> soba-bracni-1..8 (u fascikli nema fajla 6)
  Spa centar 1..9 -> spa-1..9 (7 slana soba, 9 sauna, 4 i 6 đakuzi, 8 masaža, 1 recepcija, 2 ulaz, 3 preparati, 5 kutak)
  Za naslovnu.png -> vila-dan.jpg (hero), Vila Stević.jpg -> vila-noc.jpg, Poklon vaučer.jpeg -> vaucer.jpg
  Redosled u mozaiku i galeriji je u REDOSLED u napravi3.py, u HTML-u je već izgenerisan.

ŠTA VLASNIK TREBA DA POTVRDI (žuto, klasa .tbd)
1. trokrevetna soba: opis, sprat, oprema i fotografije (fascikla 3 nije stigla) (smeštaj)
2. vreme putovanja iz Beograda i iz Požarevca (početna, kontakt)
3. da li SPA mogu koristiti gosti koji ne noće u vili (spa)
4. trajanje SPA termina, broj osoba po terminu, paketi (spa)
5. šta poklon vaučer sadrži, kako se plaća i kako se dostavlja (vaučeri)
6. radno vreme recepcije (kontakt)

MESTA ZA TEKST I FOTOGRAFIJE (isprekidano)
- fotografija i nekoliko rečenica o domaćinima (o nama); ako vlasnik ne želi, ceo blok se briše

ŠTA SE MENJA I GDE
- slike: fajl u slike/, putanja u objektu SLIKE na vrhu js/skripta.js (jedna slika = jedna vrednost)
- endpoint forme (Formspree ili Web3Forms): const FORM_ENDPOINT na vrhu js/skripta.js, jedna linija
- telefon, WhatsApp broj, mejl, Booking URL: KONTAKT i BOOKING_URL na vrhu js/skripta.js (isti podaci su i u href atributima u HTML-u)
- og:image u svakom HTML-u mora postati puna adresa kad sajt dobije domen

NAPOMENE
- opisi jedinica su iz PDF-ova vlasnika, skraćeni u dve do tri rečenice plus lista opreme; ispravljene slovne greške
- SPA tekst je vlasnikov; izbačena reč "savršen" i crta, ostalo je njegovo
- apartman C prima samo dve odrasle osobe, pa nije za porodice sa decom; to piše na kartici, u opisu i u pitanjima
- apartmani nemaju terasu, sve sobe imaju; tako je u opisima vlasnika
- hero fotografija je 1086 px široka; na velikim ekranima je malo meka, veća verzija bi pomogla

===============================================================================
v4, 08.09.2026. Šta je dodato u odnosu na v3
===============================================================================
- Forma za upit je povezana: Google Apps Script upisuje red u tabelu VILA STEVIC UPITI
  i šalje mejl. Adresa servisa je const FORM_ENDPOINT na vrhu js/skripta.js.
  Primalac mejla se menja u Script Properties, ključ PRIMALAC. Vidi README-PREDAJA.md.
- Forma ima honeypot polje, proveru pre slanja i vidljive poruke za uspeh i grešku.
  Mejl više nije obavezan ako je upisan telefon.
- Svaka fotografija ima src, width, height i alt u HTML-u, pa sajt radi i bez skripte
  i ne poskakuje pri učitavanju.
- Podaci koji čekaju vlasnika su izvučeni u objekat PODACI na vrhu js/skripta.js.
  Jedan upis popunjava sve stranice na kojima se taj podatak vidi.
- Trokrevetna soba: red sa kvadraturom i ležajevima je vraćen na oznaku [potvrditi],
  jer ti podaci nisu stigli od vlasnika.
- Dodato: 404.html, robots.txt, sitemap.xml, site.webmanifest, .htaccess,
  favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png,
  slike/og-vila-stevic.jpg (1200x630 za deljenje linka).
- Svaka stranica ima canonical, og:url, og:image sa punom adresom i Twitter karticu.
- JSON-LD je tipa LodgingBusiness, na početnoj i na kontaktu.
- Dugmad u lepljivoj traci na telefonu su podignuta sa 40 na 44 px.
- HTML prolazi validaciju bez greške.

- Provera od 08.09.2026, popravljeno posle testiranja:
  404.html je nosio og:url sa adrese kućnog reda, iz kog je stranica napravljena.
  Telefon je u HTML-u bio obavezan iako i skripta i server traže samo ime i jedan kontakt,
  pa gost sa samo mejlom nije mogao da pošalje upit. Sada forme imaju novalidate i sve
  poruke o grešci dolaze iz skripte, na srpskom.
  Telefon se u tabelu upisuje kao tekst, jer je Google tabela jela nulu na početku broja.
