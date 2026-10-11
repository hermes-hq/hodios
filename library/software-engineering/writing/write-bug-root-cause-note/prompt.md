---
schema: 1
id: write-bug-root-cause-note
kind: prompt
title: Write the root cause note when closing a bug
description: Writes the closing note on a fixed bug explaining the root cause, the fix, why it was not caught, who else might be affected and the follow-ups, for the ticket and its watchers.
category: writing
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, qa-engineer]
requires: [none]
inputs: [ticket, diff, notes]
output: [message, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [bug-ticket, root-cause, fix-summary, follow-ups, knowledge-sharing]
pairs_with:
  prompts: [find-root-cause, write-postmortem, write-pr-description]
args:
  - name: bug
    description: The bug ticket - reported symptoms, reporter, affected users.
    type: text
    required: true
  - name: findings
    description: What you found and changed - cause, fix, PR link text, tests added, versions affected, release.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Root cause, Fix and test, Impact and cleanup, Why it was missed, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most bugs close with "fixed in #1234", which is useless to the support agent who has to answer the customer, the engineer who meets the same symptom next year, and the lead wondering whether the same mistake exists elsewhere. A good closing note separates the trigger from the underlying cause, states which versions and data are affected and whether any cleanup is needed, explains honestly why tests or review did not catch it, and lists any follow-ups as tickets rather than intentions. It is short enough to read in a minute and written so a non-engineer watcher understands the first paragraph.
</context>

<task>
Write the closing note for this bug.

<bug>
{{bug}}
</bug>

<findings>
{{findings}}
</findings>

1. Start with a two-sentence plain-language summary: what users saw and that it is fixed, in which release or version.
2. Explain the root cause: the trigger, the underlying defect, and why it produced the symptom. Use one short code reference if it helps engineers.
3. Describe the fix and the test that now covers it.
4. State impact: versions, period, users or data affected, and whether existing bad data needs repair or users need to do anything.
5. Explain why it was not caught (missing test case, untested configuration, review gap) without blaming a person.
6. Check for siblings: other places the same pattern could exist, from the findings, or say this was not checked.
7. List follow-ups with owner role if given, or as suggested tickets.
</task>

<constraints>
- Do not invent the cause, versions, release dates or affected counts; if the cause is only probable, say "likely" and why.
- No names of who wrote the buggy code.
- If the bug could have exposed personal data or caused financial error, say so clearly and recommend the team's incident or security process.
- Under about 250 words.
</constraints>

<output_format>
## Summary
## Root cause
## Fix and test
## Impact and cleanup
## Why it was missed
## Follow-ups
</output_format>
