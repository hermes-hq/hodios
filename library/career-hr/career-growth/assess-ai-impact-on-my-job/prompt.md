---
schema: 1
id: assess-ai-impact-on-my-job
kind: prompt
title: Assess how AI affects your job
description: Breaks a job into its tasks, judges which ones AI tools are likely to change and how confidently, and plans skills to deepen, tasks to hand to tools and ways to show value, without hype or doom.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker]
requires: [none]
inputs: [text]
output: [table, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ai-at-work, future-of-work, task-analysis, upskilling, automation-exposure]
pairs_with:
  prompts: [build-development-plan, plan-career-path, write-brag-document, increase-work-visibility]
  personas: [career-coach]
args:
  - name: job_title
    description: Your job title and level, for example "mid-level paralegal" or "senior bookkeeper".
    type: string
    required: true
  - name: tasks
    description: Your main weekly tasks with a rough share of time for each if you can, for example "drafting contract summaries 30%, client calls 20%, filing and admin 25%, research 25%". Include anything that needs judgement, sign-off, physical presence or relationships.
    type: text
    required: true
  - name: industry
    description: The industry and kind of employer, for example "mid-size law firm", "NHS hospital", "e-commerce startup". Regulation and client expectations change how fast tools are adopted.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Task map, What this means for your role, Skills to deepen, Tasks to hand to tools, How to show your value, Signals to watch, 30-day plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most writing about AI and jobs talks about whole occupations: "accountants will be replaced" or "nothing will change". Both are unhelpful, because AI tools change tasks, not job titles. A useful assessment splits the job into its actual tasks, asks for each one what current tools can do reliably, where they still need a human, and what slows adoption in this industry (regulation, liability, client trust, data access, cost of mistakes). Exposure of a task is not the same as losing the job: when a task gets cheaper, demand for the role can fall, stay the same or grow, and the work often shifts towards judgement, relationships and responsibility.

Job: {{job_title}}
Industry: {{industry}}
<tasks>
{{tasks}}
</tasks>
</context>

<task>
1. If the tasks are too vague to assess (for example "admin and meetings"), ask up to three short questions about what the person actually produces, decides and who they deal with, and stop until they answer.
2. Task map: split the job into six to twelve concrete tasks with their share of time. For each, classify:
   - Automate: a tool can do most of it today with a human checking the result.
   - Augment: a tool makes the person faster or better, but judgement, context or accountability stays human.
   - Human core: depends on trust, physical presence, tacit knowledge, negotiation, care, or legal or professional accountability.
   Give a confidence (low, medium, high) and a one-line reason, and note what in {{industry}} speeds up or slows down adoption for that task.
3. What this means for your role: an honest paragraph on how the mix of the job is likely to shift, roughly what share of time sits in each class, and the realistic range of outcomes. Separate what is happening now from what is speculative.
4. Skills to deepen: three to five skills that grow in value as the automatable tasks shrink, tied to specific tasks in the map, each with one practical way to build it.
5. Tasks to hand to tools: two to four tasks to try a tool on first, with a small safe experiment for each, how to check the output, and a reminder to follow the employer's AI and data policy before using any tool with work material.
6. How to show your value: how to measure and communicate time saved, quality gained, or new work taken on, so the change is visible to their manager.
7. Signals to watch: concrete signs over the next six to twelve months that the picture is changing faster or slower in their field.
8. 30-day plan: four weekly actions.
9. Before answering, check each task classification against its stated reason and confidence, and remove any claim you cannot support.
</task>

<constraints>
- No hype and no doom. Do not say the job is "safe" or "doomed". Say what is likely, what is uncertain, and why.
- Do not quote statistics, studies or forecasts unless the person supplied them; describe general patterns instead and mark uncertainty.
- Describe tools by what they do (drafting assistant, transcription, document search, code assistant), not by product or vendor names, so the advice stays useful as products change.
- Never suggest putting confidential client, patient or company data into a tool without checking policy and permission.
- Stay with the person's actual tasks. Do not pad the map with generic tasks they did not mention.
- If the person seems anxious about losing their job, acknowledge it briefly and keep the plan practical.
</constraints>

<output_format>
## Summary
Three sentences: the likely shift, the confidence, the main move to make.
## Task map
Table: Task | Share of time | Class (Automate / Augment / Human core) | Confidence | Why | Industry factor.
## What this means for your role
## Skills to deepen
Numbered, each linked to tasks in the map.
## Tasks to hand to tools
Table: Task | Experiment | How to check the output.
## How to show your value
## Signals to watch
## 30-day plan
Week 1 to Week 4.
</output_format>
