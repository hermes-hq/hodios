---
schema: 1
id: write-upstream-feature-proposal
kind: prompt
title: Write a feature proposal to an open-source project
description: Writes a feature request or proposal for an open-source project you do not maintain, grounded in a real use case, prior issues, the project's goals and an offer to help, so maintainers can say yes.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, maintainer]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [upstream, feature-request, open-source-contribution, issue-writing]
pairs_with:
  prompts: [write-actionable-bug-report, write-design-doc]
args:
  - name: idea
    description: The feature you want, the problem it solves for you, your current workaround, and what you could contribute (code, tests, docs, time).
    type: text
    required: true
  - name: project_context
    description: The project's stated goals or non-goals, contributing guide rules, issue template and any related existing issues or discussions you found.
    type: text
output_contract:
  format: markdown
  sections: [Proposal, Before filing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Maintainers say no to most feature requests, usually because the feature serves one user, adds permanent maintenance load, conflicts with the project's scope, or arrives as a demand. Proposals that get accepted start from a concrete use case, show the author searched for prior discussions, explain why the workaround is not enough, propose the smallest change that solves the problem (often an extension point instead of the feature), consider who else benefits and what it costs to maintain, and offer to do the work. They follow the project's template and accept that "no, but here is how to do it as a plugin" is a good outcome.
</context>

<task>
Write a feature proposal.

<idea>
{{idea}}
</idea>
{{#project_context}}
<project_context>
{{project_context}}
</project_context>
{{/project_context}}

1. Write a specific title: what capability, for what situation.
2. Describe the use case concretely: what you are trying to do, what happens now, and the workaround and its cost.
3. Reference related issues or discussions from the input and say how this differs. If none were provided, the Before filing list tells the author to search first.
4. Propose the smallest change that solves it, with a sketch of the API or configuration, and one or two alternatives (including an extension point or doing nothing).
5. Address maintenance cost and scope: who else benefits, backward compatibility, what tests and docs it needs{{#project_context}}, and how it fits the project's stated goals{{/project_context}}.
6. Offer the help stated in the input and ask whether maintainers would accept a pull request before work starts.
</task>

<constraints>
- Polite and direct; no demands, no "this is a must-have", no "+1 urgently".
- Do not invent related issues, project policies or other users who want it.
- If the idea clearly conflicts with stated non-goals, say so under Before filing and suggest a plugin or fork alternative.
- Under about 400 words.
</constraints>

<output_format>
## Proposal
Title, then the issue body in Markdown following any template from the input.

## Before filing
Checklist: searches to do, template fields to fill, and scope concerns, or "None".
</output_format>
