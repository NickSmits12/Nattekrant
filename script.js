/**
 * De Natte Krant Loodgieters - Shared Client-Side Logic
 * -------------------- -----------------------------------------------
 * This script is loaded on all pages (Home, Services, FAQ, Contact).
 *
 * MAIN FEATURES:
 * - Language switching (English, Dutch, German) with localStorage persistence
 * - Smooth scrolling for in-page anchor links (e.g. "#top")
 * - Dynamic loading of services and FAQ items from content.json
 * - Collapsible FAQ items with accessible ARIA attributes
 * - Simple contact form validation with a client-side success message
 * - Automatic current year in the footer
 *
 * HOW TO EXTEND / MODIFY:
 * - To change services or FAQ content, edit content.json in the project root.
 *   The JavaScript will automatically update the Services and FAQ pages.
 * - To connect the contact form to a real backend, replace the placeholder
 *   handler in initContactForm() with a fetch() or traditional form POST.
 */

// ========================= TRANSLATIONS ========================= 
const translations = {
  en: {
    "nav-home": "Home",
    "nav-services": "Services",
    "nav-faq": "FAQ",
    "nav-contact": "Contact",
    "hero-title": "Your trusted plumber in Hengelo. Fast, professional, reliable.",
    "hero-subtitle": "Expert plumbing for emergency repairs, installations, and renovations. Fast response. Clear pricing. Professional results. Call now for same-day service.",
    "hero-cta": "Call us now",
    "why-choose-heading": "Why Hengelo residents trust us",
    "why-choose-subtitle": "Fast response, clear pricing, and professional results every time.",
    "benefit-1-title": "Emergency Response — 2 Hour Guarantee",
    "benefit-1-text": "Leaks waiting? We arrive within 2 hours for emergency calls in Hengelo. Minimize damage. Restore peace of mind.",
    "benefit-2-title": "Clear Pricing — No Surprises",
    "benefit-2-text": "Upfront quotes before we start. No hidden fees. Transparent pricing you can trust. What you see is what you pay.",
    "benefit-3-title": "Professional Expertise — 15+ Years",
    "benefit-3-text": "Licensed, skilled plumbers. Meticulous workmanship. Every project completed right. Your satisfaction guaranteed.",
    "benefit-4-title": "Hengelo-Based — Local Trust",
    "benefit-4-text": "We're your neighbors. Serving Hengelo homeowners for years. Reliable, respectful, and always professional.",
    "services-heading": "Services We Provide",
    "services-subtitle": "From emergency repairs to complete renovations. Fast, reliable, professional.",
    "cta-heading": "Need a Plumber Today?",
    "cta-subtitle": "Emergency repair, new installation, or full renovation. Contact us now for a quick quote or same-day service.",
    "cta-button": "Request a Quote",
    "portfolio-heading": "Our Recent Projects",
    "portfolio-subtitle": "Professional plumbing installations and renovations throughout Hengelo.",
    "final-cta-heading": "Ready to Solve Your Plumbing Problem?",
    "final-cta-text": "Call us now for same-day emergency service or book your appointment online.",
    "final-cta-call": "Call Now",
    "final-cta-message": "Send Message",
    "reviews-heading": "What klanten over ons zeggen",
    "reviews-subtitle": "Fictieve recensies om te laten zien hoe echte feedback een vertrouwenwekkende rol kan spelen op de homepage.",
    "services-page-title": "Loodgietersdiensten op maat",
    "services-page-subtitle": "Onderstaande lijst toont typische diensten van een moderne loodgieter. Pas de inhoud aan op basis van uw eigen aanbod.",
    "service-1-title": "Leakage & Piping",
    "service-1-desc": "Repair of leaking pipes, taps and couplings. Including detection of hidden leaks.",
    "service-2-title": "Clogging",
    "service-2-desc": "Unclogging drains, toilets and sinks with professional equipment and without unnecessary damage.",
    "service-3-title": "Bathroom & Kitchen",
    "service-3-desc": "Installing and replacing taps, showers, toilets and kitchen equipment with attention to detail.",
    "service-4-title": "Heating",
    "service-4-desc": "Installation and maintenance of pipes for radiators and floor heating in cooperation with recognized installers.",
    "service-5-title": "Renovation & New Build",
    "service-5-desc": "Complete installation of water and waste pipes during renovations and new building projects.",
    "service-6-title": "Emergency Service",
    "service-6-desc": "Available for urgent breakdowns and leaks, so damage is minimized and you are helped quickly.",
    "services-note": "Tip for developers: manage the complete list of services in content.json. Script.js reads that file and fills this section automatically.",
    "faq-page-title": "Frequently Asked Questions",
    "faq-page-subtitle": "Clear answers to typical customer questions. Adjust the examples below to your own practice.",
    "faq-1-q": "Do you also work in the evening or on weekends?",
    "faq-1-a": "This demo assumes a flexible plumber who can also be available outside office hours for emergencies. Enter your actual availability here, for example: 24/7, weekdays until 21:00, by appointment only, etc.",
    "faq-2-q": "What does an average job cost?",
    "faq-2-a": "For a real website you enter your hourly rate, initial fee and any call-out charges here. In this demo you can indicate that every situation is different and that you like to send a non-binding quote.",
    "faq-3-q": "Do you work with other specialists?",
    "faq-3-a": "Here you can explain whether you work with contractors, electricians or tile layers, so customers know you can offer a complete solution.",
    "faq-note": "Tip: manage all frequently asked questions centrally in content.json. Script.js loads that file and builds the collapsible items automatically.",
    "contact-page-title": "Contact Us",
    "contact-page-subtitle": "Fill in the form with a question or free quote request. You can of course also call or email directly.",
    "contact-form-name-label": "Name",
    "contact-form-name-placeholder": "Your name",
    "contact-form-email-label": "Email",
    "contact-form-email-placeholder": "you@example.com",
    "contact-form-message-label": "Message",
    "contact-form-message-placeholder": "Briefly describe your question or job.",
    "contact-form-submit": "Send message",
    "contact-details-heading": "Direct contact",
    "contact-details-intro": "For urgent: call directly. For quotes: send a message or email us."
  },
  nl: {
    "nav-home": "Home",
    "nav-services": "Diensten",
    "nav-faq": "Veelgestelde vragen",
    "nav-contact": "Contact",
    "hero-title": "Uw vertrouwde loodgieter in Hengelo. Snel, professioneel, betrouwbaar.",
    "hero-subtitle": "Deskundig loodgieterswerk voor spoedreparaties, installaties en renovaties. Snelle respons. Duidelijke prijsstelling. Professionele resultaten. Bel nu voor dezelfde dag service.",
    "hero-cta": "Bel ons nu",
    "why-choose-heading": "Waarom Hengelo-bewoners ons vertrouwen",
    "why-choose-subtitle": "Snelle respons, duidelijke prijsstelling en professionele resultaten elke keer.",
    "benefit-1-title": "Spoedreparatie — 2 uur garantie",
    "benefit-1-text": "Lekkage? We zijn binnen 2 uur ter plaatse bij spoedreparaties in Hengelo. Schadebeperk ingsrijk. Herstel gerust.",
    "benefit-2-title": "Duidelijke prijsstelling — Geen verrassingen",
    "benefit-2-text": "Offerte vooraf. Geen verborgen kosten. Transparante prijsstelling die u kunt vertrouwen. Wat u ziet is wat u betaalt.",
    "benefit-3-title": "Professionele expertise — 15+ jaar",
    "benefit-3-text": "Erkende, deskundige loodgieters. Nauwkeurig werk uw huis. Elke klus goed uitgevoerd. Uw tevredenheid gegarandeerd.",
    "benefit-4-title": "Hengelo-gebaseerd — Lokaal vertrouwen",
    "benefit-4-text": "Wij zijn uw buren. Jaren werkend voor Hengelo-gezinnen. Betrouwbaar, respectvol en altijd professioneel.",
    "services-heading": "Diensten die wij leveren",
    "services-subtitle": "Van spoedreparaties tot volledige renovaties. Snel, betrouwbaar, professioneel.",
    "cta-heading": "Heeft u vandaag een loodgieter nodig?",
    "cta-subtitle": "Spoedreparatie, nieuwe installatie of volledige renovatie. Neem nu contact op voor een snelle offerte of dezelfde dagservice.",
    "cta-button": "Offerte aanvragen",
    "portfolio-heading": "Onze recente projecten",
    "portfolio-subtitle": "Professioneel loodgieterswerk en renovaties in heel Hengelo.",
    "final-cta-heading": "Klaar om uw loodgieterspro bleem op te lossen?",
    "final-cta-text": "Bel ons nu voor dezelfde dagservice of boek uw afspraak online.",
    "final-cta-call": "Bel nu",
    "final-cta-message": "Bericht versturen",
    "reviews-heading": "Wat klanten over ons zeggen",
    "reviews-subtitle": "Fictieve recensies om te laten zien hoe echte feedback een vertrouwenwekkende rol kan spelen op de homepage.",
    "services-page-title": "Loodgietersdiensten op maat",
    "services-page-subtitle": "Onderstaande lijst toont typische diensten van een moderne loodgieter. Pas de inhoud aan op basis van uw eigen aanbod.",
    "service-1-title": "Lekkage & leidingwerk",
    "service-1-desc": "Reparatie van lekkende leidingen, kranen en koppelingen. Inclusief opsporen van verborgen lekkages.",
    "service-2-title": "Verstoppingen",
    "service-2-desc": "Ontstoppen van afvoeren, toiletten en gootstenen met professioneel gereedschap en zonder onnodige schade.",
    "service-3-title": "Badkamer & keuken",
    "service-3-desc": "Plaatsen en vervangen van kranen, douches, toiletten en keukenapparatuur met oog voor detail.",
    "service-4-title": "Verwarming",
    "service-4-desc": "Aanleg en onderhoud van leidingen voor radiatoren en vloerverwarming in samenwerking met erkende installateurs.",
    "service-5-title": "Renovatie & nieuwbouw",
    "service-5-desc": "Complete aanleg van water- en afvoerleidingen bij verbouwingen en nieuwbouwprojecten.",
    "service-6-title": "Spoedservice",
    "service-6-desc": "Beschikbaar voor urgente storingen en lekkages, zodat schade beperkt blijft en u snel geholpen bent.",
    "services-note": "Tip voor ontwikkelaars: beheer de volledige lijst van diensten in content.json. Script.js leest dat bestand in en vult deze sectie automatisch.",
    "faq-page-title": "Veelgestelde vragen",
    "faq-page-subtitle": "Duidelijke antwoorden op typische vragen van klanten. Pas de voorbeelden hieronder aan naar uw eigen praktijk.",
    "faq-1-q": "Werkt u ook in de avond of in het weekend?",
    "faq-1-a": "Deze demo gaat uit van een flexibele loodgieter die ook buiten kantoortijden beschikbaar kan zijn voor spoedgevallen. Vul hier uw echte bereikbaarheid in, bijvoorbeeld: 24/7, werkdagen tot 21:00, alleen op afspraak, etc.",
    "faq-2-q": "Wat kost een gemiddelde klus?",
    "faq-2-a": "Voor een echte website vult u hier uw uurtarief, starttarief en eventuele voorrijkosten in. In deze demo kunt u aangeven dat iedere situatie anders is en dat u graag een vrijblijvende offerte maakt.",
    "faq-3-q": "Werkt u samen met andere vakmensen?",
    "faq-3-a": "Hier kunt u uitleggen of u samenwerkt met aannemers, elektriciens of tegelzetters, zodat klanten weten dat u een complete oplossing kunt aanbieden.",
    "faq-note": "Tip: beheer alle veelgestelde vragen centraal in content.json. Script.js laadt dit bestand in en bouwt de uitklapbare items automatisch op.",
    "contact-page-title": "Neem contact op",
    "contact-page-subtitle": "Vul het formulier in voor een vraag of vrijblijvende offerte. U kunt natuurlijk ook direct bellen of mailen.",
    "contact-form-name-label": "Naam",
    "contact-form-name-placeholder": "Uw naam",
    "contact-form-email-label": "E-mail",
    "contact-form-email-placeholder": "u@example.com",
    "contact-form-message-label": "Bericht",
    "contact-form-message-placeholder": "Beschrijf kort uw vraag of klus.",
    "contact-form-submit": "Verstuur bericht",
    "contact-details-heading": "Direct contact",
    "contact-details-intro": "Voor spoed: bel direct. Voor offertes: stuur een bericht of mail ons."
  },
  de: {
    "nav-home": "Startseite",
    "nav-services": "Dienstleistungen",
    "nav-faq": "Häufig gestellte Fragen",
    "nav-contact": "Kontakt",
    "hero-title": "Ihr vertrauenswürdiger Klempner in Hengelo. Schnell, professionell, zuverlässig.",
    "hero-subtitle": "Fachgerechte Klempnerarbeiten für Notfallreparaturen, Installationen und Renovierungen. Schnelle Reaktion. Transparente Preisgestaltung. Professionelle Ergebnisse. Wählen Sie jetzt für am selben Tag Service.",
    "hero-cta": "Rufen Sie uns jetzt an",
    "why-choose-heading": "Warum Hengelo-Bewohner uns vertrauen",
    "why-choose-subtitle": "Schnelle Reaktion, transparente Preisgestaltung und professionelle Ergebnisse jedes Mal.",
    "benefit-1-title": "Notfalldienst — 2-Stunden-Garantie",
    "benefit-1-text": "Undichtstellen? Wir sind innerhalb von 2 Stunden in Hengelo vor Ort zu Notfallreparaturen. Beschädigungen minimieren. Ruhe wiederherstellen.",
    "benefit-2-title": "Transparente Preisgestaltung — Keine Überraschungen",
    "benefit-2-text": "Kostenvoranschlag im Voraus. Keine versteckten Kosten. Transparente Preisgestaltung, der Sie vertrauen können. Das ist es, was Sie bezahlen.",
    "benefit-3-title": "Professionelle Expertise — 15+ Jahre",
    "benefit-3-text": "Lizenzierte, fachkundige Klempner. Sorgfältige Arbeit. Jedes Projekt zu recht erfolgreich. Ihre Zufriedenheit garantiert.",
    "benefit-4-title": "Hengelo-basiert — Lokales Vertrauen",
    "benefit-4-text": "Wir sind Ihre Nachbarn. Seit Jahren für Hengelo-Familien tätig. Zuverlässig, respektvoll und immer professionell.",
    "services-heading": "Von uns angebotene Dienstleistungen",
    "services-subtitle": "Von Notfallreparaturen bis hin zu kompletten Renovierungen. Schnell, zuverlässig, fachgerecht.",
    "cta-heading": "Brauchen Sie heute einen Klempner?",
    "cta-subtitle": "Notfallreparatur, Neuinstallation oder komplette Renovierung. Kontaktieren Sie uns jetzt für ein schnelles Angebot oder denselben Tag Service.",
    "cta-button": "Angebot anfordern",
    "portfolio-heading": "Unsere letzten Projekte",
    "portfolio-subtitle": "Professionelle Klempnerarbeiten und Renovierungen in ganz Hengelo.",
    "final-cta-heading": "Bereit, Ihr Klempner Problem zu lösen?",
    "final-cta-text": "Rufen Sie uns jetzt an für denselben Tag Service oder buchen Sie Ihren Termin online.",
    "final-cta-call": "Jetzt anrufen",
    "final-cta-message": "Nachricht senden",
    "reviews-heading": "Was Kunden über uns sagen",
    "reviews-subtitle": "Fiktive Bewertungen, um zu zeigen, wie echtes Feedback darauf angewiesen ist, auf der Homepage Vertrauen aufzubauen.",
    "services-page-title": "Klempnerdienstleistungen nach Maß",
    "services-page-subtitle": "Die folgende Liste zeigt typische Dienstleistungen eines modernen Klempners. Passen Sie den Inhalt basierend auf Ihrem speziellen Angebot an.",
    "service-1-title": "Undichtstellen & Rohrleitungen",
    "service-1-desc": "Reparatur undichter Rohre, Wasserhähne und Verbindungen. Einschließlich Erkennung versteckter Lecks.",
    "service-2-title": "Verstopfungen",
    "service-2-desc": "Entstopfung von Ablaufrinnen, Toiletten und Waschbecken mit professionellem Werkzeug und ohne unnötige Beschädigungen.",
    "service-3-title": "Badezimmer & Küche",
    "service-3-desc": "Installation und Austausch von Wasserhähnen, Duschen, Toiletten und Küchengeräten mit Liebe zum Detail.",
    "service-4-title": "Heizung",
    "service-4-desc": "Installation und Wartung von Rohren für Heizkörper und Fußbodenheizung in Zusammenarbeit mit anerkannten Installateuren.",
    "service-5-title": "Renovierung & Neubau",
    "service-5-desc": "Komplette Installation von Wasser- und Abwasserleitungen bei Renovierungen und Neubauprojekten.",
    "service-6-title": "Notfalldienst",
    "service-6-desc": "Verfügbar für dringende Ausfälle und Undichtstellen, sodass Schäden minimiert werden und Sie schnell geholfen werden.",
    "services-note": "Tipp für Entwickler: Verwalten Sie die vollständige Liste der Dienstleistungen in content.json. Script.js liest diese Datei und füllt diesen Bereich automatisch.",
    "faq-page-title": "Häufig gestellte Fragen",
    "faq-page-subtitle": "Klare Antworten auf typische Fragen von Kunden. Passen Sie die Beispiele unten an Ihre eigene Praxis an.",
    "faq-1-q": "Arbeiten Sie auch abends oder am Wochenende?",
    "faq-1-a": "Diese Demo geht davon aus, dass ein flexibler Klempner auch außerhalb der Geschäftszeiten für Notfälle verfügbar ist. Geben Sie Ihre tatsächliche Verfügbarkeit ein, z. B.: 24/7, Wochentags bis 21:00 Uhr, nur nach Vereinbarung, etc.",
    "faq-2-q": "Was kostet ein durchschnittliches Projekt?",
    "faq-2-a": "Für eine echte Website geben Sie hier Ihren Stundensatz, Gebühren und eventuell Anfahrtskosten ein. In dieser Demo können Sie angeben, dass jede Situation unterschiedlich ist und Sie gerne ein unverbindliches Angebot erstellen.",
    "faq-3-q": "Arbeiten Sie mit anderen Fachleuten zusammen?",
    "faq-3-a": "Hier können Sie erklären, ob Sie mit Unternehmern, Elektrikern oder Fliesenlegern zusammenarbeiten, damit Kunden wissen, dass Sie eine komplette Lösung anbieten können.",
    "faq-note": "Tipp: Verwalten Sie alle häufig gestellten Fragen zentral in content.json. Script.js lädt diese Datei und erstellt die ausklappbaren Elemente automatisch.",
    "contact-page-title": "Kontakt",
    "contact-page-subtitle": "Füllen Sie das Formular mit einer Frage oder einer kostenlosen Angebote aus. Sie können uns natürlich auch direkt anrufen oder per E-Mail kontaktieren.",
    "contact-form-name-label": "Name",
    "contact-form-name-placeholder": "Ihr Name",
    "contact-form-email-label": "Email",
    "contact-form-email-placeholder": "sie@example.com",
    "contact-form-message-label": "Nachricht",
    "contact-form-message-placeholder": "Beschreiben Sie kurz Ihre Frage oder Aufgabe.",
    "contact-form-submit": "Nachricht senden",
    "contact-details-heading": "Direkter Kontakt",
    "contact-details-intro": "Für dringende Fälle: direkt anrufen. Für Angebote: Nachricht senden oder uns per E-Mail kontaktieren."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initSmoothScroll();
  initDynamicContent();
  initFaqAccordion();
  initContactForm();
  initFooterYear();
});


