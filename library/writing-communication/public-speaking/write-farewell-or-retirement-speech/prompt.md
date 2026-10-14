---
schema: 1
id: write-farewell-or-retirement-speech
kind: prompt
title: Write a farewell or retirement speech
description: Writes a spoken farewell or retirement speech, either about a colleague who is leaving or the leaver's own, with specific contributions, warm humour and no awkward notes.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [manager, individual, executive]
requires: [none]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [retirement-speech, leaving-do, farewell, workplace, writing-for-the-ear]
pairs_with:
  prompts: [write-farewell-message, turn-script-into-cue-cards]
args:
  - name: speaker
    description: Who is speaking. "about-colleague" for a manager or colleague speaking about the leaver; "own" for the leaver's own speech.
    type: enum
    enum: [about-colleague, own]
    default: about-colleague
  - name: details
    description: "Leaver's name, role, years, why they are leaving (retirement, new job, redundancy, relocation), concrete contributions and stories, what colleagues say about them, who will be there, and anything to avoid."
    type: text
    required: true
  - name: minutes
    description: Target length in minutes.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Speech, Length, Sensitivities, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Leaving speeches go wrong in two directions. Speeches about the leaver drift into a CV ("joined in 2009, promoted in 2014…") or a string of in-jokes, and miss the one thing people want to hear: what difference this person made, said specifically enough that the leaver feels seen. The leaver's own speech tends to thank everyone by name until someone is forgotten, or uses the moment to settle scores. The context of the departure matters: a retirement after 30 years can be celebratory and reflective; a redundancy or a move after a difficult period needs warmth without pretending, and nothing that puts the leaver or the company on the spot. Retirement jokes about golf, gardening and "finally doing nothing" are tired and can feel dismissive; what the person actually plans to do is better.
</context>

<task>
Write a {{speaker}} farewell or retirement speech. Target: {{minutes}} minutes.
<details>
{{details}}
</details>

1. If the details have no specific contribution, story or trait, ask up to three questions (for example "What would have gone wrong without them?", "What do new starters learn from them?") and stop.
2. If {{speaker}} is about-colleague: open with a short scene or quote that captures them; name two or three specific contributions and their effect on people or the work; one affectionate story; what colleagues will miss; a wish for what comes next, using what they actually plan; and a toast or call to applause.
3. If {{speaker}} is own: open with a light line; thank groups rather than long name lists, naming at most three people who made a specific difference and saying what they did; one lesson or memory from the job; what you are going to do next; a closing thank-you to the room.
4. Write for the ear, about 130 words per minute, with [pause] before the toast or final thanks.
5. Check the reason for leaving and adjust: for redundancy, restructuring or a hard exit, keep it about the person and the good work, with no reference to the circumstances unless the user wants a brief, neutral line.
</task>

<constraints>
- Use only the facts and stories given; never invent achievements, numbers or quotes. Use `[detail: …]` placeholders.
- No digs at the company, management, successors or former colleagues, however funny they seem in the moment.
- No age, health or "you'll be bored" jokes; no tired retirement clichés.
- If people will be thanked by name, keep it to a short list and note the risk of leaving someone out.
</constraints>

<output_format>
## Speech
Full text with [pause] marks.
## Length
"N words, about M minutes".
## Sensitivities
Anything in the details deliberately left out or softened, and why. "None" if none.
## Delivery notes
Two or three tips: when in the event to speak, having a gift or card to hand over at the end, keeping a card with names to avoid forgetting anyone.
</output_format>
