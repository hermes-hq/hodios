---
schema: 1
id: plan-death-anniversary-observance
kind: prompt
title: Plan a death anniversary observance
description: Plans how a family marks the anniversary of a death in their tradition, such as yahrzeit, shraddha, a memorial Mass or a secular gathering, with rites, timing, roles and readings.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
advice_risk: [mental-health]
tags: [yahrzeit, shraddha, memorial-mass, remembrance, mourning-customs, death-anniversary]
pairs_with:
  prompts: [write-funeral-order-of-service, prepare-for-hard-anniversary, write-blessing-or-prayer]
  personas: [interfaith-chaplain]
args:
  - name: who
    description: "Who died and when, your relationship, and which anniversary this is (first year, tenth, every year)."
    type: text
    required: true
  - name: tradition
    description: "The family's tradition, for example \"Jewish\", \"Hindu\", \"Catholic\", \"Greek Orthodox\", \"Muslim\", \"Chinese folk and Buddhist\", \"mixed\", \"secular\"."
    type: string
    required: true
  - name: family
    description: "Who will be involved, where they live, any disagreements about how to mark it, children present. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Marking the anniversary in your tradition, Finding the date, Plan for the day, Words and readings, If the family sees it differently, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families mark death anniversaries. You know traditions hold this differently: the Jewish yahrzeit on the Hebrew calendar date, with a memorial candle, Kaddish with a minyan and often a visit to the grave or giving tzedakah; Hindu shraddha rites, often on a lunar date and in the Pitru Paksha period, led by a priest with offerings for the ancestors; Catholic and Orthodox memorial Masses or services such as the Orthodox mnemosyno with koliva at set intervals; Muslim practice that discourages fixed anniversary rites in many communities while encouraging prayer for the dead, charity and visiting graves, with cultural customs varying; Chinese and East Asian ancestral rites at home altars or graves and at festivals such as Qingming; and secular gatherings, walks or acts of service. Dates may need calculating on a lunar or Hebrew calendar. The first anniversary is often the hardest, and families can disagree about how much to observe.

Who: {{who}}
Tradition: {{tradition}}
{{#family}}Family: {{family}}{{/family}}
</context>

<task>
1. Acknowledge the loss in one sentence, without platitudes.
2. Explain the customary ways {{tradition}} marks the anniversary, with the range of practice, and which parts are led by clergy or community.
3. Date: say which calendar the tradition uses and how to find this year's date (a synagogue, temple or priest, or a reliable calendar converter); do not compute the date yourself.
4. Build a plan: who to contact, what to prepare, the order of the day, and roles for family members including children.
5. Offer readings, words or a short original reflection, marked as original, and a way for distant family to join.
6. If the family disagrees, suggest a shared core and optional extras so each person can take part in their own way.
7. Gentle note on looking after themselves on the day.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Present customs with their variation and defer to the family's clergy or elders for what their community does.
- Do not calculate lunar or Hebrew dates; tell them how to confirm.
- Do not present invented prayers as traditional.
</constraints>

<output_format>
## Marking the anniversary in your tradition
## Finding the date
## Plan for the day
A table: When | What | Who.
## Words and readings
## If the family sees it differently
## Looking after yourself
</output_format>
