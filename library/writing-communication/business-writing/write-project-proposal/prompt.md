---
schema: 1
id: write-project-proposal
kind: prompt
title: Write a project proposal or business case
description: Writes an internal project proposal or business case covering the problem, options, recommendation, cost, benefits and risks, and marks every missing number instead of inventing it.
category: business-writing
version: 1.0.0
status: experimental
stage: [plan]
role: [manager, project-manager, operations-manager, business-analyst]
requires: [none]
inputs: [notes, text, dataset]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [business-case, options-analysis, roi, internal-proposal]
pairs_with:
  prompts: [write-executive-summary, outline-presentation, prepare-for-tough-questions]
args:
  - name: idea
    description: The project or change you want approved, why you think it is needed, and anything you already know about cost, timing or people.
    type: text
    required: true
  - name: audience
    description: Who approves or funds it and what they weigh most, for example "finance committee, cost-focused" or "my director, cares about team capacity".
    type: string
    required: true
  - name: data
    description: Optional numbers and evidence such as costs, volumes, incident counts, survey results or quotes from vendors.
    type: text
output_contract:
  format: markdown
  sections: [Proposal, Assumptions, Gaps to close before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A proposal is a request for a decision. Approvers ask the same questions every time: what problem, how big, what happens if we do nothing, what else could we do, what will it cost, what do we get and when, what could go wrong, and what exactly are you asking for. Proposals fail when they sell a single solution without alternatives, state benefits with no basis, hide the cost of people's time, or leave the ask vague. A credible business case shows its assumptions so the approver can challenge them.
</context>

<task>
Write a proposal for {{audience}} based on this idea:
<idea>
{{idea}}
</idea>
{{#data}}
Supporting data:
<data>
{{data}}
</data>
{{/data}}

1. If the idea does not say what problem it solves or what is being asked for, ask up to three short questions and stop.
2. State the problem in the approver's terms (money, time, risk, customers, staff), with evidence from the input, and the cost of doing nothing over a stated period.
3. Lay out at least three options, always including "do nothing" and one smaller or cheaper alternative. Compare them on cost, benefit, time to value, risk and effort from existing staff.
4. Recommend one option and give the deciding reason in one sentence.
5. Cost the recommendation: one-off and recurring costs, and people's time. Use figures from the input; where a figure is missing, write `[need: …]` and say who could supply it.
6. State benefits as measurable outcomes with a basis ("saves about 6 hours a week, based on the 120 tickets a month in the data"). Label anything without a basis as an estimate and record the assumption.
7. List the main risks with likelihood, impact and a mitigation for each, and name any dependency on other teams.
8. Define success: two or three measures, the current baseline and the target, and when you will report back.
9. End with the specific ask: what decision, how much money or how many people, by when, and the first step after a yes.
</task>

<constraints>
- Never invent numbers, quotes, vendors or results. Every figure is from the input, a calculation from input figures shown in Assumptions, or a `[need: …]` placeholder.
- Tailor emphasis to {{audience}}, but do not drop risks or costs to make the case look better.
- Keep the proposal to about two pages (roughly 800 to 1,000 words). Lead with a three-sentence summary: problem, recommendation, ask.
- Plain language and active voice; define any acronym the audience may not know.
</constraints>

<output_format>
## Proposal
Sections in this order: Summary · Problem and cost of inaction · Options considered (table: Option | Cost | Benefit | Time to value | Risk | Effort) · Recommendation · Cost and resources · Benefits · Risks and mitigations (table) · Success measures · The ask and next steps.
## Assumptions
Numbered: each assumption or calculation behind a figure, with the input it came from.
## Gaps to close before sending
Bullets: each `[need: …]` placeholder, plus the hardest question the approver is likely to ask that the proposal cannot yet answer.
</output_format>
