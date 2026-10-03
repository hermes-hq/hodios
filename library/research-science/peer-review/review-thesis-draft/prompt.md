---
schema: 1
id: review-thesis-draft
kind: prompt
title: Review a thesis chapter as an examiner would
description: Reviews a thesis or dissertation chapter as an examiner would, judging contribution, argument, methods, use of literature and coherence, and returns prioritised revisions and likely defence questions.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [student, researcher]
requires: [none]
inputs: [document]
output: [report, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis, dissertation, examiner-feedback, viva-prep, chapter-review]
pairs_with:
  prompts: [plan-thesis-structure, write-discussion-section, write-literature-review-section, plan-phd-timeline]
  personas: [thesis-advisor, peer-reviewer]
args:
  - name: chapter_text
    description: The chapter (or a substantial part of it), with its title and its place in the thesis, for example "Chapter 2, literature review".
    type: text
    required: true
  - name: thesis_aim
    description: The thesis's overall aim, research questions and claimed contribution, so the chapter can be judged against them.
    type: text
  - name: level
    description: masters judges competent, well-executed independent research; phd judges an original contribution to knowledge at publishable standard.
    type: enum
    enum: [masters, phd]
    default: phd
output_contract:
  format: markdown
  sections: [Examiner's overall view, Strengths, Assessment by criterion, Prioritised revisions, Likely examination questions, Line-level notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Examiners read a thesis asking whether the candidate has met the standard for the degree, and they judge each chapter by its job in the whole. A literature review should build a critical argument toward the gap, not summarise sources one by one. A methods chapter should justify choices against alternatives and show awareness of their limits. Results chapters should report findings clearly and connect them to the questions. Discussion chapters should interpret, relate findings to the literature, state the contribution and its limits precisely, and not overclaim. Common examiner concerns are a contribution that is not stated or not shown, chapters that do not connect, descriptive rather than critical writing, unjustified methods, and conclusions that go beyond the evidence. At master's level the bar is competent, independent, well-executed research; at doctoral level it is an original contribution to knowledge, usually of publishable quality.
</context>

<task>
Review this chapter at {{level}} level.
<chapter>
{{chapter_text}}
</chapter>
{{#thesis_aim}}
<thesis_aim>
{{thesis_aim}}
</thesis_aim>
{{/thesis_aim}}

1. Identify the chapter's type and its job in the thesis, and state its main argument in two sentences as an examiner would summarise it. If the argument cannot be stated, that is the first finding.
2. Assess against the criteria that fit the chapter type: contribution and originality (shown, not asserted), argument and structure (does each section advance it; signposting), methods and justification, use of literature (critical synthesis, currency, balance, accurate representation), quality of evidence and analysis, coherence with the thesis aims, and academic writing (clarity, precision, referencing consistency).
3. Rate each criterion as Meets the standard, Needs revision, or Major concern, at the given level, with the evidence from the text.
4. Prioritise revisions: Must fix before submission (would draw examiner criticism or affect the outcome), Should fix (would strengthen the chapter noticeably), and Could fix (polish). Give each a location and a concrete action.
5. List the five to eight questions an examiner would most likely ask about this chapter in the defence or viva, with a note on what a strong answer would cover.
6. Add up to ten line-level notes on the most important passages.
</task>

<constraints>
- Be honest and specific. Do not soften a major problem into a minor one, and do not invent problems to look thorough. If the chapter is strong, say so.
- Judge the work, not the candidate. Use a respectful, direct examiner's tone.
- Do not rewrite the chapter. Short example rewrites of one or two sentences are fine where they show the fix.
- Do not judge whether cited sources say what the chapter claims unless the text shows it; flag claims that look like they need checking.
- If the thesis aim is not given, infer it from the chapter, say so, and note where the assessment depends on it.
- Remind the user once that their institution's regulations and their supervisor's guidance decide what is required.
</constraints>

<output_format>
## Examiner's overall view
A short paragraph, including whether the chapter currently meets the {{level}} standard.
## Strengths
Three to five bullets.
## Assessment by criterion
A table: criterion | rating | evidence | comment.
## Prioritised revisions
Three groups (must, should, could), each item with location and action.
## Likely examination questions
Numbered, with what a strong answer covers.
## Line-level notes
Quoted passage and note.
</output_format>
