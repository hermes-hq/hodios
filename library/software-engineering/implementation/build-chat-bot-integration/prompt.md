---
schema: 1
id: build-chat-bot-integration
kind: prompt
title: Build a chat bot for Slack, Discord or Teams
description: Builds a Slack, Discord or Microsoft Teams bot with commands, events, request verification, minimal scopes, quick acknowledgements and a deployment plan. Use to automate work inside team chat.
category: implementation
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [spec, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [chatbot, slack-bot, discord-bot, teams-bot, slash-commands, chatops]
pairs_with:
  prompts: [build-webhook-handler, integrate-third-party-api, implement-background-job]
  personas: [backend-engineer]
args:
  - name: platform
    description: The chat platform, for example Slack, Discord or Microsoft Teams, and whether it is for one workspace or server or for distribution to many.
    type: string
    required: true
  - name: features
    description: What the bot should do, its commands and the events it reacts to, the data or services it talks to, preferred language, and where it can be hosted.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Platform setup, Scopes and permissions, Code, Deploy, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer who has built and run chat bots for teams. Each platform has rules that decide whether a bot feels reliable:
- Slack: use the Bolt framework. Events arrive over HTTP (Events API) or Socket Mode (no public URL, good for internal bots). Slash commands, shortcuts and interactions must be acknowledged within 3 seconds, so slow work runs after `ack()`. Verify requests with the signing secret and reject old timestamps. Slack retries events it thinks failed (`X-Slack-Retry-Num`), so handlers must be idempotent. Ask for the fewest bot token scopes.
- Discord: use a maintained library (discord.js, discord.py or similar). A bot that listens to messages needs a persistent Gateway connection, so it cannot run on request-only serverless hosting; a bot that only uses application (slash) commands can instead receive interactions at an HTTP endpoint, which must verify the Ed25519 signature. Interactions must be answered or deferred within 3 seconds. Reading message content requires the privileged Message Content intent, which needs approval once a bot is in many servers.
- Microsoft Teams: bots are registered through Azure Bot Service and an app manifest, use the Teams or Bot Framework SDK, and render rich messages with Adaptive Cards. Tenant admins often must approve custom apps.

On every platform: tokens and secrets come from environment variables or a secret store; rate limits return 429 with a retry delay; logs avoid storing message content unless needed; and a bot only sees channels it was added to.
</context>

<task>
Build a {{platform}} bot.

Features:
{{features}}

1. If the hosting, the language or the access the bot needs (which channels, which data) is unclear and it changes the design, ask up to three questions and stop.
2. Design it: the commands and events, which parts are synchronous replies and which run as background work, where state lives, and the transport (HTTP endpoint, Socket Mode, Gateway).
3. Give the setup steps in the platform's developer console: creating the app, the settings to turn on, where each secret comes from, and how to install it to a test workspace or server.
4. List the scopes, intents or permissions, each with the feature that needs it. Ask for nothing extra.
5. Write the code: project layout, configuration from environment variables, request verification, each command and event handler with a fast acknowledgement, idempotency for retried events, error replies the user can understand, and rate-limit handling.
6. Explain deployment for the hosting given, including whether it needs a long-running process.
7. Give a test plan, including automated tests for handlers and a manual run-through.
</task>

<constraints>
- Never hard-code tokens or secrets, even in examples; use placeholders read from the environment.
- Do not request administrator permissions or broad read scopes when narrower ones work.
- Use only APIs and settings you are confident exist on the platform; mark anything you are unsure of and say where in the platform docs to confirm it.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Design
Commands and events as a table: Trigger | What the bot does | Sync or background.
## Platform setup
Numbered steps.
## Scopes and permissions
Table: Scope or permission | Needed for.
## Code
One code block per file, with its path as a heading, plus an `.env.example`.
## Deploy
Numbered steps for the chosen hosting.
## Test
Automated tests and a manual checklist.
</output_format>
