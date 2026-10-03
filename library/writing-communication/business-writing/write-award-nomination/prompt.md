---
schema: 1
id: write-award-nomination
kind: prompt
title: Write an award nomination
description: Writes an award or recognition nomination that maps a colleague's specific achievements and evidence to each published criterion, within the word limit, and shows where the case is weak.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive, individual, teacher]
requires: [none]
inputs: [notes, text]
output: [article, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [award-nomination, recognition, selection-criteria, evidence-mapping]
pairs_with:
  prompts: [write-performance-review, write-professional-bio]
args:
  - name: nominee_achievements
    description: What the nominee did, with numbers, dates, quotes from people affected, and before-and-after comparisons where you have them. Include their role and how long they have been doing it.
    type: text
    required: true
  - name: award_criteria
    description: The award's published criteria or questions, copied as written, plus any form section limits.
    type: text
    required: true
  - name: word_limit
    description: Total word limit for the nomination, if there is one. Per-section limits in the criteria take priority.
    type: number
output_contract:
  format: markdown
  sections: [Criteria map, Nomination, Strengthen the case]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Award panels read many nominations quickly, usually scoring each against a published criterion. Nominations lose not because the nominee is weaker but because the writer praised the person in general ("tireless, inspiring, always goes the extra mile") instead of proving each criterion with specific evidence, or skipped a criterion altogether. Strong nominations do three things: answer every criterion explicitly, in the panel's own words; prove claims with outcomes, numbers, scale and third-party voices; and show what was distinctive about this person's contribution, beyond doing their job well.
</context>

<task>
Write a nomination.{{#word_limit}} Total limit: {{word_limit}} words.{{/word_limit}}

<award_criteria>
{{award_criteria}}
</award_criteria>

<nominee_achievements>
{{nominee_achievements}}
</nominee_achievements>

1. If the criteria are missing, ask for them and stop; a nomination written without them usually misses what the panel scores.
2. Build a criteria map first: for each criterion, list the pieces of evidence that support it and rate the strength of the case (strong, adequate, thin) with a reason. Each piece of evidence goes where it scores best; reuse one only if it genuinely serves two criteria.
3. Write the nomination:
   - An opening of one or two sentences that states who the nominee is and the single most impressive thing they did, with its result.
   - One section per criterion, using the criterion's wording as the heading (or the form's section order). Lead each section with the strongest evidence. Use the pattern: situation in a clause, what the nominee specifically did, the measurable or observable result, and who benefited.
   - Quotes from colleagues, customers or students, only if supplied, attributed by role.
   - A short closing line on why this person and why now.
4. Fit the limits. If the evidence will not fit, cut weaker evidence rather than squeezing sentences until they are unreadable. Report the word count per section and in total.
5. Under Strengthen the case, list criteria rated thin and the evidence that would help (a figure, a testimonial, a before-and-after), so the nominator can gather it before the deadline.
</task>

<constraints>
- Every claim comes from the achievements supplied. Never invent figures, quotes, awards or outcomes. Use `[add: …]` only where a specific missing fact would clearly help.
- Concrete over adjectival: at most one adjective of praise per section, and only after the evidence.
- Credit the nominee's own contribution accurately when the work was a team effort: "led", "designed", "persuaded" only if the notes support it.
- Third person, present the nominee by name as given, past tense for achievements.
</constraints>

<output_format>
## Criteria map
Table: Criterion · Evidence used · Strength (strong, adequate, thin) · Note.
## Nomination
The text, with a heading per criterion or form section, then "Word count: N / limit" (per section where limits exist).
## Strengthen the case
Bullets: what to add or confirm, by criterion. "Nothing to add" if all criteria are strong.
</output_format>

<examples>
Weak: "Maria is a passionate and dedicated leader who always puts customers first."
Strong: "When complaint volumes doubled after the 2025 price change, Maria set up a daily call-back rota and rewrote the five most-used reply templates. Within six weeks the average resolution time fell from 6 days to 2, and the team's satisfaction score rose from 71% to 88%."
</examples>
