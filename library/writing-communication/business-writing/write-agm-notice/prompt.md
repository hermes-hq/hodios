---
schema: 1
id: write-agm-notice
kind: prompt
title: Write an AGM notice
description: Writes the notice of an annual general meeting for a club, charity, association or small company with date, agenda, resolutions, voting and proxy rules, and the papers to send.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, founder, individual, executive]
subject: [nonprofit]
requires: [none]
inputs: [notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [agm, annual-general-meeting, notice-of-meeting, resolutions, proxy-voting]
pairs_with:
  prompts: [run-residents-association-agm, write-meeting-agenda, write-condo-meeting-minutes]
args:
  - name: organisation
    description: The organisation and its type - members' club, charity, residents' association, cooperative, small private or community company - and who receives the notice (members, shareholders).
    type: string
    required: true
  - name: meeting
    description: Date, time, venue or online link, the business to be transacted - accounts, reports, elections, motions or resolutions with their full wording - and nominations deadlines.
    type: text
    required: true
  - name: rules
    description: The relevant parts of your constitution, rules or articles - notice period, who may vote, quorum, proxies, ordinary and special resolutions, electronic attendance.
    type: text
output_contract:
  format: markdown
  sections: [Notice, Enclosures, Compliance check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help secretaries of clubs, charities, associations and small companies write AGM notices. The notice is a formal document: if it goes out late, leaves out business that is later voted on, or misstates how to vote, decisions taken at the meeting can be challenged. Experienced secretaries know the constitution or articles set the rules: the notice period (often counted in clear days, excluding the day of sending and the meeting day), who must receive it, what the notice must contain, the full text of any special resolution, whether proxies or postal or online votes are allowed and their deadline, the quorum, and how nominations for officers or the board are made. Company AGMs may also be governed by national company law. A good notice is short and complete, with the papers attached or linked.

Organisation: {{organisation}}

<meeting>
{{meeting}}
</meeting>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}
</context>

<task>
1. Write the notice:
   - Title "Notice of Annual General Meeting" with the organisation's full name and any registration number placeholder.
   - "Notice is hereby given that the Annual General Meeting of [organisation] will be held on [day, date] at [time] at [venue or online link]."
   - Agenda as numbered items in the usual order: welcome and apologies, minutes of the last AGM, matters arising, chair's or directors' report, treasurer's report and accounts, appointment of auditor or examiner if relevant, elections, resolutions, any other business as allowed by the rules, close.
   - Resolutions: each numbered, labelled ordinary or special as the rules require, with the full wording supplied. Do not draft wording the user did not give; leave [resolution text].
   - Elections: positions open, how to nominate and the deadline, if supplied.
   - Voting and attendance: who may attend and vote, quorum, proxies or postal or online votes and their deadline, how to join online.
   - Date of notice, "By order of the [committee or board]", secretary's name.
2. Enclosures: list the papers to send with the notice (previous minutes, accounts, reports, proxy form, nomination form).
3. Compliance check: from the rules supplied, the latest date the notice can be sent for this meeting date; who must receive it; what the rules require the notice to contain; and anything you could not check because the rules were not supplied, marked [check your constitution].
</task>

<constraints>
- Do not invent notice periods, quorums or voting rules; use the rules supplied or mark them to check.
- Do not draft new resolutions or alter supplied resolution text.
- Plain, formal language; one to two pages.
- If the meeting date does not leave the required notice period, say so first.
</constraints>

<output_format>
## Notice
The notice laid out for sending.
## Enclosures
Checklist.
## Compliance check
Bullets.
</output_format>
