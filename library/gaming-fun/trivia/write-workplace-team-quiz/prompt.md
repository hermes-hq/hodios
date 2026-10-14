---
schema: 1
id: write-workplace-team-quiz
kind: prompt
title: Write a workplace team quiz
description: Writes an inclusive quiz for a team social or offsite that mixes departments and seniority, with a company round from facts you supply, general rounds anyone can play and opt-in personal questions.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [manager, individual, operations-manager]
requires: [none]
inputs: [notes, preferences]
output: [quiz, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [team-social, offsite, company-trivia, inclusion, mixed-teams]
pairs_with:
  prompts: [write-icebreaker-games, plan-online-quiz-night]
args:
  - name: team
    description: Who is playing, for example "45 people across sales, engineering and support, three offices, about a third joined this year".
    type: text
    required: true
  - name: company_facts
    description: Facts you are happy to use in a company round, such as founding year, first product, office locations, milestones, team traditions. Optional.
    type: text
  - name: rounds
    description: Number of rounds.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Teams, Rounds, Answer key, Host notes, Check before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write quizzes for workplace socials. A work quiz is a team-building tool as much as a game, so the risks are social: a company round full of in-jokes shuts out new joiners; questions about colleagues' private lives can embarrass; seniority dynamics decide who answers; and drinking-centred rounds exclude people. Good work quizzes mix teams across departments and offices, keep the company round to things anyone could learn in a week, and make anything personal opt-in.

Team: {{team}}
Rounds: {{rounds}}
{{#company_facts}}
<company_facts>
{{company_facts}}
</company_facts>
{{/company_facts}}
</context>

<task>
1. Propose team mixing: teams of four to six that mix departments, offices, tenure and seniority, and a rule that a different person writes answers each round.
2. Plan {{rounds}} rounds: at most one company round, the rest general (for example a picture round, a "guess the number" estimates round, a connections round, a round on the cities where the offices are). If no company facts were supplied, write the company round as a template with blanks.
3. Write the company round only from {{company_facts}}; keep it to things a new joiner could know or work out, and add one or two questions newer staff are likely to win (for example about recent changes).
4. For any personal round ("guess whose holiday photo", "who has this hobby"), make it opt-in: people submit facts or photos themselves in advance and can decline without anyone knowing.
5. Write answers with "also accept" and three numeric tie-breakers.
6. Write host notes: timing, keeping it optional, non-alcoholic options if it is a drinks event, and remote players included.
</task>

<constraints>
- Never use confidential business information such as revenue, salaries, deals, layoffs or unannounced products, even if supplied; flag and skip it.
- No questions about colleagues' age, health, family status, religion, politics or appearance.
- No in-jokes that need history to understand.
- Do not invent company facts.
</constraints>

<output_format>
## Teams
Bullets with the mixing rule.
## Rounds
For each round: title, then # | Question | Answer | Also accept.
## Answer key
Compact list, plus tie-breakers.
## Host notes
Bullets.
## Check before use
Facts to confirm with the person who knows, and anything skipped as confidential or sensitive.
</output_format>
