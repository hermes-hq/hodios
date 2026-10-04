---
schema: 1
id: write-farm-worker-welcome-pack
kind: prompt
title: Write a farm worker welcome pack
description: Writes a welcome pack for seasonal or new farm workers covering the site, who to ask, hours and pay day, housing rules, emergencies and welfare contacts, in short sentences ready to translate.
category: farming
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, manager, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [seasonal-workers, worker-welfare, plain-language, translation-ready, worker-accommodation]
pairs_with:
  prompts: [write-farm-safety-induction, estimate-harvest-labour-needs]
  workflows: [seasonal-crew-track]
args:
  - name: farm_details
    description: Farm name or a placeholder, what is grown, site layout, start times, pay day and method, who the supervisors are by role, shop and transport options, emergency arrangements and any house rules. Rough notes are fine.
    type: text
    required: true
  - name: worker_languages
    description: Optional. Languages the workers read, so the pack notes which terms to translate first and where pictures help.
    type: text
  - name: accommodation
    description: Whether the farm provides worker housing, so the pack includes a housing section.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Welcome, Your first day, Places on the farm, Who to ask, Hours pay and time off, Housing, Safety and emergencies, Your welfare and rights, Key words, Notes for the employer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write welcome packs for people starting work on a farm, often seasonal workers far from home who may read the pack in a second language or through a translation app. A good pack answers the questions people are too tired or too polite to ask in week one: where do I go, who do I ask, when am I paid and how, what are the house rules, what do I do in an emergency, and who can I talk to if something is wrong. It also protects workers: it says clearly that nobody may charge them for the job or keep their documents, and how to raise a problem without going through the person it is about.

The pack is not the safety induction. It points to the induction and repeats only the emergency basics.

{{#worker_languages}}Worker languages: {{worker_languages}}{{/worker_languages}}
{{#accommodation}}The farm provides worker housing; include the housing section.{{/accommodation}}
</context>

<task>
<farm_details>
{{farm_details}}
</farm_details>

1. Pull every fact from the farm details. Where a detail a worker needs is missing (pay day, address for emergency services, supervisor names or roles, doctor, shop, laundry), insert `[ADD: ...]` rather than inventing it.
2. Write for translation: sentences of 15 words or fewer, one idea each, present tense, "you" form, no idioms, slang or jokes, numbers as digits, times in 24-hour format, dates written out.
3. Write the first-day section as a timed list: where to meet, what to bring and wear, the induction, getting the first tasks.
4. Describe places as a list a map can be drawn from: meeting point, toilets and handwashing, drinking water, break area, first aid kit, assembly point, office, no-go areas.
5. Explain pay plainly: pay day, how pay is calculated (hourly or piece rate and how it is topped up where the law requires it), the payslip and what deductions may appear, each marked `[CHECK locally]`.
6. If housing is provided, write house rules that are fair and specific: rent or charges and how they are taken, cleaning, kitchen and laundry, visitors, quiet hours, repairs, heating, and that workers may leave the job without losing their belongings or documents.
7. Welfare and rights: nobody should pay a fee for this job; your passport and ID stay with you; how to report a problem, including one route that does not go through your supervisor (a named role, and the relevant workers' advice or labour inspection body `[ADD for your country]`); health care access; feeling low or homesick and who to talk to; and, in one plain line, what to do if you feel unsafe, are threatened or hurt, or have thoughts of harming yourself: call local emergency services `[ADD local number]` and tell the welfare contact.
8. Add a key-words list (10-20 farm terms) for translation, and note where a picture or symbol would help.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state wage rates, deduction limits, housing standards or working-time rules as fact; mark each `[CHECK locally]` so the employer confirms it with the relevant authority or adviser.
- Never write rules that restrict workers' freedom of movement, contact with others, or access to their own documents and pay, even if the notes ask for them; flag such requests in the employer notes.
- Respectful tone: workers are adults and skilled people, not a risk to be managed.
- Never write a crisis line number; say "local emergency services" and `[ADD local number]`.
</constraints>

<output_format>
Markdown with the headings in the output contract, each section half a page or less. "Who to ask" as a table: Question | Who | How to reach them. "Your first day" as a timed list. If housing is not provided, write "Housing: not provided by the farm" under that heading. "Notes for the employer" lists every `[ADD]` and `[CHECK locally]` item and translation tips.
</output_format>
