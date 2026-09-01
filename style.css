/* ============================================================
   Doctor Alliance · Monthly Client Impact Report — Editorial Edition
   ------------------------------------------------------------
   TO CREATE A NEW MONTHLY REPORT:
   Edit ONLY the `clientData` object below, then open index.html.

   The schema below is intentionally array-based (not fixed keys),
   so you can add, remove, or reorder items freely per client and
   per month — nothing about the layout needs to change. Any
   section left empty (empty array, null amount, businessImpact
   disabled, etc.) is automatically hidden.
   ============================================================ */

const clientData = {

  clientName: "Meridian Family Physicians",
  reportingPeriod: "July 2026",     // used for the browser tab title
  heroLabel: "July in Review",      // the big line under "Doctor Alliance" in the hero
  impactStatement: "Streamlining documentation, coordinating care, and supporting measurable operational impact.",

  /* SECTION 2 — Month at a glance
     Mark exactly one metric `primary: true` to make it the large
     lead figure. Everything else renders at a shared secondary size.
     `format` can be "number" or "percent". */
  metrics: [
    { label: "Orders Processed", value: 412, format: "number", primary: true },
    { label: "Patients Supported", value: 268, format: "number" },
    { label: "Documentation Accuracy", value: 99.2, format: "percent" },
    { label: "Minutes Captured", value: 5140, format: "number" },
    { label: "Physician Sign-Off Rate", value: 96.5, format: "percent" }
  ],

  /* SECTION 3 — Behind the numbers */
  operationalStory: {
    narrative: "Across three facilities and nine physicians, Doctor Alliance managed the monthly documentation workflow end to end and completed 154 proactive follow-ups before anything came due.",
    stats: [
      { label: "Facilities coordinated", value: "3" },
      { label: "Physicians supported", value: "9" },
      { label: "Follow-ups completed", value: "154" },
      { label: "Escalations resolved", value: "11" }
    ]
  },

  /* SECTION 4 — Workflow journey (ordered; hides any stage left blank) */
  workflow: [
    { label: "Received", value: 438 },
    { label: "Processed", value: 412 },
    { label: "Sent for Signature", value: 401 },
    { label: "Signed", value: 388 },
    { label: "Completed", value: 379 }
  ],

  /* SECTION 5 — What we took off your team's plate */
  valueDelivered: [
    { title: "Coordination", description: "Agency communication and outstanding documentation management across all three locations." },
    { title: "Workflow Management", description: "End-to-end order coordination from intake through physician sign-off." },
    { title: "Proactive Follow-Up", description: "Outstanding documentation addressed before it became overdue." },
    { title: "Physician Support", description: "Coordination on CPO care plan reviews across nine providers." },
    { title: "Escalation Handling", description: "Workflow escalations flagged by front-office staff resolved same-week." },
    { title: "Opportunity Identification", description: "Two under-enrolled patient panels flagged for expanded service." }
  ],

  /* SECTION 6 — Business impact (optional; set enabled:false to hide entirely) */
  businessImpact: {
    enabled: true,
    title: "Business Impact",
    amount: 18420,
    amountLabel: "Billed Revenue Supported",
    encounters: 214,
    encountersLabel: "Billable Encounters",
    codes: [
      { code: "G0179", description: "Physician recertification", count: 92, amount: 4140 },
      { code: "G0180", description: "Physician certification", count: 38, amount: 2280 },
      { code: "G0181", description: "Care plan oversight, 30 min", count: 84, amount: 12000 }
    ]
  },

  /* SECTION 7 — Monthly highlights (first item renders larger) */
  highlights: [
    "99.2% documentation accuracy maintained for the third consecutive month.",
    "Physician sign-off turnaround improved across all nine providers.",
    "Zero enrolled RPM patients went without a monitored reading this month.",
    "Two new service opportunities identified for under-enrolled panels."
  ],

  /* SECTION 8 — Looking ahead */
  nextMonthFocus: [
    "Expand CPO opportunity identification across the two flagged panels",
    "Improve physician sign-off turnaround for the newest onboarded providers",
    "Review recurring workflow escalations at the Northgate location"
  ],

  footerNote: "Supporting clinical teams through operational coordination, documentation management, and measurable service impact."
};

/* ============================================================
   Rendering — do not need to edit below this line
   ============================================================ */

const hasValue = (v) => v !== null && v !== undefined && v !== "" &&
  !(Array.isArray(v) && v.length === 0);

const fmtNumber = (n) => Number(n).toLocaleString("en-US");
const fmtCurrency = (n) => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtMetric = (m) => m.format === "percent" ? `${m.value}<span class="glance__unit">%</span>` : fmtNumber(m.value);

