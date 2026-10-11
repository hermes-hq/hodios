---
schema: 1
id: plan-future-care-for-disabled-adult
kind: prompt
title: Plan future care for a disabled adult child
description: Helps ageing parents of a disabled adult plan for when they can no longer care, with a letter of intent, who steps in, housing options, legal and money questions and a timeline.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [preferences, text]
output: [plan, docs, questions, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [learning-disability, letter-of-intent, future-planning, supported-living, guardianship, siblings]
pairs_with:
  prompts: [write-care-profile, prepare-care-needs-assessment]
  personas: [eldercare-advisor]
args:
  - name: situation
    description: Your adult child's age, needs and strengths, what they want for their life, who cares now and how, siblings and other family, current support and services, housing, and the country or state. Leave out names and ID numbers.
    type: text
    required: true
  - name: worries
    description: What worries you most, for example "nobody else knows how to calm him", "we don't want his sister to give up her life", "we don't know what happens to the house". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Their life, their say, Letter of intent, Who steps in, Where they could live, Legal and money questions, Timeline, If something happens suddenly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help older parents of disabled adults plan for the time they can no longer care, the way an experienced family support worker and future-planning adviser would. Many families put this off because it means imagining their own death; then a sudden illness leaves an adult who has always lived at home moved in an emergency, with no one who knows their routines. What works: involving the disabled person in planning their own future as much as possible; a "letter of intent" that captures what the parents know (routines, health, communication, what makes a good day); gradual transitions while parents are still around to help; clear, agreed roles for siblings that do not assume they will become full-time carers; and legal and financial arrangements (who can make decisions, how inheritance affects means-tested support, trusts) set up with a specialist, because the rules differ a lot between countries and states.

<situation>
{{situation}}
</situation>
{{#worries}}
<worries>
{{worries}}
</worries>
{{/worries}}
</context>

<task>
1. Their life, their say: how to involve the adult child in planning in ways that fit their communication (pictures, visits, trying things out, an independent advocate), and their own goals.
2. Letter of intent: an outline with prompts for each section (who they are, daily routine, communication, health and medicines as listed by the care team, behaviour and what helps, likes and dislikes, relationships, faith and culture, education and work, money habits, the parents' hopes for their future), noting it is not a legal document and should be updated yearly.
3. Who steps in: roles to agree with siblings, relatives or friends (decision-making support, advocacy, visiting, money oversight, hands-on care) with a script for the family conversation that does not assume siblings will become carers.
4. Where they could live: the kinds of options to explore (staying at home with support, supported living, shared lives or host family schemes, group or residential homes) as "check what exists locally", the value of starting a gradual move while parents can help, and who usually assesses for these.
5. Legal and money questions: questions to take to a specialist lawyer and adviser about decision-making arrangements for an adult (guardianship, deputyship, supported decision-making, powers of attorney, or local equivalents), wills, trusts designed for disabled beneficiaries, and protecting means-tested benefits or support. State no rules as fact.
6. Timeline: steps for this month, this year and the next few years, with owners.
7. If something happens suddenly: an emergency plan for if a parent is taken ill tomorrow: who comes, where key information is, and who the services should call.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal mechanisms, benefit rules or tax treatment as fact for their country; frame them as questions for a specialist lawyer or financial adviser who works with disabled people's families.
- Keep the disabled adult's rights and preferences central; avoid language that treats them as an object of planning.
- Do not assume siblings will or should become carers.
- Never invent services, schemes or organisations.
- Gentle tone: this is emotionally hard for parents.
</constraints>

<output_format>
## Their life, their say
## Letter of intent
Outline with prompts.
## Who steps in
## Where they could live
## Legal and money questions
## Timeline
Table: When | Step | Owner.
## If something happens suddenly
</output_format>
