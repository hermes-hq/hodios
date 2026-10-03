---
schema: 1
id: map-ai-use-cases
kind: prompt
title: Map where AI helps in your work
description: Maps a person's recurring work tasks to where an AI assistant helps, what to keep human, the prompt or setup for each and a check step, ranked by the time it could save.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, manager, consultant, operations-manager]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ai-adoption, workflow-automation, time-savings, human-in-the-loop, data-privacy]
pairs_with:
  prompts: [write-custom-instructions, build-project-instructions, write-task-prompt]
args:
  - name: role_and_tasks
    description: Your role and the tasks that fill your week, with roughly how often and how long each takes, for example "client status emails, 10 a week, 15 minutes each".
    type: text
    required: true
  - name: tools_available
    description: "Optional: the AI tools and other software you can use at work, for example \"company-approved chat assistant, Google Workspace, no API access\"."
    type: string
  - name: data_constraints
    description: "Optional: what data you must not paste into AI tools (client data, health records, unreleased financials) and any company AI policy."
    type: text
output_contract:
  format: markdown
  sections: [Ranked map, Keep human, Starter setups, Data cautions, Two-week pilot]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People who try an AI assistant on a few random tasks often conclude it is either magic or useless. The useful question is narrower: which of my recurring tasks have a shape AI handles well (drafting from known material, summarising, reformatting, first-pass analysis, brainstorming, explaining, checking against a list) and which depend on judgement, relationships, accountability or facts the assistant cannot verify. The biggest wins are usually frequent, text-heavy tasks with a quick way to check the output. Every use needs a check step, because fluent output can be wrong, and some data must never go into a tool that is not approved for it.
</context>

<task>
Map where an AI assistant can help in my work.

<role_and_tasks>
{{role_and_tasks}}
</role_and_tasks>
{{#tools_available}}Tools I can use: {{tools_available}}{{/tools_available}}
{{#data_constraints}}
<data_constraints>
{{data_constraints}}
</data_constraints>
{{/data_constraints}}

1. If fewer than three recurring tasks are described, ask me to list my typical week (tasks, how often, how long) and stop.
2. For each task, judge the AI fit (high, medium, low) by: how much is drafting, transforming or summarising; how checkable the output is; how much depends on judgement, relationships or facts only I have; and the cost of an error.
3. For high and medium fits, say what the AI does, what stays with me, the setup (a reusable prompt, custom instructions, a template, a project with reference files), and the check step.
4. Estimate time saved per week from my own frequency and duration numbers, as a range, showing the arithmetic. If I gave no numbers for a task, say "not estimated" rather than guessing.
5. Rank by estimated time saved, adjusted down for error cost.
6. Write starter prompts for the top three, and a two-week pilot to test them.
</task>

<constraints>
- Respect the data constraints strictly: if a task needs restricted data, either propose a way to do it without that data (anonymised, structure-only, synthetic sample) or mark it "not with current tools" and say why.
- Recommend only the tools listed; if none are listed, describe capabilities ("a chat assistant with file upload") rather than naming products.
- Keep human anything involving final decisions about people (hiring, performance, discipline), legal or medical judgements, commitments made in my name, and relationship-critical messages; AI can help prepare, not decide or send.
- Be honest about low fits; do not stretch AI into every task.
- Time estimates are estimates; label them as such and do not present them as measured.
- Starter prompts must be complete and ready to paste, with placeholders in square brackets for my inputs.
</constraints>

<output_format>
## Ranked map
A table: Rank | Task | Fit | AI does | I do | Setup | Check step | Time saved per week (estimate).
## Keep human
Tasks with a low fit, each with a one-line reason.
## Starter setups
For each of the top three: a heading and the prompt in a fenced block.
## Data cautions
Bullets: what not to paste, and the workaround for each affected task.
## Two-week pilot
A short plan: which tasks, how to track time before and after, what quality checks to log, and how to decide whether to keep each one.
</output_format>
