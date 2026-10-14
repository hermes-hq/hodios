---
schema: 1
id: retire-open-source-project
kind: prompt
title: Retire an open-source project responsibly
description: Plans winding down an open-source project, choosing between handover, security-only maintenance and archiving, with notices, registry and repository steps, timelines and an announcement.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [maintainer, engineering-manager]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [deprecation, archiving, end-of-life, package-registry, package-name-takeover]
pairs_with:
  prompts: [write-api-deprecation-notice, write-security-policy]
  workflows: [maintainer-handover-track]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What the project is, how widely it is used (downloads, dependents, known companies), where it is published (registries, container images, plugins), why you want to stop, and assets such as a domain, docs site, sponsors or chat.
    type: text
    required: true
  - name: options
    description: What you are open to - handing it to someone else, a final release, keeping security fixes for a while - and any deadline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Timeline, Notices, Registry and repository steps, Loose ends, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Stopping is a legitimate choice for a maintainer; what hurts users is stopping silently or destructively. The options, roughly in order of user impact: find new maintainers, move the project to an organisation or foundation, freeze features and give security fixes only for a stated period, or deprecate and archive. Deleting a published package or repository is almost always the wrong move: it breaks every build that depends on it, and a freed package name can be claimed by someone malicious. The same risk applies to a lapsed domain that docs and install scripts point to. Good retirements leave a clear notice at the top of the README and in the registry's own deprecation mechanism, a final release that warns at install or runtime where the ecosystem supports it, suggested alternatives, an archived read-only repository, and a plan for security reports that arrive after the end.

Project:
<project>
{{project}}
</project>
{{#options}}Open to: {{options}}{{/options}}
</context>

<task>
1. Recommend a path (handover, transfer, security-only period, or deprecate and archive) with the reason, based on usage and the maintainer's situation. If usage is large and a handover is possible, say so, and explain how to vet a successor before giving publish rights.
2. Lay out a timeline from announcement to archive, with a notice period proportional to usage.
3. Write the notices: README banner, docs site banner, registry description or deprecation message, and a pinned issue.
4. List registry and repository steps for each place it is published: mark deprecated using that registry's own mechanism, a final release if useful, do not unpublish or delete, close or transfer open issues and pull requests with a note, archive the repository, keep documentation reachable.
5. List loose ends: domain renewal or redirect, sponsors and funding pages (stop and tell sponsors), chat and social accounts, CI secrets and tokens to revoke, who receives security reports afterwards, and trademark or name rights if any.
6. Write the announcement: why, what happens when, what users should do, alternatives (named only if given or widely known, without endorsing quality you cannot check), and thanks.
</task>

<constraints>
- Advise against deleting packages, versions or repositories that others depend on; if the user insists, explain the concrete harm once and the safer equivalent.
- Use each registry's documented deprecation mechanism only if you are confident it exists; otherwise describe the outcome to achieve and say to check the registry's docs.
- Do not invent usage numbers, dependents or alternative projects.
- Respect the maintainer: do not guilt them into continuing.
</constraints>

<output_format>
Use the contract's section headings in order. Timeline as a table: Date or week | Action | Where. Notices and the announcement as fenced blocks. Registry and repository steps and loose ends as checklists.
</output_format>
