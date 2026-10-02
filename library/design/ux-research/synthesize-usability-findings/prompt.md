---
schema: 1
id: synthesize-usability-findings
kind: prompt
title: Synthesize usability test findings
description: Turns raw usability session notes into evidence-backed issues rated by severity and frequency, with task results and recommendations. Use after a round of usability sessions.
category: ux-research
version: 1.0.0
status: incubating
stage: [review]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [notes, transcript]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [usability-testing, synthesis, severity-rating, research-report]
pairs_with:
  prompts: [write-usability-test-plan, build-user-journey-map]
  personas: [ux-researcher]
args:
  - name: session_notes
    description: Notes or transcripts from each session, labelled by participant (P1, P2...). Include quotes, observed actions and task outcomes where recorded.
    type: text
    required: true
  - name: tasks
    description: The tasks participants attempted and their success rules, so outcomes can be scored. Optional; without it, tasks are inferred from the notes.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Task results, Issues, Issue details, What worked, Limitations and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Synthesis goes wrong when the loudest participant sets the agenda, when interpretation is recorded as if it were observation ("users found it confusing"), when one root cause is reported as five separate issues, and when frequency is mistaken for severity. A problem that one in six participants hit, and that cost them their data, matters more than a label everyone hesitated over. The team needs a short, ranked list they can trust and trace back to what people actually did.
</context>

<task>
Synthesize these usability sessions.

<session_notes>
{{session_notes}}
</session_notes>
{{#tasks}}
<tasks>
{{tasks}}
</tasks>
{{/tasks}}

1. Count the participants (N) and list them with any segment information in the notes.
2. Score each task per participant as success, partial or fail, using the given success rules. If no rules were given, infer them, mark them "inferred", and score conservatively. If an outcome is not recorded, write "not recorded" instead of guessing.
3. Extract observations: what a participant did or said, with the participant ID. Keep interpretation separate.
4. Group observations into issues. One issue is one underlying cause; when several symptoms share a cause, merge them and list the symptoms. Do not merge different causes because they happened on the same screen.
5. Rate each issue:
   - **Frequency:** participants affected out of N (e.g. 4/6). Never convert to percentages when N is under 20.
   - **Severity** (1 to 4): 4 critical, the task fails or data is lost, with no workaround; 3 serious, major delay or frustration, or success only with a workaround or help; 2 minor, a short hesitation the participant recovers from alone; 1 cosmetic. Severity reflects impact on the person who hit it, not how many people did.
6. For each issue give the strongest evidence (1 to 3 direct quotes or observed actions, with participant IDs) and a recommendation that states the direction of the fix and what it must achieve, without over-specifying pixels.
7. Note what worked well, so it is not redesigned away, and open questions the data cannot answer.
8. Rank issues by severity, then frequency.
</task>

<constraints>
- Quote only what is in the notes. Never invent or polish quotes. If notes are paraphrased, label the evidence "paraphrased".
- Do not generalise beyond the sample ("users want...") and do not claim statistical significance from a small qualitative study.
- If the notes do not identify participants, or are too thin to separate observation from interpretation, say what is missing and synthesise only what can be supported.
- A participant's suggestion for a solution is data about their problem, not a requirement. Report the problem.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The 3 to 5 most important findings, one sentence each, ranked.
## Task results
| Task | P1 | P2 | ... | Success rate (x/N) | Notes |
## Issues
| ID | Issue | Severity (1-4) | Frequency (x/N) | Tasks affected | Recommendation |
## Issue details
For each issue: what happened, evidence (quotes or actions with participant IDs), likely cause (marked as interpretation), recommendation.
## What worked
## Limitations and open questions
Sample, missing data, inferred success rules, and what to test next.
</output_format>
