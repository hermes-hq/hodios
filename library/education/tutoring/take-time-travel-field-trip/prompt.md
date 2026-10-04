---
schema: 1
id: take-time-travel-field-trip
kind: prompt
title: Take a time-travel field trip
description: Guides a vivid imagined visit to a historical place and moment, describing sights, sounds and daily life, answering questions, and separating evidence from reconstruction.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, parent]
subject: [history]
requires: [none]
inputs: [topic]
output: [conversation, explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [virtual-field-trip, daily-life, immersive-learning, read-aloud, source-tagging]
pairs_with:
  prompts: [talk-to-everyday-person-from-history, practise-chronology]
  personas: [history-tutor]
args:
  - name: place_and_time
    description: Where and when to visit, e.g. "Tenochtitlan, 1519", "a Viking market in York, around 950", "London during the Great Exhibition, 1851".
    type: string
    required: true
  - name: level
    description: primary uses short sentences, lots of senses and gentle handling of hard topics; secondary adds causes, economy and disagreement in the evidence.
    type: enum
    enum: [primary, secondary]
    default: primary
  - name: minutes
    description: Roughly how long the trip should last, including the student's questions. Sets the number of stops.
    type: number
    default: 20
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An imagined visit lets learners picture daily life before they analyse it, and works read aloud to a class or one to one with a child. It should feel like walking through a place, but a good guide also shows how we know: some details come from excavations, documents and pictures, and others are a historian's best reconstruction. The visit is to {{place_and_time}}, for {{level}} learners, in about {{minutes}} minutes.
</context>

<task>
1. **Check the destination.** If {{place_and_time}} is too vague to describe (for example "the olden days"), ask for a place and a rough date, offering two or three options. If it is the scene of an atrocity (a death camp, a massacre), do not stage it as an immersive tour; say why in one sentence and offer a respectful alternative, such as learning from survivor testimony or visiting the same place at another time.
2. **Plan the stops silently.** Choose about one stop per four or five minutes (at least three), each showing a different part of daily life: home, work, food, market, worship, play, transport, power. Prefer ordinary people's lives over only famous buildings.
3. **Arrive.** Set the scene in a few sentences in the second person ("You step off the boat..."), using sight, sound, smell and touch. Tell the traveller the rules: they can ask anything, and they will see two markers:
   - **We know:** evidence from excavation, documents, pictures or objects.
   - **Historians imagine:** a careful reconstruction where evidence is thin.
4. **At each stop:** describe it in a short paragraph with markers, ask the traveller one question that makes them think (predict, compare with today, explain why), respond to their answer and any questions they ask, then move on. Keep each turn short enough to read aloud.
5. **Keep time.** Mention when the trip is about halfway and when the last stop is coming. If questions run long, drop a stop rather than rushing.
6. **Return home** with the closing activities.
</task>

<constraints>
- Do not invent facts, names, prices or quotations and present them as known. Anything you are not sure of goes under "Historians imagine" or is left out.
- Keep it classroom-safe: no graphic violence, and illness, punishment or poverty described honestly but gently at primary level, frankly but without gore at secondary.
- Show diversity of the time and place (rich and poor, women and men, children, different faiths or origins) and avoid stereotypes.
- Avoid modern assumptions: the past had its own logic. When something seems strange, explain why it made sense then.
- The traveller cannot change history or meet famous people in conversation; they observe and ask the guide.
- Before each stop, check: markers present, nothing stated as known that is a guess, content right for {{level}}.
</constraints>

<output_format>
**Arrival:** a short scene and the two markers explained.

**Each stop:**
**Stop N: name of place**
A short descriptive paragraph with **We know** and **Historians imagine** marked inline.
*Your turn:* one question for the traveller.

**Back home:**
- *Postcard home:* a writing prompt asking the traveller to describe three things they saw, and one thing that surprised them.
- *Quick check:* three questions with answers.
- *How do we know?* one real kind of evidence for this place (an excavation, a document type, a painting) they could look up.
</output_format>
