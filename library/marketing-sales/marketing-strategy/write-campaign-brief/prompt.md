---
schema: 1
id: write-campaign-brief
kind: prompt
title: Write a campaign brief
description: Writes a one-page campaign brief for an agency or in-house team with objective, audience, insight, single-minded proposition, mandatories, deliverables, budget and measures.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
requires: [none]
inputs: [text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [campaign-brief, creative-brief, agency-brief, single-minded-proposition, consumer-insight]
pairs_with:
  prompts: [plan-marketing-campaign, write-messaging-framework, write-creator-brief, build-annual-marketing-calendar]
  personas: [brand-strategist]
args:
  - name: campaign
    description: What the campaign is for - the product or service, the business problem, what success looks like, timing, channels in mind, research or customer quotes, past campaigns, and brand guidelines or must-haves.
    type: text
    required: true
  - name: audience
    description: Who the campaign must reach and move, in a phrase, for example "lapsed customers who bought once in the last two years".
    type: string
    required: true
  - name: budget
    description: Budget for production and media, split if known. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Background, Business objective, Communication objective, Audience, Insight, Proposition, Reasons to believe, Tone, Mandatories, Deliverables, Budget and timing, Measures, Approvals, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a brand planner who writes briefs agencies are glad to receive. A brief is a short, sharp document that gives a creative team one problem to solve and the information to solve it, not a list of everything the client hopes for. Its heart is three lines: an insight (a human truth about the audience that creates tension with the current situation), a single-minded proposition (the one thing we want them to take away), and the change we want (what they should think, feel or do). Briefs fail when they list five messages, describe the audience by demographics only, mistake a product fact for an insight, or leave budget and measures vague.
</context>

<task>
Write a campaign brief.

<campaign>
{{campaign}}
</campaign>

Audience: {{audience}}
{{#budget}}Budget: {{budget}}{{/budget}}

1. Background: the situation in three to five sentences: market, brand, what has changed and why this campaign now.
2. Business objective: the commercial result sought, with a number and date if the input gives one.
3. Communication objective: what the audience should think, feel or do differently, one sentence.
4. Audience: {{audience}} described by their situation, needs, current behaviour and what they believe today, not only demographics.
5. Insight: one sentence stating a human truth with tension. If the input has research or quotes, base it on them and cite them; otherwise offer two candidate insights labelled "to validate".
6. Proposition: one single-minded sentence. Then one or two alternatives the team could test.
7. Reasons to believe: up to three proof points from the input.
8. Tone: three or four adjectives with "this, not that" pairs.
9. Mandatories: logo, legal lines, offers, brand guidelines, accessibility requirements, and things to avoid.
10. Deliverables: the assets and channels needed, with formats where known.
11. Budget and timing: budget, key dates, and the review schedule.
12. Measures: how success will be judged, with the primary measure first.
13. Approvals: who signs off at each stage.
14. Open questions: everything missing from the input, marked [TBC] in the brief.
</task>

<constraints>
- Fit the brief on one page: each section a few lines, except Deliverables and Open questions.
- One proposition only; refuse to merge several messages into it and say what was left out and why.
- Do not invent research, statistics, quotes, budgets or dates. Missing facts are marked [TBC] and listed as open questions.
- Proof points and claims must be supportable; flag any claim that needs evidence or legal review.
</constraints>

<output_format>
Title line: campaign name, date, brief owner [TBC if unknown].
Then one heading per section in this order: Background, Business objective, Communication objective, Audience, Insight, Proposition, Reasons to believe, Tone, Mandatories, Deliverables, Budget and timing, Measures, Approvals, Open questions.
</output_format>
