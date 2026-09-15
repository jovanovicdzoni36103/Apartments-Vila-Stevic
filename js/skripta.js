/* ==========================================================================
   VILA & SPA STEVIĆ — skripta za sve stranice. Bez biblioteka, bez build koraka.
   Sadržaj:
     1. Podaci koje menja vlasnik (kontakt, Booking, endpoint forme)
     2. Datumi i stanje termina (putuje kroz ?dolazak=&odlazak=&odrasli=&deca=&g=)
     3. Kalendar (sopstveni, bez native date polja)
     4. Navigacija, panel za termin, meni
     5. Booking link i WhatsApp poruke
     6. Forme
     7. Harmonika, lightbox, ulazne animacije
   ========================================================================== */
(() => {
  "use strict";
  const html = document.documentElement;
  html.classList.add("js");

  /* ------------------------------------------------------------------------
     1. PODACI KOJE MENJA VLASNIK
     ------------------------------------------------------------------------ */
  const KONTAKT = {
    tel: "+381644500600",
    telPrikaz: "064/4500-600",
    wa: "381644500600",
    mejl: "vilastevic@gmail.com",
  };
  const BOOKING_URL = "https://www.booking.com/hotel/rs/vila-stevia.html";

  /* Adresa Google Apps Script web aplikacije. Prazno = forme otvaraju mejl program.
     Primalac se menja u Apps Script projektu (Script Properties, ključ PRIMALAC). */
  const FORM_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwM_zjT7NCVsRLQDV-AlOotI4jDktciNvrjENibk_jQEdDylf3Q0lm51V2Z__XaGjGy_A/exec";

  const q = (s, r) => (r || document).querySelector(s);
  const qa = (s, r) => Array.from((r || document).querySelectorAll(s));
  const PASIVNO = { passive: true };
  const tihoKretanje = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     2. DATUMI I STANJE
     ------------------------------------------------------------------------ */
  const MESECI = ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"];
  const MESECI_KRATKO = ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec"];
  const DANI = ["pon","uto","sre","čet","pet","sub","ned"];

  const dva = (n) => String(n).padStart(2, "0");
  const iso = (d) => d.getFullYear() + "-" + dva(d.getMonth() + 1) + "-" + dva(d.getDate());
  const odIso = (s) => { const [g, m, d] = s.split("-").map(Number); return new Date(g, m - 1, d); };
  const danas = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const plusDana = (s, n) => { const d = odIso(s); d.setDate(d.getDate() + n); return iso(d); };
  const jeDatum = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || "");
  const uOpsegu = (v, min, max) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min; };
  const lepDatum = (s) => { const d = odIso(s); return d.getDate() + ". " + MESECI[d.getMonth()] + " " + d.getFullYear() + "."; };
  const kratakDatum = (s) => { const d = odIso(s); return d.getDate() + ". " + MESECI_KRATKO[d.getMonth()]; };
  const noci = (a, b) => Math.round((odIso(b) - odIso(a)) / 86400000);
  const mnozina = (n, j, d, p) => {
    const z = n % 10, s = n % 100;
    return n + " " + (z === 1 && s !== 11 ? j : z >= 2 && z <= 4 && (s < 10 || s >= 20) ? d : p);
  };

  const stanje = (() => {
    const p = new URLSearchParams(window.location.search);
    const dolazak = jeDatum(p.get("dolazak")) ? p.get("dolazak") : "";
    let odlazak = jeDatum(p.get("odlazak")) ? p.get("odlazak") : "";
    if (dolazak && (!odlazak || odlazak <= dolazak)) odlazak = plusDana(dolazak, 1);
    if (!dolazak) odlazak = "";
    const deca = uOpsegu(p.get("deca") || 0, 0, 10);
    return {
      dolazak, odlazak,
      odrasli: uOpsegu(p.get("odrasli") || 2, 1, 20),
      deca,
      godine: (p.get("g") || "").split(",").filter((x) => x !== "").slice(0, deca).map((x) => String(uOpsegu(x, 0, 17))),
    };
  })();

  const imaTermin = () => Boolean(stanje.dolazak && stanje.odlazak);
  const terminTekst = () => (imaTermin() ? lepDatum(stanje.dolazak) + " do " + lepDatum(stanje.odlazak) : "");
  const terminKratko = () => (imaTermin() ? kratakDatum(stanje.dolazak) + " do " + kratakDatum(stanje.odlazak) : "");
  const gostiTekst = () =>
    mnozina(stanje.odrasli, "odrasla osoba", "odrasle osobe", "odraslih") +
    (stanje.deca ? " i " + mnozina(stanje.deca, "dete", "deteta", "dece") : "");

  function upit() {
    const p = new URLSearchParams();
    if (imaTermin()) { p.set("dolazak", stanje.dolazak); p.set("odlazak", stanje.odlazak); }
    if (stanje.odrasli !== 2) p.set("odrasli", String(stanje.odrasli));
    if (stanje.deca) {
      p.set("deca", String(stanje.deca));
      const g = stanje.godine.slice(0, stanje.deca).filter((x) => x !== "");
      if (g.length) p.set("g", g.join(","));
    }
    return p.toString();
  }

  /* ------------------------------------------------------------------------
     3. BOOKING I WHATSAPP
     ------------------------------------------------------------------------ */
  function bookingUrl(sobe) {
    if (!imaTermin()) return BOOKING_URL;
    const u = new URL(BOOKING_URL);
    u.searchParams.set("checkin", stanje.dolazak);
    u.searchParams.set("checkout", stanje.odlazak);
    u.searchParams.set("group_adults", String(stanje.odrasli));
    u.searchParams.set("group_children", String(stanje.deca));
    for (let i = 0; i < stanje.deca; i++) u.searchParams.append("age", stanje.godine[i] || "0");
    u.searchParams.set("no_rooms", String(sobe || 1));
    u.searchParams.set("selected_currency", "EUR");
    return u.toString();
  }
  const waUrl = (t) => "https://wa.me/" + KONTAKT.wa + "?text=" + encodeURIComponent(t);
  const viberUrl = "viber://chat?number=%2B" + KONTAKT.wa;

  function porukaWa(jedinica, tema) {
    const zaTermin = imaTermin() ? " za termin " + terminTekst() + " (" + gostiTekst() + ")" : "";
    if (tema === "spa") return "Zdravo! Zanima me SPA centar u Vili Stević." + (imaTermin() ? " Dolazimo " + terminTekst() + "." : "");
    if (tema === "vaucer") return "Zdravo! Zanima me poklon vaučer za Vilu Stević.";
    if (jedinica) return "Zdravo! Zanima me " + jedinica + " u Vili Stević" + zaTermin + ". Da li je slobodno?";
    return "Zdravo! Zanima me smeštaj u Vili Stević" + zaTermin + ".";
  }

  /* Interni linkovi nose termin dalje kroz sajt. */
  const interni = qa('a[href]').filter((a) => /^[a-z0-9-]+\.html(#[a-z0-9-]*)?$/i.test(a.getAttribute("href")));
  interni.forEach((a) => { a.dataset.osnova = a.getAttribute("href"); });

  function osveziLinkove() {
    const u = upit();
    interni.forEach((a) => {
      const [strana, sidro] = a.dataset.osnova.split("#");
      a.setAttribute("href", strana + (u ? "?" + u : "") + (sidro !== undefined ? "#" + sidro : ""));
    });
    qa("[data-booking]").forEach((a) => {
      a.setAttribute("href", bookingUrl(a.dataset.booking || 1));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    qa("[data-wa]").forEach((a) => {
      a.setAttribute("href", waUrl(porukaWa(a.dataset.wa, a.dataset.waTema)));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    qa("[data-viber]").forEach((a) => a.setAttribute("href", viberUrl));
    qa("[data-termin-tekst]").forEach((el) => {
      el.textContent = imaTermin()
        ? terminKratko() + " · " + mnozina(noci(stanje.dolazak, stanje.odlazak), "noć", "noći", "noći")
        : el.dataset.terminTekst || "Izaberite termin";
    });
    qa("[data-termin-pun]").forEach((el) => {
      el.textContent = imaTermin() ? terminTekst() + " · " + gostiTekst() : "Termin nije izabran";
    });
    qa("[data-termin-ima]").forEach((el) => { el.hidden = !imaTermin(); });
    qa("[data-termin-nema]").forEach((el) => { el.hidden = imaTermin(); });
    /* Popuni skrivena polja u formama */
    qa("form [name=dolazak]").forEach((el) => { if (el.type === "hidden") el.value = stanje.dolazak; });
    qa("form [name=odlazak]").forEach((el) => { if (el.type === "hidden") el.value = stanje.odlazak; });
  }

  /* ------------------------------------------------------------------------
     4. KALENDAR — dva meseca, izbor opsega, bez native polja
     ------------------------------------------------------------------------ */
  function napraviKalendar(koren, priPromeni) {
    if (!koren) return null;
    let kursor = new Date(imaTermin() ? odIso(stanje.dolazak) : danas());
    kursor.setDate(1);
    let cekaKraj = false;

    const vrh = document.createElement("div");
    vrh.className = "kal__vrh";
    vrh.innerHTML =
      '<div class="kal__nav">' +
      '<button type="button" data-smer="-1" aria-label="Prethodni mesec">&#8249;</button>' +
      '<button type="button" data-smer="1" aria-label="Sledeći mesec">&#8250;</button>' +
      "</div>";
    const meseci = document.createElement("div");
    meseci.className = "kal__meseci";
    koren.append(vrh, meseci);

    function crtajMesec(pomak) {
      const d = new Date(kursor.getFullYear(), kursor.getMonth() + pomak, 1);
      const el = document.createElement("div");
      const naslov = document.createElement("div");
      naslov.className = "kal__ime";
      naslov.textContent = MESECI[d.getMonth()] + " " + d.getFullYear();
      const zaglavlje = document.createElement("div");
      zaglavlje.className = "kal__zaglavlje";
      zaglavlje.innerHTML = DANI.map((x) => "<span>" + x + "</span>").join("");
      const mreza = document.createElement("div");
      mreza.className = "kal__dani";

      const prvi = (new Date(d.getFullYear(), d.getMonth(), 1).getDay() + 6) % 7;
      const brojDana = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      for (let i = 0; i < prvi; i++) {
        const p = document.createElement("div"); p.className = "kal__prazan"; mreza.append(p);
      }
      const min = iso(danas());
      for (let dan = 1; dan <= brojDana; dan++) {
        const v = iso(new Date(d.getFullYear(), d.getMonth(), dan));
        const b = document.createElement("button");
        b.type = "button";
        b.className = "kal__dan";
        b.innerHTML = "<span>" + dan + "</span>";
        b.dataset.datum = v;
        if (v < min) b.disabled = true;
        if (v === stanje.dolazak) b.dataset.pocetak = "1";
        if (v === stanje.odlazak) b.dataset.kraj = "1";
        if (imaTermin() && v > stanje.dolazak && v < stanje.odlazak) b.dataset.uOpsegu = "1";
        const opis = dan + ". " + MESECI[d.getMonth()] + " " + d.getFullYear();
        b.setAttribute("aria-label", opis);
        mreza.append(b);
      }
      el.append(naslov, zaglavlje, mreza);
      return el;
    }

    function crtaj() {
      meseci.textContent = "";
      meseci.append(crtajMesec(0), crtajMesec(1));
      const nazad = q('[data-smer="-1"]', vrh);
      const sada = danas();
      nazad.disabled = kursor.getFullYear() === sada.getFullYear() && kursor.getMonth() === sada.getMonth();
    }

    vrh.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-smer]");
      if (!b) return;
      kursor = new Date(kursor.getFullYear(), kursor.getMonth() + Number(b.dataset.smer), 1);
      crtaj();
    });

    meseci.addEventListener("click", (e) => {
      const b = e.target.closest(".kal__dan");
      if (!b || b.disabled) return;
      const v = b.dataset.datum;
      if (!cekaKraj || !stanje.dolazak || v <= stanje.dolazak) {
        stanje.dolazak = v;
        stanje.odlazak = "";
        cekaKraj = true;
      } else {
        stanje.odlazak = v;
        cekaKraj = false;
      }
      crtaj();
      /* Posle ponovnog iscrtavanja fokus se vraća na isti dan, zbog tastature. */
      const opet = meseci.querySelector('.kal__dan[data-datum="' + v + '"]');
      if (opet) opet.focus({ preventScroll: true });
      if (priPromeni) priPromeni();
    });

    crtaj();
    return { crtaj };
  }

  /* ------------------------------------------------------------------------
     5. NAVIGACIJA, MENI, PANEL
     ------------------------------------------------------------------------ */
  const nav = q(".nav");
  const preko = nav && nav.classList.contains("nav--preko");
  if (nav) {
    const prag = () => (preko ? Math.min(window.innerHeight * 0.55, 460) : 24);
    const proveri = () => nav.classList.toggle("nav--cvrst", window.scrollY > prag());
    proveri();
    window.addEventListener("scroll", proveri, PASIVNO);
    window.addEventListener("resize", proveri, PASIVNO);
  }

  const meni = q("#meni");
  const meniDugme = q("[data-meni]");
  if (meni && meniDugme) {
    const prebaci = (otvoren) => {
      meni.dataset.otvoren = otvoren ? "1" : "0";
      meniDugme.setAttribute("aria-expanded", String(otvoren));
      document.body.style.overflow = otvoren ? "hidden" : "";
      if (otvoren && nav) nav.classList.add("nav--cvrst");
      else if (nav && preko && window.scrollY <= Math.min(window.innerHeight * 0.55, 460)) nav.classList.remove("nav--cvrst");
    };
    meniDugme.addEventListener("click", () => prebaci(meni.dataset.otvoren !== "1"));
    qa("a", meni).forEach((a) => a.addEventListener("click", () => prebaci(false), PASIVNO));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && meni.dataset.otvoren === "1") prebaci(false); });
  }

  const panel = q("#panel-termin");
  if (panel) {
    const otvoraci = qa("[data-panel]");
    const zatvori = q("[data-panel-zatvori]", panel);
    const zbir = q("[data-panel-zbir]", panel);
    const kalKoren = q(".kal", panel);
    const odrasliEl = q('[data-brojac="odrasli"] input', panel);
    const decaEl = q('[data-brojac="deca"] input', panel);
    const godineKoren = q("[data-godine]", panel);
    let kal = null;

    const osveziZbir = () => {
      if (!zbir) return;
      zbir.textContent = imaTermin()
        ? terminTekst() + " · " + mnozina(noci(stanje.dolazak, stanje.odlazak), "noć", "noći", "noći") + " · " + gostiTekst()
        : "Izaberite datum dolaska i odlaska.";
    };
    const crtajGodine = () => {
      if (!godineKoren) return;
      godineKoren.hidden = stanje.deca === 0;
      const treba = stanje.deca;
      const ima = qa("input", godineKoren).length;
      if (ima === treba) return;
      const polja = q("[data-godine-polja]", godineKoren);
      polja.textContent = "";
      for (let i = 0; i < treba; i++) {
        const w = document.createElement("label");
        w.className = "polje";
        w.innerHTML =
          '<span class="sr">Godine ' + (i + 1) + ". deteta</span>" +
          '<input type="number" min="0" max="17" inputmode="numeric" value="' +
          (stanje.godine[i] !== undefined ? stanje.godine[i] : "") + '" placeholder="god.">';
        polja.append(w);
      }
      qa("input", polja).forEach((inp, i) =>
        inp.addEventListener("input", () => { stanje.godine[i] = String(uOpsegu(inp.value, 0, 17)); osveziLinkove(); })
      );
    };
    const sve = () => { osveziZbir(); osveziLinkove(); };

    qa("[data-brojac]", panel).forEach((b) => {
      const inp = q("input", b);
      const kljuc = b.dataset.brojac;
      const min = Number(b.dataset.min || 0), max = Number(b.dataset.max || 20);
      const primeni = () => {
        stanje[kljuc] = uOpsegu(inp.value, min, max);
        inp.value = stanje[kljuc];
        qa("button", b)[0].disabled = stanje[kljuc] <= min;
        qa("button", b)[1].disabled = stanje[kljuc] >= max;
        if (kljuc === "deca") { stanje.godine = stanje.godine.slice(0, stanje.deca); crtajGodine(); }
        sve();
      };
      qa("button", b).forEach((dug, i) =>
        dug.addEventListener("click", () => { inp.value = Number(inp.value || 0) + (i === 0 ? -1 : 1); primeni(); })
      );
      inp.addEventListener("input", primeni);
      inp.value = stanje[kljuc];
      primeni();
    });

    const prebaciPanel = (otvoren) => {
      panel.dataset.otvoren = otvoren ? "1" : "0";
      otvoraci.forEach((o) => o.setAttribute("aria-expanded", String(otvoren)));
      if (otvoren) {
        if (!kal) kal = napraviKalendar(kalKoren, sve);
        if (nav) nav.classList.add("nav--cvrst");
        const prvi = q("button:not([disabled])", panel);
        if (prvi) setTimeout(() => prvi.focus({ preventScroll: true }), 60);
      }
    };
    otvoraci.forEach((o) => {
      o.setAttribute("aria-expanded", "false");
      o.addEventListener("click", (e) => { e.preventDefault(); prebaciPanel(panel.dataset.otvoren !== "1"); });
    });
    if (zatvori) zatvori.addEventListener("click", () => prebaciPanel(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && panel.dataset.otvoren === "1") prebaciPanel(false); });
    /* Kalendar se posle svakog klika ponovo iscrtava, pa kliknuto dugme više nije u
       dokumentu kad klik dođe do document-a. Zato se pripadnost panelu pamti na pritisak. */
    let pritisakUPanelu = false;
    document.addEventListener(
      "pointerdown",
      (e) => {
        const t = e.target;
        pritisakUPanelu =
          panel.contains(t) || Boolean(t.closest && t.closest("[data-panel]"));
      },
      true
    );
    document.addEventListener("click", () => {
      if (panel.dataset.otvoren !== "1") return;
      if (pritisakUPanelu) return;
      prebaciPanel(false);
    });
    crtajGodine();
    osveziZbir();
  }

  /* ------------------------------------------------------------------------
     6. FORME
     ------------------------------------------------------------------------ */
  const vrednost = (f, ime) => { const el = f.elements[ime]; return el ? String(el.value || "").trim() : ""; };

  function teloPoruke(forma) {
    const v = (i) => vrednost(forma, i);
    const vrsta = forma.dataset.vrsta || "kontakt";
    const redovi = [];
    let naslov;
    if (vrsta === "vaucer") {
      naslov = "Upit za poklon vaučer" + (v("vaucer") ? ": " + v("vaucer") : "");
      redovi.push("Upit za poklon vaučer sa sajta.", "Ime: " + v("ime"), "Telefon: " + v("telefon"), "Mejl: " + v("mejl"), "Vaučer: " + v("vaucer"));
    } else {
      const termin = imaTermin() ? terminTekst() : "nije izabran";
      naslov = "Upit sa sajta" + (imaTermin() ? ": " + terminKratko() : "");
      const godine = stanje.deca ? " (godine: " + stanje.godine.slice(0, stanje.deca).map((g) => g || "?").join(", ") + ")" : "";
      redovi.push("Upit sa sajta.", "Ime: " + v("ime"), "Telefon: " + v("telefon"), "Mejl: " + v("mejl"),
        "Termin: " + termin, "Gosti: " + stanje.odrasli + " odraslih, " + stanje.deca + " dece" + godine);
      if (forma.dataset.jedinica) redovi.push("Jedinica: " + forma.dataset.jedinica);
    }
    if (v("poruka")) redovi.push("Poruka: " + v("poruka"));
    return { naslov, telo: redovi.join("\n") };
  }

  function proveri(forma) {
    const v = (i) => vrednost(forma, i);
    const greske = [];
    qa(".polje--greska", forma).forEach((el) => el.classList.remove("polje--greska"));
    const oznaci = (ime) => {
      const el = forma.elements[ime];
      if (el && el.closest(".polje")) el.closest(".polje").classList.add("polje--greska");
    };
    if (!v("ime")) { greske.push("Upišite ime."); oznaci("ime"); }
    const tel = v("telefon"), mejl = v("mejl");
    if (!tel && !mejl) { greske.push("Ostavite telefon ili mejl da bismo mogli da odgovorimo."); oznaci("telefon"); oznaci("mejl"); }
    if (mejl && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mejl)) { greske.push("Mejl nije ispravan."); oznaci("mejl"); }
    if (forma.dataset.vrsta === "vaucer" && !v("vaucer")) { greske.push("Izaberite vaučer."); oznaci("vaucer"); }
    return greske;
  }

  function posalji(forma, kanal) {
    const { naslov, telo } = teloPoruke(forma);
    const status = q(".forma__status", forma);
    const javi = (t, vrsta) => {
      if (!status) return;
      status.textContent = t;
      status.classList.toggle("forma__status--greska", vrsta === "greska");
      status.classList.toggle("forma__status--uspeh", vrsta === "uspeh");
    };
    const greske = proveri(forma);
    if (greske.length) { javi(greske[0], "greska"); return; }

    if (kanal === "wa") {
      const p = window.open(waUrl(telo), "_blank");
      if (p) p.opener = null; else window.location.href = waUrl(telo);
      javi("Otvorili smo WhatsApp sa popunjenom porukom.");
      return;
    }
    if (vrednost(forma, "website")) { javi("Upit je stigao. Javljamo se na telefon ili mejl koji ste ostavili.", "uspeh"); forma.reset(); return; }

    const mailto = () =>
      (window.location.href = "mailto:" + KONTAKT.mejl + "?subject=" + encodeURIComponent(naslov) + "&body=" + encodeURIComponent(telo));

    if (!FORM_ENDPOINT) {
      javi("Otvorili smo vaš mejl program sa popunjenom porukom. Ako se ništa nije otvorilo, pišite na " + KONTAKT.mejl + ".");
      mailto(); return;
    }

    const dugmad = qa("button[type=submit]", forma);
    const primarno = q('button[data-kanal="mejl"]', forma);
    const staro = primarno ? primarno.textContent : "";
    dugmad.forEach((b) => { b.disabled = true; });
    if (primarno) primarno.textContent = "Šaljemo...";
    javi("Šaljemo upit...");

    const polja = new URLSearchParams();
    Array.from(forma.elements).forEach((el) => { if (el.name) polja.set(el.name, el.value); });
    polja.set("vrsta", forma.dataset.vrsta || "kontakt");
    polja.set("jedinica", forma.dataset.jedinica || (forma.dataset.vrsta === "vaucer" ? "Poklon vaučer" : ""));
    polja.set("dolazak", stanje.dolazak);
    polja.set("odlazak", stanje.odlazak);
    polja.set("odrasli", String(stanje.odrasli));
    polja.set("deca", String(stanje.deca));
    polja.set("godine", stanje.godine.slice(0, stanje.deca).join(","));
    polja.set("stranica", window.location.pathname.split("/").pop() || "index.html");
    polja.set("naslov", naslov);
    polja.set("poruka_cela", telo);

    const vrati = () => { dugmad.forEach((b) => { b.disabled = false; }); if (primarno) primarno.textContent = staro; };

    fetch(FORM_ENDPOINT, { method: "POST", body: polja })
      .then((r) => r.json().catch(() => ({ ok: r.ok })))
      .then((o) => {
        vrati();
        if (o && o.ok) {
          javi("Upit je stigao. Javljamo se na telefon ili mejl koji ste ostavili.", "uspeh");
          forma.reset();
          qa(".polje--greska", forma).forEach((el) => el.classList.remove("polje--greska"));
          osveziLinkove();
        } else {
          javi("Slanje nije uspelo. Otvaramo mejl program. Ako se žuri, pozovite " + KONTAKT.telPrikaz + ".", "greska");
          mailto();
        }
      })
      .catch(() => {
        vrati();
        javi("Slanje nije uspelo. Otvaramo mejl program. Ako se žuri, pozovite " + KONTAKT.telPrikaz + ".", "greska");
        mailto();
      });
  }

  qa("form.js-forma").forEach((forma) => {
    forma.setAttribute("novalidate", "");
    forma.addEventListener("submit", (e) => {
      e.preventDefault();
      posalji(forma, (e.submitter && e.submitter.dataset.kanal) || "mejl");
    });
  });

  /* ------------------------------------------------------------------------
     7. HARMONIKA
     ------------------------------------------------------------------------ */
  qa(".pitanje").forEach((p) => {
    const dug = q(".pitanje__dugme", p);
    const telo = q(".pitanje__telo", p);
    if (!dug || !telo) return;
    const id = telo.id || "pitanje-" + Math.random().toString(36).slice(2, 8);
    telo.id = id;
    dug.setAttribute("aria-controls", id);
    dug.setAttribute("aria-expanded", "false");
    dug.addEventListener("click", () => {
      const otvoreno = p.dataset.otvoreno === "1";
      p.dataset.otvoreno = otvoreno ? "0" : "1";
      dug.setAttribute("aria-expanded", String(!otvoreno));
    });
  });

  /* ------------------------------------------------------------------------
     8. LIGHTBOX
     ------------------------------------------------------------------------ */
  const kutija = q("#svetlo-kutija");
  if (kutija) {
    const slika = q("[data-lb-slika]", kutija);
    const potpis = q("[data-lb-potpis]", kutija);
    const broj = q("[data-lb-broj]", kutija);
    let grupa = [], i = 0;

    const prikazi = (n) => {
      i = (n + grupa.length) % grupa.length;
      const el = grupa[i];
      slika.src = el.dataset.puna || el.querySelector("img").currentSrc || el.querySelector("img").src;
      slika.alt = el.querySelector("img").alt || "";
      if (potpis) potpis.textContent = el.dataset.potpis || el.querySelector("img").alt || "";
      if (broj) broj.textContent = i + 1 + " / " + grupa.length;
    };
    qa("[data-lb]").forEach((el) => {
      el.addEventListener("click", () => {
        grupa = qa('[data-lb="' + el.dataset.lb + '"]');
        prikazi(grupa.indexOf(el));
        kutija.showModal();
        document.body.style.overflow = "hidden";
      });
    });
    kutija.addEventListener("close", () => { document.body.style.overflow = ""; });
    q("[data-lb-x]", kutija).addEventListener("click", () => kutija.close());
    q("[data-lb-nazad]", kutija).addEventListener("click", () => prikazi(i - 1));
    q("[data-lb-napred]", kutija).addEventListener("click", () => prikazi(i + 1));
    kutija.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prikazi(i - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); prikazi(i + 1); }
    });
    kutija.addEventListener("click", (e) => { if (e.target === kutija) kutija.close(); });
  }

  /* ------------------------------------------------------------------------
     9. ULAZNE ANIMACIJE
     ------------------------------------------------------------------------ */
  const zaAnim = qa(".anim, .anim-foto");
  if (tihoKretanje || !("IntersectionObserver" in window)) {
    zaAnim.forEach((el) => el.classList.add("vidljiv"));
  } else {
    const io = new IntersectionObserver(
      (unosi) => {
        unosi.forEach((u) => {
          if (!u.isIntersecting) return;
          const el = u.target;
          const roditelj = el.parentElement;
          const braca = roditelj ? Array.from(roditelj.children).filter((x) => x.classList.contains("anim")) : [];
          const red = Math.min(braca.indexOf(el), 5);
          el.style.transitionDelay = red > 0 ? red * 70 + "ms" : "";
          el.classList.add("vidljiv");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    zaAnim.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------------
     10. Start
     ------------------------------------------------------------------------ */
  const hero = q(".hero");
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("ucitan")));

  osveziLinkove();
})();
