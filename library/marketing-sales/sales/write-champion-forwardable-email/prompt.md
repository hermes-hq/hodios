---
schema: 1
id: write-champion-forwardable-email
kind: prompt
title: Write a forwardable email for your champion
description: Writes the short internal email a champion forwards or sends to their boss - the problem, the cost of waiting, the proposed path, how risks are handled and the decision needed.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [champion-enablement, internal-selling, b2b-sales, executive-summary, deal-acceleration]
pairs_with:
  prompts: [build-buyer-business-case, multithread-open-deal, write-mutual-action-plan, write-sales-follow-up]
args:
  - name: deal
    description: What the champion and their team are trying to fix, the numbers they gave you (time lost, errors, cost), what you propose (scope, price, start), alternatives they considered, and their own deadline or trigger.
    type: text
    required: true
  - name: reader
    description: Who the email goes to (role and what they care about, for example "CFO, cares about cost and audit risk") and anything known about how they decide or what they have said.
    type: text
    required: true
  - name: concerns
    description: Objections or risks the reader is likely to raise (price, change effort, security, a previous failed tool) and how each is handled. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Email, Note to your champion, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the email a seller's champion uses to sell internally. Most deals are decided in meetings the seller never attends, and the champion has to explain the purchase in a few lines to someone busier and more sceptical than they are. Sellers usually hand over a proposal or a deck, which the boss does not read. What works is a short note in the champion's own voice: it starts with the business problem in the reader's terms, puts a number on the cost of doing nothing, proposes a clear path with a small enough first step, shows the risks have been thought about, and ends with one specific decision and a date. Vendor language ("best-in-class", "synergies", "our platform") marks it as written by the vendor and weakens the champion.
</context>

<task>
<deal>
{{deal}}
</deal>

<reader>
{{reader}}
</reader>

{{#concerns}}<concerns>
{{concerns}}
</concerns>{{/concerns}}

1. Write the email in the champion's voice to the reader, under 200 words, structured as: the problem in the reader's terms; what it costs today and what waiting another quarter costs, using only the figures given; the proposed path (vendor, scope, price, start) and why this option over the alternatives in one or two lines; how the main risks are handled; the decision needed and by when.
2. Give it a subject line that states the decision ("Decision needed by 14 Nov: replace manual invoice matching").
3. Write a short note from the seller to the champion: how to adapt the email to their voice, what to attach (one page at most), and how to handle the two questions the reader is most likely to ask.
4. List every figure and claim in the email that the champion must confirm before sending.
</task>

<constraints>
- Use only the numbers and facts given. If a number is missing, write a bracketed placeholder such as [hours lost per week] instead of estimating.
- No vendor marketing language, superlatives or competitor bashing.
- The email must read as the champion's own work: first person, plain internal tone, no "we at [vendor]".
- Do not overstate certainty: if savings are estimates, say "estimated" and name who estimated them.
- If the deal notes show no business problem or no number at all, say the email will be weak without one and list the two questions to ask the champion first; still draft with placeholders.
</constraints>

<output_format>
## Email
Subject line, then the email body.

## Note to your champion
Short message from the seller.

## Facts to confirm
Bullets: claim or figure, and who can confirm it.
</output_format>
