---
schema: 1
id: review-preprint-publicly
kind: prompt
title: Write a public review of a preprint
description: Writes a public, signed or anonymous review of a preprint for a community review platform or comment thread, useful to authors and readers, careful about tone and unverified claims.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [preprint-review, open-science, public-review, community-review]
pairs_with:
  prompts: [write-peer-review, assess-reproducibility, check-science-news-against-paper]
  personas: [peer-reviewer]
args:
  - name: preprint
    description: The preprint text (it is already public), with its version number if known.
    type: text
    required: true
  - name: platform_and_identity
    description: Where the review will appear and whether you will sign it, for example "signed review on a community preprint review site" or "anonymous comment".
    type: string
    required: true
  - name: my_expertise
    description: Your field and which parts of the preprint you are qualified to judge, to state in a competing-interests and expertise line.
    type: string
output_contract:
  format: markdown
  sections: [Summary, What the preprint shows well, Main concerns, Smaller points, Notes for readers, Competing interests and expertise]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Public preprint review differs from confidential journal review in three ways. It has two audiences: the authors, who may revise, and readers, including journalists and clinicians, who may act on a finding before any journal has checked it. It is permanent and attached to the reviewer's name if signed, so tone and accuracy matter more, and a sharp phrase can damage an early-career author. And there is no editor to make a decision, so the review should not end with accept or reject but with what a reader can safely conclude. Good public reviews are specific, note the version reviewed, separate what the data show from what the authors claim, state the reviewer's expertise and competing interests, and avoid speculating about motives.
</context>

<task>
Write a public review of this preprint for: {{platform_and_identity}}.
<preprint>
{{preprint}}
</preprint>
{{#my_expertise}}
My expertise: {{my_expertise}}
{{/my_expertise}}

1. Summarise the question, design, data and main claims neutrally, and note the version reviewed.
2. Name what the preprint does well, concretely.
3. Identify the main concerns that affect whether the conclusions hold: design, analysis, missing information, alternative explanations, and data and code availability. For each, say what the authors could do.
4. List smaller points briefly.
5. Write a short "notes for readers" paragraph: what can and cannot be concluded now, in plain language a journalist could use without overstatement.
6. Write a competing-interests and expertise line, stating which parts the reviewer is and is not qualified to judge.
</task>

<constraints>
- Write for publication: no sarcasm, no comments on the authors' competence or motives, no speculation about misconduct. Integrity concerns go privately to the authors or the relevant journal, not in a public review.
- Do not issue an accept or reject verdict.
- Every concern names a location in the preprint and a possible remedy.
- Do not cite papers you cannot verify; describe the relevant evidence instead.
- If the preprint makes health or safety claims, make the "notes for readers" section explicit that it is not peer reviewed and should not guide individual decisions on its own.
- Remind the user to check the platform's policies on AI-assisted reviews and to read the final text as their own before posting.
</constraints>

<output_format>
One reminder line, then:
## Summary
One paragraph, with the version reviewed.
## What the preprint shows well
Bullets.
## Main concerns
Numbered: location, concern, suggested remedy.
## Smaller points
Numbered.
## Notes for readers
One short plain-language paragraph.
## Competing interests and expertise
One or two lines, with blanks for the user to complete.
</output_format>
