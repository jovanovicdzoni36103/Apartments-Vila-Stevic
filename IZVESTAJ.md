# Vila & SPA Stević — izveštaj o redizajnu

Datum: 14.09.2026.
Folder: `C:\Users\PC\Desktop\Klijenti\Vila Stevic\Vila Stevic Trenutna verzija`

---

## 1. Šta sam zatekao

Statični sajt, devet HTML stranica, jedan CSS (57 KB) i jedan JS (35 KB), bez biblioteka i
bez build koraka. Postoji Git repozitorijum. Fotografije su bile obrađene na 1600 px,
bez EXIF podataka. U folderu su i originalni materijali vlasnika (`Dokumenta za sajt 2026`,
oko 50 MB), i folder `screenshots` sa snimcima stare verzije.

Tehnički je bilo uredno. Problem nije bio u kodu.

## 2. Šta je bilo loše u staroj verziji

Pregledao sam je otvorenu u pregledaču, na 1440 i na 390 px, stranicu po stranicu.

**Sajt je delovao kompetentno, ali generički.** Konkretno:

- **Native `<input type="date">` polja** ispod heroja prikazivala su `mm/dd/yyyy`, američki
  format, i izgledala kao komponenta iz šablona. To je bio najjeftiniji element na sajtu.
- **Četiri jednake kartice** sa okvirom, senkom i zelenim dugmetom-pilulom. Klasičan
  Booking.com raspored, ne editorial.
- **Red statistike** „2002. / 100 m / 14 + 3 / 1" čitao se kao startap landing strana.
  Poslednja stavka, „jedini SPA na jezeru", je tvrdnja koju nemam čime da potvrdim.
- **Tipografija** Spectral + Jost bila je u redu, ali u malim veličinama i sa bezbednim
  proredom. Nigde nije bilo razmere.
- **Fotografije su prikazivane u istom formatu i istoj veličini svuda**, pejzažno isečene iz
  uspravnih originala, pa su kreveti sečeni na pola.
- **Naslovi su svi imali isti oblik**: „3 apartmana. 14 soba." / „Jedan broj. Tri načina." /
  „100 metara od jezera." / „Jedini SPA na jezeru." Posle četvrtog puta to postaje tik.
- Na SPA sekciji početne stranice **vodeća fotografija slane sobe prikazuje decu kako se
  igraju**. To jedna slika ruši ceo premium utisak, a nosi i pitanje privatnosti.

## 3. Šta je klijent tražio (iz prepiske, 33 poruke)

**Obavezno**

- Sajt je levak ka Booking-u i ka direktnom kontaktu. Bez sistema rezervacija, bez plaćanja.
- Fiksna fotografija objekta na naslovnoj umesto videa (06.09).
- Pored tri apartmana, odvojeno i sobe po tipu: jednokrevetna, dvokrevetna, trokrevetna i
  soba sa bračnim krevetom (07.09). Ovo nadjačava raniji dogovor o „sve sobe kao jedna
  stavka". Znači sedam jedinica.
- Tri vaučera: dva iz PDF-a plus opcija da gost sam sastavi svoj (10.09).
- ROMANTIC u drugoj boji, SPA VIKEND ostaje zlatan kao premium (10.09).
- Grafika vaučera klikabilna, vodi na formu (10.09).
- Ikonice: WhatsApp, Viber i mejl. Instagram i Facebook su ispali (02.09).
- Javni kontakt: 064/4500-600 i vilastevic@gmail.com.
- Sekcija „Ko vas dočekuje", goste dočekuje Zoran (10.09).
- Recepcija radi 07 do 22 (10.09).
- Vaučer: posle dogovora šalju instrukcije za uplatu, nema online plaćanja (10.09).

**Ne raditi**

- Zakazivanje SPA termina preko sajta. Termini ostaju recepciji.
- Prikaz slobodnih dana. Zoran vodi ručni planer u svesci, digitalnog kalendara nema.
- Rok važenja vaučera (mejl 02.09), iako PDF od 10.09. kaže 12 meseci. Sukob je opisan u
  `PITANJA-ZA-ZORANA.md`.

## 4. Šta sam izvukao iz PDF dokumenata

Sve činjenice na sajtu dolaze iz ovih izvora i nijedna nije dopisana.

