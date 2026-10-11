---
schema: 1
id: write-feature-rollback-notice
kind: prompt
title: Write a feature rollback notice
description: Writes the notice to users when a launched feature is pulled back - what was turned off and why, what happens to their data or work, what to do now and when they will hear next.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, support-agent, founder]
requires: [none]
inputs: [text, notes]
output: [message, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [feature-rollback, customer-communication, in-app-notice, support-macros, trust-repair]
pairs_with:
  prompts: [write-holding-statement, write-launch-announcement, plan-staged-feature-rollout, write-known-issues-page]
args:
  - name: rollback
    description: What feature was launched and when, who had it (everyone, a cohort, a plan), why it was turned off, what happens to data, settings or work created with it, and whether and when it may return.
    type: text
    required: true
  - name: channels
    description: Where the notice must appear - email, in-app banner, changelog, status page, social, account managers. Optional; defaults to in-app and email.
    type: text
output_contract:
  format: markdown
  sections: [Facts to confirm, Email, In-app notice, Changelog entry, Support macro, What not to say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager who has had to switch off a feature after users started using it. A rollback is not an outage notice and not a launch: people already changed how they work, may have created data with the feature, and will notice it is gone. Rollback messages fail when the feature silently disappears, when the reason is vague, when users do not know whether their work is safe, when the message promises a return date nobody committed to, and when the people who never had the feature get a confusing email. Good notices go only to affected users, lead with what happened to their data and work, give a concrete action if one is needed, and say when the next update comes.
{{#channels}}

Channels: {{channels}}
{{/channels}}
</context>

<task>
Rollback details:

<rollback>
{{rollback}}
</rollback>

1. List the facts to confirm before sending: exactly who had the feature, what happens to data or settings created with it (kept, hidden, exported, deleted and when), whether any charges were affected, and whether a return is committed.
2. Write the email to affected users only: a clear subject, what was turned off and when, the reason in one or two plain sentences, what happens to their data or work, what they should do now (with steps if they need to export or switch back), whether it will return (only if committed), and how to get help.
3. Write a short in-app notice for the place the feature used to be, so users who look for it understand.
4. Write a changelog or release-notes entry.
5. Write a support macro answering the three most likely questions, including "is my data lost?".
6. List phrases and claims to avoid in this case.
</task>

<constraints>
- Never state data is safe, restored or deleted unless the input says so; mark unknowns [TBD] and put them in the facts to confirm.
- Do not promise a return date or "soon" unless the input commits to one.
- Do not send to users who never had the feature; say so if the input suggests a broad send.
- Keep the reason honest and specific; no "to improve your experience" when the truth is a bug or cost problem.
</constraints>

<output_format>
## Facts to confirm
Checklist.

## Email
Subject, then body under 200 words.

## In-app notice
Under 40 words.

## Changelog entry
Two to four sentences.

## Support macro
Three short Q and A.

## What not to say
Bullets.
</output_format>
