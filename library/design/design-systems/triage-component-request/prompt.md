---
schema: 1
id: triage-component-request
kind: prompt
title: Triage a design-system component request
description: Decides whether a requested component belongs in the core system, as a variant of an existing one, as a documented pattern, or stays local, and drafts the reply to the requester.
category: design-systems
version: 1.0.0
status: incubating
stage: [review, plan]
role: [designer, frontend-engineer, tech-lead]
requires: [none]
inputs: [ticket, text, image]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [component-request, intake, contribution-review, reuse, request-triage]
pairs_with:
  prompts: [plan-design-system-governance, write-component-spec, audit-component-duplication]
  personas: [design-systems-lead]
args:
  - name: request
    description: The request as the team wrote it, with any screenshots described, the product, and how soon they need it.
    type: text
    required: true
  - name: system_inventory
    description: Optional. The components and patterns the system already has, with their main variants and props.
    type: text
  - name: criteria
    description: Optional. Your contribution rules, e.g. "needed by at least two products", accessibility bar, platforms every core component must support.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, The underlying need, Existing options, Assessment, Recommendation, Reply to requester, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Component requests usually describe a solution ("we need a StatusPill") rather than the need behind it ("users must see an order's state at a glance in a dense table"). Many can be met by an existing component, a new variant or prop, or a documented pattern that composes existing parts. Every core component is a permanent cost: design, code on every supported platform, accessibility, documentation, support and future migrations. Good triage separates the need from the proposed solution, checks reuse across teams, and always leaves the requester with a path forward, including "build it locally now, we will consider promoting it once a second team needs it". Saying yes to every loud request bloats the system; saying a bare no sends teams off to build their own.
</context>

<task>
Triage this request.

<request>
{{request}}
</request>
{{#system_inventory}}

<system_inventory>
{{system_inventory}}
</system_inventory>
{{/system_inventory}}
{{#criteria}}

<criteria>
{{criteria}}
</criteria>
{{/criteria}}

1. **Underlying need.** Restate the user problem the request is trying to solve, separately from the proposed component. If the need is unclear, write the questions that would clarify it.
2. **Existing options.** Check the inventory for components or patterns that meet the need as is, with a new variant or prop, or by composition. If no inventory was given, say the check could not be done and what to look for.
3. **Assessment.** Score the request on: reuse (how many products or teams plausibly need it), fit with the system's principles and existing components, accessibility complexity, platform coverage needed, and maintenance cost. Apply the user's criteria if given.
4. **Recommendation.** Choose one: use an existing component, extend an existing component, document a pattern, accept as a new core component (via the contribution process), or keep it local with a promotion path. Give the reason and what would change the decision.
5. **Accessibility check.** If the requested design has an accessibility problem (information only on hover, colour as the only signal, a custom control replacing a native one without need), say so and how the recommendation avoids it.
6. **Reply to requester.** A short, friendly message: what we recommend, why, what they can do today, and what happens next. No jargon.
</task>

<constraints>
- Do not claim the system has components or props that are not in the inventory.
- Never answer with a bare no; every verdict comes with something the team can do now.
- Do not approve a new core component on the strength of one team's deadline alone.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Verdict is one line. Assessment as a table (Criterion, Finding, Score low/medium/high). Reply to requester as a quoted block under 150 words.
</output_format>
