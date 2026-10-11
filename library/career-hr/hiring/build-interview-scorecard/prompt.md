---
schema: 1
id: build-interview-scorecard
kind: prompt
title: Build an interview scorecard
description: Builds a scorecard for one role with a few job-related competencies, behavioural anchors for every rating, red flags, a decision rule and an evidence-first layout interviewers can fill in.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [manager, recruiter, engineering-manager, founder]
requires: [none]
inputs: [job-posting, notes]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [interview-scorecard, behavioural-anchors, structured-interview, evidence-based-hiring]
pairs_with:
  prompts: [design-interview-loop, write-interview-feedback, run-hiring-debrief]
  personas: [recruiter]
args:
  - name: role
    description: The role and level, and the job description or the outcomes the person must deliver in the first year.
    type: text
    required: true
  - name: competencies
    description: Competencies or skills you already want to assess, if any. Optional; the prompt proposes them from the role if missing.
    type: text
  - name: interview_stages
    description: The interview stages that will use this scorecard (for example phone screen, technical interview, panel). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Competencies, Rating anchors, Red flags, Decision rule, Scorecard template, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring lead who designs structured interview instruments. Most scorecards fail in the same ways: too many competencies (interviewers cannot assess ten things in 45 minutes), vague labels such as "communication" or "culture fit" that every interviewer reads differently, a 1-5 scale without descriptions so scores reflect mood, and an "overall impression" box that people fill in first and then justify. A scorecard that predicts performance has 4-6 job-related competencies tied to what the person must actually do, a behavioural description of what each rating looks like for this role and level, a space for evidence written before any score, and a decision rule agreed before anyone meets a candidate.

<role>
{{role}}
</role>
{{#competencies}}
<competencies>
{{competencies}}
</competencies>
{{/competencies}}
{{#interview_stages}}
<interview_stages>
{{interview_stages}}
</interview_stages>
{{/interview_stages}}
</context>

<task>
1. Competencies: derive 4-6 competencies from the role's outcomes. For each, a one-line definition specific to this role and level, why it matters in the job, and whether it is a must-have or a nice-to-have. If the user's list is longer, merge or cut and say why. Replace any "culture fit" item with defined behaviours.
2. Rating anchors: a 1-4 scale (1 = clear concern, 2 = below the bar, 3 = meets the bar, 4 = strong) with no midpoint. For each competency, write a concrete behavioural description of what a candidate says or does at each rating, at this level (a senior "meets" is not a junior "meets").
3. Red flags: for each competency, one or two observable warning signs, phrased as behaviour seen in the interview, not personality labels.
4. Decision rule: how ratings combine into a recommendation (for example, no hire if any must-have scores 1; hire needs 3 or above on all must-haves), and what happens with mixed results.
5. Scorecard template: the form interviewers fill in, with evidence notes before each rating, a "not assessed" option, and the overall recommendation last.
6. How to use it: if stages are given, map each competency to the stage that assesses it; otherwise suggest a mapping. Add rules: score independently before the debrief, write what the candidate said or did, and do not score what was not assessed.
</task>

<constraints>
- Keep every competency and anchor job-related; no items about age, family, accent, appearance, nationality, health or other protected characteristics, or proxies such as "energy" or "fits the team".
- Do not invent the role's duties; work from the input and mark assumptions.
- Anchors must describe observable behaviour or evidence, not adjectives such as "excellent" or "weak".
- Keep the scorecard usable in one interview: no more than six competencies.
</constraints>

<output_format>
## Competencies
Table: Competency | Definition for this role | Must-have or nice-to-have.
## Rating anchors
Table per competency: Rating | What it looks like.
## Red flags
## Decision rule
## Scorecard template
## How to use it
</output_format>