- **Sedam opisa jedinica** (kvadratura, sprat, ležajevi, terasa, maksimalan broj gostiju,
  oprema). Trokrevetna soba je jedina bez podatka o maksimalnom broju gostiju.
- **Kućni red vile**, 11 tačaka, prenet doslovno.
- **Kućni red SPA centra**, 9 pravila, prenet doslovno.
- **Poklon vaučeri**: ROMANTIC 70 EUR i SPA VIKEND 140 EUR, za dve osobe, sa punim spiskom
  šta ulazi. Spa karta je oko dva sata: slana soba 30 min, sauna 3 × 15 min, đakuzi 30 min.
  Boravišna taksa 80,00 dinara po osobi po danu nije uključena. Plaća se u dinarskoj
  protivvrednosti po srednjem kursu NBS. Ne menja se za novac ni za drugu uslugu.
- **Tekst „O nama"** vlasnika, prenet doslovno, uključujući rečenicu
  „Gost po gost, osmeh po osmeh, višnja po višnja", koja je najbolja linija u celom materijalu.
- **SPA tekst** vlasnika: slana soba, finska sauna, đakuzi, masaža.

Nisam preneo tekst o slanoj sobi i sauni sa starog sajta jer je pun medicinskih tvrdnji
(haloterapija, astma, detoksikacija, imunitet).

## 5. Istraživanje premium hotelijerskog dizajna

Izmereno iz CSS-a i strukture stvarnih sajtova: Schgaguler, Wiesergut, Villa Honegg,
Forestis, Vigilius, Milla Montis, Hubertus, Ett Hem, Passalacqua.

Šta se ponavlja:

- **Jedinice idu kao editorial redovi, ne kao mreža kartica.** Schgaguler ima 10 soba, jedan
  red i jednu fotografiju po sobi. Mreža od tri kartice traži devet podjednako dobrih
  fotografija; red traži jednu.
- **Naslov h1 na desktopu 42 do 70 px, težina 300 do 400, razmak 0 ili negativan, prored
  1.15 do 1.2.** Telo 18 do 21 px, ne 16. Ceo budžet za razmak ide u verzalne natpise,
  0.15 do 0.26 em na 11 do 13 px.
- **Polovina referentnih sajtova uopšte nema serif.** Jedan lagani grotesk u velikoj meri
  čita se skupo. Serif nije obavezan.
- **Mali SPA dobija ime i konkretan broj, ne pridev.** Villa Honegg piše 34ºC, ne
  „grejani bazen".
- **Vaučeri su stavka najvišeg nivoa u navigaciji na svih osam sajtova.**
- **Bez hero karusela, bez senki, bez zaobljenih okvira.**
- Za amatersku fotografiju: jedan tonski recept preko celog seta, dva odnosa stranica
  najviše, tesniji isečci umesto širokougaonih snimaka cele sobe, 12 do 18 fotografija
  ukupno, potpis uz svaku.

Cornell (Anderson) je izmerio da oko 30% onih koji rezervišu direktno prvo nađe objekat na
OTA platformi. **Sajt nije levak, nego sloj poverenja između Booking oglasa i rezervacije.**
Zadatak mu je da izgleda skuplje od oglasa i da ne pravi trenje.

## 6. Stranice posle redizajna

Isti skup kao ranije, adrese se nisu menjale, pa ništa nije palo iz indeksa.

| Stranica | Šta je |
|---|---|
| `index.html` | Hero, pozicija, smeštaj, SPA, fotografije, vaučeri, domaćini, pitanja |
| `smestaj.html` | Indeks sedam jedinica, pa sedam editorial redova, pa „pre dolaska" |
| `spa.html` | Spa karta sa trajanjima, ambijent, kako se zakazuje |
| `vauceri.html` | Dva vaučera kao editorial spread, treća opcija, forma |
| `galerija.html` | Devet grupa po šest fotografija |
| `o-nama.html` | Tekst vlasnika, činjenice, ko dočekuje goste |
| `kucni-red.html` | Kućni red vile i kućni red SPA centra, u dve kolone |
| `kontakt.html` | Četiri kanala, forma, lokacija |
| `404.html` | Kratka strana sa četiri putanje dalje |

## 7. Novi dizajn sistem

**Boja.** Paleta je izvučena iz same kuće: oker fasada, terakota crep, šimšir.

