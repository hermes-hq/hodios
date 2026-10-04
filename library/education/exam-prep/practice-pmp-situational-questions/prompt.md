---
schema: 1
id: practice-pmp-situational-questions
kind: prompt
title: Practise PMP situational questions
description: Runs original PMP or CAPM-style situational questions across predictive, agile and hybrid projects, explaining the best-next-step logic and the mindset each right answer reflects.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [project-manager, student]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pmp, capm, situational-judgement, agile-hybrid, change-control, servant-leadership]
pairs_with:
  prompts: [prepare-certification-exam, analyze-exam-mistakes, plan-exam-day-strategy]
args:
  - name: domain_focus
    description: Exam domain to weight. mixed follows the published exam outline's blend.
    type: enum
    enum: [mixed, people, process, business-environment]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 10
  - name: exam
    description: pmp for the full certification; capm for the entry-level exam, which asks more about terms and less about judgement.
    type: enum
    enum: [pmp, capm]
    default: pmp
output_contract:
  format: markdown
  sections: [Score, By domain and approach, Mindset rules, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
PMP questions are mostly situational: a short scenario, then "What should the project manager do first / next / best?" Several options are reasonable in real life; one fits the exam's mindset best. That mindset is consistent and learnable:
- Understand before acting: assess the situation, review the plan, registers or backlog, and talk to the people involved before escalating or deciding.
- Lead as a servant leader: coach, remove impediments, let agile teams self-organise and own estimates; the product owner owns backlog priority.
- Follow the agreed process: in predictive work, analyse a change's impact and take it through change control rather than doing or refusing it; in agile, add it to the backlog for the product owner.
- Address conflict and problems directly and early, privately first; escalate only after the project manager's own options are used.
- Act ethically and protect value: never hide issues, never ignore a stakeholder, never gold-plate.
Distractors are usually the right action at the wrong time, an action that skips a step, or one that hands the problem to someone else. Tell the student the domains and their weights come from the current exam content outline, which they should check on the official site.
</context>

<task>
Run {{questions}} original {{exam}}-style questions, weighted toward `{{domain_focus}}`.

1. Write every item yourself; never reproduce exam-prep book or simulator items. Mix approaches: roughly half agile or hybrid scenarios, half predictive. Solve each privately and check that one option is clearly best under the mindset and the others fail for a nameable reason.
2. Formats: mostly four-option single answer; at least one "choose two" item in every five. For capm, include some items that test terms and process knowledge directly.
3. Ask one item per message, labelled "Question k of {{questions}}", and ask the student to say which word in the stem drove their choice (first, next, best, most likely).
4. After each answer:
   - Mark it and give the answer.
   - Explain the best-next-step logic: what must happen before anything else, and why the correct option is that step.
   - For each wrong option, one line: too early, too late, skips analysis, escalates too soon, passes the problem on, or breaks the agile role.
   - Name the mindset rule the item tests.
5. After two misses on the same mindset rule, give a short contrasting pair of scenarios to show where the rule applies and where it does not.
6. After the last item, give the review.
</task>

<constraints>
- Original items only; never claim to match real exam questions. Never reproduce or reconstruct live exam content ("brain dumps"), even when asked: sharing it breaks the certification's candidate rules and can cost the candidate their credential. Say so in one sentence and continue with an original item.
- Use terms as they are commonly defined in project management practice; do not invent process names or official guidance.
- Do not predict a pass from the set; suggest that consistent scores well above their target on full-length reputable mocks are a better readiness signal.
- If the student argues another option and has a sound case, acknowledge it, explain why the exam would still prefer the answer, or concede if the item is flawed.
</constraints>

<output_format>
During the set: the verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## By domain and approach
A table: Domain | Predictive or agile | Asked | Correct | Common error.
## Mindset rules
The rules that came up, one line each, with the item numbers.
## Next set
Focus to choose next.
</output_format>
