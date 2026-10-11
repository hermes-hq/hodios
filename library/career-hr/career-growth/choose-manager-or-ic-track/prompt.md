---
schema: 1
id: choose-manager-or-ic-track
kind: prompt
title: Choose the manager or IC track
description: Helps decide between people management and the senior individual contributor track using what you enjoy, what drains you, evidence from your work and cheap ways to test the choice.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, tech-lead, designer]
requires: [none]
inputs: [text, notes]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [individual-contributor, management-track, career-ladder, career-decision]
pairs_with:
  prompts: [plan-transition-to-manager, plan-career-path, prepare-promotion-case]
  personas: [career-coach]
args:
  - name: background
    description: Your current role and level, the work you enjoy and the work that drains you, any experience leading people or projects, feedback you have had, and why the question is coming up now (an offer, a vacancy, a promotion cycle).
    type: text
    required: true
  - name: ladder
    description: Your company's career ladder or what the senior IC and manager roles involve there, if known.
    type: text
output_contract:
  format: markdown
  sections: [What each track really involves, Your evidence, Common wrong reasons, Test before you commit, Recommendation, Questions to ask your company]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help skilled professionals choose between managing people and growing as a senior individual contributor (IC). People often choose management for the wrong reasons: it looks like the only promotion, it pays more at their company, or they were the best performer. Management is a different job: most of the day goes to people, hiring, feedback, alignment and other people's problems, the feedback loop is slow, and the craft work mostly stops. The senior IC path (staff, principal, expert, specialist) is not "more of the same": it means influence without authority, setting technical or professional direction across teams, writing and persuading, and owning ambiguous problems. Whether a real IC track exists varies by company. The choice is often reversible, especially early, and the best evidence comes from small experiments.

<background>
{{background}}
</background>
{{#ladder}}
<ladder>
{{ladder}}
</ladder>
{{/ladder}}
</context>

<task>
1. What each track really involves: a short, honest description of a typical week, what success looks like, what you give up and what grows, for the manager path and the senior IC path, adjusted to their field and to the ladder if given.
2. Your evidence: sort what they told you into signals for each track (energy from helping others grow versus from deep work, tolerance for interruptions and conflict, how they handle ambiguity, what feedback says). Say which way the evidence leans and how strongly.
3. Common wrong reasons: check their reasons against the usual traps (pay, status, being the best performer, fear of being left behind, a manager pushing them) and say which apply.
4. Test before you commit: three to five low-risk experiments for the leaning track and one for the other, such as leading a project, mentoring a junior, running hiring interviews, owning a cross-team design or standard, acting as interim lead, with what to notice in each.
5. Recommendation: a lean with confidence level and the reasons, plus what would change it. If they are already offered a manager role, cover how to try it with a way back, and what to ask for.
6. Questions to ask your company: whether a real IC track exists at their target level, how pay compares, how people have moved between tracks, and what the role would include.
</task>

<constraints>
- Do not assume management is the promotion or the IC track is a lesser path; treat both as equal and different.
- Do not invent their company's ladder, pay levels or titles. Use what they give and frame the rest as questions.
- Base the lean on their evidence, not general preferences. If the evidence is thin, say so and weight the experiments.
</constraints>

<output_format>
## What each track really involves
Table: Aspect | Manager | Senior IC.
## Your evidence
Table: Signal | Points to | Strength.
## Common wrong reasons
## Test before you commit
Numbered experiments with what to notice.
## Recommendation
## Questions to ask your company
</output_format>
