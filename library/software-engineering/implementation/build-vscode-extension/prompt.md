---
schema: 1
id: build-vscode-extension
kind: prompt
title: Build a VS Code extension
description: Builds a VS Code extension with commands, contributed settings, lazy activation, proper disposal, a secure webview or language feature, tests and a packaged VSIX.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, developer-advocate, maintainer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests, config]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [vscode, editor-extension, webview, extension-api, developer-tools]
args:
  - name: extension
    description: What the extension does and how users trigger it, for example "command that converts selected JSON to a TypeScript type", "sidebar that lists TODOs in the workspace".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Changes, Manifest, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
VS Code extensions share one extension host, so a careless one slows everyone's editor. Common mistakes: activating on `*` or `onStartupFinished` when the feature is only needed on a command or a file type (recent VS Code versions infer activation from contributed commands, so explicit `onCommand` entries are often unnecessary); event listeners and providers never pushed to `context.subscriptions`, leaking after deactivation; webviews without a Content Security Policy, loading scripts from anywhere and trusting every message they post back; blocking the host with synchronous file reads over the whole workspace; ignoring untrusted workspaces and virtual file systems; and hard-coded settings instead of contributed configuration.
</context>

<task>
Build this VS Code extension:

{{extension}}

1. Read the repo if one exists (`package.json` manifest, `src/extension.ts`, bundler, tests). For a new project, scaffold with the official generator (`yo code`) layout: TypeScript, esbuild or webpack bundling, `@vscode/test-cli` tests. Set `engines.vscode` to the lowest version whose APIs you use.
2. Design the contribution points: commands with titles and categories, menus and keybindings only where natural, `configuration` for settings with types, defaults and descriptions, views or view containers if there is a sidebar. Choose the narrowest activation events.
3. Implement `activate` to register everything and push each disposable onto `context.subscriptions`; keep `deactivate` for cleanup that needs it. Read settings with `workspace.getConfiguration` and react to `onDidChangeConfiguration`.
4. Use the workspace APIs (`workspace.fs`, `findFiles` with excludes and limits) asynchronously; respect `files.exclude` and large workspaces; work with `Uri`s, not string paths, so remote and virtual workspaces work.
5. For a webview: set `enableScripts` only if needed, `localResourceRoots` to the extension's media folder, a strict CSP with a nonce, `asWebviewUri` for assets, and validate every message from the webview before acting on it. Prefer a native tree view or quick pick when they fit.
6. For language features, register providers for the right `DocumentSelector`, and handle cancellation tokens.
7. Declare `capabilities.untrustedWorkspaces` and `virtualWorkspaces` honestly, and gate risky behaviour (running workspace code) behind workspace trust.
8. Write integration tests that run in the extension host for each command and setting, run them, then package with `vsce package` and report the VSIX size and contents check. Do not publish.
</task>

<constraints>
- Do not publish to the Marketplace or Open VSX without the user's confirmation.
- Do not execute code from the workspace or run shell commands from the extension unless that is the stated purpose, and then only in trusted workspaces.
- Do not send telemetry unless the user asks; if added, respect `vscode.env.isTelemetryEnabled`.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Features, contribution points, activation events and why.

## Changes
One line per file: `path`, what changed.

## Manifest
The relevant `package.json` parts in a code block.

## Tests
One line per test.

## Verification
Commands run and their real results, including packaging.
</output_format>
