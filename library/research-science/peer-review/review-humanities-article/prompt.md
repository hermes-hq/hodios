---
schema: 1
id: review-humanities-article
kind: prompt
title: Review a humanities journal article
description: Reviews a humanities article (history, literature, philosophy, religion, art history) on its argument, use of sources, engagement with scholarship, interpretation and writing, rather than IMRaD norms.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [humanities, historiography, close-reading, argument, manuscript]
pairs_with:
  prompts: [write-peer-review, review-conceptual-paper]
  personas: [peer-reviewer]
args:
  - name: article
    description: The article text with notes and bibliography.
    type: text
    required: true
  - name: discipline_and_journal
    description: The discipline and the journal's readership, for example "early modern history, a generalist history journal".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary of the argument, Contribution, Sources and evidence, Engagement with scholarship, Structure and prose, Recommendation, Specific suggestions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Humanities reviewing asks different questions from scientific refereeing. There is no methods section to check; the method is the argument and the handling of sources. Reviewers ask whether there is a clear thesis that someone could disagree with, whether it is new or merely a new case of a known claim, whether the primary sources are read closely and in context (language, genre, date, provenance, translation), whether counter-evidence is addressed, whether the article is in conversation with the right scholarship rather than a list of names, and whether the prose serves the argument. Common weaknesses are a descriptive article without an argument, a theoretical frame applied to rather than tested by the material, over-reliance on translations or secondary quotations of primary sources, and a "so what" that arrives only in the last paragraph. A good report also judges fit for the journal's readership.
</context>

<task>
Review this article in {{discipline_and_journal}}.
<article>
{{article}}
</article>

1. State the article's thesis in one or two sentences and say whether the article itself states it clearly and early.
2. Judge the contribution: what it changes in the field's understanding, and whether the claim is new or an application of an established one.
3. Judge the use of sources: selection, close reading, context, provenance, language and translation, and whether the evidence supports each step of the argument. Note counter-evidence or alternative readings that are not addressed.
4. Judge engagement with scholarship: whether the article positions itself in the relevant debates, from the notes and bibliography provided, and whether key debates appear to be missing (describe them rather than inventing citations).
5. Judge structure and prose: whether sections advance the argument, and whether the writing is clear for the journal's readers.
6. Recommend accept, minor revisions, major revisions, revise and resubmit, or reject.
7. Give specific suggestions keyed to pages, sections or notes.
</task>

<constraints>
- Do not apply scientific criteria (sample size, replicability, hypotheses) unless the article itself uses quantitative methods.
- Do not invent sources, archives, scholars or works the author should cite; describe the debate or type of source instead.
- Distinguish disagreement with the interpretation from a flaw in the argument; a reviewer may disagree and still recommend publication.
- Critique the work, not the author; acknowledge real strengths.
- Remind the reviewer that the article is confidential and to check the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary of the argument
## Contribution
## Sources and evidence
## Engagement with scholarship
## Structure and prose
## Recommendation
One line, then the deciding reasons.
## Specific suggestions
Numbered, with locations.
</output_format>
