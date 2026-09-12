# TESTIRANJE NIJE LIVE

## Status

Ovaj dokument opisuje trenutno stanje projekta za testiranje. Verzija nije označena kao live produkcija.

## Projekat

Vila & SPA Stević — statičan HTML, CSS i vanilla JavaScript sajt.

## Šta je testirano

- Svih 9 HTML stranica se učitava preko lokalnog HTTP servera.
- Sve lokalne slike, CSS i JavaScript putanje postoje.
- Sva interna sidra rade, uključujući `#termin` i `smestaj.html#sobe`.
- Početna stranica ima booking formu sa validacijom datuma.
- Neispravan period boravka prikazuje jasnu poruku korisniku.
- Booking link koristi unete datume i broj gostiju.
- Mobilni meni ima ispravan `aria-expanded` status.
- Galerija koristi lightbox sa zatvaranjem preko Escape tastera.
- Kontakt forma ima status poruke i fallback ponašanje.
- Sve stranice imaju jedan glavni `h1` element.
- JSON-LD na početnoj stranici je validan.
- `git diff --check` prolazi bez whitespace grešaka.
- HTTP smoke test vraća `200 OK` za sve stranice, CSS i JavaScript.

## Trenutne provere

Cena i raspoloživost se proveravaju preko Booking-a. SPA termini se dogovaraju na recepciji.

Voucher cene, sadržaj paketa, rok važenja, plaćanje i dostava nisu javno navedeni jer nisu potvrđeni u izvornoj dokumentaciji.

## Napomena

Pre objave kao live verzije treba dodatno potvrditi:

- sadržaj i cene voucher ponuda
- trajanje i cene SPA termina
- politiku za spoljne SPA goste
- radno vreme recepcije
- produkcioni endpoint kontakt forme
- finalni domen i canonical URL-ove