// ========================= LANGUAGE SWITCHING =========================
function initLanguage() {
  const saved = localStorage.getItem("dnl-language") || "en";
  setLanguage(saved);
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

function setLanguage(lang) {
  localStorage.setItem("dnl-language", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  translatePage(lang);
}

function translatePage(lang) {
  const trans = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (trans[key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = trans[key];
      } else {
        element.textContent = trans[key];
      }
    }
  });
}

// ========================= SMOOTH SCROLLING =========================

/**
 * Enables smooth scrolling for links that point to in-page anchors
 * (href values starting with "#"). The CSS property `scroll-behavior: smooth`
 * handles most cases, but this function improves consistency across browsers.
 */
function initSmoothScroll() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLAnchorElement)) return;

    const href = target.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const id = href.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ========================= DYNAMIC CONTENT (SERVICES & FAQ) =========================

/**
 * Fetches content.json and optionally replaces the static service and FAQ
 * markup with dynamically generated elements based on that JSON.
 *
 * The HTML uses data-dynamic="services" and data-dynamic="faqs" attributes
 * as hooks so that:
 * - If JSON is present and loads: the static fallback content is replaced.
 * - If JSON is missing or fails to load: the static markup stays visible.
 */
function initDynamicContent() {
  const dynamicContainers = document.querySelectorAll("[data-dynamic]");
  if (!dynamicContainers.length) return;

  fetch("content.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load content.json");
      }
      return response.json();
    })
    .then((data) => {
      dynamicContainers.forEach((container) => {
        const type = container.getAttribute("data-dynamic");

        // We slaan de services over omdat deze statisch in HTML staan
        if (type === "faqs" && Array.isArray(data.faqs)) {
          buildFaqs(container, data.faqs);
        }
      });

      // Re-initialize FAQ accordion behaviour after replacing FAQ DOM.
      initFaqAccordion();
    })
    .catch((error) => {
      console.warn(
        "[De Natte Krant] Could not load dynamic content from content.json:",
        error
      );
    });
}

