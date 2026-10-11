---
schema: 1
id: warm-up-sending-domain
kind: prompt
title: Plan warming up a new sending domain or IP
description: Plans warming up a new email sending domain or dedicated IP with a volume ramp, engaged-first segments, the signals to watch each day and clear rules for when to slow down or pause.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [marketer, devops-engineer, founder]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [domain-warm-up, ip-warm-up, sender-reputation, inbox-placement, sending-volume]
pairs_with:
  prompts: [audit-email-deliverability, set-up-email-authentication-records, migrate-email-platform]
  personas: [deliverability-consultant]
args:
  - name: situation
    description: Why you are warming up (new domain, new subdomain, new dedicated IP, moving platform, first sends after a long gap), the domain history, and whether SPF, DKIM and DMARC are already in place.
    type: text
    required: true
  - name: list
    description: List size, how much of it engaged (clicked or bought) in the last 30, 90 and 180 days, and how the list was collected.
    type: text
    required: true
  - name: target_volume
    description: The daily or weekly volume you need to reach and by when, and any big send coming up (sale, launch). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Readiness, Ramp schedule, Daily signals, Slow-down rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan email warm-ups. Mailbox providers judge a new domain or IP by how recipients react to its first sends; with no history, a sudden large send to an old list looks like spam and can land everything in junk for weeks. A warm-up builds reputation by starting small with the most engaged recipients (who open, click and do not complain), increasing volume steadily while signals stay healthy, and adding less engaged segments last. Experts know a few things novices miss: a shared IP on a reputable platform usually needs only a domain warm-up, not an IP warm-up; dedicated IPs only make sense above high, steady volumes; the domain's reputation follows it across platforms; consistency matters (daily sends beat one big weekly blast); and contacts who have not engaged in many months may need re-permission or removal rather than warming. Authentication must be correct before the first send. Providers' bulk-sender rules change; the user should check the current published requirements.
</context>

<task>
Plan the warm-up.

<situation>
{{situation}}
</situation>

<list>
{{list}}
</list>
{{#target_volume}}Target: {{target_volume}}{{/target_volume}}

1. **Readiness:** confirm or list what must be done before day 1: authentication aligned to the From domain, a working one-click unsubscribe, a monitored reply-to, a postmaster or reputation dashboard set up for the major providers where available, and a sunset rule for unengaged contacts. Check against the major mailbox providers' bulk-sender requirements (since 2024 Gmail and Yahoo, and later Microsoft for Outlook.com, have required bulk senders to pass SPF and DKIM, publish a DMARC record, support one-click unsubscribe via the List-Unsubscribe-Post header described in RFC 8058, and keep spam complaints low); thresholds and scope change, so tell the user to confirm the current published rules. Ask whether a dedicated IP is actually needed.
2. **Ramp schedule:** a day-by-day or send-by-send table from a small starting volume of the most engaged contacts, increasing in steps (often around 1.5 to 2 times per step while healthy), showing the segment used at each stage, until the target volume. Fit it to the deadline, and say honestly if the deadline is too tight.
3. Content during warm-up: the most wanted emails (welcome, popular content, best sellers), consistent sender name and From address, no big-discount blast to the whole list.
4. **Daily signals:** what to watch and where: bounces, spam complaints, unsubscribes, clicks by mailbox provider, deferrals, and reputation dashboards.
5. **Slow-down rules:** concrete thresholds to hold, step back or pause, and what to do if a provider starts junking or blocking (reduce to the most engaged, check content and authentication, wait before increasing).
</task>

<constraints>
- Present any numeric thresholds as commonly used guides, not rules from providers, and tell the user to check the providers' current published guidance.
- Never suggest buying lists, rotating domains to dodge reputation, or hiding the sender identity.
- Do not include contacts with no engagement in many months during the warm-up; suggest re-permission or suppression.
- Adapt to the platform: shared versus dedicated IP changes the plan.
</constraints>

<output_format>
## Readiness
A checklist.

## Ramp schedule
A table: Day or send | Volume | Segment | Notes.

## Daily signals
A table: Signal | Where to see it | Healthy | Concerning.

## Slow-down rules
Bullets with actions.
</output_format>
