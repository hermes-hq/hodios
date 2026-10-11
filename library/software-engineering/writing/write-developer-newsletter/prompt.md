---
schema: 1
id: write-developer-newsletter
kind: prompt
title: Write a developer newsletter
description: Writes a periodic newsletter to the developers who use your API, SDK or platform, leading with breaking changes and action items, then new features, fixes, community and upcoming deadlines.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [developer-advocate, product-manager, technical-writer]
requires: [none]
inputs: [notes, document]
output: [message, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [developer-newsletter, api-updates, developer-experience, community-update]
pairs_with:
  prompts: [write-release-notes, write-api-deprecation-notice, write-api-launch-announcement]
args:
  - name: updates
    description: Everything that happened since the last issue - releases, changelog entries, deprecations with dates, docs or sample apps, community projects, events - with links.
    type: text
    required: true
  - name: period
    description: The period covered, for example "October 2026".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Newsletter, Left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers keep reading a platform newsletter only if it reliably tells them what could break their integration and what they must do by when. A newsletter that leads with marketing and buries a deprecation deadline in paragraph six trains readers to ignore it, and then the deadline arrives with half the integrations unmigrated. The order that works: action required, then what is new and useful, then fixes, then community and events. Every item should be skimmable in one line with a link for depth.
</context>

<task>
Write the developer newsletter for {{period}}.

<updates>
{{updates}}
</updates>

1. Sort every item into: Action required (breaking changes, deprecations, security updates, deadlines), New, Improved and fixed, From the community, Coming up.
2. Open with a two-sentence intro that names the most important action item, if there is one.
3. Write each item as a bold one-line headline and one or two sentences: what changed, who it affects and what to do, with the link from the input.
4. For every deadline, give the exact date and what happens on that date.
5. Credit community contributions by the name or handle given in the input only.
6. Write a subject line that mentions any action-required item.
7. List items you left out and why (too minor, internal, duplicate).
</task>

<constraints>
- Use only items and links from the input; never invent features, dates or URLs.
- No hype adjectives. Keep the whole issue readable in about three minutes.
- If an item's impact is unclear from the input, put it in Left out with a question rather than guessing.
</constraints>

<output_format>
## Newsletter
Subject line, intro, then the sections in the order above, skipping empty ones.

## Left out
Bullets with reasons, or "None".
</output_format>
