---
schema: 1
id: fact-check-claims
kind: prompt
title: Fact-check claims in a text
description: Checks each factual claim in a text against sources it actually retrieves, rates it with evidence and links, and says plainly when a claim cannot be verified. Use before publishing or sharing.
category: fact-checking
version: 1.0.0
status: experimental
stage: [verify]
role: [writer, editor, researcher, content-creator]
requires: [web]
inputs: [text, document, url]
output: [report, table]
risk: network
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [misinformation, primary-sources, claim-ratings]
pairs_with:
  prompts: [evaluate-source-credibility, check-statistics-in-article]
  rules: [source-citation-rules]
args:
  - name: text
    description: "The text to check: an article, script, post or report."
    type: text
    required: true
  - name: strictness
    description: quick checks the five most consequential claims with one good source each; thorough checks every checkable claim and seeks two independent sources, one of them primary.
    type: enum
    enum: [quick, thorough]
    default: thorough
output_contract:
  format: markdown
  sections: [Verdict, Claims, Details, Suggested corrections]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Professional fact-checkers check claims, not opinions, and they trace each claim to the most authoritative source available: the original dataset, study, document, statement or record, rather than another article repeating it. They rate a claim on what it says in context, so a correct number used to imply something false is "misleading", not "accurate". An AI fact-check is only worth something if every source was actually retrieved and read in this session; a citation from memory is a new unverified claim.
</context>

<task>
Fact-check this text ({{strictness}} mode):
<text>
{{text}}
</text>

1. Extract the check-worthy claims: statements of fact that can be shown true or false (numbers, dates, quotes, attributions, events, scientific and legal claims). Skip opinions, predictions and value judgements, but note any that are presented as fact.
2. Prioritise by consequence: claims that are central to the text's argument, that could cause harm if wrong, or that are surprising.
3. For each claim you check, search for the primary source first (official statistics, the original study, court records, the full transcript), then for independent corroboration. Note the date of each source, because many claims are true only for a period.
4. Rate each claim: Accurate, Mostly accurate (minor imprecision that does not change the meaning), Misleading (technically true but creates a false impression, or missing key context), Inaccurate, or Unverifiable (no reliable source found either way).
5. For anything not rated Accurate, write the corrected or qualified version of the sentence.
</task>

<constraints>
- Cite only pages you opened in this session, with their URL and publication date. Never cite from memory, and never construct a URL.
- If you have no web access, say so at the top, do not rate any claim, and instead list the claims with the source you would check for each.
- Treat "Unverifiable" as an honest result. Do not upgrade a claim to Accurate because it sounds plausible, and do not rate it Inaccurate only because you could not find it.
- Several articles repeating the same original source count as one source.
- Check quotes against the full original, and say if the context changes the meaning.
- Stay neutral: rate the claim, not the author or their politics.
</constraints>

<output_format>
## Verdict
Two or three sentences: how reliable the text is overall and the most important problem.
## Claims
A table: # | claim (quoted or tightly paraphrased) | rating | key source (linked).
## Details
For each claim not rated Accurate: what the evidence shows, the sources with dates, and the reasoning.
## Suggested corrections
The original sentence and the corrected version, for each claim that needs one.
</output_format>
