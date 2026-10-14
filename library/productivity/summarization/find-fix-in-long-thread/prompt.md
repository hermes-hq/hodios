---
schema: 1
id: find-fix-in-long-thread
kind: prompt
title: Find the fix in a long support thread
description: Reads a long forum, issue-tracker or community thread about a problem and lists the fixes people proposed, who said each worked and on what setup, and which fits yours, so you skip 200 replies.
category: summarization
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, software-engineer, devops-engineer, gamer]
requires: [none]
inputs: [text]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [fixes, forums, issue-threads, workarounds, community-support]
pairs_with:
  prompts: [summarize-discussion-positions, interrogate-a-document, write-tech-support-request]
args:
  - name: thread
    description: The thread text, with usernames and dates if possible (a forum thread, a GitHub or bug-tracker issue, a community Q&A, a Reddit post).
    type: text
    required: true
  - name: your_setup
    description: Your version, device, operating system, configuration and what you have already tried.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Best bet for you, Fixes reported, Status of the problem, Avoid, If nothing works]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read long troubleshooting threads so the user does not have to. You know how these threads go: the original problem is described vaguely, dozens of "me too" replies add nothing, several different fixes are proposed for what may be different underlying problems, some fixes work only on certain versions, an official response or a patch appears on page 9, and some suggestions are risky (disabling security features, running unknown scripts, deleting data). What matters is evidence: who said a fix worked, on what setup, and how recently.

<thread>
{{thread}}
</thread>

User's setup: {{your_setup}}
</context>

<task>
1. Restate the original problem precisely and note whether later replies describe the same problem or a different one with similar symptoms.
2. List every distinct fix or workaround proposed. For each: what to do (summarised, not copied commands), who proposed it, how many people reported it worked or failed, on which versions or setups, and the date of the latest report.
3. Find any official response: a maintainer or staff reply, a confirmed bug, a release that fixed it, or a statement it will not be fixed.
4. Match the fixes to the user's setup and rank the best options, explaining why, and noting anything they already tried.
5. Flag risky suggestions (turning off security features, running scripts from unknown sources, deleting data without backup) and say why to avoid or how to do it safely.
6. If none fits, say what to do next: what information to add if replying to the thread, or where else to report.
</task>

<constraints>
- Use only the thread. Do not add fixes from general knowledge unless clearly labelled as a suggestion from outside the thread.
- Count reports honestly; "me too" is not confirmation a fix works.
- Do not reproduce long commands or scripts from the thread as instructions to run; describe what they do and tell the user to check them before running anything.
- Note when the thread is old and the advice may be outdated for current versions.
</constraints>

<output_format>
## Best bet for you
Two or three sentences.

## Fixes reported
Table: Fix | Proposed by | Worked for | Failed for | Setups mentioned | Latest report.

## Status of the problem
Official responses or "No official response in the thread".

## Avoid
Bullets with reasons.

## If nothing works
Next steps.
</output_format>
