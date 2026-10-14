---
schema: 1
id: recover-after-presentation-went-badly
kind: prompt
title: Recover after a presentation went badly
description: Plans what to do after a work presentation that went badly, from an honest debrief of what happened to follow-ups that repair credibility and a better second attempt.
category: presentations
version: 1.0.0
status: incubating
stage: [review]
role: [manager, individual, consultant, product-manager]
requires: [none]
inputs: [notes, text]
output: [plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [debrief, credibility, follow-up, second-attempt, setback]
pairs_with:
  prompts: [write-meeting-recap-email, critique-slide-deck, drill-presentation-qa, review-talk-feedback]
  personas: [presentation-designer]
args:
  - name: what_happened
    description: What you presented, to whom, and what went wrong, in as much detail as you can, including what people said.
    type: text
    required: true
  - name: stakes
    description: What depends on it now, such as a decision deferred, a client relationship or your standing with a manager. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What actually happened, What to do in the next 48 hours, Messages, The second attempt, For next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people recover after a presentation goes badly: the numbers were challenged and did not hold, the room went off on a tangent, the ask was refused, the demo failed or nerves took over. In the moment it feels worse than it usually is; most audiences remember how the follow-up was handled more than the stumble. Recovery has an order. First separate what went wrong into causes: content (wrong or weak evidence, wrong question answered), audience fit (level, expectations, unknown politics), delivery (time, nerves, unclear ask) and bad luck (technical failure, a bad day in the room). Then act quickly on the facts: correct errors, answer open questions within a day or two, and ask one or two trusted attendees what they saw. A short note that owns the issue without grovelling repairs more credibility than silence. Where a decision is still open, ask for a second slot with a sharper, shorter version built on what was learned.

What happened:
{{what_happened}}
{{#stakes}}Stakes: {{stakes}}{{/stakes}}
</context>

<task>
1. Sort what went wrong into content, audience fit, delivery and bad luck, and say which ones actually affect the outcome. Note where the account may be harsher than the facts.
2. List what to do in the next 48 hours: corrections, answers owed, who to ask for candid feedback and what to ask them, and whom to update (for example your manager) before they hear it elsewhere.
3. Draft the messages: a follow-up to attendees, a note to your manager or sponsor if relevant, and a request for feedback.
4. Plan the second attempt if one is possible: how to ask for it, what to change in the content and structure, and what to rehearse.
5. Give two or three specific habits for next time drawn from this case.
</task>

<constraints>
- Be candid but proportionate; do not catastrophise or dismiss.
- Messages own mistakes once and move to the fix; no excessive apology and no blaming others.
- Do not invent facts about what attendees think; plan to ask.
- If the person seems very distressed, acknowledge it and suggest talking to someone they trust; this is not a mental health service.
</constraints>

<output_format>
## What actually happened
Causes by type, with which ones matter.

## What to do in the next 48 hours
Numbered actions.

## Messages
Drafts, each labelled with recipient.

## The second attempt
Plan, or "Not needed" with why.

## For next time
Two or three habits.
</output_format>
