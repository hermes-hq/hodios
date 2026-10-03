---
schema: 1
id: plan-directory-submissions
kind: prompt
title: Plan awesome-list and directory submissions
description: Finds the awesome lists, directories and registries an open-source project truly qualifies for, checks each one's rules and writes a submission tracker with entry lines. Use after launch.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [maintainer, developer-advocate]
requires: [web]
inputs: [text, url]
output: [table, checklist, copy]
risk: network
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source, awesome-lists, directories, package-registries, backlinks, submission-tracker]
pairs_with:
  prompts: [optimize-registry-listings, pitch-developer-media, plan-open-source-launch]
  personas: [open-source-growth-strategist]
args:
  - name: project
    description: What it is, category, license, platforms, age, stars, latest release, and the repo and site links.
    type: text
    required: true
  - name: known_targets
    description: Lists or directories you already know about or have submitted to, with status.
    type: text
  - name: max_targets
    description: The most targets to include.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Qualification facts, Targets, Entry lines, Order of work, Skipped]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Curated lists and directories bring a slow, steady stream of qualified visitors and links, but only when the project fits and the submission follows the rules. Awesome lists usually require a specific line format, alphabetical or category placement, a description that is not marketing, and often a minimum age, activity level or star count; many lint submissions automatically, and some accept only projects under OSI-approved licenses. Package managers have their own bars (Homebrew, for example, has notability criteria; Flathub and winget have manifest and review requirements). Self-hosting and "alternatives" directories check license and hosting model. Maintainers of these lists are volunteers; a submission that ignores their template, duplicates an entry or oversells the project is closed and remembered.
</context>

<task>
<project>
{{project}}
</project>
{{#known_targets}}
Already known or submitted:
{{known_targets}}
{{/known_targets}}

If you cannot tell the project's category, license and platforms, ask and stop.

1. **Qualification facts.** List the facts that decide eligibility: license and whether it is OSI-approved, first release date, latest release, stars, platforms, packaging status, docs, and whether the project is a library, app, CLI or service.
2. **Find targets.** Search for up to {{max_targets}} relevant targets across: awesome lists for the category, language, framework and platform; package registries and app stores the project could be in; developer-tool directories and alternatives sites; ecosystem showcases (a framework's showcase page, a marketplace). For each, open the list itself and its contributing guide. Record the URL, the maintainer activity (last merged submission), the inclusion criteria quoted from the guide, and the required format.
3. **Qualify.** Mark each target qualifies, not yet (and what is missing, such as age or stars) or no (such as license). Never mark one as qualifying on a guess; if you could not read the rules, mark it UNVERIFIED.
4. **Entry lines.** For each qualifying target, write the exact line or form text in that target's format: name, link, and a plain, factual description in the list's style and length, with no superlatives.
5. **Order of work.** Sequence the submissions: package managers and registries first (they make installs easier), then the most relevant and active lists, then directories. One submission per target; note how to follow up politely once if there is no response after the time the guide states, or after a month.
6. **Skipped.** Targets you found but excluded, and why.
</task>

<constraints>
- Never suggest submitting to lists the project does not qualify for, re-submitting after a rejection without changes, or asking others to submit on the project's behalf to look independent.
- Quote inclusion criteria from the source; mark anything not read as UNVERIFIED.
- Do not open pull requests or submit forms; produce the plan and texts for the maintainer.
- Disclose in each submission that the submitter maintains the project when the list asks or the format allows.
</constraints>

<output_format>
## Qualification facts
## Targets
| Target | URL | Type | Criteria (quoted) | Format | Activity | Verdict |
## Entry lines
One block per qualifying target.
## Order of work
| # | Target | Action | Follow-up date |
## Skipped
</output_format>
