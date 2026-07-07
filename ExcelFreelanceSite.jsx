import React, { useState, useEffect } from "react";
import {
  Table2,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  Mail,
  Clock,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

/* ---------- content (edit freely) ---------- */

const BRAND = {
  name: "Satish Gurav",
  role: "Freelance Excel Specialist",
  email: "satish19283@gmail.com",
  phone: "+91 86523 15246",
};

const FORMULA_CYCLE = [
  { f: '=IF(data="messy","cleaned in 48hrs","already tidy")', r: "Cleaned ✓" },
  { f: '=VLOOKUP("chaos", solutions, 2, FALSE)', r: "Organized" },
  { f: "=SUM(manual_hours_saved)", r: "40+ / month" },
  { f: '=TREND(before, after)', r: "Automated" },
];

const SERVICES = [
  {
    tab: "Sheet1.xlsx",
    title: "Data Entry & Cleanup",
    icon: Table2,
    color: "var(--purple)",
    rows: [
      "De-duplication & standardization",
      "Merging files from multiple sources",
      "Validation rules & error flags",
      "Legacy → structured data migration",
    ],
  },
  {
    tab: "Sheet2.xlsx",
    title: "Dashboards & Reporting",
    icon: BarChart3,
    color: "var(--coral)",
    rows: [
      "Interactive dashboards & KPI trackers",
      "Pivot tables that update themselves",
      "Monthly / weekly report templates",
      "Charts built for skimming, not squinting",
    ],
  },
  {
    tab: "Sheet3.xlsx",
    title: "Automation (Macros / VBA)",
    icon: Zap,
    color: "var(--green)",
    rows: [
      "VBA macros for repetitive tasks",
      "One-click report generation",
      "File & folder batch processing",
      "Custom functions & UserForms",
    ],
  },
];

const PROCESS = [
  {
    tab: "Discovery",
    body: "Share your file and the goal. I scope the work and send a flat price — no surprise invoices.",
  },
  {
    tab: "Build",
    body: "I clean, build, or automate, with short check-ins so you're never waiting in the dark.",
  },
  {
    tab: "Review",
    body: "You test the deliverable against real data. Revisions are included, not billed separately.",
  },
  {
    tab: "Handover",
    body: "You get the final file plus a short walkthrough, so your team can maintain it without me.",
  },
];

const STATS = [
  { n: "120+", label: "spreadsheets delivered", icon: Table2 },
  { n: "40 hrs", label: "saved per client / month", icon: Clock },
  { n: "3 days", label: "average turnaround", icon: TrendingUp },
  { n: "98%", label: "client satisfaction", icon: ThumbsUp },
];

const NOTES = [
  {
    quote:
      "Handed over a 6-tab mess from three different regional teams. Got back one clean workbook that our finance lead still uses every month.",
    who: "Operations Lead, logistics startup",
  },
  {
    quote:
      "The macro alone saved someone on my team a full day every Friday. Paid for itself in the first week.",
    who: "Founder, D2C retail brand",
  },
  {
    quote:
      "Clear scope, clear price, delivered early. Wish every freelancer worked this way.",
    who: "Program Manager, nonprofit",
  },
];

/* ---------- small building blocks ---------- */

function useCycler(items, interval = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);
  return items[i];
}

function CellSelect({ children, color = "var(--purple)", tag = "span", className = "" }) {
  const Tag = tag;
  return (
    <Tag className={`cell-select ${className}`} style={{ "--cs-color": color }}>
      {children}
      <i className="handle" aria-hidden="true" style={{ background: color }} />
    </Tag>
  );
}

/* ---------- main component ---------- */

