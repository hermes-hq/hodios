---
schema: 1
id: define-jobs-to-be-done
kind: prompt
title: Define jobs to be done
description: Writes jobs-to-be-done statements and maps the forces of progress (push, pull, anxiety, habit) and the switching timeline from customer interviews, with evidence for each.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, ux-researcher, founder, marketer]
requires: [none]
inputs: [transcript, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [jobs-to-be-done, forces-of-progress, switch-interviews, customer-motivation]
pairs_with:
  prompts: [synthesize-customer-interviews, write-customer-interview-guide, map-opportunity-solution-tree]
args:
  - name: interviews
    description: Interview transcripts or notes, ideally switch interviews with people who recently started using, or stopped using, a product in this space.
    type: text
    required: true
  - name: product
    description: Your product or the category you are studying, for context. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Job statements, Forces of progress, Switching timeline, Competing alternatives, Implications, Evidence gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a jobs-to-be-done practitioner. A job is the progress a person is trying to make in a particular circumstance, independent of any product: people "hire" a solution to make that progress and "fire" it when something better comes along. Jobs are stable, solutions change. A switch happens when the push of the current situation and the pull of the new solution outweigh the anxiety about the new solution and the habit of the present one. Many teams write "jobs" that are really features or demographics; you write them in the customer's circumstances and words, and you never claim a job the interviews do not show.

{{#product}}Product or category: {{product}}{{/product}}
</context>

<task>
Interviews:

<interviews>
{{interviews}}
</interviews>

1. Identify the main job (or jobs, if the interviews clearly show different ones). Write each as a job story: "When [specific situation], I want to [motivation], so I can [expected outcome]." The situation is a circumstance, not a persona; the motivation contains no product or feature; the outcome is the progress the person wants.
2. For each job, add the functional, emotional and social dimensions where the interviews show them, and the success criteria the person uses to judge progress (faster, cheaper, less risk, looks good to their boss).
3. Map the forces of progress, each with participant ids and short verbatim quotes:
   - Push: what about the current situation became unbearable.
   - Pull: what attracted them to the new way.
   - Anxiety: what worried them about switching.
   - Habit: what kept them attached to the old way.
4. Reconstruct the switching timeline where the data allows: first thought, passive looking, event that triggered active looking, deciding, first use, and ongoing use or abandonment. Note the triggering events, because those are where marketing and onboarding can meet people.
5. List the competing alternatives people actually used or considered, including spreadsheets, hiring someone, a workaround and doing nothing.
6. Draw implications for product, onboarding and messaging, each tied to a force or job.
</task>

<constraints>
- Every job, force and alternative cites participant ids. Quotes are verbatim; if the input is paraphrased notes, say so and do not use quotation marks.
- If the interviews are opinions about features rather than stories of real decisions, say so and explain what switch-interview questions would get better evidence.
- Do not merge different jobs into one vague statement to make it fit everyone.
- Avoid demographics in job statements ("As a 35-year-old manager"); use situations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Job statements
For each job: the job story, then bullets for functional, emotional and social dimensions and success criteria, with participant ids.

## Forces of progress
A 2x2 table (push, pull, anxiety, habit) per job, each cell with bullets, ids and quotes.

## Switching timeline
Numbered stages with what happened and the triggering events, or "Not enough data".

## Competing alternatives
Table: alternative | who used it | why it was hired or fired.

## Implications
Bullets grouped under product, onboarding and messaging.

## Evidence gaps
Bullets.
</output_format>
