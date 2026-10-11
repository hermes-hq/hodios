---
schema: 1
id: design-content-feed
kind: prompt
title: Design a content feed
description: Designs a scrolling feed of posts, products, articles or listings, with card anatomy, ordering cues, loading, pagination or infinite scroll, refresh, new-item handling and end states.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feeds, cards, infinite-scroll, pagination, loading-states]
pairs_with:
  prompts: [design-search-experience, design-empty-and-error-states, review-design-for-dark-patterns, spec-motion-and-microinteractions]
  personas: [product-designer]
args:
  - name: feed_context
    description: What the feed contains (posts, products, jobs, articles, listings), who browses it and why (catch up, discover, buy), how items are ordered, how often new items arrive, actions on each item, and current problems.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, ios, android, mobile-app]
    default: mobile-app
output_contract:
  format: markdown
  sections: [Feed purpose, Card anatomy, Ordering and cues, Loading and pagination, New content and refresh, States, Wellbeing and control, Accessibility, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Feed design is mostly about the job the person is doing. Catching up wants chronological order, a clear "you're caught up" point and a way back to where you left off; discovering wants variety and quick judgement from the card; shopping or job hunting wants comparison, filters and the ability to return to a position after opening an item. Common failures: infinite scroll where users need to reach a footer or compare items, new items inserted above what someone is reading so content jumps, cards that need opening to judge, no saved scroll position after going back, and ranking with no explanation or user control.
</context>

<task>
<feed_context>
{{feed_context}}
</feed_context>

Design for {{platform}}. If the feed's content and purpose are unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Feed purpose.** Name the user job (catch up, discover, compare and choose) and derive the ordering model and stopping point from it.
2. **Card anatomy.** Fields in priority order with what lets a user judge without opening, media sizes and cropping rules, actions on the card versus in detail, and variants (sponsored, unavailable, deleted, sensitive).
3. **Ordering and cues.** Chronological, ranked or mixed, with visible cues (timestamps, "because you follow", "sponsored") and user controls such as sort, "following only" or "not interested".
4. **Loading and pagination.** Choose infinite scroll, "load more" or pages and justify; skeleton cards, prefetch distance, scroll position restoration on back navigation, and footer reachability.
5. **New content and refresh.** Pull to refresh or auto; a "new posts" pill instead of inserting items above the reading position; how deleted or edited items update.
6. **States.** First-load, empty (new user, no follows, filtered to nothing), offline, error mid-scroll with retry in place, end of feed or "you're caught up".
7. **Wellbeing and control.** Avoid engagement traps: natural stopping points, no autoplay with sound by default, easy mute, hide and report.
8. **Accessibility.** Feed semantics so screen readers announce items and position, keyboard skip past the feed, alt text rules for media, reduced motion.
9. **Metrics.** Pick metrics that fit the job, such as items opened per session, return to position success, hide or report rate, and session satisfaction, not only time spent.
</task>

<constraints>
- Do not choose infinite scroll by default; justify the pagination model from the job.
- Never insert new items above the user's reading position without their action.
- Do not invent ranking algorithms or data; describe the cues and controls the UI needs.
- No engagement dark patterns such as removing stopping points or fake notification counts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Feed purpose
## Card anatomy
| Element | Priority | Rule |
## Ordering and cues
## Loading and pagination
## New content and refresh
## States
| State | What the user sees | Action |
## Wellbeing and control
## Accessibility
## Metrics
</output_format>
