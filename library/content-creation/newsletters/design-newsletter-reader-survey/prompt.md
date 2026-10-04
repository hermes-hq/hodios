---
schema: 1
id: design-newsletter-reader-survey
kind: prompt
title: Design a newsletter reader survey
description: Designs a short reader survey tied to one decision a newsletter writer must make, with eight or fewer neutral questions, how to invite replies and how to read results from a self-selected sample.
category: newsletters
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [writer, content-creator, editor]
requires: [none]
inputs: [text]
output: [questions, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [reader-survey, question-design, audience-research, self-selection, decision-rules]
pairs_with:
  prompts: [audit-newsletter-performance, plan-newsletter-format]
args:
  - name: decision
    description: The decision the survey should inform, for example "whether to go from weekly to twice a month", "what to put in a paid tier", "which of three topics to drop".
    type: text
    required: true
  - name: newsletter_summary
    description: What the newsletter is, who reads it, cadence, and anything you already know from replies or stats.
    type: text
    required: true
  - name: audience_size
    description: Roughly how many subscribers will receive the invitation. Used to estimate how many replies to expect.
    type: number
output_contract:
  format: markdown
  sections: [Decision and what would change it, Survey, Invitation, Reading the results, Questions cut]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design reader surveys for newsletter writers. Most reader surveys fail because they ask everything ("what do you like?") and decide nothing, use leading questions ("How much do you love the Friday links?"), and then treat the answers of the most loyal 3-10% of readers as the voice of the whole list. A useful survey starts from one decision, asks only questions whose answers could change it, asks about past behaviour rather than hypothetical intentions where possible ("Which of the last four issues did you read to the end?" beats "Would you read longer issues?"), and is read with the self-selection bias in mind.
</context>

<task>
<decision>
{{decision}}
</decision>

<newsletter_summary>
{{newsletter_summary}}
</newsletter_summary>
{{#audience_size}}Invitation goes to about {{audience_size}} subscribers.{{/audience_size}}

1. Restate the decision and write the decision rule before any question: what result would make the writer choose option A, B or neither. If the decision is vague, sharpen it and say how.
2. Draft at most eight questions, including exactly one open question. For each: the question, answer options, and which part of the decision it informs. Rules:
   - neutral wording, no leading or loaded terms, no double-barrelled questions;
   - balanced scales with a labelled midpoint and a "not sure" or "does not apply" where honest;
   - behaviour before attitudes; willingness-to-pay questions only as ranges and flagged as overstated;
   - one or two short questions to segment readers (how long subscribed, why they read) so results can be compared across groups;
   - no personal data beyond what the decision needs; email address optional.
3. Write the invitation: a subject line, three to five sentences on why, how long it takes (aim under three minutes), what will be done with answers, and a close date about a week away. One reminder only.
4. Explain how to read the results: expected reply range{{#audience_size}} for about {{audience_size}} subscribers{{/audience_size}} (typically a few percent of the list, more for engaged lists), why respondents skew loyal, comparing segments, treating small differences as noise, and checking survey answers against behaviour data (clicks, replies, churn).
5. List questions you considered and cut because they would not change the decision.
</task>

<constraints>
- Every question must map to the decision; cut the rest even if they are interesting.
- Do not promise statistical certainty; with a self-selected sample, give direction, not percentages of the whole list.
- Do not invent the writer's stats, reader quotes or past results.
- Do not suggest prize draws or incentives without noting that they attract low-quality answers and may have local legal rules.
- If the newsletter summary is missing who reads it or the cadence, ask for it in one line, then proceed with stated assumptions.
</constraints>

<output_format>
## Decision and what would change it
The sharpened decision and the decision rule.

## Survey
Numbered questions with answer options and, in italics, the part of the decision each informs.

## Invitation
Subject, body and the reminder line.

## Reading the results
Bullets, including expected replies and the bias caveats.

## Questions cut
Bullets with one-line reasons.
</output_format>
