---
schema: 1
id: choose-dissertation-topic
kind: prompt
title: Choose a dissertation topic
description: Narrows several dissertation ideas to one researchable question by scoring interest, feasibility, data access, ethics, supervisor fit and time, then drafts a short proposal skeleton.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student]
requires: [none]
inputs: [topic, text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dissertation, research-question, feasibility, proposal]
pairs_with:
  prompts: [refine-research-question, understand-assignment-brief]
args:
  - name: ideas
    description: Two to six rough ideas, with what draws you to each, any data, sources, fieldwork or participants you have in mind, and skills you have (methods, languages, software).
    type: text
    required: true
  - name: discipline
    description: Your subject and level, e.g. "BSc Psychology", "MA History", "BA Business".
    type: string
    required: true
  - name: months
    description: Months until submission.
    type: number
    default: 6
  - name: module_rules
    description: Optional. The dissertation word limit and any rules from the module handbook (ethics deadline, required methods, supervisor allocation).
    type: text
output_contract:
  format: markdown
  sections: [Ideas as questions, Scoring, Knock-outs and risks, Recommendation, Proposal skeleton, Questions for your supervisor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An undergraduate or taught master's student in {{discipline}} has several dissertation ideas and {{months}} months. Most dissertation trouble starts at topic choice: the topic is a field, not a question; the data or sources turn out to be unreachable; human-participant research needs ethics approval that takes weeks; the method needs skills the student does not have; or the scope is a PhD squeezed into a few months. A good choice is a narrow question the student cares about, can answer with evidence they can actually get, with methods they can learn in time, and that a supervisor in the department can support.
</context>

<task>
<ideas>
{{ideas}}
</ideas>
{{#module_rules}}
<rules>
{{module_rules}}
</rules>
{{/module_rules}}

1. Turn each idea into one candidate research question that is narrow (a specific case, group, period, text, place or variable) and answerable within the word limit. Keep the student's intent; show the question, not just the topic.
2. Score each question 1-5 on: interest (will they still care in month four?), feasibility in {{months}} months, access to data or sources (named and concrete, not assumed), ethics (5 = no human participants or only public data; lower for interviews, minors, vulnerable groups, sensitive topics), skills and methods fit, supervisor fit (staff with related expertise, if known), and contribution (a clear "so what" at this level). Weight access and feasibility double.
3. Apply knock-outs: no realistic data access, ethics approval unlikely in time, or a method the student cannot learn in time. A knocked-out idea is not recommended however high it scores.
4. Recommend one question, with a runner-up as a fallback.
5. Draft a proposal skeleton for the winner: working title, question, why it matters, method and data, scope limits, ethics, and a month-by-month outline. Keep it as bullets in the student's own terms so they can write the paragraph themselves.
6. List questions to take to the supervisor.
</task>

<constraints>
- Use only what the student said. Do not invent datasets, archives, staff expertise, ethics rules or literature. Where access or expertise is unknown, score it [?] and ask.
- Do not write the proposal as finished prose; proposals are often assessed or used to allocate supervisors, so the student writes it. Bullets only, and remind them to check the module's rules on AI use.
- Respect the student's interests; do not swap their ideas for ones you find more interesting. You may suggest a narrower angle.
- Say plainly if every idea fails a knock-out, and suggest how to rescope one.
</constraints>

<output_format>
## Ideas as questions
Numbered list: original idea, then the candidate question.

## Scoring
Table: Question | Interest | Feasibility (x2) | Access (x2) | Ethics | Skills | Supervisor fit | Contribution | Total. Unknowns as [?].

## Knock-outs and risks
Bullets per question.

## Recommendation
The winner and runner-up, with two or three reasons each. Under 120 words.

## Proposal skeleton
Bullets under: Working title, Question, Why it matters, Method and data, Scope limits, Ethics, Timeline (table: Month | Milestone).

## Questions for your supervisor
Four to six questions.
</output_format>
