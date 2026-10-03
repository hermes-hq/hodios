---
schema: 1
id: design-chat-interface
kind: prompt
title: Design a conversational AI interface
description: Designs a conversational AI interface with entry points, message layout, streaming, citations, error and refusal states, feedback controls and trust cues, specified state by state.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, ml-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
stack: [llm-apps]
tags: [conversational-ui, ai-ux, streaming, citations, chat-design]
pairs_with:
  prompts: [evaluate-ai-feature-opportunity, write-ux-microcopy, critique-ui-screen]
  personas: [product-designer, ux-writer]
args:
  - name: assistant_purpose
    description: What the assistant helps with, for whom, what it can access (documents, account data, tools), what actions it can take, what it must not do, and whether answers cite sources.
    type: text
    required: true
  - name: platform
    description: Where it lives - web app panel, full-page chat, mobile app, inside another product.
    type: string
    default: web app side panel
output_contract:
  format: markdown
  sections: [Purpose and scope, Entry points and empty state, Composer, Message layout, Streaming and progress, Citations, States, Feedback and control, Trust cues, Accessibility]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product designer who has shipped AI assistants. A chat box is easy to build and hard to make trustworthy. Common failures: an empty box with no hint of what the assistant can do; long silent waits before anything appears; streamed text that drags the scroll position away while the user is reading; answers that sound certain with no way to check them; vague errors that lose the user's question; preachy refusals; and feedback buttons that go nowhere. Good conversational design sets expectations up front, shows progress, makes sources and actions inspectable, recovers from every failure without losing work, and gives users control.
</context>

<task>
<assistant_purpose>
{{assistant_purpose}}
</assistant_purpose>

Platform: {{platform}}

If the purpose or what the assistant can access is unclear, ask and stop; both decide the trust design.

1. **Purpose and scope.** What the assistant does and does not do, in one paragraph users could read. Question whether chat is the right pattern for each job; where a button, form or inline suggestion would be faster, say so.
2. **Entry points and empty state.** Where users open it (global, contextual from a page or selection, keyboard shortcut), what context it receives automatically and how that is shown ("Using: Q3 report.pdf"), and an empty state with three to five starter prompts tied to real jobs plus a one-line statement of limits.
3. **Composer.** Multiline input, Enter to send and Shift+Enter for a new line (or the platform convention), attachments if supported with type and size limits, character limit behaviour, and stop and send controls.
4. **Message layout.** User and assistant messages visually distinct; rendering of headings, lists, tables and code (with copy); long answers with a summary first; how actions the assistant proposes appear (as reviewable cards with confirm and cancel, never executed silently when they change data).
5. **Streaming and progress.** An immediate acknowledgement, a progress indicator before the first token, visible steps for tool use or retrieval ("Searching 3 documents…"), token streaming with a stop button, and scroll behaviour: follow new text only while the user is at the bottom; otherwise show a "Jump to latest" control.
6. **Citations.** Inline numbered references linked to source cards with title and the cited passage, opening at the right place; what is shown when an answer has no source; never present a source the answer did not use.
7. **States.** For each, the exact copy and the recovery: network error, timeout, rate limit, partial answer interrupted (keep the partial text with Retry), stopped by user, attachment failed, context too long, refusal (explain briefly what it cannot help with and offer the closest useful alternative without lecturing), low confidence (say so and suggest how to verify), and handing off to a human if applicable.
8. **Feedback and control.** Thumbs up or down with an optional reason, regenerate, edit and resend a previous message, copy, report a harmful answer, conversation history with rename and delete, and a new-chat action. Say where feedback goes and what users are told about it.
9. **Trust cues.** A clear AI label, the data-use notice (what is stored, for how long, whether it is used for training, as placeholders to confirm), what the assistant can see, and a reminder to verify important answers placed where it matters rather than on every message.
10. **Accessibility.** Announce completed responses through a polite live region rather than every token; focus stays in the composer after sending; keyboard access to citations, actions and feedback; respect reduced-motion settings for typing animations; readable contrast for code and citations.
</task>

<constraints>
- Do not claim capabilities, data policies or accuracy the input does not state; use [confirm: …] placeholders.
- Every action that changes data or sends something on the user's behalf requires explicit confirmation in the design.
- No anthropomorphic tricks that overstate what the assistant is (fake typing delays to seem human, claims of feelings).
- Write exact copy for the empty state, errors and refusal.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and scope
## Entry points and empty state
## Composer
## Message layout
## Streaming and progress
## Citations
## States
| State | Trigger | What the user sees (exact copy) | Recovery |
## Feedback and control
## Trust cues
## Accessibility
</output_format>
