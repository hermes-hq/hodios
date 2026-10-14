---
schema: 1
id: inspect-deal-qualification
kind: prompt
title: Inspect a deal's qualification
description: Reviews one open deal against MEDDICC with evidence for each element, rates every gap by risk to the close and names the specific action that would close it before forecast day.
category: sales
version: 1.0.0
status: incubating
stage: [review]
role: [sales-rep, manager, founder, consultant]
requires: [none]
inputs: [notes, transcript, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [meddicc, deal-review, deal-inspection, forecast-accuracy, enterprise-sales, b2b-sales]
pairs_with:
  prompts: [review-sales-pipeline, multithread-open-deal, write-mutual-action-plan, summarize-sales-call]
  personas: [sales-coach]
args:
  - name: deal_notes
    description: Everything you know about the deal - CRM notes, call summaries or transcripts, emails, who you have met and their roles, stated problem and numbers, proposal and price, competitors, timeline and the stage it sits in.
    type: text
    required: true
  - name: close_date
    description: The forecast close date and the forecast category you plan to call (commit, best case, pipeline).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, MEDDICC scorecard, Biggest risks, Actions before close, Questions for the next call]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You inspect a single late-stage B2B deal the way a strong sales manager does in a deal review. MEDDICC covers Metrics (the measurable outcome the buyer expects), Economic buyer (the person who can say yes to the money), Decision criteria, Decision process, Identify pain, Champion and Competition; many teams add Paper process (legal, security, procurement). Experienced managers know reps fill these boxes with hope: "the VP is the economic buyer" when nobody has met the VP; "champion" for a friendly contact who has no influence and has not sold internally; "decision process" without dates. The test for each element is evidence the buyer said or did, not the seller's belief. A champion is proven by actions (shared internal information, arranged a meeting with the economic buyer, pushed back on a competitor), and metrics count only if the buyer stated or confirmed them.
</context>

<task>
<deal_notes>
{{deal_notes}}
</deal_notes>

Forecast: {{close_date}}

1. For each MEDDICC element plus paper process, write what the notes show as evidence, quoting or citing the source, and rate it: confirmed (buyer said or did it), assumed (seller belief or second-hand), or missing.
2. Test the champion separately: list what this person has actually done for the deal, and whether they have power and a personal stake. Call it a coach, not a champion, when they are friendly but have not acted.
3. Rate each gap by the risk it poses to the close date (high, medium, low), and explain how deals with that gap usually slip or die.
4. Give a verdict: does the evidence support the forecast category and close date? If not, say which category and date the evidence supports.
5. For each high and medium gap, give one concrete action with an owner and a date before the close date, phrased as something the rep can do this week (for example, "Ask Dana to set up 30 minutes with the CFO to confirm the savings figure before procurement starts").
6. Write five to eight questions for the next buyer conversation that would turn assumed items into confirmed ones without sounding like an interrogation.
</task>

<constraints>
- Only treat as confirmed what the notes show the buyer said or did. Never fill an element from general knowledge or from what deals like this usually have.
- Do not invent people, titles, numbers or dates. Where something is missing, say so.
- Be direct about a weak deal; a softened verdict defeats the purpose of the review.
- Keep actions specific to this deal; no generic advice like "build rapport".
- If the notes are too thin to inspect (for example, one line), list what is needed and stop.
</constraints>

<output_format>
## Verdict
Two or three sentences: forecast supported or not, and the category and date the evidence supports.

## MEDDICC scorecard
Table: Element | Evidence | Rating (confirmed, assumed, missing) | Risk (high, medium, low).

## Biggest risks
The top three gaps, each with how it usually kills or delays a deal.

## Actions before close
Table: Action | Owner | By when | Turns which element to confirmed.

## Questions for the next call
Numbered questions.
</output_format>
