---
schema: 1
id: write-tactful-edit-comments
kind: prompt
title: Write tactful edit comments on someone's draft
description: Writes margin comments on a colleague's, student's or client's draft that are specific, kind and actionable, each tied to a quoted passage and labelled must-fix or suggestion, plus a short cover note.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [editor, manager, teacher, consultant]
requires: [none]
inputs: [text, document]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [review-comments, giving-feedback, track-changes, colleague-review, tactful-feedback]
pairs_with:
  prompts: [critique-draft, revise-draft-from-feedback, give-feedback-sbi]
  personas: [editor]
args:
  - name: draft
    description: The other person's draft.
    type: text
    required: true
  - name: relationship_and_purpose
    description: "Your relationship and what the draft is for, for example \"my direct report's first client report\" or \"a senior colleague's conference abstract; she asked for honest notes\"."
    type: text
    required: true
  - name: my_concerns
    description: Optional issues you already noticed and want included.
    type: text
output_contract:
  format: markdown
  sections: [Cover note, Comments, Not commented on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comments on someone else's draft fail in two ways. Too blunt ("unclear", "rewrite", "no") and the writer gets defensive or cannot tell what to do. Too soft and vague ("maybe consider looking at this?") and the important problem gets ignored. Good comments are anchored to a quoted passage, describe the effect on the reader rather than judging the writer ("A reader new to the project won't know what Phase 2 is" rather than "you didn't explain this"), offer a direction or example without rewriting their text for them, and are labelled so the writer knows what must change and what is optional. Too many comments overwhelm: experienced editors pick the issues that matter, comment on a pattern once and say "same throughout", and name what works so it survives the revision. Seniority and culture change the wording, not the substance.
</context>

<task>
Write comments on this draft for its author.

Relationship and purpose: {{relationship_and_purpose}}
{{#my_concerns}}Issues I already noticed: {{my_concerns}}{{/my_concerns}}

<draft>
{{draft}}
</draft>

1. If the draft is empty or the purpose is missing, ask and stop.
2. Read for the purpose and identify the issues that most affect it, including the concerns the user listed. Pick at most about 10 comments for a short draft; group repeated patterns into one comment.
3. Label each comment: Must fix (errors, missing essentials, things that would embarrass or mislead), Suggestion (improvements the author can take or leave), or Question (where you need their intent).
4. For each comment, quote the passage, describe the effect on the reader, and give a direction or a short example. Use "I" and reader-focused wording; avoid "you should" and judgement words.
5. Add two or three comments on what works, specific enough to be useful.
6. Write a short cover note: overall view, the one or two most important changes, and an invitation to discuss, in a tone that fits the relationship.
7. List issues you deliberately did not comment on (minor style points) so the user knows they were seen.
</task>

<constraints>
- Every comment points to a quoted passage and gives a direction. No bare "unclear" or "awkward".
- Do not rewrite whole paragraphs for the author; a short example phrase is the limit.
- Do not soften a must-fix issue until it disappears; tact is in the wording, not in leaving it out.
- Do not comment on the person, only the text.
</constraints>

<output_format>
## Cover note
A short message to the author.
## Comments
Numbered, in document order: **[Must fix | Suggestion | Question | Works]** "quoted passage" then the comment.
## Not commented on
Bullets of minor issues left alone. "None" if none.
</output_format>
