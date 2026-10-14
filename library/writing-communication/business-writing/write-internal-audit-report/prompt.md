---
schema: 1
id: write-internal-audit-report
kind: prompt
title: Write an internal audit report
description: Writes an internal audit report with objectives and scope, an overall opinion, findings rated by risk with condition, criteria, cause and effect, recommendations and agreed management actions.
category: business-writing
version: 1.0.0
status: incubating
stage: [review]
role: [consultant, business-analyst, manager, operations-manager]
requires: [none]
inputs: [notes, document, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [internal-audit, audit-report, risk-rating, controls-testing, assurance]
pairs_with:
  prompts: [write-management-response-to-audit, write-executive-summary, write-site-visit-report]
args:
  - name: audit_work
    description: Your working notes, such as the scope, what was tested and how (samples, walkthroughs), exceptions found, evidence references, causes discussed with management, and any management responses already agreed.
    type: text
    required: true
  - name: audit_basics
    description: Audit title, area, period covered, objectives, and who receives the report.
    type: text
    required: true
  - name: rating_scheme
    description: Your organisation's finding ratings and overall opinion scale, if it has one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Audit report, Reviewer notes, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An internal audit report gives the audit committee and management an independent view of whether controls in an area work. Its findings are expected in the condition, criteria, cause, effect format: what was found, what should be, why the gap exists, and what risk it creates, followed by a recommendation and the agreed management action. Reports lose credibility when findings are opinions without test evidence, when sample sizes and exception counts are missing, when ratings are inflated or deflated without reference to the scheme, when the cause is not identified so recommendations treat symptoms, when the overall opinion does not follow from the findings, and when the tone blames individuals. Good reports state scope and limitations, quantify exceptions ("4 of 25 sampled payments"), rate consistently, and include good practice found.
</context>

<task>
Write an internal audit report.

<audit_basics>
{{audit_basics}}
</audit_basics>

<audit_work>
{{audit_work}}
</audit_work>
{{#rating_scheme}}
<rating_scheme>
{{rating_scheme}}
</rating_scheme>
{{/rating_scheme}}

1. If there are no test results or findings in the notes, ask in one short message and stop.
2. Use the organisation's rating scheme if given. Otherwise use high, medium, low for findings and a four-level overall opinion (substantial, reasonable, limited, no assurance), stating that this default scheme is used.
3. Executive summary: objectives, overall opinion with a one-paragraph basis, number of findings by rating, the most significant issues, and good practice noted.
4. Scope, approach and limitations: period, areas covered and excluded, methods (sample sizes, walkthroughs, data analysis), and any limitation on the work.
5. Findings, ordered by rating: title, rating with the reason, condition (quantified, with evidence references), criteria (the policy, procedure or expected control as given), cause, effect or risk, recommendation addressing the cause, and management action, owner and date if agreed; otherwise `[Management response pending]`.
6. Check that the overall opinion is consistent with the findings and say how in one line.
7. Reviewer notes: findings where evidence looks thin, ratings that could be challenged, and places where the notes were ambiguous.
</task>

<constraints>
- Use only the working notes. Never invent test results, sample sizes, exceptions, criteria, causes or management responses.
- Neutral, factual tone; refer to roles, not named individuals, unless the notes require names.
- Do not state laws or external standards as criteria unless the notes cite them.
- Keep each finding to about 150 to 250 words.
</constraints>

<output_format>
## Audit report
Title block; Executive summary; Scope, approach and limitations; Findings (one block each); Good practice; Appendix: summary table of findings (Finding · Rating · Owner · Due).
## Reviewer notes
Bullets for the audit manager's review.
## Gaps to fill
Each `[NEEDED: …]` and pending management response. "None" if none.
</output_format>
