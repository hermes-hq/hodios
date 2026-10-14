---
schema: 1
id: write-agent-ready-issue-templates
kind: prompt
title: Write agent-ready issue templates
description: Writes issue or ticket templates that capture what a coding agent needs by default, such as goal, files, acceptance checks, constraints and test commands, without burdening human reporters.
category: meta
version: 1.0.0
status: incubating
stage: [plan, build]
role: [tech-lead, engineering-manager, product-manager, software-engineer]
requires: [none]
inputs: [text, ticket]
output: [config, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [coding-agents, issue-templates, acceptance-criteria, ticket-quality]
pairs_with:
  prompts: [make-issue-agent-ready, write-subagent-brief, assess-task-for-agent-delegation]
args:
  - name: tracker
    description: Where the templates live (for example GitHub issue forms, GitLab description templates, a Jira issue type) and the issue types you need (bug, small feature, chore, dependency upgrade).
    type: text
    required: true
  - name: examples
    description: Two or three recent tickets an agent struggled with or did well on, and what was missing from the ones that failed.
    type: text
  - name: repo_facts
    description: The repository's test, lint and type-check commands and any areas agents must not touch.
    type: text
output_contract:
  format: markdown
  sections: [Field set, Templates, Labels and routing, Filled example]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A human reader fills gaps in a ticket from hallway knowledge; an agent fills them with guesses. Rewriting each ticket by hand before assigning it does not scale, so the template should ask for what agents need at the moment the ticket is written. The fields that matter most: the outcome in one sentence, how to reproduce (for bugs), where in the code it probably lives, acceptance checks that can be run (a test name, a command, an expected output), constraints and out-of-scope items, and when to stop and ask. The template fails if it is so long that reporters skip it or write "n/a" everywhere, so required fields must be few and everything else optional with an example in the placeholder. Labels such as "agent-ready" route only tickets that passed a quick readiness check.
</context>

<task>
Write templates for:
<tracker>
{{tracker}}
</tracker>
{{#examples}}
<examples>
{{examples}}
</examples>
{{/examples}}
{{#repo_facts}}
<repo_facts>
{{repo_facts}}
</repo_facts>
{{/repo_facts}}

1. Field set: decide the fields per issue type. Mark at most four as required. Base the choice on what was missing from the failed examples, if given.
2. Write each template in the tracker's native format (for GitHub issue forms, YAML with field types and validations; for others, markdown with headings and placeholder text). If you are unsure of a format detail, mark it "check against the tool's documentation".
3. Put a short example in every placeholder, written for this repository where repo facts are given (a real test command, a real path pattern).
4. Add an "Agent: stop and ask if" field with defaults such as schema changes, new dependencies or touching listed areas.
5. Labels and routing: a readiness label, the three checks a person does before applying it, and what happens to tickets that fail.
6. Fill one template with one of the examples, rewritten as it should have been.
</task>

<constraints>
- No more than four required fields per template.
- Do not invent repository commands or paths; use clearly marked placeholders where repo facts are missing.
- Keep the templates usable by humans who never use agents.
</constraints>

<output_format>
## Field set
Table: field, issue types, required or optional, why an agent needs it.
## Templates
One fenced block per template with its file path.
## Labels and routing
Bullets.
## Filled example
The example ticket written with the template.
</output_format>
