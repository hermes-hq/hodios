---
schema: 1
id: check-paraphrase-faithfulness
kind: prompt
title: Check a paraphrase is faithful to its source
description: Checks whether a summary or paraphrase faithfully represents its source, sentence by sentence, flagging distortions, overstatements, dropped hedges, omissions and claims the source never made.
category: fact-checking
version: 1.0.0
status: incubating
stage: [review, verify]
role: [student, editor, researcher]
requires: [none]
inputs: [text, document]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [paraphrase, summary-accuracy, overclaiming, academic-integrity]
pairs_with:
  prompts: [verify-quotes-against-source, paraphrase-with-attribution, check-science-news-against-paper]
args:
  - name: paraphrase
    description: The summary, paraphrase, abstract, literature-review paragraph or AI-written summary to check.
    type: text
    required: true
  - name: source
    description: The original text it claims to represent. Paste the relevant part in full.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Sentence by sentence, Important omissions, Too-close wording, Corrected paraphrase]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Summaries drift from their sources in predictable ways: "may reduce" becomes "reduces", "in older adults" disappears, a limitation the authors stressed is left out, or the source's report of someone else's view becomes the source's own claim. Students, editors and researchers need to know, before they rely on or submit a paraphrase, whether it says what the source says, at the same strength and scope.

<paraphrase>
{{paraphrase}}
</paraphrase>
<source>
{{source}}
</source>
</context>

<task>
1. Split the paraphrase into its sentences or claims and number them.
2. For each, find the source passage it represents and classify:
   - **Faithful:** same meaning, strength and scope.
   - **Overstated:** stronger certainty ("may" to "does"), wider scope ("some" to "most", one group to everyone), or a correlation turned into a cause.
   - **Understated:** weaker than the source.
   - **Dropped condition:** a hedge, condition, population or time frame from the source is missing.
   - **Distorted:** the meaning has changed.
   - **Misattributed:** a view the source reports or rejects is presented as the source's own position.
   - **Not in source:** the source does not say it.
3. List important omissions: points in the source that would change a reader's understanding if left out, such as limitations, contrary findings or the main conclusion itself.
4. Flag too-close wording: stretches that copy the source's phrasing nearly word for word without quotation marks, which risks plagiarism even when accurate.
5. Write a corrected paraphrase with the smallest edits that fix every problem, keeping the writer's structure and voice.
6. Give an overall verdict: Faithful, Mostly faithful (minor issues), or Misleading (at least one overstatement, distortion, misattribution or invented claim on a main point).
7. Before answering, recheck each non-faithful rating against the exact source wording.
</task>

<constraints>
- Judge only against the supplied source, not against what you know about the topic.
- Compression is not distortion. A shorter paraphrase that keeps meaning, strength and scope is faithful.
- Quote both the paraphrase and the source for every problem.
- If the source supplied is not the one the paraphrase describes (different topic or study), say so and stop.
</constraints>

<output_format>
## Verdict
**Faithful | Mostly faithful | Misleading**, then one or two sentences on the main issue.
## Sentence by sentence
Table: # | Paraphrase | Source passage | Classification | What changed.
## Important omissions
Bullets with the source passage. "None" if none.
## Too-close wording
Bullets: paraphrase phrase / source phrase. "None" if none.
## Corrected paraphrase
The full corrected text.
</output_format>
