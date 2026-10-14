---
schema: 1
id: anticipate-reviewer-objections
kind: prompt
title: Anticipate reviewer objections before you submit
description: Predicts the objections referees are most likely to raise on your manuscript, ranks them by risk to acceptance, and plans a fix, a pre-emptive sentence or an analysis for each before you submit.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pre-submission, reviewer-objections, limitations, manuscript, revision-planning]
pairs_with:
  prompts: [respond-to-reviewers, check-manuscript-for-overclaiming, choose-target-journal]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: Your manuscript, or at least the abstract, introduction, methods summary, main results and limitations.
    type: text
    required: true
  - name: target_venue
    description: The journal or conference you will submit to and what it values, if known.
    type: string
    required: true
  - name: known_weak_spots
    description: Optional. Weaknesses you already know about, and earlier reviewer comments if this is a resubmission elsewhere.
    type: text
output_contract:
  format: markdown
  sections: [Biggest risks, Likely objections, Plan, What to leave alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most referee objections are predictable from the manuscript: the obvious alternative explanation the paper never addresses, the comparison or baseline any expert would expect, the sample that does not support the generality of the claim, the missing robustness check that is standard in the field, the claim to novelty that ignores a well-known line of work, and the limitation the authors know about but tucked away. Experienced authors run this exercise before submission, playing the methodologist, the sceptical field expert and the editor who asks "so what?". For each predicted objection there are four honest responses: fix it (run the analysis, add the comparison), address it pre-emptively in the text (explain the choice and show the evidence), narrow the claim so the objection no longer applies, or accept it as a stated limitation. Hiding a weakness rarely works and costs credibility when a reviewer finds it. Over-preparing is a risk too: answering every conceivable objection bloats the paper and draws attention to minor issues.
</context>

<task>
Anticipate reviewer objections for my submission to {{target_venue}}.
<manuscript>
{{manuscript}}
</manuscript>
{{#known_weak_spots}}
<known_weak_spots>
{{known_weak_spots}}
</known_weak_spots>
{{/known_weak_spots}}

1. State the paper's central claim and the evidence it rests on in two sentences, as a referee would summarise it.
2. Read the manuscript from three reviewer positions: a methods specialist, a sceptical expert in the topic, and the editor judging fit and importance for this venue.
3. List the objections each is likely to raise, with the passage that would trigger it.
4. Rank them by risk: could lead to rejection, likely to require major revision, or minor.
5. For each, recommend one response: fix (with the specific analysis or addition), pre-empt in the text (with a sample sentence), narrow the claim (with revised wording), or state as a limitation.
6. Say which minor objections are not worth pre-empting.
</task>

<constraints>
- Ground each objection in the text; do not raise generic objections that do not apply to this paper.
- Never suggest hiding weaknesses, selectively reporting analyses or adding spin to dodge a likely objection.
- Do not invent prior literature the paper ignores; describe the kind of work a reviewer would expect to see engaged, and mark it to check.
- Keep recommended additions proportionate to the venue's length limits.
- Remind the user to check the venue's AI-use policy for manuscript preparation if it has one.
</constraints>

<output_format>
## Biggest risks
The two or three objections most likely to sink the paper, in one short paragraph each.
## Likely objections
Table: objection | reviewer position | trigger passage | risk (reject, major, minor).
## Plan
Numbered by priority: objection, response type, the specific action or sample wording.
## What to leave alone
</output_format>
