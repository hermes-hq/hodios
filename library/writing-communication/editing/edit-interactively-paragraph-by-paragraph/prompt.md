---
schema: 1
id: edit-interactively-paragraph-by-paragraph
kind: prompt
title: Edit paragraph by paragraph with me
description: Edits a text one paragraph at a time, offering labelled options for each and waiting for the writer's choice, then learns from those choices and assembles the final version.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student, individual]
requires: [none]
inputs: [text, document]
output: [rewrite, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [guided-edit, paragraph-editing, word-choice, author-control]
pairs_with:
  prompts: [line-edit-prose, tighten-prose, suggest-alternative-phrasings]
  personas: [editor]
args:
  - name: text
    description: The text to edit, with paragraphs separated by blank lines.
    type: text
    required: true
  - name: goal
    description: What the edit is for, for example "tighter and more confident for a grant panel" or "smoother flow, keep my casual voice".
    type: string
    required: true
  - name: depth
    description: How far the options may go. light keeps sentences and fixes wording; medium may reorder and merge sentences; heavy may restructure the paragraph.
    type: enum
    enum: [light, medium, heavy]
    default: medium
output_contract:
  format: markdown
  sections: [Paragraph, Options, Recommendation, Your choice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Writers often reject a fully rewritten draft because they cannot see which changes they would have accepted, and the voice drifts away from theirs. Editing one paragraph at a time, with a small set of clearly different options, keeps the writer in control and teaches them what each kind of change does. A good interactive editor also notices patterns in the writer's choices (always picks the shorter option, always keeps the first-person asides) and stops offering what they keep rejecting.

Goal: {{goal}}
Depth: {{depth}}
<text>
{{text}}
</text>
</context>

<task>
1. If the text is missing, ask for it and stop. Split it into paragraphs and say how many there are. If there are more than 15, offer to group short paragraphs or to work on a chosen section first.
2. For the current paragraph, show the original, then up to three options that differ in kind, not just wording: A, the smallest change that fixes the real problems; B, a tighter or clearer version; C, a version that goes as far as {{depth}} allows. If the paragraph already serves the goal, say so and offer "keep" as the recommendation.
3. Under each option, give one line on what changed and why it serves the goal.
4. Recommend one option in a sentence.
5. Ask the writer to reply with A, B, C, keep, their own edit, or a mix (for example "B but keep my last sentence"). Also accept: "back" to revisit the previous paragraph, "skip", "apply this style to the rest", and "finish".
6. Stop and wait for the reply. Do not edit the next paragraph in the same message.
7. After each choice, record it and adjust: if the writer keeps rejecting a kind of change, stop offering it and say so once. Check that the chosen version still connects to the paragraphs before and after; if a transition broke, mention it with the next paragraph.
8. On "apply this style to the rest", edit the remaining paragraphs in the learned style and show them with changes marked, then ask for approval.
9. On "finish" or after the last paragraph, output the full edited text, a short list of the patterns the writer preferred, and any paragraph left unchanged on purpose.
</task>

<constraints>
- One paragraph per turn unless the writer asks otherwise.
- Never change facts, numbers, names, quotations or the writer's claims; if one looks wrong, raise it as a question.
- Keep the writer's voice: options vary clarity and structure, not personality, unless the goal asks for a different tone.
- Never silently alter a paragraph the writer already approved.
</constraints>

<output_format>
For each turn:
## Paragraph
"Paragraph N of M", then the original.
## Options
A, B and C (or fewer), each followed by a one-line note.
## Recommendation
One sentence.
## Your choice
The reply commands, in one line.

At the end: the full edited text, then "Your preferences" bullets, then "Left unchanged" bullets.
</output_format>
