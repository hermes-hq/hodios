---
schema: 1
id: plan-puberty-talk
kind: prompt
title: Plan puberty conversations
description: Plans age-appropriate puberty conversations as a series of small talks, with what to cover, the words to use, likely questions, resources and how to keep the door open.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [biology]
requires: [none]
inputs: [preferences]
output: [plan, script, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [puberty, periods, body-changes, sex-education, body-safety, tween]
pairs_with:
  prompts: [explain-hard-topic-to-child, talk-to-teen-about-online-safety, write-family-agreement-with-teen]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The child's age, for example "8", "10", "12", and any changes you have already noticed.
    type: string
    required: true
  - name: child_gender
    description: The child's sex or gender as you would describe it, including if they are intersex, trans or questioning. Optional; the plan covers all bodies either way.
    type: string
  - name: values
    description: Family, cultural or faith values you want reflected, what has already been talked about, and topics you feel unsure about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where your child is now, The conversation plan, Words to use, Questions they may ask, Resources, Keeping the door open, See a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents talk to their children about puberty. Puberty usually starts between about 8 and 13 in girls and 9 and 14 in boys, so the talks should begin before the changes, not after. What works is many short, calm conversations over years rather than one big talk; correct names for body parts (which also helps children tell an adult if someone touches them inappropriately); facts about every body, not just the child's own; and a parent who stays approachable when the questions get awkward. Children who can get accurate answers at home are better protected against misinformation from friends and the internet.

Child's age: {{child_age}}
{{#child_gender}}Child: {{child_gender}}{{/child_gender}}
{{#values}}Family values and context: {{values}}{{/values}}
</context>

<task>
1. Where your child is now: in two or three lines, what changes are likely soon or already happening at this age, and what this child probably already hears from school and friends.
2. The conversation plan: four to eight short talks spread over the coming months to years, starting with the most urgent for this age. Cover, in an order that suits the child: body changes for all sexes (growth, hair, skin, sweat and hygiene, breasts, voice); periods, explained before the first one, with a practical kit and what to do at school; erections and wet dreams; feelings, mood swings and friendships; body image and changing bodies; body autonomy, consent and privacy; and, from about 10 or as needed, what they may see online, including pornography, in words suited to the age. For each talk give when and where (car journeys and side-by-side activities work better than face-to-face sit-downs), the key messages, and an opening line in quotes.
3. Words to use: a short glossary of correct terms with child-friendly one-line definitions, and a note on any family words the parent should replace.
4. Questions they may ask: eight to ten likely questions, including embarrassing ones, each with a short honest answer suited to the age. Include how to answer "I don't know, let's find out together" and how to respond if the child asks about sex.
5. Resources: types of books, videos and trusted sources to look for at this age (for example, the school nurse, the national health service's pages for young people, the library). Name a book only if you are confident it exists and suits the age and values given; otherwise describe what to look for.
6. Keeping the door open: habits that keep the child asking (a question notebook or box, reacting calmly, not teasing, respecting privacy, telling them it is normal to feel embarrassed), and what to do if the child shuts down.
7. See a doctor if: signs of puberty before 8 in girls or 9 in boys, no signs by about 13 in girls or 14 in boys, very heavy or very painful periods, or worries about weight, eating or mood.
</task>

<constraints>
- Medical facts must be accurate and general; ages are typical ranges, not rules.
- Reflect the family's values in tone and framing, but do not leave out safety information: correct names, body autonomy, consent and how to tell a trusted adult are always included.
- If the child is intersex, trans or questioning, keep the facts accurate, the tone supportive, and suggest the family doctor or a specialist service for individual questions.
- If anything suggests the child has been touched or treated in a sexual way, or is being groomed online, say clearly to stay calm, believe the child, and contact child protection services or the police.
- If the age is missing or unclear, ask for it; plans differ a lot between 7 and 13.
- Warm and matter-of-fact; no moralising and no scare tactics.
</constraints>

<output_format>
## Where your child is now
## The conversation plan
Table: Talk | When and where | Key messages | Opening line.
## Words to use
## Questions they may ask
Question in bold, answer underneath.
## Resources
## Keeping the door open
## See a doctor if
</output_format>
