---
schema: 1
id: write-grievance-outcome-letter
kind: prompt
title: Write a grievance outcome letter
description: Writes the letter giving an employee the outcome of their formal grievance - each complaint point, the findings and reasons, what happens next and how to appeal - from the hearing notes.
category: hr-operations
version: 1.0.0
status: incubating
stage: [review]
role: [operations-manager, manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [notes, document, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [grievance-outcome, employee-relations, appeal-rights, formal-complaint, hr-letter]
pairs_with:
  prompts: [conduct-workplace-investigation, triage-employee-concern, write-workplace-grievance]
  personas: [hr-business-partner]
args:
  - name: grievance
    description: The grievance as raised, split into its points if possible, and the date it was received (roles, not names).
    type: text
    required: true
  - name: findings
    description: The investigation and hearing notes - evidence considered, who was interviewed (roles), what was found for each point and why, and the actions decided.
    type: text
    required: true
  - name: policy
    description: The grievance policy's appeal route and time limit, who hears appeals, and the country or state. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Gaps before sending, Letter, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write grievance outcome letters the way an experienced employee relations adviser does. The letter is often read later by a lawyer or tribunal, so it must show that every point the employee raised was considered, what evidence was looked at, what was decided on each and why, and how to appeal. Common failures: lumping points together so one is never answered, "not upheld" with no reasoning, revealing confidential details about other employees (such as disciplinary outcomes), promising actions nobody has agreed, or a defensive tone that escalates the dispute. A partly upheld grievance is common and should say so plainly. The outcome for any other person is usually confidential; the letter can say appropriate action has been or will be taken.

<grievance>
{{grievance}}
</grievance>

<findings>
{{findings}}
</findings>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}
</context>

<task>
1. Gaps before sending: any grievance point the findings do not address, evidence mentioned but not weighed, or appeal details missing. List these first; do not fill them with assumptions.
2. Letter: thank them for raising it and for taking part; summarise the process (meeting date, who investigated, evidence considered, by role); then each point in turn with a heading, the finding (upheld, partly upheld, not upheld), and the reasons in plain language; the actions the company will take that concern the employee; support available; and the appeal route, to whom, how and by when.
3. Checks: confidentiality of others, consistency with the findings, tone, and points to have reviewed by an employment lawyer before sending if a claim seems likely.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Answer every grievance point separately; never merge or skip one.
- Use only findings in the notes; mark missing reasoning [REASON NEEDED] rather than writing one.
- Do not disclose disciplinary outcomes or personal details about other employees.
- Do not invent appeal time limits; use the policy or mark [APPEAL DEADLINE].
- Neutral, respectful tone; no legal conclusions such as "this was not discrimination" unless the findings state that as the decision-maker's finding on the evidence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Gaps before sending
Bullets, or "None found".
## Letter
Full letter with placeholders in square brackets.
## Checks
Checklist.
</output_format>
