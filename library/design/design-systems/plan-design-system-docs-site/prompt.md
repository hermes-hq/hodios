---
schema: 1
id: plan-design-system-docs-site
kind: prompt
title: Plan a design system documentation site
description: Plans the information architecture and page templates for a design system documentation site serving designers and engineers, with search, live examples, versioning and ownership.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, design]
role: [designer, frontend-engineer, technical-writer]
requires: [none]
inputs: [text, notes]
output: [plan, outline, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [documentation-site, information-architecture, page-templates, docs-as-code, design-documentation]
pairs_with:
  prompts: [write-component-spec, write-token-usage-guide, write-design-system-onboarding-guide]
  personas: [design-systems-lead, technical-writer]
args:
  - name: system
    description: What the system contains (foundations, components, patterns, platforms), who reads the docs, where docs live today, and the tooling you use (design tool, component workshop, code hosting).
    type: text
    required: true
  - name: problems
    description: Optional. What goes wrong today, e.g. "nobody finds anything", "props tables are out of date", "iOS docs missing", "designers never visit".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Audiences and tasks, Information architecture, Page templates, Examples and code, Search and navigation, Versioning, Ownership and upkeep, Tooling options, Rollout, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People arrive at design system docs with a task: which component do I use for this, how do I install it, what token is the border colour, can I do this with the button. Sites organised around the team's internal structure instead of those tasks go unread, and teams rebuild things that already exist. The other killer is drift: hand-written props tables and token lists go stale within weeks, so anything that can be generated from source (props, tokens, changelogs) should be. A component workshop such as Storybook is a good engineering tool and can be embedded, but on its own it does not serve designers or explain when to use what. Usage guidance comes first on every component page, platform differences need a clear home (tabs or separate pages), search needs synonyms because people look for "modal" when the system calls it "dialog", and every page needs an owner and a feedback path.
</context>

<task>
Plan the documentation site.

<system>
{{system}}
</system>
{{#problems}}

<problems>
{{problems}}
</problems>
{{/problems}}

1. **Audiences and tasks.** List the audiences (product designers, web engineers, native engineers, content designers, product managers, new joiners) and their top tasks, ranked.
2. **Information architecture.** A sitemap for the top two levels (for example Get started, Foundations, Components, Patterns, Content, Accessibility, Resources, What's new) with what goes where and why, driven by the tasks.
3. **Page templates.** Templates for a component page (status, usage first with when not to use, live examples, variants, accessibility, content guidance, props generated from code, design library link, related components, changelog), a foundation page, a pattern page and a getting-started page.
4. **Examples and code.** Live, editable examples where possible; which content is generated from source (props, tokens, changelog) and which is written by hand.
5. **Search and navigation.** Search with a synonyms list (seed it with likely pairs from the system), cross-links between design and code, and a "which component should I use" decision page.
6. **Versioning.** How docs track major versions, deprecated content and migration guides.
7. **Ownership and upkeep.** Who owns each section, docs updated in the same pull request as the component change, a review cadence, and a feedback link on every page.
8. **Tooling options.** Two or three ways to build the site that fit the stated tooling, with trade-offs; do not prescribe one product as the answer.
9. **Rollout.** What to publish first (top tasks and most used components), what can wait, and how to measure use (search queries with no results, page feedback).
</task>

<constraints>
- Do not invent the system's components, tokens or tooling; use what is given and mark proposals.
- Do not copy another organisation's documentation text; structure can be inspired, content must be original.
- Prefer generated content over hand-maintained copies wherever source exists.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. The sitemap as a nested list, page templates as heading outlines, ownership as a table. End with Open questions.
</output_format>
