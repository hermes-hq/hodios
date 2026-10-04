---
schema: 1
id: write-blessing-or-prayer
kind: prompt
title: Write a blessing or prayer
description: Writes an original blessing, grace or prayer for an occasion such as a meal, a new home, a graduation or a hard week, in the requested tradition's forms or as secular words of intention.
category: spirituality
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [topic]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [blessing, grace-before-meals, house-blessing, intention, occasions]
pairs_with:
  prompts: [write-devotional-reflection, plan-prayer-or-meditation-practice, write-funeral-order-of-service]
args:
  - name: occasion
    description: The occasion and anything personal to include, for example "Thanksgiving dinner with three generations", "blessing our new flat", "my daughter's graduation", "a hard week at the hospital".
    type: string
    required: true
  - name: tradition
    description: The tradition to write in, for example "Catholic", "Jewish", "Muslim", "Hindu", "interfaith (mixed table)", or "secular" for words of intention without religious language.
    type: string
    default: secular
  - name: length
    description: "short: about four lines, easy to say aloud. medium: about eight to twelve lines."
    type: enum
    enum: [short, medium]
    default: short
output_contract:
  format: markdown
  sections: [Blessing, About this form, Another option]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write blessings and prayers for real occasions, the kind someone reads aloud at a table, a doorway or a hospital bedside. You know each tradition's forms: Christian collects that address God, give a reason, make a request and close; Jewish blessings built on a set formula; Muslim du'a that begin with praise and blessings on the Prophet; Hindu prayers and shlokas; Buddhist dedications of merit; humanist words of gratitude and intention. Many traditions also have fixed blessings for particular moments (for example the Jewish blessings over bread and wine, or set graces before and after meals), and those should be said in their established wording, not rewritten.

Occasion: {{occasion}}. Tradition: {{tradition}}. Length: {{length}}.
</context>

<task>
1. If the occasion is missing or unclear, ask one question and stop.
2. Decide whether {{tradition}} has a fixed, established blessing for this occasion. If it does, name it, tell them to use their community's wording, and write an original personal prayer to accompany it rather than a replacement.
3. Write an original blessing in the form natural to {{tradition}}, weaving in the specific details of {{occasion}}. For "secular", use gratitude, hope and intention without addressing a deity. For "interfaith", use language people of several faiths and none can say together, and suggest a moment of silence for personal prayer.
4. Keep to {{length}}: short is easy to read aloud in one breath per line; medium can build in two or three movements.
5. Add a line explaining the form used, and give one alternative in a different register (more formal, more personal, or for children).
6. Check before output: no fixed liturgical text has been altered or presented as original; names of God and religious terms are used as the tradition uses them; the details of the occasion are included; it reads well aloud.
</task>

<constraints>
- Use the tradition's forms and names respectfully; do not mix traditions unless asked for an interfaith blessing.
- Do not present invented text as scripture or as a traditional prayer.
- Avoid clichés and anything that could hurt someone present (for example assuming everyone has a family, a job or good health), unless the details given call for it.
</constraints>

<output_format>
## Blessing
The text, laid out in lines.

## About this form
One or two sentences, including any established blessing to say with it.

## Another option
A shorter or differently pitched version.
</output_format>
