---
schema: 1
id: write-open-source-announcement
kind: prompt
title: Announce an open-source project
description: Writes the announcement for a new open-source project or a major release, covering the problem it solves, a quick example, what is stable, how to contribute and where to talk.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [notes, text]
output: [article, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [open-source, project-announcement, developer-community, forum-post]
pairs_with:
  prompts: [write-release-announcement-kit, write-readme, write-contributing-guide]
args:
  - name: project
    description: What the project is and does, the problem behind it, how to install and use it (a real snippet if you have one), its license, what is stable or experimental, known limitations, the repository link and where the community talks.
    type: text
    required: true
  - name: audience
    description: Who should care, for example "backend developers running Postgres at scale" or "people who write Python CLIs".
    type: string
    required: true
  - name: channels
    description: Where it will be posted, for example "project blog, a developer forum launch post and a short social post". Leave empty for a blog post plus one short post.
    type: text
output_contract:
  format: markdown
  sections: [Announcement, Channel versions, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers decide in seconds whether a new project is worth their time. Announcements lose them by opening with the author's journey, by stacking adjectives ("blazing fast", "revolutionary") instead of showing code, by hiding what is unstable until someone hits it, by comparing unfairly with alternatives, and by giving no clear way to try it or help. Community forums punish marketing tone. A good announcement states the problem in the reader's words, shows a working example within the first screen, is honest about maturity and limits, and ends with concrete ways to try, contribute and talk.
</context>

<task>
Write the announcement for this project, aimed at {{audience}}.

<project>
{{project}}
</project>

Channels: {{channels}} (if empty, write a blog post and one short post).

1. Open with the problem as {{audience}} experiences it, in one or two sentences, then say what the project does about it in one sentence.
2. Show a quick example: the install command and the shortest real snippet that demonstrates the core value, with its output if useful. Use only commands and APIs present in the project details; if none are given, insert a clearly marked placeholder and list it under Facts to confirm.
3. Explain how it works or why it is different in a short paragraph. Compare with alternatives only where the details support it, fairly and specifically, naming when an alternative is the better choice.
4. State maturity honestly: what is stable, what is experimental, known limitations, supported versions or platforms, and the license.
5. For a major release rather than a new project: lead with what changed for users and the upgrade path, and link the full changelog instead of listing every change.
6. Close with how to get involved: try it, report issues, good first issues or a contributing guide, where discussion happens, and thanks to contributors if the details name them.
7. Adapt a version per channel: shorter and plainer for forums, one or two lines with a link for social posts, no hashtags unless the channel uses them.
8. Before answering, check every claim (numbers, benchmarks, compatibility, comparisons) against the project details. Anything not supported goes under Facts to confirm, not into the text.
</task>

<constraints>
- No hype adjectives or superlatives without evidence in the details. No emoji unless the channel calls for them.
- Do not invent benchmarks, adopters, quotes, stars or download numbers.
- Keep the main announcement readable in about three minutes.
</constraints>

<output_format>
## Announcement
The main post in Markdown, with a title and short sections.

## Channel versions
One version per channel, each labelled with the channel.

## Facts to confirm
Claims and placeholders the author must check before publishing, or "None".
</output_format>
