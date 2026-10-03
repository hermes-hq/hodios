---
schema: 1
id: write-delay-notification
kind: prompt
title: Write a delay notification
description: Tells clients or stakeholders that a deliverable will be late, with the cause in one line, a new date and how confident it is, the mitigation and what is needed from them, without excuses or blame.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [project-manager, consultant, manager, founder]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [delay, missed-deadline, bad-news, client-communication, expectation-setting]
pairs_with:
  prompts: [write-status-report, write-escalation-email, apologize-effectively]
args:
  - name: what_is_late
    description: The deliverable, the date that was promised, and what has already been finished.
    type: text
    required: true
  - name: cause
    description: The honest reason it slipped, including anything that was in your control.
    type: text
    required: true
  - name: new_date
    description: The new date and what it depends on, for example "28 Nov if the supplier ships by the 20th".
    type: string
    required: true
  - name: audience
    description: Who receives it. Client means an external customer; internal means colleagues who depend on the work; executive means senior leadership.
    type: enum
    enum: [client, internal, executive]
    default: client
output_contract:
  format: markdown
  sections: [Email, Confidence check, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A delay notice is judged on three things: how early it arrives, whether the new date is believable, and whether the reader can plan around it. People forgive one slip that is announced early with a credible plan; they stop trusting someone who sends a long excuse, blames others, or moves the date twice. The second slip usually comes from giving an optimistic date to soften the first message. Good delay notices lead with the facts, own what was in the sender's control, give a date with its dependencies, show what is being done to protect the reader, and ask for anything the reader can do to help.
</context>

<task>
Write a delay notification for a {{audience}} audience.

<what_is_late>
{{what_is_late}}
</what_is_late>

<cause>
{{cause}}
</cause>

New date: {{new_date}}

1. If you cannot tell the original date, what is late, or the new date, ask and stop.
2. Assess the new date before writing. Note what it depends on and anything in the cause that makes it optimistic (the same cause could recur, an external dependency is unconfirmed, no buffer). If the date looks risky, say so under Confidence check and suggest either a safer date or wording that states the dependency ("28 Nov, provided the parts arrive by 20 Nov; we will confirm on the 21st").
3. Write the email in this order:
   - Subject: "[Deliverable]: new date [date]".
   - First two sentences: what is late, the original and new date.
   - Cause in one sentence, factual. Own what was within the sender's control. For a client, do not blame named third parties or colleagues; describe the cause neutrally ("a component from our supplier arrived damaged").
   - Impact on the reader, if any, and what is being done to reduce it: partial delivery, a workaround, extra resource, a check-in date.
   - What is needed from the reader, if anything, with a date.
   - When they will next hear from the sender, even if nothing changes.
   - Apology matched to the audience: one sincere sentence for a client, a brief acknowledgement for internal colleagues, none or one line for executives, who want the facts and the plan.
4. For executive audiences, add one line on whether this affects any wider commitment (a launch, revenue, a contract) if the input says so.
</task>

<constraints>
- Use only the facts given. Never invent causes, mitigations, dates or compensation; use `[need: …]` where a fact would help.
- Under about 170 words for client and internal, under about 120 for executive.
- No excuse chains, no passive voice that hides the actor ("mistakes were made"), no minimising ("just a small delay") and no grovelling.
- Do not offer discounts, credits or penalties unless the input says the sender is authorised to.
</constraints>

<output_format>
## Email
Subject line, then the email.
## Confidence check
Two or three bullets: what the new date depends on, how confident it looks, and a safer alternative if needed.
## Notes
Bullets: placeholders to fill and who else should hear before the reader does. "None" if nothing.
</output_format>
