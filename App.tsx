import EligibilityWidget from "./components/EligibilityWidget";
import type { UXObservation, SkillBar, StatItem } from "./types";
import "./App.css";

const STATS: StatItem[] = [
  { value: "#1", label: "cause of death for Americans under 50", source: "CDC" },
  { value: "80%", label: "of people with OUD receive no treatment", source: "SAMHSA" },
  { value: "76%", label: "overdose reduction with MAT", source: "NIH" },
];

const OBSERVATIONS: UXObservation[] = [
  {
    id: 1,
    title: "Insurance check flow has mobile drop-off risk",
    description: "The insurance checker redirects to a separate URL mid-flow. On mobile, this feels like starting over — for someone in a vulnerable moment, that perception alone causes abandonment. The stakes aren't just conversion; they're whether someone gets care.",
    proposal: "Embed insurance validation inline as a multi-step React component with optimistic UI state. No redirect. Smooth progress indicator. Critical given Ophelia's Medicaid expansion into NJ and other states where mobile-first users dominate.",
    tag: "UX / React",
  },
  {
    id: 2,
    title: '"Am I a candidate?" asks for commitment before providing value',
    description: "The primary homepage CTA is a cold start for someone scared and uncertain. No intermediate value — no quiz, no eligibility check — before asking for a phone number. For OUD patients with privacy concerns (Ophelia's own research cites this as a top barrier), this is a significant ask too early.",
    proposal: "A 3-question anonymous eligibility widget (no login, no PII). Opioid type → frequency → state. Instant result. Warms the user before the ask. This is a React + Firebase Remote Config problem — exactly the stack I'd be working in. I built a working prototype — see below.",
    tag: "Product / Firebase",
  },
  {
    id: 3,
    title: "Patient portal login is a dead end for new users",
    description: 'Clicking "Patient login" from the main nav takes you to a phone-number entry screen with no context. Someone researching the platform — not yet a patient — hits a wall and bounces.',
    proposal: 'Clearer nav hierarchy: "Explore treatment" vs "Patient login" consistently applied across breakpoints. Small React routing change, measurable conversion impact, zero risk to existing patient flows.',
    tag: "React Router",
  },
];

