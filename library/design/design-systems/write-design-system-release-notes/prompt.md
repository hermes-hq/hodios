---
schema: 1
id: write-design-system-release-notes
kind: prompt
title: Write design system release notes
description: Writes release notes for a design system version, grouped by component, for both designers and developers, flagging breaking and visual changes with migration steps.
category: design-systems
version: 1.0.0
status: incubating
stage: [ship]
role: [designer, frontend-engineer, technical-writer]
requires: [none]
inputs: [text, diff, document]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [release-notes, changelog, semantic-versioning, figma-library, breaking-changes]
pairs_with:
  prompts: [write-release-notes, plan-component-deprecation, write-component-release-checklist, plan-design-system-governance]
  personas: [design-systems-lead]
args:
  - name: changes
    description: What changed in this version, as merged pull requests, commit messages, a changelog draft or Figma library publish notes. Include component names.
    type: text
    required: true
  - name: version
    description: The version number of the code package and, if separate, the design library.
    type: string
    required: true
  - name: audience
    description: Optional. Who reads the notes (product designers, web and mobile engineers) and where they are posted (docs site, chat channel, email).
    type: text
output_contract:
  format: markdown
  sections: [Headline, Action needed, Changes by component, Tokens and foundations, Design library update, Deprecations, Short announcement, Unclear items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design system consumers read release notes for one question: what do I have to do, and what will change on my screens without me touching anything? Generic changelogs bury that. Notes that work lead with actions needed, group changes by component because that is how consumers search, and label each change (breaking, visual change, new, fixed, deprecated). The "visual change" label matters: a padding or line-height fix is a patch in semantic versioning but can shift layouts and break screenshot tests in every product, so it must be called out. Designers and developers need different instructions for the same change: developers need the prop or import change, designers need to know what happens when they accept the library update in their files, for example that overrides on a renamed layer or property may be reset. Token changes ripple further than component changes and need their own section. Notes are written from what changed for the consumer, not from the pull request titles.
</context>

<task>
Write the release notes for version {{version}}.

<changes>
{{changes}}
</changes>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. **Classify.** Label every change: breaking, visual change, new, improved, fixed, deprecated, or internal (not shown). Check the version number against the labels: a breaking change in a minor or patch version must be flagged under Unclear items.
2. **Headline.** One or two sentences on what this release is about.
3. **Action needed.** A short list of what consumers must do, split into developers and designers. Say "No action needed" if that is true.
4. **Changes by component.** Alphabetical by component. For each change: label, what changed from the consumer's point of view, and for breaking or visual changes, a before and after (code snippet or description) and a migration step or link placeholder.
5. **Tokens and foundations.** Added, changed, renamed or removed tokens, with old and new names and values where given.
6. **Design library update.** What designers will see when accepting the update, which overrides may be lost, and any components to swap.
7. **Deprecations.** What is deprecated, its replacement and the removal version or date if given.
8. **Short announcement.** A message of five lines or fewer for a chat channel, linking to the full notes.
</task>

<constraints>
- Use only changes in the input; do not invent fixes, dates or version numbers.
- Leave internal refactors out unless they change behaviour.
- When a change's impact on consumers is unclear from the input, list it under Unclear items rather than guessing.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Labels in bold at the start of each change line. Code in fenced blocks. End with Unclear items.
</output_format>
