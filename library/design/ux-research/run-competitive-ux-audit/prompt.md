---
schema: 1
id: run-competitive-ux-audit
kind: prompt
title: Run a competitive UX audit
description: Audits how competitors handle one key user task, comparing steps, patterns, friction and delighters, and recommends what to adopt or avoid. Use before redesigning a core flow.
category: ux-research
version: 1.0.0
status: incubating
stage: [discover, review]
role: [designer, ux-researcher, product-manager, founder]
requires: [none]
inputs: [text, notes, image]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [competitive-analysis, ux-benchmark, design-patterns, friction]
pairs_with:
  prompts: [run-heuristic-evaluation, critique-ui-screen, analyze-competitors]
  personas: [product-designer, ux-researcher]
args:
  - name: task
    description: The user task to compare (for example "first-time user books a haircut" or "cancel a subscription"), the user it is for, and your own product's current flow if you have one.
    type: text
    required: true
  - name: competitors
    description: The competitors and, for each, your walkthrough notes or screenshots of the task (screen by screen). Without walkthroughs, the prompt produces an audit protocol instead of findings.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scope, Comparison, Friction and delighters, Patterns, Recommendations, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Competitive reviews usually turn into screenshot collages or feature checklists, and when produced by a model they often describe competitors' flows from memory, inventing step counts and screens that changed long ago. A useful audit compares the same task, done by the same type of user, from the same starting point, measured the same way, and ends with specific decisions: what to copy because users now expect it, what to avoid, and where there is room to be better.
</context>

<task>
Audit how these competitors handle this task.

<task_definition>
{{task}}
</task_definition>

<competitors>
{{competitors}}
</competitors>

1. **Scope.** Restate the task as a scenario with a clear start point (for example "lands on the homepage, logged out, on mobile") and end point, the user type, and the platform. Use the same definition for every product.
2. **Check the evidence.** For each competitor, note whether the input contains a walkthrough (notes or screenshots for the steps) or only a name. Analyse only what was supplied. For competitors with no walkthrough, do not describe their flow from memory: list them under Gaps with a walkthrough protocol (start state, device, account state, what to capture at each screen, the time limit) so the user can collect it. If no competitor has a walkthrough, produce only the protocol, a blank comparison table and the questions to answer, and stop.
3. **Comparison.** For each product with evidence, record: number of screens and required inputs (fields, choices, taps) from start to end; points where the user must create an account, pay or give permission; information shown before commitment (price, time, availability); error prevention and recovery; and the patterns used at each stage.
4. **Friction and delighters.** Per product, list friction points (unclear labels, forced sign-up, surprise costs, dead ends, extra steps) and delighters (smart defaults, saved state, previews, reassurance) with the step where each occurs. Rate friction severity: blocker, major, minor.
5. **Patterns.** Group what the products do into stages of the task and note which patterns are now conventional (most products share them, so users will expect them) versus distinctive.
6. **Recommendations.** For your product, or for a new design if none was given: adopt (conventions users expect, and strong ideas worth borrowing), avoid (patterns causing friction or dark patterns), and differentiate (gaps no competitor fills). Each with the evidence that supports it and a confidence level. Note that an expert walkthrough is not user evidence, and recommend which items to validate with users.
</task>

<constraints>
- Never invent screens, step counts, prices or features. Every observation cites the supplied walkthrough; anything not supplied is a gap.
- Count steps the same way for every product, and state the counting rule.
- Do not recommend copying dark patterns because a competitor uses them: confirmshaming, hidden costs, forced continuity or obstructed cancellation are listed as patterns to avoid.
- Do not copy competitors' copy, imagery or trade dress; borrow patterns, not assets.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
## Comparison
| Product | Screens | Required inputs | Account / payment / permission points | Info before commitment | Notable patterns |
## Friction and delighters
Per product, a list with step, finding and severity.
## Patterns
## Recommendations
Three lists: Adopt, Avoid, Differentiate. Each item with evidence and confidence.
## Gaps
Missing walkthroughs with the protocol, and what to validate with users.
</output_format>
