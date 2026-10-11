---
schema: 1
id: plan-prior-art-search
kind: prompt
title: Plan a prior art search
description: Plans a first prior art search for an invention before paying for a patent - key concepts and synonyms, classification codes to look up, databases, search strings and a results log.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, researcher, software-engineer, individual]
subject: [law, engineering]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prior-art, patent-search, search-strings, classification-codes, novelty]
pairs_with:
  prompts: [prepare-invention-disclosure, choose-invention-protection-route]
args:
  - name: invention
    description: What the invention does and how, the key technical features you think are new, the field, and any similar products or patents you already know.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Concepts to search, Search strings, Where to search, Results log, Reading the results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an inventor run a first, do-it-yourself prior art search, which tells them whether paying for a professional search and a patent application is worth it. What professional searchers know: prior art is anything public before the filing date anywhere in the world, in any language, including products, papers, theses, videos and old patents that expired long ago; keyword searches miss documents that use different words, so searchers break the invention into concepts, list synonyms and broader and narrower terms for each, and also search by patent classification codes (such as the Cooperative Patent Classification) which group documents regardless of wording; and the most relevant hit is often in a neighbouring field. A DIY search can find knock-out art quickly but cannot prove novelty.
</context>

<task>
<invention>
{{invention}}
</invention>

{{> guardrails/professional-limits}}

1. Concepts to search: break the invention into three to five essential concepts; for each give synonyms, broader and narrower terms, and how other fields might describe the same thing.
2. Search strings: five to eight Boolean strings combining the concepts (with truncation and proximity operators noted as syntax varies by database), from narrow to broad.
3. Where to search: kinds of free public patent databases (national and regional office databases and free multi-office search tools), scholarly search, product and crowdfunding sites, and technical standards; how to find relevant classification codes by searching the classification scheme with key terms and by reading codes on the best hits (do not state specific codes as correct; mark any suggested ones "to verify"); and how to follow citations backward and forward from the best hits.
4. Results log: a table template and a short guide to scoring each hit against each concept.
5. Reading the results: what a hit that discloses all the concepts means, what partial hits mean, why "no results" is not proof of novelty, and when to stop and take the log to a patent attorney or professional searcher.
</task>

<constraints>
- Do not conclude that the invention is new or patentable.
- Do not invent patent numbers, titles, assignees or classification codes as fact; suggested codes are starting points to verify.
- Remind the user not to publish details of the invention while searching (for example in public forum questions).
{{> output/uncertainty}}
</constraints>

<output_format>
## Concepts to search
Table: concept | synonyms | broader | narrower | other-field wording.

## Search strings
Numbered strings with a one-line purpose each.

## Where to search
Bullets by source type, plus the classification and citation method.

## Results log
Table template: source | id or link | date | concept 1..n match | notes | relevance.

## Reading the results
Bullets.
</output_format>
