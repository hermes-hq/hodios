---
schema: 1
id: respond-to-lost-deal
kind: prompt
title: Respond to a lost deal
description: Writes the gracious reply when a prospect chooses a competitor or decides to do nothing, asks for honest reasons in a way they will answer, and sets a dated reason to check back.
category: sales
version: 1.0.0
status: incubating
stage: [operate]
role: [sales-rep, founder, consultant]
requires: [none]
inputs: [message, notes]
output: [message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lost-deal, closed-lost, loss-reasons, relationship-building, nurture]
pairs_with:
  prompts: [run-win-loss-analysis, revive-stalled-deal, write-sales-follow-up]
args:
  - name: their_message
    description: The prospect's message telling you they went another way, word for word if you have it.
    type: text
    required: true
  - name: deal
    description: What you proposed, who you dealt with, who they chose instead (if known), how long the evaluation ran and anything you suspect about why you lost.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Reply, Feedback questions, Check-back plan, What to record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help sellers handle losing well. The first reply after a loss decides whether the buyer remembers the seller as a professional to call when the chosen option disappoints, which happens often: implementations slip, champions move on, and "do nothing" decisions get revisited when the problem gets worse. Experienced sellers thank the buyer, accept the decision without arguing or a last-minute discount, ask for feedback in a way that is easy to answer (one or two specific questions, or a 15-minute call, with permission to be blunt), and leave a specific, useful reason to reconnect later, such as the first renewal or the go-live milestone. Buyers rarely give the real reason in the rejection email; "price" often stands for "not enough value shown" or "the other vendor was the safer choice".
</context>

<task>
<their_message>
{{their_message}}
</their_message>

<deal>
{{deal}}
</deal>

1. Write a reply under 100 words: thank them for the time and the clear answer, accept the decision, wish them well with the project, ask permission for brief feedback, and leave the door open with a specific reason. No pitch, no discount, no arguing.
2. Write two or three feedback questions for a short call or email, phrased to get honest answers ("What would we have had to do differently to win?", "What tipped it?"), and note what answers like "price" or "timing" might really mean for this deal.
3. Plan the check-back: one or two dated touchpoints tied to real moments (their go-live date, three months after, their renewal or budget cycle), with what useful thing to send each time and a rule to stop if they are not interested.
4. Suggest what to record in the CRM: loss reason category, competitor, the stated and suspected reasons kept separate, and the check-back date.
</task>

<constraints>
- Do not suggest re-opening the deal with a discount or criticising the chosen competitor.
- Do not invent what the buyer said or their reasons; mark suspicions as suspicions.
- If the message is ambiguous (for example "not now" rather than "no"), say so and adjust the reply to clarify where things stand.
- Respect a request not to be contacted again: if the buyer asks for no further contact, the plan is to stop and record it.
</constraints>

<output_format>
## Reply
Subject line if email, then the message.

## Feedback questions
Numbered questions, then a short note on reading the answers.

## Check-back plan
Table: When | Trigger | What to send.

## What to record
Bullets.
</output_format>
