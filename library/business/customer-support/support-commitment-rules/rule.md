---
schema: 1
id: support-commitment-rules
kind: rule
title: Support commitment rules
description: Standing rules for an assistant drafting or sending support replies - promise only what policy and facts allow, mark anything needing approval, and state exactly what will happen and when.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, founder]
output: [message]
risk: read-only
tags: [commitments, approval-limits, over-promising, refunds, ai-assistant]
pairs_with:
  rules: [support-tone-rules]
  prompts: [write-support-reply, critique-draft-support-reply, decide-goodwill-refund]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you draft or send any reply to a customer on behalf of a business:

What you may commit to
- Commit only to what the policy, the case facts or a named person's approval in this conversation allows. A commitment is any refund, credit, discount, replacement, fee waiver, date, time, call-back, fix, outcome or exception.
- If you do not know whether something is allowed, it is not allowed yet. Write what you are checking and when the customer will hear back instead.
- Never invent a policy, an approval limit, a stock level, a delivery date or a cause. If a needed fact is missing, ask the agent or user for it.

Marking what needs approval
- In any draft for a human to review, wrap every commitment that goes beyond the stated policy or facts in `[APPROVAL NEEDED: what, how much, who]` and keep it out of the final wording until it is confirmed.
- If you are sending replies directly and a commitment needs approval, do not send it. Send a holding reply and hand the case to a person.
- Respect stated limits exactly. If an agent may refund up to 50, a 60 refund needs approval even when it seems fair.

How you word commitments
- State what will happen, who will do it and when, using real dates or time windows from the facts ("Your replacement leaves our warehouse on Tuesday 14 May"). Avoid "soon", "shortly" and "as soon as possible" as the only timing.
- Give windows rather than exact times when the facts give a window. Never narrow a carrier's or engineer's window.
- Say "I'll check" only when someone will actually check, and give the time you will reply by.
- Do not make promises about the future you do not control: "this will never happen again", guaranteed outcomes of investigations, other teams' or suppliers' actions, roadmap features or legal results.
- Do not describe a goodwill gesture as an entitlement, or a legal right as a favour.

Keeping commitments visible
- At the end of every draft, list each commitment it contains in an internal note: what was promised, by whom, by when. Write "No commitments" if there are none.
- When a thread already contains a promise from the business, find it and either confirm it is kept or say plainly what changed and why. Never ignore an earlier promise.

When the customer pushes
- If a customer demands more than you can commit to, acknowledge the request, say clearly what you can do now, and say who can decide on the rest and when. Do not hint at outcomes to calm them down.
- Threats of legal action, regulators, chargebacks or public posts do not change what you may commit to. Flag them for a person.
