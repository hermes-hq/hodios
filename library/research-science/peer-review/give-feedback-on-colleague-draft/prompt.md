---
schema: 1
id: give-feedback-on-colleague-draft
kind: prompt
title: Give a colleague feedback on their paper draft
description: Gives a colleague informal pre-submission feedback on a paper or chapter draft, matched to what they asked for, prioritised to the few changes that matter, honest about weaknesses and kind in tone.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [friendly-review, pre-submission, collegial-feedback, academic-drafts, manuscript]
pairs_with:
  prompts: [write-peer-review, fix-review-tone, review-thesis-draft]
  personas: [peer-reviewer]
args:
  - name: draft
    description: The colleague's draft, or the parts you were asked to read.
    type: text
    required: true
  - name: their_request
    description: What they asked for, for example "is the argument clear?", "is it ready for journal X?", "check the stats" or "anything at all".
    type: text
    required: true
  - name: relationship
    description: Optional. Who they are to you and how much time you have, for example "PhD student in my lab, wants it by Friday" or "senior co-author, light touch".
    type: string
output_contract:
  format: markdown
  sections: [Message to your colleague, Main points, Smaller points, Notes for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Friendly review before submission is one of the most useful things academics do for each other, and one of the most often done badly: either so polite it misses the problem a referee will find in five minutes, or a line-edit of every sentence that buries the two comments that matter. Good collegial feedback answers the question the colleague actually asked, then flags anything serious they did not ask about. It leads with the main message (does the paper work, and what is the biggest risk with referees), keeps to three to five priority points, separates substance from wording, frames suggestions as reader reactions ("I lost the thread here", "I expected X after the abstract") rather than rulings, and respects that it is their paper. Timing matters: feedback on structure is useful early, and line edits are only welcome late. For students and junior colleagues, specific praise of what works is information too, not padding.
</context>

<task>
Help me give feedback on my colleague's draft. They asked: {{their_request}}
{{#relationship}}Context: {{relationship}}{{/relationship}}
<draft>
{{draft}}
</draft>

1. Read the draft for its main claim and decide whether it comes across: could a reader state the contribution after the abstract and introduction?
2. Answer their question directly first.
3. Identify the three to five most important points beyond that, in priority order: anything a referee would likely reject or seriously question, gaps between claims and evidence, structural problems, and missing framing for the target venue.
4. Note what works well, specifically, so they keep it.
5. Collect smaller points (clarity, terminology, figures, references) briefly, without line-editing the whole text.
6. Draft a short covering message in a collegial tone that leads with the overall view.
</task>

<constraints>
- Match the depth to the request and the relationship; do not deliver a full referee report when they asked a narrow question, but do flag a serious problem even if they did not ask.
- Be honest: if the draft is not ready, say so kindly and say what would make it ready.
- Do not rewrite their paragraphs; suggest what to change and, at most, a sample sentence.
- Do not invent references or facts about the field; mark points to check.
- Keep the draft confidential; remind the user to check that the colleague is comfortable with an AI tool being used on unpublished work.
</constraints>

<output_format>
## Message to your colleague
A short message ready to send, leading with the overall view.
## Main points
Numbered, each with where in the draft and a suggested fix.
## Smaller points
Bullets.
## Notes for you
Anything to raise in person rather than in writing, and the AI-use reminder.
</output_format>
