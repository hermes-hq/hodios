---
schema: 1
id: write-open-source-roadmap
kind: prompt
title: Write an open-source project roadmap
description: Writes a public roadmap for an open-source project that respects volunteer capacity, separates maintainer plans from help-wanted work, links proposals and states what the project will not take.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate, product-manager, engineering-manager]
requires: [none]
inputs: [text, notes]
output: [docs, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [oss-project, volunteer-capacity, contributors, help-wanted, project-direction, roadmap-md]
pairs_with:
  prompts: [plan-next-release-milestone, write-community-update, plan-rfc-process, write-contributing-guide]
args:
  - name: project
    description: What the project is, who uses it, the maintainers and how much time they have, funding or company backing, and the current version.
    type: text
    required: true
  - name: direction
    description: What the maintainers want to achieve in the next 6 to 12 months, top user requests, open proposals or RFCs, and known technical debt.
    type: text
    required: true
  - name: placement
    description: Optional. Where it will live, for example a ROADMAP.md file, a GitHub project board, a docs page or a discussion post.
    type: string
output_contract:
  format: markdown
  sections: [Roadmap document, Notes for maintainers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the public roadmap for an open-source project. It differs from a company roadmap in important ways: most capacity is volunteer time that cannot be scheduled, contributors decide what they work on, users read the roadmap as a promise, and companies use it to decide whether to depend on the project. Good open-source roadmaps state the project's direction and principles, separate what maintainers intend to work on themselves from what needs help, mark help-wanted items with enough context for a newcomer, link each significant item to its issue or proposal, avoid dates unless a release is funded or scheduled, and say clearly what is out of scope, which saves maintainers from reviewing pull requests they will reject. They also say how to influence the roadmap (proposal process, sponsorship, community calls).
{{#placement}}
Placement: {{placement}}
{{/placement}}
</context>

<task>
Project:

<project>
{{project}}
</project>

Direction:

<direction>
{{direction}}
</direction>

1. Write a short opening: what the roadmap is, how certain it is, when it was last updated, and that volunteer time means timing is not guaranteed.
2. State the project's direction and two to four principles that guide what gets accepted.
3. Group items into sections: maintainers are working on, help wanted (with skill level and a pointer to where to start), under discussion (linked to proposals), and future ideas. Use the user's items only; where an issue link is not given, add a placeholder like "[issue link]".
4. Write an out-of-scope section with brief reasons, so contributors know what will not be merged.
5. Explain how to influence the roadmap: proposals or RFCs, discussions, sponsorship or paid support if the user mentioned it, and how decisions are made.
6. Add notes for maintainers: how often to update the roadmap, how to keep it in sync with milestones, and items that look overcommitted for the time available.
</task>

<constraints>
- Do not invent features, issue numbers, contributors, sponsors or dates. Use placeholders for links.
- Avoid dates unless the user gives a scheduled or funded release.
- Do not imply that funded or company work outranks community priorities unless the governance says so; state it plainly if it does.
- Keep the document scannable; plain headings and short items.
</constraints>

<output_format>
## Roadmap document
The full ready-to-publish roadmap with its own headings: introduction, direction and principles, maintainers are working on, help wanted, under discussion, future ideas, out of scope, how to influence this roadmap.

## Notes for maintainers
Bullets.
</output_format>