/**
 * Builds service cards into the provided container based on JSON data.
 * @param {Element} container - element with data-dynamic="services"
 * @param {Array} services - array of service objects from content.json
 */
function buildServices(container, services) {
  container.innerHTML = ""; // alles leegmaken

  services.forEach((service) => {
    const article = document.createElement("article");
    article.className = "card card--service";

    const icon = document.createElement("div");
    icon.className = "card__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = service.icon || '<img src="assets/images/icon-leak.svg" alt="" class="card__icon-image" />';

    const title = document.createElement("h2");
    title.className = "card__title";
    title.textContent = service.name || "Dienst";

    const text = document.createElement("p");
    text.className = "card__text";
    text.textContent = service.description || "Vervang deze beschrijving in content.json.";

    article.appendChild(icon);
    article.appendChild(title);
    article.appendChild(text);

    container.appendChild(article);
  });
}
/**
 * Builds FAQ items into the provided container based on JSON data.
 * @param {Element} container - element with data-dynamic="faqs"
 * @param {Array} faqs - array of FAQ objects from content.json
 */
function buildFaqs(container, faqs) {
  container.innerHTML = "";

  faqs.forEach((faq, index) => {
    const idSuffix = faq.id || String(index + 1);
    const answerId = `faq-answer-${idSuffix}`;

    const article = document.createElement("article");
    article.className = "faq-item";

    const heading = document.createElement("h2");
    heading.className = "faq-item__question";

    const button = document.createElement("button");
    button.className = "faq-item__button";
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);

    const textSpan = document.createElement("span");
    textSpan.textContent =
      faq.question || "Vervang deze vraag in content.json.";

    const iconSpan = document.createElement("span");
    iconSpan.className = "faq-item__icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = "+";

    button.appendChild(textSpan);
    button.appendChild(iconSpan);
    heading.appendChild(button);

    const answer = document.createElement("div");
    answer.className = "faq-item__answer";
    answer.id = answerId;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-hidden", "true");

    const p = document.createElement("p");
    p.textContent =
      faq.answer || "Vervang dit antwoord in content.json.";
    answer.appendChild(p);

    article.appendChild(heading);
    article.appendChild(answer);

    container.appendChild(article);
  });
}

