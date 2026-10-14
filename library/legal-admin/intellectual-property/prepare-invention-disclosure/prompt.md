---
schema: 1
id: prepare-invention-disclosure
kind: prompt
title: Prepare an invention disclosure
description: Turns an inventor's notes into a structured invention disclosure for a patent attorney meeting - problem, solution, variants, what is new, public disclosures so far and dates that matter.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, researcher, software-engineer, individual]
subject: [law, engineering]
requires: [none]
inputs: [notes, text, document]
output: [docs, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [invention-disclosure, patent-attorney-prep, novelty, public-disclosure, inventorship]
pairs_with:
  prompts: [plan-prior-art-search, choose-invention-protection-route]
args:
  - name: invention_notes
    description: What the invention is, the problem it solves, how it works (parts, steps, materials, algorithms), alternatives you tried, sketches described in words, who contributed, and how it differs from what exists.
    type: text
    required: true
  - name: disclosure_history
    description: Every time it was shown or described outside the team - talks, posters, papers, demos, crowdfunding, sales, pitch decks, code repositories - with dates and whether under an NDA. Say "none" if none.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Urgent timing flags, Invention disclosure, Gaps to fill, Questions for the patent attorney]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare inventors for a first meeting with a patent attorney or agent, the way a university technology-transfer office does. A good disclosure saves paid hours and protects rights. What experienced practitioners know: the attorney needs the technical problem, the solution in enough detail that a skilled person could make it, the variants and alternatives (claims are drafted wider than the one prototype), what is believed new compared with the closest known solutions, and every public disclosure with dates. Public disclosure before filing can destroy novelty in many countries; some countries give a limited grace period for the inventor's own disclosure, many do not, so the timeline is the first thing to flag. Inventorship (who contributed to the inventive idea) is a legal question distinct from authorship or ownership.
</context>

<task>
<invention_notes>
{{invention_notes}}
</invention_notes>

<disclosure_history>
{{disclosure_history}}
</disclosure_history>

1. Urgent timing flags: list any public disclosure, sale or offer for sale, and planned disclosure (talk, launch, paper) with dates. Say plainly that these may affect patentability depending on the country and that an attorney should be contacted before any further disclosure. Recommend not disclosing further until advised.
2. Write the disclosure: title; field; background and the problem with existing solutions; summary of the invention; detailed description (components or steps, how they interact, materials or parameters, a worked example); variants and alternatives; advantages with evidence (test results if given); the closest known solutions and how this differs; contributors and their contributions; dates (conception, first working version, disclosures).
3. Gaps to fill: missing technical detail, missing variants, unsupported advantage claims, unknown contributor roles, missing records (dated notebooks, commits, emails).
4. Questions for the patent attorney, specific to this invention, including ownership if made at work or with a university, and which countries matter commercially.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say the invention is patentable, novel or inventive; describe what the inventor believes is new, for the attorney to assess.
- Do not invent technical details, test results or prior art. Mark gaps as [X].
- Do not state grace-period rules for specific countries as fact; say they vary and must be checked urgently.
- Remind the user to share the disclosure only with their attorney or under confidentiality.
{{> output/uncertainty}}
</constraints>

<output_format>
## Urgent timing flags
Bullets with dates, or "none reported".

## Invention disclosure
The structured document with the headings in step 2.

## Gaps to fill
Checklist.

## Questions for the patent attorney
Numbered.
</output_format>
