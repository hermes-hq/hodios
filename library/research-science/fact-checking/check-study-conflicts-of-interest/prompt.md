---
schema: 1
id: check-study-conflicts-of-interest
kind: prompt
title: Check a study's funding and conflicts of interest
description: Checks who funded a study and what ties its authors have, then explains how those interests could bear on the design, analysis and framing, without dismissing the study on funding alone.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, researcher, individual]
requires: [web]
inputs: [document, url, text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [conflict-of-interest, research-funding, industry-funding, disclosures, study-appraisal]
pairs_with:
  prompts: [check-press-release-claims, verify-expert-credentials, analyze-spin-in-article]
  personas: [fact-checker]
args:
  - name: study
    description: The study's title, link or DOI, or the pasted paper including its funding and competing-interests statements.
    type: text
    required: true
  - name: claim
    description: Optional. The claim being made from the study, for example in an advert, article or post.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Funding, Author ties, Where interests could matter, How to report it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Industry funding is associated with results favourable to the sponsor, but the mechanism is rarely faked data. It works through choices: the comparator (a competitor at a low dose, or placebo when a good treatment exists), the outcome (a surrogate marker rather than a health outcome), the population, the duration, which results get published, and how they are framed. Conflicts also come from advocacy groups, authors' patents, consulting fees, speaker bureaus and their own past positions, and from non-financial interests. Disclosures in the paper are often incomplete, so experienced checkers cross-check with public payment databases where they exist (such as Open Payments in the United States), trial registries, other papers by the same authors and the funder's own publicity. A conflict is a reason to look harder at the design, not proof that the result is wrong; independent studies reaching the same answer are the best test.
</context>

<task>
Check funding and conflicts for this study.
<study>
{{study}}
</study>
{{#claim}}
<claim>
{{claim}}
</claim>
{{/claim}}

1. Identify the study and read its funding statement, competing-interests statement, acknowledgements and author affiliations.
2. Name the funders and their interest in the result. Look behind generic names: an "institute" or "foundation" may be industry-funded.
3. Check each lead and senior author for declared and undeclared ties: other disclosures in their recent papers, public payment registries where the country has one, patents, company roles and advocacy roles. Note any mismatch with the paper's own declaration.
4. Look at the choices a sponsor could influence: comparator, outcomes, population, duration, trial registration versus the reported outcomes, whether the sponsor controlled data or publication, and whether the conclusions go beyond the results.
5. Compare with independent research on the same question where you can find it.
6. Say how the conflicts should be reported alongside the claim.
</task>

<constraints>
- Report ties only from documents you opened in this session, with links. Never infer a tie from a surname, an employer's reputation or memory.
- Distinguish declared, found-but-undeclared, and not found. "Not found" is not "none".
- Do not call the study wrong, biased or fraudulent because of who paid for it. Point to the specific design choices that warrant caution.
- If you have no web access, say so, work only from the supplied statements, and list the checks to run.
- Write about named researchers fairly: describe documented facts, not motives.
</constraints>

<output_format>
## Summary
Two or three sentences: the main interests, whether they were disclosed, and how much they should affect trust in the claim.
## Funding
Table: funder | role (grant, product, data, writing support) | interest in the result | source.
## Author ties
Table: author | tie | declared in paper (yes, no) | source.
## Where interests could matter
Bullets on specific design and framing choices, and what independent evidence shows.
## How to report it
A sentence or two a writer could use.
</output_format>
