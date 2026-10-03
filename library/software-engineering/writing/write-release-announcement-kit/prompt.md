---
schema: 1
id: write-release-announcement-kit
kind: prompt
title: Write a release announcement kit
description: Turns an open-source release's changes into a GitHub release body, a blog piece, social posts and an upgrade note, led by the change users care about and crediting contributors.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer, developer-advocate, software-engineer]
requires: [none]
inputs: [text, diff]
output: [post, docs, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, release-announcement, github-releases, contributor-credit, upgrade-guide]
pairs_with:
  prompts: [write-release-notes, write-changelog, write-launch-social-posts]
  personas: [developer-advocate]
args:
  - name: changes
    description: The changelog, merged PR titles or commit list for this release, with contributor handles where known.
    type: text
    required: true
  - name: release
    description: Project name, version, release date and download or install command.
    type: string
    required: true
  - name: breaking_changes
    description: Anything that requires users to change code, config or data, with the migration steps.
    type: text
output_contract:
  format: markdown
  sections: [Headline, GitHub release, Blog or newsletter piece, Social posts, Upgrade note, Credits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For an open-source project, every release is a reason for past users to come back and for watchers to tell others. GitHub notifies people who watch releases, feeds and package managers surface new versions, and newsletters and aggregators pick up releases that state clearly what changed and why it matters. Most release notes waste this: they list commit titles, bury the one change people wanted, and forget the contributors who did the work. A good announcement leads with the user-visible outcome, is honest about breaking changes, and thanks contributors by name, which also encourages the next contribution. Keep a Changelog's convention groups changes as Added, Changed, Deprecated, Removed, Fixed and Security.
</context>

<task>
Release: {{release}}
<changes>
{{changes}}
</changes>
{{#breaking_changes}}
Breaking changes:
{{breaking_changes}}
{{/breaking_changes}}

If the changes are only internal (refactors, CI, dependency bumps) say that this is a maintenance release, write a short, honest GitHub release body, and skip the blog and social pieces.

1. **Headline.** Pick the single change most users will care about and write one sentence on what they can now do. Name two runner-up changes.
2. **GitHub release body.** The headline paragraph, then sections in the Keep a Changelog order (only those that apply), each item rewritten as a user-visible outcome with the PR or issue reference, then install or upgrade commands, then credits.
3. **Blog or newsletter piece** (250 to 450 words): the headline change with a short example or screenshot suggestion, the two runner-ups, breaking changes and how to upgrade, what is coming next only if the input says so, and how to give feedback.
4. **Social posts:** one short post for X or Bluesky and one for Mastodon (with CamelCase hashtags), each with the headline and the link.
5. **Upgrade note.** For breaking changes, numbered steps with before and after snippets taken from the input. If there are none, say "No breaking changes" explicitly.
6. **Credits.** Thank every contributor handle in the input, first-time contributors called out as such.
</task>

<constraints>
- Never invent features, fixes, numbers or contributor names. If a change is unclear, list it under "Needs a human description".
- Never hide or soften a breaking change; it goes near the top with migration steps.
- Use plain words; no "exciting", "game-changing" or "massive".
</constraints>

<output_format>
## Headline
## GitHub release
## Blog or newsletter piece
## Social posts
## Upgrade note
## Credits
</output_format>