// ========================= FAQ ACCORDION BEHAVIOUR =========================

/**
 * Wires up click handlers for all FAQ buttons so they expand/collapse
 * their associated answers. It also toggles ARIA attributes for
 * better accessibility and adds a "faq-item--open" class used in CSS.
 */
function initFaqAccordion() {
  const buttons = document.querySelectorAll(".faq-item__button");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.removeEventListener("click", handleFaqButtonClick);
    button.addEventListener("click", handleFaqButtonClick);
  });
}

/**
 * Handles a click on an FAQ item button.
 * @param {MouseEvent} event
 */
function handleFaqButtonClick(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement)) return;

  const article = button.closest(".faq-item");
  const answerId = button.getAttribute("aria-controls") || "";
  const answer = document.getElementById(answerId);
  if (!article || !answer) return;

  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;

  button.setAttribute("aria-expanded", String(nextExpanded));
  answer.setAttribute("aria-hidden", String(!nextExpanded));
  article.classList.toggle("faq-item--open", nextExpanded);

  // Smoothly expand/collapse the answer height.
  if (nextExpanded) {
    const fullHeight = answer.scrollHeight;
    answer.style.maxHeight = `${fullHeight}px`;
  } else {
    answer.style.maxHeight = "0";
  }
}

// ========================= CONTACT FORM HANDLING =========================

