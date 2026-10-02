---
schema: 1
id: name-brand
kind: prompt
title: Generate brand and product name candidates
description: Generates brand or product name candidates across naming territories with rationale and risk flags, and lists the trademark, domain and language checks still to do. Use when naming a product.
category: branding
version: 1.0.0
status: incubating
stage: [discover, design]
role: [founder, marketer, product-manager, designer]
requires: [none]
inputs: [text, preferences]
output: [ideas, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [brand-naming, product-naming, trademark-screening, name-ideas]
pairs_with:
  prompts: [write-brand-voice-guide, write-design-brief]
args:
  - name: description
    description: What is being named, what it does, for whom, the markets and languages it will operate in, and competitors' names.
    type: text
    required: true
  - name: personality
    description: How the name should feel, and anything to avoid (sounds, words, styles, names already rejected). Optional.
    type: text
  - name: count
    description: How many candidates to generate, between 10 and 40.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Naming brief, Candidates, Shortlist, Checks still to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Name generators produce long lists of mashed-up words with no reasoning, cluster around the same obvious roots as every competitor, and imply that a name is available because it sounds new. A useful naming round starts from a brief, explores distinct territories, explains what each name does, flags obvious problems early, and is honest that availability and trademark clearance can only be established by searches and, for anything important, a trademark professional.
</context>

<task>
Generate {{count}} name candidates.

<description>
{{description}}
</description>
{{#personality}}
<personality>
{{personality}}
</personality>
{{/personality}}

1. **Naming brief:** in 4 to 6 bullets, the positioning the name must support, the feeling, the markets and languages, what competitors' names have in common (so you can avoid sounding like them), and practical criteria (length, spelling from hearing, pronounceable in the target languages).
2. Generate the candidates across at least four territories, and label each:
   - **descriptive** (says what it does; clear but hard to protect),
   - **suggestive** (hints at a benefit; often the best balance),
   - **evocative or metaphor** (borrows an image or story),
   - **invented or coined** (new word; most protectable, needs the most marketing),
   - **compound or blend** (two roots combined).
3. For each candidate give: the name, territory, the idea behind it in one line, how it is pronounced if not obvious, and risk flags you can see: hard to spell from hearing, close to a well-known brand in the same field, a generic word that is weak as a trademark, or a possible unwanted meaning or sound in a target language (say "check" rather than asserting a meaning you are not sure of).
4. Shortlist the 5 strongest against the brief, with the reason and the main risk for each.
5. List the checks still to do for the shortlist, as a checklist: trademark searches in each target market and in the relevant Nice classes (for example the USPTO, EUIPO and WIPO Global Brand Database), domain availability and acceptable alternatives, social handles and app store names, a linguistic check with native speakers in each market, and a say-it-and-spell-it test with real people.
</task>

<constraints>
- Never state or imply that a name is available, unregistered, or that a domain is free. You cannot check. Say that these must be verified.
- This is a creative exercise, not legal clearance. Say once that a trademark attorney or agent should run a clearance search before the company invests in a name.
- Do not reuse or lightly alter famous brand names, and do not produce names that mock a group, language or culture.
- If {{count}} is outside 10 to 40, use the nearest bound and say so. If the description is too thin to know what the product does, ask up to three questions and stop.
</constraints>

<output_format>
## Naming brief
## Candidates
| # | Name | Territory | Idea | Pronunciation | Risk flags |
## Shortlist
Numbered, 5 names, each with the reason and the main risk.
## Checks still to do
A checklist, then the one-line note about professional trademark clearance.
</output_format>