- Hartija `#f5f1e9`, naizmenična traka `#ece6d9`
- Mastilo `#1c1b17`, drugi plan `#4e4a3e`, natpisi `#6d6756`
- Noć `#181712` za tamne sekcije
- Maslinasto zelena `#3c4a34` za glavnu akciju
- Mesing `#8a6d36`, isključivo kod poklon vaučera, kako je klijent tražio

Stara paleta je bila borova zelena i hladna siva. Ta kombinacija se tukla sa okerom na
fotografijama. Topla hartija pristaje kući.

**Pismo.** EB Garamond za naslove, Jost za telo i verzalne natpise.

Prvo sam uzeo Cormorant Garamond. **Odbacio sam ga jer lomi srpske dijakritike:** kvačica
na č i ž se prikazuje odvojeno i previsoko. Proverio sam renderovanjem, na četiri pisma.
EB Garamond, Spectral i Petrona rade ispravno. EB Garamond nosi najviše težine na velikim
veličinama.

- h1 `clamp(38px, 6.4vw, 74px)`, prored 1.16, razmak -0.012em
- telo 17 px na telefonu, 19 px na desktopu, prored 1.62
- verzalni natpisi 10.5 px, razmak 0.2em

**Ostalo.** Radijus 0. Senki nema. Kontejner 1280 px, tekst nikad širi od 620 px. Ritam
sekcije `clamp(80px, 9vw, 150px)`. Dve krive za ceo sajt, `cubic-bezier(.215,.61,.355,1)` i
`cubic-bezier(.16,1,.3,1)`.

## 8. Kako je rešen SPA

Vodeća fotografija na početnoj **nije više slana soba sa decom**. Ta slika je izbačena sa
celog sajta. Umesto nje stoji prolaz kroz SPA centar, drvena obloga i zelenilo.

Spa karta je predstavljena kao definisan proizvod sa konkretnim brojevima, ne kao spisak
usluga: slana soba 30 minuta, finska sauna 3 × 15 minuta, đakuzi 30 minuta, relax masaža
60 minuta. Četiri kartice sa trajanjem kao natpisom i imenom kao naslovom.

Radno vreme **nije upisano** jer se dva izvora ne slažu (PDF kaže 12 do 20, tekst vlasnika
12 do 21). Piše samo da se termini zakazuju na recepciji, što oba izvora potvrđuju.

Slana soba je jedini sadržaj bez fotografije. To je konkretan zahtev za Zorana.

## 9. Kako su rešeni vaučeri

Grafike koje je Zoran poslao **nisu vodeći element**. Svaki vaučer ima:

1. Fotografiju iz kuće u formatu 4:5 na jednoj strani
2. Ime, cenu velikim brojem, i pun spisak onoga što ulazi, u tankim linijama
3. Grafiku vaučera ispod fotografije, u okviru, sa potpisom „Ovako izgleda vaučer koji
   dobijate"

Obe grafike dobijaju identičan tretman, pa roze i zlatna više ne izgledaju kao dva različita
proizvoda iz dva različita sistema. ROMANTIC je neutralan, SPA VIKEND je zlatan, kako je
dogovoreno.

Treća opcija, vaučer po želji, ima svoju sekciju. Sve napomene iz PDF-a (boravišna taksa,
kurs NBS, nemogućnost zamene) stoje uz formu za poručivanje.

## 10. Copy

Sve je novo osim teksta „O nama" i kućnih redova, koji su Zoranovi i preneti doslovno.

Izbačeno:

- „Jedini SPA na jezeru" kao naslov, jer tvrdnja nije potvrđena
- „Fotografije su naše, nema preuzetih slika i nema rendera", jer to ne mogu da proverim,
  a jedna fotografija masaže izgleda kao da nije iz kuće
- Red statistike sa brojkama

Naslovi više nisu svi istog oblika. „Sto metara od vode." nosi hero jer je to jedini podatak
koji gost koji bira jezero stvarno traži. „Stotinu koraka do jezera.", „Oko dva sata, ovim
redom.", „Na recepciji, po dolasku.", „Dolazak večeras? Pozovite."

## 11. Fotografije

Ovo je bio najveći posao i najveći dobitak.

**Jedinstven tonski recept preko celog seta**, napisan u Pythonu (`look.py`):

