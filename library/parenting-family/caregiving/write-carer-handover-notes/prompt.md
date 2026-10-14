---
schema: 1
id: write-carer-handover-notes
kind: prompt
title: Write carer handover notes
description: Turns a family carer's rough notes into a clear handover for the next family member or helper on the rota, with what changed, what is due, what to watch and what is still waiting for an answer.
category: caregiving
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [notes, text]
output: [summary, checklist, message]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [handover, care-rota, siblings, shared-care, carers]
pairs_with:
  prompts: [build-care-rota, write-care-profile, write-care-update-for-family]
  personas: [eldercare-advisor]
args:
  - name: notes
    description: Your rough notes from your caring stint (days, a weekend, a week), in any order, including how they have been, anything new, appointments, medicines as written on their chart, supplies and loose ends.
    type: text
    required: true
  - name: next_carer
    description: Who takes over and how familiar they are with the routine, for example "my brother, hasn't been for a month". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, What changed, Due during your stint, Watch for, Still waiting on, Supplies and house, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a family carer's rough notes into a handover for the next person on the care rota, the way a good shift lead hands over in a care setting, adapted for families. Family handovers often fail in predictable ways: the outgoing carer is exhausted and tells the story of the week instead of what the next person needs; changes from the doctor or pharmacy are mentioned in passing; appointments and repeat prescriptions fall between two people; and promised call-backs are never chased because nobody knows they are pending. A good handover leads with anything urgent or changed, separates facts from impressions, gives the next person dated tasks and named people to call, and says what normal looks like so they can notice a change. The care profile holds the stable facts; the handover holds what is new.

<notes>
{{notes}}
</notes>
{{#next_carer}}Next carer: {{next_carer}}{{/next_carer}}
</context>

<task>
1. Headline: two or three lines on how the person is overall compared with their normal, and anything the next carer must know in the first hour.
2. What changed: new or changed medicines exactly as written in the notes, new symptoms or behaviour with dates, new equipment, changes to routines or to helpers, each marked as fact or impression.
3. Due during your stint: a dated list of appointments, medicines to collect or reorder, visits, bills or calls, with who to contact.
4. Watch for: what is normal for them now, and what change would mean calling the doctor, care team or emergency services, using only warnings the notes or their care team gave plus general red flags.
5. Still waiting on: call-backs, test results, referrals and decisions pending, with who promised what and when to chase.
6. Supplies and house: stock levels, food, keys, anything broken or booked.
7. Questions to check: anything in the notes that is unclear or contradictory, such as a medicine name or time, for the outgoing carer to confirm before leaving.
Then a short version in a code block sized for a family group chat.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy medicine names, doses and times exactly as given; never fill gaps or correct them, list unclear ones under Questions to check.
- Do not add facts that are not in the notes; leave sections short or say "nothing noted" when empty.
- Keep the person's dignity and privacy; the chat version leaves out intimate detail.
- If the notes describe an urgent warning sign happening now, put it at the very top and say to contact the doctor or emergency services before handing over.
</constraints>

<output_format>
## Headline
## What changed
## Due during your stint
Table: Date | What | Who to contact.
## Watch for
## Still waiting on
## Supplies and house
## Questions to check
Then the group-chat version in a code block.
</output_format>
