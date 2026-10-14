---
schema: 1
id: implement-phone-number-verification
kind: prompt
title: Implement phone number verification
description: Implements SMS one-time-code phone verification with E.164 normalisation, attempt and resend limits, SMS pumping fraud guards, autofill support and a provider fallback.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, mobile-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [sms, one-time-code, phone-numbers, sms-pumping, fraud-prevention]
pairs_with:
  prompts: [implement-two-factor-auth, block-fake-signups, add-rate-limiting]
args:
  - name: requirements
    description: Why phones are verified and where, for example "verify phone at signup for a delivery app in 5 countries using our SMS provider".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Flow, Abuse controls, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer implementing phone number verification by SMS code. The code itself is easy; the cost and abuse are not:
- Normalise every number to E.164 with a phone library (libphonenumber or a port), using the user's selected country as the default region. Store E.164, display in local format, and reject numbers the library says are invalid.
- Codes: 6 digits, expiry of a few minutes, one active code per number, stored hashed, compared in constant time, and invalidated after a small number of wrong attempts (for example 5).
- A provider's verification API (Twilio Verify, Vonage Verify and similar) handles code generation, delivery retries, channel fallback and some fraud screening. Sending raw SMS with your own codes gives control but makes all of that yours. Use what the project already pays for.
- SMS pumping fraud: bots request codes to premium-rate numbers and you pay per message. Guard with per-number, per-IP, per-device and per-prefix limits, a country allowlist matching where the product operates, a challenge before sending after unusual volume, and alerts on send volume versus completed verifications per country.
- Resend has a cooldown that grows (for example 30 seconds, then 60, then longer); offer voice as a fallback only if the provider supports it.
- Phone numbers get reassigned to new people. Do not treat a number as a permanent identity, and re-verify after long inactivity if it gates account recovery.
- Help autofill: `autocomplete="one-time-code"` on the web input, and the WebOTP or platform SMS format if the app supports it.
- Decide whether a verified number must be unique per account, and what happens when a second account claims it. The send step returns the same response whether or not the number is already registered, so it cannot be used to check who has an account.
</context>

<task>
Implement phone verification for this app:
{{requirements}}

1. Read the user model, sign-up flow, any existing SMS or provider integration, rate limiting and config. Follow the existing patterns.
2. Write the flow: number entry and normalisation, send, verify, resend, change number, and the states stored.
3. Write the abuse controls: limits per number, IP, device and prefix, country allowlist, challenge trigger, monitoring signal.
4. Implement the data model, the provider client behind an interface with a fake for tests, the endpoints or actions, and the UI input with autofill attributes.
5. Write tests: valid code, wrong code until lockout, expired code, resend cooldown, blocked country, invalid number, number already verified on another account.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never send real SMS from tests or local development; use the fake or the provider's test credentials.
- Never log codes or full phone numbers.
- Do not invent provider API names; read the provider SDK or docs in the repo, and say what needs checking if they are absent.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow
Steps and states from number entry to verified.
## Abuse controls
A table: Control | Limit | Where enforced.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Open questions
Decisions needed, such as allowed countries or uniqueness.
</output_format>
