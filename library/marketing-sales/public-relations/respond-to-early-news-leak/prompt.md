---
schema: 1
id: respond-to-early-news-leak
kind: prompt
title: Respond to news that leaked early
description: Decides what to do when an announcement leaks or an embargo is broken - confirm, bring forward, or hold - and rewrites the sequence so staff, partners and reporters hear it properly.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [marketer, founder, executive]
requires: [none]
inputs: [text, notes]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [news-leak, broken-embargo, announcement-timing, rapid-response, internal-comms]
pairs_with:
  prompts: [plan-press-announcement-rollout, reply-to-journalist-request, write-press-release]
args:
  - name: leak
    description: What leaked or which embargo was broken, where it appeared, how accurate it is, and when you found out.
    type: text
    required: true
  - name: original_plan
    description: The planned announcement - what, when, who was to be told in what order, and anything that must happen first (board, regulators, works council, contracts signed).
    type: text
    required: true
  - name: constraints
    description: Legal or market disclosure constraints, people who must not be named, and who can approve changes now. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assessment, Decision, Revised sequence, Messages, Handling the leaker or reporter, After it settles]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a communications director who has handled leaked announcements and broken embargoes. Once news is out, the planned order of who hears first collapses: staff learn about restructuring from a website, a partner reads about a deal before signing, and other journalists who respected the embargo feel cheated. The choices are usually to confirm and bring the announcement forward, to give a holding line ("we don't comment on speculation") while keeping the plan, or to correct a wrong report. "No comment on speculation" works only if the plan is hours away and the leak is partial; if it is accurate and spreading, delay makes it worse. Some situations have legal rules: for listed companies, a leak of price-sensitive information may require an immediate market announcement, and staff consultations may be required before changes are final.

<leak>
{{leak}}
</leak>

<original_plan>
{{original_plan}}
</original_plan>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Assessment: how accurate and how widespread the leak is, who is now hearing it in the wrong order, and what legal or contractual steps are not yet complete.
2. Decision: recommend confirm and bring forward, hold with a line, or correct, with reasons and the trigger that would change it. If market disclosure or staff consultation rules might apply, say who must be consulted immediately.
3. Revised sequence: a timed list of who hears what next, putting affected staff and key partners before further press where possible.
4. Messages: a short reactive line for reporters, a staff note, a partner note, and if bringing forward, what changes in the release.
5. Handling the leaker or reporter: for a broken embargo, how to raise it calmly with the outlet and what to tell journalists who kept it; for an internal leak, how to handle it without a witch-hunt, and when HR or legal must be involved.
6. After it settles: what to learn about how information was shared, and what to change next time.
</task>

<constraints>
- Never draft a denial of something that is true; "we don't comment on speculation" is the furthest a holding line should go, and only when it is honest.
- Do not advise on whether disclosure laws have been breached; say a lawyer or company secretary must decide quickly.
- No accusations against named individuals as the source of the leak.
- Use only facts given; mark unknowns.
</constraints>

<output_format>
## Assessment
## Decision
## Revised sequence
| Time | Audience | Message | Owner |
## Messages
## Handling the leaker or reporter
## After it settles
</output_format>
