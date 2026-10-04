---
schema: 1
id: improve-first-contact-resolution
kind: prompt
title: Improve first contact resolution
description: Finds why customers have to get in touch more than once - missing permissions, knowledge gaps, handoffs, unclear replies - from ticket samples, and builds fixes with a simple repeat-contact measure.
category: customer-support
version: 1.0.0
status: incubating
stage: [review, plan]
role: [manager, operations-manager, support-agent]
requires: [none]
inputs: [ticket, dataset, text]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [first-contact-resolution, repeat-contacts, root-cause, agent-empowerment, call-centre]
pairs_with:
  prompts: [analyze-support-tickets, build-support-qa-scorecard, design-escalation-process]
  personas: [customer-success-manager]
args:
  - name: ticket_samples
    description: Full threads (not just subjects) of conversations where the customer contacted more than once, ideally 20 to 50, with dates, channel and how each ended. Remove names and contact details first.
    type: text
    required: true
  - name: team
    description: How the team is set up - tiers, what front-line agents may approve (refunds, credits, account changes), who they hand to, tools and knowledge base, and any current resolution or repeat-contact figures. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Repeat-contact causes, Evidence, Fixes, Measure, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a support operations analyst who improves first contact resolution: the share of issues solved without the customer having to come back. Repeat contacts cost twice and anger customers more than slow first replies. The causes are usually few and fixable, and they sit in the system, not the agent: front-line staff cannot approve the fix and must hand off; the knowledge base is wrong or silent; a handoff loses context so the customer repeats themselves; the reply answers one of three questions or ends without a clear next step; a promised callback has no owner; or a broken process (billing, delivery) creates the same contact again. Blaming individual agents rarely helps.
</context>

<task>
<ticket_samples>
{{ticket_samples}}
</ticket_samples>
{{#team}}
<team>
{{team}}
</team>
{{/team}}

1. For each thread, find the first contact that should have resolved it, and classify why it did not: permission gap, knowledge gap, handoff lost context, incomplete answer, no clear next step, broken promise or callback, upstream process failure, customer-side delay, or genuinely needed multiple steps (not a failure). Count each cause.
2. For the top causes, quote one or two short lines from the threads as evidence (no personal data).
3. Fixes, ranked by repeat contacts removed per unit of effort: for example raise agent approval limits for low-value credits, fix or write specific articles, a handoff note template, a reply checklist ("every question answered, next step with date"), callback ownership in the queue, or a named upstream fix with its owner team.
4. Measure: define a repeat contact (same customer, same issue, within 7 days is a common starting point; adjust to the business) and how to count it from the tool, with a baseline from the sample if possible and a target to review after four to six weeks. Note that sample-based rates are rough.
5. Questions: anything that would change the analysis.
</task>

<constraints>
- Base every count and quote on the threads given; do not invent volumes or percentages beyond the sample, and say how many threads were analysed.
- If fewer than about ten full threads are provided, or only subject lines, say the result is indicative and ask for fuller threads.
- Do not name or blame individual agents; describe behaviours and system causes.
- Strip any personal data from quotes.
</constraints>

<output_format>
## Summary
Three to five sentences: threads analysed, the main causes and the top two fixes.
## Repeat-contact causes
Table: Cause | Threads | Share of sample | Example.
## Evidence
Short quotes per top cause.
## Fixes
Table: Fix | Cause addressed | Owner | Effort (low, medium, high) | Expected effect.
## Measure
Definition, how to count it, baseline, review date.
## Questions
Bullets.
</output_format>
