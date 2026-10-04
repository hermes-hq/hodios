---
schema: 1
id: write-exploratory-test-charters
kind: prompt
title: Write exploratory test charters
description: Writes session-based exploratory testing charters for a feature with time boxes, heuristics, a session sheet and a debrief agenda, aimed at risks automation misses. Use before a release.
category: testing
version: 1.0.0
status: incubating
stage: [verify, plan]
role: [qa-engineer, software-engineer, product-manager]
requires: [none]
inputs: [spec, ticket, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [exploratory-testing, session-based-testing, test-charters, sfdipot, test-heuristics]
pairs_with:
  prompts: [write-test-plan, write-manual-test-cases]
  personas: [exploratory-tester]
args:
  - name: feature_description
    description: What the feature does, who uses it, the spec or acceptance criteria, what changed, and what automated tests already cover.
    type: text
    required: true
  - name: risk_areas
    description: Known worries - past bugs, tricky integrations, data at stake, platforms, deadlines.
    type: text
  - name: time_available
    description: Total tester time for exploration, for example "2 testers for one afternoon" or "6 hours".
    type: string
    default: "about 4 hours of one tester"
output_contract:
  format: markdown
  sections: [Risk map, Charters, Session schedule, Session sheet, Debrief agenda]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants structured exploratory testing for one feature: time-boxed sessions, each guided by a charter, with notes good enough to debrief and report bugs. Session-based exploratory testing works because it is focused but not scripted: a charter says where to look and what kind of problem to look for, and the tester follows what they learn.

Weak charters are either test cases in disguise ("verify the button saves") or so broad they guide nothing ("test the checkout"). Good ones use the form "Explore <target> with <resources> to discover <information>", aim at risks automated checks are poor at (odd sequences, interruptions, real data shapes, permissions, concurrency, error recovery, usability on real devices), and fit a 45-90 minute session.

Time available: {{time_available}}.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#risk_areas}}

<risk_areas>
{{risk_areas}}
</risk_areas>
{{/risk_areas}}

1. Map the product with the SFDIPOT heuristic (Structure, Function, Data, Interfaces, Platform, Operations, Time): note for each dimension what this feature has and what could go wrong. Combine with the known risks and rank the top areas by impact and likelihood. Skip what automation already covers well.
2. Write 4-8 charters, highest risk first. Each has:
   - The charter line: "Explore <target> with <resources: data, accounts, devices, tools> to discover <kind of problem>".
   - Time box (short 45, normal 60 or long 90 minutes).
   - Setup needed (accounts, data, feature flags, environment).
   - Two to four heuristics or tours to try, chosen for the target: boundaries and zero-one-many, CRUD on each object, interruptions (back button, network loss, app backgrounded, session timeout), concurrency (two tabs, two users), data variety (long, Unicode, right-to-left, emoji, empty, pasted), undo and recovery, permissions and roles, the "follow the data" tour across screens and exports.
   - Oracles: how the tester will recognise a problem (spec, comparable product, consistency with the rest of the app, user expectations, error messages, data in the database or export).
3. Fit the charters into the time available; say which to drop first if time runs short.
4. Provide a session sheet template with: charter, tester, start time, duration, percentage split of time on testing, bug investigation and setup, test notes, bugs (title, steps, expected, actual, evidence), issues and questions, and coverage notes.
5. Provide a short debrief agenda (10-15 minutes per session): what was covered, what was not and why, bugs and their severity, new risks found, and whether a follow-up charter is needed.

If the feature description lacks who uses it or what it does, ask for that and stop.
</task>

<constraints>
- Charters guide; they never contain step-by-step scripts or expected results per step.
- Do not repeat checks the user says automation covers; reference them instead.
- Use synthetic test data and test accounts; never real personal data.
- Do not invent features; mark assumptions as [ASSUMED].
</constraints>

<output_format>
## Risk map
Table: SFDIPOT dimension | what this feature has | what could go wrong | priority.
## Charters
Numbered charters with the fields from step 2.
## Session schedule
Table: session | charter | tester (role) | time box. Then "If time runs short, drop:".
## Session sheet
The template as a fenced Markdown block, ready to copy.
## Debrief agenda
Bullets with minutes.
</output_format>
