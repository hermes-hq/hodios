---
schema: 1
id: build-self-study-curriculum
kind: prompt
title: Build a self-study curriculum
description: Builds a self-directed curriculum for learning a new field, with milestones, resource types, projects and checkpoints sized to the hours available. Use when teaching yourself a field.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, student, job-seeker]
requires: [none]
inputs: [topic, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [self-directed-learning, learning-roadmap, project-based-learning]
pairs_with:
  prompts: [create-study-plan, quiz-me-interactively]
  personas: [study-coach]
args:
  - name: field
    description: The field or skill to learn, e.g. "statistics for data analysis", "UX research", "music theory for guitarists".
    type: string
    required: true
  - name: current_level
    description: Optional starting point and goal, e.g. "know basic Excel, want an analyst job", "complete beginner, learning for fun".
    type: string
  - name: hours_per_week
    description: Realistic hours available each week.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Destination, Map of the field, Milestones, Weekly rhythm, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self-taught learners usually stall for the same reasons: they consume tutorials without producing anything, they jump to advanced topics before the foundations hold, they never test themselves, and they have no way of knowing whether they are making progress. A good self-study curriculum is a sequence of milestones defined by what the learner can do, each ending in a small project and a checkpoint, paced to the time they actually have.
</context>

<task>
Build a self-study curriculum for **{{field}}**{{#current_level}}, starting from: {{current_level}}{{/current_level}}, with {{hours_per_week}} hours per week.

1. Define the destination: what the learner will be able to do at the end, in two or three concrete sentences. If no goal was given, assume a solid working foundation for personal or entry-level professional use, and say so.
2. Map the field: the 5 to 8 core areas, which ones are foundations, and their prerequisite order. Name what is deliberately left out for later.
3. Plan 4 to 8 milestones. For each:
   - What the learner can do at the end (an observable capability).
   - Key concepts and skills.
   - Resource types to use (an introductory textbook chapter, a structured course, documentation, worked-example collections, practice problem sets, communities for feedback), with what to look for in a good one.
   - A small project that produces something real and uses the milestone's skills.
   - A checkpoint: a self-test the learner can run without help ("explain X without notes", "solve these 3 problem types", "build Y from scratch in under 2 hours"), with a pass criterion.
   - Estimated hours and the resulting number of weeks at {{hours_per_week}} hours per week.
4. Design the weekly rhythm: how to split the hours between learning, practice, project work and review, with spaced review of earlier milestones.
5. List the common pitfalls in this field and how to avoid them.
</task>

<constraints>
- Do not invent resource titles, authors or URLs. Name a specific resource only when it is long-established and widely known in the field, and tell the learner to check for the current edition. Otherwise describe the resource type.
- Be honest about time: if reaching the destination needs more than about a year at {{hours_per_week}} hours per week, say so and suggest a nearer first destination.
- If the field is ambiguous ("design", "AI"), pick the most likely meaning given the starting point, say which one in the first line, and name the alternatives.
- If the field involves physical risk or professional licensing (electrical work, medicine, aviation), say what can be self-taught safely and what requires formal training or supervision.
</constraints>

<output_format>
## Destination
2 to 3 sentences, plus total estimated hours and weeks.
## Map of the field
An indented list in prerequisite order, with "later" items marked.
## Milestones
For each milestone a heading "Milestone n: capability (weeks a to b)", then bullets for concepts, resources, project, checkpoint and hours.
## Weekly rhythm
A small table: Activity | Hours per week | Notes.
## Pitfalls
3 to 5 bullets.
</output_format>
