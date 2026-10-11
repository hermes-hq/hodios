---
schema: 1
id: write-commemoration-speech
kind: prompt
title: Write a commemoration speech
description: Writes a speech for a remembrance day, memorial unveiling or anniversary of a tragedy that honours those remembered, fits the ceremony and avoids politicising or sensationalising.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, executive, teacher, manager]
subject: [public-sector]
requires: [none]
inputs: [notes, document]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [remembrance, memorial-unveiling, commemoration, civic-ceremony, anniversary]
pairs_with:
  prompts: [mark-up-script-for-delivery, write-opening-or-closing-remarks]
args:
  - name: ceremony
    description: The ceremony, place and your role, for example "Remembrance Sunday at the village war memorial, I'm the parish council chair", "10th anniversary of the factory fire, I'm the union rep", "unveiling a plaque to a local nurse".
    type: string
    required: true
  - name: material
    description: "Who or what is remembered, verified facts (names, dates, numbers) and their source, who will be present (families, survivors, veterans, officials, schoolchildren), the ceremony's fixed parts (silence, wreaths, readings, anthem), and anything contested or sensitive."
    type: text
    required: true
  - name: minutes
    description: Time allowed. Ceremony speeches are usually 3 to 6 minutes.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Speech, Length, Place in the ceremony, Facts to verify, Sensitivities]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Commemoration speeches are given at fixed rituals (a silence, the laying of wreaths, the reading of names, a plaque unveiling) in front of people whose loss is personal: families, survivors, veterans, colleagues. They are judged on accuracy and restraint. The strongest ones make the remembered people specific again (a name, an age, a job, one detail from a letter or record) rather than speaking only in large numbers, connect them to the place and the people standing there now, and end with a line that leads into the ritual. The common failures are getting a name, date or figure wrong in front of the families; using the occasion to argue a current political point, assign blame where it is still contested or before an inquiry has finished; graphic description that retraumatises survivors; and generic phrases ("they gave their today for our tomorrow") that could be said anywhere. Different traditions and countries have set forms of words, order and religious content for these days; the organisers usually know them.
</context>

<task>
Write a commemoration speech for: {{ceremony}}. Time: {{minutes}} minutes.
<material>
{{material}}
</material>

1. If you have no verified facts about who or what is remembered, or do not know who will be present, ask for those and stop.
2. Choose one or two specific people or details from the material to make the remembered human: a name, an age, a job, words they left. Use only what is given and its source.
3. Structure: an opening that names why we are here and where; the remembered, specifically; what the place or community has done since (the material decides this); what we owe them now in a sentence that does not take a political side; a closing line that leads into the ritual (the silence, the wreaths, the unveiling).
4. Fit the fixed parts of the ceremony: show where the speech sits and the cue line for the next part.
5. Write for outdoors or a large space: short sentences, slow pace (about 110 words per minute), [pause] marks, and no lines that depend on slides.
6. Note anything contested or traumatic in the material and how the speech handles it.
</task>

<constraints>
- Never invent names, numbers, quotations, ranks or dates. Every fact used should come from the material; list each in Facts to verify.
- Do not assign blame, take sides on contested causes or ongoing inquiries, or use the event to promote a party, organisation or policy.
- No graphic detail of deaths or injuries.
- Use the set wording, readings or religious content only if the user supplies them; otherwise mark `[set wording, if any]` and leave it to the organisers.
</constraints>

<output_format>
## Speech
Full text with [pause] marks and the cue line into the next ritual.
## Length
"N words, about M minutes at 110 words a minute".
## Place in the ceremony
Where the speech sits in the order, and what comes before and after.
## Facts to verify
Every name, number, date and quote used, with the source the user gave.
## Sensitivities
Anything contested or painful and how the speech handles it.
</output_format>
