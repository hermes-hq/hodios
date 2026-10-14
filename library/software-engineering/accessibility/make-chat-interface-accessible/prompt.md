---
schema: 1
id: make-chat-interface-accessible
kind: prompt
title: Make a chat or AI assistant interface accessible
description: Makes a chat or AI assistant UI usable with keyboard and screen readers, with a message log, sensible announcement of streamed replies, focus that stays put and labelled controls.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, ml-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [chat-ui, streaming, aria-live, screen-reader, ai-assistant]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [add-live-region-announcements, fix-keyboard-navigation, write-screen-reader-test-plan]
args:
  - name: chat_ui
    description: The chat components or file paths (message list, composer, message actions such as copy, retry, thumbs) and how replies arrive (streamed tokens, whole messages, typing indicator).
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Problems found, Structure and semantics, Announcing replies, Keyboard and focus, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Chat interfaces fail screen-reader users in three typical ways. First, a live region on the message list that receives streamed tokens either speaks every fragment ("The", "The quick", ...), or is interrupted so often that nothing useful is heard, or reads the whole conversation again. Second, focus is moved to each new message, which drags the user out of the composer mid-thought. Third, the conversation has no structure: no way to jump between messages, no indication of who said what, and icon-only actions repeated on every message with the same name ("Copy", "Copy", "Copy"). The approach that works: a `role="log"` container (polite by default) or a separate announcer, announcement of an assistant reply once when streaming completes (optionally a short "Assistant is responding" at start), each message as an `article` or list item with a visually hidden speaker label and a heading so users can jump with heading navigation, focus kept in the composer after sending, and message actions named with context. Markdown in replies must render to real headings, lists, tables and code blocks, not styled `div`s.
</context>

<task>
Make this {{framework}} chat interface accessible.

<chat_ui>
{{chat_ui}}
</chat_ui>

1. Read the message list, message, composer and streaming code. List what a keyboard and screen-reader user experiences today when sending a message and receiving a reply; mark inferences.
2. Structure: make the conversation a labelled region with `role="log"` or a list; give each message a speaker label (visible or visually hidden) and a heading or other navigable landmark; check rendered markdown produces semantic HTML; make code blocks focusable or scrollable regions with a name if they scroll.
3. Announcing replies: stop announcing token by token. Announce a short "responding" status when generation starts, then the complete reply (or a summary plus "reply ready" for very long replies) once when streaming ends, through a single polite region. Announce errors and "stopped" assertively only when the user must act.
4. Composer: a visible or programmatic label, Enter and Shift+Enter behaviour documented in the label or hint, the send button named and its disabled state exposed, and focus kept in the composer after sending.
5. Message actions: name them with context ("Copy reply 3"), make them reachable without hover, and confirm actions like copy with a short status message.
6. Stop and regenerate controls: reachable by keyboard while streaming, and focus is not lost when they appear or disappear.
7. Respect reduced motion for typing indicators and auto-scroll; do not force-scroll the user away from what they are reading.
8. Add tests for roles, names, focus after send and the final announcement; run them. Give a manual check for NVDA and VoiceOver.
</task>

<constraints>
- Do not put `aria-live` on an element that receives every streamed token.
- Do not move focus to new messages automatically.
- Do not change the chat's visual design beyond what the fixes need.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with who is affected.

## Structure and semantics
Diffs.

## Announcing replies
The announcement design in two or three sentences, then diffs.

## Keyboard and focus
Diffs and the expected Tab order.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
