---
schema: 1
id: write-brag-document
kind: prompt
title: Write a brag document
description: Turns notes, messages and metrics into a running accomplishments log grouped by impact, ready for reviews and promotion cases. Use monthly, or before a review when you cannot remember what you did.
category: career-growth
version: 1.0.0
status: incubating
stage: [build]
role: [individual, software-engineer, designer, product-manager]
requires: [none]
inputs: [notes, message, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [accomplishments-log, impact, self-advocacy, review-prep, evidence]
pairs_with:
  prompts: [write-self-review, prepare-promotion-case, increase-work-visibility, ask-for-raise]
  personas: [career-coach]
args:
  - name: raw_notes
    description: Anything that shows what you did - your own notes, praise or thank-you messages, tickets closed, project updates, metrics, calendar highlights, feedback. Messy is fine. Remove other people's private details if you prefer.
    type: text
    required: true
  - name: role
    description: Your role and level, your team, and the period this covers.
    type: string
    required: true
  - name: review_criteria
    description: Your company's competencies, career ladder or review criteria, or the level you are aiming for. Optional; without it, entries are grouped by type of impact.
    type: text
output_contract:
  format: markdown
  sections: [Highlights, Accomplishments, Feedback received, Evidence gaps, Keep it going]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people keep a brag document: a running, factual record of what they did and why it mattered. Its readers are, first, the person themselves at review time and, later, their manager, who often has to argue for them in rooms they are not in. A good entry is short and states what happened, the person's part, the result with a number or a named beneficiary, and a pointer to evidence. Raw notes usually describe activity ("worked on the billing migration") rather than outcome, hide the person's role behind "we", leave out invisible work such as mentoring, support and incident response, and forget anything older than six weeks.

Role and period: {{role}}

<raw_notes>
{{raw_notes}}
</raw_notes>
{{#review_criteria}}
<review_criteria>
{{review_criteria}}
</review_criteria>
{{/review_criteria}}
</context>

<task>
1. Extract every distinct accomplishment from the notes, including small and invisible ones. Merge duplicates.
2. Rewrite each as one or two lines: action verb, what the person did, their role (led, owned, contributed to, supported), and the result. Use numbers only when they appear in the notes; otherwise insert [X: what to measure] so the person knows what to look up.
3. Group the entries. If review criteria are given, group by those criteria and show which ones have strong, thin or no evidence. Otherwise, group by type of impact: results delivered, quality and reliability, helping others grow, improving how the team works, and recognition.
4. Pick the three to five highlights that best show the level the person is at or aiming for, and say in one line why each one matters.
5. Collect feedback and praise into a separate section, quoted briefly, with who said it (by role) and when, if known.
6. List evidence gaps: entries without a result, criteria without examples, and periods with nothing recorded, each with a concrete action (for example, "ask the support lead for the ticket volume before and after").
7. Suggest a five-minute weekly routine to keep the document current, and the one question to answer each Friday.
</task>

<constraints>
- Never invent outcomes, numbers, praise or scope. Use only what the notes contain, and mark anything missing as [X] with what to find.
- Credit honestly. Do not turn team results into individual ones; state the person's actual part.
- Keep entries short and factual: no adjectives like "outstanding" or "exceptional", and let results speak.
- If an item in the notes is confidential or names colleagues negatively, leave it out and say so in one line.
</constraints>

<output_format>
## Highlights
Three to five bullets, each with why it matters.
## Accomplishments
One subsection per group. Table: Date or period | Accomplishment | Your role | Result | Evidence.
## Feedback received
## Evidence gaps
Table: Gap | Action.
## Keep it going
</output_format>
