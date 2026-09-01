/* ============================================================
   Doctor Alliance · Monthly Client Impact Report
   ------------------------------------------------------------
   TO CREATE A NEW MONTHLY REPORT:
   Edit ONLY the `clientData` object below, then open index.html.
   Any metric left as `null` (or an empty array) is automatically
   hidden — nothing displays as a fake zero.
   ============================================================ */

const clientData = {
  clientName: "Meridian Family Physicians",
  reportingPeriod: "July 2026",

  executiveSummary: {
    headline: "Doctor Alliance coordinated documentation and care management across three locations this month, keeping every physician's order queue current and every enrolled patient monitored without a single missed follow-up."
  },

  metrics: {
    ordersProcessed: 412,
    patientsSupported: 268,
    facilitiesCoordinated: 3,
    physiciansSupported: 9,
    documentationAccuracy: 99.2,   // percent
    physicianSignOffRate: 96.5,    // percent
    cpoMinutes: 5140,
    billableEncounters: null       // left null on purpose -> hidden (rolled into revenue section instead)
  },

  workflow: {
    ordersReceived: 438,
    ordersProcessed: 412,
    ordersSentForSignature: 401,
    ordersSigned: 388,
    ordersCompleted: 379
  },

  operational: [
    { label: "Patients coordinated", value: 268 },
    { label: "Facilities supported", value: 3 },
    { label: "Physicians supported", value: 9 },
    { label: "Follow-ups completed", value: 154 },
    { label: "Escalations resolved", value: 11 }
  ],

  valueDelivered: [
    "Coordinated communication with agencies and facilities on outstanding documentation",
    "Managed end-to-end order workflows across all three locations",
    "Followed up on outstanding documentation before it aged past 5 days",
    "Assisted with physician coordination on CPO care plan reviews",
    "Resolved workflow escalations flagged by front-office staff",
    "Identified service opportunities for two under-enrolled patient panels"
  ],

  highlights: [
    "Documentation accuracy held at 99.2%, ahead of the group's target for the third straight month.",
    "Physician sign-off turnaround improved by 1.4 days on average across all nine providers.",
    "Zero enrolled RPM patients went without a monitored reading this month.",
    "Two new service opportunities identified for panels with low CCM enrollment."
  ],

  nextMonthFocus: [
    "Expand CPO enrollment outreach to the two identified under-enrolled panels",
    "Tighten sign-off turnaround further for the two newest onboarded physicians",
    "Review escalation patterns at the Northgate location to reduce recurring causes"
  ],

  revenue: {
    enabled: true,
    label: "Billed Revenue",
    amount: 18420,
    billableEncounters: 214,
    codes: [
      { code: "G0179", description: "Physician recertification", count: 92, amount: 4140 },
      { code: "G0180", description: "Physician certification", count: 38, amount: 2280 },
      { code: "G0181", description: "Care plan oversight, 30 min", count: 84, amount: 12000 }
    ],
    monthlyTrend: [
      { label: "Feb", amount: 14200 },
      { label: "Mar", amount: 15100 },
      { label: "Apr", amount: 16050 },
      { label: "May", amount: 15700 },
      { label: "Jun", amount: 17300 },
      { label: "Jul", amount: 18420 }
    ]
  }
};

/* ============================================================
   Rendering — do not need to edit below this line
   ============================================================ */

const hasValue = (v) => v !== null && v !== undefined && v !== "" &&
  !(Array.isArray(v) && v.length === 0);

