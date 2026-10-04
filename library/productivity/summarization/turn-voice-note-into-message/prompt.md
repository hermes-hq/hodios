---
schema: 1
id: turn-voice-note-into-message
kind: prompt
title: Turn a voice note into a clear message
description: Turns a rambling voice-note transcript into a clear written message or email, with the main point first, every ask, date and number kept, and the rest trimmed.
category: summarization
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [transcript]
output: [message, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [voice-notes, dictation, email-drafting, clarity]
pairs_with:
  prompts: [structure-messy-notes]
args:
  - name: transcript
    description: The transcript of your voice note or dictation, as it came out, including the ums and corrections.
    type: text
    required: true
  - name: recipient
    description: Who it is for and your relationship, for example "my landlord", "the whole project team", "my sister".
    type: string
    required: true
  - name: tone
    description: casual for friends and family chat; neutral for colleagues and everyday email; formal for officials, clients or complaints.
    type: enum
    enum: [casual, neutral, formal]
    default: neutral
output_contract:
  format: markdown
  sections: [Message, Kept, Resolved or removed, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Speaking is faster than typing, but a voice note transcript wanders: it circles back, corrects itself ("Tuesday, no, Wednesday"), buries the point in the middle and fills gaps with "you know". The reader of the message should get the point in the first line and every ask, date and number intact, in the speaker's own voice. Losing one date or adding one promise the speaker never made is worse than leaving the message a little long.

<transcript>
{{transcript}}
</transcript>
Recipient: {{recipient}}
Tone: {{tone}}
</context>

<task>
1. Find the main point: what the speaker wants the recipient to know or do. It goes in the first sentence.
2. List every ask, decision, date, time, place, amount, name and number in the transcript. Apply self-corrections: the last stated version wins, and you record what changed.
3. Drop filler, repetition, false starts and tangents that do not serve the main point. Keep a tangent if it carries information the recipient needs.
4. Write the message for {{recipient}} in a {{tone}} tone:
   - main point first;
   - asks as a short list if there is more than one, each with its deadline;
   - supporting details after, in short paragraphs;
   - a close that matches the tone.
   Add a subject line only when the recipient and tone suggest an email (neutral or formal, and not family or close friends).
5. Mark anything ambiguous in the transcript, such as "next Friday" said on an unknown date or an unclear name, with [check: ...] in the message.
6. Before answering, compare your message against the list from step 2. Every ask, date and number must appear, unchanged except for corrections the speaker made.
</task>

<constraints>
- Add nothing the speaker did not say: no new commitments, apologies, compliments, deadlines or facts.
- Keep the speaker's voice and level of warmth. Tone adjusts formality, not personality.
- Much shorter than the transcript, but never at the cost of an ask or a date.
- If the transcript holds two unrelated messages, say so and write them separately.
- If the transcript is unintelligible or empty, say so and ask for a clearer version.
</constraints>

<output_format>
## Message
The ready-to-send text (with **Subject:** line first when used).
## Kept
Checklist of every ask, date, time, amount and name carried into the message.
## Resolved or removed
Bullets: self-corrections applied (said X, then Y; kept Y) and anything trimmed that the speaker might want back.
## Check before sending
Bullets for each [check: ...] item. "Nothing to check" if none.
</output_format>