export default function ExcelFreelanceSite() {
  const current = useCycler(FORMULA_CYCLE);
  const [activeStep, setActiveStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // 1) Sign up free at https://web3forms.com with BRAND.email to get an access key
  // 2) Paste that key below — every submission will then email you directly
  const WEB3FORMS_ACCESS_KEY = "a48cefd1-58c9-4657-b8a5-17b05a463fb8";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Excel project inquiry from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError("Something went wrong sending your message. Please email me directly instead.");
      }
    } catch (err) {
      setError("Couldn't reach the server. Please email me directly instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .site {
          --bg: #FAFAF7;
          --ink: #15161F;
          --sub: #5B5C6B;
          --grid: #E4E1DA;
          --purple: #6C5CE7;
          --coral: #FF6B5C;
          --green: #00B88D;
          --gold: #FFB020;
          --card: #FFFFFF;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        .site h1, .site h2, .site h3, .site .display {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }
        .site .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .grid-bg {
          background-image:
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .cell-select {
          position: relative;
          display: inline-block;
          border: 2px solid var(--cs-color);
          padding: 0 6px;
          border-radius: 2px;
          background: color-mix(in srgb, var(--cs-color) 8%, transparent);
        }
        .cell-select .handle {
          position: absolute;
          width: 7px;
          height: 7px;
          right: -5px;
          bottom: -5px;
          border-radius: 1px;
        }

        .fbar {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--grid);
          background: var(--card);
          border-radius: 8px;
          padding: 10px 14px;
          box-shadow: 0 2px 0 var(--grid);
        }
        .fbar .fx {
          font-style: italic;
          font-weight: 600;
          color: var(--sub);
          font-family: 'JetBrains Mono', monospace;
        }
        .fbar .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--purple);
          margin-left: 2px;
          animation: blink 1s steps(1) infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .sheet-tab {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 8px 16px;
          border: 1px solid var(--grid);
          border-bottom: none;
          background: #F1EFE9;
          color: var(--sub);
          cursor: pointer;
          border-radius: 6px 6px 0 0;
          transition: all .15s ease;
        }
        .sheet-tab.active {
          background: var(--card);
          color: var(--ink);
          font-weight: 600;
          box-shadow: 0 -2px 0 var(--purple) inset;
        }

        .row-line {
          display: grid;
          grid-template-columns: 28px 1fr;
          border-bottom: 1px solid var(--grid);
        }
        .row-line:nth-child(odd) { background: #FBFAF7; }
        .row-line .idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--sub);
          border-right: 1px solid var(--grid);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .note {
          position: relative;
          background: #FFF6D6;
          border: 1px solid #E9D98A;
          padding: 18px;
          border-radius: 2px;
        }
        .note::before {
          content: "";
          position: absolute;
          top: -8px;
          right: 18px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #E9D98A;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--ink);
          color: white;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: 4px;
          border: 2px solid var(--ink);
          transition: transform .12s ease;
        }
        .cta-btn:hover { transform: translateY(-2px); }

        .input-line {
          width: 100%;
          border: 1px solid var(--grid);
          border-radius: 6px;
          padding: 10px 12px;
          font-family: 'Inter', sans-serif;
          background: white;
        }
        .input-line:focus, .cta-btn:focus, .sheet-tab:focus {
          outline: 2px solid var(--purple);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .fbar .cursor { animation: none; }
          .cta-btn { transition: none; }
        }
      `}</style>

      {/* NAV */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="display font-semibold text-lg flex items-center gap-2">
          <span className="mono" style={{ color: "var(--purple)" }}>fx</span>
          <span>{BRAND.name}</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--sub)" }}>
          <a href="#services" className="hover:text-inherit" style={{ color: "var(--ink)" }}>Services</a>
          <a href="#process" style={{ color: "var(--ink)" }}>Process</a>
          <a href="#results" style={{ color: "var(--ink)" }}>Results</a>
          <a href="#contact" style={{ color: "var(--ink)" }}>Contact</a>
        </nav>
        <a href="#contact" className="cta-btn text-sm py-2 px-4">
          Start a project <ArrowRight size={15} />
        </a>
      </header>

      {/* HERO */}
      <section className="grid-bg">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="mono text-sm mb-4" style={{ color: "var(--sub)" }}>A1</div>
          <h1 className="display text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
            Spreadsheets that{" "}
            <CellSelect color="var(--purple)">actually work</CellSelect> for you.
          </h1>
          <p className="mt-6 max-w-xl text-lg" style={{ color: "var(--sub)" }}>
            Freelance Excel help for messy data, slow reports, and manual work
            that shouldn't be manual. {BRAND.role} — cleanup, dashboards, and
            automation, done right and fast.
          </p>

          <div className="mt-10 max-w-lg fbar">
            <span className="fx">fx</span>
            <span className="mono text-sm flex-1 truncate">
              {current.f}
              <span className="cursor" />
            </span>
            <span
              className="mono text-sm font-semibold px-2 py-1 rounded"
              style={{ background: "#EFEBFF", color: "var(--purple)" }}
            >
              {current.r}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="cta-btn">
              Get a free quote <ArrowRight size={16} />
            </a>
            <a href="#services" className="text-sm font-medium underline" style={{ color: "var(--ink)" }}>
              See what I do
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mono text-sm mb-2" style={{ color: "var(--sub)" }}>02 — Services</div>
        <h2 className="display text-3xl md:text-4xl font-semibold mb-12 max-w-xl">
          Three ways I fix your spreadsheets.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--grid)", background: "var(--card)" }}>
              <div
                className="sheet-tab active flex items-center gap-2"
                style={{ borderRadius: 0, boxShadow: `0 -3px 0 ${s.color} inset` }}
              >
                <s.icon size={14} /> {s.tab}
              </div>
              <div className="p-6">
                <h3 className="display font-semibold text-lg mb-4">{s.title}</h3>
                <div className="border rounded" style={{ borderColor: "var(--grid)" }}>
                  {s.rows.map((row, idx) => (
                    <div className="row-line" key={row}>
                      <div className="idx">{idx + 1}</div>
                      <div className="flex items-center gap-2 px-3 py-2 text-sm">
                        <CheckCircle2 size={14} style={{ color: s.color, flexShrink: 0 }} />
                        {row}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mono text-sm mb-2" style={{ color: "var(--sub)" }}>03 — Process</div>
        <h2 className="display text-3xl md:text-4xl font-semibold mb-12 max-w-xl">
          One workbook, four sheets, no surprises.
        </h2>

        <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--grid)" }}>
          <div className="p-10 min-h-[160px] flex items-center" style={{ background: "var(--card)" }}>
            <p className="text-lg max-w-xl">{PROCESS[activeStep].body}</p>
          </div>
          <div className="flex gap-1 px-3 pt-2" style={{ background: "#F1EFE9" }}>
            {PROCESS.map((p, idx) => (
              <button
                key={p.tab}
                onClick={() => setActiveStep(idx)}
                className={`sheet-tab ${idx === activeStep ? "active" : ""}`}
              >
                {p.tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mono text-sm mb-2" style={{ color: "var(--sub)" }}>04 — Results</div>
        <h2 className="display text-3xl md:text-4xl font-semibold mb-12 max-w-xl">
          What clients get, in numbers.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto mb-3" size={20} style={{ color: "var(--sub)" }} />
              <CellSelect color="var(--coral)" tag="div" className="display text-2xl md:text-3xl font-semibold justify-center">
                {s.n}
              </CellSelect>
              <div className="mt-3 text-sm" style={{ color: "var(--sub)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {NOTES.map((n) => (
            <div className="note" key={n.who}>
              <MessageSquare size={16} style={{ color: "#C7A93A", marginBottom: 10 }} />
              <p className="text-sm mb-4" style={{ color: "#4A431F" }}>{n.quote}</p>
              <p className="text-xs font-semibold" style={{ color: "#7A6B23" }}>{n.who}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mono text-sm mb-2" style={{ color: "var(--sub)" }}>05 — Contact</div>
            <h2 className="display text-3xl md:text-4xl font-semibold mb-6 max-w-md">
              Send your file. Get a flat quote back.
            </h2>
            <p className="max-w-md mb-8" style={{ color: "var(--sub)" }}>
              Tell me what the spreadsheet needs to do, and I'll reply with a
              fixed price and timeline — usually within a day.
            </p>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-sm font-medium mb-3">
              <Mail size={16} /> {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm font-medium">
              <span className="mono" style={{ color: "var(--sub)" }}>☎</span> {BRAND.phone}
            </a>
          </div>

          <form onSubmit={handleSubmit} className="fbar flex-col items-stretch gap-4 p-6">
            {sent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="mx-auto mb-3" style={{ color: "var(--green)" }} size={28} />
                <p className="font-semibold">Sent.</p>
                <p className="text-sm" style={{ color: "var(--sub)" }}>
                  I'll reply within 24 hours at {form.email || "your email"}.
                </p>
              </div>
            ) : (
              <>
                <input
                  className="input-line"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="input-line"
                  type="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  className="input-line"
                  rows={4}
                  placeholder="What do you need done in Excel?"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {error && (
                  <p className="text-sm" style={{ color: "var(--coral)" }}>{error}</p>
                )}
                <button type="submit" className="cta-btn justify-center" disabled={sending}>
                  {sending ? "Sending..." : "Send project details"} <ArrowRight size={16} />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 py-8" style={{ borderColor: "var(--grid)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: "var(--sub)" }}>
          <span>© {new Date().getFullYear()} {BRAND.name} — {BRAND.role}</span>
          <span className="mono">workbook.xlsx — autosaved</span>
        </div>
      </footer>
    </div>
  );
}
