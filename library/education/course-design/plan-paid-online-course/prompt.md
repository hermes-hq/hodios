---
schema: 1
id: plan-paid-online-course
kind: prompt
title: Plan a paid online course
description: Plans a paid online course for a creator or expert with the promised transformation, modules, formats, community, pricing tiers and a pilot cohort. Use before building or selling a course.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, founder, consultant, teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, outline, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [online-course, cohort-based-course, course-creator, price-testing, pilot, creator-economy]
pairs_with:
  prompts: [design-course-outline, write-course-welcome-message, design-blended-program]
  personas: [instructional-designer]
args:
  - name: expertise
    description: What you know or can do that people want to learn, with your proof (results, years, clients, audience size).
    type: text
    required: true
  - name: audience
    description: Who the course is for, their situation and what they have tried, e.g. "freelance designers stuck under 50 USD an hour".
    type: string
    required: true
  - name: format
    description: self-paced is recorded and evergreen; cohort runs live with a group on fixed dates; hybrid combines recorded lessons with live cohort sessions.
    type: enum
    enum: [self-paced, cohort, hybrid]
    default: cohort
output_contract:
  format: markdown
  sections: [Transformation, Is this course worth building, Curriculum, Formats and community, Pricing tiers, Pilot cohort plan, Risks and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Paid courses succeed when they promise a specific, believable change for a specific person and then deliver the shortest path to it. Creators usually make three mistakes: they pack in everything they know, they build the whole thing before anyone has paid, and they price by guessing. Completion of self-paced courses is typically low, so live elements, a community with a purpose, and accountability raise outcomes and referrals. A small paid pilot validates demand, tests the curriculum and produces the testimonials and case studies that sell later runs.
</context>

<task>
Plan a **{{format}}** paid online course.

<expertise>
{{expertise}}
</expertise>

Audience: **{{audience}}**

1. If the expertise or audience is too vague to name a concrete outcome, ask up to 3 questions (who exactly, what result they want, what proof you have) and stop.
2. **Transformation:** write the promise as "From [current state] to [specific result] in [time], without [main obstacle]". Then list what the course will not promise.
3. **Is this course worth building:** 4 to 6 quick checks with what to do for each: is the problem painful and urgent, does the audience pay for solutions already, does the creator have proof and reach, can the result be reached in the stated time. Be honest if a check fails.
4. **Curriculum:** 4 to 8 modules that each produce a milestone the learner can see (a finished draft, a first client call), with lessons, a practical assignment per module and the minimum content needed. Move "nice to know" material to a bonus or resource library.
5. **Formats and community:** for the chosen format, the delivery mix (video length, live calls, workbooks, office hours, feedback on assignments), the community's purpose and rituals (wins thread, accountability pods, demo day), and what keeps people finishing.
6. **Pricing tiers:** 2 or 3 tiers with what each includes, the reasoning (value of the result, access to the creator, cost to deliver per student), and a price range to test rather than a single "correct" price. Include the creator's hours per student per tier.
7. **Pilot cohort plan:** size (typically 10 to 25), pilot price and why, how to recruit from the existing audience, what to build before launch versus during the pilot, how to gather feedback and outcomes, and the decision criteria for running again.
8. **Risks and next steps:** the top risks (refunds, low completion, creator burnout) with mitigations, and a 4-week action plan.
</task>

<constraints>
- No income or results guarantees, fake scarcity, fake countdowns or inflated "was" prices. Marketing claims must be ones the creator can back with real results.
- Do not project revenue as if it were likely; if you show maths, label it a scenario with stated assumptions.
- Remind the creator to set a clear refund policy and check consumer-protection and tax rules for selling digital products where they and their buyers live; do not state those rules as fact.
- Name platform types (course host, community tool, payment processor) rather than recommending specific brands unless asked.
</constraints>

<output_format>
## Transformation
The promise, then "What this course will not promise".
## Is this course worth building
Table: Check | Verdict | What to do.
## Curriculum
Table: Module | Milestone | Lessons | Assignment.
## Formats and community
Bullets.
## Pricing tiers
Table: Tier | Includes | Price range to test | Creator hours per student | Reasoning.
## Pilot cohort plan
Numbered steps with dates relative to launch.
## Risks and next steps
Risks with mitigations, then a 4-week action list.
</output_format>
