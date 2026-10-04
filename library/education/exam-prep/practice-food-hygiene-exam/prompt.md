---
schema: 1
id: practice-food-hygiene-exam
kind: prompt
title: Practise a food hygiene exam
description: Quizzes kitchen and front-of-house staff for a food hygiene or food handler certificate on temperatures, cross-contamination, allergens and cleaning, with the reason behind each rule.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual]
subject: [hospitality]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [food-hygiene, food-handler-card, allergen-awareness, cross-contamination, temperature-control, kitchen-safety]
pairs_with:
  prompts: [prepare-for-food-safety-inspection, analyze-exam-mistakes]
args:
  - name: level
    description: food-handler for staff who prepare or serve food; supervisor for those who manage hygiene, train staff and keep records.
    type: enum
    enum: [food-handler, supervisor]
    default: food-handler
  - name: country
    description: The country, and state where it matters, whose rules the certificate follows, such as "UK", "Ireland", "California, US", "Ontario, Canada". Temperatures and allergen lists differ.
    type: string
    required: true
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Score, Topics, Rules and numbers to learn, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Food hygiene certificates check that staff can prevent food poisoning and allergic reactions: the main hazards (microbial, chemical, physical, allergenic), temperature control (chilling, cooking, cooling, reheating, hot holding and the danger zone), cross-contamination (raw and ready-to-eat separation, colour-coding, hand contact), allergens (the legally listed allergens, accurate information to customers, preventing cross-contact), cleaning versus disinfection, personal hygiene and illness reporting, pests, and for supervisors, hazard analysis systems, records and training. The numbers matter and differ by country: fridge and hot-holding temperatures, cooking core temperatures, the time food can be left out, and how many allergens are on the legal list. Learners remember rules better when they know the reason (bacteria multiply fastest in warm food; heat kills most bacteria but some toxins survive).
</context>

<task>
Run {{questions}} original questions for a {{level}} food hygiene certificate in {{country}}.

1. In one line, state which country's rules the numbers will follow. Use only temperatures, times and allergen lists you are confident are the standard guidance there; if unsure, ask the learner to check their course book and phrase the item around the principle instead.
2. Write every question yourself; never reproduce course provider question banks. Use realistic kitchen and service situations (a delivery arriving warm, a customer asking about nuts, a colleague with vomiting, a chopping board used for raw chicken, a sauce cooling overnight). Mix single-answer items with "what should you do?" scenarios. For `supervisor`, include records, staff training, corrective actions and hazard analysis.
3. Ask one question per message, labelled "Question k of {{questions}}", with four options.
4. After each answer:
   - Mark it and give the answer.
   - Give the reason behind the rule in one or two sentences.
   - Say why the tempting wrong option causes harm.
5. After the last question, give the review.
</task>

<constraints>
- Never invent a legal temperature, time limit or allergen list; when standards differ by country, say so.
- On allergens, always teach the safe answer: if in doubt, do not guess; check the recorded allergen information and tell the customer honestly.
- If the learner describes a real outbreak, a customer having an allergic reaction or food sold unsafely now, tell them to follow their manager's procedure, call emergency services for any reaction with breathing difficulty, and contact the local food authority where relevant.
</constraints>

<output_format>
During the set: the marking and reason, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## Topics
A table: Topic | Asked | Correct.
## Rules and numbers to learn
A short list of the rules and figures (for the country named) that came up in misses.
## Next set
Topics to practise next.
</output_format>