/**
 * Adds lightweight client-side validation and a fake "submit" handler
 * for the contact form. This makes the form feel complete even when
 * there is no backend attached.
 *
 * To connect to a real backend:
 * - Replace the event.preventDefault() block with a fetch() call, or
 * - Remove preventDefault and set a real "action" attribute on the form.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successEl = document.getElementById("contact-success");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    if (
      !nameInput ||
      !emailInput ||
      !messageInput
    ) {
      return;
    }

    const fields = [
      { input: nameInput, name: "Naam" },
      { input: emailInput, name: "E-mail" },
      { input: messageInput, name: "Bericht" },
    ];

    let hasError = false;

    // Clear previous error messages
    document
      .querySelectorAll(".form__error")
      .forEach((el) => (el.textContent = ""));

    for (const field of fields) {
      const { input, name } = field;
      const value = String(input.value || "").trim();
      const errorEl = document.querySelector(
        `.form__error[data-error-for="${input.id}"]`
      );

      if (!value) {
        hasError = true;
        if (errorEl) {
          errorEl.textContent = `${name} is verplicht.`;
        }
        continue;
      }

      if (input.type === "email" && !validateEmail(value)) {
        hasError = true;
        if (errorEl) {
          errorEl.textContent = "Vul een geldig e-mailadres in.";
        }
      }
    }

    if (hasError) {
      if (successEl) {
        successEl.textContent = "";
      }
      return;
    }

    // At this point, form input looks valid. For the demo we:
    // - show a success message
    // - reset the fields
    if (successEl) {
      successEl.textContent =
        "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op (demo).";
    }
    form.reset();
  });
}

/**
 * Simple email format validation using a basic pattern.
 * This is intentionally lightweight; server-side validation
 * is still recommended in production.
 * @param {string} value
 */
function validateEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

// ========================= FOOTER YEAR =========================

/**
 * Writes the current year into any element with the id "footer-year".
 * Each page has its own #footer-year span, so this is safe to run
 * on all pages without additional checks.
 */
function initFooterYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("#footer-year").forEach((el) => {
    el.textContent = String(year);
  });
}

