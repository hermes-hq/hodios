---
schema: 1
id: review-agent-plan
kind: prompt
title: Review a coding agent's plan
description: Reviews the plan a coding agent proposes before it edits anything, checking its claims against the code, scope, order, verification and risky actions, and returns approve, revise or reject.
category: meta
version: 1.0.0
status: incubating
stage: [review, plan]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [text, repo]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, plan-mode, human-in-the-loop]
pairs_with:
  prompts: [review-agent-transcript, write-implementation-plan, review-ai-generated-code]
  personas: [careful-coding-agent]
args:
  - name: plan
    description: The plan the agent proposed, pasted in full.
    type: text
    required: true
  - name: request
    description: What you originally asked the agent to do, word for word if possible, including any constraints you gave.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Claims checked, Issues, Reply to the agent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A plan is the cheapest place to correct a coding agent: one sentence now saves reverting thirty edited files later. Agent plans fail in recognisable ways. They solve a nearby problem instead of the one asked. They state facts about the code that were never checked ("the config is loaded in app.ts"). They reach beyond scope into refactors, new dependencies or formatting changes. They order work big-bang instead of in verifiable steps. Their verification is "run the tests" with no named test, or a plan to mock the very thing under test. And they bury destructive steps (schema migrations, deleting files, rewriting history) as ordinary bullets. Plans also read convincingly, so the review must check claims rather than judge tone.
</context>

<task>
Review this plan against the request.
<request>
{{request}}
</request>
<plan>
{{plan}}
</plan>

1. Restate the request's goal and constraints in two lines, then check the plan solves that goal and respects every constraint. Quote any constraint the plan ignores.
2. Extract each factual claim about the code (a file, function, config, behaviour). If you can read the repository, verify each one and record true, false or not found with the path. If you cannot, list them as unverified.
3. Check scope: list every file or area the plan touches that the request does not need, every new dependency, and any change to public interfaces, data or configuration.
4. Check order and size: can each step be verified before the next starts? Suggest a split where one step does too much.
5. Check verification: which named tests or commands prove each step, whether new tests are needed, and whether the plan weakens, skips or mocks away tests.
6. Flag risky actions: data migrations, deletions, history rewrites, pushes, dependency upgrades and anything outside the repository. Each needs explicit approval.
7. Decide: approve, revise (with the specific changes) or reject (the plan solves the wrong problem or rests on a false claim).
</task>

<constraints>
- Judge the plan against the request, not against how you would have built it. Do not demand changes that are matters of taste.
- Mark which claims you verified in the code and which you could not check.
- Keep the reply to the agent short and actionable; it will be pasted into the session.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Approve, revise or reject, with the main reason in one sentence.
## Claims checked
Table: claim, status (true, false, not found, unverified), evidence.
## Issues
Numbered, most important first: scope, order, verification or risk, with the fix.
## Reply to the agent
A fenced block to paste back into the session.
</output_format>
