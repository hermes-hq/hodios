---
schema: 1
id: write-incident-update
kind: prompt
title: Write an incident status update
description: Writes a clear status update for an ongoing incident, tuned to customers, internal teams or executives, without speculation or promises the team cannot keep. Use for status pages, Slack and email.
category: incident
version: 1.0.0
status: experimental
stage: [operate]
role: [sre, engineering-manager, support-agent, product-manager]
stack: []
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [status-page, incident-communication]
pairs_with:
  prompts: [triage-production-alert, write-postmortem]
args:
  - name: facts
    description: What is known right now. Symptoms, affected features or regions, start time, what the team is doing, and any workaround.
    type: text
    required: true
  - name: audience
    description: Who will read it.
    type: enum
    enum: [customers, internal, executives]
    default: customers
  - name: phase
    description: Where the incident stands.
    type: enum
    enum: [investigating, identified, monitoring, resolved]
    default: investigating
  - name: next_update
    description: When the next update will come, for example "in 30 minutes" or "by 16:00 UTC".
    type: string
output_contract:
  format: markdown
  sections: [Title, Update, Held back]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
During an incident, people judge the team by its updates as much as by the fix. Good updates are early, specific about who is affected, honest about what is not yet known, and regular. Bad ones guess at causes, promise times the team cannot meet, or hide behind jargon, and each of those costs trust that is hard to win back.
</context>

<task>
Write a {{phase}} update for {{audience}} from these facts:
{{facts}}
{{#next_update}}Next update: {{next_update}}{{/next_update}}

1. Lead with the impact in the reader's terms: what they cannot do, since when (UTC), and who is affected. Say what still works when the facts show it.
2. Say what the team is doing now, matching the phase: investigating (looking into it), identified (cause found, fix under way), monitoring (fix applied, watching), resolved (back to normal, with the time and a pointer to a follow-up review if one is planned).
3. Include a workaround only if the facts contain one.
4. End with when the next update will come. If no time was given and the phase is not resolved, add `[next update time]` for the author to fill in.
5. Tune it to the audience:
   - customers: plain language, no internal system names, at most 120 words.
   - internal: the affected services, the incident channel or commander if given, what other teams should and should not do, at most 150 words.
   - executives: business impact first (customers, revenue, SLA, regulatory exposure if the facts mention it), the decision or support needed from them if any, at most 100 words.
</task>

<constraints>
- Use only the facts given. Never guess a cause, a number of affected users or a resolution time.
- Do not blame a vendor, a team or a person.
- Do not promise a fix time unless the facts contain one the team has committed to.
- Do not apologise more than once, and do not use filler such as "we take this very seriously".
- Times in UTC. No emoji.
</constraints>

<output_format>
## Title
One line, for a status page or subject line, stating the affected feature and the phase.

## Update
The message, ready to paste.

## Held back
Bullets: facts from the input you left out for this audience and why, plus any placeholder the author must fill. "Nothing" if empty.
</output_format>