function el(tag, className, html){
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderHero(data){
  document.title = `Doctor Alliance · ${data.clientName || "Client"} — ${data.reportingPeriod || ""}`;
  document.getElementById("hero-review").textContent = data.heroLabel || "";
  document.getElementById("hero-client").textContent = data.clientName || "";
  const statementEl = document.getElementById("hero-statement");
  if (hasValue(data.impactStatement)) {
    statementEl.textContent = data.impactStatement;
  } else {
    statementEl.remove();
  }
}

function renderGlance(metrics){
  const grid = document.getElementById("glance-grid");
  const valid = (metrics || []).filter(m => hasValue(m.value));
  if (valid.length === 0){
    document.getElementById("section-glance").remove();
    return;
  }
  valid.forEach(m => {
    const item = el("div", `glance__item${m.primary ? " glance__item--primary" : ""}`);
    item.appendChild(el("div", "glance__value", fmtMetric(m)));
    item.appendChild(el("div", "glance__label", m.label));
    grid.appendChild(item);
  });
}

function renderStory(story){
  if (!story || !hasValue(story.narrative)){
    document.getElementById("section-story").remove();
    return;
  }
  document.getElementById("story-narrative").textContent = story.narrative;
  const statsWrap = document.getElementById("story-stats");
  if (hasValue(story.stats)){
    story.stats.forEach(s => {
      const row = el("div", "story-stat");
      row.appendChild(el("span", "story-stat__label", s.label));
      row.appendChild(el("span", "story-stat__value", s.value));
      statsWrap.appendChild(row);
    });
  } else {
    statsWrap.remove();
  }
}

function renderJourney(stages){
  const track = document.getElementById("journey-track");
  const valid = (stages || []).filter(s => hasValue(s.value));
  if (valid.length === 0){
    document.getElementById("section-journey").remove();
    return;
  }
  valid.forEach(stage => {
    const node = el("div", "journey-stage");
    node.appendChild(el("div", "journey-stage__dot"));
    node.appendChild(el("div", "journey-stage__value", fmtNumber(stage.value)));
    node.appendChild(el("div", "journey-stage__label", stage.label));
    track.appendChild(node);
  });
}

function renderPlate(items){
  const list = document.getElementById("plate-list");
  if (!hasValue(items)){
    document.getElementById("section-plate").remove();
    return;
  }
  items.forEach(item => {
    const card = el("div", "plate-item");
    card.appendChild(el("p", "plate-item__title", item.title));
    card.appendChild(el("p", "plate-item__desc", item.description));
    list.appendChild(card);
  });
}

function renderImpact(impact){
  const section = document.getElementById("section-impact");
  if (!impact || !impact.enabled || !hasValue(impact.amount)){
    section.remove();
    return;
  }
  section.hidden = false;

  document.getElementById("impact-title").textContent = impact.title || "Business Impact";
  document.getElementById("impact-amount").textContent = fmtCurrency(impact.amount);

  const subEl = document.getElementById("impact-sub");
  const subParts = [];
  if (hasValue(impact.amountLabel)) subParts.push(impact.amountLabel);
  if (hasValue(impact.encounters)) subParts.push(`${fmtNumber(impact.encounters)} ${impact.encountersLabel || "encounters"}`);
  if (subParts.length){
    subEl.textContent = subParts.join(" · ");
  } else {
    subEl.remove();
  }

  const tableWrap = document.getElementById("impact-table-wrap");
  if (hasValue(impact.codes)){
    const table = el("table");
    table.innerHTML = `
      <thead><tr><th>Code</th><th>Description</th><th>Count</th><th>Amount</th></tr></thead>
      <tbody>
        ${impact.codes.map(c => `
          <tr>
            <td>${c.code}</td>
            <td>${c.description || ""}</td>
            <td>${fmtNumber(c.count)}</td>
            <td>${fmtCurrency(c.amount)}</td>
          </tr>`).join("")}
      </tbody>`;
    tableWrap.appendChild(table);
  } else {
    tableWrap.remove();
  }
}

function renderHighlights(items){
  const grid = document.getElementById("highlights-grid");
  if (!hasValue(items)){
    document.getElementById("section-highlights").remove();
    return;
  }
  items.forEach(text => {
    const quote = el("div", "highlight-quote");
    quote.appendChild(el("p", "highlight-quote__text", text));
    grid.appendChild(quote);
  });
}

function renderAhead(items){
  const list = document.getElementById("ahead-list");
  if (!hasValue(items)){
    document.getElementById("section-ahead").remove();
    return;
  }
  items.forEach(text => {
    const li = document.createElement("li");
    li.appendChild(el("span", "ahead-text", text));
    list.appendChild(li);
  });
}

function renderFooter(note){
  const el = document.getElementById("footer-note");
  if (hasValue(note)) {
    el.textContent = note;
  } else {
    el.remove();
  }
}

function renderReport(data){
  renderHero(data);
  renderGlance(data.metrics || []);
  renderStory(data.operationalStory || {});
  renderJourney(data.workflow || []);
  renderPlate(data.valueDelivered || []);
  renderImpact(data.businessImpact || {});
  renderHighlights(data.highlights || []);
  renderAhead(data.nextMonthFocus || []);
  renderFooter(data.footerNote);
}

function initScrollReveal(){
  const sections = document.querySelectorAll(".fade-section");
  if (!("IntersectionObserver" in window)){
    sections.forEach(s => s.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  sections.forEach(s => observer.observe(s));
}

function initControls(){
  document.getElementById("btn-print").addEventListener("click", () => window.print());
  // Browser-native "Save as PDF" is exposed through the print dialog's
  // destination picker in every modern browser — no external library needed.
  document.getElementById("btn-pdf").addEventListener("click", () => window.print());
}

document.addEventListener("DOMContentLoaded", () => {
  renderReport(clientData);
  initScrollReveal();
  initControls();
});
