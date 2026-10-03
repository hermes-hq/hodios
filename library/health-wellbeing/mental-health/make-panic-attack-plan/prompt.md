---
schema: 1
id: make-panic-attack-plan
kind: prompt
title: Make a panic attack plan
description: Makes a personal one-page panic attack plan with early signs, grounding steps for during an attack, what helps afterwards, and when to seek medical or crisis help instead.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [mental-health, medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [panic-attacks, grounding, anxiety, coping-card, safety-plan]
pairs_with:
  prompts: [guide-breathing-exercise, build-coping-plan, manage-event-anxiety, talk-to-doctor-about-mental-health]
  personas: [supportive-listener]
args:
  - name: typical_triggers
    description: When attacks tend to happen and what they feel like, for example "on the train or in supermarkets, heart pounding, feel like I can't breathe", "at night out of nowhere". Optional.
    type: text
  - name: what_helps
    description: Anything that has helped before, even a little, for example "cold water on my face", "my sister talking me through it", "counting things I can see". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Get medical help first if, My early signs, During an attack, Afterwards, Between attacks, Getting support]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write a short, personal plan for panic attacks that they can keep on their phone or in a wallet. You know the core facts: a panic attack is a surge of intense fear with physical symptoms (racing heart, breathlessness, dizziness, tingling, chest tightness, feeling of unreality) that usually peaks within about ten minutes and passes; it feels dangerous but is not harmful in itself; fighting it or fleeing tends to feed the fear of the next one, while riding it out teaches the body it is survivable. You also know that some symptoms overlap with medical emergencies, so a first attack, or symptoms that are different from usual, need medical assessment.

{{#typical_triggers}}
<typical_triggers>
{{typical_triggers}}
</typical_triggers>
{{/typical_triggers}}
{{#what_helps}}
<what_helps>
{{what_helps}}
</what_helps>
{{/what_helps}}
</context>

<task>
1. Get medical help first if: write this section before anything else. Call emergency services for chest pain that is crushing, spreads to the arm, jaw or back, or comes with sweating or vomiting; fainting; trouble breathing that does not ease; signs of a stroke; or symptoms that feel different from their usual attacks. Say that if they have never been checked by a doctor for these symptoms, they should be, so that other causes (heart, thyroid, asthma, medicines, caffeine or other substances) can be ruled out.
2. My early signs: from their description, list the first body and thought signals so they can act early. If they gave none, list common ones and mark them as examples to tick.
3. During an attack: four to six numbered steps written in the first person, short enough to read while panicking. Include naming it ("this is a panic attack, it will peak and pass"), slow breathing with a longer out-breath (about 4 in, 6 out) without forcing deep breaths, a grounding technique (5-4-3-2-1 senses, feet on the floor, cold water), staying where they are if safe instead of escaping, and letting the sensations rise and fall. Put what already helps them first, in their words.
4. Afterwards: what to do in the next hour (rest, drink water, avoid alcohol and caffeine, a kind sentence to themselves, a two-line note of what happened).
5. Between attacks: three things that lower the chance or fear of the next one: noticing avoidance and gently returning to places they now avoid, regular sleep and movement, cutting back caffeine, and practising the breathing when calm.
6. Getting support: a doctor if attacks are frequent, they avoid places because of them, or they worry constantly about the next one; talking therapies such as CBT are effective for panic. One person to tell, with a line they can text: "I'm having a panic attack, can you call me and talk about anything for ten minutes?"
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never tell someone their chest pain or breathlessness is "just panic"; the medical section always comes first.
- Never suggest medicines, doses, alcohol or breathing into a paper bag.
- Keep the during-an-attack steps to one line each, in the first person, plain words.
- The whole plan fits on one phone screen per section; no long explanations.
- Do not invent helpline names or numbers; leave blanks for them to fill with local contacts.
</constraints>

<output_format>
## Get medical help first if
## My early signs
## During an attack
Numbered, first person, one line each.
## Afterwards
## Between attacks
## Getting support
Ends with blanks: My doctor: ____ · Person I can text: ____ · Local crisis line: ____
</output_format>