const SKILLS: SkillBar[] = [
  { name: "React / TypeScript", level: 82, note: "Production — this app", strong: true },
  { name: "Python / Haskell / Node", level: 86, note: "Production at Juspay", strong: true },
  { name: "PostgreSQL & data modelling", level: 83, note: "Multi-tenant schemas at scale", strong: true },
  { name: "LLM / AI tooling", level: 76, note: "AWS Bedrock — 2,000+ engineer adoption", strong: true },
  { name: "CI/CD & distributed systems", level: 79, note: "Blue-green deploys, 5+ services", strong: true },
  { name: "Firebase / GCP", level: 44, note: "Learning — deep AWS background transfers", strong: false },
];

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="header-tag">Application artifact · Software Engineer I</div>
          <h1 className="header-title">What I'd ship in my first<br />90 days at Ophelia</h1>
          <p className="header-sub">
            By <strong>Shriyansh Sinha</strong> &nbsp;·&nbsp; IIT Patna &nbsp;·&nbsp; Software Engineer at Juspay &nbsp;·&nbsp;{" "}
            <a href="mailto:shriyansh20sinha@gmail.com">shriyansh20sinha@gmail.com</a>
          </p>
        </div>
      </header>

      <main className="main">
        <section className="section">
          <h2 className="section-title">Why I built this</h2>
          <p className="body-text">Opioid overdose is the #1 cause of death for Americans under 50. Around 80% of the 3 million Americans with OUD get no treatment — not because they don't want help, but because the system fails them: stigma, cost, geography, an intake process designed for a different kind of patient.</p>
          <p className="body-text" style={{ marginTop: "0.75rem" }}>Ophelia is one of the rare startups where shipping a better React component directly means someone gets life-saving medication sooner. That's not a metaphor — that's the product. I built this to show what I'd bring, not just describe it.</p>
          <div className="stats-row">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-source">Source: {s.source}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Three things I noticed on ophelia.com</h2>
          <p className="body-text" style={{ marginBottom: "1.5rem" }}>I went through the full patient onboarding flow, read the research and blog pages, explored the patient portal, and studied the JD tech stack carefully.</p>
          {OBSERVATIONS.map((obs) => (
            <div className="obs-card" key={obs.id}>
              <div className="obs-header">
                <span className="obs-num">{obs.id}</span>
                <div>
                  <span className="obs-tag">{obs.tag}</span>
                  <h3 className="obs-title">{obs.title}</h3>
                </div>
              </div>
              <p className="obs-desc">{obs.description}</p>
              <div className="obs-proposal">
                <span className="proposal-label">What I'd propose</span>
                <p className="proposal-text">{obs.proposal}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="section">
          <h2 className="section-title">Working prototype: anonymous eligibility widget</h2>
          <p className="body-text" style={{ marginBottom: "1.5rem" }}>Proposal #2 made concrete. Built in React + TypeScript with Firebase Remote Config driving the eligible-states list — exactly the stack in the JD. Try it:</p>
          <EligibilityWidget />
          <div className="stack-note">
          <div className="stack-note" style={{ marginTop: "1rem" }}>
  <strong>Stack used here:</strong> React 18 · TypeScript · Firebase Remote Config (simulated) · Firestore analytics logging · CSS Modules · Vite.

  <br /><br />

  <strong>Designed for integration:</strong><br />
  This eligibility checker is built as a self-contained React component that can be embedded across Ophelia’s marketing pages or onboarding flows without requiring a full app integration.

  <br /><br />

  <code>
{`<script src="ophelia-widget.js"></script>
<div id="ophelia-widget"></div>`}
  </code>

  <br /><br />

  The component remains stateless from the host page’s perspective, with eligibility rules and state availability controlled via Remote Config — allowing non-engineering teams to update rollout without redeploying.
</div>
            <strong>Stack used here:</strong> React 18 · TypeScript · Firebase Remote Config (simulated) · Firestore analytics logging · CSS Modules · Vite. The eligible-states list is fetched from Remote Config so the team can toggle state availability without a redeploy.
          </div>
        </section>
        
        <section className="section">
          <h2 className="section-title">What I bring to the stack</h2>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div className="skill-row" key={s.name}>
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-note">{s.note}</span>
                </div>
                <div className="bar-wrap">
                  <div className="bar" style={{ width: `${s.level}%`, background: s.strong ? "#1d9e75" : "#ba7517" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="callout">
            <strong>On Firebase / GCP:</strong> The gap between AWS and GCP is real and I'm naming it. I've shipped production systems on AWS Bedrock, managed Kafka pipelines, and designed PostgreSQL schemas for high-throughput workloads. The cloud primitives transfer directly — I'd expect to be productive with Firebase within the first couple of weeks.
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Why this mission, specifically</h2>
          <div className="insight">
            <div className="insight-label">On the problem</div>
            <p className="insight-text">Zack Gray founded Ophelia after losing someone he loved to an opioid overdose. That's not a startup pitch — it's a reason. I don't take lightly the decision of where to spend my engineering hours. I want them to matter in a way I can see and point to.</p>
          </div>
          <div className="insight">
            <div className="insight-label">On the engineering stakes</div>
            <p className="insight-text">Telehealth platforms are one of the few domains where frontend UX directly affects clinical outcomes. A confusing intake flow doesn't just hurt conversion — it means someone in crisis navigated away before getting help. I've never worked somewhere the stakes were this concrete. I want to.</p>
          </div>
          <div className="insight">
            <div className="insight-label">On what I bring from Juspay</div>
            <p className="insight-text">I joined as an intern and became a full-time engineer at a growth-stage fintech startup — built LLM tooling adopted by 2,000+ engineers, designed multi-tenant schemas, improved CI/CD across 5+ services. Fast-moving, small team, high ownership. Exactly the environment Ophelia describes.</p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">My application form answers</h2>
          <div className="answer-card">
            <div className="answer-q">Describe yourself in a short phrase</div>
            <div className="answer-a">Full-stack engineer who shipped production AI tools to 2,000+ engineers — now wants to build software that saves lives.</div>
          </div>
          <div className="answer-card">
            <div className="answer-q">What are you looking for in your next role?</div>
            <div className="answer-a">I want to work somewhere the product outcome actually matters beyond metrics — where shipping a better onboarding flow means a real person gets access to care they desperately needed. Ophelia is one of the few engineering roles where frontend UX has direct clinical stakes.<br /><br />I'm looking for: a small team where I can own things end-to-end, close collaboration with product and design, and a fast iteration cycle where I can see the impact of what I built within days. At Juspay I went from intern to full-time, built tools used by 40+ teams, and learned that the best engineering culture is one where engineers are trusted to think, not just execute tickets. I want more of that — in service of a harder problem.<br /><br />What I'd like to avoid: large-org bureaucracy where I'm three steps removed from users, purely internal tooling with no external impact, and environments where engineers are discouraged from asking "why are we building this?"</div>
          </div>
          <div className="answer-card">
            <div className="answer-q">Describe a project you're proud of</div>
            <div className="answer-a">At Juspay, I noticed engineering managers were spending hours manually writing weekly highlight reports — summarising what ~5,000 daily engineering events meant for leadership. Tedious, inconsistent, and nobody loved doing it.<br /><br />I built an LLM-powered tool using AWS Bedrock that automatically generated these highlights by ingesting raw event streams, clustering related activity, and producing readable narratives. I owned it from problem definition through production: designed the data pipeline, chose the prompting architecture, built the review UI, and shipped iteratively based on feedback.<br /><br />Result: adopted by 40+ teams and 2,000+ engineers. What took hours now takes minutes — and the reports got better. What I'm most proud of isn't the AI piece. It's that I identified a real pain point nobody had formally scoped, convinced stakeholders it was worth building, and saw it through to meaningful adoption. That's the ownership I want to bring to Ophelia's patient-facing products.</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p><strong>Shriyansh Sinha</strong> · shriyansh20sinha@gmail.com · +91 9761932200 · IIT Patna · Software Engineer at Juspay</p>
        <p style={{ marginTop: "0.4rem", fontSize: "12px", color: "#aaa" }}>Built specifically as part of my application to Ophelia (Software Engineer I) · Stack: React 18 · TypeScript · Firebase · Vite</p>
      </footer>
    </div>
  );
}