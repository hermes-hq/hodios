---
schema: 1
id: flag-risk-early-by-email
kind: prompt
title: Flag a risk early by email
description: Writes an early heads-up to a manager or client about a risk that has not happened yet, with how likely it is, the impact, the options and what you need from them now.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [project-manager, individual, consultant, software-engineer]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [risk, early-warning, heads-up, managing-up, no-surprises]
pairs_with:
  prompts: [write-escalation-email, write-delay-notification, build-project-risk-register]
args:
  - name: risk
    description: What might go wrong, why you think so (the signals), when you would know for sure, and what it would affect.
    type: text
    required: true
  - name: options
    description: What could be done now to prevent or soften it, with any costs you know.
    type: text
  - name: recipient
    description: Who you are warning, for example "my manager", "the client sponsor", "the programme board".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Risk summary, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers and clients consistently say the same thing: tell me early. A risk raised while there is still time to act is a sign of competence; the same problem raised the day it hits looks like it was hidden. People delay because they hope it will resolve, fear looking alarmist, or do not want to bring a problem without a solution. The early warning that lands well is calibrated: it separates what is known from what is feared, states the likelihood in plain words, names the trigger date when it will be clear either way, sizes the impact if it happens, lists options with their cost, and makes a specific ask (a decision, a resource, or simply "no action needed yet, I'll update you on the 14th"). Over-alarming and under-stating both erode trust; a single sentence of honest uncertainty beats false precision.
</context>

<task>
Write an early-warning email to {{recipient}}.

<risk>
{{risk}}
</risk>
{{#options}}
<options>
{{options}}
</options>
{{/options}}

1. If you cannot tell what the risk is or what it would affect, ask and stop.
2. Risk summary: state the risk as "If X happens, then Y", the signals behind it, a likelihood in plain words (unlikely, possible, likely) with the reason, the date or event that will confirm it, and the impact if it happens. If the input does not support a likelihood, say so.
3. Write the email:
   - Subject: "Heads-up: risk to [deliverable/date], no action needed yet" or "Heads-up: risk to [deliverable/date], decision needed by [date]".
   - First two lines: the risk and whether the reader needs to do anything now.
   - What we know vs what we don't, in two short bullet groups.
   - Impact if it happens, in concrete terms (dates, money, customers) from the input.
   - Options, with your recommendation and what each costs.
   - The ask and the next update date.
4. Under Notes, suggest who else should hear (and who must not hear it second-hand), and whether to log it in the project's risk list.
</task>

<constraints>
- Under about 200 words in the body.
- Calibrated wording: no "disaster", "urgent" or "critical" unless the facts support it; no hedging so heavy the reader cannot tell if it matters.
- Never invent signals, probabilities in percent, costs or dates; use `[need: …]`.
- Do not blame individuals or other teams for the risk.
- If the risk concerns a person's private matters (health, a job search, family), recommend raising it in person first and keep any written version to the work impact and cover, without the private detail.
</constraints>

<output_format>
## Risk summary
Bullets: if-then statement, signals, likelihood, confirmation date, impact.
## Email
Subject line, then the body.
## Notes
Bullets: who else to tell, logging, placeholders.
</output_format>
