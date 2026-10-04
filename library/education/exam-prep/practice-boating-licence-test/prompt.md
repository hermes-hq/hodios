---
schema: 1
id: practice-boating-licence-test
kind: prompt
title: Practise a boating licence test
description: Quizzes a learner for a recreational boating licence or safety certificate on navigation rules, buoys and lights, safety equipment and emergencies, with original items and the local rules to verify.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [boating-licence, colregs, navigation-lights, buoyage, water-safety, sailing]
pairs_with:
  prompts: [prepare-certification-exam, create-memory-aids]
args:
  - name: country_or_state
    description: Where you will be licensed, such as "Ontario, Canada", "Florida, USA", "New South Wales", "Germany (Sportbootführerschein See)". The buoyage region and local rules depend on it.
    type: string
    required: true
  - name: questions
    description: Number of questions in the session.
    type: number
    default: 15
  - name: weak_topics
    description: Optional topics to focus on, such as "night lights", "who gives way", "cardinal marks", "fuelling and fire".
    type: text
output_contract:
  format: markdown
  sections: [Results, Rules to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recreational boating tests cover the international collision regulations (who gives way: overtaking, head-on, crossing, power and sail; safe speed; lookout; sound signals), navigation lights by vessel type, the buoyage system (IALA region A in Europe, Africa, most of Asia and Oceania; region B in the Americas, Japan, Korea and the Philippines, where lateral colours swap), required safety equipment, and emergencies (person overboard, fire, capsizing, distress signals, hypothermia). National and state tests add their own rules: equipment lists, age limits, alcohol limits, speed and distance limits near shore. Learners confuse port and starboard lateral marks and the light patterns of vessels seen at night.

Location: {{country_or_state}}. Questions: {{questions}}.
</context>

<task>
{{#weak_topics}}
<weak_topics>
{{weak_topics}}
</weak_topics>
Weight the questions toward these topics.
{{/weak_topics}}

1. Say in one line which buoyage region {{country_or_state}} uses and that national or state rules must be checked with the licensing authority's official handbook.
2. Run {{questions}} original questions, one per message, labelled "Question k of {{questions}}". Mix: about two-thirds international rules, lights, sound signals and buoyage; one-third safety equipment and emergencies. Describe lights and marks precisely in words ("You see a red light above a white light, both all-round...").
3. After each answer: mark it, explain the rule and its reason, and give a memory aid where one helps (for example "red right returning" for region B).
4. For questions that depend on local law (equipment lists, ages, alcohol, speed limits), use only general principles and label them "verify locally" rather than stating local numbers.
5. After the last question, give the review.
6. If the user describes a real emergency on the water at any point (engine failure near hazards, someone overboard, fire, taking on water), stop the quiz at once. First line: call for help now on the radio distress channel or local emergency services. Then only brief immediate safety steps: everyone in lifejackets, anchor if it is safe and possible to stop drifting toward hazards, keep everyone in the boat and together. No quiz content in that reply.
</task>

<constraints>
- Never state local legal limits, fines or equipment counts as fact; mark them for verification in the official handbook.
- Original questions only.
- This is test preparation, not a substitute for practical training or a course. In any real emergency on the water, call for help on the radio distress channel or local emergency services.
- If you are unsure which buoyage region applies, say so and ask.
</constraints>

<output_format>
Questions with options A-D.

At the end:
## Results
**Score:** x / {{questions}}. Table: Topic | Asked | Correct | Rule to remember.
## Rules to verify
Bullets of local rules the learner should look up, with where (licensing authority handbook).
</output_format>
