---
schema: 1
id: reword-review-comments
kind: prompt
title: Reword review comments
description: Rewrites vague, curt or sarcastic draft review comments into clear, kind, actionable ones with a label, the reason and a concrete proposal, keeping the technical point. Use before posting a review.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer]
stack: []
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [review-comments, comment-labels, feedback-tone, second-language]
pairs_with:
  prompts: [write-code-review-guidelines, respond-to-review-comments]
args:
  - name: comments
    description: Your draft comments, one per line or block. Add the file and line or a snippet of the code each refers to if you have it. Any language is fine.
    type: text
    required: true
  - name: tone
    description: direct is short and neutral; warm adds a little encouragement; formal suits external contributors, clients or cross-company reviews.
    type: enum
    enum: [direct, warm, formal]
    default: direct
output_contract:
  format: markdown
  sections: [Rewritten comments, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reviewer has drafted comments and wants them to land well. Comments fail in predictable ways: "this is wrong" with no reason, "why would you do this?" read as an attack, a nit that sounds like a blocker, a blocker phrased so softly the author skips it, or English that is grammatically off and comes across as rude when the writer is just writing in a second language. The fix keeps the technical substance exactly and changes how it is said. Tone: {{tone}}.
</context>

<task>
<comments>
{{comments}}
</comments>

For each draft comment:
1. Work out the technical point. If the draft is too vague to know what the reviewer means (for example "hmm" or "not sure about this"), do not guess: write a version with a placeholder like [what concerns you: performance, naming, correctness?] and say so in Notes.
2. Pick a label from how serious the point actually is, not how strongly it was worded:
   - **blocking:** a defect, security or data risk, or a broken contract; must change before merge;
   - **suggestion:** a better approach the author may take or decline;
   - **nit:** minor polish; never blocks;
   - **question:** the reviewer needs information to judge.
   If the draft's urgency and the label disagree (a "MUST fix" about naming, a "maybe consider" about a SQL injection), use the correct label and point out the change in Notes.
3. Rewrite with three parts, in this order: what you see (about the code, not the person), why it matters (the concrete consequence), and the proposal (a specific change, a code snippet if the draft had one, or the question to answer).
4. Remove sarcasm, rhetorical questions, "just", "obviously", "simply", "why didn't you", absolutes, and blame ("you broke"). Use "we" or the code as the subject. Keep it as short as the point allows: one to three sentences.
5. Apply the tone: direct is plain and neutral without padding; warm may add one genuine sentence of appreciation when there is something specific to appreciate, never generic praise; formal uses complete sentences and no slang, emoji or jokes.
6. Write in clear international English that a non-native reader understands: short sentences, no idioms. If the drafts are in another language, rewrite them in that language unless asked otherwise.
</task>

<constraints>
- Never change, add or soften the technical claim. If you think the draft's claim is wrong, keep it and add a line in Notes saying why it may be wrong.
- Do not add review points the reviewer did not make.
- Keep code identifiers, file paths and snippets exactly as written.
- Do not invent the reason behind a comment; use a placeholder and say so.
</constraints>

<output_format>
## Rewritten comments
Numbered to match the drafts. Each: the label in bold (`**blocking:**`, `**suggestion:**`, `**nit:**`, `**question:**`), then the rewritten comment ready to paste.
## Notes
Bullets, only where needed: a label changed and why, a placeholder that needs filling, a claim that may be wrong, or a comment better made in conversation than in writing. "None" if nothing.
</output_format>

<examples>
Draft: "Seriously? A loop inside a loop? This will never scale."
Rewritten: **suggestion:** This nested loop compares every order with every customer, so it grows with orders × customers and could get slow past a few thousand of each. Could we build a map of customers by id first and look each one up?
</examples>
