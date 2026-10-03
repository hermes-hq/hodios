---
schema: 1
id: plan-customer-training-program
kind: prompt
title: Plan a customer training programme
description: Designs product training for customers or partners with learning paths by role, formats, certification and adoption metrics. For customer education and enablement teams.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [support-agent, product-manager, manager, consultant]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-education, partner-enablement, certification, learning-paths, product-adoption, academy]
pairs_with:
  prompts: [plan-customer-onboarding, design-elearning-module, design-microlearning-series, evaluate-training-effectiveness]
  personas: [instructional-designer, corporate-trainer]
args:
  - name: product
    description: The product and what it does, e.g. "B2B expense management software with mobile app, approvals and accounting integrations".
    type: string
    required: true
  - name: customer_roles
    description: The customer or partner roles who need training and what each does with the product, e.g. "admins configure policies; approvers review expenses; partners implement integrations".
    type: text
    required: true
  - name: goals
    description: Optional business goals for the programme, e.g. "cut onboarding tickets by 30%", "raise feature adoption", "certify 50 partner consultants".
    type: text
output_contract:
  format: markdown
  sections: [Programme goals, Learning paths, Formats and channels, Certification, Metrics, Operations and maintenance, Roadmap]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Customer education exists to get customers to value faster and keep them there: fewer support tickets, wider feature adoption, successful implementations and renewals. It differs from internal training in that learners are volunteers with other priorities, so content must be short, task-based and available at the moment of need (in the product, in the help centre, in onboarding emails), with deeper paths for admins and partners who need them. Certification makes sense when it has value for the learner (a credential for partners or power users) and for the business (implementation quality), not as decoration. Teams often measure course completions; the useful measures link learning to product behaviour and support data, while being honest that correlation is not proof that training caused the change.
</context>

<task>
Plan a customer training programme for **{{product}}**.

<customer_roles>
{{customer_roles}}
</customer_roles>

{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. If no goals were given, propose 2 or 3 likely ones based on the roles (for example faster time to first value, fewer how-to tickets) and mark them "proposed". If the roles say nothing about what each does with the product, ask before designing paths.
2. **Programme goals:** each goal with the customer behaviour that would show it (an action in the product, a ticket type that drops).
3. **Learning paths:** one path per role. For each: the 5 to 10 jobs the role must do with the product (prioritised by how early and how often they matter), the modules mapped to those jobs, duration, prerequisites, and the "first value" milestone the path drives toward.
4. **Formats and channels:** which content goes where and why: in-product guidance for first-run tasks, short videos and articles for how-to, live webinars or office hours for admins, instructor-led or cohort training for complex implementations, sandbox exercises for hands-on practice. Include free versus paid (if relevant) and how the content reaches customers (onboarding emails, help centre, customer success managers).
5. **Certification:** whether it is worth offering for each role; if yes, the levels, what is assessed (practical tasks in a sandbox over multiple-choice where possible), passing standard, validity period and renewal tied to product changes, and what the credential gives the holder.
6. **Metrics:** a small scorecard: reach and completion, plus outcome metrics (time to first value, feature adoption among trained versus untrained accounts, how-to ticket volume, implementation success, renewal or expansion signals). Say how to compare fairly (matched cohorts, before and after) and what not to claim.
7. **Operations and maintenance:** owners, how content is updated with each product release (a content review in the release checklist), localisation, accessibility, and the tools needed by type (learning platform, video, sandbox).
8. **Roadmap:** phases over 2 to 3 quarters, starting with the highest-impact path.
</task>

<constraints>
- Prioritise ruthlessly: the first phase should be small enough for a team of one or two to ship.
- Keep modules task-based and short (most under 10 minutes); avoid feature tours that explain every button.
- Do not invent product features; use what was described and mark any assumption.
- Name tool categories rather than recommending specific vendors unless asked.
- Do not claim causal ROI from training data alone; describe what evidence would support a claim.
</constraints>

<output_format>
## Programme goals
Table: Goal | Customer behaviour that shows it | Proposed or given.
## Learning paths
A `###` per role with a table: Job to do | Module | Format | Duration. Then the first-value milestone.
## Formats and channels
Table: Content type | Channel | Why.
## Certification
Per role: offer or not, with design if yes.
## Metrics
Scorecard table: Metric | Definition | Source | Target or baseline. Then fair-comparison notes.
## Operations and maintenance
Bullets.
## Roadmap
Table: Phase | Quarter | Deliverables | Success check.
</output_format>
