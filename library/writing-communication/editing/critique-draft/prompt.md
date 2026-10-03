---
schema: 1
id: critique-draft
kind: prompt
title: Critique a draft
description: Gives honest, ranked feedback on any draft across purpose, structure, argument, clarity and voice without rewriting it, and ends with the three changes that would matter most.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student, individual, editor]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [writing-feedback, developmental-editing, beta-reading, draft-review]
pairs_with:
  prompts: [edit-for-structure, strengthen-argument-in-draft, tighten-prose, line-edit-prose]
  personas: [editor]
args:
  - name: draft
    description: The draft to critique, in full. Mark any parts you already know are placeholders.
    type: text
    required: true
  - name: purpose_and_reader
    description: "What the draft is for and who reads it, for example \"cover letter for a junior data analyst role, read by a recruiter in 30 seconds\" or \"blog post to get small-business owners to try our invoicing tool\"."
    type: text
    required: true
  - name: feedback_depth
    description: quick gives the top issues only; standard covers every major issue and the worst minor ones; deep adds paragraph-level notes and recurring sentence patterns.
    type: enum
    enum: [quick, standard, deep]
    default: standard
output_contract:
  format: markdown
  sections: [Verdict, What works, Issues, Three changes that matter most]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Useful critique is a diagnosis, not a rewrite. It judges the draft against what it is trying to do for a specific reader, ranks problems by how much they get in the way of that, points to exactly where they are, and explains the effect on the reader so the writer can fix it in their own voice. Unhelpful critique is the opposite: twenty equal-weight comments, line edits on paragraphs that should be cut, vague praise ("flows well"), or a polite verdict that hides the one structural problem that matters.
</context>

<task>
Critique this draft at {{feedback_depth}} depth.

<purpose_and_reader>
{{purpose_and_reader}}
</purpose_and_reader>
<draft>
{{draft}}
</draft>

1. If the draft is empty, ask for it and stop. If the purpose or reader is vague, state the reading you are assuming in one line under Verdict and continue.
2. Read it once as the target reader would, at their speed. Write down in one sentence what that reader would take away. Compare it with the purpose. The gap between the two is usually the most important finding.
3. Assess five dimensions, adapting them to the genre:
   - **Purpose and fit:** does it do its job for this reader, at the right length, in the right form?
   - **Structure:** is the main point where this reader needs it; does each section earn its place; is anything missing or in the wrong order?
   - **Argument and support:** are claims specific and backed; are obvious objections or questions left open? For narrative or personal writing, read this as story, stakes and payoff.
   - **Clarity:** are there passages a reader could misread, undefined terms, or overlong sentences?
   - **Voice and tone:** does it sound like a person, at the right register for this reader, consistently?
4. For each issue, give: where it is (section, paragraph number or the first few words quoted), what the problem is, its effect on the reader, and the direction of a fix. Describe the fix; do not write the replacement passage.
5. Rank every issue: **Blocking** (it stops the draft doing its job), **Major** (it weakens it noticeably) or **Minor** (polish).
6. Scope by depth:
   - quick: the three to five highest-ranked issues only;
   - standard: every Blocking and Major issue, and up to five Minor ones;
   - deep: everything in standard, plus paragraph-by-paragraph notes and recurring sentence-level patterns, each with one example quoted from the draft.
7. Name two or three specific strengths the writer should keep through revision.
</task>

<constraints>
- Be honest. If the draft is not ready, say so plainly; if it is ready, say so and do not manufacture problems to fill the format.
- Separate problems from preferences. If something is a matter of taste, label it as such or leave it out.
- Do not rewrite sentences or paragraphs. Short illustrations of a pattern ("for example, the three sentences starting 'It is…'") are fine.
- Do not correct the facts or the opinion unless something is clearly wrong or unsupported; then flag it as "check".
- Do not comment on grammar or typos unless they would cost the writer credibility with this reader; then group them as one Minor issue.
</constraints>

<output_format>
## Verdict
Two or three sentences: what the draft does now, what it needs to do, and its state: ready, close, needs revision, or needs rethinking.
## What works
Two or three bullets, each specific and quoted or located.
## Issues
A numbered list ordered by rank. Each item: **[Blocking | Major | Minor] Dimension: where**, then the problem, the effect on the reader, and the direction of the fix in two or three sentences.
## Three changes that matter most
Three numbered sentences, each an action the writer can take next, in order of impact. If fewer than three changes are worth making, list only those and say so.
</output_format>
