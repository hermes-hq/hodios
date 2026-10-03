---
schema: 1
id: prepare-product-review-meeting
kind: prompt
title: Prepare for a product review meeting
description: Prepares a product manager for an executive product review with the narrative, an opening, metrics against goals, framed decisions, likely hard questions with answers and a pre-wire plan.
category: product-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [product-manager, engineering-manager, founder]
requires: [none]
inputs: [text, notes, document]
output: [outline, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [executive-review, stakeholder-management, decision-framing, presentation-prep, hard-questions]
pairs_with:
  prompts: [write-roadmap-update, plan-stakeholder-alignment, set-kill-criteria, write-experiment-readout]
args:
  - name: product_status
    description: Where the product or initiative stands. Goals and metrics against them, what shipped, what slipped and why, learnings, risks, team and budget, and how the last review went.
    type: text
    required: true
  - name: asks
    description: Decisions, resources or support you need from the executives, and anything you are worried about being asked. Optional.
    type: text
  - name: audience
    description: Who is in the room and what each cares about, if you know.
    type: string
    default: the executive team
  - name: minutes
    description: How long the review slot is.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [The story in one paragraph, Opening, Metrics, Decisions needed, Risks, Likely questions, Pre-wire plan, Leave out, Agenda]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has sat on both sides of executive product reviews. You know what executives want from them: an honest read on whether the bet is working, the few numbers that show it, the decisions they need to make, and confidence that the product manager understands the business. Reviews go badly when the presenter walks through activity instead of outcomes, hides a missed goal on slide twelve, asks for a decision without framing the options, or meets a predictable question unprepared. They go well when bad news comes early with a plan, and when key people heard the hard parts before the meeting.
</context>

<task>
<product_status>
{{product_status}}
</product_status>
{{#asks}}

<asks>
{{asks}}
</asks>
{{/asks}}

Audience: {{audience}}. Slot: {{minutes}} minutes.

If there are no goals or metrics in the status, ask what the product was supposed to achieve and what the latest numbers are, then stop.

1. **The story in one paragraph.** What the product set out to do, where it is against that, what was learned, and what happens next. This is the spine of the meeting.
2. **Opening.** What to say in the first 60 seconds: the headline (on track, at risk or off track, and why), the decision you need today, and how the time will be used.
3. **Metrics.** Three to five numbers that matter, each against its goal and trend, with a one-line explanation. For any miss, the cause and the response. Leave out vanity metrics.
4. **Decisions needed.** For each ask: the decision in one sentence, the options with trade-offs, your recommendation, what happens if it is not decided today, and the deadline.
5. **Risks.** The top two or three with mitigation and what you need from leadership, if anything.
6. **Likely questions.** Eight to twelve hard questions this audience is likely to ask about this status (why a goal was missed, what you would cut, what more people would change, what the competition is doing, why not stop, how confident you are in the numbers), each with a short, honest answer drafted from the status, or [NEED DATA] where the status cannot support one.
7. **Pre-wire plan.** Who to brief before the meeting, what to tell each, and what you want to learn from them, especially anyone who could be surprised or block a decision.
8. **Leave out.** Details that would distract, to keep in an appendix.
9. **Agenda.** Timed to {{minutes}} minutes, with at least a third of the time for discussion and decisions.
</task>

<constraints>
- Use only the facts in the status. Never invent numbers, causes or quotes; mark gaps.
- Bad news goes first, with the plan. No spin, no burying misses.
- Keep it decision-focused: every section should help the executives decide or trust the plan.
{{> output/uncertainty}}
</constraints>

<output_format>
## The story in one paragraph
## Opening
A short script, about 120 words.
## Metrics
| Metric | Goal | Actual | Trend | What it means |
## Decisions needed
## Risks
## Likely questions
| Question | Suggested answer |
## Pre-wire plan
| Who | What to share | What to learn |
## Leave out
## Agenda
</output_format>
