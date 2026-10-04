---
schema: 1
id: prepare-to-speak-at-public-meeting
kind: prompt
title: Prepare to speak at a public meeting
description: Prepares a resident to speak at a council, school board or planning meeting with the public comment rules to check, a timed statement, evidence to bring and how to follow up afterwards.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [public-comment, city-council, school-board, planning-hearing, civic-engagement, local-government]
pairs_with:
  prompts: [write-letter-to-elected-official, write-public-consultation-response, write-speech, practice-impromptu-speaking]
  personas: [speaking-coach]
args:
  - name: issue
    description: What you want to speak about and what you want the body to do - the agenda item or decision, your position, how it affects you or your neighbourhood, and any facts, figures or stories you have.
    type: text
    required: true
  - name: minutes_allowed
    description: How many minutes speakers get, if you know. Many bodies allow two to three minutes.
    type: number
    default: 3
  - name: body
    description: Who you are speaking to, for example "Springfield City Council", "the county school board", "the planning committee", "a parish council".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Rules to check, Your statement, Short version, Evidence to bring, On the night, Afterwards, Written comment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Public comment at a council, school board or planning committee is short, formal and often the only time a decision-maker hears directly from a resident before voting. It works when the speaker follows the procedure (signing up on time, speaking to the right agenda item, staying within the time limit), makes the ask in the first sentences, gives one or two concrete local facts or a short personal story that members will remember, and leaves a written copy for the record. It fails when the speaker runs out of time before the ask, attacks individuals, expects a debate (members often do not respond during public comment), or reads a long statement too fast.

<issue>
{{issue}}
</issue>
Body: {{body}}
Time allowed: {{minutes_allowed}} minutes
</context>

<task>
1. If the issue does not say what the speaker wants the body to do (vote for, vote against, delay, amend, fund, investigate), ask in one question and stop.
2. Rules to check for {{body}}: how and by when to sign up to speak, whether comment is in person, online or written, whether to speak during a specific agenda item or general public comment, the time limit and whether it may be cut on busy nights, rules about naming staff or individuals and about signs or applause, whether members respond, and any deadline for written objections (planning applications often have one). Say where to find each (the agenda, the body's website, the clerk) and that these vary.
3. Your statement: a script that fits {{minutes_allowed}} minutes at about 130 words per minute, with a little time to spare. Structure: address the chair and members in the customary way, name and connection to the issue (for example "I live on Elm Street, two doors from the proposed site"), the ask in the first 20 seconds, two reasons each with one concrete local fact, figure or short story, a response to the strongest argument on the other side, and the ask again in the last line. Mark facts that need checking [verify].
4. Short version: a 60-second cut in case time is reduced, keeping the ask, one reason and the closing line.
5. Evidence to bring: copies of the statement for the clerk and members, photos, petition signatures, data sources to cite (with how to check them), and neighbours who could speak on other points rather than repeating the same one.
6. On the night: arrive early, check in with the clerk, use a timer, speak slower than feels natural, what to do if interrupted or heckled, and staying calm if members disagree.
7. Afterwards: how to follow up (a short email to members thanking them and restating the ask, asking the clerk for the minutes, checking when the decision will be made, joining with neighbours, contacting the local paper if appropriate).
8. Written comment: a short written version they can submit if they cannot attend or as a record.
9. Before answering, count the statement's words and confirm it fits {{minutes_allowed}} minutes with spare time, and that the ask appears at the start and the end.
</task>

<constraints>
- Use only facts the speaker gave. Mark anything else [verify], and never invent statistics, quotes or legal requirements.
- Firm and respectful: criticise decisions and proposals, never individuals. No insults, threats or accusations of corruption without evidence.
- Keep sentences short enough to say in one breath; avoid jargon unless the body uses it.
- Do not state procedural rules or deadlines as fact; say where to confirm them.
- If the issue involves a legal dispute, an enforcement action or the speaker's own planning appeal, mention once that they may want advice from a planning or legal professional.
</constraints>

<output_format>
## Rules to check
Checklist with where to find each.
## Your statement
The script, with a word count and estimated time at the top.
## Short version
## Evidence to bring
## On the night
## Afterwards
## Written comment
</output_format>
