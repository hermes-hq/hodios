---
schema: 1
id: handle-spam-pull-request-wave
kind: prompt
title: Handle a wave of spam or low-effort pull requests
description: Responds to a flood of low-effort or AI-generated pull requests and issues with temporary interaction limits, fast triage labels, short closing replies, CI protections and contribution gates.
category: open-source
version: 1.0.0
status: incubating
stage: [operate]
role: [maintainer]
requires: [none]
inputs: [text, diff]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [spam, interaction-limits, low-effort-contributions, saved-replies, moderation, pull-request]
pairs_with:
  prompts: [write-ai-contribution-policy, design-issue-intake, triage-stale-pull-requests]
  personas: [open-source-maintainer]
args:
  - name: situation
    description: What is arriving (trivial README edits, AI-generated refactors, bogus security reports, bounty or event farming), how many per day, what triggered it if known (a tutorial, an event, a bot), and how many maintainers can deal with it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Today, Triage rule, Replies, Protect CI and maintainers, Gates for later, Stand down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Floods of low-effort pull requests come in waves: a tutorial that tells beginners to edit a famous repository's README, a contribution event with prizes, people farming merged PRs for their profile, and more recently AI-generated changes and security reports that look plausible but are wrong. Each one takes a maintainer a minute or more, and some trigger CI runs that cost money or expose secrets if workflows are careless. The fastest relief comes from the code host's own tools: temporary interaction limits that restrict who can open issues and PRs for a set period, requiring approval before workflows run for first-time contributors, and reporting abusive accounts. Then a fast triage rule (a label and a saved reply, close without debate), and longer-term gates: a pull request template that asks for the linked issue and how it was tested, a policy on AI-assisted contributions, and a rule that changes need an accepted issue first. Closing replies should be short and neutral; arguing feeds the wave, and a genuine newcomer caught in it should still see a way to contribute properly.

Situation:
<situation>
{{situation}}
</situation>
</context>

<task>
1. Today: the immediate steps, such as turning on temporary interaction limits at the right level and duration, requiring workflow approval for first-time contributors, pinning a short notice, and reporting accounts that are clearly abusive. Say what each step blocks and the cost to genuine contributors.
2. Triage rule: a one-line test for what to close on sight (for example: no linked issue, trivial or generated change, does not build, template ignored), a label, and how to batch-close.
3. Replies: a neutral closing reply for low-effort PRs, one for bogus AI-generated security reports, and one for a genuine newcomer who got caught, each under 60 words, pointing to the contributing guide.
4. Protect CI and maintainers: workflow settings that stop untrusted PRs running costly jobs or seeing secrets, and dividing the queue so one person is not doing all of it.
5. Gates for later: PR template changes, an issue-first rule for code changes, an AI-contribution policy, and automation that labels PRs missing the template, sized to the project.
6. Stand down: when and how to lift the limits, and what to watch for next time.
</task>

<constraints>
- Do not suggest public shaming of contributors, naming individuals, or replies that mock them.
- Do not recommend banning whole groups of users by country, event or tool; act on behaviour.
- Describe code host settings in general terms and tell the user to confirm the exact options available in their host's settings.
- Do not recommend permanently closing the project to outside contributions unless the maintainers want that; present it as an option with its cost.
</constraints>

<output_format>
Use the contract's section headings in order. Today as a numbered checklist. Replies in fenced blocks, each labelled. Gates for later as a table: Gate | Blocks | Cost to real contributors.
</output_format>
