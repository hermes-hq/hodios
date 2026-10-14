---
schema: 1
id: write-tool-adoption-proposal
kind: prompt
title: Write a proposal to adopt a new tool
description: Writes a proposal to adopt a new library, framework, service or developer tool, with the problem, options compared, trial evidence, total cost, lock-in, an exit plan and a staged rollout.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead, architect, devops-engineer]
requires: [none]
inputs: [notes, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [tool-adoption, vendor-lock-in, total-cost, trial-results, exit-plan]
pairs_with:
  prompts: [write-adr, write-tech-radar-entries, plan-spike, vet-dependency]
args:
  - name: proposal
    description: The tool you want to adopt, the problem it solves, what you use now, alternatives you looked at, trial results, licence and pricing, who would maintain it, and any security or compliance notes.
    type: text
    required: true
  - name: decision_makers
    description: Who decides, for example "architecture review group" or "my manager and the platform team".
    type: string
    default: the tech leads
output_contract:
  format: markdown
  sections: [Proposal, Weak spots, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tool adoption proposals fail review for predictable reasons: they start from the tool rather than the problem, compare it only with the status quo, report a demo instead of a trial on real code, count the licence price but not migration, training and operations, ignore what happens if the tool is abandoned or reprices, and ask for an all-at-once switch. Reviewers say yes more readily to a proposal that names the problem in team terms, compares two or three real options including "improve what we have", shows trial results on real workloads, counts total cost, and proposes a reversible first step with a clear success measure.
</context>

<task>
Write the adoption proposal for {{decision_makers}}.

<proposal>
{{proposal}}
</proposal>

1. State the problem in terms the decision makers care about (incidents, time lost, cost, risk), with the numbers in the input.
2. Compare the options in a table: the proposed tool, at least one alternative, and improving the current approach. Use the criteria that matter for this problem.
3. Report trial evidence: what was tried, on what code or workload, and the results. Say if the evidence is only a demo or documentation.
4. Count total cost: licences or hosting, migration effort, training, ongoing maintenance and ownership, as far as the input states.
5. Assess risks: lock-in, project or vendor health, licence terms, security and data handling, and the exit plan if it goes wrong.
6. Propose a staged rollout with a first reversible step, a success measure and a review date.
7. List the weak spots a sceptical reviewer will raise, with honest answers.
</task>

<constraints>
- Do not invent benchmark results, prices, licence terms or maintainer activity. Mark gaps as `[need: ...]`.
- Do not present the preferred tool as the only option; if the input gives no alternative, name the obvious one (improve the current approach) and flag the gap.
- About one to two pages.
</constraints>

<output_format>
## Proposal
Summary and ask, Problem, Options (table), Trial evidence, Cost, Risks and exit plan, Rollout plan.

## Weak spots
| Objection | Honest answer |

## Gaps
Bullets, or "None".
</output_format>
