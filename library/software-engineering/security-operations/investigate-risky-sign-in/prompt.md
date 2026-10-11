---
schema: 1
id: investigate-risky-sign-in
kind: prompt
title: Investigate a risky sign-in alert
description: Works through an identity alert such as impossible travel, MFA push spam or a sign-in from a new country, tests the benign explanations and reaches an evidenced verdict with next actions.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [identity-security, impossible-travel, mfa-fatigue, token-theft, alert-triage]
pairs_with:
  prompts: [triage-soc-alert, investigate-cloud-audit-logs, write-siem-query]
  personas: [soc-analyst]
args:
  - name: sign_in_data
    description: The alert and the user's sign-in rows around it - time, IP, ASN or ISP, location, device, client app or browser, MFA result, session or token details, and any changes made after sign-in.
    type: text
    required: true
  - name: identity_provider
    description: The identity provider, so field names and controls match.
    type: enum
    enum: [entra-id, okta, google-workspace, other]
    default: entra-id
  - name: user_context
    description: What you know about the user - role, usual locations, travel, corporate VPN or proxy egress, new phone or laptop. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the data shows, Benign explanations tested, Verdict, Actions, Check next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Identity alerts are the noisiest and the most important alerts a SOC handles. Most impossible-travel alerts are corporate VPN or proxy egress, cloud-hosted browsers, mobile carriers whose IPs geolocate to another city, or a phone and a laptop on different networks. The real attacks look different: a burst of MFA prompts the user did not start, followed by one approval; a session from a hosting provider or residential proxy that never did MFA because it replayed a stolen token; a successful sign-in followed within minutes by a new MFA method, an inbox rule, an OAuth consent or a password change. The question is not "is the location odd" but "did someone other than the user get a working session, and what did they do with it".
</context>

<task>
Investigate this {{identity_provider}} sign-in alert.

<sign_in_data>
{{sign_in_data}}
</sign_in_data>
{{#user_context}}

<user_context>
{{user_context}}
</user_context>
{{/user_context}}

1. Summarise what the data shows as a short timeline: each sign-in with IP, network owner type (corporate, residential ISP, mobile carrier, hosting or VPN provider, if the data shows it), location, device and client, MFA outcome, and what happened next.
2. Test each benign explanation against the data and say whether it fits: corporate VPN or proxy, travel, mobile carrier geolocation, new device, a service or sync client, a password manager or browser extension. Name the field that supports or rules out each one.
3. Look for the attack patterns: repeated MFA denials or timeouts before an approval; single-factor sign-ins that reuse an existing token; legacy protocols that skip MFA; two active sessions from distant places at once; post-sign-in changes (MFA method, inbox rule, forwarding, app consent, password, privileged role).
4. Give a verdict: true positive, benign true positive (real event, expected), false positive, or undetermined, with a confidence level and the two or three facts that decide it.
5. Actions for the verdict. For a true positive or undetermined with risk: revoke sessions and tokens, reset credentials, remove unknown MFA methods, block the source, check the same IP or user agent across other users, and contact the user out of band (not by email to the possibly compromised mailbox). For a false positive: the tuning or named-location change that would stop the repeat, without excluding the user entirely.
6. List what to check next if anything remains undetermined.
</task>

<constraints>
- Never decide on location alone. Every verdict cites at least two facts from the data.
- Do not invent ASN owners, geolocation or user travel. If the network owner is not in the data, say it must be looked up.
- Do not suggest excluding a user, an admin or a whole country from the alert as a fix.
- Asking a user "was this you?" is useful but not proof; say how much weight their answer gets.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the data shows
Table: Time (UTC) | IP and network type | Location | Device or client | MFA | What followed.

## Benign explanations tested
Table: Explanation | Fits? | Deciding field.

## Verdict
One line, confidence, then the deciding facts.

## Actions
Numbered, each with owner role.

## Check next
Bullets, or "Nothing outstanding".
</output_format>
