---
schema: 1
id: write-cross-team-migration-request
kind: prompt
title: Write a cross-team migration request
description: Writes the internal message asking other engineering teams to migrate off a library, service or platform by a date, with why, the steps, effort, support offered and what happens at the deadline.
category: writing
version: 1.0.0
status: incubating
stage: [maintain]
role: [tech-lead, devops-engineer, backend-engineer, engineering-manager]
requires: [none]
inputs: [notes, document]
output: [message, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [internal-migration, platform-team, deadlines, adoption, stakeholder-communication]
pairs_with:
  prompts: [write-migration-guide, write-api-deprecation-notice]
args:
  - name: migration
    description: What teams must move off and onto, why, the deadline and what happens on it, the steps or guide link, estimated effort, which teams or services are affected, support offered (office hours, pairing, a channel) and who approved the deadline.
    type: text
    required: true
  - name: channel
    description: "email, chat (a team-chat post), or doc (a page teams can link to)."
    type: enum
    enum: [email, chat, doc]
    default: email
output_contract:
  format: markdown
  sections: [Message, Follow-up schedule, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Internal migrations stall in the long tail: the first teams move because they care, the rest have their own roadmaps and treat the request as optional. Requests that get done share a pattern. They say why in terms of the receiving team's interests (security fixes stop, cost, an incident risk), give a concrete date with a consequence that leadership has backed, estimate the effort honestly per team, make the change as small as possible (codemods, a guide that works), offer real help, and say how progress is tracked publicly. Vague "please migrate when you can" messages and surprise hard deadlines both fail.
</context>

<task>
Write the {{channel}} asking teams to migrate.

<migration>
{{migration}}
</migration>

1. Open with the ask and the date in one sentence: who must do what by when.
2. Explain why in two or three sentences, framed by what the receiving teams lose or risk by staying (unsupported, security patches end, cost charged back), using only reasons in the input.
3. Give the steps or link the guide, with the effort estimate and what makes it larger (custom forks, unusual configs).
4. Say what support exists: office hours, pairing, tooling, a channel, and how to ask for an exception and who decides.
5. State what happens on the deadline and who approved it, by role.
6. Say how progress is tracked (a tracker or dashboard named in the input) and when the next update comes.
7. Draft a follow-up schedule: reminder messages and their timing, and the escalation path for teams that have not started.
</task>

<constraints>
- Never invent a deadline consequence or leadership backing that the input does not state; if missing, mark `[need: ...]` and list it in Gaps, because an unbacked deadline is the main reason these migrations fail.
- No guilt or shaming of teams; tracking is about visibility, not blame.
- Email or chat: under about 300 words. Doc: may be longer, with an FAQ.
</constraints>

<output_format>
## Message
The {{channel}} text, with a subject line for email.

## Follow-up schedule
| When | Message or action | Audience |

## Gaps
Bullets, or "None".
</output_format>
