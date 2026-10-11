---
schema: 1
id: write-needs-statement
kind: prompt
title: Write a grant needs statement
description: Writes the statement of need for a grant proposal - a specific problem for specific people, local evidence, the gap and why now - avoiding circular need and deficit language.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, executive, researcher]
requires: [none]
inputs: [text, notes, dataset]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [needs-statement, problem-statement, evidence-base, funder-criteria, dignity-language]
pairs_with:
  prompts: [write-grant-application, write-letter-of-inquiry]
  personas: [grant-writer]
args:
  - name: problem_and_people
    description: The problem, the people affected, the place, and what you see in your work that shows it.
    type: text
    required: true
  - name: evidence
    description: Data and sources you have (local statistics with year and source, your own service data, waiting lists, consultation results, research), and any quotes from participants with consent.
    type: text
    required: true
  - name: funder_guidance
    description: What the funder asks for in this section, with any word limit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Needs statement, Evidence register, Weak points, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who has read many needs statements as a reviewer. The common failures are circular need ("there is a need for our programme" or "the lack of a youth centre"), which describes the solution rather than the problem; national statistics with no local link; old or unsourced figures; and language that defines people only by their deficits. Strong statements describe a specific problem for specific people in a specific place, show its size and consequences with recent, sourced, local evidence, explain why existing services or approaches do not meet it (the gap), say why now, and connect to the funder's priorities, all before the solution is introduced. People's own voices, used with consent, make the evidence human.

<problem_and_people>
{{problem_and_people}}
</problem_and_people>

<evidence>
{{evidence}}
</evidence>
{{#funder_guidance}}
<funder_guidance>
{{funder_guidance}}
</funder_guidance>
{{/funder_guidance}}
</context>

<task>
1. Evidence register: list every piece of evidence with its figure, year, geography, and source, and rate it (local and recent, national or old, anecdotal, unsourced). Flag figures that do not support the claim they are used for.
2. Define the problem as a condition people experience, not the absence of your service. Write it in one sentence and check it would still make sense if your organisation did not exist.
3. Needs statement, within the funder's limit (default about 400 to 600 words), in this order unless the funder specifies another: the problem and who experiences it; its scale with the strongest local evidence, compared with a regional or national figure where that helps; consequences for people and for the community if nothing changes; causes, briefly, as far as the evidence shows; the gap in current provision and why it persists; why now; and a closing link to the funder's priority that leads into the proposed approach without describing it in full.
4. Use person-first, asset-aware language: describe people's circumstances and strengths, not only their deficits, and use the words communities use for themselves where given.
5. Weak points: where a reviewer would push back (old data, no local data, a gap claim that ignores other providers) and how to strengthen each.
6. Gaps: missing evidence, shown in the text as [NEEDED: ...].
</task>

<constraints>
- Use only evidence given. Never invent statistics, studies, sources or quotes; mark where evidence is needed.
- Do not describe the organisation's solution as the need.
- Quotes from participants only if the input says consent was given; otherwise suggest gathering them with consent.
- State the year and geography of every figure in the text.
- Stay within the word limit and report the approximate count.
</constraints>

<output_format>
## Needs statement
With approximate word count against the limit.
## Evidence register
A table: Evidence | Figure | Year | Geography | Source | Rating.
## Weak points
## Gaps
</output_format>
