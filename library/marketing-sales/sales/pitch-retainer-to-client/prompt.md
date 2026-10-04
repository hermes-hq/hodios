---
schema: 1
id: pitch-retainer-to-client
kind: prompt
title: Pitch a retainer to a client
description: Turns a successful one-off project into a retainer pitch for a freelancer or small agency, with the client's ongoing problem, scoped options, a conversation plan and a short written proposal.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [consultant, designer, founder]
requires: [none]
inputs: [notes, text]
output: [plan, script, docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [retainer, recurring-revenue, account-expansion, scope-limits, client-relationship]
pairs_with:
  prompts: [write-sales-proposal, prepare-price-increase-conversation, prepare-renewal-conversation]
args:
  - name: project_summary
    description: The project you just finished - what you delivered, results so far (with numbers if you have them), what the client said about it, and what is still unfinished or will need upkeep.
    type: text
    required: true
  - name: client_goals
    description: What the client is trying to achieve over the next 6-12 months, what they do in-house, who decides on spend, and any hints they gave about future needs.
    type: text
    required: true
  - name: rates
    description: Your day or hourly rate, or what you charged for the project, and the minimum monthly amount worth committing capacity for. Optional; prices are left as [X] if missing.
    type: string
output_contract:
  format: markdown
  sections: [Ongoing problem, Retainer options, Conversation plan, Written proposal, Guardrails]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer or small agency turn a finished project into ongoing work. The moment right after a good result is the easiest time to ask, but most pitches fail because they sell hours ("10 hours a month of design") instead of an ongoing outcome the client cares about, offer one take-it-or-leave-it package, or leave scope so loose that the retainer becomes unlimited work for a fixed fee. A strong retainer pitch names the problem that does not end when the project does, offers two or three options with clear limits and a rollover rule, and is raised in conversation before any document arrives.
</context>

<task>
<project_summary>
{{project_summary}}
</project_summary>

<client_goals>
{{client_goals}}
</client_goals>

{{#rates}}Rates: {{rates}}{{/rates}}

1. Find the ongoing problem: what will decay, grow or keep coming up now the project is done (content needs refreshing, campaigns need running, the system needs maintaining, new pages, reporting). Tie it to the client's goals in their words. If nothing ongoing exists, say so and suggest a lighter option (a quarterly check-in or a paid support block) instead of forcing a retainer.
2. Design two or three options: for example Maintain (upkeep and a monthly check), Grow (upkeep plus a set number of outputs), and Partner (adds strategy and priority response). For each give what is included, a limit (outputs, hours or requests per month), response time, what is out of scope, rollover rule (for example unused hours roll over one month, then expire), minimum term and notice period.
3. Price each from the rates given: monthly fee, the effective rate, and how it compares with buying the same work project by project. Use [X] where rates are missing.
4. Plan the conversation: when to raise it (results review call), the opening question about their next six months, how to introduce options, and replies to "can we just call you when we need you?", "that's more than we budgeted", and "let me think about it".
5. Write the follow-up proposal, one page.
</task>

<constraints>
- Use only results and facts given; do not invent metrics or testimonials. Mark missing figures [X].
- Every option has a written limit and an out-of-scope list; no "unlimited" anything.
- Recommend one option and say why, but present all of them fairly.
- Remind the user that the agreed terms belong in a written agreement and to check it with an adviser if the contract value is significant.
- If the project summary or client goals are missing, ask for them and stop.
</constraints>

<output_format>
## Ongoing problem
Three to five sentences in the client's terms.

## Retainer options
Table: Option | Includes | Monthly limit | Response time | Out of scope | Fee | Term and notice. Then the rollover rule and the recommended option.

## Conversation plan
Timing, opening question, how to present options, and the three objection replies.

## Written proposal
One page: recap of results, the ongoing need, options, how to start, and a start date.

## Guardrails
Bullets: how to track usage, what to do when requests exceed the limit, and when to review the retainer (for example at 90 days).
</output_format>
