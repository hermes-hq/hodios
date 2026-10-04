---
schema: 1
id: workplace-language-onboarding-track
kind: workflow
title: Workplace language onboarding
description: Takes a new employee working in a second language through gated steps - map the job's conversations, build a phrase bank, rehearse the top situations, review real interactions and set the next focus.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [discover, plan, learn, review]
role: [language-learner, manager]
requires: [none]
inputs: [text, notes, transcript]
output: [plan, table, conversation, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [workplace-language, new-starter, phrase-bank, real-interaction-review, first-month]
pairs_with:
  prompts: [learn-language-for-work-role, practise-first-week-at-work, practise-conversation-strategies, review-speaking-transcript]
  personas: [frontline-workplace-language-coach, business-english-coach]
args:
  - name: target_language
    description: The language used at work, with the country (for example "Swedish (Sweden)", "English (New Zealand)").
    type: string
    required: true
  - name: job
    description: The job and workplace, as specifically as possible (for example "pharmacy assistant in a busy city pharmacy", "junior QA engineer in a 40-person software company").
    type: string
    required: true
  - name: level
    description: The new employee's CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: who_is_using_this
    description: Who runs the track - the employee alone, or the employee with a manager or mentor who joins the review step.
    type: enum
    enum: [employee-alone, with-mentor]
    default: employee-alone
steps:
  - {id: map, file: steps/01-map-conversations.md, stage: discover, gate: approve, artifact: "onboarding/01-conversation-map.md"}
  - {id: phrase-bank, file: steps/02-phrase-bank.md, stage: plan, gate: approve, artifact: "onboarding/02-phrase-bank.md"}
  - {id: rehearse, file: steps/03-rehearse.md, stage: learn, gate: approve}
  - {id: review, file: steps/04-review-real-interactions.md, stage: review, gate: approve, artifact: "onboarding/04-review.md"}
  - {id: next-focus, file: steps/05-next-focus.md, stage: plan, gate: none, artifact: "onboarding/05-next-focus.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Supports someone in their first weeks of a job that runs in {{target_language}}, a language they are still learning. Generic courses teach the wrong things first; this track starts from the job itself: the conversations and documents that come up every week, the phrases that make them work, rehearsal of the riskiest and most frequent situations, and then a review of what actually happened at work, so the next round of practice targets real gaps. Steps 1-2 can be done before day one; steps 4-5 after one to three weeks in the job.

<job>
{{job}}
</job>

Level (CEFR): {{level}}
Who is using this: {{who_is_using_this}}

Rules for every step:
- Use only facts the employee or mentor gives about the job, the team and the workplace. Ask for missing essentials in one message and mark gaps as [X]; never invent procedures, names or policies.
- Safety-critical language comes first in every step. Safety rules, procedures and policies themselves come from the employer's induction and training; say so when a step touches them.
- Keep language at {{level}}: chunks before grammar, the informal forms colleagues really use, and pronunciation hints for hard words.
- Explanations go in the language the employee writes in; phrases and scenes in {{target_language}}.
- With a mentor: write for both, and keep feedback about language and communication, never an assessment of job performance.
- Ask the employee to remove customers', patients' and colleagues' names and personal details from anything they paste.
- If the employee mentions unpaid work, unsafe conditions, harassment or exploitation, pause the track, say it is not acceptable, and point to HR, a union, the labour inspectorate or a support organisation, and to local emergency services if they are in danger.
- End each step with open questions and stop for approval where the step says so.
{{> guardrails/crisis-safety}}
