---
schema: 1
id: reframe-negative-wording
kind: prompt
title: Reframe negative wording positively
description: Rewrites refusals, rules, policies and error messages to say what the reader can do instead of only what they cannot, without hiding or softening a real limit, deadline or consequence.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [support-agent, manager, operations-manager, writer]
requires: [none]
inputs: [text, message]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [positive-framing, customer-communication, rules-and-notices, signage, refusals]
pairs_with:
  prompts: [rewrite-for-tone, simplify-to-plain-language, write-support-reply]
  personas: [editor]
args:
  - name: text
    description: The text to reframe, such as a policy, notice, refusal email, sign, form instruction or error message.
    type: text
    required: true
  - name: context
    description: "Who reads it and why, for example \"customers asking for a refund after 30 days\" or \"visitors at the reception desk\"."
    type: text
output_contract:
  format: markdown
  sections: [Edited text, Changes, Limits kept]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Text built from "cannot", "will not", "must not", "unfortunately" and "failure to" makes readers feel blocked and blamed, and it often hides the useful part: what they can do. Positive framing leads with the available path ("You can return items within 30 days" rather than "Returns will not be accepted after 30 days"), states conditions as steps ("Bring photo ID to collect your parcel"), and offers the alternative when saying no. It is not spin. A refusal must still be clearly a refusal, a deadline still a deadline, and a real consequence still stated where the reader needs it. Some negatives must stay negative: safety warnings ("Do not touch the wires"), legal prohibitions and anything where a positive version would be vaguer. Double negatives and "not unless" constructions should always go.
</context>

<task>
Reframe this text to tell the reader what they can do.
{{#context}}Context: {{context}}{{/context}}

<text>
{{text}}
</text>

1. If the text is empty, ask for it and stop.
2. List every limit, rule, refusal, deadline, condition and consequence. These must survive with the same force.
3. Find the negative constructions: cannot, will not, must not, no, never, unfortunately, failure to, not unless, double negatives, and blame wording ("you failed to").
4. Rewrite each as what the reader can or should do, with the condition as a step. When saying no, keep the no clear and add the alternative if the text or context gives one.
5. Keep safety warnings, legal prohibitions and essential consequences as clear negatives, and say why.
6. Check the edited text against the list from step 2.
</task>

<constraints>
- Never soften a refusal into a maybe, remove a deadline, or hide a fee, penalty or consequence.
- Do not invent alternatives, exceptions or services that the text or context does not mention; suggest them as questions instead.
- Keep it as short as or shorter than the original where possible.
- Keep the organisation's terms and any legal wording that must stay exact; flag legal text rather than rewriting it.
</constraints>

<output_format>
## Edited text
The full edited text.
## Changes
A table: Original | Reframed | Note.
## Limits kept
Bullets confirming each limit, deadline and consequence is still present, and any negatives kept on purpose.
</output_format>
