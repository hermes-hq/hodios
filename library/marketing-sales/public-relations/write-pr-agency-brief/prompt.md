---
schema: 1
id: write-pr-agency-brief
kind: prompt
title: Write a PR agency brief
description: Writes the brief an organisation sends PR agencies or freelancers before a pitch, with objectives, audiences, budget, scope, how proposals will be judged and a fair pitch process.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder, executive]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [agency-pitch, rfp, agency-selection, pr-budget, scope-of-work]
pairs_with:
  prompts: [write-pr-plan, write-coverage-report]
args:
  - name: organisation
    description: Who you are, what you sell or do, your current PR activity and team, past agency experience, and the problem you want an agency to solve.
    type: text
    required: true
  - name: budget_and_timing
    description: Monthly retainer or project budget range (or "not decided"), start date, contract length you expect, and when you want proposals.
    type: text
    required: true
  - name: constraints
    description: Markets and languages, sectors or regulators, conflicts the agency must not have, procurement rules. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Brief, Scoring sheet, Pitch process, Questions to ask agencies, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an in-house communications director who has hired and fired PR agencies. Poor briefs produce poor pitches: if the brief asks for "awareness" with no budget, agencies guess, pitch their favourite stunt and over-promise coverage. Good briefs state the business problem, measurable outcomes, the real budget range, what the client team will provide, and how proposals will be scored, so agencies can decide whether to pitch at all. Asking four or more agencies for full creative work for free is unfair and wastes everyone's time; a shortlist of two or three, with a chemistry meeting first, gets better work. Coverage guarantees and "pay per placement" promises are warning signs, as are agencies who cannot name the people who will actually work on the account.

<organisation>
{{organisation}}
</organisation>

Budget and timing: {{budget_and_timing}}
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Write the brief, under about 900 words, with: background; the business problem; objectives stated as outcomes (with any baseline you were given); priority audiences; key messages or what is still open; scope (in and out: media relations, thought leadership, crisis support, social, events); markets; what the in-house team provides and approves; budget range and term; reporting expectations; conflicts and confidentiality; what to submit and by when.
2. Write a scoring sheet with weighted criteria (for example strategic understanding, sector media relationships, the team who will do the work, measurement approach, value for money, chemistry) and what a strong answer looks like for each.
3. Lay out a fair pitch process: longlist, credentials and conflict check, shortlist of two or three, chemistry meeting, a focused task rather than free full campaigns, decision date and feedback to losing agencies.
4. List questions to ask in the meeting, including who works on the account day to day, how many hours the fee buys, how coverage is measured, and references from current clients.
5. Gaps: anything missing from the inputs that the brief needs, marked as placeholders.
</task>

<constraints>
- Do not invent budgets, baselines or targets; use placeholders like [BUDGET RANGE] and say why the number matters.
- Do not set coverage counts as objectives unless the user insists; prefer outcomes tied to the business, with coverage as an indicator.
- Keep the brief free of confidential data the user flagged.
- Flag guaranteed-coverage or pay-per-placement offers as things to question, not reward.
</constraints>

<output_format>
## Brief
The brief text with headings, ready to send.
## Scoring sheet
| Criterion | Weight | What strong looks like |
## Pitch process
Numbered steps with dates or placeholders.
## Questions to ask agencies
## Gaps
</output_format>
