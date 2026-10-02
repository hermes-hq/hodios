---
schema: 1
id: write-thank-you-note
kind: prompt
title: Write a thank-you note
description: Writes a specific, heartfelt thank-you note that names what the person did, the detail that showed care and why it mattered, for cards, emails and post-interview notes.
category: interpersonal-communication
version: 1.0.0
status: experimental
stage: [build]
role: [individual, job-seeker, manager, parent]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [gratitude, thank-you-card, recognition, interview-follow-up]
pairs_with:
  prompts: [give-feedback-sbi, write-professional-email]
args:
  - name: recipient
    description: Who you are thanking and your relationship, for example "my aunt", "a mentor I've had coffee with twice", "the interviewer for a product role".
    type: string
    required: true
  - name: what_they_did
    description: What they did, any specific detail you remember, and what difference it made to you. The more concrete, the better the note.
    type: text
    required: true
  - name: tone
    description: Warm for friends, family and close colleagues; formal for interviewers, senior contacts or official thanks.
    type: enum
    enum: [warm, formal]
    default: warm
output_contract:
  format: markdown
  sections: [Note, Shorter version, Details to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A thank-you note is remembered for one specific detail. Generic notes ("Thanks so much for everything, it really meant a lot!") could be sent to anyone and feel like it. A good note names exactly what the person did, notices the effort or care behind it, says what difference it made, and, where natural, looks ahead. Post-interview notes have their own conventions: sent within a day, brief, referencing something specific from the conversation and restating interest, with no pressure.
</context>

<task>
Write a {{tone}} thank-you note to {{recipient}} for this:
<what_they_did>
{{what_they_did}}
</what_they_did>

1. If the input says only "thanks for everything" or similar, with no specific action, ask what they did and one detail you remember, and stop.
2. Open by thanking them for the specific thing, not with "I just wanted to say".
3. Name the detail that shows you noticed their effort or thought, taken from the input.
4. Say what difference it made to you (or your family, team or project), concretely.
5. Close warmly with a look ahead that fits the relationship (looking forward to seeing them, putting the advice into practice, a return favour) only where the input makes it natural.
6. For an interview thank-you: thank them for their time, reference one specific topic from the conversation, restate interest in the role in one sentence, and offer to provide anything else; no recap of your CV.
7. Length: 50 to 120 words for a card or email; under 40 for the shorter version.
</task>

<constraints>
- Use only details from the input. If the note would be stronger with a detail you do not have, put a `[detail: …]` placeholder and list it under Details to add.
- No gushing superlatives stacked together, no clichés ("words cannot express"), and no more than one exclamation mark.
- Formal tone: full sentences, no contractions or emoji. Warm tone: personal and natural, as you would write by hand.
- Do not mention gifts' prices or compare gifts.
</constraints>

<output_format>
## Note
The note, with greeting and sign-off.
## Shorter version
For a text message or a small card.
## Details to add
Any placeholders and what would fill them. "None" if none.
</output_format>
