---
schema: 1
id: write-public-apology-statement
kind: prompt
title: Write an organisation's public apology
description: "Writes a public apology from an organisation once the facts are known: specific acknowledgement, ownership without hedging, impact, remedy and changes, with versions per channel."
category: public-relations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [executive, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [copy, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [public-apology, crisis-communications, accountability, remedy, reputation]
pairs_with:
  prompts: [write-holding-statement]
  personas: [pr-strategist]
args:
  - name: what_happened
    description: The confirmed facts of what went wrong, who was affected and how, and what caused it as far as it is established.
    type: text
    required: true
  - name: remedy_and_changes
    description: What the organisation is doing for those affected (refunds, support, compensation) and what it is changing so it does not happen again, with dates.
    type: text
    required: true
  - name: speaker
    description: Who the apology comes from (name and role), and the channels it will go out on. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Should we apologise, Apology statement, Channel versions, Delivery plan, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a reputation adviser writing a public apology after the first holding statements, when the organisation knows what happened and that it was at fault. Apologies that work share a pattern: they name the specific failure in plain words, take ownership without conditional phrasing ("we're sorry if anyone was offended"), describe the impact on people as they experienced it, explain the cause without excuse-making, state the remedy and the concrete changes with dates, and come from the person accountable. Apologies that fail are vague, passive ("mistakes were made"), late, centred on the organisation's feelings, or contradicted by its actions. Legal caution is real, and in some jurisdictions laws protect expressions of sympathy or apology, while in others an admission can matter in a claim, so legal review is normal, but an apology lawyered into meaninglessness does more damage than none.

<what_happened>
{{what_happened}}
</what_happened>

<remedy_and_changes>
{{remedy_and_changes}}
</remedy_and_changes>
{{#speaker}}Speaker and channels: {{speaker}}{{/speaker}}
</context>

<task>
1. Should we apologise: check that the facts support an apology for the organisation's own failure. If fault is still unclear, say so and recommend a holding statement or an expression of regret instead, explaining the difference. If the remedy is thin compared with the harm, say so, because the remedy will be judged more than the words.
2. Apology statement, about 200 to 350 words, in the speaker's voice: what happened in one or two plain sentences; "we are sorry" or "I am sorry" without qualifiers; the impact on the people affected; what caused it (only what is established); what is being done for those affected and how to get it; what is changing, with dates; how progress will be reported and when.
3. Channel versions: a short version for social channels (under about 60 words, linking to the full text), an email or letter to directly affected people with practical next steps, and a note to staff that reaches them before or with the public version.
4. Delivery plan: who delivers it (the accountable leader, ideally on camera or in person for serious harm), timing, order of audiences (affected people first), and when the promised follow-up will be published.
5. Checks: phrases removed and why, facts to re-confirm, commitments that someone must own, and legal review.
</task>

<constraints>
- No conditional or passive apologies ("if", "mistakes were made", "we regret any inconvenience"), no blaming customers, staff or suppliers by name, and no self-praise.
- Do not claim causes, numbers or fixes that are not in the input. Placeholders in square brackets for anything missing.
- Promise only what the remedy and changes support; every commitment needs a date or an owner.
- Recommend legal review before release, and say that the effect of an apology on liability depends on the jurisdiction; do not give legal advice on it.
- Do not name or describe affected individuals.
</constraints>

<output_format>
## Should we apologise
## Apology statement
With word count and speaker.
## Channel versions
Subsections per channel.
## Delivery plan
## Checks
</output_format>
