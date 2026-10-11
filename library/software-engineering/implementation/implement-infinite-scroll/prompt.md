---
schema: 1
id: implement-infinite-scroll
kind: prompt
title: Implement an infinite-scroll feed
description: Implements an infinite-scroll feed with cursor pagination, an intersection observer trigger, virtualisation for long lists, scroll restoration, deduplication and error retry.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, mobile-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [infinite-scroll, cursor-pagination, virtualization, intersection-observer, feeds]
pairs_with:
  prompts: [implement-pagination, make-infinite-scroll-accessible, speed-up-long-list-rendering]
args:
  - name: feed_spec
    description: The feed and its data source, for example "activity feed in a React app, newest first, new items arrive while reading, API currently uses page numbers".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data contract, Loading behaviour, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer building an infinite-scroll feed. The basic version loads more on scroll; the real version does not duplicate, skip, freeze or lose the user's place:
- Use cursor pagination, not offset. With offsets, items inserted at the top shift every page, so users see duplicates or miss items. The cursor encodes the sort key and id of the last item.
- Trigger loading with an IntersectionObserver on a sentinel near the end (a `rootMargin` so it loads before the user hits the bottom), not scroll event maths. Guard against parallel requests for the same page, and stop when the server says there is no next cursor.
- Deduplicate by id when merging pages.
- Long feeds need virtualisation (TanStack Virtual, react-window, FlashList on mobile, or the platform list) with measured, variable heights; thousands of DOM nodes make scrolling and memory suffer. Consider a cap on pages kept in memory.
- Back navigation: returning from a detail page should restore the loaded pages and the scroll position. Cache pages (for example with `useInfiniteQuery`) and restore the offset or anchor item.
- New items while reading: show an "N new items" control instead of inserting above the viewport and pushing content down.
- Errors: show an inline retry at the end of the list; do not loop retries silently.
- Keep the footer reachable and give keyboard and screen-reader users a "Load more" fallback; for public pages, keep crawlable paginated URLs.
</context>

<task>
Build this feed:
{{feed_spec}}

1. Read the list component, the API and its pagination, the data fetching library and the routing. Follow existing patterns.
2. Write the data contract: cursor format, sort key with a unique tie-breaker, page size, and the next-cursor signal. Change the API to cursors if it uses offsets, keeping the old parameters working.
3. Write the loading behaviour: trigger, in-flight guard, end state, error retry, new-item handling and scroll restoration.
4. Implement the API change if needed, the infinite query with deduplication, the sentinel or load-more trigger, virtualisation if the feed can grow long, and restoration on back navigation.
5. Write tests: pages load in order with no duplicates when new items are inserted, no double request on fast scroll, end of feed, error then retry, position restored after back navigation.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Do not use offset pagination for a feed where items are inserted at the top.
- Do not remove the ability to reach the page footer.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data contract
Cursor format, sort key, page size and end signal.
## Loading behaviour
Trigger, guards, errors, new items and restoration, one line each.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
</output_format>
