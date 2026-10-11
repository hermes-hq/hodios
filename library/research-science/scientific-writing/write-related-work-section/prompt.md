---
schema: 1
id: write-related-work-section
kind: prompt
title: Write a related work section for a computer science paper
description: Writes a computer science paper's related work section grouped by approach, stating precisely how the contribution differs from each line of prior work, using only supplied papers.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student, ml-engineer]
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
subject: [computer-science]
tags: [related-work, conference-paper, novelty, research-positioning, citations]
pairs_with:
  prompts: [write-introduction-section, write-literature-review-section, write-abstract]
args:
  - name: contribution
    description: What your paper contributes, in a few sentences, including the key technical idea and the setting.
    type: text
    required: true
  - name: prior_work
    description: The papers to discuss, each with its citation key or short reference and what it does, written from your own reading.
    type: text
    required: true
  - name: venue
    description: Optional. The venue and its space constraints, for example "NeurIPS, about half a page" or "IEEE journal, one page".
    type: string
output_contract:
  format: markdown
  sections: [Related work, Positioning table, Gaps and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In computer science papers, related work is a positioning argument, not a literature review. Reviewers read it to check novelty, and the most common reject reason in this section is "the authors miss or mischaracterise X". Strong sections group prior work by approach or problem formulation (not by paper), describe each group fairly in one or two sentences, and end each paragraph with the precise difference: different assumption, setting, guarantee, scale, or a weakness the new method fixes. Weak sections are citation lists ("A [1], B [2] and C [3] studied this"), dismiss strong baselines without saying why, or claim "no prior work has" when the authors only searched briefly. Concurrent work posted during review is usually acknowledged as concurrent rather than ignored.
</context>

<task>
Write the related work section.
<contribution>
{{contribution}}
</contribution>
<prior_work>
{{prior_work}}
</prior_work>
{{#venue}}
Venue: {{venue}}
{{/venue}}

1. Group the supplied papers into two to five lines of work by approach or problem setting, and name each group with a short paragraph heading.
2. For each group, summarise what the work does in neutral terms, cite with the keys given, and end with one sentence stating how this paper differs (setting, assumption, method, guarantee or empirical scope).
3. Place the closest work last or give it its own paragraph, with the most precise comparison, and say whether it is used as a baseline in the experiments.
4. Fit the length to the venue, cutting descriptive detail before differences.
5. Build a positioning table comparing the contribution with each group on the dimensions that matter.
6. List risks: places where the difference is thin, groups that may be missing, and any "first" claim that needs a broader search.
</task>

<constraints>
- Cite only the supplied papers with the keys given. Do not add papers from memory, invent results, or attribute claims a paper is not described as making; use [CITE: suggested topic] to show where a missing line of work may need citing.
- Describe prior work fairly; no "fails to", "naive" or "simply" unless the supplied notes justify a specific limitation.
- Avoid unqualified "first" or "no prior work" claims; phrase as "to our knowledge" and flag for checking.
- Use the field's usual citation form (numeric or author-year) consistent with the keys given.
</constraints>

<output_format>
## Related work
The section with paragraph headings, ready for the paper.
## Positioning table
Table: line of work, key papers, what it assumes or does, how this paper differs.
## Gaps and risks
Bullets.
</output_format>
