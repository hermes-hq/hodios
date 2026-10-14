---
schema: 1
id: add-live-region-announcements
kind: prompt
title: Add live region announcements that actually speak
description: Adds reliable screen-reader announcements for toasts, status messages, loading states and result counts, using live regions that work across NVDA, JAWS, VoiceOver and TalkBack.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
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
tags: [aria-live, status-messages, screen-reader, toasts, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-spa-route-announcements, manage-focus-after-ui-updates, preview-screen-reader-announcements, write-screen-reader-test-plan]
args:
  - name: messages
    description: The status messages that need announcing and where they come from, for example "toast after save", "3 results found after filter", "Uploading..." with the relevant code or file paths.
    type: text
    required: true
  - name: framework
    description: The UI framework or plain DOM.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Message inventory, Announcer implementation, Changes at each call site, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WCAG 4.1.3 requires status messages to reach screen-reader users without moving focus. Live regions are the tool, and they fail silently in predictable ways. A region inserted into the DOM together with its text is often not announced: the container must exist, empty, before the text changes. `role="status"` (polite) suits confirmations, counts and progress; `role="alert"` (assertive) interrupts and should be kept for errors that need action now. Writing the same string twice is ignored by some screen readers, so repeated messages need clearing first or a changing suffix. Rapid updates (a counter while typing, a progress percentage) flood the queue and must be debounced or reduced to milestones. Regions inside a container with `aria-hidden`, `display: none` or a closed modal's inert background say nothing. Toasts that vanish after three seconds also fail people who need more time (2.2.1) unless the message is also available elsewhere. One app-level announcer, mounted once near the root, is more reliable than many regions scattered through components.
</context>

<task>
Make these status messages reach screen-reader users in this {{framework}} app.

<messages>
{{messages}}
</messages>

1. Search the codebase for existing live regions, `aria-live`, `role="status"`, `role="alert"` and toast or notification utilities. List them and note any that are created at the same moment as their text, nested in hidden containers, or duplicated.
2. Build the message inventory: each message, its trigger, its urgency (polite or assertive), and whether it can repeat or fire rapidly.
3. Implement or repair one announcer: a polite and an assertive region rendered once at app root, visually hidden with a standard clip pattern (not `display: none`), and a small API such as `announce(message, { politeness })` that clears and sets text after a short delay so repeats are spoken. Reuse an existing utility if the project has one.
4. Route each message through the announcer. Debounce counts that change while typing (announce after the user pauses), reduce progress to a few milestones, and keep `assertive` for errors.
5. For toasts, make sure the message text is announced, that toasts with actions do not disappear before a keyboard user can reach them, and that the timing can be extended or the content found elsewhere.
6. Write tests that trigger each message and assert the region's text content. Run them and report results.
7. Give a manual check list for at least NVDA with a browser and VoiceOver, since automated tests cannot prove the screen reader spoke.
</task>

<constraints>
- Do not move focus to announce a status message.
- Do not mark large containers (whole lists, chat logs, forms) as live; announce a short summary instead.
- Do not use `assertive` for routine confirmations.
- Keep messages short, specific and in the page language.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Message inventory
Table: message | trigger | politeness | repeat or rapid | current problem.

## Announcer implementation
Code with file path.

## Changes at each call site
Diffs.

## Tests and manual check
Test code, command result, then a short manual checklist per screen reader.
</output_format>
