---
schema: 1
id: explain-tech-to-executives
kind: prompt
title: Explain a technical issue to executives
description: Translates a technical issue or decision into a one-page executive brief with business impact, options, cost, risk and the specific ask. Use when leadership must decide or fund something technical.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, architect]
stack: []
requires: [none]
inputs: [text, document, notes]
output: [message, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [executive-summary, stakeholder-communication, bluf, tech-debt]
args:
  - name: technical_detail
    description: The technical issue, incident, proposal or decision in your own words, with any numbers you have (cost, incidents, customers affected, timelines).
    type: text
    required: true
  - name: audience
    description: Who reads the brief, for example "CEO and CFO", "board", "VP Sales".
    type: string
    default: executive team
  - name: decision_needed
    description: What you need from them, for example approval, budget, a trade-off between scope and date, or just awareness.
    type: text
output_contract:
  format: markdown
  sections: [Brief, Glossary removed, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Executives decide among options under constraints of money, time, risk and customers. They do not need to understand the mechanism, but they do need to trust that the engineer understands it and has framed the choice honestly. Technical briefs fail when the ask is buried at the end, when impact is expressed in technical units (CPU, latency, story points) instead of customers, revenue, risk or dates, when only one option is offered, or when uncertainty is either hidden or so heavily hedged that no decision is possible.
</context>

<task>
Write a brief for {{audience}} about:
{{technical_detail}}
{{#decision_needed}}What is needed from them: {{decision_needed}}{{/decision_needed}}
If what you need from them is not stated and cannot be inferred, ask; a brief without an ask is a status update, so say so if that is what it is.

1. Lead with the ask: the decision, by when, and the recommended answer, in two sentences.
2. Explain the situation in business terms: who or what is affected (customers, revenue, compliance, delivery dates, team capacity), how much, and what happens if nothing is done, with a time frame. Use an analogy only if it is accurate.
3. Give two or three options, including doing nothing. For each: what it costs (money, people, time), what it delivers, what it puts at risk, and what it gives up.
4. Give the recommendation and the main reason, plus the signal that would tell them it is working.
5. Translate every technical term into its consequence, or drop it. Keep one technical sentence at most, for credibility, in plain words.
6. Separate known facts from estimates. Express uncertainty as a range or a confidence level, once.
</task>

<constraints>
- At most one page (about 300 to 400 words) for the brief.
- Use only numbers from the input. Where a number the audience will expect is missing (cost, customers affected, date), mark it `[need: …]` rather than inventing it.
- Neutral, factual tone: no alarmism, no reassurance the facts do not support, no blame.
{{> output/verbosity-spec}}
</constraints>

<output_format>
## Brief
Subject line, then sections: The ask, What is happening, Options (a short table: Option | Cost | Time | Risk | What we give up), Recommendation, What we will report back and when.
## Glossary removed
Bullets: technical terms from the input you translated or dropped, and what replaced them, so the author can check nothing was lost.
## Gaps
Bullets: each `[need: …]` placeholder and the question an executive is likely to ask that the brief cannot yet answer.
</output_format>
