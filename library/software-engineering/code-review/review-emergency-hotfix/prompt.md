---
schema: 1
id: review-emergency-hotfix
kind: prompt
title: Review an emergency hotfix
description: Reviews a hotfix under time pressure during an incident, checking it targets the cause, is the smallest safe change, can be rolled back, and records the follow-ups that the rush skipped.
category: code-review
version: 1.0.0
status: incubating
stage: [review, operate]
role: [software-engineer, sre, tech-lead]
requires: [none]
inputs: [diff, logs, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hotfix, incident-response, rollback, minimal-change, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-diff-for-risks, write-postmortem, backport-fix-to-release-branches]
args:
  - name: diff
    description: The hotfix diff.
    type: text
    required: true
  - name: incident
    description: What is broken in production, the evidence (errors, logs, metrics) and what the author believes the cause is.
    type: text
    required: true
  - name: alternatives
    description: Other options on the table, for example rolling back the last deploy or flipping a feature flag. Leave empty if none were considered.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Does it fix the cause, Blocking risks, Ship checklist, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
During an incident the review has a different job: not "is this the best code" but "will this make things better and not worse, right now". Hotfixes fail in predictable ways: they fix the symptom the author saw rather than the cause, they bundle a refactor or an unrelated fix, they bypass the checks that would have caught a typo, they cannot be rolled back because they include a migration or data change, or they fix main but not the release branch actually deployed. Often the fastest safe fix is not code at all: rolling back the last deploy or turning off a feature flag. The reviewer should be fast, block only on what could make the incident worse, and write down everything deferred.
</context>

<task>
<diff>
{{diff}}
</diff>

<incident>
{{incident}}
</incident>

{{#alternatives}}
<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}

1. Check the diagnosis: does the evidence support the stated cause, and does the diff change the code path that the evidence points to? If not, say what evidence is missing.
2. Ask whether a rollback or flag flip would restore service faster or with less risk, and say which you would do first if it is an option.
3. Check scope: everything in the diff not needed to stop the incident should be removed and done later.
4. Check for ways it makes things worse: new exceptions on the hot path, changed behaviour for unaffected users, data writes or migrations that cannot be undone, config that affects all regions at once, missing null or error handling in the new lines.
5. Check deployability: does it target the branch and version actually in production, will CI and the minimum tests run, can it be canaried or rolled out gradually, and how will we confirm it worked (which metric should move, within how long).
6. List follow-ups the rush skipped: tests, backports, cleanup of temporary code, the post-incident review.
</task>

<constraints>
- Block only on risks that could prolong or worsen the incident or lose data; everything else goes to follow-ups.
- Keep the review short enough to read in two minutes.
- Do not claim the fix will work; say what metric or log will prove it.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: ship | ship after these changes | do not ship, prefer rollback or flag.
## Does it fix the cause
Two or three sentences.
## Blocking risks
Numbered, or "none".
## Ship checklist
Checkbox list: target branch, tests to run, rollout, verification metric, rollback step.
## Follow-ups
Checkbox list.
</output_format>
