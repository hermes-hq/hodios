---
schema: 1
id: reference-check-investor
kind: prompt
title: Reference-check an investor before you take their money
description: Plans a founder's due diligence on a prospective lead investor - who to call, including founders they did not list, questions about hard times, and how to weigh what you hear.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive]
inputs: [notes, text]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [investor-diligence, backchannel, reference-calls, board-member, venture-capital]
pairs_with:
  prompts: [compare-term-sheets, explain-term-sheet, build-investor-pipeline]
  personas: [venture-capitalist]
args:
  - name: investor
    description: The investor or partner you are considering - fund, the person who would join your board, what you know of their portfolio, and the references they gave you.
    type: text
    required: true
  - name: concerns
    description: Anything specific you want to test (for example how they behave when a company misses plan, follow-on behaviour, how much time they give, conflicts with a competitor).
    type: text
output_contract:
  format: markdown
  sections: [What you are testing, Who to call, Questions, How to weigh what you hear, Tracker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders check an investor before signing, because the lead investor often sits on the board for years and is very hard to remove. References the investor hands over are curated; the most useful calls are with founders from companies that struggled, were sold cheaply or replaced their CEO, and with co-investors and former employees of the fund. The questions that reveal the most are about behaviour under stress: a missed quarter, a down round, a CEO change, a bridge. Founders tend to ask flattering questions ("are they helpful?") and get flattering answers.
</context>

<task>
Plan the reference check on this investor.

<investor>
{{investor}}
</investor>

{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. What you are testing: four to six hypotheses to confirm or disprove (for example "the partner will stay at the fund for the life of the investment", "they follow on when a company is behind plan").
2. Who to call: categories of people and how to find them from public information (portfolio pages, past announcements, professional networks): given references, founders not on the list, especially from companies that struggled or failed, co-investors, former fund staff. Aim for six to ten calls, more off-list than on-list.
3. Questions: ten to fifteen open questions grouped by hypothesis, phrased to get stories rather than ratings ("Tell me about the board meeting after your worst quarter").
4. How to weigh what you hear: what counts as a real red flag versus noise, how to treat one bad story against a pattern, and why to discount on-list references.
5. Tracker: a table to fill in during calls.
</task>

<constraints>
- Do not make claims about the named investor's reputation, behaviour or portfolio from your own knowledge; everything about them must come from the input or from the calls the founder makes.
- Do not suggest misrepresenting who you are or why you are calling, or pressing people to share confidential deal terms.
- Keep it practical for a founder who has one or two weeks, typically under an exclusivity period.
- Treat the term sheet itself as out of scope here; point to a separate review.
</constraints>

<output_format>
## What you are testing
## Who to call
Table: Category | Why | How to find them | Target number.
## Questions
Grouped by hypothesis.
## How to weigh what you hear
## Tracker
Table: Person | Relationship | Hypotheses covered | What they said | Signal (positive, neutral, concern).
</output_format>
