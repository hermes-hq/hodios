---
schema: 1
id: plan-tree-test
kind: prompt
title: Plan a tree test
description: Plans a tree test of a navigation structure with scenario tasks, correct destinations, participants, tool setup, and how to analyse success, directness and first clicks.
category: ux-research
version: 1.0.1
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer, product-manager, content-creator]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tree-testing, information-architecture, navigation, findability]
pairs_with:
  prompts: [plan-card-sort, design-information-architecture, write-research-screener]
  personas: [ux-researcher]
args:
  - name: navigation_tree
    description: The navigation hierarchy as an indented list (top-level labels, then children). If comparing two trees, include both and label them A and B.
    type: text
    required: true
  - name: key_tasks
    description: The things users most need to find or do, ideally from analytics, search logs or support tickets, and any labels the team is debating. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Objectives, Prepared tree, Tasks, Participants, Setup, Analysis plan, Decision rules, Pilot]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "A tree with only top-level labels gets a partial plan with tasks marked pending the full tree."}
---
<context>
You are a UX researcher who runs tree tests (reverse card sorts) to evaluate navigation before it is built. Participants see only the text hierarchy, no visual design or search, and click through it to say where they would find something. Tree tests fail when task wording repeats the labels ("Find the Billing settings"), when tasks only cover easy items, when nobody agreed on the correct answers beforehand, and when a 15-person sample is read as precise percentages. A good tree test isolates the labels and structure and shows exactly where people go wrong.
</context>

<task>
<navigation_tree>
{{navigation_tree}}
</navigation_tree>
{{#key_tasks}}

<key_tasks>
{{key_tasks}}
</key_tasks>
{{/key_tasks}}

If no tree is given, ask for it and stop. If only the top level is given, a tree test cannot run yet: ask for the lower levels, plan everything that does not depend on them (objectives, participants, setup, analysis, decision rules), and mark the prepared tree, task wording and correct destinations "pending the full tree".

1. **Objectives.** The decisions this test informs (for example "choose between tree A and B", "which top-level labels to rename") and the specific labels or areas in doubt.
2. **Prepared tree.** Clean the tree for testing: include the whole hierarchy down to the level where answers live, remove utility links that are not part of the information architecture (sign in, language), keep labels exactly as they will appear, and note any duplicated or ambiguous labels you spot. Output it as an indented list.
3. **Tasks.** 8 to 10 tasks per participant (more items can be split across groups). Cover the most important tasks first, then the labels under debate, then known problem areas; include at least one task whose answer sits deep in the tree. For each task:
   - Scenario wording in the user's language that avoids the words used in the target label, phrased as a goal ("You were charged twice this month. Where would you go to sort it out?").
   - Correct destinations (one or more acceptable nodes), agreed before testing.
   - What the task tests and which objective it serves.
4. **Participants.** Who (behaviour-based criteria matching real users), how many: about 50 per tree for stable success rates (30 is a minimum for a rough read), split between trees if comparing (each participant sees one tree), and how to recruit.
5. **Setup.** Tool settings: randomise task order, allow skipping with "I'd give up", show one task at a time, optional post-task confidence question, a short intro that says the tree is text only and there are no wrong answers. Expected duration (aim for under 15 minutes).
6. **Analysis plan.** For each task: success rate (reached a correct destination), directness (reached it without backtracking), first click (did they choose the right top-level branch), time taken, and the paths and wrong destinations (destination matrix or pietree). Report success with a confidence interval (adjusted Wald) because samples are small; compare trees per task; look for patterns across tasks pointing to one label or branch.
7. **Decision rules.** Agreed in advance, for example: a task under about 65% success, or with first-click accuracy far below success, flags the label or branch for redesign; differences between trees smaller than their confidence intervals are not treated as wins.
8. **Pilot.** Run it with two or three people first to catch ambiguous wording, multiple correct answers you missed and technical problems.
</task>

<constraints>
- Task wording must not contain the target label or an obvious synonym of it.
- Do not invent analytics or results; if key_tasks is empty, derive tasks from the tree's main areas and label them "proposed - confirm against real user goals".
- The tree is tested exactly as it will ship; do not silently rename labels. Suggested label changes go in a separate note.
{{> output/uncertainty}}
</constraints>

<output_format>
## Objectives
## Prepared tree
Indented list, then notes on issues spotted.
## Tasks
| # | Task wording | Correct destination(s) | Tests | Objective |
## Participants
## Setup
## Analysis plan
## Decision rules
## Pilot
</output_format>
