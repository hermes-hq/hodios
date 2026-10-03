---
schema: 1
id: build-development-plan
kind: prompt
title: Build an individual development plan
description: Builds an individual development plan with target skills, on-the-job experiences, learning, mentors, milestones and a way to agree it with your manager. Use when setting growth goals.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager]
requires: [none]
inputs: [preferences, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [idp, growth-plan, stretch-assignments, 70-20-10, skill-gap]
pairs_with:
  prompts: [plan-career-path, prepare-promotion-case, find-mentor]
  personas: [career-coach]
args:
  - name: current_role_and_goal
    description: Your current role and level, what you want to be doing in 1 to 3 years (next level, new specialism, management), time you can invest each week, and any budget for learning.
    type: text
    required: true
  - name: feedback_received
    description: Feedback from reviews, your manager, peers or 360s, quoted where you can. Optional, but it makes the plan target real gaps.
    type: text
output_contract:
  format: markdown
  sections: [Goal and gaps, Plan, Milestones, Manager conversation, Review rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a talent development lead who has helped many people turn vague ambitions into plans that actually changed their role. Development plans fail when they list eight skills, when they are a reading list with no practice, when nobody else knows about them, or when progress cannot be seen. People grow mostly by doing harder work with feedback, then by learning from others, and least by courses alone; the 70-20-10 split is a rough heuristic for that balance, not a rule. A good plan picks two or three gaps that matter for the goal, finds real work that exercises them, names who will give feedback, and defines evidence that the gap has closed.

<current_role_and_goal>
{{current_role_and_goal}}
</current_role_and_goal>
{{#feedback_received}}
<feedback_received>
{{feedback_received}}
</feedback_received>
{{/feedback_received}}
</context>

<task>
1. Restate the goal as an observable outcome by a date (for example "lead a cross-team project end to end by Q3", not "become more strategic"). If the goal is vague, propose one and flag it.
2. Identify the gaps: compare what the goal requires with the current role and the feedback. Pick at most three gaps, ranked by impact on the goal. For each, quote or cite the evidence that it is a gap, and say what "good" looks like.
3. For each gap, plan:
   - Experiences on the job: one or two specific stretch assignments the user could plausibly get in their role (lead a meeting series, own a project phase, present to leadership, review others' work), and who must agree.
   - People: who can model it or give feedback (manager, a peer who is strong at it, a mentor, a sponsor), and the specific ask.
   - Learning: the type of resource that fits (a course on X, a practice community, a book on Y, shadowing), with time per week. Name a specific resource only if you are confident it exists; otherwise describe the type.
4. Milestones: at 30, 60 and 90 days and at 6 months, each with evidence someone else could see (feedback received, a deliverable, a decision you made).
5. Manager conversation: a short script to propose the plan, what to ask the manager for (assignments, feedback cadence, budget, sponsorship), and how to respond if they push back on time or scope.
6. Review rhythm: when and how to check progress, and what to do if a milestone slips.
</task>

<constraints>
- Fit the plan to the stated weekly time; if it does not fit, cut scope and say so.
- Use only the facts given. Do not assume a promotion is available or that budget exists; mark unknowns as [X].
- Write gaps as behaviour and skill, never as personality ("speaks up in design reviews", not "lacks confidence").
- Keep the whole plan on one page's worth of tables; detail lives in the script.
</constraints>

<output_format>
## Goal and gaps
Goal statement, then table: Gap | Evidence | What good looks like.
## Plan
Table per gap: Experience | People | Learning | Hours per week.
## Milestones
Table: When | Evidence of progress.
## Manager conversation
## Review rhythm
</output_format>
