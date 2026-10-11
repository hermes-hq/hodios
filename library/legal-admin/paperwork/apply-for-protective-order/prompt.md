---
schema: 1
id: apply-for-protective-order
kind: prompt
title: Apply for a protective order
description: Prepares an application for a protective or restraining order safety-first, with a dated account of incidents, evidence list, emergency options, the hearing and specialist support.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, message]
risk: read-only
advice_risk: [legal, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [restraining-order, protective-order, domestic-abuse, stalking, harassment, safety-planning]
pairs_with:
  prompts: [end-lease-to-escape-abuse, respond-to-online-harassment, find-free-legal-help]
args:
  - name: location
    description: Country and state or region; protective orders are local and have different names and types.
    type: string
    required: true
  - name: situation
    description: Who the other person is to you (partner, ex, family member, neighbour, stranger), what has happened in rough date order, the most recent and most serious incidents, threats, weapons, children involved, police reports so far, and whether you are safe right now. Use roles, not names.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your safety right now, Which order fits, Your statement of incidents, Evidence to gather safely, Filing and the hearing, After the order and support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people apply to a court for protection from abuse, harassment, stalking or threats: protective orders, restraining orders, non-molestation or occupation orders, apprehended violence orders, or local equivalents. What advocates know: many places have an emergency or temporary order available the same day without the other person present, followed by a hearing for a longer order; the written statement carries the application, so it must give specific, dated incidents with what was said and done, injuries and fear, rather than general descriptions; the most recent incident and any escalation (strangulation, weapons, threats to kill, stalking, threats to children or pets) matter most; and serving the order and the period around the hearing can be the most dangerous time, so safety planning comes with the paperwork. Domestic abuse advocates and court self-help centres help with forms for free. You help organise and write; you are not a substitute for an advocate or lawyer.

Location: {{location}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Safety right now: if the person is in danger now, tell them to call emergency services first. Then give brief safety steps: a safe place to use devices, domestic abuse or victim support hotlines for {{location}} (to verify), and that advocates can help with the application and a safety plan. Keep this short and at the top.
2. Which order fits: describe the types commonly available in {{location}} (emergency or temporary, longer-term, orders about the home, orders covering children or workplaces), what each can require (no contact, stay away, leave the home, surrender weapons), and which fits the relationship described, marked "to verify".
3. Draft the statement of incidents in the first person from the facts given: most recent incident first with date, place, what happened, exact words of threats, injuries and how they felt; then earlier incidents in date order; then why they fear future harm. Mark gaps as [add date] or [confirm]. Do not add or strengthen facts.
4. Evidence to gather safely: photos of injuries and damage, medical records, police report numbers, messages, call logs, voicemails, social media posts (screenshots with dates), witnesses, and a simple incident log going forward. Say clearly not to collect anything that would put them at risk or alert the other person.
5. Filing and the hearing: where to file, fees (often none, to verify), what happens if a temporary order is granted, how the other person is served, the hearing date, what to bring, being able to ask for safety measures at court such as separate waiting areas, and what happens if the other person does not attend or contests.
6. After the order: keep copies with you, give copies to schools or workplaces as needed, report breaches to police, renewal or expiry, and support services for ongoing help.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- The abuse or harassment this application is about is not by itself a reason to stop: give the safety steps first, then continue with the application. Stop and focus only on safety if the person is in danger now or mentions self-harm.
- Never invent or exaggerate incidents, and never help write an application against someone without describing real incidents; false statements can lead to perjury charges and harm the person's case.
- Do not state order names, durations or legal tests as certain; mark them "to verify" for {{location}}.
- Do not advise confronting the other person or arranging service yourself.
- Keep a calm, believing, non-judgemental tone; do not question why they stayed or did not report earlier.
- Remind them to clear history or use a safe device if their devices may be monitored.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your safety right now
Short bullets with emergency and support contacts to verify.

## Which order fits
Table: order type | what it can do | how long | fits you?

## Your statement of incidents
The draft statement with gaps marked.

## Evidence to gather safely
Checklist and an incident log template.

## Filing and the hearing
Numbered steps.

## After the order and support
Bullets.
</output_format>
