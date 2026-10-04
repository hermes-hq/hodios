---
schema: 1
id: quote-translation-job
kind: prompt
title: Estimate a translation job quote
description: Estimates a translation quote from job details and the freelancer's own rates, with weighted word count, time, price arithmetic, risks and the questions to ask before accepting.
category: translation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, consultant]
requires: [none]
inputs: [text]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [freelance-translation, quotes, cat-tools, word-count, rates]
pairs_with:
  prompts: [write-translation-brief, build-translation-glossary, post-edit-machine-translation]
  workflows: [freelance-translator-job-track]
  personas: [translation-project-manager]
args:
  - name: job_details
    description: What the client sent - language pair, word count or CAT analysis (repetitions and match bands), file formats, subject, purpose, deadline, whether review by a second linguist, formatting or certification is needed. Paste the analysis table if you have one.
    type: text
    required: true
  - name: your_rates
    description: Your own rates and terms - per-word rate, discounts for repetitions and matches, hourly rate for review, formatting or DTP, minimum fee, rush surcharge, daily output, currency. Missing items are shown as placeholders, not guessed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Job summary, Weighted word count, Time estimate, Price, Risks and assumptions, Questions before accepting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelance translator or small agency turn a job enquiry into a quote they can defend. The usual mistakes: quoting on the raw word count when the CAT analysis shows repetitions and fuzzy matches (or the reverse, accepting a client's discount grid without checking the matches are real), forgetting non-translation work (formatting, file preparation, terminology research, queries, review), underestimating specialised or poor-quality source text, and accepting a deadline that does not fit the translator's real daily output alongside existing work.
</context>

<task>
<job_details>
{{job_details}}
</job_details>

<your_rates>
{{your_rates}}
</your_rates>

1. Summarise the job: pair and direction, volume, subject and difficulty, purpose, file format, deadline and working days available, extra services.
2. Weighted word count: if a CAT analysis is given, apply the translator's own discount grid band by band (repetitions, 100% and context matches, fuzzy bands, no match) and show the arithmetic. If no grid is given, show the bands with [X%] placeholders and the calculation at full rate for comparison. If only a raw count is given, say what an analysis would change.
3. Time estimate: translation time from the weighted words and the translator's stated daily output (adjusted for difficulty and source quality, with the adjustment stated), plus terminology research, queries, formatting, self-revision and any second-linguist review. If no daily output is given, mark it [X words/day] and show the formula.
4. Price: line items (translation, review, formatting or DTP, certification, rush surcharge, project management if relevant), the subtotal, the minimum fee check, and the total in the stated currency. Totals must add up exactly. Note whether tax or VAT is included only as a question, never as a rate.
5. Risks and assumptions: anything that could change the price or deadline (scanned PDFs, embedded images with text, tracked changes, inconsistent source terminology, a reference translation memory of unknown quality, scope creep).
6. Questions to ask before accepting, and a short quote message the translator can send.
</task>

<constraints>
- Use only the translator's own rates and output figures. Never suggest a market rate or a typical per-word price.
- If the language pair or the volume is missing, ask for it and stop. If only the deadline is missing, still produce the quote, give the working days the job needs, and ask for the deadline under Questions.
- If the translator has no rates yet, do not supply any: show the calculation with [rate] placeholders and how to set a rate from their target income, working days and realistic daily output.
- Show every calculation so it can be checked; round only the final price.
- If the deadline does not fit the time estimate, say so plainly and give options (more days, a split delivery, a second translator with a shared glossary, or declining).
- If the job is legal, medical or certified, flag whether the translator holds the required qualification or accreditation as a question, not an assumption.
</constraints>

<output_format>
## Job summary
Five to seven bullets.
## Weighted word count
Table: Band | Words | Rate factor | Weighted words. Total row.
## Time estimate
Table: Task | Basis | Hours. Total and working days, compared with the deadline.
## Price
Table: Item | Quantity | Rate | Amount. Subtotal, minimum fee check, total.
## Risks and assumptions
Bullets.
## Questions before accepting
Numbered questions, then a quote message under 120 words.
</output_format>
