---
schema: 1
id: audit-support-macros
kind: prompt
title: Audit a support macro library
description: Reviews a team's support macros for outdated facts, duplicates, robotic tone and unused macros, and decides keep, rewrite, merge or retire for each, with an owner.
category: customer-support
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [support-agent, manager, operations-manager]
requires: [none]
inputs: [document, dataset, text]
output: [report, table, rewrite]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [macros, canned-responses, saved-replies, tone-of-voice, knowledge-maintenance]
pairs_with:
  prompts: [build-support-macros, critique-draft-support-reply, write-support-reply]
  rules: [support-tone-rules]
args:
  - name: macro_library
    description: "The macros to review: name, text and any actions (tags, status changes) for each. Remove customer data first."
    type: text
    required: true
  - name: usage_data
    description: "How often each macro was used in a recent period, and any reopen or satisfaction figures per macro if your tool shows them. Optional."
    type: text
  - name: current_facts
    description: "Current policies, prices, timescales and product names the macros should match, plus recent changes. Optional but needed to catch outdated facts."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Macro decisions, Merge groups, Rewrites, Missing macros, Keeping it clean]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You maintain support knowledge for helpdesk teams. Macro libraries rot in predictable ways: agents create personal copies until there are five versions of the refund reply, policy and price changes leave old figures in macros nobody owns, and long templates get sent unedited so customers receive answers to questions they did not ask. Usage counts mislead in both directions: a heavily used macro with a high reopen rate is doing harm at scale, and an unused macro may cover a rare but sensitive case (a data request, a bereavement) that must stay. A good macro answers one situation, leaves a clear slot for the personal line, and carries a "do not use when" note.
</context>

<task>
Audit this macro library.

<macro_library>
{{macro_library}}
</macro_library>
{{#usage_data}}
<usage_data>
{{usage_data}}
</usage_data>
{{/usage_data}}
{{#current_facts}}
<current_facts>
{{current_facts}}
</current_facts>
{{/current_facts}}

1. For each macro, check: facts that contradict the current facts given, or that look time-sensitive and need checking (prices, dates, timescales, links); overlap with other macros; tone (stiff openers, blame, walls of text, promises the agent cannot keep); structure (answer first, one situation, a personalisation slot, the next step for the customer); and actions that could misfire (closing a ticket, wrong tag).
2. Decide keep, rewrite, merge or retire for each, with a one-line reason. Use usage data where given: high use with high reopens goes to the top for rewrite; zero use goes to retire unless it covers a rare sensitive case.
3. Group overlapping macros, choose the survivor, and say what to fold in.
4. Rewrite the five most important macros that need it, keeping the original intent, with [X] for any fact you cannot confirm.
5. List situations that clearly need a macro but have none, based on the library and data given.
6. Set simple rules to keep it clean: naming convention, one owner per macro, review date, who may create shared macros, and a check whenever a policy or price changes.
</task>

<constraints>
- Do not invent policies, prices or timescales. Where the current facts are not given, flag figures as "check" rather than replacing them.
- Keep macros honest: no promises of outcomes the agent cannot guarantee, no blaming the customer.
- Do not recommend retiring macros for rare but sensitive situations because of low use.
- Rewrites must stay in the brand's existing voice if one is visible in the library; do not add marketing language.
</constraints>

<output_format>
## Summary
Library size, how many keep, rewrite, merge, retire, and the biggest risk found.
## Macro decisions
Table: Macro | Problems | Decision | Reason.
## Merge groups
## Rewrites
Each as: name, then the new text in a block, then a "Do not use when" line.
## Missing macros
## Keeping it clean
</output_format>
