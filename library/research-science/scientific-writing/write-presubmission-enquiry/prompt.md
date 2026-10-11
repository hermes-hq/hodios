---
schema: 1
id: write-presubmission-enquiry
kind: prompt
title: Write a presubmission enquiry to a journal editor
description: Writes a short presubmission enquiry asking a journal editor whether a paper fits, stating the main finding, why it matters to the journal's readers, novelty and the article type.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [presubmission-enquiry, journal-fit, editor-letter, desk-rejection, journal-submission]
pairs_with:
  prompts: [choose-target-journal, write-journal-cover-letter, write-abstract]
args:
  - name: paper
    description: The abstract or a summary of the main finding, what is new compared with prior work, the article type you have in mind, and the target journal.
    type: text
    required: true
  - name: journal_policy
    description: Optional. The journal's presubmission enquiry instructions (where to send, word limit, what to include), pasted from its site.
    type: text
output_contract:
  format: markdown
  sections: [Enquiry, Abstract to attach, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Selective journals, especially high-profile multidisciplinary and review-led journals, invite presubmission enquiries so authors can learn quickly whether an editor would consider a paper before formatting a full submission. Editors read many of them and decide in a minute or two. What works: a short message (often a few hundred words, with the abstract attached or pasted) that states the main finding in one plain sentence, why it matters beyond the immediate subfield, what is new compared with the closest published work, the evidence base in one line (design, scale), the proposed article type and length, and any timing issue (a competing preprint, a related conference). What fails: hype, a full cover letter for a manuscript the editor has not asked for, burying the finding, and asking the editor to judge quality rather than fit. Many journals have their own form or portal; their instructions override any template.
</context>

<task>
Write a presubmission enquiry for:
<paper>
{{paper}}
</paper>
{{#journal_policy}}
<journal_policy>
{{journal_policy}}
</journal_policy>
{{/journal_policy}}

1. Write a subject line with the proposed article type and a short title.
2. Open with one sentence asking whether the editor would consider the manuscript, naming the article type.
3. State the main finding in one plain sentence, then the evidence base in one sentence.
4. Explain why the finding matters to this journal's broad readership, and what is new compared with the closest work, as stated by the author.
5. Mention status (unpublished, not under consideration elsewhere, preprint if any) and any timing issue the author gave.
6. Close politely and briefly, with the corresponding author's details as placeholders.
7. Tighten the abstract to attach if it exceeds the journal's limit, keeping every number.
</task>

<constraints>
- Keep the enquiry under 300 words unless the journal policy says otherwise.
- No hype words ("groundbreaking", "paradigm-shifting"); let the finding carry the case.
- Do not invent novelty claims, prior work or numbers; use placeholders for anything missing.
- Do not imply the paper is not under consideration elsewhere unless the author confirmed it.
</constraints>

<output_format>
## Enquiry
Subject line and message.
## Abstract to attach
The abstract, unchanged or tightened, with the word count.
## Before sending
Checklist: journal accepts enquiries and the route, policy on preprints, author confirmations.
</output_format>
