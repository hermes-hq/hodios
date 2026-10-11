---
schema: 1
id: write-award-presentation-speech
kind: prompt
title: Write an award presentation speech
description: Writes the speech for presenting an award, covering what the award recognises, the recipient's story and impact, and a build to the name, for staff, club, school or industry awards.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [manager, executive, teacher, individual]
requires: [none]
inputs: [notes, text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [award-presentation, citation, recognition, awards-night]
pairs_with:
  prompts: [write-award-acceptance-speech, plan-awards-ceremony]
args:
  - name: award
    description: The award, what it recognises, who decides it, and whether the winner already knows, for example "Volunteer of the Year at our sports club, chosen by the committee, winner doesn't know".
    type: string
    required: true
  - name: recipient
    description: "The recipient's name and role, what they did with concrete examples and effects, quotes from nominators (with permission), and for a shortlist, the other nominees' names."
    type: text
    required: true
  - name: minutes
    description: Target length. Most presentations are 1 to 3 minutes; lifetime awards up to 5.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Presentation, Length, Stagecraft, Facts to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Presenting an award is a different job from accepting one. The presenter makes the award mean something and makes the recipient feel seen in front of their peers. A good presentation says what the award stands for in one line, tells the recipient's story through one or two concrete examples and their effect on people, and, when the winner is a surprise, builds clues so the room starts to guess before the name is said. When there is a shortlist, the other nominees are honoured by name first. Presenters go wrong by talking about themselves, reading a long list of achievements, giving the name away in the first line, mispronouncing it, or for a surprise award, leaving the recipient no time to get to the stage before the applause dies. Lifetime or memorial awards often carry history and family in the room, which shapes the tone.
</context>

<task>
Write the speech to present: {{award}}. Target: {{minutes}} minutes.
<recipient>
{{recipient}}
</recipient>

1. If there is no concrete example of what the recipient did, ask up to two questions and stop.
2. Open with what the award recognises and, if relevant, its history or namesake in one or two sentences.
3. If there is a shortlist, name and briefly honour the other nominees before the winner.
4. Tell the recipient's story through one or two specific examples and who they helped; for a surprise award, write it so the details point to the person gradually and the name comes last; otherwise the name can come early.
5. Close with the name said clearly, the full award title, and an invitation to come up. Add a short stagecraft note on where the presenter stands and when to hand over the award.
6. Write for the ear, about 130 words per minute.
</task>

<constraints>
- Use only facts and quotes given; never invent achievements, figures or quotes. Use `[detail: …]` placeholders.
- For a surprise award, keep the name and any unique giveaway (exact job title) until the end.
- Keep the presenter in the background; at most one line about how they know the recipient.
- Do not rank or compare the nominees unfavourably.
</constraints>

<output_format>
## Presentation
Full text with [pause] before the name.
## Length
"N words, about M minutes".
## Stagecraft
Where to stand, holding the award, the photo, and leaving space for the recipient to speak if they are expected to.
## Facts to check
Name pronunciation, spelling on the award itself, and every fact the presenter should confirm.
</output_format>
