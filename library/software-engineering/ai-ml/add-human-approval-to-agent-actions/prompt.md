---
schema: 1
id: add-human-approval-to-agent-actions
kind: prompt
title: Add human approval to agent actions
description: Adds human-in-the-loop approval to an LLM agent's risky tool calls, with a risk policy per tool, action previews, durable pause and resume, timeouts and an audit log.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, ml-engineer, security-engineer, fullstack-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [human-in-the-loop, tool-approval, audit-log, agent-safety]
pairs_with:
  prompts: [implement-llm-tool-calling, design-agent-architecture, run-tool-using-agent-loop]
args:
  - name: agent
    description: What the agent does, its tools (names and what each one changes), the framework or loop code, and who should approve actions.
    type: text
    required: true
  - name: approval_channel
    description: Where approvals happen, for example in the chat UI, a Slack message or an internal admin page.
    type: string
output_contract:
  format: markdown
  sections: [Risk policy, Flow, Code, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An agent that can send emails, issue refunds, change records or run commands needs a gate between "the model wants to" and "it happened". Common mistakes: asking the model to request approval in its text, which a prompt injection or a confused model can skip; showing the approver a vague summary written by the model instead of the exact arguments that will run; holding the approval in memory so a restart loses it; letting an approval for one action be replayed for a modified one; no timeout, so pending actions pile up; and approving everything, which trains people to click yes. The gate must sit in code, around the tool executor, with a policy decided per tool and per argument, not per conversation.
</context>

<task>
Add approval gating to this agent: {{agent}}{{#approval_channel}} Approvals happen in: {{approval_channel}}.{{/approval_channel}}

1. Read the agent loop and every tool implementation. List each tool with what it reads or changes, whether the effect is reversible, and its blast radius.
2. Write a risk policy per tool: auto-run (read-only, reversible), needs approval (writes, sends, spends, deletes), or never allowed for the agent. Allow argument-based rules where useful, for example refunds under an amount auto-run, above it need approval.
3. Enforce in the executor: before running a gated tool, persist a pending action (id, conversation, tool, exact arguments, a hash of them, requester, created time, expiry), pause the agent run and return a pending state to the caller. The model cannot bypass this through its text output.
4. Preview: render the exact arguments as the approver will see them, with a human-readable diff or summary generated from the arguments by code, not by the model.
5. Approve, reject or edit: on approval, verify the argument hash matches, mark the action used so it cannot be replayed, execute and resume the agent with the real result. On rejection, resume the agent with a rejection result and the approver's reason so it can adapt. If edits are allowed, re-hash and record both versions.
6. Timeouts and authority: expire pending actions, define who may approve each tool, and stop self-approval when the requester and approver must differ.
7. Audit log: every proposed, approved, rejected, expired and executed action with actor and time.
8. Tests: gated tool never runs without approval; changed arguments invalidate an approval; replay rejected; restart in the middle of a pending action resumes correctly; rejection reaches the agent. Run them and report.
</task>

<constraints>
- The gate lives in code around tool execution. Never rely on the system prompt alone to make the agent ask.
- Do not mark a tool auto-run unless it is read-only or trivially reversible; when unsure, gate it and say why.
- Use the framework's own interrupt or human-in-the-loop mechanism if the project's agent framework has one, instead of building a second one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Risk policy
Table: tool | effect | reversible? | policy | argument rules | who approves.
## Flow
Numbered steps from tool request to execution, including restart and timeout.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
