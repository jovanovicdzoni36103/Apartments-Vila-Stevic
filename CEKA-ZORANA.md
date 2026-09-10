# Šta čeka Zorana

Stanje na dan 08.09.2026. Svaka stavka ima mesto na sajtu koje je već pripremljeno.
Popunjava se upisom jedne vrednosti u objekat `PODACI` na vrhu `js/skripta.js`, osim fotografija.
Dok je vrednost prazna, na sajtu stoji žuta oznaka `[potvrditi: ...]`.

| # | Šta fali | Gde se vidi na sajtu | Ključ u PODACI | U kom obliku je Zoranu najlakše da pošalje |
|---|----------|----------------------|----------------|---------------------------------------------|
| 1 | Fotografije trokrevetne sobe (fascikla 3) | smestaj.html, sekcija Trokrevetna soba; galerija.html dobija novu grupu | fajlovi u `slike/` | 5 do 8 fotografija sa telefona ili aparata, preko WeTransfer-a ili Google Drive-a, isto kao ostale fascikle |
| 2 | Trokrevetna soba: kvadratura, sprat, raspored ležajeva, broj osoba | smestaj.html, red ispod naslova | `trokrevetnaMeta` | jedna rečenica, na primer "18 m2, prvi sprat, tri razdvojena ležaja, do 3 osobe" |
| 3 | Trokrevetna soba: opis i oprema | smestaj.html, pasus ispod | `trokrevetnaOpis` | dve do tri rečenice, isto kao za ostale sobe |
| 4 | Šta poklon vaučer sadrži | vauceri.html, prvi korak | `vaucerSadrzaj` | jedna rečenica, na primer "boravak po izboru ili SPA termin, po dogovoru" |
| 5 | Kako se vaučer plaća | vauceri.html, drugi korak | `vaucerPlacanje` | jedna rečenica, na primer "uplatnicom na račun ili gotovinom na recepciji" |
| 6 | Kako se vaučer preuzima | vauceri.html, treći korak | `vaucerDostava` | jedna rečenica, na primer "štampan na recepciji ili poslat mejlom" |
| 7 | Radno vreme recepcije | kontakt.html, tabela podataka | `recepcijaRadnoVreme` | sati, na primer "07 do 22h, noću po dogovoru" |
| 8 | Da li SPA mogu koristiti gosti koji ne noće u vili | spa.html | `spaSpoljniGosti` | da ili ne, plus rečenica ako ima uslova |
| 9 | Trajanje SPA termina, broj osoba po terminu, paketi | spa.html | `spaTermin` | jedna rečenica, na primer "termin traje 60 minuta, za najviše 4 osobe" |
| 10 | Koliko se putuje iz Beograda | index.html i kontakt.html | `putBeograd` | vreme vožnje, na primer "oko 1h 30min" |
| 11 | Koliko se putuje iz Požarevca | index.html i kontakt.html | `putPozarevac` | vreme vožnje, na primer "oko 30min" |

## Nađeno u ovoj sesiji, nije bilo na prvobitnoj listi

| # | Šta | Zašto pitamo |
|---|-----|--------------|
| 12 | Tačna adresa | Na Booking-u piše "Jezerska 59, 12220 Veliko Gradište", a na sajtu i u Zoranovim porukama stoji "Jezerska bb, Beli Bagrem". Treba jedna adresa na oba mesta, jer ide i u mapu i u JSON-LD |
| 13 | Fotografija i nekoliko rečenica o domaćinima | Na o-nama.html stoji isprekidan okvir za taj blok. Ako Zoran to ne želi, blok se briše i stranica ostaje ispravna |
| 14 | Veća verzija naslovne fotografije | Postojeća "Za naslovnu.png" daje sliku od 1086 px širine, što je meko na velikim ekranima. Original iz aparata bi rešio |
| 15 | Logo u fajlu | Favicon je za sada napravljen kao slova VS na plavoj boji iz sajta. Ako Zoran ima logo (sunce sa Booking-a ili sa fasade), ide taj |

## Ne pitamo Zorana, ovo je odluka za Lazara

- Rečenica "Jedini SPA na jezeru" stoji na početnoj, na spa i na o-nama stranici. To je tvrdnja o tržištu koju Zoran nije napisao ni u jednoj poruci. Zoran jeste video verziju u kojoj ta rečenica postoji i rekao "mislim da je to to", pa je ostavljena. Predlog: ostaviti ako Lazar potvrdi da je tačno, inače zameniti sa "SPA centar u vili".
