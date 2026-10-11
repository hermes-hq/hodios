---
schema: 1
id: reformat-manuscript-for-new-journal
kind: prompt
title: Reformat a rejected manuscript for a new journal
description: Plans and makes the changes to resubmit a rejected manuscript elsewhere, covering structure, length, reference style, abstract format, reviewer feedback worth acting on and a new cover letter.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [plan, checklist, rewrite]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [journal-submission, manuscript-rejection, resubmission, author-guidelines, manuscript]
pairs_with:
  prompts: [choose-target-journal, cut-manuscript-to-word-limit, format-citations, write-journal-cover-letter, appeal-journal-rejection]
args:
  - name: manuscript
    description: The rejected manuscript, or its structure, word counts, abstract, reference style and statements.
    type: text
    required: true
  - name: new_guidelines
    description: The new journal's author guidelines for the article type, pasted from its site.
    type: text
    required: true
  - name: previous_reviews
    description: Optional. The decision letter and reviewer comments from the rejecting journal.
    type: text
output_contract:
  format: markdown
  sections: [Differences between journals, Reviewer comments to act on, Change plan, Rewritten parts, Resubmission checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a rejection, the fastest route to publication is usually a careful retarget, not a rewrite. Three things matter. First, the mechanical differences between journals: article type, word and display limits, abstract structure, section order, reference style, required statements, and whether the review is blinded. Second, the reviews: even after a rejection, fixing the substantive points (unclear methods, a missing analysis, an overclaim) avoids hearing the same objections again, since reviewers are often drawn from the same pool. Third, the framing: the introduction and cover letter must speak to the new journal's readership, not the old one. Common mistakes: leaving the old journal's name or formatting in the text, sending a cover letter addressed to the wrong editor, and ignoring fair criticism.
</context>

<task>
Plan and make the changes to resubmit this manuscript.
<manuscript>
{{manuscript}}
</manuscript>
<new_guidelines>
{{new_guidelines}}
</new_guidelines>
{{#previous_reviews}}
<previous_reviews>
{{previous_reviews}}
</previous_reviews>
{{/previous_reviews}}

1. Tabulate the differences between the manuscript as it stands and the new journal's requirements: article type, length, abstract, sections, display items, references, statements, blinding, file requirements.
2. If reviews were given, sort each comment into: fix before resubmitting, consider, or specific to the old journal. Say why for each.
3. Write a change plan in order: substantive fixes first, then reframing for the new readership (introduction opening and final paragraph, discussion implications), then mechanical changes.
4. Rewrite the parts that must change in wording: the abstract in the new format, the introduction's first and last paragraphs if the audience differs, and a cover letter outline for the new journal.
5. Give a resubmission checklist that includes removing traces of the previous journal (name, line numbers style, template, prior reviewer-response text).
</task>

<constraints>
- Take journal requirements only from the pasted guidelines; mark anything not stated as to confirm.
- Do not change results or numbers; abstract rewrites must keep every number as in the manuscript.
- Do not invent new analyses as done; describe them as tasks for the author.
- Do not advise hiding a previous rejection if the new journal asks about it or if the work was transferred; be honest about transfer options when the guidelines mention them.
</constraints>

<output_format>
## Differences between journals
Table: item, current, required, change needed.
## Reviewer comments to act on
Table: comment summary, category, reason. Or "No reviews supplied."
## Change plan
Numbered steps in order.
## Rewritten parts
New abstract, revised introduction paragraphs if needed, cover letter outline.
## Resubmission checklist
Checklist.
</output_format>
