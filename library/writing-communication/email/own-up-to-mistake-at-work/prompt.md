---
schema: 1
id: own-up-to-mistake-at-work
kind: prompt
title: Own up to a mistake at work
description: Writes the email telling your manager about a mistake you made - what happened, the impact, what you have already done, the fix and how you will prevent a repeat - early and without excuses.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, software-engineer, project-manager, support-agent]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [mistakes, accountability, managing-up, disclosure, no-surprises]
pairs_with:
  prompts: [correct-email-mistake, write-client-apology, apologize-effectively]
args:
  - name: mistake
    description: What you did or missed, when, and how it came to light.
    type: text
    required: true
  - name: impact
    description: Who or what is affected and how much, as far as you know - customers, money, data, a deadline, another team.
    type: text
  - name: actions_taken
    description: What you have already done to contain or fix it, and what you plan next.
    type: text
  - name: severity
    description: Minor means small, contained, easy to fix; serious means customers, money, data, safety or legal exposure are involved.
    type: enum
    enum: [minor, serious]
    default: minor
output_contract:
  format: markdown
  sections: [Before you send, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers rarely judge people by whether they made a mistake; they judge them by how fast they heard about it and what was done next. The worst outcome is the manager learning about it from someone else. The message that protects trust is sent early, states plainly what happened in the first lines, sizes the impact honestly (including what is not yet known), shows containment already under way, proposes the fix and the prevention, and asks for any decision or help needed. It avoids three traps: burying the mistake under context, a defensive chain of excuses, and over-the-top self-criticism that forces the manager to comfort the sender. A serious mistake (customer data, money, safety, legal exposure) usually needs a call or a word in person first and may trigger a formal incident or reporting process; the email then becomes the written record.
</context>

<task>
Write an email telling the manager about this mistake ({{severity}}).

<mistake>
{{mistake}}
</mistake>
{{#impact}}
<impact>
{{impact}}
</impact>
{{/impact}}
{{#actions_taken}}
<actions_taken>
{{actions_taken}}
</actions_taken>
{{/actions_taken}}

1. If you cannot tell what happened, ask and stop.
2. Before you send: if severity is serious, or the input mentions personal data, payments, safety or a regulator, say to tell the manager by call or in person now, and that the organisation may have an incident, data breach or reporting process with time limits that someone must start. Do not state what the law requires. Also list anything to contain right now that has not been done.
3. Write the email:
   - Subject: plain and specific ("My error on the March invoices: what happened and the fix"). No "Quick question".
   - First two lines: "I made a mistake" plus what it was, and the current status (contained, being fixed, not yet contained).
   - Impact: what is known, and what is not yet known with when it will be.
   - What I have already done.
   - Proposed fix and timing, and any decision or help needed from the manager.
   - Prevention: one or two specific changes (a check, a step, a tool), not a promise to "be more careful".
   - One sentence of apology, owning it.
4. Under Notes, list who else should be told (affected colleagues, client contacts) and in what order, and what to log.
</task>

<constraints>
- Under about 200 words in the body.
- Own it in the first person; no passive voice that hides the actor, no blaming tools or colleagues unless that is factually part of the cause, and then neutrally.
- No excessive self-criticism; one apology.
- Never invent impact figures, actions taken or fixes; use `[need: …]` for unknowns.
- Do not advise hiding or minimising the mistake.
</constraints>

<output_format>
## Before you send
Bullets: channel advice, urgent containment, process to trigger. "Email is fine" if minor.
## Email
Subject line, then the body.
## Notes
Bullets: who else to tell, what to record.
</output_format>
