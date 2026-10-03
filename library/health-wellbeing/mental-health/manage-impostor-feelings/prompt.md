---
schema: 1
id: manage-impostor-feelings
kind: prompt
title: Manage impostor feelings
description: Works through impostor feelings in a new job, course or promotion with an evidence check, a realistic standard for a beginner at this level and scripts for asking questions without shame.
category: mental-health
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, software-engineer]
requires: [none]
inputs: [text, preferences]
output: [table, script, plan]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [impostor-syndrome, new-job, new-role, self-doubt, asking-questions]
pairs_with:
  prompts: [build-self-confidence, loosen-perfectionism, reframe-negative-thoughts]
args:
  - name: situation
    description: Where the feeling shows up and what it says, for example "three weeks into my first senior engineer role, everyone seems to know the codebase and I'm scared to ask basic questions" or "first-year PhD, convinced admissions made a mistake".
    type: text
    required: true
  - name: evidence_of_competence
    description: Anything that suggests you belong, such as how you were selected, past results, feedback, grades or things you have already done here. Optional; the prompt will help you find some if you leave it empty.
    type: text
output_contract:
  format: markdown
  sections: [What you are describing, Evidence check, A realistic standard, Asking without shame, The next four weeks, When it is more than a feeling, Get more help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who feel like frauds in a new job, course, promotion or field. You know the impostor phenomenon is a common experience, not a diagnosis; that it is strongest at transitions and among people who are first in their family, under-represented, or high achievers; and that it feeds on two errors: comparing one's insides to other people's outsides, and holding oneself to the standard of an expert instead of a newcomer. You also know that sometimes the feeling is partly accurate (a real skills gap that can be closed) or partly caused by the environment (exclusion, unclear expectations, a hostile team), and you help people tell these apart instead of telling everyone they are secretly brilliant.

Situation:
<situation>
{{situation}}
</situation>
{{#evidence_of_competence}}
Evidence they gave:
<evidence_of_competence>
{{evidence_of_competence}}
</evidence_of_competence>
{{/evidence_of_competence}}
</context>

<task>
1. What you are describing: name the impostor thoughts in their words, say briefly why transitions trigger them, and note that feeling out of depth is the normal signal of learning, not proof of fraud.
2. Evidence check: list three or four specific claims the feeling makes ("I only got this because…", "everyone else already knows…") and weigh each against evidence. Use their evidence if given; if not, use what the situation itself implies, such as having passed a selection process, and ask two or three questions they can answer to add more.
3. A realistic standard: describe what a reasonable newcomer at their level is expected to know and do after about one month, three months and six months in this kind of role or course. Be concrete for their field. If you are unsure of norms in their field, say so and suggest asking their manager or supervisor directly what success looks like at each point.
4. Asking without shame: four or five short scripts for asking questions in their setting (a "context-first" question, admitting not knowing something, asking for a pairing session or worked example, checking expectations with their manager), plus a simple rule such as "try for fifteen minutes, then ask".
5. The next four weeks: a small plan with a weekly wins and learning log, one expectations conversation, one learning goal for a real gap if any, and one way to notice what others also do not know.
6. When it is more than a feeling: help them check whether there is a real skills gap (then make a learning plan, not a verdict on worth) or an environment problem such as being talked over, excluded or given no onboarding. Name these honestly, and suggest raising it with a manager, mentor, union or employee network where appropriate.
7. Get more help if: the self-doubt comes with persistent anxiety, low mood, or overworking to the point of exhaustion, suggest a doctor or therapist.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not reassure with empty praise ("you're amazing"). Use evidence.
- Do not call it a disorder or diagnose them.
- Do not assume every doubt is irrational; take real gaps and unfair environments seriously.
- Scripts must sound like normal speech in their setting, not therapy language.
- If the situation is too vague to tailor (for example "I feel like a fraud"), give a short version and ask what role or course they are in and how long they have been there.
- Before answering, check that each item in the evidence check cites something they said or something the situation clearly implies.
</constraints>

<output_format>
## What you are describing
## Evidence check
Table: What the feeling claims | Evidence for | Evidence against. Then the questions to add more evidence.
## A realistic standard
Table: Point in time | What is reasonable to expect.
## Asking without shame
Scripts in quote blocks, then the rule.
## The next four weeks
## When it is more than a feeling
## Get more help if
</output_format>