1. Balans bele po svetlim tonovima, prigušen na 55% jačine
2. Selektivna desaturacija narandžastog pojasa (‑34%), žutog (‑20%) i ljubičastog LED-a
   (‑22%). Ovo je ono što je borovu saunu pretvorilo iz narandžaste u drvenu.
3. Blaga globalna desaturacija, pa vibrance na ono što je ostalo tiho
4. Filmska kriva sa podignutom crnom
5. Mikro-zrno 0.8%, koje ujednačava različit šum i sakriva uvećanje

**Dva odnosa stranica, ne više.** 4:5 uspravno za sve jedinice, 3:2 za široke kadrove.
Sve sobe su snimljene uspravno, što se poklapa sa onim što rade referentni sajtovi.

**Kurirano.** Od 67 fotografija na sajtu je 59, po šest u svakoj grupi galerije, tako da
nijedan red mreže ne ostaje upola prazan. Izbačeno: slana soba sa decom, dvostruko snimljena
kupatila, prazni kadrovi.

Svaka fotografija ima `.webp` i `.jpg`, isporučuju se kroz `<picture>`. Hero ima i uspravnu
verziju za telefon.

## 12. Motion

Zadržan je postojeći pristup sa `IntersectionObserver`, ali prepravljen:

- Ulazak: prozirnost plus pomeraj 16 px, 0.8 s, easeOutExpo, stagger 70 ms, najviše pet
- Fotografija ulazi sa `scale(1.05)` na 1, 1.1 s
- Hero slika se primiče jednom, pri učitavanju, 1.6 s
- Navigacija menja stanje na skrolu
- Redovi spiska se pomeraju 10 px udesno na hover
- Sve staje uz `prefers-reduced-motion`, provereno

Nema parallaxa, nema scroll-jackinga, nema maski. Referentni sajtovi ih takođe nemaju.

## 13. Mobilni

Namenski rađen, nije samo naslagan desktop.

- Hero: uspravna verzija fotografije, dvostruki veo (odozdo za tekst, odozgo za navigaciju),
  dugmad pune širine ispod 620 px, traka činjenica svedena na dve stavke
- **Zatvarajuća sekcija ispod 768 px stavlja fotografiju iznad teksta** umesto teksta preko
  fotografije. Tekst preko osvetljenog natpisa „Vila & SPA Stević" bio je nečitljiv i to je
  bila najgora greška prve verzije.
- Redovi spiska se lome u dva reda, ime pa podatak, umesto cik-cak poravnanja
- Tekstualne veze imaju nevidljivu zonu za prst od 44 px
- Meni preko celog ekrana, tamna podloga, brojevi stranica
- Donja traka: Pozovi, WhatsApp, Cena

Provereno na 360, 375, 390, 414, 768, 1024, 1280, 1440 i 1920 px.

## 14. Organizacija foldera

```
index.html + 8 stranica
css/stil.css          43 KB, ceo dizajn sistem u :root na vrhu
js/skripta.js         27 KB, bez biblioteka
slike/                118 fajlova, .jpg i .webp u paru
README.md             kako se šta menja
PITANJA-ZA-ZORANA.md  12 pitanja, svako sa razlogom
IZVESTAJ.md           ovaj fajl
.gitignore            izuzima Dokumenta za sajt 2026, screenshots, zip
.htaccess             404, keširanje, kompresija, bezbednosna zaglavlja
robots.txt, sitemap.xml, site.webmanifest
```

## 15. Šta je obrisano, šta preimenovano

**Obrisano iz projekta** (originali ostaju u `Dokumenta za sajt 2026` i u Git istoriji):
`apartman-a-6`, `apartman-a-8`, `apartman-c-7`, `soba-bracni-5`, `soba-bracni-7`,
`vila-noc-usko`, `domacini-usko`. Sve su bile duplirana kupatila ili neiskorišćeni isečci.

**Preimenovano u opisna imena:** `spa-1` do `spa-9` su postali `spa-prijem`, `spa-hodnik`,
`spa-djakuzi`, `spa-sauna`, `spa-masaza`, `spa-odmor`. `dron-dalje` je postao
`vila-iz-vazduha`. `porodicna_fotografija` je postao `domacini`.

**Ostalo na disku, treba ručno obrisati** (20 fajlova, oko 6,5 MB, stara imena koja više
nijedna stranica ne koristi):

