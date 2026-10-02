---
schema: 1
id: run-heuristic-evaluation
kind: prompt
title: Run a heuristic evaluation
description: Evaluates a flow step by step against Nielsen's ten usability heuristics and returns located issues with severity ratings and concrete fixes. Use for a fast expert review before or between user tests.
category: ux-research
version: 1.0.0
status: incubating
stage: [review]
role: [designer, ux-researcher, product-manager]
requires: [none]
inputs: [image, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [heuristic-evaluation, nielsen-heuristics, expert-review, severity-rating]
pairs_with:
  prompts: [write-usability-test-plan, critique-ui-screen]
  personas: [ux-researcher, product-designer]
args:
  - name: flow
    description: The flow to evaluate, as screenshots in order or a step-by-step description of each screen, its content and what happens on each action. State the user's goal if you know it.
    type: text
    required: true
  - name: platform
    description: Platform and context, e.g. "iOS app", "desktop web, enterprise admins". Optional; it decides which platform conventions apply.
    type: string
output_contract:
  format: markdown
  sections: [Scope, Findings, Coverage, Top fixes, Limitations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A heuristic evaluation is an expert walking through an interface with a goal in mind and naming where it breaks recognised usability principles. Done badly it becomes a checklist exercise: one vague comment forced under each heuristic, no location, no severity, no fix. Done well it is a ranked list of specific problems, each tied to a step in the flow and a principle, that a designer can act on the same day.
</context>

<task>
Evaluate this flow{{#platform}} on {{platform}}{{/platform}}:

<flow>
{{flow}}
</flow>

Nielsen's ten heuristics:
H1 Visibility of system status. H2 Match between the system and the real world. H3 User control and freedom. H4 Consistency and standards. H5 Error prevention. H6 Recognition rather than recall. H7 Flexibility and efficiency of use. H8 Aesthetic and minimalist design. H9 Help users recognise, diagnose and recover from errors. H10 Help and documentation.

1. State the user's goal and the steps you will walk. If the goal is not given, infer it and say so.
2. Walk the flow one step at a time as that user. At each step ask: do I know where I am and what just happened, what I can do next, how to undo it, and what the words mean?
3. Record each problem with its location (step and element), the heuristic or heuristics it violates, what goes wrong for the user, and a concrete fix.
4. Rate severity on Nielsen's 0 to 4 scale: 0 not a problem, 1 cosmetic, 2 minor, 3 major (important to fix), 4 catastrophe (must fix before release). Weigh how often it occurs, how much it hurts when it does, and whether users can get past it once they know.
5. Apply the platform's conventions under H4 (Apple Human Interface Guidelines for iOS and macOS, Material Design for Android, common web patterns) when the platform is known.
6. Note states the input does not show (errors, empty, loading, slow network) as gaps to check, not as found problems.
7. If the input is too sparse to evaluate (a single screen name, no description of content or actions), ask for screenshots or a fuller description and stop.
</task>

<constraints>
- Report only real problems. Do not force a finding under every heuristic; an empty heuristic is fine.
- One finding per problem. If one problem violates two heuristics, list both on one row.
- Describe what you can see or what the description states. Mark anything inferred from a description rather than seen as "inferred".
- Accessibility problems you notice can be reported, but say that a heuristic evaluation is not an accessibility audit.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
Goal, platform, steps walked, assumptions.
## Findings
| # | Step / element | Heuristic(s) | Problem for the user | Severity (0-4) | Fix |
Sorted by severity, highest first.
## Coverage
Count of findings per heuristic, and states not shown that still need checking.
## Top fixes
The 3 changes that would remove the most severe problems, in order.
## Limitations
One evaluator finds only part of the problems (a third is typical); recommend 3 to 5 evaluators and a usability test to confirm severity.
</output_format>
