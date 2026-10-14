---
schema: 1
id: summarize-project-history-from-git
kind: prompt
title: Summarize a project's history from git
description: Writes a narrative history of a codebase from its git log, tags and pull requests, covering eras, rewrites, key decisions and contributors, to explain why the code looks the way it does.
category: git
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [software-engineer, tech-lead, engineering-manager, architect]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo]
output: [report, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [git-log, project-history, codebase-onboarding, archaeology, timeline]
pairs_with:
  prompts: [investigate-code-history, find-hotspots-in-git-history, write-architecture-overview, write-onboarding-guide]
args:
  - name: audience
    description: Who will read it and why, for example a new team lead taking over, a new hire, an acquirer's due diligence or a retrospective.
    type: string
    required: true
  - name: focus
    description: Optional areas or questions to focus on, for example "why there are two auth systems" or "the move from monolith to services".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Timeline, Major events, Why things look as they do, People and ownership, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A project's history explains most of its oddities: two ways of doing the same thing usually mean a migration that stopped halfway, a folder nobody touches marks an abandoned rewrite, and a burst of hotfixes after a release points to a fragile area. The git record holds this if you read it at the right level: tags and release dates give the timeline; changes in which top-level directories receive commits show eras; large deletions and additions show rewrites and migrations; dependency and build-file changes show framework moves; and authorship over time shows who built what and who has left (bus factor). Commit messages are uneven, so pull request titles, merge commits and changelogs are often better sources. A good history is a story with dates and evidence, not a list of commits, and it separates what the record shows from interpretation.

<audience>{{audience}}</audience>
{{#focus}}
<focus>
{{focus}}
</focus>
{{/focus}}
</context>

<task>
1. Collect read-only signals: first and last commit dates, tags with dates (`git tag --sort=creatordate` and `git log --tags --simplify-by-decoration`), commits per month, top-level directory activity over time, the largest commits by files changed, changes to dependency manifests and build files, the changelog if any, and authors per year (`git shortlog -sne` by period).
2. Identify eras: periods with a distinct focus, team or technology, bounded by dates and evidence (a tag, a large migration commit, a change in active authors).
3. Find the major events: rewrites, framework or language moves, repository restructures, migrations left unfinished (old and new patterns both still present), and reverts of big changes. For each, cite commit hashes or tags and dates.
4. Note the people dimension in a respectful, factual way: who led which era by commit share, and areas whose main authors are no longer active.
5. Answer the focus questions specifically, with evidence, or say what the record cannot tell.
6. Write the narrative for the audience: a one-paragraph summary, then the eras in order, then "why things look as they do" items that link today's oddities to past events, then open questions for long-time team members.
</task>

<constraints>
- Read-only; do not fetch, check out or change anything.
- Every claim about an event cites a tag, commit hash or date range; label interpretation as interpretation.
- Do not judge individual contributors' performance from commit counts; describe roles and ownership only.
- Do not include personal email addresses in the output; use names or handles.
</constraints>

<output_format>
## Summary
One paragraph.
## Timeline
A table: period | era | evidence.
## Major events
Bullets with dates and commit or tag references.
## Why things look as they do
Today's oddity | origin | evidence.
## People and ownership
Short, factual.
## Open questions
For long-time team members.
</output_format>
