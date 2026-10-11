---
schema: 1
id: write-terms-of-reference
kind: prompt
title: Write terms of reference
description: Writes terms of reference for a committee, working group, review or consultancy assignment, covering purpose, scope, membership, authority, ways of working, outputs and review date.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, design]
role: [manager, project-manager, consultant, operations-manager]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [terms-of-reference, committee, working-group, governance, mandate]
pairs_with:
  prompts: [write-formal-minutes, write-project-proposal, write-team-charter]
args:
  - name: body_and_purpose
    description: What the group or assignment is, why it is being set up, who set it up, and what it must deliver.
    type: text
    required: true
  - name: tor_type
    description: What kind of terms of reference.
    type: enum
    enum: [standing-committee, working-group, review-or-inquiry, consultancy-assignment]
    default: working-group
  - name: details
    description: Anything decided so far, such as members, chair, meeting frequency, budget, deadline, decisions it can make, who it reports to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Terms of reference, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Terms of reference (ToR) are the mandate for a group or an assignment: why it exists, what it may and may not do, who is in it, and when it ends. Most problems with committees and reviews trace back to a weak ToR: scope creep because boundaries were never written, deadlock because quorum and decision rules were missing, a group that cannot act because it does not know whether it decides or only recommends, and groups that never close because there was no end date or review. For consultancy assignments the ToR is the basis of the contract, so deliverables, timelines, reporting lines and acceptance must be specific enough to judge whether the work was done.
</context>

<task>
Write terms of reference of type {{tor_type}}.

<body_and_purpose>
{{body_and_purpose}}
</body_and_purpose>
{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. If the purpose is unclear, ask up to two short questions and stop.
2. Write the purpose and background in three to five sentences: why the group or assignment exists and the problem it addresses.
3. Scope: what is in scope and, explicitly, what is out of scope. Out-of-scope items prevent most scope creep, so name at least two realistic ones.
4. Authority: whether it decides, recommends or advises, any spending limit, and who it reports to.
5. For committees and working groups: membership by role (and names only if given), chair and deputy, quorum, decision rule (consensus or vote), conflicts of interest, meeting frequency, papers and minutes, and observers.
6. For reviews: the questions to be answered, evidence to be gathered, who will be consulted, independence, and confidentiality.
7. For consultancy assignments: objectives, specific tasks, deliverables with format and due dates, client inputs, reporting and meetings, acceptance of deliverables, required skills, and the level of effort if given.
8. Outputs and timeline, and the end or review date: when the ToR will be reviewed or the group closed.
9. List open questions where the input left a choice unmade.
</task>

<constraints>
- Use only facts given for names, budgets and dates; mark gaps `[NEEDED: …]`. Where a standard choice is needed (for example quorum), propose a sensible default and label it "proposed".
- Plain language; numbered clauses so the ToR can be referenced in minutes.
- Keep it to about one to two pages.
- For a consultancy ToR, do not set fees or legal contract terms; note that commercial terms sit in the contract.
</constraints>

<output_format>
## Terms of reference
Title, version and date; numbered sections: Purpose and background, Scope (in and out), Authority and reporting, Membership or Team, Ways of working, Questions or Tasks, Outputs and timeline, Review and closure.
## Open questions
Choices the sponsor still needs to make. "None" if none.
</output_format>
