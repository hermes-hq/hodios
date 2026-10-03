---
schema: 1
id: plan-integration-partnerships
kind: prompt
title: Plan integrations and partnerships for an open-source project
description: Finds tools and projects whose users overlap with yours, ranks integrations by user value and effort, and drafts a short pitch and "works with" page for each. Use to grow through other ecosystems.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate, founder]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, integrations, partnerships, ecosystem, plugin, works-with]
pairs_with:
  prompts: [write-partnership-proposal, plan-platform-strategy, pitch-developer-media]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it does, who uses it, extension points (plugins, APIs, config formats), and what users already ask to connect it with (issues, discussions).
    type: text
    required: true
  - name: candidates
    description: Tools or projects you are considering, if any.
    type: text
  - name: capacity
    description: Hours a month you can spend building and maintaining integrations.
    type: string
    default: unknown
output_contract:
  format: markdown
  sections: [Demand evidence, Candidates, Top picks, Pitches, Works-with page]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Integrations put a project in front of users who already trust another tool. Examples: a database that became easy to add from a hosting platform's marketplace and called it its largest partner channel; a diagram syntax that grew once a major code host rendered it natively; a linter adopted by large projects in its ecosystem. What partners want is less work for their users, not more promotion for you: the pitch that works shows demand from shared users, makes the integration small, and offers to build and maintain it yourself. Every integration is code someone maintains for years, so the number of integrations should match capacity. Being listed in another project's docs or plugin directory usually requires meeting their contribution rules.
</context>

<task>
<project>
{{project}}
</project>
{{#candidates}}
Candidates:
{{candidates}}
{{/candidates}}
Capacity: {{capacity}}.

If you cannot tell what extension points exist or who the users are, ask and stop.

1. **Demand evidence.** List the integration requests and overlaps visible in the input (issues, discussions, the tools users mention in bug reports). Separate evidence from assumptions.
2. **Candidates.** Up to ten tools, platforms or projects, from the input and from the project's ecosystem (editors, CI systems, cloud marketplaces, frameworks, agent tools, package managers). For each: the shared users, the integration shape (plugin, config preset, docs recipe, native support in their tool, a marketplace listing), who builds and maintains it, effort, and the value to their users.
3. **Top picks.** Rank by user value and evidence divided by build-and-maintain cost, fitted to {{capacity}}. Prefer the smallest integration that delivers the value (a docs recipe or preset before a plugin).
4. **Pitches.** For the top three, a message under 150 words to the right contact (their maintainers through their stated channel, a devrel or partnerships address, a discussion in their repo if they invite proposals): the shared users and the evidence, what their users gain, how small it is, and that you will build and maintain it. Note any contribution rules to read first.
5. **Works-with page.** An outline for a page on your site listing integrations, with honest status (official, community, planned), setup steps and who maintains each.
</task>

<constraints>
- Do not claim a partnership, endorsement or "official" status that the other side has not agreed to; do not use their logo without permission.
- No unsolicited mass outreach; one targeted message per candidate, through their preferred channel.
- Do not open issues or pull requests on other projects; produce drafts for the maintainer.
- Use only facts from the input; label assumptions.
</constraints>

<output_format>
## Demand evidence
## Candidates
| Candidate | Shared users | Shape | Who maintains | Effort | Value |
## Top picks
## Pitches
## Works-with page
</output_format>
