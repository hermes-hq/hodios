---
schema: 1
id: build-support-qa-scorecard
kind: prompt
title: Build a support QA scorecard
description: Builds a support quality scorecard with weighted criteria, scoring examples, auto-fail rules, calibration steps and coaching use. For support managers reviewing ticket and chat quality.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, review]
role: [support-agent, manager, operations-manager]
inputs: [text, document]
output: [table, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quality-assurance, scorecard, rubric, calibration, coaching, ticket-review]
pairs_with:
  prompts: [write-support-reply, build-support-macros, analyze-support-tickets]
  rules: [support-tone-rules]
args:
  - name: support_context
    description: Your support setup - channels, products, ticket types, team size and experience, current quality problems, and any sample tickets (anonymised) that show good and bad work.
    type: text
    required: true
  - name: values
    description: What great support means for your brand - tone, policies agents must follow, compliance requirements, what customers complain about most.
    type: text
output_contract:
  format: markdown
  sections: [Scorecard, Scoring guide, Auto-fail rules, Sampling, Calibration, Coaching use, Rollout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build quality programmes for support teams. A good QA scorecard measures what the customer experienced and what the business needs (correct resolution, policy followed, effort for the customer, tone) with criteria precise enough that two reviewers give the same score. Scorecards fail when they reward box-ticking (using the customer's name three times), when criteria are vague ("was empathetic"), when scores are used to punish rather than coach, or when nobody calibrates and the score depends on who reviewed the ticket.
</context>

<task>
Build the QA scorecard.

<support_context>
{{support_context}}
</support_context>
{{#values}}
<values>
{{values}}
</values>
{{/values}}

1. Scorecard: 5-8 criteria grouped into resolution (correct and complete answer, first-contact resolution where possible, correct next steps), process (policy and procedure, verification, tagging and notes), and communication (clarity, tone matching the customer's state, ownership, customer effort). Weight them so resolution counts most, totalling 100. Adapt the criteria to the channels and ticket types given. State the scoring formula (for example score = sum of weight x level / maximum level, rounded; any auto-fail sets the score to 0), how "not applicable" criteria are handled (removed and the remaining weights rescaled to 100), and the pass mark, so every reviewer gets the same number from the same levels.
2. Scoring guide: for each criterion, a 0-2 or 0-3 scale (keep scales short for consistency) with a definition of each level written as observable behaviour, and a short example of each level drawn from or modelled on the ticket types described.
3. Auto-fail rules: the few critical errors that zero a review regardless of other scores (for example a data protection breach, giving wrong information that causes financial loss, a promise against policy, rudeness). Keep the list short.
4. Sampling: how many interactions to review per agent per week or month, how to select them (random plus targeted, such as low satisfaction, long handle times, escalations), and how to cover every channel.
5. Calibration: a monthly session format where reviewers score the same tickets independently, compare, discuss differences and update the guide; the agreement target and how to track it.
6. Coaching use: how scores feed one-to-ones (focus on one or two behaviours, use the ticket as the example, agree an action), how agents can self-review and dispute scores, and what QA scores should not be used for on their own.
7. Rollout: a pilot with a baseline, communication to the team, and the review after one month. Include how QA results will be compared with customer satisfaction to check that the scorecard measures what customers value.
</task>

<constraints>
- Every criterion must be observable in the transcript or ticket; no mind-reading criteria such as "the agent cared".
- Do not reward scripted rituals that customers do not value.
- Do not invent the company's policies; reference the values given and mark policy-specific checks as [YOUR POLICY].
- Keep the scorecard short enough to score one ticket in about five minutes.
</constraints>

<output_format>
## Scorecard
Table: Group | Criterion | Weight | Scale. Then the scoring formula, the not-applicable rule and the pass mark.
## Scoring guide
For each criterion: a table Level | Definition | Example.
## Auto-fail rules
## Sampling
## Calibration
## Coaching use
## Rollout
</output_format>
