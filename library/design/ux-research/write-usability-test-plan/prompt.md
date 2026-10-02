---
schema: 1
id: write-usability-test-plan
kind: prompt
title: Write a usability test plan
description: Writes a usability test plan with scenario tasks, success metrics, participant criteria, a screener and a moderator script, tied to the research questions. Use before running a usability study.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [usability-testing, test-plan, screener, think-aloud]
pairs_with:
  prompts: [synthesize-usability-findings, run-heuristic-evaluation]
  personas: [ux-researcher]
args:
  - name: product
    description: What is being tested and its state (live product, prototype, competitor), the platform, and the flows in scope.
    type: text
    required: true
  - name: research_questions
    description: What the team needs to learn, ideally as questions or decisions the study should inform.
    type: text
    required: true
  - name: method
    description: "moderated: a facilitator runs each session live and can probe. unmoderated: participants complete tasks alone on a testing platform."
    type: enum
    enum: [moderated, unmoderated]
    default: moderated
output_contract:
  format: markdown
  sections: [Goals, Method and logistics, Participants, Tasks, Metrics, Script, Analysis plan, Risks and pilot]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Usability studies usually fail in the plan, not the sessions. Tasks reuse the interface's own labels and so give away the answer ("Click Workspaces and add a member"), tasks are not traceable to any research question, nobody defines what counts as success before the sessions, and the participants are whoever was easy to recruit. A good plan lets the team watch the right people attempt realistic goals and leaves no debate afterwards about what was measured.
</context>

<task>
Write a {{method}} usability test plan.

<product>
{{product}}
</product>

<research_questions>
{{research_questions}}
</research_questions>

1. Rewrite each research question so it is answerable by watching behaviour. Flag questions a usability test cannot answer (willingness to pay, future intent, market size) and name the better method for each.
2. Write 4 to 7 tasks, ordered as a user would naturally meet them. Each task:
   - is a realistic scenario with a goal and a reason ("You just hired Ana and want her to see the Q3 board"), never a list of UI steps;
   - avoids the exact words on the interface's buttons and menus;
   - maps to at least one research question, and every question maps to at least one task;
   - has a defined end state, a success rule (success / partial / fail, with what counts as partial) and a time limit after which the moderator moves on.
3. Choose metrics: task success, time on task, errors or wrong paths, the Single Ease Question (1 to 7) after each task, and SUS or UMUX-Lite at the end. Say which metrics are meaningful at the planned sample size and which are only indicative.
4. Define participants: behaviour-based inclusion criteria (what they do, not job titles alone), exclusions (employees, UX or market-research professionals, anyone who took a study in the last 6 months), and segments. Recommend 5 to 8 per segment for moderated qualitative testing, or 15 to 20 per segment for unmoderated studies that report metrics, and explain the trade-off. Write a short screener with disqualifying answers marked.
5. Write the script for the method:
   - moderated: welcome and consent to record, "we are testing the product, not you", think-aloud explanation with a practice task, 2 to 3 warm-up questions, the tasks, neutral probes ("What are you looking for?", "What did you expect to happen?"), and a debrief;
   - unmoderated: self-contained written instructions, a think-aloud reminder, each task with its follow-up question, one attention check, and closing questions. Every task must be unambiguous without a moderator.
6. Add an analysis plan (how notes will be captured, how severity will be rated), logistics (duration, tools, incentive, observers), and risks, including a pilot session before the real ones.
7. If the product or the questions are too vague to write real tasks (no flows named, no idea what decision the study informs), ask up to three questions and stop.
</task>

<constraints>
- Do not invent product features, data or numbers. Where a task needs realistic content (an account, a record), say what test data must exist.
- Moderator prompts must be neutral: no leading questions and no confirming whether the participant is right.
- Keep the session length realistic: 45 to 60 minutes moderated, 15 to 25 minutes unmoderated.
- Include consent and data handling: what is recorded, who sees it, and how long it is kept.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals
Background in 2 to 3 sentences, then the research questions as rewritten, and any question routed to another method.
## Method and logistics
Method, platform, session length, location or tool, observers, incentive.
## Participants
Segments and counts, inclusion and exclusion criteria, then the screener as a numbered list with disqualifying answers marked.
## Tasks
| # | Scenario (as read to the participant) | Research question | Success rule | Time limit |
## Metrics
What is measured, how, and how it will be reported.
## Script
The full moderator script, or the participant instructions for unmoderated.
## Analysis plan
## Risks and pilot
</output_format>

<examples>
<example>
Weak task: "Go to Settings > Team and invite a new member."
Strong task: "A new colleague, Ana, starts on Monday. Make sure she can see and edit the Q3 planning board before then." Success: Ana is invited with edit rights to that board. Partial: invited to the workspace but without board access. Limit: 4 minutes.
</example>
</examples>
