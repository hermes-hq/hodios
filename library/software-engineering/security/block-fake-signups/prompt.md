---
schema: 1
id: block-fake-signups
kind: prompt
title: Block fake and bot sign-ups
description: Stops bot and abusive sign-ups with layered checks such as rate limits, disposable email signals, risk-based challenges and verification gates, while keeping real sign-up quick.
category: security
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, fullstack-engineer, security-engineer, software-engineer]
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
level: intermediate
depth: specific
tags: [signup-abuse, bot-protection, fraud-prevention]
pairs_with:
  prompts: [add-rate-limiting, defend-against-credential-stuffing, implement-transactional-email, implement-audit-log]
  personas: [security-auditor]
args:
  - name: situation
    description: What the fake accounts are doing (spam, free-tier abuse, SMS pumping, referral fraud), sign-up volumes and examples.
    type: text
    required: true
  - name: stack
    description: Framework, hosting, CDN and email or SMS providers. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Abuse pattern, Defences chosen, Changes, Tests, Monitoring, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fake sign-ups are driven by what the attacker gets: free-tier compute or AI credits, a place to post spam or phishing links, referral or promo bonuses, a way to send email or SMS through your product, or SMS pumping fraud where bots trigger verification texts to premium numbers you pay for. The defence should follow the incentive: gate the valuable thing (credits, outbound messages, public posting) behind verification and account age rather than making sign-up itself painful for everyone. Useful layers: rate limits per IP, per device and per email domain; email normalisation (Gmail dots and plus tags) so one inbox cannot make hundreds of accounts; disposable email domain lists, kept updated; a honeypot field and minimum form time to catch simple bots; an invisible or risk-based challenge (Turnstile, reCAPTCHA, hCaptcha) on sign-up; email verification before any abusable feature; for SMS, country allowlists, per-number and per-prefix limits, and a provider fraud guard; and clustering signals (same device, IP range, name patterns) to remove batches. Blocking whole countries or all free email providers turns away real customers.
</context>

<task>
Reduce fake sign-ups: {{situation}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the sign-up flow, verification, free-tier or credit grants, outbound messaging features and any existing limits.
2. From the situation and any data, name the abuse pattern and what the attacker gains. Ask for sign-up logs or examples if none are given and the pattern is unclear.
3. Choose defences that target the gain, lightest for real users first, and say what each one costs in friction.
4. Implement them: rate limits, email normalisation and uniqueness on the normalised form, disposable domain check with an updatable list, honeypot and timing checks, a challenge shown on risk, verification gates on the valuable features, and SMS protections if verification texts are sent.
5. Add a sign-up event log with the signals (IP, device hash, email domain, challenge result) and an admin action to disable a cluster of accounts.
6. Write tests for each check, including that a normal sign-up still passes without a visible challenge. Run them.
</task>

<constraints>
- Do not block entire countries, all free email providers or VPN users by default; offer them as options with their cost.
- Keep sign-up data collection to what is needed; say what new personal data is stored and for how long.
- Do not delete existing accounts in bulk; produce a reviewable list and an action for the team to run.
- Never invent the API of a challenge or fraud provider; use its official SDK and say if unsure.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Abuse pattern
What the bots do and what they gain, with evidence.
## Defences chosen
Table: defence, what it stops, friction for real users.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Monitoring
Metrics and alerts: sign-ups per hour, verification rate, challenge rate, cost of SMS sent.
## Trade-offs
What was not done and why.
</output_format>
