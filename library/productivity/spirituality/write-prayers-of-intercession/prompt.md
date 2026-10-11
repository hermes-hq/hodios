---
schema: 1
id: write-prayers-of-intercession
kind: prompt
title: Write prayers of intercession
description: Writes intercessions or prayers of the people for a service, in the congregation's tradition and form, covering the world, the community and those in need, with responses and care for named people.
category: spirituality
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
requires: [none]
inputs: [notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [intercessions, prayers-of-the-people, liturgy, worship-leading, lay-ministry]
pairs_with:
  prompts: [prepare-sermon-or-homily, write-blessing-or-prayer, write-devotional-reflection]
args:
  - name: service
    description: "The service and congregation: tradition (for example Anglican, Catholic, Methodist, Lutheran, interfaith), the Sunday or occasion, the readings or theme, and any set response your church uses."
    type: text
    required: true
  - name: concerns
    description: "Current concerns to include: world or local news, community events, the sick, the bereaved (with permission to name them), anniversaries. Optional."
    type: text
  - name: length
    description: "short: about two minutes. standard: about four minutes."
    type: enum
    enum: [short, standard]
    default: standard
output_contract:
  format: markdown
  sections: [Intercessions, Notes for the reader]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help lay readers and clergy write intercessions. You know the usual pattern in many churches: the Church and its ministers, the world and its leaders, the local community, those who suffer, the departed, closing with a collect or set ending; each section closes with a versicle and response the congregation knows (for example "Lord, in your mercy / hear our prayer"). Good intercessions are concrete without being a news bulletin, pray for people rather than lecture God or the congregation, avoid taking political sides, are short sentences that read well aloud, and leave silence. Naming the sick or bereaved needs their or their family's permission. Catholic Prayers of the Faithful have their own form and are sometimes set by the parish; some traditions use free prayer instead.

Service: {{service}}
{{#concerns}}Concerns: {{concerns}}{{/concerns}}
Length: {{length}}
</context>

<task>
1. If the tradition or the response the church uses is unclear, use a widely used form and say so.
2. Open with a short invitation to prayer linked to the readings or theme.
3. Write sections for the Church, the world, the community, those in need and the departed, each two to four short sentences, ending with the congregation's response; include {{concerns}} concretely and with compassion.
4. Mark where to pause for silence and where to read names from the parish list, as [names] placeholders.
5. Close with an ending in the tradition's form.
6. Check: fits {{length}} read aloud, no partisan political lines, no names you were not given, nothing that would shame anyone present.
</task>

<constraints>
- Do not take political sides; pray for leaders and for those affected, not for policies.
- Do not name individuals except as given, and remind the reader to have permission for naming the sick or bereaved.
- Do not present invented text as a set liturgical prayer.
- Plain, speakable sentences; no long lists.
</constraints>

<output_format>
## Intercessions
The full text with responses and [pause] marks.
## Notes for the reader
Timing, names to confirm and the response to announce if needed.
</output_format>
