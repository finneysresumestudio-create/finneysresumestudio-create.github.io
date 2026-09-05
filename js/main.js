/* =====================================================================
   Finney's Resume Studio interactions
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = $("#siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = $("#navToggle");
  const mobileMenu = $("#mobileMenu");
  if (navToggle && mobileMenu) {
    const setMenu = (open) => {
      mobileMenu.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    navToggle.addEventListener("click", () =>
      setMenu(!mobileMenu.classList.contains("open"))
    );
    $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- Transformations switcher ---------- */
  const TRANSFORMS = [
    { name: "Emily Carter",   role: "Executive Sales Leader · Sales Management",       slug: "emily-carter" },
    { name: "Michelle Nelson", role: "Global Human Resources Leader · People Operations", slug: "michelle-nelson" },
    { name: "Mark Daniels",   role: "Enterprise Product Leader · Platform Integration", slug: "mark-daniels" },
    { name: "Nicole Barrett", role: "Senior Literature Educator · Student Mentor",      slug: "nicole-barrett" },
    { name: "Josh Allen",     role: "Client Experience & Operations · Early Career",    slug: "josh-allen" },
  ];
  const baBefore = $("#baBefore");
  const baAfter  = $("#baAfter");
  const baName   = $("#baName");
  const baRole   = $("#baRole");
  const baBtns   = $$(".ba-controls button");

  function showTransform(i) {
    const t = TRANSFORMS[i];
    if (!t || !baBefore) return;
    baBefore.src = `assets/img/transformations/${t.slug}-before.jpg`;
    baBefore.alt = `${t.name}'s resume before: the original document`;
    baAfter.src  = `assets/img/transformations/${t.slug}-after.jpg`;
    baAfter.alt  = `${t.name}'s resume after: a clean, professionally designed layout`;
    baName.textContent = t.name;
    baRole.textContent = t.role;
    baBtns.forEach((b, j) => {
      const active = j === i;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", String(active));
    });
  }
  baBtns.forEach((b) =>
    b.addEventListener("click", () => showTransform(Number(b.dataset.ba)))
  );

  /* ---------- Template gallery ---------- */
  const TEMPLATES = [
    "ava-sinclair", "bryce-kim", "elena-park", "isabelle-grant",
    "samuel-ortiz", "sofia-bennett", "zach-thompson",
  ];
  const titleCase = (slug) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const tGrid = $("#templateGrid");
  if (tGrid) {
    tGrid.innerHTML = TEMPLATES.map((slug) => {
      const name = titleCase(slug);
      return `
      <figure class="template-item" data-lightbox data-src="assets/img/templates/${slug}.jpg" data-cap="${name} template sample" role="button" tabindex="0" aria-label="View the ${name} template sample">
        <img src="assets/img/templates/${slug}.jpg" alt="${name} resume template sample" loading="lazy" />
        <figcaption class="t-name">
          <b>${name}</b>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
        </figcaption>
      </figure>`;
    }).join("");
  }

  /* ---------- Story Builder tabs ---------- */
  const sbTabs = $$(".sb-tabs button");
  const sbPanels = $$(".sb-panel");
  sbTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.sb;
      sbTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });
      sbPanels.forEach((p) =>
        p.classList.toggle("active", p.dataset.panel === key)
      );
    });
  });

  /* ---------- FAQ category tabs ---------- */
  const catBtns = $$(".faq-cats button");
  const faqGroups = $$(".faq-group");
  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.cat;
      catBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });
      faqGroups.forEach((g) =>
        g.classList.toggle("active", g.dataset.group === cat)
      );
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const ans = q.nextElementSibling;
      const isOpen = item.classList.contains("open");
      // close siblings within the same group
      const group = q.closest(".faq-group");
      $$(".faq-item.open", group).forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", String(!isOpen));
      ans.style.maxHeight = !isOpen ? ans.scrollHeight + "px" : null;
    });
  });
  // Recompute any open answer's height on resize so it never clips or leaves a gap
  let faqResizeT;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(faqResizeT);
      faqResizeT = setTimeout(() => {
        $$(".faq-item.open .faq-a").forEach((a) => {
          a.style.maxHeight = "none";
          const h = a.scrollHeight;
          a.style.maxHeight = h + "px";
        });
      }, 120);
    },
    { passive: true }
  );

  /* ---------- Clipboard helper ---------- */
  async function writeClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for browsers/contexts without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove();
      return ok;
    }
  }
  function bindCopy(btn, getText) {
    const originalHTML = btn.innerHTML;
    let resetT;
    btn.addEventListener("click", async () => {
      const ok = await writeClipboard(getText());
      btn.textContent = ok ? "Copied!" : "Copy failed";
      clearTimeout(resetT);
      resetT = setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
    });
  }
  const copyBtn = $("#copyEmail");
  if (copyBtn) bindCopy(copyBtn, () => copyBtn.dataset.email);

  /* ---------- Mailto fallback ----------
     mailto: links silently do nothing on devices with no default email app
     (typical for webmail users on desktop). Let the click proceed; if the
     page still has focus shortly after (no mail app or chooser appeared),
     offer Gmail-in-browser and copy-the-address alternatives. */
  function parseMailto(href) {
    const raw = href.slice(7);
    const qIdx = raw.indexOf("?");
    const to = decodeURIComponent(qIdx === -1 ? raw : raw.slice(0, qIdx));
    let subject = "";
    if (qIdx !== -1) {
      subject = new URLSearchParams(raw.slice(qIdx + 1)).get("subject") || "";
    }
    return { to, subject };
  }
  function gmailComposeUrl(to, subject) {
    let u = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to);
    if (subject) u += "&su=" + encodeURIComponent(subject);
    return u;
  }

  let mailToast = null;
  let mailToastHideT = null;
  function showMailFallback(to, subject) {
    if (!mailToast) {
      mailToast = document.createElement("div");
      mailToast.className = "mail-toast";
      mailToast.setAttribute("role", "status");
      mailToast.innerHTML =
        '<p><b>Didn\'t see an email window open?</b> No problem, reach Laura one of these ways instead.</p>' +
        '<div class="mail-toast-actions">' +
        '<a class="btn btn-accent" target="_blank" rel="noopener">Open in Gmail</a>' +
        '<button class="btn btn-light" type="button">Copy address</button>' +
        "</div>" +
        '<button class="mail-toast-close" type="button" aria-label="Dismiss">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        "</button>";
      document.body.appendChild(mailToast);
      bindCopy(mailToast.querySelector("button.btn-light"), () => mailToast.dataset.email);
      mailToast.querySelector(".mail-toast-close").addEventListener("click", hideMailFallback);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") hideMailFallback();
      });
    }
    mailToast.dataset.email = to;
    mailToast.querySelector("a.btn-accent").href = gmailComposeUrl(to, subject);
    mailToast.classList.add("show");
    clearTimeout(mailToastHideT);
    mailToastHideT = setTimeout(hideMailFallback, 15000);
  }
  function hideMailFallback() {
    if (mailToast) mailToast.classList.remove("show");
    clearTimeout(mailToastHideT);
  }

  let mailCheckT = null;
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    const { to, subject } = parseMailto(link.getAttribute("href"));
    if (!to) return;
    let left = false;
    const onLeave = () => { left = true; };
    window.addEventListener("blur", onLeave, { once: true });
    document.addEventListener("visibilitychange", onLeave, { once: true });
    clearTimeout(mailCheckT);
    mailCheckT = setTimeout(() => {
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onLeave);
      if (!left && document.hasFocus()) showMailFallback(to, subject);
    }, 1100);
  });

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  const lbClose = $("#lbClose");
  const lbReady = !!(lightbox && lbImg && lbCap && lbClose);
  let lastFocused = null;

  function openLightbox(src, cap, altText) {
    if (!lbReady || !src) return;
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = altText || cap || "Resume preview";
    lbCap.textContent = cap || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    if (!lbReady) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lbImg.src = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }
  // Single activation path shared by click + keyboard so they never diverge
  function activate(trigger) {
    if (!trigger) return;
    const img = trigger.querySelector("img");
    const src = trigger.dataset.src || (img && img.src);
    const cap = trigger.dataset.cap || (img && img.alt);
    openLightbox(src, cap, img && img.alt);
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (trigger) activate(trigger);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const trigger = e.target.closest("[data-lightbox]");
    if (trigger) {
      e.preventDefault();
      activate(trigger);
    }
  });
  if (lbReady) {
    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    // Esc to close; keep focus on the only focusable control while open
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "Tab") {
        e.preventDefault();
        lbClose.focus();
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = ["services", "pricing", "transformations", "stories", "start", "about", "faq", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navMap = {};
  $$(".nav-links a").forEach((a) => {
    const id = a.getAttribute("href").replace("#", "");
    navMap[id] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Object.values(navMap).forEach((a) => a.classList.remove("active"));
            const link = navMap[entry.target.id];
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