const fmtNumber = (n) => Number(n).toLocaleString("en-US");
const fmtCurrency = (n) => Number(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtPercent = (n) => `${Number(n)}%`;

function el(tag, className, html){
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderHeader(data){
  document.getElementById("hdr-period").textContent = data.reportingPeriod || "";
  document.getElementById("hdr-client").textContent = data.clientName || "";
  const headline = data.executiveSummary && data.executiveSummary.headline;
  const headlineEl = document.getElementById("hdr-headline");
  if (hasValue(headline)) {
    headlineEl.textContent = headline;
  } else {
    headlineEl.remove();
  }
}

function renderKPIs(metrics){
  const grid = document.getElementById("kpi-grid");
  const defs = [
    { key: "ordersProcessed", label: "Orders processed" },
    { key: "patientsSupported", label: "Patients supported" },
    { key: "facilitiesCoordinated", label: "Facilities coordinated" },
    { key: "physiciansSupported", label: "Physicians supported" },
    { key: "documentationAccuracy", label: "Documentation accuracy", unit: "%" },
    { key: "physicianSignOffRate", label: "Physician sign-off rate", unit: "%" },
    { key: "cpoMinutes", label: "CPO minutes captured" },
    { key: "billableEncounters", label: "Billable encounters" }
  ];

  let count = 0;
  defs.forEach(def => {
    const val = metrics[def.key];
    if (!hasValue(val)) return;
    count++;
    const card = el("div", "kpi-card");
    const valueLine = el("div", "kpi-card__value",
      `${fmtNumber(val)}${def.unit ? `<span class="kpi-card__unit">${def.unit}</span>` : ""}`);
    const label = el("div", "kpi-card__label", def.label);
    card.appendChild(valueLine);
    card.appendChild(label);
    grid.appendChild(card);
  });

  if (count === 0) document.getElementById("section-kpis").hidden = true;
}

function renderOperational(items){
  const grid = document.getElementById("ops-grid");
  const valid = (items || []).filter(i => hasValue(i.value));
  if (valid.length === 0){
    document.getElementById("section-ops").hidden = true;
    return;
  }
  const max = Math.max(...valid.map(i => Number(i.value)));
  valid.forEach(item => {
    const card = el("div", "ops-card");
    const row = el("div", "ops-card__row");
    row.appendChild(el("span", "ops-card__label", item.label));
    row.appendChild(el("span", "ops-card__value", fmtNumber(item.value)));
    card.appendChild(row);
    const bar = el("div", "ops-card__bar");
    const fill = el("div", "ops-card__bar-fill");
    const pct = max > 0 ? Math.max(6, Math.round((Number(item.value) / max) * 100)) : 0;
    fill.style.width = `${pct}%`;
    bar.appendChild(fill);
    card.appendChild(bar);
    grid.appendChild(card);
  });
}

function renderWorkflow(workflow){
  const rail = document.getElementById("workflow-rail");
  const stages = [
    { key: "ordersReceived", label: "Received" },
    { key: "ordersProcessed", label: "Processed" },
    { key: "ordersSentForSignature", label: "Sent for signature" },
    { key: "ordersSigned", label: "Signed" },
    { key: "ordersCompleted", label: "Completed" }
  ];
  const valid = stages.filter(s => hasValue(workflow[s.key]));
  if (valid.length === 0){
    document.getElementById("section-workflow").hidden = true;
    return;
  }
  valid.forEach((stage, i) => {
    const node = el("div", "workflow-stage");
    node.appendChild(el("div", "workflow-stage__node", String(i + 1)));
    node.appendChild(el("div", "workflow-stage__value", fmtNumber(workflow[stage.key])));
    node.appendChild(el("div", "workflow-stage__label", stage.label));
    rail.appendChild(node);
  });
}

function renderValueDelivered(items){
  const list = document.getElementById("value-list");
  if (!hasValue(items)){
    document.getElementById("section-value").hidden = true;
    return;
  }
  items.forEach(text => list.appendChild(el("li", null, text)));
}

function renderRevenue(revenue){
  const section = document.getElementById("section-revenue");
  if (!revenue || !revenue.enabled || !hasValue(revenue.amount)){
    section.hidden = true;
    return;
  }
  section.hidden = false;

  document.getElementById("revenue-title").textContent = revenue.label
    ? `Revenue & services — ${revenue.label}`
    : "Revenue & services";

  const summary = document.getElementById("revenue-summary");
  summary.appendChild(el("div", "revenue-summary__label", revenue.label || "Revenue"));
  summary.appendChild(el("div", "revenue-summary__amount", fmtCurrency(revenue.amount)));
  if (hasValue(revenue.billableEncounters)){
    summary.appendChild(el("div", "revenue-summary__sub", `${fmtNumber(revenue.billableEncounters)} billable encounters`));
  }

  const codesWrap = document.getElementById("revenue-codes");
  if (hasValue(revenue.codes)){
    const table = el("table");
    table.innerHTML = `
      <thead><tr><th>Code</th><th>Description</th><th>Count</th><th>Amount</th></tr></thead>
      <tbody>
        ${revenue.codes.map(c => `
          <tr>
            <td>${c.code}</td>
            <td>${c.description || ""}</td>
            <td>${fmtNumber(c.count)}</td>
            <td>${fmtCurrency(c.amount)}</td>
          </tr>`).join("")}
      </tbody>`;
    codesWrap.appendChild(table);
  } else {
    codesWrap.remove();
  }

  const trendWrap = document.getElementById("revenue-trend");
  if (hasValue(revenue.monthlyTrend)){
    const max = Math.max(...revenue.monthlyTrend.map(p => Number(p.amount)));
    revenue.monthlyTrend.forEach(point => {
      const pct = max > 0 ? Math.max(6, Math.round((Number(point.amount) / max) * 100)) : 0;
      const bar = el("div", "trend-bar");
      bar.style.height = `${pct}%`;
      bar.appendChild(el("span", "trend-bar__label", point.label));
      trendWrap.appendChild(bar);
    });
  } else {
    trendWrap.remove();
  }
}

function renderHighlights(items){
  const grid = document.getElementById("highlight-grid");
  if (!hasValue(items)){
    document.getElementById("section-highlights").hidden = true;
    return;
  }
  items.forEach(text => grid.appendChild(el("div", "highlight-card", text)));
}

function renderNextMonth(items){
  const list = document.getElementById("next-list");
  if (!hasValue(items)){
    document.getElementById("section-next").hidden = true;
    return;
  }
  items.forEach(text => list.appendChild(el("li", null, text)));
}

function renderReport(data){
  renderHeader(data);
  renderKPIs(data.metrics || {});
  renderOperational(data.operational || []);
  renderWorkflow(data.workflow || {});
  renderValueDelivered(data.valueDelivered || []);
  renderRevenue(data.revenue || {});
  renderHighlights(data.highlights || []);
  renderNextMonth(data.nextMonthFocus || []);
}

function initControls(){
  document.getElementById("btn-print").addEventListener("click", () => window.print());
  // Browser-native "Save as PDF" is exposed through the print dialog's
  // destination picker in every modern browser — no external library needed.
  document.getElementById("btn-pdf").addEventListener("click", () => window.print());
}

document.addEventListener("DOMContentLoaded", () => {
  renderReport(clientData);
  initControls();
});
