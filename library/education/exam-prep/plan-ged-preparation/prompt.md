---
schema: 1
id: plan-ged-preparation
kind: prompt
title: Plan high school equivalency prep
description: Plans preparation for the GED, HiSET or a national equivalent for an adult who left school, with a skills check per subject, a weekly plan around work and family and free help to look for.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ged, hiset, high-school-equivalency, adult-education, second-chance-learning, study-schedule]
pairs_with:
  prompts: [plan-exam-day-strategy, practice-functional-skills-maths, quiz-me-interactively]
args:
  - name: situation
    description: Your situation in your own words, for example "left school at 16, 34 now, work nights, two kids; reading is fine, maths scares me; want to start a nursing assistant course". Include your country, and state or province in the US or Canada.
    type: text
    required: true
  - name: hours_per_week
    description: Realistic hours you can study each week.
    type: number
    default: 5
  - name: exam
    description: The test you plan to take, such as "GED", "HiSET", or a national equivalent. Leave as GED if unsure.
    type: string
    default: GED
output_contract:
  format: markdown
  sections: [Your starting point, The test and what to check, Skills check, Weekly plan, Free help to look for, First three steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adults preparing for a high school equivalency test usually have more life experience than the test needs and less time than a teenager. They succeed when they start from what they already know, test one subject at a time when the rules allow it, put most hours into the weakest subject (often maths), practise on the computer format they will use, and get free support from adult education programmes and libraries. The GED is made up of four subject tests (mathematical reasoning, reasoning through language arts, social studies, science); HiSET has five subtests. Which test is offered, the age and residency rules, fees and whether testing at home is allowed differ by state, province or country, and other countries have their own routes (for example adult upper-secondary programmes or access courses). The learner must check the rules for where they live.

Many adult learners carry bad memories of school. A plan that is respectful, concrete and quick to show progress keeps them going.
</context>

<task>
Plan {{exam}} preparation at about {{hours_per_week}} hours per week.

<situation>
{{situation}}
</situation>

1. If the country, or state or province where it matters, is missing, ask for it, but still give the plan with the location-dependent items marked [check locally].
2. Starting point: in three or four sentences, name the strengths they bring (work, parenting, reading they already do) and the main gap, without judgement.
3. The test and what to check: the subject tests for {{exam}} as commonly described, and a short list of what to confirm for their location (eligibility age, residency, fees and any vouchers, test centre or online option, retake rules, ID). If {{exam}} is not offered where they live, say so and name the kind of route to ask about.
4. Skills check: for each subject, three quick self-check items they can try now (one easy, one middle, one test-level), with answers at the end, and a simple rule: two of three right means review, fewer means learn. Recommend taking the official practice test for each subject before booking.
5. Weekly plan: split {{hours_per_week}} hours into short sessions that fit their life (for example 25-minute blocks on lunch breaks or after the children are in bed), weakest subject first, one subject tested at a time if allowed, with a target week to book each test and a review week before each.
6. Free help to look for: adult education centres, community colleges, public libraries, the test-maker's own free materials and reputable free video courses, and childcare or transport support some programmes offer. Describe what to search for; do not invent organisation names, phone numbers or prices.
7. First three steps they can do this week.
</task>

<constraints>
- Never invent fees, passing scores, deadlines or local programme names; mark them [check locally].
- Keep the language plain and warm; avoid school jargon or explain it once.
- If the situation mentions a learning difficulty or disability, mention that accommodations can be requested from the test provider with evidence.
</constraints>

<output_format>
## Your starting point
3 to 4 sentences.
## The test and what to check
Bullets, then a checklist of local items marked [check locally].
## Skills check
Per subject, three numbered items; answers in a short list after all subjects.
## Weekly plan
A table: Week | Subject | Sessions | What to do | Milestone.
## Free help to look for
Bullets of what to search for and ask.
## First three steps
Numbered.
</output_format>
