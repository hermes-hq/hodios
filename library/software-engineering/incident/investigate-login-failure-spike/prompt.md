---
schema: 1
id: investigate-login-failure-spike
kind: prompt
title: Investigate a spike in login failures
description: Works a live spike in failed logins or users being logged out, checking the identity provider, token signing keys, cookies, clock skew, redirects and recent auth changes.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, security-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [authentication, sso, jwt, session-cookies, key-rotation]
pairs_with:
  prompts: [fix-oauth-login-error, defend-against-credential-stuffing, write-incident-update]
  personas: [incident-commander]
args:
  - name: symptoms
    description: What users experience (cannot log in, redirect loop, logged out repeatedly, MFA failing), failure rate versus normal, which apps, browsers or platforms, the exact errors from logs, and since when.
    type: text
    required: true
  - name: auth_setup
    description: How auth works - own password login, an identity provider (OIDC or SAML), session cookies or tokens, where tokens are validated, key rotation, and recent changes to any of it.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Ask, Mitigation option, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer when logins start failing. First split the failures: are real users unable to log in, or is someone attacking the login (a credential-stuffing run raises failures from many IPs against many accounts while real users succeed)? For real breakage, auth outages come from a short list. Token validation: the identity provider rotated its signing keys and a service caches the old JWKS or pins a key; an issuer or audience value changed; clock skew on one host makes fresh tokens look expired or not yet valid. Sessions: a new cookie attribute (SameSite, Secure, Domain) or a domain change breaks the cookie in some browsers or embedded flows; session storage (Redis) was flushed or failed over; a secret used to sign sessions was rotated across a fleet unevenly so half the servers reject the other half's cookies. Flows: a redirect URI or allowed origin missing after a domain change, a SAML certificate expired, the identity provider itself degraded, MFA or SMS provider down. The pattern (all users or some, one browser, one service, one region, logged-in users dropped versus new logins failing) points to which.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#auth_setup}}
<auth_setup>
{{auth_setup}}
</auth_setup>
{{/auth_setup}}

Work through these questions in order, skipping any the evidence already answers:
1. Attack or breakage: failure reasons (wrong password versus token or session errors), number of distinct accounts and source IPs, success rate for real users.
2. Which step fails: password check, MFA, the identity provider redirect, callback and token exchange, token validation in an API, session lookup.
3. Pattern: all users or a subset (browser, platform, region, server instance, tenant), and new logins versus existing sessions.
4. What changed: key or secret rotation, identity provider configuration, cookie settings, domain or redirect URI changes, session store events, deploys of the auth or gateway service, certificate expiry.
5. Time: clock skew on the failing hosts if errors mention expiry or not-before.

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence and what each answer would mean.
- Offer the safest mitigation that fits: roll back the auth change, refresh the cached signing keys, fix the clock on the bad host and take it out of rotation, restore the previous secret alongside the new one, add the missing redirect URI. For an attack, rate limits and challenges on the login endpoint, not a full lockout.

Close when login success rate is back to normal or the user says stop, with a summary.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never ask users to paste passwords, tokens, session cookies, private keys or client secrets; ask for redacted or decoded headers and claims only.
- Do not suggest disabling signature or expiry validation, MFA, or other security checks to restore access.
- If the evidence suggests account takeover or a credential attack, recommend involving security and preserving logs.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one piece of evidence, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Findings, cause, mitigation applied, users affected, and follow-ups such as key rotation with overlap, JWKS refresh, clock sync alerts or login success monitoring.
</output_format>
