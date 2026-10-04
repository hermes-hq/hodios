---
schema: 1
id: write-fact-check-article
kind: prompt
title: Write a fact-check article
description: Writes a fact-check article from the reporter's own research on a claim, with the claim in context, a verdict on a stated rating scale, the evidence trail, the claimant's response and sources.
category: fact-checking
version: 1.0.0
status: incubating
stage: [build]
role: [writer, editor]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [journalism, verdict-scale, truth-sandwich, news-writing]
pairs_with:
  prompts: [fact-check-claims, verify-quotes-against-source, evaluate-source-credibility]
  personas: [fact-checker]
args:
  - name: claim
    description: The claim being checked, as worded by the claimant, with who said it, where and when if known.
    type: string
    required: true
  - name: research_notes
    description: Your research - sources consulted with links or references, data, expert comments, what the claimant said when contacted, and your own assessment so far.
    type: text
    required: true
  - name: rating_scale
    description: The verdict scale your outlet uses, as a list of labels in order, with definitions if you have them.
    type: string
    default: true-mostly-true-misleading-false
output_contract:
  format: markdown
  sections: [Headline, Verdict, The claim, What we found, What the claimant says, Why we rated it this way, Sources, Editor notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A fact-check article has to be more careful than the claim it checks: every statement sourced, the verdict justified on the outlet's own scale, the claimant treated fairly, and the false claim not amplified by repetition in the headline. The reporter has done the research; you turn it into a publishable piece without adding a single fact, source or quote they did not supply.

Claim: {{claim}}
<research_notes>
{{research_notes}}
</research_notes>
Rating scale: {{rating_scale}}
</context>

<task>
1. Read the notes and list, for yourself, every fact, source and quote they contain. This list is the only material you may use.
2. Fix the scale: if {{rating_scale}} has no definitions, write a one-line working definition for each label from common fact-checking usage and put it in the editor notes for confirmation.
3. Decide the verdict the evidence supports on that scale. If the notes cannot support any rating (key evidence missing, sources conflicting with no resolution), say "Not enough evidence to rate yet", explain what is missing, and still draft the article with a placeholder verdict.
4. Write the article:
   - **Headline:** lead with the accurate fact, not the false claim (for example "Crime fell last year, police data show" rather than "No, crime did not double").
   - **Verdict:** the rating label and a one-sentence reason.
   - **The claim:** who said it, where, when, and the exact words; then why it matters (reach, decision at stake), from the notes.
   - **What we found:** the evidence trail in a logical order, each point attributed to its source, with numbers exactly as the notes give them.
   - **What the claimant says:** their response or evidence, fairly represented. If the notes say they did not respond, write that; if the notes do not say, mark [NEEDS: claimant contact].
   - **Why we rated it this way:** how the evidence maps to the scale definition, including what is accurate in the claim.
   - **Sources:** every source used, as given in the notes.
5. Mark every gap with [NEEDS: ...] in the text.
6. Before answering, check that each sentence traces to the notes, every number matches, and the false claim appears only where it is quoted and attributed, never as a standalone statement.
</task>

<constraints>
- Use only the supplied research. No outside facts, statistics, quotes or sources. If general background would help, ask for it in the editor notes.
- Do not inflate or soften the verdict beyond what the evidence supports. Credit the true parts of a partly true claim.
- Neutral, plain tone. No sarcasm or mockery of the claimant.
- Attribute precisely: "according to the national statistics office's 2025 crime survey", not "data show", when the notes give the source.
- Do not invent links. Copy references exactly.
</constraints>

<output_format>
## Headline
## Verdict
**Label:** one-sentence reason.
## The claim
## What we found
## What the claimant says
## Why we rated it this way
## Sources
Bullets as given in the notes.
## Editor notes
Bullets: scale definitions used, every [NEEDS: ...] item, and anything to verify before publishing. Not for publication.
</output_format>
