---
schema: 1
id: write-couples-quiz
kind: prompt
title: Write a "how well do you know the couple" quiz
description: Writes a couples quiz for a wedding, shower or anniversary from facts you supply, with a guest round, a shoe-game round for the couple, an answer key and a check that nothing embarrasses them.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes, preferences]
output: [quiz, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [couples-quiz, shoe-game, wedding-games, bridal-shower, anniversary-party, answer-key]
pairs_with:
  prompts: [create-custom-bingo, host-trivia-night]
args:
  - name: facts
    description: Facts about the couple that they are happy to share, for example how they met, first date, pets, habits, who does what. The more specific, the better.
    type: text
    required: true
  - name: occasion
    description: The event and audience, for example "wedding reception, 80 guests, mixed ages and both families".
    type: string
    required: true
  - name: questions
    description: Number of guest questions.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Guest quiz, Shoe game, Answer key, Host notes, Check before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write couple quizzes for weddings, showers and anniversaries. The best ones are built from real, specific facts and are fun for guests who know one partner well but not the other: questions are spread across both partners and both families' knowledge, a few are guessable by anyone, and nothing risks embarrassing the couple or a grandparent in the room. Fairness matters too: every question needs one checkable answer, which only the couple can confirm.

Occasion: {{occasion}}
Guest questions: {{questions}}

<facts>
{{facts}}
</facts>
</context>

<task>
1. Read the facts. Use only these; never invent a detail about the couple. If there are not enough facts for {{questions}} questions, write as many as the facts support and list the questions you would add with a blank for the answer ("Where did they go on their first holiday? [couple to fill in]").
2. Write the guest quiz: balance questions about each partner and about them as a couple; mix formats (multiple choice with three options, "who is more likely to...", true or false, a number guess such as "how many months between meeting and first date"). Order from easy to harder.
3. Write a shoe-game round for the couple on stage: 10 to 12 "who is more likely to..." or "who..." prompts that each partner answers at the same time by raising a shoe or paddle. Keep them affectionate and quick.
4. Write the answer key with the source fact for each answer and a tie-breaker number question.
5. Write host notes: how to hand out and collect sheets, timing, how to score, and when to run it in the event.
6. Run a sensitivity check: flag any question that touches exes, money, weight, drinking, fertility, religion, family tension or private jokes that need context, and suggest a swap.
</task>

<constraints>
- Every answer must come from the supplied facts or be left blank for the couple to fill in.
- Nothing about past partners, sex, bodies or anything a grandparent or child in the audience would find awkward, unless the person explicitly says the audience is adults only and the couple has agreed; even then keep it light.
- If the couple will not see the quiz before the event, tell the organiser to have one trusted person confirm the answers.
- Plain wording that works read aloud or printed.
</constraints>

<output_format>
## Guest quiz
Numbered questions with options, ready to print.
## Shoe game
Numbered prompts.
## Answer key
Table: # | Answer | From which fact. Then the tie-breaker.
## Host notes
Short bullets.
## Check before use
Questions to confirm with the couple, and any sensitive items with suggested swaps.
</output_format>
