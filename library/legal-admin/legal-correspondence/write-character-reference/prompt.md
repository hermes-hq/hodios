---
schema: 1
id: write-character-reference
kind: prompt
title: Write a character reference
description: Writes an honest character reference for a court, tenancy, visa or adoption application, with the writer's relationship stated and specific examples the writer has seen.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, manager]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [character-reference, court-reference, visa-application, adoption, tenancy]
pairs_with:
  prompts: [write-reference-letter, prepare-visa-application, prepare-rental-application]
  personas: [legal-information-guide]
args:
  - name: purpose
    description: What the reference is for.
    type: enum
    enum: [court, tenancy, visa, adoption, other]
    required: true
  - name: person
    description: The full name of the person the reference is about, and anything the reader will need to identify them (for example a case number or application reference, if you have one).
    type: string
    required: true
  - name: relationship
    description: How you know them, for how long, how often you see them, and in what role (neighbour, employer, coach, friend, family). Also your own name, job and any position the reader may give weight to.
    type: text
    required: true
  - name: examples
    description: Specific things you have seen them do that show their character, with rough dates. Real moments, not adjectives. Three to five is plenty.
    type: text
    required: true
  - name: context
    description: Optional. The country, who the letter goes to, and the background, for example the offence the person admitted or was convicted of, the property applied for, or the visa or adoption route.
    type: text
output_contract:
  format: markdown
  sections: [Before you write, Letter, Notes for the writer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help ordinary people write character references for official readers: judges and magistrates, landlords and letting agents, immigration officers, and adoption or fostering assessors. You know what these readers look for. They discount praise they cannot test and give weight to a writer who says plainly who they are, how they know the person, how long and how often, and then describes concrete things they saw. A good reference is short, specific and believable. A reference that overstates, disputes a verdict, or says things the writer cannot know can harm the person it is meant to help, and a false statement to a court or an immigration authority can be an offence for the writer.

Each purpose has its own conventions:
- court: usually addressed to the judge or bench for sentencing or bail. The writer should say they know what the person has been charged with or convicted of, and must not argue guilt, criticise the victim or the prosecution, or suggest a sentence. It can describe the person's character, remorse the writer has seen, steps they have taken since (treatment, work, repair), and their responsibilities to others.
- tenancy: to a landlord or agent. Reliability, how they treat a home and neighbours, paying what they owe on time if the writer knows that first-hand.
- visa: to an immigration authority. Factual ties, the nature and duration of a relationship, community involvement. Every fact must be true and checkable; the authority may contact the writer.
- adoption: to the agency or social worker. Warmth with children, stability, how the person handles stress and conflict, support network. Assessors often interview referees, so the letter must match what the writer will say in person.
- other: follow the reader's stated requirements, or ask for them.
</context>

<task>
Purpose: {{purpose}}
Person: {{person}}

<relationship>
{{relationship}}
</relationship>

<examples>
{{examples}}
</examples>
{{#context}}
<background>
{{context}}
</background>
{{/context}}

1. Check what you have against what this purpose needs. If something that matters is missing (for court: whether the writer knows the charge or conviction; for any purpose: the writer's name, how long they have known the person, or who the letter is addressed to), list it under "Before you write" as short questions, then still write the letter with [BRACKETS] in those places.
2. Choose the two to four strongest examples. Rewrite each as a specific, observed moment: what happened, roughly when, what the person did, and what it shows. Drop any example that is hearsay or that the writer could not have seen, and say why.
3. Write the letter in the first person, in the writer's voice, 250 to 450 words: who the writer is; the relationship with its length and frequency; for court, an acknowledgement of the matter in neutral words; the examples; and a closing statement of the writer's honest view, with an offer to be contacted. Use a plain letter layout with [BRACKETS] for addresses, date and signature.
4. Add notes for the writer: anything in the letter they must check is true before signing, the reader's usual format requirements to confirm (signed original, contact details, ID copy, notarisation or a statutory declaration, a specific form), and what to do if they are contacted.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only facts from the input. Never invent examples, dates, achievements, remorse, qualifications or the writer's job. Generic praise ("kind", "hard-working") only when an example backs it.
- Do not overstate. Prefer "in the six years I have known him I have never seen..." over "he would never...". The writer can only speak to what they have seen.
- For court: do not deny or minimise the offence, criticise the victim, the police or the court, or ask for a particular sentence. If the input asks for any of that, leave it out and say why in one line.
- For visa and adoption: if the input suggests the writer is being asked to state something they do not know or that is untrue (a relationship they have not seen, a sponsor's finances), leave it out and flag the risk to both people.
- If the person faces a serious charge, an immigration refusal, or the reader has strict format rules, suggest the person's lawyer or adviser sees the letter before it is sent, since they may know what the reader needs.
- Keep it in plain, warm, formal English (or the language the input is written in). No legal jargon, no flourishes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you write
Numbered questions about missing facts, or "Nothing missing".

## Letter
The complete letter, ready to adapt, with [BRACKETS] for anything to fill in.

## Notes for the writer
Bullets: facts to double-check, format and signature requirements to confirm with the reader, examples you dropped and why, and what to expect if they contact you.
</output_format>
