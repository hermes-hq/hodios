---
schema: 1
id: plan-branded-podcast
kind: prompt
title: Plan a branded podcast
description: Plans a podcast for a small business, nonprofit or institution that people would choose to hear, with audience, a non-advert format, sustainable cadence, hosts, success measures and an exit plan.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
subject: [nonprofit]
inputs: [notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [branded-content, organisational-podcast, editorial-value, success-measures, show-concept]
pairs_with:
  prompts: [launch-podcast, plan-podcast-season, read-podcast-listener-stats]
  personas: [podcast-producer]
args:
  - name: organisation
    description: Who you are, what you do, who you serve, your voice and any constraints (approvals, regulated topics, who can speak publicly).
    type: text
    required: true
  - name: goals
    description: What the podcast should achieve, for example trust with a niche audience, recruiting, donor relationships, member education. Say what "worth it" would look like in a year.
    type: text
    required: true
  - name: resources
    description: People, hours per month, budget and existing assets (experts, stories, archive, a newsletter). Leave empty if unknown.
    type: string
output_contract:
  format: markdown
  sections: [Audience and promise, Format options, Recommended show, Cadence and team, Approval and editorial rules, Success measures, Exit plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help organisations plan podcasts that people choose to hear. Most branded podcasts fail because they are made for the organisation instead of a listener: the audience is "everyone", every episode is an interview with a manager, the brand message appears every three minutes, approvals strip out anything interesting, and the team commits to a weekly show that dies by episode eleven. They also measure only downloads, which for a niche audience will look small even when the show is doing its job.

A branded show works when it serves a specific listener with something they cannot easily get elsewhere (access, expertise, stories), the organisation's role is clear but light, the cadence fits real capacity, and success is measured against the goal.

<organisation>
{{organisation}}
</organisation>

{{#resources}}Resources: {{resources}}{{/resources}}
</context>

<task>
<goals>
{{goals}}
</goals>

1. Audience and promise: define one primary listener (role, situation, what they want), where they already listen, and the show's promise in one sentence written from their side.
2. Format options: three distinct formats suited to the organisation's assets (for example field stories from the people you serve, an expert answering listener problems, a limited narrative series on one question, conversations between peers), each with an example episode title, why listeners would choose it, and the effort per episode.
3. Recommended show: pick one, with a working name idea, length, structure of a typical episode, and how the organisation shows up (who hosts, how it is credited, where a call to action goes, no more than one short mention per episode).
4. Cadence and team: a season model (for example eight episodes recorded before launch) or a cadence that fits the stated hours; roles (host, producer, editor, approver) and hours per episode; what to outsource if budget allows.
5. Approval and editorial rules: who approves what and by when, what is off limits (regulated claims, client confidentiality, political topics), consent for people telling their stories, and a rule that keeps editing honest.
6. Success measures tied to the goals: for example the right listeners (survey, sign-ups), use by the team (sales or onboarding sharing episodes), relationships (guest and donor responses), and downloads only as a supporting number.
7. Exit plan: when and how to end or pause the show (after a season review against measures), and how to keep the archive useful.
</task>

<constraints>
- No format that is a disguised advert; any paid or promotional segment is labelled.
- Do not invent audience data, benchmarks or costs; use placeholders and say what to check.
- For regulated sectors (health, finance, legal, public bodies), note that claims need the organisation's compliance or legal review before release.
- If goals or audience are vague, ask two or three sharp questions and give a provisional plan.
</constraints>

<output_format>
## Audience and promise
## Format options
Table: Format | Example episode | Why listeners choose it | Effort.
## Recommended show
## Cadence and team
Table: Role | Person or type | Hours per episode.
## Approval and editorial rules
Bullets.
## Success measures
Table: Goal | Measure | How to collect | Review date.
## Exit plan
</output_format>
