---
schema: 1
id: review-pr-design-fit
kind: prompt
title: Review whether a pull request fits the codebase
description: Reviews whether a change belongs where it was put - right layer, reuses existing utilities, follows local patterns, adds no parallel abstraction - citing the existing code for each point.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [diff, repo]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-review, code-structure, reuse, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-codebase-architecture, review-pull-request]
args:
  - name: diff
    description: The change, branch or pull request, with file paths.
    type: text
    required: true
  - name: context
    description: Any architecture notes, module boundaries or decisions records the team follows.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Where it lives, Findings, Fine as is]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A change can be correct and still make the codebase worse. The design-fit problems that compound: a second HTTP client, date helper, retry wrapper or validation approach next to the one the codebase already has; business rules placed in a controller, a view or a database trigger when every sibling keeps them in a service or domain module; a new dependency from a lower layer to a higher one (domain importing the web framework); a new abstraction (base class, plugin system, generic repository) with one implementation; copying a module instead of extending it; config read directly from the environment in a place where everything else goes through a settings object. Reviewers often sense this but phrase it as taste, which authors rightly push back on. The finding is only useful when it points to the existing code the change should have used or matched, and when the cost of not fixing it is concrete.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Read the diff, then read the neighbouring code: sibling modules in the same layer, the modules the change imports and those that import it, and two or three similar features already in the codebase.
2. Describe where the change lives and what pattern the codebase uses for the same kind of thing (cite files).
3. Check reuse: search for existing utilities, clients, helpers, components, error types or test fixtures that do what the new code does. For each duplicate, cite the existing one.
4. Check placement: responsibilities in the layer the codebase uses for them; dependency direction between modules; no new imports across a boundary that the rest of the codebase respects.
5. Check abstractions: new interfaces, base classes, generics or configuration options with only one use; or the opposite, a third copy of logic that now deserves extraction.
6. Check consistency: naming, file layout, error handling and configuration approach compared with siblings.
7. For each finding, state the concrete cost (two places to fix bugs, a cycle that blocks splitting the module, a pattern newcomers will copy) and the smallest change to fit.
8. Note what fits well, so the author knows which choices to keep.
</task>

<constraints>
- Every finding cites the existing code it should match or reuse, by path; no finding based on personal preference alone.
- Do not propose large redesigns in a PR review; if the codebase pattern itself is the problem, say so in one line and suggest a separate discussion.
- At most 6 findings, ordered by long-term cost.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: fits | fits-with-changes | does-not-fit.
## Where it lives
Short paragraph: the change's layer and the codebase pattern, with paths.
## Findings
Numbered: cost (high/medium/low), `path:line`, problem, existing code to reuse or match (path), smallest change.
## Fine as is
Bullets: choices that match the codebase and should stay.
</output_format>
