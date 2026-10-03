---
schema: 1
id: appeal-journal-rejection
kind: prompt
title: Appeal a journal rejection
description: Judges whether a journal rejection is worth appealing, then writes a respectful appeal letter that corrects factual errors in the reviews with evidence, or recommends moving on.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [text, document]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [journal-appeal, manuscript-rejection, editor-letter, peer-review-errors, academic-publishing]
pairs_with:
  prompts: [respond-to-reviewers, choose-target-journal, write-journal-cover-letter]
  personas: [peer-reviewer]
args:
  - name: decision_letter
    description: The editor's decision letter and all reviewer reports, pasted in full, and the journal's name.
    type: text
    required: true
  - name: rebuttal_points
    description: Where you think the decision went wrong, with the evidence - page and line in the manuscript, data, citations - and anything relevant about the process (for example a reviewer with an apparent conflict of interest).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Should you appeal, Point triage, Appeal letter, Plan B]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most journals allow one appeal, and editors overturn rejections mainly when a decision rests on a clear factual error (a reviewer missed an analysis that is in the manuscript, misread a result, or reviewed the wrong version), on a demonstrable conflict of interest or bias, or on a process failure. Appeals almost never succeed when they dispute the editor's judgement of novelty, scope or priority, or when the authors simply disagree with a reasonable reviewer. A good appeal is short, calm and specific: it identifies the decisive errors, shows the evidence with page and line references, offers concrete revisions, and accepts the editor's authority. A bad appeal argues every point, attacks reviewers, or is sent in anger the same day.
</context>

<task>
Advise on and, if warranted, draft an appeal.
<decision_letter>
{{decision_letter}}
</decision_letter>
<rebuttal_points>
{{rebuttal_points}}
</rebuttal_points>

1. Identify what the decision actually rested on: read the editor's letter for the stated reasons and separate decisive criticisms from minor ones.
2. Triage each rebuttal point: factual error (provable from the manuscript or data), misunderstanding that better writing would have prevented, legitimate difference of scientific opinion, editorial judgement (scope, novelty, priority), or process concern. Check each claimed error against the evidence the author gives.
3. Give a verdict: appeal, resubmit as a new revised submission if the journal allows it, or move on to another journal. Explain the reasoning in plain terms, including the realistic chance of success.
4. If appealing, write the letter to the editor: a courteous opening acknowledging the editor's time, the request to reconsider, the two or three decisive factual errors each with the reviewer's claim, the evidence and the location in the manuscript, an offer of specific revisions for legitimate concerns, any process concern stated neutrally, and a respectful close that accepts the outcome.
5. Whatever the verdict, list what to improve before the next submission, based on the reviews.
</task>

<constraints>
- Only claim an error if the author's evidence shows it; otherwise call it a disagreement and leave it out of the appeal or concede it.
- Never question the reviewers' or editor's competence or motives; describe a suspected conflict of interest factually and leave the judgement to the editor.
- Keep the letter under about 600 words and focused on decisive points; do not answer every minor comment.
- Do not invent page numbers, analyses or citations; use "[page/line]" where the author has not given them.
- Remind the author to check the journal's appeal policy and to wait a day before sending.
</constraints>

<output_format>
## Should you appeal
The verdict, the reasoning and the realistic chance in two to four sentences.
## Point triage
A table: point | reviewer's claim | type | evidence holds? | use in appeal?
## Appeal letter
The letter, or "Not recommended" with a one-line reason.
## Plan B
Improvements for the next submission and, if moving on, what kind of journal to target next.
</output_format>
