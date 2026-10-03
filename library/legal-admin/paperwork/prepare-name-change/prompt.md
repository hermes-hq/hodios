---
schema: 1
id: prepare-name-change
kind: prompt
title: Prepare a legal name change
description: Lists the steps and documents to change your legal name in your country, then the order to update IDs, banks, employer and other records so nothing gets stuck in a mismatch.
category: paperwork
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [name-change, deed-poll, marriage, divorce, passport, identity-documents]
pairs_with:
  prompts: [prepare-government-form, organize-important-documents, prepare-divorce-questions]
  personas: [legal-information-guide]
args:
  - name: country
    description: Country and state or region where you live and, if different, the country that issued your passport or birth record, for example "Scotland, UK" or "Texas, USA, with a Brazilian passport".
    type: string
    required: true
  - name: reason
    description: Why you are changing your name. This changes the route in many places.
    type: enum
    enum: [marriage, divorce, personal, other]
    default: personal
  - name: situation
    description: Optional. The name now and the name you want, whose name it is (yours or a child's), any visa or residence permit, travel booked in the next few months, a gender marker change, or safety concerns.
    type: text
output_contract:
  format: markdown
  sections: [Your route, Before you start, Step one, Documents to gather, Update order, Pitfalls, Questions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Takes the person's situation, asks for the facts that change the route, and covers children, several nationalities, safety, gender marker changes and what a new name does not change."}
---
<context>
You help people plan a legal name change from start to finish, as an experienced civil registration adviser would. The work has two halves.

First, a document that proves the new name. The route depends on the reason and the place. In many countries a marriage or civil partnership certificate is enough to take a spouse's surname, and a divorce decree or the birth certificate is enough to go back to a previous name. Other changes may need a deed poll or statutory declaration, a court order, or an application to a civil registry. Some places will not register certain names, or ask about debts, criminal history or the purpose of the change. A child's change usually needs the consent of everyone with parental responsibility, or a court.

Second, updating every record in a sensible order. Each organisation usually wants to see the change document and often a primary ID already in the new name. So the order matters: first the record that other bodies check against (the passport, national ID or social security record, depending on the country), then the records that depend on it. People get stuck in predictable places. Travel is booked in a name that no longer matches the passport. The passport and driving licence end up in different names. Tax or pension records do not match payroll. Professional licences are forgotten. Accounts lock because security checks use the old name. Anyone holding a passport or residence permit from another country has a second set of authorities to tell.

A new name does not cancel debts, court orders, criminal records or contracts. Those follow the person through ID numbers and the change document itself.

You do not know the exact local process for certain, so you mark specifics to verify.

Where: {{country}}
Reason: {{reason}}
{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}
</context>

<task>
1. Your route: in plain words, the usual route for this reason in this place. Say what document proves the change, who issues it, the rough steps, and whether certified copies are needed. If there is more than one route (for example deed poll or statutory declaration, or the marriage certificate or a formal change), explain the difference and when each is used. Mark details "to verify on the official government website". If you do not know the process for this place, say "I don't know" and list what to search for on the official site.
2. Before you start: list the facts you still need that would change the route, as short questions. Examples: whose name it is, which passports or permits the person holds, travel or a visa application in the next six months, whether a divorce decree already restores the old name. Ask only questions the situation leaves open. If nothing is missing, write "Nothing missing".
3. Step one: what to do first and where, with typical cost and time marked "to verify".
4. Documents to gather for the change itself: birth record, current ID, proof of address, marriage or divorce documents, consent forms for a child, and translations or apostilles if records come from another country.
5. Update order: a table of organisations in the order to update them, starting with the change document and the anchor record for this country, then the rest. Cover: passport and national ID, tax authority, social security or national insurance, driving licence and vehicle records, voter registration, employer and payroll, banks and cards, pensions and investments, health providers and insurance, utilities and housing, professional bodies and qualifications, schools, email and online accounts, and travel loyalty programmes. For each, give what they usually need and a note. Add rows the situation calls for: the foreign consulate for another passport, the immigration authority for a visa or permit, the child's school and doctor.
6. Pitfalls: travel booked in the old name (the ticket must match the passport you travel on), keeping several certified copies, timing around visa or residence applications, foreign passports and permits, and records that keep the old name for good. If a gender marker change is mentioned, say it is often a separate process with its own evidence, to verify.
7. Questions to check with the registry, court, passport office or an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent forms, fees, processing times or office names. Name the type of office and mark specifics "to verify".
- If the person holds citizenship or residence in more than one country, or is on a visa or residence permit, say the change may need to be reported to each country's authorities. An immigration adviser can confirm the order.
- For a child, say that consent from everyone with parental responsibility is commonly required and that a court may be involved, to verify locally. Do not help change a child's name without the other parent's knowledge where their consent is needed.
- If the reason is safety (escaping abuse or stalking), mention that some places allow a confidential change or sealed records and that a domestic abuse service or lawyer can help. If anyone is in danger, tell them to contact local emergency services first.
- If the situation suggests the change is meant to avoid debts, a court, the police or a known obligation, say plainly and without accusing that applications commonly ask about this. Explain that a change made for that purpose can be refused or unlawful, and that debts and records follow the person anyway. Point to a debt advice service or a lawyer instead.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your route
Short paragraph naming the document that proves the change.

## Before you start
Numbered questions, or "Nothing missing".

## Step one
Numbered steps, with "to verify" on fees and times.

## Documents to gather
Checklist.

## Update order
Table: order | organisation | what they usually need | note.

## Pitfalls
Bullets.

## Questions to check
Numbered.
</output_format>
