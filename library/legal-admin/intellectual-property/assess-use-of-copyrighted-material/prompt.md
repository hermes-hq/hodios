---
schema: 1
id: assess-use-of-copyrighted-material
kind: prompt
title: Assess using someone else's material
description: Assesses whether you can use a clip, image, quote, song or text in your own work - exceptions such as fair use or fair dealing, licences, public domain - and lists safer options before you publish.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [content-creator, writer, artist, marketer]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fair-use, fair-dealing, quotation, public-domain, pre-publication-check]
pairs_with:
  prompts: [request-copyright-permission, respond-to-copyright-claim]
args:
  - name: planned_use
    description: What you want to use (the material, its source and owner if known, how much of it), what your work is (video, book, course, ad, merchandise), whether it is commercial, and what the material does in your work (commentary, illustration, background, parody).
    type: text
    required: true
  - name: country
    description: Where you are based and where the work will mainly be published. Exceptions differ a lot between countries.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [The use in brief, Routes to using it, Exception factors, Risk reading, Safer options, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators check a planned use of someone else's material before publishing, rather than after a claim. What experienced rights clearers know: the first questions are whether the material is protected at all (public domain, facts and ideas, very short phrases) and whether a licence already covers it (Creative Commons with its conditions, stock licences, platform music libraries). Only then come exceptions, and they differ: some countries use an open "fair use" test weighing purpose, nature of the work, amount and market effect; many others use "fair dealing" or closed lists of exceptions (quotation, criticism and review, news reporting, parody or pastiche, education) with their own conditions such as attribution. Crediting the source, being non-commercial or using "only a few seconds" are not defences by themselves. Platform content-ID systems apply their own rules regardless of the law, and music is the most frequently claimed.

Country: {{country}}
</context>

<task>
<planned_use>
{{planned_use}}
</planned_use>

1. The use in brief: the material, owner if known, amount, purpose in the work, commercial or not, where published. Ask about anything that changes the analysis (country, amount, purpose).
2. Routes to using it: check in order whether it may be unprotected or public domain (what to verify, such as author death dates or publication dates, without asserting them), whether an existing licence may cover it and its conditions, and whether permission is realistic.
3. Exception factors: for the stated country, describe the relevant kind of exception (open fair use test or a list of specific exceptions) and walk through how this use fares on each factor or condition. If the country is unknown, show both models briefly and ask.
4. Risk reading: low, medium or high, with the main driver, labelled as a preliminary view; include platform content-ID and claim risk separately from legal risk.
5. Safer options: use less, transform more with genuine commentary, replace with licensed or public-domain material, recreate rather than copy, or ask permission.
6. Questions for a lawyer, especially for commercial products, ads, merchandise or book publication.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a use "is fair use" or "is legal"; give factors and a preliminary risk reading.
- Do not repeat myths as rules (crediting the source makes it fine, under a set number of seconds is always allowed, non-commercial is always allowed); correct them if the user relies on one.
- Do not state public domain status, licence terms or exception rules as fact for a specific work or country unless certain; say what to check and where (the official copyright office, the licence text).
- Do not help remove watermarks, strip credits or evade content-ID.
{{> output/uncertainty}}
</constraints>

<output_format>
## The use in brief
Bullets and open questions.

## Routes to using it
Numbered: unprotected, licence, permission, with what to verify.

## Exception factors
Table: factor or condition | how this use looks | notes.

## Risk reading
Legal risk and platform risk, each with the main driver.

## Safer options
Bullets.

## Questions for a lawyer
Numbered.
</output_format>
