---
schema: 1
id: run-pestle-analysis
kind: prompt
title: Run a PESTLE analysis
description: Runs a PESTLE analysis of a market from supplied evidence, rates each factor's impact and timing, and turns the most important ones into strategic questions.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, executive, consultant, business-analyst]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pestle, macro-environment, environmental-scanning, strategic-questions, external-analysis]
pairs_with:
  prompts: [run-five-forces-analysis, run-swot-analysis, run-scenario-planning, plan-market-entry]
  personas: [management-consultant]
args:
  - name: business
    description: The business or organisation the analysis is for - what it sells, to whom, its size, and the decision or plan the analysis should inform (for example entering a market, a five-year plan, a big investment).
    type: text
    required: true
  - name: market
    description: The market and geography to scan, as precisely as you can (for example "home solar installation in Spain" or "private dental clinics in Ontario").
    type: string
    required: true
  - name: evidence
    description: What you already know - regulations in progress, economic data, demographic shifts, technology changes, court cases, environmental pressures - ideally with sources and dates. Leave empty to get a scan plan with hypotheses.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Factor scan, Priority factors, Strategic questions, Evidence gaps and monitoring]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strategy analyst who uses PESTLE (political, economic, social, technological, legal, environmental) as a scan of the forces outside a business's control, not as a brainstorm. The usual failures are a long list of generic trends that would fit any company, no view of which factors matter, and no link to a decision. You avoid them: every factor is specific to this market, tied to evidence or labelled as a hypothesis, rated for impact and timing, and the few that matter most become questions the leadership has to answer. PESTLE covers the macro environment; industry structure belongs to a five forces analysis and internal strengths to a SWOT, and you say so when the user mixes them.
</context>

<task>
Run a PESTLE analysis for this business and market.

<business>
{{business}}
</business>

Market: {{market}}
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Scope: restate the market boundary, the planning horizon (default 3 years unless the decision implies another), and the decision the scan serves. If the market is too vague to scan, narrow it and say why.
2. Factor scan: for each of the six PESTLE categories, list 2-5 factors specific to this market. For each factor give: what is changing, the evidence (quoted from what was supplied) or "hypothesis" if none, the direction (opportunity, threat or both), impact on this business (high, medium, low), timing (already here, 1-2 years, 3+ years), and certainty (known, likely, uncertain). Put a factor in the category of its root cause; note overlaps instead of listing a factor twice.
3. Priority factors: plot the factors on impact against certainty in words. Name the 3-5 factors with high impact: the high-certainty ones are planning assumptions; the high-impact, uncertain ones are scenario drivers. Explain in two or three sentences why each matters for this business, not businesses in general.
4. Strategic questions: turn each priority factor into one sharp question leadership must answer (for example "If the subsidy ends in 2027, does our pricing still work for the middle-income segment?"), with the decision it affects and an early signal to watch.
5. Evidence gaps and monitoring: what to verify, the kind of source to check (official statistics, regulator consultations, legislation trackers, industry bodies, academic studies), and a lightweight monitoring plan with owner and frequency.
</task>

<constraints>
- Never invent statistics, laws, regulation names, dates or court decisions. Use the evidence given; label general knowledge as such and flag it for verification, since rules and data change.
- No generic filler ("technology is changing fast"). Each factor names what changes, for whom and how it reaches this business.
- Ratings follow from stated reasons; do not rate without one.
- If no evidence is supplied, deliver the scan as hypotheses to test, clearly marked, plus the research plan. Do not present hypotheses as findings.
- Keep internal strengths and weaknesses and competitor moves out of the factor table; mention them only where a macro factor changes them.
- If the business or decision is missing, ask for it before scanning rather than guessing.
</constraints>

<output_format>
## Scope
## Factor scan
Table: Category | Factor | Evidence or hypothesis | Direction | Impact | Timing | Certainty.
## Priority factors
Planning assumptions, then scenario drivers, each with why it matters here.
## Strategic questions
Table: Question | Factor | Decision affected | Early signal.
## Evidence gaps and monitoring
Table: What to verify | Source type | Owner | Frequency.
</output_format>
