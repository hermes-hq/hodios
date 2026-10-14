---
schema: 1
id: integrate-new-papers-into-review
kind: prompt
title: Integrate new papers into an existing review draft
description: Integrates newly found papers into an existing literature review draft, deciding where each fits, what it changes and which claims and gap statements need revising.
category: literature-review
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [student, researcher]
requires: [none]
inputs: [document, notes]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [thesis, synthesis, review-update, new-evidence]
pairs_with:
  prompts: [audit-literature-review-draft, write-literature-review-section, set-up-literature-alerts]
  personas: [academic-writing-coach]
args:
  - name: draft
    description: The current review draft (or the relevant chapter) with its citations.
    type: text
    required: true
  - name: new_papers
    description: The new papers with author, year, and abstract or your notes on the key findings and methods.
    type: text
    required: true
  - name: question
    description: The research question the review leads to, so changes to the gap statement can be judged.
    type: text
output_contract:
  format: markdown
  sections: [New papers at a glance, Where each fits, Claims to revise, Proposed insertions, Gap statement check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Literature reviews go out of date while a thesis or paper is being written, and examiners and reviewers notice. The lazy fix is to bolt a sentence about each new paper onto the end of a paragraph. The real work is to decide what each new paper does to the existing argument: confirms a finding (add it as support and maybe strengthen the claim), extends it to a new population or setting, contradicts it (the paragraph now needs to present a disagreement), supersedes earlier work with a stronger design or a newer review, opens a theme the draft lacks, or quietly invalidates a claim such as "no study has examined…", which is often the gap the whole project rests on.
</context>

<task>
Integrate these new papers into the draft.
<draft>
{{draft}}
</draft>
<new_papers>
{{new_papers}}
</new_papers>
{{#question}}The review leads to this question: {{question}}{{/question}}

1. Number the draft's paragraphs. Give each new paper a short ID.
2. For each new paper, summarise its contribution in one line from the text given and classify its effect: confirms, extends, contradicts, supersedes, new theme, or not relevant.
3. Place each relevant paper: the paragraph(s) where it belongs and the move it makes there.
4. Find claims in the draft that the new papers weaken or make false, including "no studies", "little is known", "first to" statements, and claims resting on a study now superseded. Quote each and propose a revision.
5. Write the proposed insertions and revised sentences in the draft's style and citation format, showing the original and the revised text.
6. Check the gap statement and research question against the new papers: still valid, needs narrowing, or now partly answered. Say what to change.
7. List reference list additions in the draft's citation style using only the details given, marking missing details.
</task>

<constraints>
- Use only what the new papers' text says; do not add findings or details from memory.
- Integrate by argument, not by appending: no new paragraph that only summarises one new paper unless it opens a genuinely new theme.
- Keep the writer's voice, structure and citation style; change only what the new papers require.
- If a new paper contradicts the draft's central claim or gap, say so plainly at the top rather than smoothing it over.
- If the new papers are titles only, say placement is provisional and ask for abstracts.
</constraints>

<output_format>
## New papers at a glance
Table: ID | contribution | effect.
## Where each fits
Table: ID | paragraph | move.
## Claims to revise
Bullets: quoted claim, why it changes, revised wording.
## Proposed insertions
For each paragraph touched: original, then revised, with changes in bold.
## Gap statement check
Two to four sentences, then reference list additions.
</output_format>
