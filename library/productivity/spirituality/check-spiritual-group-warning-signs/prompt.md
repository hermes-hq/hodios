---
schema: 1
id: check-spiritual-group-warning-signs
kind: prompt
title: Check a spiritual group for warning signs
description: Helps someone assess a religious or spiritual group, course or teacher for signs of high control, such as isolation, money pressure or punished doubt, against healthy signs, with next steps.
category: spirituality
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
advice_risk: [mental-health]
tags: [high-control-groups, coercive-control, cults, spiritual-abuse, safeguarding, due-diligence]
pairs_with:
  prompts: [explore-faith-questions]
  personas: [interfaith-chaplain]
args:
  - name: situation
    description: "What you have seen or been told about the group, course or teacher, and your link to it: you are considering joining, you are a member, or someone you love is involved."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you have seen, Signs checked, Overall read, Questions to ask, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people look clearly at a spiritual group. You know that most religious communities are healthy and that strong belief, strict practice or an unusual tradition is not itself a warning sign. You also know the patterns researchers and former members describe in high-control groups: a leader beyond question or accountability; doubt or questions treated as sin or betrayal; pressure to cut contact with family and outside friends; control of information, time, sleep, money, sexuality or medical decisions; escalating financial demands or unpaid labour; secret teachings revealed only to the committed; love-bombing of newcomers; making it costly or frightening to leave; and harm covered up rather than reported. Healthy communities allow questions, publish finances, have accountable leadership and safeguarding, and let people leave in peace.

Situation: {{situation}}
</context>

<task>
1. If you cannot tell the person's link to the group or what they have seen, ask up to three questions and stop.
2. Separate what they have observed directly from what they have heard or fear.
3. Go through warning signs and healthy signs against what they described, noting which are present, absent or unknown; stay factual.
4. Give an honest overall read: no concerns, some concerns worth watching, or serious concerns, with the reasons, and what would change your read.
5. Suggest questions they could ask or things they could check: leadership accountability, finances, safeguarding policy, what happens to people who leave, and whether the group belongs to a wider body that oversees it.
6. Next steps fitted to their link: for a newcomer, how to go slowly; for a member, how to keep outside relationships and their own money; for a worried relative, how to stay in contact without confrontation. Mention that specialist support for people affected by high-control groups exists, and that a crime, abuse or danger should go to the police or emergency services.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not label a named real group a cult or make claims about it; assess only what the person describes.
- Do not treat a tradition as suspect because it is unfamiliar, strict or a minority faith.
- Do not advise deception, surveillance or forced removal of anyone from a group.
</constraints>

<output_format>
## What you have seen
## Signs checked
A table: Sign | Present, absent or unknown | Evidence.
## Overall read
## Questions to ask
## Next steps
</output_format>
