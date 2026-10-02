---
schema: 1
id: handle-leaked-secret
kind: prompt
title: Respond to a leaked secret
description: Guides the response to a leaked credential in the right order - revoke and rotate, scope the blast radius, purge copies and prevent a repeat. Use the moment a key, token or password is exposed.
category: security
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, software-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [text, logs]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [secret-rotation, credential-leak, secret-scanning, blast-radius]
pairs_with:
  personas: [security-auditor, incident-commander]
args:
  - name: what_leaked
    description: The kind of credential and what it grants, e.g. "AWS access key for the ci-deploy IAM user", "Stripe live secret key", "Postgres password for the app user".
    type: text
    required: true
  - name: where_exposed
    description: Where and when it was exposed, e.g. "public GitHub repo, commit pushed 3 hours ago", "pasted in a shared Slack channel", "baked into a public container image".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Do now, Blast radius, Clean up, Notify, Prevent, Incident record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The common mistake after a leak is to delete the commit or force-push and consider it handled. Anything pushed to a public repository can be scraped by automated scanners within minutes, and forks, caches, CI logs and container layers keep copies. The credential must be treated as compromised from the first moment of exposure. Order matters: rotate first, then investigate, then clean up, because cleaning up first gives a false sense of safety and can destroy evidence.
</context>

<task>
Guide the response to this leak.
What leaked: {{what_leaked}}
Where it was exposed: {{where_exposed}}

1. Do now. Contain it in the first minutes:
   - If there are signs of active misuse, revoke the credential immediately and accept the outage.
   - Otherwise create a replacement, deploy it to every consumer, then revoke the old one, so containment does not cause a self-inflicted outage. Name the consumers to check.
   - Give the provider-specific way to revoke and rotate for this credential type. If the credential type or provider is unclear, still give the generic containment steps first, then ask.
2. Blast radius: what the credential could access (its permissions and scope), the exposure window (first exposure to revocation), and the audit logs to search for use from unknown sources during that window. Look for persistence an attacker may have created: new users, keys, tokens, OAuth apps, webhooks, deploy keys, scheduled jobs.
3. Clean up after rotation: remove it from the current code and config; rewrite history only if needed and coordinate the force-push; ask the hosting provider to purge cached views where they offer it; and check the other places copies live (forks, pull request refs, CI logs and artifacts, container image layers, chat, tickets, paste sites).
4. Notify: the security owner, and the service owner of what the credential protects. If personal or customer data may have been accessed, involve legal or privacy staff early, because notification deadlines may apply.
5. Prevent a repeat: push-time secret scanning, pre-commit hooks, a secrets manager, short-lived credentials (for example workload identity federation for CI instead of static keys), and least privilege on the replacement.
</task>

<constraints>
- Never suggest that deleting the commit, making the repository private, or rewriting history is enough on its own.
- Do not ask the user to paste the secret. If they have, tell them to treat that copy as exposed too.
- Commands must be specific to the credential type when you know it; mark anything that changes state.
- Do not decide whether a legal notification is required; say who should decide.
</constraints>

<output_format>
## Do now
Numbered steps for the first 15 minutes, most urgent first.
## Blast radius
What it could reach, the exposure window, logs to search and indicators to look for.
## Clean up
A checklist, in order.
## Notify
Who, and what to tell them.
## Prevent
The two or three changes that would have stopped this leak.
## Incident record
Fields to record: credential, exposure start, detection, revocation time, evidence of use, follow-ups.
</output_format>
