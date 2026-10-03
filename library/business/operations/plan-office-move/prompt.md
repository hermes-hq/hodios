---
schema: 1
id: plan-office-move
kind: prompt
title: Plan an office move
description: Plans a small office move with a backward timeline, IT, internet and phone cutover, furniture and layout, supplier and address changes, staff communication and a day-one checklist.
category: operations
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, manager, founder]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [office-move, relocation, it-cutover, change-of-address, move-timeline, facilities]
pairs_with:
  prompts: [plan-business-continuity, compare-vendors, write-sop]
args:
  - name: current_office
    description: The current office - headcount, equipment (desks, servers, printers, network kit), lease end or exit conditions, internet and phone setup, anything special (lab, stock, safes).
    type: text
    required: true
  - name: new_office
    description: The new office - size and layout, what is already there (cabling, furniture, kitchen), access date, building rules (lift bookings, move hours), distance from the current one.
    type: text
    required: true
  - name: move_date
    description: Target move date or window. Leave empty to get a timeline in weeks before move day.
    type: string
output_contract:
  format: markdown
  sections: [Critical path, Timeline, IT and phone cutover, Layout and furniture, Address and supplier changes, Staff communication, Move day plan, Day-one checklist, Exit from the old office, Risks, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have project-managed many small office moves. The move itself is one day; the risk sits in the long-lead items that people remember too late: the internet line at the new address (which can take weeks to install), the phone numbers, the lease exit and dilapidations at the old office, building access rules, and the dozens of places the old address is registered. Your plan works backwards from move day, puts the long-lead items first, and makes sure that on day one people can log in, take calls and find their desk.
</context>

<task>
Plan this office move.

<current_office>
{{current_office}}
</current_office>

<new_office>
{{new_office}}
</new_office>

Move date: {{move_date}}

1. Critical path: list the items with the longest lead times or hard dependencies (internet installation, lease exit and notice, landlord or building approvals, furniture delivery, cabling, phone number transfer) and the latest safe date for each. If the move date is empty, express dates as weeks before move day.
2. Timeline: a backward plan from about 12 weeks out (or from now, if the date is closer, flagging what is already at risk) to two weeks after the move.
3. IT and phone cutover: internet at the new site live and tested before move day, network and wifi, server or shared storage, printers, phone number transfer and divert, backups taken before anything is unplugged, labelling of every device and cable, who reconnects what, and a rollback if the new line is not ready (mobile hotspots, staying an extra day).
4. Layout and furniture: seating plan approach, what moves, what is sold or recycled, what is bought, and deliveries timed after cabling and before staff arrive.
5. Address and supplier changes: a checklist of places to update (registered address with the relevant authority, bank, insurers, utilities, website and maps listings, email signatures, invoices and stationery, suppliers, couriers, customers, mail redirection).
6. Staff communication: what to tell staff and when, packing instructions, what each person is responsible for, and day-one arrangements (access cards, parking, where things are).
7. Move day plan: hour by hour, with the move lead, the mover, IT and the building contact.
8. Day-one checklist: tests to run before staff arrive and in the first hour.
9. Exit from the old office: notice, clearing, cleaning, dilapidations and handover of keys, with photos and meter readings.
10. Risks: top five with a mitigation each.
</task>

<constraints>
- Do not state installation lead times, notice periods or legal requirements as fact; give typical ranges labelled as assumptions and say who to confirm with (internet provider, landlord, lease, local authority).
- Never plan to unplug a server or shared storage without a verified backup.
- Keep the plan to the size of this office; do not add roles or tools it does not need.
- If the move date leaves too little time for a critical item, say so plainly at the top and give options.
</constraints>

<output_format>
## Critical path
Table: Item | Lead time (assumed) | Latest safe date | Owner.
## Timeline
Table: Week | Tasks | Owner.
## IT and phone cutover
Numbered steps plus a rollback.
## Layout and furniture
## Address and supplier changes
Checklist.
## Staff communication
Table: When | Message | Channel.
## Move day plan
Table: Time | Task | Who.
## Day-one checklist
Checklist.
## Exit from the old office
Checklist.
## Risks
Table: Risk | Mitigation.
## Questions
At most five.
</output_format>
