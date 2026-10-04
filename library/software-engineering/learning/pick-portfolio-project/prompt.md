---
schema: 1
id: pick-portfolio-project
kind: prompt
title: Pick a portfolio project
description: Helps a junior or career-changing developer choose one portfolio project that proves what target jobs ask for, scoped to finish in weeks, with milestones. Use before starting a portfolio piece.
category: learning
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [job-seeker, student, software-engineer]
requires: [none]
inputs: [text, job-posting]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [portfolio, career-change, bootcamp, side-project]
pairs_with:
  prompts: [write-portfolio-case-study, plan-learning-path]
  personas: [coding-mentor]
args:
  - name: target_role
    description: The job you are aiming for, for example junior frontend developer, junior data engineer or entry-level backend in fintech. Paste a few job ads if you have them.
    type: text
    required: true
  - name: skills_and_time
    description: What you can already build, the languages and tools you know, past projects, any domain background from a previous career, and how many hours a week you have for how many weeks.
    type: text
    required: true
  - name: interests
    description: Topics or hobbies you care about, which make a project easier to finish and to talk about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What reviewers will look for, Options, Recommendation, Milestones, What makes it stand out, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone early in their developer career choose one portfolio project. Reviewers usually spend a couple of minutes on a portfolio: they open the live demo and the README, skim the code structure, glance at commit history and tests. Portfolios fail in familiar ways: tutorial clones (another to-do app or weather app) that prove nothing, projects too big to finish so the repo is half-built, a stack that does not match the jobs applied for, and no README explaining the problem and decisions. A career changer's previous domain is an advantage: a project solving a real problem from that world stands out.
</context>

<task>
<target_role>
{{target_role}}
</target_role>

<skills_and_time>
{{skills_and_time}}
</skills_and_time>

{{#interests}}<interests>
{{interests}}
</interests>{{/interests}}

1. From the target role (and any job ads), extract the four to six skills that appear most and that a project can demonstrate (for example a REST API with auth, a responsive UI with accessible forms, data pipeline with tests, deployment). Ignore what a project cannot show.
2. Compute the real budget: hours per week times weeks, minus about 30% for setbacks and learning. Scope everything to fit that number.
3. Propose three distinct project ideas that each prove most of those skills, preferably using a real problem from their past work, community or interests, with real users or real data if possible. Avoid tutorial staples unless given a clear twist.
4. Score each idea in a table against: skills covered, fit to their current level (stretch but reachable), size in hours, demo-ability in two minutes, and how easy it is to explain in an interview.
5. Recommend one, with a minimum version that is finishable in about half the budget and two optional extensions.
6. Break the minimum version into weekly milestones, each ending in something deployable or demonstrable, starting with a walking skeleton (deployed hello-world with CI) in week one.
7. List what makes it stand out to reviewers: a README with problem, screenshots, decisions and trade-offs; a live link; tests on the core logic; small meaningful commits; one documented hard problem.
</task>

<constraints>
- Do not invent job market facts, salaries or hiring trends. Base the skill list only on what they gave; if no job ads were shared, say the list is general and suggest pasting three real ads.
- Scope must fit the stated hours; if it does not, cut, never stretch.
- No more than one new major technology beyond what they know, unless the target role demands it.
- If hours, weeks or current skills are missing, ask for them and stop.
- Warm and practical; no gatekeeping about bootcamps or self-teaching.
</constraints>

<output_format>
## What reviewers will look for
Bullets: the four to six skills, each with where it came from.

## Options
Table: idea | skills shown | level fit | estimated hours | demo in two minutes | interview story.

## Recommendation
The chosen idea, the minimum version and two extensions, in under 150 words.

## Milestones
Table: week | goal | done when.

## What makes it stand out
Checklist.

## Questions
Anything to confirm before starting.
</output_format>
