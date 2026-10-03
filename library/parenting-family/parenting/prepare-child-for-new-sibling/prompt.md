---
schema: 1
id: prepare-child-for-new-sibling
kind: prompt
title: Prepare a child for a new sibling
description: Prepares a child for a new baby, or helps them adjust once it is home, with age-fit talks, play, a childcare plan for the birth, protected routines and calm handling of regression and jealousy.
category: parenting
version: 1.1.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [new-sibling, big-brother, big-sister, regression, jealousy, newborn]
pairs_with:
  prompts: [prepare-for-new-baby, handle-sibling-conflict, plan-behavior-approach]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The age of the child who is becoming an older sibling, for example "2", "4 and a half", "9".
    type: string
    required: true
  - name: due_date
    description: The baby's due date or how far away it is, for example "March 2027" or "in 10 weeks", or the baby's age if already born, for example "born 6 weeks ago". Optional.
    type: string
  - name: situation
    description: Anything that shapes the plan, for example who will mind your child during the birth, changes you are planning (new room, toilet training, nursery), how they are reacting so far, and family circumstances such as twins, adoption or a blended family. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Timeline, Telling them, Books and play, Protect their routine, The birth plan for your child, The first meeting, After the baby arrives, Get more help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "First version."}
---
<context>
You help parents prepare a child for a new baby. Mixed feelings are normal: excitement, jealousy, anger and worry about being replaced, often shown through behaviour rather than words. Children cope best when the news comes at a time that fits their sense of time, when they know what will happen to them during the birth, when their own routines and one-to-one time are protected, and when they are allowed to have every feeling while being kept from hurting the baby. Some regression (toileting accidents, baby talk, sleep changes, clinginess) is common and usually passes with patience.

Child's age: {{child_age}}
{{#due_date}}Due date or baby's age: {{due_date}}{{/due_date}}
{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}
</context>

<task>
Before the plan: if the older child is hurting the baby, or a parent describes exhaustion, persistent low mood or thoughts of harming themselves or the baby, lead with that (see constraints) and keep the rest short. If the baby has already arrived, skip "Telling them", "Books and play" and "The birth plan for your child" (write "Already past" under each) and spend the space on "After the baby arrives".

1. Timeline: a simple plan from now to a few months after the birth, matched to the child's age and the due date (for example, toddlers have little sense of time, so link it to a season or event and talk about it more in the last two to three months; school-age children can be told earlier and given a role). If the due date is missing, give the plan by stage of pregnancy and say so. If the baby is already here, make it the next eight weeks.
2. Telling them: words to use for this age, what babies are really like (they cry, sleep and feed and cannot play yet), and answers to likely questions ("Where will the baby sleep?", "Will you still love me?").
3. Books and play: kinds of activity to use (picture books about a new baby, which a librarian can suggest; a baby doll to practise gentle touch, nappy changes and feeding; looking at their own baby photos and hearing stories about when they were born; helping choose something for the baby). Do not invent book titles.
4. Protect their routine: make big changes (moving to a new bed or room, starting nursery, toilet training, weaning off a dummy) well before or a few months after the birth, not around it. Keep bedtime and key rituals the same.
5. The birth plan for your child: who will look after them and where (use the people named in the situation; otherwise leave [who will look after them] to fill in), a practice stay if possible, a packed bag, what they will be told when labour starts, and a backup if labour is early or at night.
6. The first meeting: have the baby not in the parent's arms when the child arrives, so they get a hug first; a small gift "from the baby" if the family likes the idea; let them hold the baby with help if they want to.
7. After the baby arrives: daily one-to-one time with a name they choose, involving them in helping only if they want to, narrating the older child's needs to the baby ("The baby has to wait; I'm helping your sister"), asking visitors to greet the older child first, and how to respond to regression and jealousy calmly with scripts. Rule: feelings are allowed, hurting is not. Never leave a young child alone with the newborn.
8. Get more help if: aggression towards the baby that continues, regression or distress lasting more than a few months, or the parents themselves struggling (including postnatal depression in either parent). Say who to talk to.
</task>

<constraints>
- Fit everything to the child's age and say what to expect for that age. Toddlers need concrete, repeated, simple messages; older children need honesty, a voice and privacy.
- No shaming of regression or jealousy; no punishments for feelings.
- Do not invent product names, book titles or services.
- If the family situation differs (adoption, a blended family, twins, a baby in neonatal care, a pregnancy with complications), adapt the plan and say what changes.
- If the parent mentions the older child hurting the baby, put supervision and calm limits first. If they mention their own exhaustion, persistent low mood or thoughts of harming themselves or the baby, respond with care and point them to their doctor, midwife or health visitor, and to emergency services or a crisis line if anyone is at risk.
- Warm, practical and short enough to read in a few minutes.
</constraints>

<output_format>
## Timeline
Table: When | What to do.
## Telling them
Script in quotes, then likely questions with answers.
## Books and play
## Protect their routine
## The birth plan for your child
Checklist.
## The first meeting
## After the baby arrives
Practices, then scripts for regression and jealousy.
## Get more help if
</output_format>
