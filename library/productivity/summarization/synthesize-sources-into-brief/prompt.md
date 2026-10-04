---
schema: 1
id: synthesize-sources-into-brief
kind: prompt
title: Synthesise several sources into one brief
description: Synthesises several supplied documents into one brief answering a question, with where they agree and disagree, what each adds and what none covers, citing which source says what.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, researcher, manager]
requires: [none]
inputs: [document, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [synthesis, multi-source, briefing, cited-answers]
pairs_with:
  prompts: [build-news-digest, compare-documents, extract-open-questions]
args:
  - name: sources
    description: "Two or more documents, each with a title or label and separated clearly (for example with a line like --- Source A ---). Include dates and authors if you have them."
    type: text
    required: true
  - name: question
    description: The question the brief must answer, for example "Should we adopt usage-based pricing?" or "What causes the spring staff shortages?".
    type: string
    required: true
  - name: words
    description: Rough length of the brief in words, excluding the source list.
    type: number
    default: 600
output_contract:
  format: markdown
  sections: [Bottom line, Where the sources agree, Where they disagree, What each source adds, Gaps, Sources]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pile of summaries is not a synthesis. A synthesis answers one question across sources, shows where they converge and why they diverge, and keeps every claim traceable so the reader can check it. The reader will use the brief to decide or to brief someone else, so it must not smooth over real disagreement or present one source's view as the consensus.

<sources>
{{sources}}
</sources>
Question: {{question}}
Target length: about {{words}} words.
</context>

<task>
1. Label the sources S1, S2, ... in the order given, keeping their titles. If only one source is supplied, say a synthesis needs at least two and offer a summary instead. Stop there.
2. For each source, note what it says that bears on the question, its date, and what kind of evidence it rests on (data, study, case, expert view, opinion), as far as the text shows.
3. Build the comparison:
   - **Agreement:** claims two or more sources support. Note whether they rely on independent evidence or one cites the other.
   - **Disagreement:** where sources conflict on facts, figures, interpretation or recommendation. For each, give the likely reason visible in the texts: different dates, definitions, populations, methods or interests.
   - **Unique contributions:** what only one source offers that matters for the question.
   - **Gaps:** parts of the question no source addresses.
4. Write the bottom line first: the best-supported answer to the question, how confident the sources allow you to be, and the main condition or caveat.
5. Before answering, check that every factual sentence carries a citation like [S2], that no figure has been averaged or merged across sources, and that the length is near the target.
</task>

<constraints>
- Use only the supplied sources. No outside facts, studies or figures. If the question needs something no source covers, put it under Gaps.
- Cite at the sentence level: [S1], or [S1, S3] when both support it.
- Keep conflicting figures side by side with their sources. Never average or reconcile them yourself.
- Weigh sources only on what the text shows (method described, sample, date, stated interest). Do not rate a source by its reputation from your own knowledge.
- Keep each source's hedges. "Suggests" in a source is not "shows" in the brief.
- This is a synthesis across documents on one question, not a line-by-line comparison of two versions.
</constraints>

<output_format>
## Bottom line
Two to four sentences answering the question, with citations and a confidence word (strong, moderate, weak, conflicting).
## Where the sources agree
Bullets with citations; note shared evidence where one source relies on another.
## Where they disagree
Table: Point | Position A [S?] | Position B [S?] | Likely reason.
## What each source adds
One bullet per source with its unique contribution.
## Gaps
Bullets: what the question needs that no source covers.
## Sources
S1 = title, author, date (as given). One line each.
</output_format>
