---
schema: 1
id: plan-next-release-milestone
kind: prompt
title: Plan an open-source project's next release milestone
description: Chooses what goes into an open-source project's next release from open issues and pull requests, with must-haves, blockers, a freeze date, owners and a milestone description to publish.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, tech-lead]
requires: [none]
inputs: [ticket, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [release-planning, milestones, feature-freeze, release-scope]
pairs_with:
  prompts: [triage-issue-backlog, triage-stale-pull-requests, write-release-announcement-kit]
  personas: [open-source-maintainer]
args:
  - name: candidates
    description: The open issues and pull requests you are considering, with titles, labels, status (ready, needs review, needs work) and any user demand. A pasted list or export is fine.
    type: text
    required: true
  - name: capacity
    description: Who can work on the release and roughly how many hours each has before the target, the release type (patch, minor, major), and any fixed date such as a conference or a runtime end of life.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Release goal, Must have, Nice to have, Not this release, Blockers and risks, Timeline, Milestone description]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Volunteer projects slip releases for the same reasons: milestones become wish lists that collect every issue someone labelled, a single large feature holds back a dozen ready fixes, review capacity rather than coding capacity is the real bottleneck, and nobody decides what is cut when time runs out. A release that ships is planned around one clear goal, a short must-have list sized to the reviewers' hours, ready pull requests merged first because they are cheapest, and a freeze date after which only fixes go in. Contributor pull requests that are nearly ready deserve priority: merging them builds the community, and letting them rot loses people. Anything risky goes behind a flag or into the next release. Publishing the milestone tells users and contributors what to expect and where help is wanted.

Candidates:
<candidates>
{{candidates}}
</candidates>
Capacity and constraints:
<capacity>
{{capacity}}
</capacity>
</context>

<task>
1. Release goal: one or two sentences on what this release is for, chosen from the candidates and the release type.
2. Sort the candidates into must have, nice to have and not this release. Base it on user impact, readiness and review cost. Check that must-haves are not breaking changes in a minor or patch release.
3. Size the must-have list against the stated hours, counting review time, and cut until it fits. Show the arithmetic roughly.
4. Name blockers and risks: items waiting on one person, items with unclear design, dependencies on other releases, and how each is handled.
5. Timeline: merge order (ready contributor PRs first), a freeze date, a release candidate if warranted, and the release date, with owners as names from the input or roles.
6. Write the milestone description to publish: goal, what is in, where help is wanted, the freeze date, and what happens to items that miss it.
</task>

<constraints>
- Do not invent issues, numbers, contributors or user demand; use only what is listed.
- If capacity is clearly too small for any meaningful scope, say so and propose a smaller release.
- Do not promise contributors their item will ship; say what would get it in.
- Keep the published description short and free of internal discussion.
</constraints>

<output_format>
Use the contract's section headings in order. Must have and Nice to have as tables: Item | Status | Owner | Effort (incl. review). Not this release as a bullet list with a one-line reason each. Milestone description in a fenced markdown block.
</output_format>
