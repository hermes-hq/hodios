---
schema: 1
id: plan-writing-workshop-minilesson
kind: prompt
title: Plan a writing workshop minilesson
description: Plans a 10 to 15 minute writing workshop minilesson (connection, teaching point, demonstration, active engagement, link) plus independent writing time and conferring prompts.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [english]
tags: [writing-workshop, minilesson, conferring, writing-instruction]
pairs_with:
  prompts: [plan-live-writing-model, write-annotated-exemplars, build-feedback-comment-bank]
args:
  - name: teaching_point
    description: The one writing skill or strategy to teach, e.g. "show feelings through actions instead of naming them", "use a counterclaim".
    type: string
    required: true
  - name: grade_level
    description: Grade or age.
    type: string
    required: true
  - name: unit
    description: The genre or unit the class is in, e.g. "personal narrative", "persuasive letter".
    type: string
    required: true
  - name: observations
    description: Optional notes on what students' current drafts show, so the lesson targets a real need.
    type: text
output_contract:
  format: markdown
  sections: [Teaching point, Minilesson script, Independent writing, Conferring and small groups, Share, Materials]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In writing workshop the minilesson is short (10 to 15 minutes) so most of the time goes to students writing their own pieces while the teacher confers. It follows a reliable architecture: Connection (link to prior work and name why this matters), Teach (state the teaching point as a strategy writers use, then demonstrate it on the teacher's own or a mentor text, thinking aloud), Active engagement (students try it briefly, often with a partner, on shared or their own text), and Link (send students off with the strategy added to their repertoire, not as a required task for today). Weak minilessons teach a topic instead of a strategy ("today we learn about adjectives"), run long, skip the active engagement, or give students a worksheet instead of applying the strategy in their own writing.
</context>

<task>
Plan a writing workshop session for **{{grade_level}}** in a **{{unit}}** unit, teaching: **{{teaching_point}}**.
{{#observations}}
What students' drafts currently show:
<observations>
{{observations}}
</observations>
{{/observations}}

1. Phrase the teaching point as a transferable strategy: "Today I want to teach you that writers... They do this by..." with clear steps.
2. Script the minilesson, 10 to 15 minutes total:
   - **Connection** (1 to 2 min): link to recent work, name the purpose.
   - **Teach** (4 to 5 min): demonstrate the strategy with a short teacher-written example or mentor passage you write (original text), thinking aloud at each step. Include a before and after.
   - **Active engagement** (3 to 4 min): a short task where students try the strategy with a partner or in their notebooks; say what the teacher listens for.
   - **Link** (1 min): restate the strategy and how students might use it today and in future, while continuing their own pieces.
3. Plan independent writing time: what students work on, the expectation, and a support (anchor chart wording, checklist) for students who need it.
4. Plan conferring: three conferring prompts for this strategy (research, decide, teach), likely student needs, and one small strategy group to pull and what to teach them.
5. Plan a 3 to 5 minute share that highlights one student example of the strategy.
6. List materials, including the anchor chart text.
</task>

<constraints>
- Write all demonstration and mentor text yourself; do not quote published books beyond a sentence, and do not attribute invented passages to real authors.
- Keep the minilesson to 15 minutes or less; teacher talk is not the main event.
- The teaching point is one strategy, not several.
- Language and examples suit the grade; for young writers, keep demonstration text short and oral rehearsal central.
</constraints>

<output_format>
## Teaching point
The strategy statement and steps.
## Minilesson script
Connection · Teach (with demonstration text, before and after) · Active engagement · Link, each with minutes.
## Independent writing
Task, expectations, supports.
## Conferring and small groups
Conferring prompts, likely needs, strategy group plan.
## Share
How the share runs.
## Materials
Including anchor chart text.
</output_format>
