---
schema: 1
id: write-community-update
kind: prompt
title: Write a periodic open-source community update
description: Writes a monthly or quarterly update for an open-source project's users and contributors from merged work and activity, with what changed, new contributors thanked, help wanted and what comes next.
category: open-source
version: 1.0.0
status: incubating
stage: [operate]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [notes, text, dataset]
output: [article, post]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [project-news, contributor-recognition, help-wanted, changelog-digest, project-updates]
pairs_with:
  prompts: [write-release-announcement-kit, write-funding-impact-report, write-good-first-issues]
  personas: [open-source-maintainer]
args:
  - name: activity
    description: What happened in the period, such as merged pull requests, releases, issues closed, new contributors, talks or events, decisions, and anything still in progress. A raw list or changelog export is fine.
    type: text
    required: true
  - name: period_and_audience
    description: The period covered, where the update will be published (blog, discussions, mailing list, newsletter) and who mostly reads it.
    type: text
    required: true
  - name: help_wanted
    description: Areas where the project wants help, specific issues or roles. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Update, Short post, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Regular updates keep a project feeling alive between releases, give contributors credit where people see it, and turn passive users into helpers. They fail when they are a pasted list of pull request titles, written in maintainer jargon, so users cannot tell what matters to them; when they thank "everyone" instead of naming people; when they say "help wanted" without a concrete starting point; or when they promise dates the project then misses. Good updates lead with the two or three changes users will notice, group the rest, name every first-time contributor, link help-wanted to specific issues with a sentence on what is involved, say honestly what slipped, and keep "what is next" to plans, not promises.

Activity:
<activity>
{{activity}}
</activity>
Period and audience: {{period_and_audience}}
{{#help_wanted}}Help wanted: {{help_wanted}}{{/help_wanted}}
</context>

<task>
1. Pick the two or three items users will care about most and explain each in a sentence or two from the user's side.
2. Group the remaining work (fixes, docs, infrastructure, community) in short lines, translating internal names into plain words.
3. Thank contributors by name or handle as given, calling out first-time contributors separately.
4. Write a help-wanted section{{#help_wanted}} from what was given{{/help_wanted}}: specific starting points, what each needs, and how to begin. If none was given, ask the maintainer for two concrete items instead of writing a vague call.
5. Say what slipped or is still in progress, briefly and without excuses.
6. Write what is next as plans, not dates, unless a date is already fixed.
7. Write a short post for social media or chat that links to the update.
8. List gaps: anything the update needs that the input did not provide.
</task>

<constraints>
- Do not invent contributors, numbers, features or dates. Use only the activity given.
- Do not thank people by name if the input does not name them; use a placeholder.
- Keep the update under 500 words unless the period was unusually busy.
- No hype words; plain, friendly tone.
</constraints>

<output_format>
Use the contract's section headings in order. Update as ready-to-publish markdown in a fenced block with its own headings. Short post in a fenced block. Gaps to fill as bullets, or "None".
</output_format>
