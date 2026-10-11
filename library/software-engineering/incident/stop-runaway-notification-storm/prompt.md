---
schema: 1
id: stop-runaway-notification-storm
kind: prompt
title: Stop a runaway notification storm
description: Stops a bug that is sending duplicate or wrong emails, pushes or SMS to users, with a kill switch, blast-radius count, queue cleanup, deduplication and an apology plan.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [logs, text]
output: [plan, checklist, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [notifications, transactional-email, push-notifications, sms, kill-switch]
pairs_with:
  prompts: [write-incident-update, quantify-incident-impact, write-postmortem]
  personas: [incident-commander]
args:
  - name: situation
    description: What is being sent (channel, message type), to whom, how many so far and at what rate, what is wrong with it (duplicates, wrong recipient, wrong content, test message), and when it started.
    type: text
    required: true
  - name: pipeline
    description: How notifications are produced and sent - triggers, queues, workers, the sending provider, any feature flags or kill switches, and logs or tables that record sends.
    type: text
output_contract:
  format: markdown
  sections: [Stop sending now, Clean the queue, Blast radius, Fix and dedupe, Tell users, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team whose system is spamming its users. Every minute adds recipients and harm: annoyed users unsubscribe and mark mail as spam (damaging the sending domain's reputation for all future mail), SMS costs money per message, push spam gets the app's notifications disabled, and wrong-recipient messages can leak personal data. Stopping comes before diagnosing. The fastest stop is usually the furthest-downstream lever: pausing the sending provider's API key or suspending sends in the provider console, a kill switch flag, scaling the sending workers to zero, or pausing the queue. Fixing the trigger does not help while millions of messages are already queued, so the queue must be inspected and the bad messages removed or quarantined (not the good ones, like password resets). Typical causes: a retry loop resending after a timeout that actually succeeded, a migration or backfill firing "on update" triggers, a scheduled job that ran in several instances, test data pointed at production, or a template variable resolved for the wrong user.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#pipeline}}
<pipeline>
{{pipeline}}
</pipeline>
{{/pipeline}}

1. Stop sending now: the fastest levers in this pipeline, from most to least downstream, and which one to pull first. Note which also stops legitimate critical messages (password resets, login codes, receipts) and whether those can be allowed through.
2. Clean the queue: how to inspect what is queued, separate bad messages by a clear selector, and move them aside rather than delete them, so nothing needed is lost.
3. Blast radius: the query against send logs or the provider's logs for recipients affected, counts per user, and whether any message went to the wrong person or contained someone else's data.
4. Fix and dedupe: the trigger fix, plus a guard that prevents recurrence (idempotency key per user and event, per-user rate cap, dedupe window). Resume sending in stages and watch the rate.
5. Tell users: whether to send an apology, to whom, through which channel (not another mass blast to everyone), and what it says; if personal data went to the wrong person, flag it to the privacy owner as a possible breach.
</task>

<constraints>
- Stopping comes first; do not lead with root-cause analysis while messages are still going out.
- Never recommend deleting the whole queue without checking whether it holds critical transactional messages.
- Do not suggest an apology sent to the entire user base; only affected recipients, and only if it helps them.
- If wrong-recipient personal data is involved, say breach notification rules may apply and the decision belongs to the privacy or legal owner; do not state deadlines as fact for an unnamed jurisdiction.
{{> output/uncertainty}}
</constraints>

<output_format>
## Stop sending now
Ordered levers, first one to pull, and side effects.

## Clean the queue
Inspection, selector, quarantine.

## Blast radius
Query outline and the numbers to report.

## Fix and dedupe
Trigger fix, guard and staged resume.

## Tell users
Recipients, channel, message points, privacy flag if needed.

## Summary
State and next step.
</output_format>
