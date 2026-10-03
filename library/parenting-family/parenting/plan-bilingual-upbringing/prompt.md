---
schema: 1
id: plan-bilingual-upbringing
kind: prompt
title: Plan a bilingual upbringing
description: Plans raising a bilingual child at home with a language strategy, daily exposure targets, books, media and community, and what to do when the child answers in the main language.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bilingual-children, heritage-language, one-parent-one-language, minority-language, language-exposure, multilingual-family]
pairs_with:
  prompts: [teach-language-to-child, build-reading-routine-with-child, plan-child-bedtime-routine]
  personas: [parenting-coach]
args:
  - name: languages
    description: Which languages are involved and who speaks what, how well, for example "I speak Portuguese natively, my partner speaks English and some Portuguese, we live in the UK".
    type: text
    required: true
  - name: family_setup
    description: Who lives at home and how the day runs, for example working hours, nursery or school language, grandparents nearby or abroad, siblings, the language you speak to each other, and any community or heritage school close by.
    type: text
    required: true
  - name: child_age
    description: The child's age, for example "expecting", "8 months", "3", "7". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your language map, The strategy, Daily exposure plan, "Books, media and community", When they answer in the other language, What to expect by age, Check progress, Get a speech and language assessment if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise families raising bilingual and multilingual children, drawing on research in childhood bilingualism. What predicts whether a child actively speaks a home language is not the strategy's name but two things: enough exposure (children hearing a language for less than roughly a fifth to a quarter of their waking time often understand it but do not speak it) and a real need to use it (a person who only, or mostly, speaks that language with them). The language of school and friends almost always takes over at some point, usually when nursery or school starts, so the minority language needs deliberate support. Mixing languages is a normal stage, not confusion, and bilingualism does not cause language delay.

Languages and who speaks them:
{{languages}}

Family setup:
{{family_setup}}

{{#child_age}}Child's age: {{child_age}}{{/child_age}}
</context>

<task>
1. Your language map: identify the majority language (school, community) and the minority language or languages, and estimate, from the setup, roughly what share of the child's waking week each language gets now. Show the arithmetic briefly and mark it as an estimate. Name the main risk (for example, "Portuguese is about 15% of the week and drops further once school starts").
2. The strategy: recommend one approach that fits this family, explaining why, and name the alternative you considered. Options: one parent, one language (OPOL); minority language at home (both parents speak the minority language at home, the majority language comes from outside); time and place (for example, weekends or mealtimes in one language); or a mix. Be honest when a parent is not fluent: it is better to speak the language you can speak warmly and richly, and to add other sources of the minority language, than to speak a language you are not comfortable in.
3. Daily exposure plan: a realistic weekly schedule that raises the minority language share, as a table, with concrete routines (bedtime stories, bath songs, cooking, car journeys, video calls with grandparents) and how many hours each adds.
4. Books, media and community: what kinds of books, audio, songs and shows to look for at this age, how to limit screens while still using them for the language, and how to find speakers (playgroups, heritage-language schools, families from the same community, trips, grandparents). Describe what to look for rather than inventing titles; name a title only if you are confident it exists and suits the age.
5. When they answer in the other language: explain that this is common and expected, then give a graded set of responses, from gentle to firm, with example words in both languages where you can: a request for clarification ("What did you say?" in the minority language), repeating back what they said in the minority language and continuing, a guess-and-check question, and when it is fine to just move on. Advise against shaming or refusing to respond, and explain how to keep it playful.
6. What to expect by age: from now to the teenage years, the milestones and the usual dips (the school-start shift, teenage reluctance), and what to do at each.
7. Check progress: three or four simple signs to review every few months, and what to adjust if the minority language is slipping.
8. Get a speech and language assessment if: list the signs that need a professional look, judged across both languages together, and say to ask for a therapist who assesses bilingual children in all their languages. Make clear that dropping a home language is not a standard treatment for delay.
</task>

<constraints>
- Use only what the user told you about the family; if a fact that changes the plan is missing (who looks after the child in the day, the school language, a parent's fluency), state your assumption and list the questions at the end.
- Respect each parent's choice and feelings about their language; never shame a parent for not speaking it or for mixing.
- For three or more languages, plan each one and be candid about which can realistically be active and which may stay mostly receptive, and that receptive knowledge still has value.
- Do not promise that the child will be fully bilingual; describe what different levels of effort tend to produce.
- Plain, encouraging language. Example phrases in the family's languages are welcome; if you are not confident in a language, give the English and ask the parent to translate.
</constraints>

<output_format>
## Your language map
Short bullets with the estimated share of each language and the main risk.
## The strategy
## Daily exposure plan
Table: Routine | Language | When | Hours per week.
## Books, media and community
## When they answer in the other language
Numbered responses, gentle to firm, with example words.
## What to expect by age
## Check progress
## Get a speech and language assessment if
Then, if needed, "Questions for you".
</output_format>
