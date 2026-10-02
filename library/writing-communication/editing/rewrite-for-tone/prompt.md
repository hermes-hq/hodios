---
schema: 1
id: rewrite-for-tone
kind: prompt
title: Rewrite a text for tone
description: Rewrites a text in a target tone or register, such as warmer, firmer or more formal, without changing its facts, asks or commitments, and shows which tone dials moved.
category: editing
version: 1.0.0
status: experimental
stage: [review]
role: [writer, manager, support-agent, individual]
requires: [none]
inputs: [text, message]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [register, formality, tone-of-voice]
pairs_with:
  prompts: [tighten-prose, write-professional-email, reply-to-email]
  personas: [editor]
args:
  - name: text
    description: The text to rewrite, such as an email, message, paragraph or announcement.
    type: text
    required: true
  - name: target_tone
    description: The tone you want, for example "warmer but still professional", "firmer, no apologising", "formal for a government office", "casual for Slack".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Rewrite, Tone changes, Content check, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tone is carried by specific, adjustable features: how direct the ask is, how much hedging and apologising there is, greetings and sign-offs, contractions, sentence length, pronouns ("we" versus "you"), emotional words, and how much acknowledgement of the reader comes before the point. A tone rewrite changes those features and nothing else. The common failure is content drift: a "warmer" rejection that now sounds like a maybe, a "firmer" email that adds a threat, a "more polite" one that drops the deadline.
</context>

<task>
Rewrite the text below in this tone: {{target_tone}}.

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop. If the target tone is too vague to act on (for example "better"), state the interpretation you are using in Notes, and pick the most likely one.
2. List the content that must survive: every fact, number, date, name, request, decision, commitment, condition and refusal.
3. Translate the target tone into concrete dials: directness, formality, warmth, hedging, length, greeting and sign-off, contractions, emoji or exclamation marks. Decide which way each must move.
4. Rewrite, moving only those dials. Keep the language variety (US or UK) and any terms of art.
5. Check the rewrite against your content list. Every item must be present with the same strength: a "must" stays a "must", a "no" stays a clear no, a deadline stays the same date.
6. If the target tone pulls against the content (for example "make it sound like we agree" when the text declines), keep the content and explain the tension in Notes.
</task>

<constraints>
- Do not add new facts, promises, apologies, concessions, compliments or threats that are not in the original.
- Keep roughly the same length unless the tone requires otherwise (for example "more concise" or "more formal" letter conventions); say so if length changes by more than 30%.
- No clichés of the target register ("I hope this email finds you well") unless the context really calls for them.
</constraints>

<output_format>
## Rewrite
The rewritten text, ready to send.
## Tone changes
A table: Dial | Before | After, for each dial that moved.
## Content check
A checklist of every fact, ask and commitment from the original, each marked as preserved.
## Notes
Your interpretation of the tone, any tension between the tone and the content, and any wording you recommend the author double-check. "None" if none.
</output_format>
