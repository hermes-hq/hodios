---
schema: 1
id: set-up-agent-ui-verification
kind: prompt
title: Set up UI self-checks for a coding agent
description: Lets a coding agent check its own UI changes in a real browser, with a dev server recipe, a test account, screenshots at set widths, console and network errors and a requirement check.
category: meta
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [docs, config, code]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, browser-automation, screenshots, ui-verification, frontend]
pairs_with:
  prompts: [write-agents-md, write-agent-environment-setup, build-page-from-mockup]
args:
  - name: browser_tool
    description: The browser automation the agent can use (a browser MCP server, a Playwright or similar script, the agent's built-in browser), or "none yet".
    type: string
    required: true
  - name: app_notes
    description: How the app is started, which port, how login works, and pages that need seeded data.
    type: text
output_contract:
  format: markdown
  sections: [Recipe, Check procedure, Files added, Trial run, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Without a way to see the page, an agent reports a UI change as done because it compiles. Type checks and unit tests do not catch a button hidden behind a header, a layout that breaks at phone width, a hydration error in the console or a failed API call that leaves a spinner forever. A self-check loop fixes most of that: start the app in a known way, sign in with a test account that holds no real data, open the changed page, wait for the page to settle, take screenshots at fixed widths, read console errors and failed network requests, and compare what is visible to the requirement. The recipe must be written down once, because agents improvise badly here (guessing ports, leaving servers running, logging in with real credentials).
</context>

<task>
Set up UI self-verification for this repository.
Browser tool: {{browser_tool}}
{{#app_notes}}
<app_notes>
{{app_notes}}
</app_notes>
{{/app_notes}}

1. Read the repository to find the dev server command, port, environment variables needed, and how authentication and seed data work. Note anything you could not find.
2. Recipe: how to start the app in the background, how to know it is ready, how to sign in with a test account (seeded, local only; never a real person's credentials), and how to stop it afterwards.
3. Check procedure: for a changed page, open it, wait for network idle or a specific element, take screenshots at phone, tablet and desktop widths, collect console errors and failed requests, check keyboard focus on the changed control, and compare against the requirement in a short written verdict.
4. If the browser tool is "none yet", add the smallest option that fits the repository's existing tooling and say what it needs; do not add a dependency without saying so.
5. Write the recipe and procedure into the agent instruction file or a short referenced doc, and add a helper script only if it saves real steps.
6. Trial run: run the procedure once on an existing page and report what it produced (screenshots taken, errors found), then stop the server.
</task>

<constraints>
- Use test accounts and local or seeded data only. Do not store passwords in committed files; reference environment variables.
- Do not point the checks at production.
- Always stop processes you started.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Recipe
Numbered steps with commands.
## Check procedure
Numbered steps the agent follows for every UI change.
## Files added
Paths and contents in fenced blocks.
## Trial run
What ran, the result, and any problems found.
## Limits
What the check does not catch (visual polish, cross-browser differences, real data volumes).
</output_format>
