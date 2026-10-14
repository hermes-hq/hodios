---
schema: 1
id: keep-repair-evidence-log
kind: prompt
title: Keep a repair evidence log
description: Turns a tenant's scattered messages, photos and memories about a disrepair problem into a dated evidence log and timeline, shows the gaps, and sets up a routine to keep it going.
category: tenancy
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [notes, message, text]
output: [table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [disrepair, evidence, timeline, tenant-rights, record-keeping]
pairs_with:
  prompts: [request-landlord-repair, write-housing-complaint-to-authority, build-timeline-from-documents]
  personas: [tenant-rights-advisor]
args:
  - name: history
    description: Everything you have about the problem in any order - texts and emails with dates, phone calls you remember, visits by workers, photos and when they were taken, effects on health, belongings and use of rooms, and money spent.
    type: text
    required: true
  - name: country
    description: Country or region, so the log can note which bodies usually look at this kind of evidence. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Timeline, Impact record, Costs and losses, Gaps to fill, Ongoing routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You organise disrepair evidence the way a housing caseworker prepares a file. Whether a tenant ends up asking the council or housing inspector to act, negotiating a rent reduction, defending a claim for arrears or bringing a claim, the questions are the same: when did the landlord know, what did they do, how long did it take, and what did it cost the household. Tenants usually have the evidence spread across phones, inboxes and memory, with dates missing. A log written close to events, with each entry tied to a source (a message, a photo, a receipt, a doctor's note), is far more persuasive than a later summary, and an honest note of what is uncertain protects credibility.

<history>
{{history}}
</history>
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Build a timeline in date order: date (exact or approximate, marked), event, who, how (text, email, call, visit), what was said or done, and the source that proves it. Separate reports by the tenant, responses by the landlord or agent, and visits or works.
2. Build an impact record: rooms affected and how, health effects as reported by the tenant and whether a professional has noted them, effects on children or vulnerable occupants only if the tenant mentioned them, and damage to belongings.
3. List costs and losses with amounts and whether a receipt exists: extra heating, dehumidifier, replaced items, cleaning, time off work.
4. List the gaps: approximate dates to pin down, calls with no written follow-up, photos without dates, and suggest how to fill each (for example sending a confirming email summarising a past call).
5. Set up an ongoing routine: what to record each week, how to photograph (wide shot plus close-up, with something showing scale and date), where to store backups, and sending written follow-ups after every call or visit.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent dates, quotes or events. Mark approximate dates as approximate and unclear facts as unclear.
- Do not overstate health effects or causes; record what the tenant reports and what any professional has said.
- Keep it factual and neutral; no opinions about the landlord's motives in the log itself.
- Mention that the log may be needed by a tenant advice service, council or tribunal, without stating what any of them will decide.
{{> output/uncertainty}}
</constraints>

<output_format>
## Timeline
Table: date, event, who, method, detail, source.

## Impact record
Bullets by room or person.

## Costs and losses
Table: item, amount, date, receipt yes or no.

## Gaps to fill
Bullets with how to fill each.

## Ongoing routine
Short checklist.
</output_format>
