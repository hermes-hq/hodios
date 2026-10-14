---
schema: 1
id: write-fundraising-appeal-speech
kind: prompt
title: Write a live fundraising appeal speech
description: Writes the live ask at a gala, charity dinner or community fundraiser, with one consented story, the specific need, giving levels and a clear moment for people to give.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, executive, manager]
subject: [nonprofit]
requires: [none]
inputs: [notes, dataset]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gala, live-appeal, paddle-raise, donor-ask, charity-dinner]
pairs_with:
  prompts: [plan-fundraising-event, write-donor-appeal, script-filmed-fundraising-appeal]
args:
  - name: event
    description: The event and audience, for example "school PTA gala, 200 parents", "hospice dinner, 120 regular supporters", "church hall fundraiser for a new roof".
    type: string
    required: true
  - name: cause
    description: "What the money is for, the target and how much is already raised, what specific amounts buy, the story you have permission to tell, and how people give on the night (paddles, pledge cards, QR code, text)."
    type: text
    required: true
  - name: minutes
    description: Length of the appeal itself, usually 4 to 8 minutes.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Appeal script, Giving ladder, Length, Run of the ask, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A live appeal (often called the ask, the fund-a-need or the paddle raise) usually raises more than the auction, and it works on different rules from a letter. The room needs one person's story, told with consent and dignity, then the need made concrete ("40 pounds keeps the helpline open for an hour"), then a direct ask with a clear moment to act. Experienced appeal speakers start the giving ladder at the top level and walk down, because the first big gift sets the norm for the room; they often arrange a lead gift in advance; they name the method of giving in simple words before asking; and they stop talking and let the silence work after each level. Common failures: an emotional story with no ask attached, a vague "please give generously", too many statistics, starting at the lowest level, rushing past the moment of giving, and stories that expose a beneficiary who did not agree to be talked about in public. In some places there are rules on fundraising claims and on how gifts and tax relief are described; the speaker should use the organisation's approved wording.
</context>

<task>
Write a live appeal for: {{event}}. Target: {{minutes}} minutes.
<cause>
{{cause}}
</cause>

1. If you do not know what the money is for, the target, or how people give on the night, ask for those and stop.
2. Structure the appeal: a quiet opening that turns the room's attention; the story (only one, and only as told in the cause); the need in concrete terms, tied to what specific amounts do; the target and how far there is to go; the ask, said plainly ("Tonight we are asking you to…"); the giving ladder from top to bottom with a pause at each level; a thank-you and what happens next.
3. Build the giving ladder from the amounts given; if no amounts are given, propose a ladder in placeholders and say it must be set by the organisers who know the room.
4. Write stage directions in brackets: when lights or music change, when to pause, when a pre-arranged first gift is acknowledged (only if the cause says there is one).
5. Keep the appeal to the time: about 120 words per minute for the spoken parts, plus pauses during the ladder.
6. Flag anything in the story that needs consent or anonymising, and any claim (impact figure, tax relief) that should use approved wording.
</task>

<constraints>
- Never invent stories, beneficiaries, impact figures, matched-funding offers or lead gifts. Use placeholders.
- Tell the story with dignity: no pity framing, no details the person would not want said in a room of strangers; use a first name only or a changed name unless consent for more is stated.
- Do not describe tax relief or gift-aid-style schemes in specifics; write `[approved wording on tax treatment]`.
- No pressure tactics that shame people who do not give.
</constraints>

<output_format>
## Appeal script
Full text with [pause] and stage directions.
## Giving ladder
Table: Level | What it does | How it is said.
## Length
Spoken words and estimated time including ladder pauses.
## Run of the ask
Who does what during the appeal: speaker, spotters, pledge-card runners, screen, music.
## Checks
Consent, approved wording, and facts to confirm.
</output_format>
