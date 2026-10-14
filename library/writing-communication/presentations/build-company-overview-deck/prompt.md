---
schema: 1
id: build-company-overview-deck
kind: prompt
title: Build a company overview deck
description: Builds a reusable company or team overview deck for prospects, partners or new hires, with what you do, for whom, proof points and modular sections that can be swapped per audience.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, sales-rep, manager]
requires: [none]
inputs: [document, notes, url]
output: [outline, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [credentials-deck, proof-points, deck-reuse, value-proposition, modular-content]
pairs_with:
  prompts: [build-sales-presentation-deck, adapt-deck-for-new-audience, add-sources-to-slides, migrate-deck-to-new-template]
  personas: [presentation-designer]
args:
  - name: company_info
    description: What the company or team does, who it serves, history, size, clients or users, results, awards and anything else you want to show. Paste website copy, an old deck or notes.
    type: text
    required: true
  - name: audiences
    description: Who the deck will be shown to, for example "prospects in retail, potential partners, new hires".
    type: text
    required: true
  - name: length
    description: Target size of the core deck, for example "8 slides" or "10 minutes".
    type: string
    default: 8 to 10 core slides
output_contract:
  format: markdown
  sections: [One-line positioning, Core deck, Optional modules by audience, Proof points to verify, What is missing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisations build the "who we are" deck that gets reused for months: in first meetings, partner calls, conference booths and onboarding. These decks go wrong in the same ways: they open with founding history and an org chart nobody asked for; claims like "industry-leading" and "trusted by many" carry no proof; client logos appear without permission; numbers go stale because nobody owns them; and one version tries to serve every audience, so it serves none. A strong overview deck answers, in order, what you do and for whom in one line, the problem you solve, how you do it differently, proof (named results, numbers with dates, quotes with permission), and how to work with you. It has a short core plus modules that are swapped in for a given audience, and it is easy to keep current.

<company_info>
{{company_info}}
</company_info>

Audiences: {{audiences}}
Target length: {{length}}
</context>

<task>
1. Write a one-line positioning statement: what you do, for whom, and the result. If the information does not say who the customers are or what result they get, ask rather than guess, and give a placeholder version.
2. Build the core deck within {{length}}: title with the one-liner, the problem or need you address, what you offer, how you are different (only differences supported by the information), proof, how working together looks, and a closing slide with the next step and contact placeholder. Push history and team structure to optional modules unless they are themselves proof.
3. For each core slide give an assertion title, the content, the visual (product shot, diagram, client logo row, map) and a speaker line.
4. Design optional modules for each audience in {{audiences}}, such as case studies by industry for prospects, partnership model for partners, culture and ways of working for new hires, and say which core slides to drop or reorder for each.
5. List every proof point used (numbers, client names, logos, quotes, awards) with what must be checked: source, date "as of", and permission to name the client.
6. List what is missing that would make the deck stronger, such as a measurable customer result or a short case study.
</task>

<constraints>
- Use only facts in the information given. Do not invent clients, numbers, awards, certifications, quotes or market sizes. Put [number needed] or [case study needed] where proof is missing.
- Replace vague superlatives ("leading", "world-class", "best-in-class") with a specific supported claim or cut them.
- Every number on a slide carries an "as of" date in the notes so it can be kept current.
- Mark every client name and logo "check permission" unless the user says permission exists.
- Core slides hold one idea each and few words; detail goes into notes or appendix.
</constraints>

<output_format>
## One-line positioning
The line, plus a note on any assumption.

## Core deck
Table: # | Slide title (assertion) | Content | Visual | Speaker line.

## Optional modules by audience
For each audience: modules to add, slides to drop or reorder.

## Proof points to verify
Table: Claim | Where it appears | Check needed (source, date, permission).

## What is missing
Bullets, most valuable first.
</output_format>
