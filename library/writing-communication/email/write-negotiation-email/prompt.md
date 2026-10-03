---
schema: 1
id: write-negotiation-email
kind: prompt
title: Write the next email in a negotiation
description: Drafts the next email in a negotiation with a client, vendor or landlord that anchors well, trades every concession for something and makes a clear proposal, while the walk-away point stays private.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [founder, sales-rep, consultant, individual]
requires: [none]
inputs: [message, text]
output: [message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [negotiation-email, anchoring, concessions, batna, rate-negotiation]
pairs_with:
  prompts: [prepare-supplier-negotiation, write-scope-change-email, reply-to-email]
args:
  - name: thread_or_situation
    description: The emails so far, or a summary of where the negotiation stands, what each side has offered and any deadlines.
    type: text
    required: true
  - name: your_goal_and_limits
    description: What you want, your ideal outcome, the least you would accept (kept private), your alternatives if no deal, and what you could give in exchange.
    type: text
    required: true
  - name: relationship
    description: One-off for a single deal you will not repeat; ongoing for a client, vendor or landlord you will keep working with.
    type: enum
    enum: [one-off, ongoing]
    default: ongoing
output_contract:
  format: markdown
  sections: [Read of the situation, Strategy for this email, Email, If they reply]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a written negotiation each email is a move that is hard to take back. Principles from negotiation practice that hold up in email:
- **Anchor with a reason.** The first credible number shapes the range; an anchor backed by an objective standard (market rate, past price, cost, a published index) is harder to dismiss.
- **Never give a concession for free.** Trade it, conditionally: "If you can commit to 12 months, we can do 8% off." Unconditional concessions teach the other side to keep asking.
- **Concede in decreasing steps** so the pattern signals you are near your limit.
- **Package issues** (price, scope, timing, payment terms, volume, length of contract) so both sides can trade what they value differently.
- **Keep the walk-away point, alternatives and internal deadlines private.** Revealing them caps what you can get.
- **Separate the people from the problem**, especially in an ongoing relationship: firm on substance, warm in tone.
- Honesty matters: invented competing offers, fake deadlines or false claims about costs damage trust and can backfire badly when discovered.
</context>

<task>
Draft the next email in this {{relationship}} negotiation.

<thread_or_situation>
{{thread_or_situation}}
</thread_or_situation>

<your_goal_and_limits>
{{your_goal_and_limits}}
</your_goal_and_limits>

1. If you cannot tell what is being negotiated, what the other side's latest position is, or what the user wants, ask up to three questions and stop.
2. Read the situation (for the user only): the other side's likely interests and constraints behind their position, the issues on the table, where there is room to trade, who has more leverage and why, and the gap between the positions.
3. Choose the move for this email and explain it: open or counter with an anchor, trade a concession, add an issue to create value, ask a question to learn their constraint, hold firm, or propose to close. Name the objective standard the anchor rests on, if the input supplies one.
4. Write the email:
   - Acknowledge their position or a shared goal in one sentence.
   - State your proposal clearly with numbers and terms; if trading, use "if you…, we can…".
   - Give the reason briefly; do not over-justify.
   - Make it easy to say yes: a specific next step and, if real, a date.
   - Tone: warm and firm for ongoing relationships; courteous and businesslike for one-off deals.
5. Prepare the user for the reply: the next move if they accept, if they counter at a stated likely figure, and if they refuse; and the point at which to walk away (kept private).
</task>

<constraints>
- The email must never reveal the user's walk-away point, budget ceiling, alternatives they would accept, internal deadlines or eagerness, unless the user explicitly wants to disclose one as a tactic.
- No invented facts: no fictional competing offers, fake deadlines, invented market rates or claims about costs not in the input. If an objective standard would help and none was given, suggest the user find one and use `[benchmark: …]`.
- No threats or ultimatums unless the user's limits make walking away real and they want to signal it; then state it calmly as a fact, not a threat.
- Email under about 200 words.
- If the negotiation involves employment terms, legal claims, a lease dispute or settlement of a debt, note that terms with legal effect should be checked before agreeing.
</constraints>

<output_format>
## Read of the situation
Short bullets for the user only.
## Strategy for this email
The chosen move, the anchor or trade and why, and what is deliberately left unsaid.
## Email
Subject line if needed, then the email.
## If they reply
Bullets: if they accept, if they counter, if they refuse, and the private walk-away point.
</output_format>
