---
schema: 1
id: write-rfc
kind: prompt
title: Write an RFC
description: Drafts a technical RFC or design proposal with a clear problem, goals and non-goals, the proposed design, honest alternatives and open questions. Use before building something others must agree on.
category: writing
version: 1.0.0
status: experimental
stage: [design, plan]
role: [software-engineer, tech-lead, architect]
requires: [none]
inputs: [notes, text, spec]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rfc, design-doc, proposal]
args:
  - name: proposal
    description: What you want to propose, in rough notes. Include the problem, the idea and any constraints you know.
    type: text
    required: true
  - name: context
    description: Background readers need, such as the current system, data, incidents, or links to earlier discussions.
    type: text
  - name: template
    description: Your organisation's RFC template, if it has one. Its headings replace the default ones.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Problem, Goals and non-goals, Proposal, Alternatives considered, Risks and drawbacks, Rollout, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An RFC exists to get a decision from people who were not in the author's head: reviewers need to agree that the problem is real, that the proposal solves it, and that the obvious alternatives were weighed fairly. RFCs fail when the problem is assumed rather than shown, when non-goals are missing so scope creeps in review, and when alternatives are straw men. The draft should make disagreement easy to express, through explicit assumptions and open questions.
</context>

<task>
Draft an RFC from these notes:
<notes>
{{proposal}}
</notes>
{{#context}}
Background:
<background>
{{context}}
</background>
{{/context}}
{{#template}}
Use this template's headings and fill each one:
{{template}}
{{/template}}

1. State the problem with the evidence in the notes (incidents, metrics, user reports, cost). If there is no evidence, write the problem as an assumption and add a question asking for data.
2. Write goals as outcomes that can be checked, and non-goals that name the nearby things this proposal will not do.
3. Describe the proposal in enough detail to review: components, data flow, interfaces or schemas, failure behaviour, security and privacy impact, and cost. Use a short diagram in text or Mermaid only if it clarifies the data flow.
4. Give at least two real alternatives, including "do nothing", each with its strongest honest case and the specific reason it loses.
5. List risks and drawbacks of the proposal itself, with mitigations.
6. Describe rollout: phases, migration, feature flags, how to measure success and how to roll back.
7. Collect open questions, each addressed to the people or team who can answer it, if known.
</task>

<constraints>
- Never invent numbers, incidents, costs, team names or deadlines. Write `[needs data: ...]` where a figure is missing.
- Keep the author's proposal. If you see a serious flaw, say so under Risks or Open questions rather than quietly designing something else.
- Separate facts from the notes and your inferences; mark assumptions as assumptions.
- Aim for something a reviewer can read in 10 minutes. Cut background that does not change the decision.
</constraints>

<output_format>
Markdown with a title line, a status line (`Status: Draft`), then the sections: Summary (three sentences at most), Problem, Goals and non-goals, Proposal, Alternatives considered, Risks and drawbacks, Rollout, Open questions.
After the RFC, a short list "Missing before review" naming the data or decisions the author still has to supply.
</output_format>
