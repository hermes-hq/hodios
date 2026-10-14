---
schema: 1
id: defend-against-credential-stuffing
kind: prompt
title: Defend a login against credential stuffing
description: Protects a live login from automated password attacks with per-account and per-IP throttling, breached-password checks, bot challenges, MFA prompts and attack monitoring.
category: security
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, security-engineer, sre, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [code, tests, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [credential-stuffing, account-takeover, bot-protection, authentication]
pairs_with:
  prompts: [add-rate-limiting, implement-two-factor-auth, analyze-web-attack-logs, implement-session-revocation]
  personas: [security-auditor]
args:
  - name: situation
    description: The login (web, mobile, API), what is happening (an attack now, or preparing), and any traffic numbers or log samples.
    type: text
    required: true
  - name: stack
    description: Framework, hosting, CDN or WAF in front of the app. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Assessment, Immediate actions, Changes, Tests, Monitoring, Longer term]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Credential stuffing replays username and password pairs leaked from other sites, from thousands of residential proxy IPs, at a low rate per IP. Per-IP limits alone barely slow it, and per-account hard lockouts let an attacker lock out real users on purpose. What works is layered: limits per account identifier across all IPs (with growing delays or a challenge rather than lockout) and per IP across accounts; signals such as a spike in failed logins for unknown usernames, many accounts from one device fingerprint or ASN, and success rates far below normal; a challenge (CAPTCHA or proof of work) shown only when risk is high; checking passwords against breach corpora at sign-in and change, for example with the k-anonymity range API from Have I Been Pwned so the full hash never leaves the server; offering or requiring MFA and passkeys; notifying users of new-device sign-ins; and CDN or WAF bot management. Login responses must not reveal whether the username exists, and mobile and API login endpoints are often forgotten while the web form is protected. Accounts that were successfully breached during an attack need their sessions revoked and a reset.
</context>

<task>
Defend the login described here: {{situation}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the login endpoints (web, mobile, API, password reset, MFA), current rate limiting, logging and the CDN or WAF setup. If logs are given, estimate the attack shape: request rate, number of IPs, ratio of unknown usernames, success rate.
2. If an attack is in progress, list immediate actions first that can be applied within an hour (stricter limits on the login route at the edge, a challenge for high-risk requests, temporary blocks on the worst sources) and how to find accounts that were compromised.
3. Implement in the app:
   - per-account and per-IP limits with growing delays, not hard lockouts, on every login-like endpoint;
   - generic error messages and similar timing for unknown users and wrong passwords;
   - a risk score from simple signals that triggers a challenge;
   - breached-password checks at sign-in (prompt to change) and at password set (reject);
   - new-device sign-in notifications and session revocation for compromised accounts.
4. Add structured login events (outcome, account id, IP, user agent, reason) and metrics for failed logins, unknown-username rate and challenge rate, without logging passwords.
5. Write tests for the limits, the challenge trigger, the breached-password check (with the external call stubbed) and the generic responses. Run them.
</task>

<constraints>
- Never log or store submitted passwords, even failed ones.
- Do not add hard per-account lockouts that attackers can trigger.
- Do not block whole countries or ASNs permanently without the team's decision; propose them as temporary measures.
- Do not change production edge or WAF settings yourself; give the configuration for the team.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assessment
Attack shape (or readiness gaps), which endpoints are exposed, and what is already in place.
## Immediate actions
Numbered actions for the next hour, if an attack is happening; otherwise "None needed".
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Monitoring
Events, metrics and alert thresholds to add.
## Longer term
MFA, passkeys, bot management and other steps beyond this change.
</output_format>
