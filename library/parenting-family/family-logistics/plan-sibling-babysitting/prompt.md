---
schema: 1
id: plan-sibling-babysitting
kind: prompt
title: Plan an older sibling babysitting
description: Decides whether and how an older child looks after younger siblings, with a readiness check, a short trial, clear rules, emergency steps, fair pay or thanks, and limits so it stays fair.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [older-sibling, readiness, home-rules, emergency-steps, teen-responsibility, sibling-care]
pairs_with:
  prompts: [plan-child-independence-ladder, write-babysitter-handbook, write-family-emergency-plan]
args:
  - name: children
    description: The older child's age and maturity, the younger children's ages and needs, and how they get on.
    type: text
    required: true
  - name: situation
    description: When and how long the babysitting would be, for example "two hours after school, Tuesdays" or "occasional evening out".
    type: text
    required: true
  - name: country
    description: Country or region, as some places have guidance or rules on minimum ages for leaving children alone or in a sibling's care. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Is this the right fit, Readiness check, Start small, The rules sheet, Emergency steps, Fairness for the sitter, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents decide whether an older child should look after younger siblings, and set it up safely if so. Readiness depends more on maturity than age: whether the older child stays calm, follows rules when no adult is there, can handle the specific younger children (a baby is very different from a 9-year-old), and wants to do it. Some countries or regions have guidance, and occasionally law, on leaving children alone or in the care of a minor, and parents can be held responsible if something goes wrong. The common failures are starting with too long a stretch, giving the sitter responsibility without authority (siblings who will not listen), no plan for emergencies, and quietly turning a teenager into unpaid permanent childcare at the cost of their own homework, friends and rest.

<children>
{{children}}
</children>
Situation: {{situation}}
{{#country}}Country or region: {{country}}{{/country}}
</context>

<task>
1. Is this the right fit: weigh the ages, the length and timing in {{situation}}, and the youngest child's needs, and say plainly if it is not a good fit yet (for example a young teen caring for a baby or a child with complex medical needs). Flag that local guidance on ages should be checked for {{country}} or the user's location, without stating thresholds as fact.
2. Readiness check: questions about the older child (how they handle stress, whether they want to, first-aid knowledge, how siblings respond to them), and suggest a babysitting or first-aid course where available.
3. Start small: a trial ladder: a short time with a parent nearby, then a short time with a parent out but close, then the target situation, with what to review after each.
4. The rules sheet: a one-page sheet for the sitter and siblings: what everyone is allowed to do, food and kitchen limits (no cooking on the hob at first), doors and visitors, screens, bedtime, and that the sitter's instructions count.
5. Emergency steps: who to call and in what order, what to do for common situations (a fall, a fire alarm, someone at the door, a sibling refusing to cooperate, the parent not answering), and when to call emergency services.
6. Fairness for the sitter: pay or another form of thanks, a limit on how often, protection of their homework and social time, and the right to say no.
7. Review: check-ins with the sitter and the younger children separately after the first few times.
</task>

<constraints>
- Do not state legal ages or rules as fact; say where to check.
- Never recommend a minor be sole carer for a baby, a child with serious medical needs, or overnight, unless the parent has clearly assessed it and local guidance allows; flag the risks plainly.
- Treat the older child's willingness as essential.
- Use [placeholders] for contacts not given.
</constraints>

<output_format>
## Is this the right fit
## Readiness check
Checklist.
## Start small
Numbered trial steps.
## The rules sheet
Printable sheet in a code block.
## Emergency steps
## Fairness for the sitter
## Review
</output_format>
