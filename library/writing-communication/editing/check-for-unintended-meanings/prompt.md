---
schema: 1
id: check-for-unintended-meanings
kind: prompt
title: Check for unintended meanings
description: Checks headlines, names, signs, slogans, hashtags and acronyms for unfortunate double meanings, awkward initials, bad word breaks and possible readings in other languages before publishing.
category: editing
version: 1.0.0
status: incubating
stage: [verify]
role: [marketer, founder, writer, individual]
requires: [none]
inputs: [text]
output: [table, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [double-meanings, product-names, headlines, hashtags, acronyms]
pairs_with:
  prompts: [proofread-print-piece-before-ordering, review-document-for-ambiguity]
args:
  - name: text
    description: The words to check, one per line, exactly as they will appear (headline, product or event name, slogan, sign, hashtag, domain, file or email address).
    type: text
    required: true
  - name: context
    description: Where and how it will appear (all caps on a sign, a hashtag, a web address, initials on merchandise), the audience and the countries or languages it will reach.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Risks found, Safer alternatives, Native-speaker checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Proofreading catches errors; it does not catch correct text that reads badly. The classic failures: headlines with two parses ("Squad helps dog bite victim"); names whose initials or acronym spell a word; words run together in a web address or hashtag that split into something else (the well-known "Experts Exchange" domain read as "expert sex change"); line breaks on a sign or badge that separate a word into an unfortunate fragment; innuendo that the writer is too close to see; homophones when read aloud; and brand names that mean something in another language. Native readers of the other language are the only reliable check for the last group, so a responsible review states its confidence instead of inventing foreign meanings.

Context: {{context}}
<text>
{{text}}
</text>
</context>

<task>
1. If the text is missing, ask for it and stop.
2. For each item, check: alternative parses and ambiguous attachment; slang, innuendo and taboo readings in the target audience's variety of the language; the initials and acronym, including with articles and common suffixes; how it reads with spaces removed (hashtag, domain, handle) and in all capitals; where likely line breaks would split it on the stated format; how it sounds aloud and what it rhymes with; unfortunate associations with well-known events, groups or people that are widely known.
3. For each language or country in the context, say whether you know of a problematic meaning, and how confident you are. Never invent a meaning; when unsure, add it to native-speaker checks.
4. Rate each risk: high (likely to be noticed and mocked or to offend), medium (some readers will notice), low (only if someone goes looking).
5. Suggest a fix for each high and medium risk: a small change (capitalisation in a hashtag, a hyphen in a domain, a different line break, word order) before a new name.
6. Give an overall verdict per item: use as is, use with the fix, or reconsider.
</task>

<constraints>
- Do not claim a word means something in a language unless you are confident; state the confidence level.
- Do not check trademark availability or legal clearance; say this is a separate check.
- Explain risky readings plainly but without needless crudeness.
- Do not flag far-fetched readings as high risk; the useful list is short.
</constraints>

<output_format>
## Verdict
One line per item: use as is, use with fix, or reconsider.
## Risks found
Table: Item | Reading | How it arises (parse, initials, run-together, line break, sound, other language) | Risk | Confidence.
## Safer alternatives
Bullets per item with risks.
## Native-speaker checks
Bullets: language or region and what to ask. "None needed" if none.
</output_format>
