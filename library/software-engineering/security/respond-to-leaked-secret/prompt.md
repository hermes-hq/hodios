---
schema: 1
id: respond-to-leaked-secret
kind: prompt
title: Respond to a leaked secret
description: Produces an ordered response plan for an exposed key, token or password - revoke and rotate, audit use, clean up copies, notify and prevent. Use right after a secret is committed, logged or shared.
category: security
version: 1.1.0
status: experimental
aliases: [handle-leaked-secret]
stage: [operate]
role: [security-engineer, devops-engineer, software-engineer]
stack: []
requires: [repo-read]
inputs: [text, repo, logs]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [secrets, credential-rotation, secret-scanning, blast-radius]
pairs_with:
  personas: [security-auditor, incident-commander]
args:
  - name: secret_kind
    description: What leaked, without the value. For example "AWS access key", "GitHub fine-grained token", "Stripe live secret key", "Postgres password".
    type: string
    required: true
  - name: exposure
    description: Where and how it leaked, since when, and who could see it. For example "pushed to a public GitHub repo 2 hours ago, force-pushed away 10 minutes later".
    type: text
    required: true
  - name: used_by
    description: Services, environments or people that use this secret today, if you know.
    type: text
output_contract:
  format: markdown
  sections: [Severity, Do now, Rotate, Investigate, Clean up, Notify, Prevent, Incident record, Unknowns]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.1.0, note: "Absorbs handle-leaked-secret: revoke at once on signs of misuse, persistence hunting, where copies live, who to notify, and an incident record."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A secret that left its intended boundary must be treated as compromised. Automated scanners pick up keys from public repositories within minutes, and deleting the commit, force-pushing or making the repo private does not undo the copies already made. Forks, caches, CI logs and container layers keep their own copies. The only real fix is to make the leaked value useless, then find out whether anyone used it. Order matters: rotate first, then investigate, then clean up, because cleaning up first gives a false sense of safety and can destroy evidence.
</context>

<task>
A {{secret_kind}} was exposed: {{exposure}}
{{#used_by}}
It is used by: {{used_by}}
{{/used_by}}

Write the response plan.
1. Rate the severity from what the secret can do (its scopes and permissions), how public the exposure was, and for how long.
2. Order the steps so the leaked value is revoked first. If there are signs of active misuse, revoke at once and accept the outage. Otherwise, where revoking it at once would cause an outage, say so and give the fastest safe order: create a second credential, deploy it, then revoke the old one, with a time limit on that window. If the credential type or provider is unclear, give the generic containment steps first, then ask.
3. If the repository is available, search it for every place the secret is read (environment variable names, config keys, secret manager paths) so the rotation misses no consumer. List the places you found.
4. Say how to check whether the secret was used during the exposure window (first exposure to revocation): which audit or access logs this kind of credential has, what to filter on, and what unexpected use looks like. Include persistence an attacker may have created with it: new users, keys, tokens, OAuth apps, webhooks, deploy keys or scheduled jobs.
5. Cover clean-up as hygiene after revocation, and say what it does not fix: remove the secret from current code and config; rewrite history only if needed, with a coordinated force-push; ask the host to purge cached views where it offers that; and check the other places copies live (forks, pull request refs, CI logs and artifacts, container image layers, chat, tickets, paste sites).
6. Say who to notify: the security owner and the owner of the service the credential protects. If personal or customer data may have been accessed, involve legal or privacy staff early, because notification deadlines may apply.
7. Recommend the two or three controls that would have prevented this specific leak, for example push-time secret scanning, short-lived credentials such as workload identity federation for CI, and least privilege on the replacement.
</task>

<constraints>
- Never ask for the secret's value. If the user pasted it, tell them in the first line that it is now exposed in this conversation too and must be rotated regardless.
- Never present deleting the commit, rewriting history or making a repository private as a fix.
- Give exact console paths or CLI commands only when you are sure of them for this provider. Otherwise name the provider's official documentation page to follow. Do not invent flags.
- Do not run any command that changes production; the user runs the steps. Mark each command that changes state.
- Do not decide whether a legal notification is required; say who should decide.
- Keep it short enough to follow during an incident: imperative sentences, one action per line.
{{> output/uncertainty}}
</constraints>

<output_format>
## Severity
One line: critical, high, medium or low, and why (what an attacker could do with it).

## Do now
Numbered steps for the next 15 minutes, revocation first.

## Rotate
Numbered steps to issue the new secret and update every consumer, with the consumers found in the repo.

## Investigate
Which logs to check, the time window, the filter, and what counts as suspicious use.

## Clean up
A checklist in order, after rotation: code and config, history, caches and other copies, with what each step does and does not achieve.

## Notify
Who, and what to tell them.

## Prevent
Two or three controls, each tied to how this leak happened.

## Incident record
Fields to record: credential, exposure start, detection, revocation time, evidence of use, follow-ups.

## Unknowns
Facts you need from the user that would change the plan. "None" if none.
</output_format>
