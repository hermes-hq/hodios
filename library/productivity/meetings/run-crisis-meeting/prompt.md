---
schema: 1
id: run-crisis-meeting
kind: prompt
title: Run an urgent crisis meeting
description: Structures an urgent meeting when something has gone badly wrong - facts versus unknowns, roles, immediate actions, who to inform and what to say, and the next check-in, for any organisation.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, executive, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [crisis-management, emergency-response, incident-command, situation-report, business-continuity]
pairs_with:
  prompts: [build-crisis-comms-plan, write-meeting-recap-email]
args:
  - name: situation
    description: What has happened so far, as known now (for example "supplier fire, no stock for two weeks", "data sent to the wrong customer list", "a volunteer injured at our event").
    type: text
    required: true
  - name: people
    description: Who is available for the meeting and their roles.
    type: text
    required: true
  - name: minutes
    description: How long you can meet now, in minutes.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [First minute, Run sheet, Situation board, Roles, Immediate actions, Who to inform, Next check-in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people run the first urgent meeting after something has gone badly wrong. In a crisis meeting the common failures are: everyone talks at once and repeats rumours, the group speculates about blame instead of acting, nobody is clearly in charge, obvious first steps (safety, stopping further harm, legal or regulatory notifications with deadlines) are missed while people debate messaging, staff and customers hear about it from outside first, and the meeting ends without a time to regroup. Experienced crisis leads run short, frequent meetings with a fixed structure: confirm people are safe, separate what is known, what is unknown and what is assumed, name one lead and clear owners, agree the next few hours of actions, decide who must be told and by whom, and set the next check-in. Blame and root cause wait for a later review.

<situation>
{{situation}}
</situation>
People: {{people}}
Time now available: {{minutes}} minutes
</context>

<task>
1. First minute: if there is any risk to people's safety or ongoing harm, say that dealing with it comes before the meeting, and that emergency services are called where needed.
2. Give a tight run sheet for the time available: safety check; facts, unknowns and assumptions; impact (who and what is affected, how badly, getting worse or stable); decisions and actions for the next few hours; who to inform; next check-in.
3. Provide a situation board template the note-taker fills in live, pre-filled with what the user has given and with unknowns listed as questions.
4. Assign roles: crisis lead who decides, note-taker and timekeeper, an owner for communications, and owners for operations or customer impact; one person per role.
5. List likely immediate actions for this kind of situation, framed as candidates to confirm, including containing the problem and preserving records or evidence.
6. List who may need to be informed (staff, customers, partners, insurers, regulators or authorities, board) and note that some notifications can have legal deadlines that the user must check for their country and sector; give a short holding statement the comms owner can adapt.
7. Set the next check-in time and what must be known by then, and note that a calm review of causes comes later.
</task>

<constraints>
- Safety of people first, always; never suggest delaying an emergency call to hold a meeting.
- Do not state specific legal or regulatory duties or deadlines; flag that they may exist and who to ask (legal adviser, regulator, insurer).
- Do not speculate about causes or blame; keep that out of the meeting.
- The holding statement says only what is confirmed and what is being done; no guesses, no promises of outcomes.
- Keep the output short enough to use in the next few minutes.
</constraints>

<output_format>
## First minute
One to three lines.

## Run sheet
Table: Time | Item | Output.

## Situation board
Known | Unknown | Assumed | Impact.

## Roles
Role | Person | Responsibility.

## Immediate actions
Checklist with owner placeholders.

## Who to inform
Table: Who | Why | By whom | Deadline to check; then the holding statement.

## Next check-in
Time and what must be known by then.
</output_format>
