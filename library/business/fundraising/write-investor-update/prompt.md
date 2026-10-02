---
schema: 1
id: write-investor-update
kind: prompt
title: Write a monthly investor update
description: Writes a concise monthly investor update with a TL;DR, metrics against plan, highlights, honest lowlights, cash and runway, and specific asks. Use each month to keep investors informed.
category: fundraising
version: 1.0.0
status: incubating
stage: [ship]
role: [founder, executive]
inputs: [notes, dataset, text]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [investor-update, investor-relations, runway, monthly-report]
pairs_with:
  prompts: [model-unit-economics, prepare-investor-qa]
  personas: [startup-mentor]
args:
  - name: metrics
    description: This month's key numbers with last month's and the plan or target where you have them - revenue, growth, customers, burn, cash, runway, and the metrics your investors follow.
    type: text
    required: true
  - name: news
    description: What happened this month - wins, losses, launches, hires, departures, problems and what you are doing about them.
    type: text
    required: true
  - name: asks
    description: Specific help you want from investors (introductions, hiring, advice). Leave empty to have asks suggested from the news.
    type: text
output_contract:
  format: markdown
  sections: [Subject, TL;DR, Key metrics, Highlights, Lowlights, Asks, Thank you]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders write the monthly investor update that the best-run companies send without fail. A good update is short, consistent month to month, honest about bad news, and ends with asks specific enough that an investor can act on them in five minutes. Investors forgive misses; they do not forgive surprises.
</context>

<task>
Write this month's investor update.

<metrics>
{{metrics}}
</metrics>

<news>
{{news}}
</news>

<asks>
{{asks}}
</asks>

1. Subject line: company name placeholder, month, and the single most important fact ("[Company] - May update: ARR 1.1m (+9%), new CRO hired").
2. TL;DR: three bullets covering the headline result, the biggest problem, and the top ask.
3. Key metrics table: metric, this month, last month, change, plan or target, short comment. Compute changes from the numbers given; show cash and runway in months. If runway is not given but cash and monthly net burn are, compute it and show the arithmetic in the comment.
4. Highlights: three to five bullets, each with a concrete result, not activity ("Signed 3 enterprise pilots worth 90k ARR", not "Lots of enterprise interest").
5. Lowlights: the misses and problems stated plainly, each with what you learned and what you are doing about it. Do not omit bad news that appears in the input.
6. Asks: two or three specific asks (who, what, why). If none were given, propose asks that follow from the news and mark them `suggested`.
7. A one-line thank-you close.
</task>

<constraints>
- Use only numbers in the input or arithmetic on them. Never round in the company's favour; keep units and periods explicit.
- Do not spin. A miss against plan is called a miss, with the number.
- Keep it under about 400 words excluding the table. No hype, no exclamation marks.
- Do not include confidential details about named customers or employees beyond what the input clearly allows; prefer roles and segments.
- If the metrics are missing cash or runway, flag it at the top as needed; investors expect it.
</constraints>

<output_format>
Plain text ready to paste into an email, with these labelled sections: Subject, TL;DR, Key metrics (Markdown table), Highlights, Lowlights, Asks, Thank you.
</output_format>
