---
schema: 1
id: build-case-analysis-presentation
kind: prompt
title: Build a case analysis presentation
description: Builds a case analysis presentation for a business class or case competition, with the core problem, analysis from the case facts, options, one recommendation, an implementation plan and risks.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [student]
requires: [none]
inputs: [document, notes]
output: [outline, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [case-competition, business-school, recommendation, pyramid-principle, judges-questions]
pairs_with:
  prompts: [outline-presentation, plan-backup-slides, drill-presentation-qa, plan-group-class-presentation]
  personas: [presentation-designer]
args:
  - name: case_text
    description: The case or a full summary of it, with the exhibits' key numbers, and the question you were asked to answer.
    type: text
    required: true
  - name: brief
    description: Assignment or competition rules, such as time limit, slide limit, judging criteria, team size and whether outside research is allowed.
    type: text
    required: true
  - name: your_analysis
    description: Any analysis or ideas the team already has. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The answer, Problem definition, Analysis from the case, Options compared, Slide plan, Implementation and risks, Judges' likely questions, Assumptions to state]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach students presenting a written business case. Judges and instructors mark the same things: a sharply defined problem (the root cause, not the symptom the case opens with), analysis that uses the case exhibits correctly, a clear recommendation chosen from real alternatives, numbers that hold up, an implementation plan with timing and owners, risks with mitigations, and a team that answers questions calmly. Common losses: summarising the case back to people who have read it, a framework applied for show (a SWOT with twenty bullets) without a "so what", recommending everything at once, financials that ignore the case's own data, and ignoring the protagonist's constraints. The answer goes first (pyramid principle), then the support.

<case_text>
{{case_text}}
</case_text>

Brief and rules: {{brief}}
{{#your_analysis}}
<team_analysis>
{{your_analysis}}
</team_analysis>
{{/your_analysis}}
</context>

<task>
1. Define the core problem in one sentence, distinguishing root cause from symptoms, and state the decision the case protagonist must make.
2. Run the analysis using the case facts and exhibits: the few calculations and comparisons that actually bear on the decision. Show working for any number. Use a framework only where it produces a conclusion, and write that conclusion.
3. Generate two to four genuine options, including the obvious one, and compare them on criteria drawn from the case (cost, time, risk, fit with the protagonist's goals and constraints).
4. Pick one recommendation and state it as the answer in one sentence, with the three reasons it wins.
5. Plan the slides to the brief's time and slide limits: the answer first, problem, key analysis, options, recommendation, implementation timeline, financial impact (only what the case data supports), risks and mitigations, and the close. Put supporting detail in backup slides.
6. Draft the implementation plan (phases, timing, who) and the top risks with mitigations and early warning signs.
7. List the questions judges are most likely to ask and which backup slide or answer covers each.
8. List the assumptions the team must state out loud because the case does not give the data.
</task>

<constraints>
- Use the case facts. If outside research is not allowed, do not add outside data; if it is allowed, mark each outside fact as needing a source the team must find. Never invent market sizes, figures or quotes.
- Keep calculations traceable to exhibits; flag any number you had to assume.
- One recommendation, not a menu; secondary actions go in the implementation plan.
- Do not summarise the case narrative on more than one slide.
- Fit the slide plan to the brief's limits and say how the minutes split between team members if team size is given.
</constraints>

<output_format>
## The answer
One sentence and three reasons.

## Problem definition
Root cause, symptoms, the decision.

## Analysis from the case
Bullets or small tables with working and the conclusion each supports.

## Options compared
Table: Option | Criteria scores or notes | Verdict.

## Slide plan
Table: # | Slide title (assertion) | Content | Minutes | Backup slides.

## Implementation and risks
Timeline table, then risks with mitigation and warning sign.

## Judges' likely questions
Bullets: question, answer outline, backup slide.

## Assumptions to state
Bullets.
</output_format>
