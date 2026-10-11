---
schema: 1
id: write-fact-checking-methodology
kind: prompt
title: Write a public fact-checking methodology
description: Writes the public methodology page for a fact-checking team or creator, covering how claims are chosen, sourced and rated, how corrections work, and who funds the work.
category: fact-checking
version: 1.0.0
status: incubating
stage: [design]
role: [editor, content-creator, writer]
requires: [none]
inputs: [notes, text]
output: [docs, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [editorial-standards, rating-scale, corrections-policy, transparency]
pairs_with:
  prompts: [write-fact-check-article, prioritize-claims-to-check]
  personas: [fact-checker]
args:
  - name: team_notes
    description: "How you actually work today, in rough notes: who you are, what you check, how you pick claims, sources you prefer, how you rate, who reviews, how you handle errors, and how you are funded."
    type: text
    required: true
  - name: audience
    description: Who reads your checks and where, for example "a regional newsroom's website" or "a science video channel".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Methodology page, Gaps to decide, Consistency checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers trust fact-checks more when the method is public and applied the same way to everyone. Codes of practice for fact-checkers, such as the International Fact-Checking Network's code of principles, centre on the same commitments: nonpartisanship and fairness, transparency of sources, of funding and organisation, and of methodology, and an open, honest corrections policy. A good methodology page states how claims are selected and why some are not, what counts as evidence, how the claimant is given a chance to respond, what each rating means with its boundary cases, who reviews a check before publication, and how readers can ask for a correction. A page that promises more than the team does is worse than a short honest one.
</context>

<task>
Write a methodology page for {{audience}} from how this team actually works:
<team_notes>
{{team_notes}}
</team_notes>

1. Draft the page in plain language with these parts: who we are and our independence; how we choose claims (and what we do not check, such as opinions and predictions); how we research (primary sources first, how many sources, how we treat anonymous sources); contacting the claimant; our ratings, each with a definition and a short example of a boundary case; review before publication; corrections and updates, with how readers can request one and how changes are marked; funding and conflicts of interest.
2. Use only practices stated in the notes. Where the notes are silent or vague on a part, leave a marked placeholder instead of inventing a policy.
3. List the decisions the team still needs to make, with two or three common options for each and their trade-offs.
4. Check the draft for internal consistency: rating names and definitions used the same way everywhere, no promises the notes do not support, and selection criteria that would apply equally to all sides.
</task>

<constraints>
- Do not invent staff names, funders, partnerships, memberships or certifications. Do not claim the team is a signatory to any code unless the notes say so.
- Keep ratings mutually exclusive and define the boundary between neighbouring ratings.
- Use neutral language about political actors; the page describes method, not targets.
- Keep the page readable by a general audience: short sections, no jargon without a definition.
</constraints>

<output_format>
## Methodology page
The complete page, ready to publish, with [PLACEHOLDER: what to decide] where the notes were silent.
## Gaps to decide
Table: gap | options | trade-off.
## Consistency checks
Bullets: issues found and how the draft resolves them, or "none found".
</output_format>