```
apartman-a-6.jpg   apartman-a-8.jpg   apartman-c-7.jpg   dron-blizu.jpg
dron-dalje.jpg     porodicna_fotografija.jpg             romantik_vaucer.png
soba-bracni-5.jpg  soba-bracni-7.jpg  spa vikend_vaucer.png
spa-1.jpg … spa-9.jpg                 vila-dan-mala.jpg
```

Most do tvog računara ne sme da briše fajlove, pa ovo ne mogu da uradim sam. Označi ih u
File Explorer-u i pošalji u korpu, ili `git rm` pre komita.

## 16. Refaktorisanje

**CSS** je napisan ispočetka, 651 linija, 20 numerisanih sekcija. Sve boje, pisma, razmaci i
krive stoje u `:root`. Nema `!important` osim jednom, nema mrtvih pravila.

**JS** je prepisan uz zadržavanje provere logike koja je radila (Booking deep link, prenos
termina, slanje forme, honeypot, lightbox).

Novo:

- **Sopstveni kalendar**, dva meseca, izbor opsega, srpski nazivi meseci i dana. Native
  `<input type="date">` je izbačen jer prikazuje format po jeziku pregledača i izgleda kao
  deo šablona.
- Mehanizam `data-slika` i CSS promenljive `--slika-*` su uklonjeni. Fotografije sada stoje
  direktno u HTML-u kroz `<picture>`, pa rade i bez JavaScript-a i učitavaju se ranije.

**Pronađen i ispravljen pravi kvar:** kalendar se posle svakog klika ponovo iscrtava, pa
kliknuto dugme više nije u dokumentu kad klik dođe do `document`-a. Zbog toga se panel
zatvarao pri prvom izboru datuma. Rešeno pamćenjem pripadnosti na `pointerdown`.

## 17. SEO

- `title` 30 do 70 znakova na svakoj stranici, `description` 70 do 200
- `canonical` na svakoj stranici
- Open Graph i Twitter card, `og:image` 1200 × 630
- Jedan `h1` po stranici, hijerarhija bez preskoka, provereno skriptom
- `alt` na svakoj fotografiji, nijedan prazan, opisni a ne nabrajanje ključnih reči
- `Hotel` strukturirani podaci na početnoj: adresa, koordinate, telefon, vreme prijave i
  odjave, `petsAllowed: false`, broj jedinica
- `sitemap.xml` sa osam adresa, `robots.txt` pokazuje na njega
- `lang="sr"` svuda

## 18. Pristupačnost

- **Kontrast**: 158 mesta ispod praga na početku, sada 0 u sadržaju. Ostalo je devet
  prijava, sve bela slova preko tamne fotografije, gde skripta ne vidi pravu podlogu.
  Proverio sam ih okom.
- Semantični HTML, `<main>`, `<nav aria-label>`, `<address>`, `<dl>` za činjenice, `<ol>` za
  pravila
- Vidljiv fokus, `outline` 2 px, na tamnim sekcijama menja boju
- Tastatura: Tab, Escape zatvara panel i meni, strelice listaju lightbox, fokus se vraća na
  isti dan posle izbora u kalendaru
- `aria-expanded`, `aria-controls` na harmonici i meniju
- `prefers-reduced-motion` gasi sve animacije
- Dodirne zone najmanje 44 px na telefonu

## 19. Performanse

- Bez biblioteka. CSS 43 KB, JS 27 KB, nesažeti.
- WebP uz JPG fallback kroz `<picture>`. Ceo set fotografija 8,4 MB u WebP-u.
- Hero se predučitava kroz `<link rel="preload">`, zasebno za telefon i desktop.
- Sve ispod pregiba ima `loading="lazy"` i `decoding="async"`.
- `width` i `height` na svakoj velikoj slici, bez pomeranja rasporeda pri učitavanju.
- DOM je mali: 221 do 561 čvorova po stranici.
- Animacije koriste samo `transform` i `opacity`.
- `.htaccess` uključuje gzip i keširanje od godinu dana za statične fajlove.

Prvi ekran: 294 KB na stranici Smeštaj, 883 KB na početnoj (hero je 289 KB u WebP-u).

## 20. Rezultat provera

**Funkcionalno, 27 od 27 prolazi:** panel, kalendar, Booking deep link sa svim parametrima,
brojači gostiju, polja za godine dece, prenos termina kroz linkove, WhatsApp poruke,
harmonika, lightbox sa strelicama i Escape-om, mobilni meni, provera forme, tastatura,
smanjen pokret, nijedna JS greška.

