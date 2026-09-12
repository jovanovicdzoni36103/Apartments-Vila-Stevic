/* Vila & SPA Stević, skripta za sve stranice. Bez biblioteka. Putanje slika su u objektu SLIKE ispod (generisano po fasciklama vlasnika). */
(() => {
  "use strict";
  const html = document.documentElement;
  html.classList.add("js");

  /* ==========================================================================
     SLIKE: jedino mesto gde stoje putanje fotografija. Ključ -> putanja u folderu slike/.
     Zamena slike = promena jedne vrednosti ovde. Fotografije su od vlasnika (07.09.2026), 1600 px, bez EXIF podataka;
     dronBlizu i dronDalje su sa starog sajta. Mehanizam "puna verzija pa mala" radi samo za putanje sa sufiksom -ŠIRINAxVISINA.
     ========================================================================== */
  const SLIKE = {
    vilaDan: "slike/vila-dan.jpg",
    vilaDanMala: "slike/vila-dan-mala.jpg",
    vilaNoc: "slike/vila-noc.jpg",
    vaucer: "slike/vaucer.jpg",
    dronBlizu: "slike/dron-blizu.jpg",
    dronDalje: "slike/dron-dalje.jpg",
    apartmanA1: "slike/apartman-a-1.jpg",
    apartmanA2: "slike/apartman-a-2.jpg",
    apartmanA3: "slike/apartman-a-3.jpg",
    apartmanA4: "slike/apartman-a-4.jpg",
    apartmanA5: "slike/apartman-a-5.jpg",
    apartmanA6: "slike/apartman-a-6.jpg",
    apartmanA7: "slike/apartman-a-7.jpg",
    apartmanA8: "slike/apartman-a-8.jpg",
    apartmanB1: "slike/apartman-b-1.jpg",
    apartmanB2: "slike/apartman-b-2.jpg",
    apartmanB3: "slike/apartman-b-3.jpg",
    apartmanB4: "slike/apartman-b-4.jpg",
    apartmanB5: "slike/apartman-b-5.jpg",
    apartmanB6: "slike/apartman-b-6.jpg",
    apartmanC1: "slike/apartman-c-1.jpg",
    apartmanC2: "slike/apartman-c-2.jpg",
    apartmanC3: "slike/apartman-c-3.jpg",
    apartmanC4: "slike/apartman-c-4.jpg",
    apartmanC5: "slike/apartman-c-5.jpg",
    apartmanC6: "slike/apartman-c-6.jpg",
    apartmanC7: "slike/apartman-c-7.jpg",
    jednokrevetna1: "slike/soba-jednokrevetna-1.jpg",
    jednokrevetna2: "slike/soba-jednokrevetna-2.jpg",
    jednokrevetna3: "slike/soba-jednokrevetna-3.jpg",
    jednokrevetna4: "slike/soba-jednokrevetna-4.jpg",
    jednokrevetna5: "slike/soba-jednokrevetna-5.jpg",
    jednokrevetna6: "slike/soba-jednokrevetna-6.jpg",
    dvokrevetna1: "slike/soba-dvokrevetna-1.jpg",
    dvokrevetna2: "slike/soba-dvokrevetna-2.jpg",
    dvokrevetna3: "slike/soba-dvokrevetna-3.jpg",
    dvokrevetna4: "slike/soba-dvokrevetna-4.jpg",
    dvokrevetna5: "slike/soba-dvokrevetna-5.jpg",
    dvokrevetna6: "slike/soba-dvokrevetna-6.jpg",
    // Trokrevetna dole, nisam sig jel dobro sve
    trokrevetna1: "slike/soba-trokrevetna-1.jpg",
    trokrevetna2: "slike/soba-trokrevetna-2.jpg",
    trokrevetna3: "slike/soba-trokrevetna-3.jpg",
    trokrevetna4: "slike/soba-trokrevetna-4.jpg",
    trokrevetna5: "slike/soba-trokrevetna-5.jpg",
    trokrevetna6: "slike/soba-trokrevetna-6.jpg",

    bracni1: "slike/soba-bracni-1.jpg",
    bracni2: "slike/soba-bracni-2.jpg",
    bracni3: "slike/soba-bracni-3.jpg",
    bracni4: "slike/soba-bracni-4.jpg",
    bracni5: "slike/soba-bracni-5.jpg",
    bracni6: "slike/soba-bracni-6.jpg",
    bracni7: "slike/soba-bracni-7.jpg",
    bracni8: "slike/soba-bracni-8.jpg",
    spa1: "slike/spa-1.jpg",
    spa2: "slike/spa-2.jpg",
    spa3: "slike/spa-3.jpg",
    spa4: "slike/spa-4.jpg",
    spa5: "slike/spa-5.jpg",
    spa6: "slike/spa-6.jpg",
    spa7: "slike/spa-7.jpg",
    spa8: "slike/spa-8.jpg",
    spa9: "slike/spa-9.jpg",
  };
  const SAMO_MALA = new Set([]);

  /* ==========================================================================
     PODACI KOJI ČEKAJU VLASNIKA. Kad odgovor stigne, upiši tekst između navodnika i to je sve.
     Prazno polje znači da na sajtu ostaje žuta oznaka [potvrditi: ...].
     Ista vrednost se pojavljuje na svim mestima gde taj podatak stoji.
     ========================================================================== */
  const PODACI = {
    putBeograd: "" /* npr. oko 1h 30min, početna i kontakt */,
    putPozarevac: "" /* npr. oko 30min, početna i kontakt */,
    recepcijaRadnoVreme: "" /* kontakt */,
    spaSpoljniGosti: "" /* spa */,
    spaTermin: "" /* trajanje termina, broj osoba, paketi, spa */,
    vaucerSadrzaj: "" /* vaučeri */,
    vaucerPlacanje: "" /* vaučeri */,
    vaucerDostava: "" /* vaučeri */,
    trokrevetnaMeta: "" /* kvadratura, sprat, ležajevi, broj osoba, smeštaj */,
    trokrevetnaOpis: "" /* opis i oprema, smeštaj */,
  };

  const KONTAKT = {
    tel: "+381644500600",
    telPrikaz: "064/4500-600",
    wa: "381644500600",
    mejl: "vilastevic@gmail.com",
  };
  const BOOKING_URL = "https://www.booking.com/hotel/rs/vila-stevia.html";
  /* ENDPOINT ZA FORME: adresa Google Apps Script web aplikacije. Jedna linija.
     Prazno = forme otvaraju mailto i WhatsApp sa popunjenom porukom (rezervni put).
     Primalac mejla se NE menja ovde nego u Apps Script projektu, u Script Properties, ključ PRIMALAC. */
  const FORM_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwM_zjT7NCVsRLQDV-AlOotI4jDktciNvrjENibk_jQEdDylf3Q0lm51V2Z__XaGjGy_A/exec";

  const q = (s, r) => (r || document).querySelector(s);
  const qa = (s, r) => Array.from((r || document).querySelectorAll(s));
  const PASIVNO = { passive: true };
  const smanjenPokret = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const desktop = () => window.matchMedia("(min-width: 1024px)").matches;

  /* --------------------------------------------------------------------------
     1. Slike: puna verzija pa mala, i CSS promenljive --slika-<kljuc> u :root
     -------------------------------------------------------------------------- */
  const punaVerzija = (url) => url.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, "$1");
  Object.keys(SLIKE).forEach((k) =>
    html.style.setProperty("--slika-" + k, 'url("' + SLIKE[k] + '")'),
  );

  function postaviSliku(img) {
    const kljuc = img.dataset.slika || img.dataset.slikaMala;
    const mala = SLIKE[kljuc];
    if (!mala) return;
    const probajPunu = "slika" in img.dataset && !SAMO_MALA.has(kljuc);
    const prva = probajPunu ? punaVerzija(mala) : mala;
    let pokusaj = 0;
    img.addEventListener(
      "error",
      () => {
        pokusaj += 1;
        if (pokusaj === 1 && prva !== mala) {
          img.src = mala;
          return;
        }
        img.style.visibility =
          "hidden"; /* iza ostaje mirna siva ili tamna površina kontejnera */
      },
      PASIVNO,
    );
    img.addEventListener(
      "load",
      () => img.classList.add("ucitana"),
      Object.assign({ once: true }, PASIVNO),
    );
    /* src stoji i u HTML-u, pa slika radi i bez skripte. Ako je već učitana, load se neće ponoviti. */
    if (img.getAttribute("src") !== prva) img.src = prva;
    if (img.complete && img.naturalWidth > 0) img.classList.add("ucitana");
  }
  qa("img[data-slika], img[data-slika-mala]").forEach(postaviSliku);

  /* Popunjavanje mesta koja čekaju vlasnika. Prazna vrednost ostavlja žutu oznaku. */
  qa("[data-podatak]").forEach((el) => {
    const v = PODACI[el.dataset.podatak];
    if (v && String(v).trim()) {
      el.textContent = String(v).trim();
      el.classList.remove("tbd");
    }
  });

  /* --------------------------------------------------------------------------
     2. Termin: traka na stranici ako postoji, inače parametri iz adrese.
        Stanje putuje između stranica kroz ?dolazak=...&odlazak=...&odrasli=..&deca=..&g=5,9
     -------------------------------------------------------------------------- */
  const pad = (n) => String(n).padStart(2, "0");
  const isoDatum = (d) =>
    d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const danas = () => isoDatum(new Date());
  const plusDana = (iso, n) => {
    const [g, m, d] = iso.split("-").map(Number);
    return isoDatum(new Date(g, m - 1, d + n));
  };
  const lepDatum = (iso) => {
    if (!iso) return "";
    const [g, m, d] = iso.split("-");
    return d + "." + m + "." + g + ".";
  };
  const kratakDatum = (iso) => {
    if (!iso) return "";
    const [, m, d] = iso.split("-");
    return d + "." + m + ".";
  };
  const jeDatum = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || "");
  const uOpsegu = (v, min, max) => {
    let n = parseInt(v, 10);
    if (isNaN(n)) n = min;
    return Math.min(max, Math.max(min, n));
  };
  const mnozina = (n, jedan, dva, pet) => {
    const d = n % 10,
      s = n % 100;
    const rec =
      d === 1 && s !== 11
        ? jedan
        : d >= 2 && d <= 4 && (s < 10 || s >= 20)
          ? dva
          : pet;
    return n + " " + rec;
  };

  const trakaEl = q("#termin");
  const traka = trakaEl
    ? {
        el: trakaEl,
        forma: q("#forma-termin"),
        dolazak: q("#dolazak"),
        odlazak: q("#odlazak"),
        odrasli: q("#odrasli"),
        deca: q("#deca"),
        godine: q("#godine-dece"),
        godineNaslov: q("#godine-naslov"),
      }
    : null;

  function stanjeIzAdrese() {
    const p = new URLSearchParams(window.location.search);
    const dolazak = jeDatum(p.get("dolazak")) ? p.get("dolazak") : "";
    const odlazak = jeDatum(p.get("odlazak")) ? p.get("odlazak") : "";
    const deca = uOpsegu(p.get("deca") || 0, 0, 10);
    const godine = (p.get("g") || "")
      .split(",")
      .filter((x) => x !== "")
      .slice(0, deca)
      .map((x) => String(uOpsegu(x, 0, 17)));
    return {
      dolazak,
      odlazak:
        odlazak > dolazak ? odlazak : dolazak ? plusDana(dolazak, 1) : "",
      odrasli: uOpsegu(p.get("odrasli") || 2, 1, 30),
      deca,
      godine,
    };
  }
  function stanje() {
    if (!traka) return stanjeIzAdrese();
    return {
      dolazak: traka.dolazak.value,
      odlazak: traka.odlazak.value,
      odrasli: uOpsegu(traka.odrasli.value, 1, 30),
      deca: uOpsegu(traka.deca.value, 0, 10),
      godine: qa("input", traka.godine).map((i) => i.value.trim()),
    };
  }
  const gostiTekst = (s) =>
    mnozina(s.odrasli, "odrasla osoba", "odrasle osobe", "odraslih") +
    (s.deca ? " i " + mnozina(s.deca, "dete", "deteta", "dece") : "");
  const terminTekst = (s) =>
    s.dolazak && s.odlazak
      ? lepDatum(s.dolazak) + " do " + lepDatum(s.odlazak)
      : "";

  /* Upit za prenos stanja na drugu stranicu. Prazan kad je sve podrazumevano. */
  function upitStanja(s) {
    const p = new URLSearchParams();
    if (s.dolazak && s.odlazak) {
      p.set("dolazak", s.dolazak);
      p.set("odlazak", s.odlazak);
    }
    if (s.odrasli !== 2) p.set("odrasli", String(s.odrasli));
    if (s.deca) {
      p.set("deca", String(s.deca));
      const g = s.godine.slice(0, s.deca).filter((x) => x !== "");
      if (g.length) p.set("g", g.join(","));
    }
    return p.toString();
  }

  /* Jedina funkcija za Booking link. Poziva se u trenutku klika, da pokupi trenutno stanje.
     Bez datuma vraća čist bazni URL. Parametar age se ponavlja tačno onoliko puta koliko ima dece. */
  function bookingUrl(opcije) {
    const s = Object.assign(stanje(), opcije || {});
    if (!s.dolazak || !s.odlazak) return BOOKING_URL;
    const url = new URL(BOOKING_URL);
    url.searchParams.set("checkin", s.dolazak);
    url.searchParams.set("checkout", s.odlazak);
    url.searchParams.set("group_adults", String(s.odrasli));
    url.searchParams.set("group_children", String(s.deca));
    for (let i = 0; i < s.deca; i++) {
      const g = s.godine[i];
      url.searchParams.append(
        "age",
        g === undefined || g === "" ? "0" : String(g),
      );
    }
    url.searchParams.set("no_rooms", String(s.sobe || 1));
    url.searchParams.set("selected_currency", "EUR");
    return url.toString();
  }

  const waUrl = (tekst) =>
    "https://wa.me/" + KONTAKT.wa + "?text=" + encodeURIComponent(tekst);
  function porukaWa(jedinica, tema) {
    const s = stanje();
    const termin = terminTekst(s);
    const zaTermin = termin
      ? " za termin " + termin + " (" + gostiTekst(s) + ")"
      : "";
    if (tema === "spa")
      return (
        "Zdravo! Zanima me SPA u Vili Stević: slana soba, sauna, đakuzi i masaža." +
        (termin ? " Dolazimo " + termin : "")
      );
    if (tema === "vaucer")
      return "Zdravo! Zanima me poklon vaučer za Vilu Stević.";
    if (jedinica)
      return (
        "Zdravo! Zanima me " +
        jedinica +
        " u Vili Stević" +
        zaTermin +
        ". Da li je slobodno?"
      );
    return "Zdravo! Zanima me smeštaj u Vili Stević" + zaTermin + ".";
  }

  /* Interni linkovi (druge stranice sajta) nose izabrani termin dalje. */
  const interni = qa("a[href]").filter((a) =>
    /^[a-z0-9-]+\.html(#[a-z0-9-]*)?$/i.test(a.getAttribute("href")),
  );
  interni.forEach((a) => {
    a.dataset.osnova = a.getAttribute("href");
  });
  function azurirajInterneLinkove(s) {
    const upit = upitStanja(s);
    interni.forEach((a) => {
      const [strana, sidro] = a.dataset.osnova.split("#");
      a.setAttribute(
        "href",
        strana +
          (upit ? "?" + upit : "") +
          (sidro !== undefined ? "#" + sidro : ""),
      );
    });
  }
  function azurirajLinkove() {
    const s = stanje();
    const bu = bookingUrl();
    qa("a.js-booking").forEach((a) => {
      a.href = bu;
    });
    qa("a.js-wa").forEach((a) => {
      a.href = waUrl(porukaWa(a.dataset.jedinica, a.dataset.tema));
    });
    azurirajInterneLinkove(s);
    return s;
  }

  const mini = q("#mini");
  function azurirajMini(s) {
    const t = mini && q(".mini__tekst", mini);
    if (!t) return;
    t.textContent =
      s.dolazak && s.odlazak
        ? kratakDatum(s.dolazak) +
          " do " +
          kratakDatum(s.odlazak) +
          " · " +
          gostiTekst(s)
        : "Termin nije izabran";
  }
  function prefilujKontakt(s) {
    [
      ["k-dolazak", s.dolazak],
      ["k-odlazak", s.odlazak],
    ].forEach(([id, v]) => {
      const i = q("#" + id);
      if (!i) return;
      if (!i.value || i.dataset.auto === "1") {
        i.value = v;
        i.dataset.auto = "1";
      }
    });
  }
  qa("#k-dolazak, #k-odlazak").forEach((i) =>
    i.addEventListener(
      "change",
      () => {
        i.dataset.auto = "0";
      },
      PASIVNO,
    ),
  );

  function azuriraj() {
    const s = azurirajLinkove();
    azurirajMini(s);
    prefilujKontakt(s);
    html.classList.toggle("ima-decu", s.deca > 0);
  }

  function proveriGodine() {
    if (!traka) return true;
    const s = stanje();
    if (!s.deca) return true;
    const polja = qa("input", traka.godine);
    const prazna = polja.filter((i) => i.value.trim() === "");
    polja.forEach((i) => i.classList.toggle("greska", i.value.trim() === ""));
    traka.godine.classList.toggle("greska", prazna.length > 0);
    traka.godineNaslov.textContent = prazna.length
      ? "Upišite godine dece:"
      : "Godine dece:";
    if (!prazna.length) return true;
    prazna[0].focus();
    return false;
  }

  function renderGodine(n, vrednosti) {
    if (!traka) return;
    const postojeca = qa(".polje", traka.godine);
    while (postojeca.length > n) traka.godine.removeChild(postojeca.pop());
    for (let i = postojeca.length; i < n; i++) {
      const p = document.createElement("div");
      p.className = "polje polje--godine";
      p.innerHTML =
        '<label for="dete-' +
        (i + 1) +
        '">Dete ' +
        (i + 1) +
        "</label>" +
        '<input id="dete-' +
        (i + 1) +
        '" name="dete-' +
        (i + 1) +
        '" type="number" inputmode="numeric" min="0" max="17" placeholder="god.">';
      traka.godine.appendChild(p);
    }
    if (vrednosti)
      qa("input", traka.godine).forEach((i, k) => {
        if (vrednosti[k] !== undefined) i.value = vrednosti[k];
      });
    traka.godine.classList.toggle("aktivno", n > 0);
    if (!n) {
      traka.godine.classList.remove("greska");
      traka.godineNaslov.textContent = "Godine dece:";
    }
  }

  if (traka) {
    traka.dolazak.min = danas();
    traka.odlazak.min = plusDana(danas(), 1);
    traka.dolazak.addEventListener(
      "change",
      () => {
        if (traka.dolazak.value) {
          if (traka.dolazak.value < danas()) traka.dolazak.value = danas();
          const min = plusDana(traka.dolazak.value, 1);
          traka.odlazak.min = min;
          if (!traka.odlazak.value || traka.odlazak.value < min)
            traka.odlazak.value = min;
        }
        azuriraj();
      },
      PASIVNO,
    );
    traka.odlazak.addEventListener(
      "change",
      () => {
        const d = traka.dolazak.value;
        if (d && traka.odlazak.value && traka.odlazak.value <= d)
          traka.odlazak.value = plusDana(d, 1);
        azuriraj();
      },
      PASIVNO,
    );
    traka.odrasli.addEventListener(
      "input",
      () => {
        if (traka.odrasli.value !== "")
          traka.odrasli.value = uOpsegu(traka.odrasli.value, 1, 30);
        azuriraj();
      },
      PASIVNO,
    );
    traka.odrasli.addEventListener(
      "change",
      () => {
        traka.odrasli.value = uOpsegu(traka.odrasli.value, 1, 30);
        azuriraj();
      },
      PASIVNO,
    );
    traka.deca.addEventListener(
      "input",
      () => {
        const n = uOpsegu(traka.deca.value, 0, 10);
        if (traka.deca.value !== "") traka.deca.value = n;
        renderGodine(n);
        azuriraj();
      },
      PASIVNO,
    );
    traka.deca.addEventListener(
      "change",
      () => {
        const n = uOpsegu(traka.deca.value, 0, 10);
        traka.deca.value = n;
        renderGodine(n);
        azuriraj();
      },
      PASIVNO,
    );
    traka.godine.addEventListener(
      "input",
      (e) => {
        if (e.target.value.trim() !== "") e.target.classList.remove("greska");
        if (!qa("input.greska", traka.godine).length) {
          traka.godine.classList.remove("greska");
          traka.godineNaslov.textContent = "Godine dece:";
        }
        azuriraj();
      },
      PASIVNO,
    );
    if (traka.forma)
      traka.forma.addEventListener("submit", (e) => {
        e.preventDefault();
        const d = q('[data-cta="traka-booking"]');
        if (d) d.click();
      });

    /* Početno stanje trake: iz adrese ako je termin došao sa druge stranice. */
    const iz = stanjeIzAdrese();
    if (iz.dolazak && iz.dolazak >= danas()) {
      traka.dolazak.value = iz.dolazak;
      traka.odlazak.min = plusDana(iz.dolazak, 1);
      traka.odlazak.value = iz.odlazak;
    }
    traka.odrasli.value = iz.odrasli;
    traka.deca.value = iz.deca;
    renderGodine(iz.deca, iz.godine);

    /* Mala traka pri vrhu (telefon i tablet) kad se prava traka odskroluje iznad. */
    if (mini && "IntersectionObserver" in window) {
      new IntersectionObserver(
        ([en]) => {
          mini.classList.toggle(
            "vidljiva",
            !en.isIntersecting && en.boundingClientRect.bottom < 48,
          );
        },
        { rootMargin: "-48px 0px 0px 0px", threshold: 0 },
      ).observe(traka.el);
    }
  }

  /* Visina lepljive trake, za razmak pinovane SPA slike i za skok na sidra. */
  function izmeriTraku() {
    html.style.setProperty(
      "--traka-visina",
      (traka && desktop() ? traka.el.offsetHeight : 0) + "px",
    );
  }
  izmeriTraku();
  if (traka && "ResizeObserver" in window)
    new ResizeObserver(izmeriTraku).observe(traka.el);
  window.addEventListener("resize", izmeriTraku, PASIVNO);

  /* Svako Booking i WhatsApp dugme dobija sveže sastavljen link u trenutku klika. */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("a.js-booking");
    if (b) {
      if (!proveriGodine()) {
        e.preventDefault();
        return;
      }
      b.href = bookingUrl();
      return;
    }
    const w = e.target.closest("a.js-wa");
    if (w) w.href = waUrl(porukaWa(w.dataset.jedinica, w.dataset.tema));
  });

  /* --------------------------------------------------------------------------
     3. Navigacija na telefonu
     -------------------------------------------------------------------------- */
  const hamburger = q(".nav__hamburger");
  if (hamburger) {
    const zatvoriMeni = () => {
      html.classList.remove("meni-otvoren");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Otvori meni");
    };
    hamburger.addEventListener(
      "click",
      () => {
        const otvoren = html.classList.toggle("meni-otvoren");
        hamburger.setAttribute("aria-expanded", String(otvoren));
        hamburger.setAttribute(
          "aria-label",
          otvoren ? "Zatvori meni" : "Otvori meni",
        );
      },
      PASIVNO,
    );
    qa("#meni a").forEach((a) =>
      a.addEventListener("click", zatvoriMeni, PASIVNO),
    );
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") zatvoriMeni();
      },
      PASIVNO,
    );
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      if (e.matches) zatvoriMeni();
    });
  }

  /* --------------------------------------------------------------------------
     4. Ulazne animacije: IntersectionObserver, prag 0.15, jednom, stagger 80 ms
     -------------------------------------------------------------------------- */
  const animirani = qa(".anim");
  if (smanjenPokret || !("IntersectionObserver" in window)) {
    animirani.forEach((el) => el.classList.add("vidljivo"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        const brojac = new Map();
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const roditelj = el.parentElement;
          let k = 0;
          if (roditelj && roditelj.hasAttribute("data-stagger")) {
            k = brojac.get(roditelj) || 0;
            brojac.set(roditelj, k + 1);
          }
          el.style.transitionDelay = k * 80 + "ms";
          el.classList.add("vidljivo");
          io.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );
    animirani.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------------------------
     5. SPA na početnoj: slika stoji (position: sticky), tekst prolazi. Samo čitanje
        getBoundingClientRect u requestAnimationFrame. Nikakav programski skrol.
     -------------------------------------------------------------------------- */
  const pin = q(".spa__pin");
  if (pin && !smanjenPokret) {
    const blokovi = qa(".spa__blok", pin);
    const slike = qa(".spa__slika img", pin);
    let aktivan = 0,
      zakazano = false;
    const izmeri = () => {
      zakazano = false;
      if (!desktop()) return;
      const centar = window.innerHeight / 2;
      let naj = 0,
        najD = Infinity;
      blokovi.forEach((b, i) => {
        const r = b.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - centar);
        if (d < najD) {
          najD = d;
          naj = i;
        }
      });
      if (naj !== aktivan) {
        aktivan = naj;
        slike.forEach((s, i) => s.classList.toggle("aktivna", i === naj));
        blokovi.forEach((b, i) => b.classList.toggle("aktivan", i === naj));
      }
    };
    const naSkrol = () => {
      if (!zakazano) {
        zakazano = true;
        requestAnimationFrame(izmeri);
      }
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        ([en]) => {
          if (en.isIntersecting) {
            window.addEventListener("scroll", naSkrol, PASIVNO);
            naSkrol();
          } else window.removeEventListener("scroll", naSkrol);
        },
        { threshold: 0 },
      ).observe(pin);
    } else {
      window.addEventListener("scroll", naSkrol, PASIVNO);
    }
  }

  /* --------------------------------------------------------------------------
     6. Galerija na početnoj: prikaži sve
     -------------------------------------------------------------------------- */
  const galerija = q("#galerija"),
    jos = q("#galerija-jos");
  if (galerija && jos) {
    jos.addEventListener(
      "click",
      () => {
        galerija.classList.add("sve");
        jos.setAttribute("aria-expanded", "true");
        jos.hidden = true;
      },
      PASIVNO,
    );
  }

  /* --------------------------------------------------------------------------
     7. Forme: sastave poruku, pa mailto ili WhatsApp. Sa FORM_ENDPOINT šalju fetch-om.
     -------------------------------------------------------------------------- */
  function poljeVrednost(forma, ime) {
    const el = forma.elements[ime];
    return el ? String(el.value || "").trim() : "";
  }

  /* Tekst poruke koji ide u mejl, u WhatsApp i u kolonu poruka_cela. */
  function teloPoruke(forma) {
    const v = (ime) => poljeVrednost(forma, ime);
    const vrsta = forma.dataset.vrsta;
    const s = stanje();
    const redovi = [];
    let naslov;
    if (vrsta === "vaucer") {
      naslov = "Upit za poklon vaučer";
      redovi.push(
        "Upit za poklon vaučer sa sajta.",
        "Ime: " + v("ime"),
        "Telefon: " + v("telefon"),
        "Mejl: " + v("mejl"),
        "Vaučer: " + v("sadrzaj"),
      );
    } else {
      const dolazak = v("dolazak"),
        odlazak = v("odlazak");
      const termin =
        dolazak && odlazak
          ? lepDatum(dolazak) + " do " + lepDatum(odlazak)
          : "nije izabran";
      naslov = "Upit sa sajta" + (dolazak && odlazak ? ": " + termin : "");
      const godine = s.deca
        ? " (godine: " +
          s.godine
            .slice(0, s.deca)
            .map((g) => g || "?")
            .join(", ") +
          ")"
        : "";
      redovi.push(
        "Upit sa sajta.",
        "Ime: " + v("ime"),
        "Telefon: " + v("telefon"),
        "Mejl: " + v("mejl"),
        "Termin: " + termin,
        "Odrasli: " + s.odrasli + ", deca: " + s.deca + godine,
      );
    }
    if (v("poruka")) redovi.push("Poruka: " + v("poruka"));
    return { naslov: naslov, telo: redovi.join("\n") };
  }

  /* Provera pre slanja: ime, bar jedan kontakt, ispravan mejl, odlazak posle dolaska.
     Dolazak sme da bude današnji datum, zbog gosta koji dolazi večeras. */
  function proveriFormu(forma) {
    const v = (ime) => poljeVrednost(forma, ime);
    const greske = [];
    qa(".polje--greska", forma).forEach((el) =>
      el.classList.remove("polje--greska"),
    );
    const oznaci = (ime) => {
      const el = forma.elements[ime];
      if (el && el.closest(".polje"))
        el.closest(".polje").classList.add("polje--greska");
    };

    if (!v("ime")) {
      greske.push("Upišite ime.");
      oznaci("ime");
    }
    const tel = v("telefon"),
      mejl = v("mejl");
    if (!tel && !mejl) {
      greske.push("Upišite telefon ili mejl da bismo mogli da odgovorimo.");
      oznaci("telefon");
      oznaci("mejl");
    }
    if (mejl && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mejl)) {
      greske.push("Mejl nije ispravan.");
      oznaci("mejl");
    }
    const d = v("dolazak"),
      o = v("odlazak");
    if (d && !jeDatum(d)) {
      greske.push("Datum dolaska nije ispravan.");
      oznaci("dolazak");
    }
    if (o && !jeDatum(o)) {
      greske.push("Datum odlaska nije ispravan.");
      oznaci("odlazak");
    }
    if (d && jeDatum(d) && d < danas()) {
      greske.push("Dolazak ne može biti u prošlosti.");
      oznaci("dolazak");
    }
    if (d && o && jeDatum(d) && jeDatum(o) && o <= d) {
      greske.push("Odlazak mora biti posle dolaska.");
      oznaci("odlazak");
    }
    if (forma.dataset.vrsta === "vaucer" && !v("sadrzaj")) {
      greske.push("Upišite šta biste poklonili.");
      oznaci("sadrzaj");
    }
    if (forma.dataset.vrsta !== "vaucer" && !v("poruka")) {
      greske.push("Napišite kratku poruku.");
      oznaci("poruka");
    }
    return greske;
  }

  function posaljiFormu(forma, kanal) {
    const s = stanje();
    const { naslov, telo } = teloPoruke(forma);
    const status = q(".forma__status", forma);
    const javi = (t, vrsta) => {
      if (!status) return;
      status.textContent = t;
      status.classList.toggle("forma__status--greska", vrsta === "greska");
      status.classList.toggle("forma__status--uspeh", vrsta === "uspeh");
    };
    const rezervni =
      " Ako vam se žuri, pozovite " +
      KONTAKT.telPrikaz +
      " ili pišite na WhatsApp.";

    if (kanal === "wa") {
      const greske = proveriFormu(forma);
      if (greske.length) {
        javi(greske[0], "greska");
        return;
      }
      const prozor = window.open(waUrl(telo), "_blank");
      if (prozor) prozor.opener = null;
      else window.location.href = waUrl(telo);
      javi("Otvorili smo WhatsApp sa popunjenom porukom.");
      return;
    }

    const mejlom = (poruka) => {
      javi((poruka || "Slanje nije uspelo.") + rezervni, "greska");
      window.location.href =
        "mailto:" +
        KONTAKT.mejl +
        "?subject=" +
        encodeURIComponent(naslov) +
        "&body=" +
        encodeURIComponent(telo);
    };

    const greske = proveriFormu(forma);
    if (greske.length) {
      javi(greske[0], "greska");
      return;
    }

    /* Honeypot: polje koje čovek ne vidi. Ako je popunjeno, tiho stajemo. */
    if (poljeVrednost(forma, "website")) {
      javi(
        "Upit je stigao. Javljamo se na telefon ili mejl koji ste ostavili.",
        "uspeh",
      );
      forma.reset();
      return;
    }

    if (!FORM_ENDPOINT) {
      javi(
        "Otvorili smo vaš mejl program sa popunjenom porukom. Ako se ništa nije otvorilo, pišite na " +
          KONTAKT.mejl +
          ".",
      );
      window.location.href =
        "mailto:" +
        KONTAKT.mejl +
        "?subject=" +
        encodeURIComponent(naslov) +
        "&body=" +
        encodeURIComponent(telo);
      return;
    }

    const dugmad = qa("button[type=submit]", forma);
    dugmad.forEach((b) => {
      b.disabled = true;
    });
    const primarno = q('button[data-kanal="mejl"]', forma);
    const staroIme = primarno ? primarno.textContent : "";
    if (primarno) primarno.textContent = "Šaljemo...";
    javi("Šaljemo upit...");

    /* Telo ide kao x-www-form-urlencoded, da browser ne šalje CORS preflight. */
    const polja = new URLSearchParams();
    Array.from(forma.elements).forEach((el) => {
      if (el.name) polja.set(el.name, el.value);
    });
    polja.set("vrsta", forma.dataset.vrsta || "kontakt");
    polja.set(
      "jedinica",
      forma.dataset.vrsta === "vaucer" ? "Poklon vaučer" : "",
    );
    polja.set("odrasli", String(s.odrasli));
    polja.set("deca", String(s.deca));
    polja.set("godine", s.godine.slice(0, s.deca).join(","));
    polja.set(
      "stranica",
      window.location.pathname.split("/").pop() || "index.html",
    );
    polja.set("naslov", naslov);
    polja.set("poruka_cela", telo);

    const vrati = () => {
      dugmad.forEach((b) => {
        b.disabled = false;
      });
      if (primarno) primarno.textContent = staroIme;
    };

    fetch(FORM_ENDPOINT, { method: "POST", body: polja })
      .then((r) => r.json().catch(() => ({ ok: r.ok })))
      .then((o) => {
        vrati();
        if (o && o.ok) {
          javi(
            "Upit je stigao. Javljamo se na telefon ili mejl koji ste ostavili.",
            "uspeh",
          );
          forma.reset();
          qa(".polje--greska", forma).forEach((el) =>
            el.classList.remove("polje--greska"),
          );
          azuriraj();
        } else {
          mejlom(o && o.greska ? o.greska : "Slanje nije uspelo.");
        }
      })
      .catch(() => {
        vrati();
        mejlom("Slanje nije uspelo.");
      });
  }

  qa("form.js-forma").forEach((forma) => {
    let kanal = "mejl";
    qa("button[data-kanal]", forma).forEach((b) =>
      b.addEventListener(
        "click",
        () => {
          kanal = b.dataset.kanal;
        },
        PASIVNO,
      ),
    );
    forma.addEventListener("submit", (e) => {
      e.preventDefault();
      posaljiFormu(forma, (e.submitter && e.submitter.dataset.kanal) || kanal);
    });
  });

  /* --------------------------------------------------------------------------
     9. Lightbox: klik na fotografiju u mozaiku ili galeriji otvara <dialog> sa velikom slikom.
        Bez pomeranja skrola; Escape zatvara, strelice listaju.
     -------------------------------------------------------------------------- */
  const svetlo = q("#svetlo");
  if (svetlo && typeof svetlo.showModal === "function") {
    const slikaEl = q("img", svetlo),
      opisEl = q("figcaption", svetlo);
    let grupa = [],
      indeks = 0;
    const prikazi = (i) => {
      if (!grupa.length) return;
      indeks = (i + grupa.length) % grupa.length;
      const img = q("img", grupa[indeks]);
      slikaEl.src = img.getAttribute("src") || "";
      slikaEl.alt = img.alt || "";
      opisEl.textContent =
        (img.alt ? img.alt + " · " : "") + (indeks + 1) + " / " + grupa.length;
    };
    const otvori = (f) => {
      grupa = qa('figure[data-svetlo="' + f.dataset.svetlo + '"]');
      prikazi(Math.max(0, grupa.indexOf(f)));
      svetlo.showModal();
      html.classList.add("svetlo-otvoreno");
    };
    svetlo.addEventListener(
      "close",
      () => {
        html.classList.remove("svetlo-otvoreno");
        slikaEl.removeAttribute("src");
      },
      PASIVNO,
    );
    qa("figure[data-svetlo]").forEach((f) => {
      f.setAttribute("tabindex", "0");
      f.setAttribute("role", "button");
      f.addEventListener("click", () => otvori(f), PASIVNO);
      f.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          otvori(f);
        }
      });
    });
    q(".svetlo__zatvori", svetlo).addEventListener(
      "click",
      () => svetlo.close(),
      PASIVNO,
    );
    q(".svetlo__pre", svetlo).addEventListener(
      "click",
      () => prikazi(indeks - 1),
      PASIVNO,
    );
    q(".svetlo__sledeca", svetlo).addEventListener(
      "click",
      () => prikazi(indeks + 1),
      PASIVNO,
    );
    svetlo.addEventListener(
      "click",
      (e) => {
        if (e.target === svetlo) svetlo.close();
      },
      PASIVNO,
    );
    svetlo.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "ArrowRight") prikazi(indeks + 1);
        if (e.key === "ArrowLeft") prikazi(indeks - 1);
      },
      PASIVNO,
    );
  }

  /* --------------------------------------------------------------------------
     8. Početno stanje
     -------------------------------------------------------------------------- */
  const godina = q("#godina");
  if (godina) godina.textContent = String(new Date().getFullYear());
  azuriraj();
})();
