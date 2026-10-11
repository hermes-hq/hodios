---
schema: 1
id: write-meeting-brief-for-executive
kind: prompt
title: Write a meeting brief for an executive
description: Writes the pre-meeting brief a chief of staff or assistant prepares for an executive meeting an outside party, with who they are, history, objectives, asks, sensitivities and talking points.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, operations-manager, consultant, executive]
requires: [none]
inputs: [notes, text, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [executive-briefing, chief-of-staff, talking-points, stakeholder-meeting, meeting-prep]
pairs_with:
  prompts: [prepare-for-meeting, write-manager-talking-points, write-briefing-note]
args:
  - name: meeting
    description: Who the executive is meeting, when, where, how long, and who else attends on each side.
    type: string
    required: true
  - name: background
    description: Everything you know, such as the other organisation, bios of attendees, relationship history, open deals or disputes, previous commitments, recent news you have checked, and what each side wants.
    type: text
    required: true
  - name: executive
    description: The executive you are briefing and how they like briefs, for example "CEO, reads on phone, wants one page". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Brief, Unverified or missing, Logistics check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An executive often walks from one meeting into the next with five minutes to read the brief, usually on a phone. A good brief is what an experienced chief of staff writes: the purpose and the one outcome we want in the first two lines, who is in the room and what each person cares about, the history the executive must not be caught out on (open complaints, unpaid invoices, promises made last time), the asks we expect from them, what our executive should and should not commit to, and the sensitivities. Briefs fail when they are long histories, when they repeat public bios instead of what matters for this meeting, when unverified gossip reads as fact, and when the executive is surprised by an ask the team knew was coming.
</context>

<task>
Write a meeting brief.

Meeting: {{meeting}}
{{#executive}}Executive and preferences: {{executive}}{{/executive}}

<background>
{{background}}
</background>

1. If you cannot tell who the meeting is with or why it is happening, ask in one short message and stop.
2. Write the top block: meeting, time, place or link, duration, our purpose, and the one outcome we want, plus a fallback outcome.
3. Attendees: for each person on their side and ours, name, role, and one or two lines on what they care about or their history with us, from the background only.
4. Relationship history: the five or fewer facts the executive must know, newest first, with dates where given (previous meetings, commitments made, open issues, money owed either way).
5. Their likely asks and our position on each: agree, decline, or "take away" without committing.
6. Talking points: three to five points for the executive in their voice, plus two questions to ask.
7. Sensitivities and do-not-say: topics under negotiation, legal disputes, confidential matters, people not to mention, and anything the executive should not commit to without others.
8. Follow-up: who on our side will act on what the meeting produces.
</task>

<constraints>
- One page if possible, never more than two. Lead with the purpose and outcome.
- Use only the background. Never invent bios, company figures, news, or quotes. Mark anything the background says is unconfirmed as "unverified".
- Keep personal details about attendees to what is professionally relevant; leave out anything about health, family or private life even if it appears in the background, unless it directly affects the meeting (for example, a stated access need).
- No speculation about people's motives presented as fact; phrase as "likely" with the reason.
</constraints>

<output_format>
## Brief
Top block; Attendees (table: Name · Role · What matters); History; Their likely asks (table: Ask · Our position); Talking points; Questions to ask; Sensitivities; Follow-up.
## Unverified or missing
Bullets on facts to check before the meeting. "None" if none.
## Logistics check
Three or fewer items to confirm, such as the dial-in, an interpreter, materials to bring.
</output_format>
