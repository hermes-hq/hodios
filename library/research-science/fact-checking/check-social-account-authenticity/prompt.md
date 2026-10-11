---
schema: 1
id: check-social-account-authenticity
kind: prompt
title: Check whether a social media account is genuine
description: Checks whether a social media account is who it claims to be, an impersonator, an automated account or part of a coordinated network, from history, activity and network signals.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [writer, editor, individual, content-creator]
requires: [web]
inputs: [url, text]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bot-detection, impersonation, coordinated-inauthentic-behaviour, osint, account-verification]
pairs_with:
  prompts: [verify-expert-credentials, verify-eyewitness-source, check-post-before-sharing]
  personas: [fact-checker]
args:
  - name: account
    description: The account's handle and platform, a link, and what you can see of its profile, posting history and followers.
    type: text
    required: true
  - name: why_asking
    description: Why it matters, for example "it claims to be a hospital and is posting about an outbreak" or "it replied to my post with a job offer".
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Identity claim, Signals checked, Assessment, What to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Impersonation and inauthentic accounts follow recognisable patterns. Impersonators use a lookalike handle (an extra letter, underscore or swapped character), copied profile photos and a recent creation date, and the real person or organisation usually links to its genuine accounts from an official website. Paid verification badges on several platforms now show that someone paid, not who they are. Automated or bulk-run accounts show very high or clockwork posting rates, mostly reposts, generic or AI-generated profile photos, handles that are a name plus a string of digits, and long dormancy before sudden activity. Coordinated networks are revealed by groups of accounts posting the same text within minutes, created in the same period, following each other, and switching topic together. No single signal is decisive: many real people post a lot, use anime avatars or have digit-filled handles, so judgements should rest on several independent signals and say how confident they are.
</context>

<task>
Check this account.
<account>
{{account}}
</account>
{{#why_asking}}Why it matters: {{why_asking}}{{/why_asking}}

1. State the identity the account claims (a person, organisation, official body, ordinary member of the public, or none).
2. Check the identity claim: the official website or other known channels of the claimed person or organisation, and whether they link to this account; lookalike handles; name and handle change history if visible; and reverse image search of the profile photo.
3. Check activity signals: creation date, posting rate and times, share of original posts versus reposts, language and topic shifts, dormancy, and engagement that does not fit the follower count.
4. Check network signals: identical or near-identical posts from other accounts, clusters created at the same time, and who amplifies it.
5. Give a verdict with confidence, and what to do.
</task>

<constraints>
- Base findings only on what you observed in pages you opened, or on what the user supplied; say which. Never invent creation dates, follower counts or linked accounts.
- If you have no web access, assess the supplied details only, give a provisional verdict, and list the checks to run.
- Rely on several independent signals; say when evidence is thin, and do not label an ordinary person a bot or a troll on one signal.
- Do not try to unmask the real identity behind an anonymous account, find their address or contact anyone. Assess authenticity only.
- If it impersonates someone or is a scam, point to the platform's reporting tools; do not draft harassment or public accusations.
</constraints>

<output_format>
## Verdict
One of: genuine, likely genuine, unclear, likely impersonator, likely automated, likely part of a coordinated network. Then confidence (high, medium, low) and two sentences.
## Identity claim
## Signals checked
Table: signal | what you found | source (observed or supplied) | points towards.
## Assessment
## What to do
</output_format>
