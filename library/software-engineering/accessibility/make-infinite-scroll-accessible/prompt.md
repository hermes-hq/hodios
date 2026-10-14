---
schema: 1
id: make-infinite-scroll-accessible
kind: prompt
title: Make infinite scroll and load-more feeds accessible
description: Fixes infinite scroll and load-more feeds so keyboard users can reach the footer, new items are announced, position is kept and screen readers know the feed structure.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [infinite-scroll, load-more, feed-pattern, virtualization, keyboard]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [manage-focus-after-ui-updates, add-live-region-announcements, make-search-and-filters-accessible, fix-keyboard-navigation]
args:
  - name: feed
    description: The feed or list code or file paths, how more items load (scroll observer, load-more button, virtualised list library) and what is below the feed (footer links, newsletter form).
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Problems found, Recommended loading pattern, Changes, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pure infinite scroll makes the footer unreachable: every time a keyboard or switch user tabs near the end, more items load and push the footer away, and links to contact, terms or accessibility statements become impossible to reach. Screen-reader users get no signal that more content arrived, and virtualised lists unmount items as they scroll, so focus vanishes and "item 4 of 10" is wrong when the real total is 1,000. The most robust fix is a "Load more" button (focus stays on it or moves to the first new item, and a count is announced); automatic loading can stay for pointer users if the keyboard path does not trigger it, or with a "skip to footer" link and a pause. When a list is virtualised, items need `aria-setsize` and `aria-posinset` (or the total stated in the heading), and the focused item must not be unmounted. The ARIA `feed` role exists for article streams, with `aria-busy` while loading and Page Down and Page Up to move between articles, but its support varies, so a well-structured list with headings plus a load button is often the safer choice. Returning from a detail page should restore the scroll position and the loaded items.
</context>

<task>
Make this {{framework}} feed accessible.

<feed>
{{feed}}
</feed>

1. Read the loading code and list the barriers for keyboard, screen-reader, switch and screen-magnifier users; mark inferences.
2. Recommend a loading pattern for this feed (load-more button, automatic loading with an escape route, or ARIA feed) and justify it in a few sentences.
3. Implement it with the smallest change: a real button for loading more; after loading, either keep focus on the button or move it to the first new item with `tabindex="-1"` (say which and why), and announce "20 more items loaded, 60 of 240" politely. Mark the list `aria-busy` while loading if it is a feed.
4. Keep the footer reachable: no automatic loading triggered by keyboard focus, or a visible skip link to the footer before the feed.
5. For virtualised lists: keep the focused item mounted, expose position and total with `aria-setsize` and `aria-posinset` or a heading with the count, and keep DOM order equal to visual order.
6. Preserve position: restore scroll and loaded pages when the user comes back from a detail view.
7. Write tests for loading with the keyboard, focus after loading and the announcement text; run them. Give a short manual check with a screen reader and with the keyboard only.
</task>

<constraints>
- Do not remove automatic loading for pointer users unless product agrees; offer the escape route first.
- Do not announce every single new item.
- Do not change the API or pagination backend; work with what it returns.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with who is blocked.

## Recommended loading pattern
Short paragraph.

## Changes
Diffs with file paths.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