**Bez horizontalnog prelivanja na svih devet stranica, na sedam širina.**

**Sve unutrašnje veze i sidra postoje. Sve fotografije postoje. Nijedna `img` bez `alt`.**

**Tri kruga vizuelne provere**, svaka stranica na 390, 768 i 1440 px, ukupno preko 200
isečaka. Prvi krug je našao 22 kvara, drugi 18, treći 13. Svi ispravljeni.

## 21. Šta ostaje kao problem

- **Fotografije su i dalje gornja granica ovog sajta.** Tonski recept ih je ujednačio, tesniji
  isečci su ih učinili namernim, ali to su i dalje snimci telefonom sa blicem. Jedan dan
  rada fotografa promenio bi utisak više nego bilo šta što ja mogu u kodu.
- **Nigde nema cene.** Svaki put se završava dugmetom „Vidi cenu na Booking-u". Gost koji ne
  zna ni okvirno koliko noćenje košta često ne klikne. Prvo pitanje u
  `PITANJA-ZA-ZORANA.md`.
- **Nema mape na stranici Kontakt**, samo dugme ka Google mapama. Ugrađena mapa vuče
  kolačiće trećih strana i usporava stranu. Statična slika mape traži API ključ.
- **Nema utisaka gostiju.** Imaju 4,2 na Tripadvisoru i prvo mesto od četiri objekta u
  Velikom Gradištu. Tri citata sa imenom podigla bi poverenje više od bilo koje sekcije.
- Dvadeset starih fajlova u `slike/` (tačka 15).

## 22. Šta nisam mogao pouzdano da utvrdim

Dvanaest stavki, sve u `PITANJA-ZA-ZORANA.md`, sa razlogom zašto svaka nedostaje. Ukratko:
cena, radno vreme SPA, rok vaučera, dostava vaučera, broj gostiju u trokrevetnoj, put iz
Beograda i Požarevca, SPA za spoljne goste, cena spa karte, fotografija slane sobe bez
gostiju, tvrdnja „jedini SPA na jezeru", godina osnivanja, parking i wi-fi bez naplate.

**Nijedna pretpostavka nije upisana na sajt.** Gde podatak nedostaje, rečenice nema.

## 23. Pokretanje

```
python3 -m http.server 8000
```
pa otvoriti `http://localhost:8000`. Duplim klikom na `index.html` takođe radi, samo što
Booking linkovi i forme traže `http://`.

## 24. Build

Nema ga. Nema `npm install`, nema zavisnosti, nema koraka prevođenja.

## 25. Git

Repozitorijum postoji i nije diran. Ja Git komande ne mogu da pokrenem jer most do tvog
računara ne montira folder (Windows zakrpa od 08.09).

Pre komita:

1. Obriši 20 starih fajlova iz tačke 15
2. `git rm -r --cached "Dokumenta za sajt 2026" screenshots` ako ne želiš originale u
   verzionisanju. Novi `.gitignore` ih izuzima, ali su već u istoriji.

## 26. Promenjeni fajlovi

**Prepisano od nule:** `css/stil.css`, `js/skripta.js`, svih devet HTML stranica.

**Novo:** `README.md`, `PITANJA-ZA-ZORANA.md`, `IZVESTAJ.md`, `.gitignore`, i 118 fajlova u
`slike/` (59 fotografija u po dve verzije).

**Prepravljeno:** `.htaccess`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

**Nedirnuto:** favikonice, `Dokumenta za sajt 2026`, `screenshots`, `.git`.

---

## Test na kraju

*Ako gost prvo vidi staru verziju, pa novu, da li nova čini da Vila Stević izgleda
značajno skuplje?*

Da. Stara verzija je izgledala kao dobro urađen šablon: kartice, senke, native polja za
datum, red statistike. Nova izgleda kao nešto što je neko crtao za ovu kuću: topla hartija,
velika tipografija sa vazduhom, jedinice kao editorial redovi, vaučeri kao proizvodi sa
cenom velikim brojem, i fotografije koje prvi put izgledaju kao jedan set.

Gornja granica nije više dizajn. Gornja granica su fotografije i to što nigde ne stoji cena.
Obe stvari traže Zorana, ne mene.
