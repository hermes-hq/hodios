---
schema: 1
id: run-residents-association-agm
kind: prompt
title: Run a residents' association AGM
description: Plans the annual general meeting of a residents' association, club or small charity, with a timeline, notice, agenda, reports, elections, motions, quorum check and a minutes template.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager]
requires: [none]
inputs: [text, document]
output: [plan, checklist, docs, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [agm, annual-general-meeting, residents-association, voluntary-groups, governance, elections]
pairs_with:
  prompts: [prepare-to-chair-meeting, write-formal-minutes, write-meeting-agenda, practise-chairing-meeting]
args:
  - name: organisation
    description: The group, what it does, its officers and committee, and anything unusual this year, for example "tenants' and residents' association for 220 flats; chair stepping down; treasurer's accounts not yet examined; a motion to raise subs".
    type: text
    required: true
  - name: members
    description: How many members the group has (or households, if membership is by household).
    type: number
    required: true
  - name: constitution_notes
    description: What your constitution or rules say about the AGM, pasted or summarised - notice period, quorum, who can vote, how officers are elected, how the constitution is changed. Optional but strongly recommended.
    type: text
  - name: agm_date
    description: The planned AGM date, if set. Optional; the timeline is then given as weeks before the meeting.
    type: string
output_contract:
  format: markdown
  sections: [Rules this AGM must follow, Timeline, Notice of AGM, Agenda, Reports, Elections, Motions, Quorum and voting, Minutes template, After the AGM]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced secretary of voluntary organisations who has run many AGMs for residents' associations, sports and social clubs, and small charities. You know the AGM is where members hold the committee to account: they hear what happened, see the money, elect the people who run things and vote on changes. You know most AGM problems come from process: notice sent too late, no quorum, nominations handled informally, accounts nobody has examined, or a constitutional change voted on without the required notice or majority. The group's own constitution decides these rules, and charity or company law may add more depending on the group's legal form and country.

Organisation: {{organisation}}
Members: {{members}}
{{#constitution_notes}}
<constitution_notes>
{{constitution_notes}}
</constitution_notes>
{{/constitution_notes}}
{{#agm_date}}AGM date: {{agm_date}}{{/agm_date}}
</context>

<task>
1. Rules this AGM must follow: summarise what the constitution notes say about notice, quorum, voting rights, elections and changing the constitution. For anything not given, write "check your constitution" and describe the common pattern labelled clearly as common practice, not a rule. If the group may be a registered charity, a company or a co-operative, note that its regulator may set extra requirements to check.
2. Timeline: working back from the AGM date (or as weeks before it), list when to book the venue, get the accounts examined, call for nominations and motions, send the notice and papers, prepare reports, and confirm the chair for the meeting.
3. Notice of AGM: a ready-to-send notice with date, time, place (and online joining details if hybrid), the agenda, how to nominate and submit motions with deadlines, who can vote, proxy arrangements if the constitution allows, and accessibility information.
4. Agenda: a timed agenda that fits about 60 to 90 minutes: welcome and apologies, quorum confirmed, minutes of the last AGM and matters arising, chair's report, treasurer's report and accounts, adoption of accounts, appointment of the examiner, elections of officers and committee, motions, any other business only if the constitution allows it, close.
5. Reports: an outline for the chair's report (what we did, what we achieved, what is next, thanks) and the treasurer's report (income, spending, balance, reserves, what members should notice), each readable in five minutes.
6. Elections: how to collect nominations with proposer and seconder if required, what to do if a post is uncontested or has no candidates, how to run a contested vote (show of hands or secret ballot), and who counts.
7. Motions: for each motion mentioned, the wording drafted clearly, whether it is an ordinary or special resolution under the constitution notes, and the majority needed; if the notes are silent, say to check.
8. Quorum and voting: calculate the quorum from the constitution notes and {{members}} members, show the arithmetic, and give a plan if the meeting is not quorate (what the constitution says about adjournment, or "check your constitution").
9. Minutes template: headings that match the agenda, with spaces for attendance, apologies, quorum confirmation, each decision with votes for, against and abstaining, and actions with owners.
10. After the AGM: send minutes, update the bank mandate and contact details for new officers, file any annual return with a regulator if applicable, hand over records to new officers.
11. Before answering, check every number (quorum, notice days, majorities) against the constitution notes and mark any figure not taken from them as common practice to verify.
</task>

<constraints>
- The constitution governs. Never present a notice period, quorum or majority as a rule unless it came from the constitution notes.
- Do not give legal advice on charity or company law; flag where the regulator or a legal adviser should be checked.
- Do not invent officers' names, figures from the accounts or motion details; use placeholders.
- Keep member-facing documents short, plain and welcoming, so people actually come.
- Chairing skills on the night (handling interruptions, keeping order) are out of scope beyond a short note; keep the focus on planning and paperwork.
</constraints>

<output_format>
## Rules this AGM must follow
Table: Topic | What the constitution says | Source (constitution or "common practice - check").
## Timeline
Table: When | Task | Who.
## Notice of AGM
Ready to send, in a quote block.
## Agenda
Timed list.
## Reports
Two short outlines.
## Elections
## Motions
## Quorum and voting
Show the calculation.
## Minutes template
## After the AGM
Checklist.
</output_format>
