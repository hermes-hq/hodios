---
schema: 1
id: respond-to-leaked-secret
kind: prompt
title: Respond to a leaked secret
description: Produces an ordered response plan for an exposed API key, token or password, from revocation and rotation to usage audit and prevention. Use right after a secret is committed, logged or shared.
category: security
version: 1.0.0
status: experimental
aliases: [handle-leaked-secret]
stage: [operate]
role: [security-engineer, devops-engineer, software-engineer]
stack: []
requires: [repo-read]
inputs: [text, repo]
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
  sections: [Severity, Do now, Rotate, Investigate, Clean up, Notify, Prevent, Unknowns]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A secret that left its intended boundary must be treated as compromised. Automated scanners pick up keys from public repositories within minutes, and deleting the commit, force-pushing or making the repo private does not undo the copies already made. The only real fix is to make the leaked value useless, then find out whether anyone used it.
</context>

<task>
A {{secret_kind}} was exposed: {{exposure}}
{{#used_by}}
It is used by: {{used_by}}
{{/used_by}}

Write the response plan.
1. Rate the severity from what the secret can do (its scopes and permissions), how public the exposure was, and for how long.
2. Order the steps so the leaked value is revoked first. Revoke at once, and accept the outage, when the exposure was public (a public repository, image, package or paste site), the credential has broad or production write access, or there are signs it has been used. Only when the exposure was narrow (a private channel or repository with a known audience) and revoking would cause an outage, give the faster safe order instead: create a second credential, deploy it, then revoke the old one, with a time limit of hours, not days.
3. If the repository is available, search it for every place the secret is read (environment variable names, config keys, secret manager paths) so the rotation misses no consumer. List the places you found.
4. Say how to check whether the secret was used during the exposure window (first exposure to revocation): which audit or access logs this kind of credential has, what to filter on, and what unexpected use looks like. Include persistence an attacker would leave behind: new users, keys, tokens or roles, OAuth apps, webhooks, deploy keys and scheduled jobs created in the window.
5. Cover clean-up as optional hygiene, after revocation, and say what it does not fix. List where other copies live: forks, pull request refs, CI logs and artifacts, container image layers, chat, tickets and paste sites; mention asking the host to purge cached views where it offers that.
6. Say who to notify: the security owner and the owner of the service the secret protects. If personal or customer data may have been reached, bring in legal or privacy staff early, because notification deadlines may apply; do not decide yourself whether a notification is legally required.
7. Recommend the two or three controls that would have prevented this specific leak.
</task>

<constraints>
- Never ask for the secret's value. If the user pasted it, tell them in the first line that it is now exposed in this conversation too and must be rotated regardless.
- Never present deleting the commit, rewriting history or making a repository private as a fix.
- Give exact console paths or CLI commands only when you are sure of them for this provider. Otherwise name the provider's official documentation page to follow. Do not invent flags.
- Do not run or recommend any command that changes production. The user runs the steps.
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
History and cache clean-up, marked optional, with what it does and does not achieve.

## Notify
Who to tell, and what to tell them.

## Prevent
Two or three controls, each tied to how this leak happened.

## Unknowns
Facts you need from the user that would change the plan. "None" if none.
</output_format>
