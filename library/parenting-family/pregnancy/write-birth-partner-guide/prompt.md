---
schema: 1
id: write-birth-partner-guide
kind: prompt
title: Write a birth partner guide
description: Writes a practical guide for a birth partner covering their role in labour, comfort measures, speaking up for the birth preferences, when to call the unit and the first hours after.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, explanation]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [birth-partner, labour, birth-plan, doula, support-person]
pairs_with:
  prompts: [write-birth-preferences, plan-labour-day-logistics]
args:
  - name: situation
    description: Who is giving birth and who the birth partner is (partner, friend, parent, sibling), where the birth is planned, the country, and anything relevant such as first baby, a planned caesarean or induction, language needs, or the birth partner's worries ("faints at blood", "never been to a birth").
    type: text
    required: true
  - name: birth_preferences
    description: The birth preferences sheet or the main wishes, if written. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your job in one paragraph, Before the day, Early labour at home, At the birth place, Speaking up, Straight after the birth, Call the maternity unit if, Look after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write guides for birth partners the way an experienced doula briefs them. A birth partner's main jobs are steady presence, practical comfort, protecting the room (quiet, privacy, fewer interruptions) and helping the person giving birth be heard, not making medical decisions or arguing with staff. Most partners are unsure what to do in long early labour, freeze when plans change, and forget to eat. The best help is concrete: "offer a sip of water after every contraction", "ask 'can we have a few minutes to talk about it?'", "your job in theatre is to sit by her head and talk to her". Units differ by country in how many partners are allowed, whether they stay overnight and what they may bring.

<situation>
{{situation}}
</situation>
{{#birth_preferences}}
<birth_preferences>
{{birth_preferences}}
</birth_preferences>
{{/birth_preferences}}
</context>

<task>
1. Your job in one paragraph: what the birth partner is there for and what they are not responsible for, addressed to them by role.
2. Before the day: read the birth preferences together and ask about the top three things that matter; practise comfort measures; know the route and parking; phone charged and numbers saved; their own bag (snacks, change of clothes, charger, cash or card for parking); who looks after other children or pets. Keep it to items the partner owns.
3. Early labour at home: what to do and say, comfort measures (rest between contractions, food and drink, warm shower or bath if they want it, massage, distraction), how to time contractions, and that the maternity unit's advice on when to come in is the rule to follow. Do not state a contraction pattern as an instruction; say to use what their unit told them.
4. At the birth place: protecting the room, practical comfort, encouragement phrases that work and ones to avoid, what to do if labour is long or plans change, and their role if there is an induction, assisted birth or caesarean.
5. Speaking up: the BRAIN questions (Benefits, Risks, Alternatives, Intuition, what if we do Nothing or wait) as a way to ask for information, with calm scripts, and that in an emergency the team needs to act fast and questions can come afterwards.
6. Straight after the birth: skin-to-skin and feeding support, photos and announcements only when the parent agrees, food and rest, and staying with the baby if the baby needs extra care while the parent is being cared for.
7. Call the maternity unit if: the warning signs before or during labour that mean calling straight away.
8. Look after yourself: eating, short breaks when it is safe, what to do if they feel faint, and that feeling scared or helpless is common.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Call the maternity unit or emergency services straight away for: bleeding, waters that are green, brown or smell bad, reduced or no baby movements, constant severe pain between contractions, fever or feeling very unwell, severe headache or vision changes, a strong urge to push before arriving, or the cord or baby appearing. State these in the "Call the maternity unit if" section and do not soften them.
- Do not give medical instructions such as when to push, how long to wait at home or how to manage a birth before help arrives, beyond "call emergency services and follow their instructions".
- Do not make the partner the decision-maker; decisions belong to the person giving birth with the clinical team, unless they cannot speak for themselves and asked the partner to.
- Tailor to who the partner is and their worries; a first-time dad, a grandmother and a best friend need different notes.
- Plain, warm language. Short bullets the partner can read on a phone.
</constraints>

<output_format>
## Your job in one paragraph
## Before the day
Checklist.
## Early labour at home
## At the birth place
## Speaking up
Include two or three scripts.
## Straight after the birth
## Call the maternity unit if
## Look after yourself
</output_format>
