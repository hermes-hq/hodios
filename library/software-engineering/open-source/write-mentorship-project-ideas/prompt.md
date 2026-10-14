---
schema: 1
id: write-mentorship-project-ideas
kind: prompt
title: Write project ideas for a mentorship programme
description: Writes an open-source project's ideas list for a paid mentorship programme, with scoped projects by size and difficulty, deliverables, prerequisites, a first task for applicants and a mentor plan.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [text, repo]
output: [docs, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [mentorship, internships, newcomer-onboarding, ideas-list]
pairs_with:
  prompts: [write-good-first-issues, audit-contributor-funnel]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What the project is, its stack, how long setup takes, open areas of work, and who could mentor and how many hours a week each.
    type: text
    required: true
  - name: programme
    description: The programme you are applying to or running, with the project sizes, durations and rules you know from its current guidelines. Optional.
    type: text
  - name: ideas
    description: Rough ideas you already have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Project ideas, Applicant guidance, Mentor plan, Before you submit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mentorship programmes for open source pay newcomers to work on a project for a fixed period with mentors. The projects that go well are scoped to the programme's size, valuable but not on the critical path of a release, have a concrete deliverable with stretch goals, need skills a motivated newcomer can learn during the programme, and have two mentors so one absence does not stall the intern. The ones that go badly are urgent work disguised as learning, vague research ("improve performance"), or a project nobody has time to review. Strong ideas lists also give applicants a small first contribution to make while applying, because that is the best predictor of who will finish.

Project:
<project>
{{project}}
</project>
{{#programme}}Programme: {{programme}}{{/programme}}
{{#ideas}}Rough ideas: {{ideas}}{{/ideas}}
</context>

<task>
1. Fit check: say whether the project is ready to take a mentee (setup time, review capacity, mentor hours, clear contribution guide), and what to fix first if not.
2. Write three to six project ideas{{#ideas}}, starting from the rough ideas given and rejecting any that do not fit with a one-line reason{{/ideas}}. For each: title, the problem in two sentences, expected outcome and deliverables, stretch goals, skills required and skills learnt, size in the programme's terms{{#programme}} as stated{{/programme}}, difficulty, two mentors (by role or handle placeholder), and a first task an applicant can do in a few hours.
3. Write applicant guidance: how to get set up, where to ask questions, how to pick an idea, what a good proposal contains (timeline with milestones, communication plan, prior contributions), and what will not be accepted.
4. Write the mentor plan: weekly check-ins, response time for reviews, mid-point and final evaluation criteria, and what happens if the mentee falls behind.
5. Before you submit: a checklist against the programme's rules as the user stated them, plus items to confirm in the programme's current guidelines.
</task>

<constraints>
- Do not invent programme rules, stipends, deadlines or eligibility; use only what the user gives and say to confirm the rest in the programme's current guidelines.
- Reject ideas that are urgent production work, unpaid labour for a company's commercial roadmap, or impossible to finish in the time.
- Every idea must have at least one deliverable that can be merged or published even if stretch goals are missed.
</constraints>

<output_format>
Use the contract's section headings in order. Each project idea under its own third-level heading with the same labelled fields. Before you submit as a checklist.
</output_format>
