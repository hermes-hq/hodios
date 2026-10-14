---
schema: 1
id: trace-citizenship-by-descent
kind: prompt
title: Trace a citizenship by descent claim
description: Maps a family line back to an ancestor's citizenship, checks each link against the rules the user supplies on dates, gender and registration, and lists the documents needed to prove the chain.
category: immigration
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [citizenship-by-descent, ancestry-citizenship, jus-sanguinis, family-records, archive-research]
pairs_with:
  prompts: [check-dual-citizenship-impact, prepare-citizenship-application, resolve-name-mismatch-in-documents]
args:
  - name: country
    description: The country whose citizenship you may have through descent.
    type: string
    required: true
  - name: family_line
    description: Each generation from the ancestor to you, with birth, marriage, naturalisation and death dates and places as far as known, and which documents you already hold.
    type: text
    required: true
  - name: rules
    description: The official rules or guidance on descent you have found, pasted. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [The chain, Link by link, Documents to find, Possible breaks, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Citizenship by descent is a chain, and every link must hold. For each generation, the rules in force at that person's birth usually decide whether citizenship passed on: some countries passed it only through fathers before a certain date, or only to children born in wedlock, or required a birth registered at a consulate within a time limit, or limited transmission to one or two generations born abroad. The most common break is an ancestor who naturalised elsewhere before the next generation was born, which in some systems ended their citizenship before they could pass it on. Proving the claim means a complete set of civil records for each link, often apostilled and translated, with names and dates that match or are explained. Several countries have reformed these rules, sometimes with a deadline to register.

Country: {{country}}

<family_line>
{{family_line}}
</family_line>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}
</context>

<task>
1. The chain: list each generation from the ancestor to the user with the key dates.
2. Link by link: for each link, the question the rules ask (for example was the parent a citizen at the child's birth, did transmission run through the mother before a cutoff, was the birth registered in time, was there a naturalisation before the birth), applied to the facts using the rules supplied, and marked "looks to hold", "possible break" or "unknown".
3. Documents to find: for each person, the birth, marriage, naturalisation or non-naturalisation, and death records usually needed, and where such records are commonly held (civil registries, parishes, national archives, consulates), without naming specific websites.
4. Possible breaks: each link that may fail and what fact or document would settle it.
5. What to confirm: questions for the consulate or a nationality lawyer, including any reform or registration deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Apply only the rules supplied. Where none were supplied, describe the questions that usually matter and mark the position "unknown, confirm".
- Never say the person is a citizen; say how each link looks on the facts and rules given.
- Do not suggest altering records or omitting a naturalisation.
- Note name spelling differences between records as items to explain, not errors to fix by editing.
{{> output/uncertainty}}
</constraints>

<output_format>
## The chain
## Link by link
Table: Link | Question the rules ask | Facts | Status.
## Documents to find
Table: Person | Document | Usually held by | Have it?
## Possible breaks
## What to confirm
Numbered.
</output_format>
