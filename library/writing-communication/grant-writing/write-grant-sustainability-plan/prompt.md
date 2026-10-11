---
schema: 1
id: write-grant-sustainability-plan
kind: prompt
title: Write the sustainability section of a grant proposal
description: Writes the sustainability or exit section of a grant proposal, saying what continues after the grant, how it is paid for and what ends, with income assumptions a reviewer can believe.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, executive, founder]
requires: [none]
inputs: [text, notes, document]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sustainability-plan, exit-strategy, income-diversification, funder-criteria, continuation-funding]
pairs_with:
  prompts: [write-grant-application, plan-grant-match-funding, write-grant-evaluation-plan]
  personas: [grant-writer]
args:
  - name: project
    description: What the grant will fund, for how long, what it will produce or change, and its annual running cost after set-up.
    type: text
    required: true
  - name: organisation_finances
    description: The organisation's income mix, reserves, earned income, contracts, partners who might take over activities, and any real commitments already made.
    type: text
    required: true
  - name: funder_guidance
    description: What the funder asks for in this section and the word limit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sustainability section, What continues, Income assumptions, Weak points, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer who has also sat on funding panels. Reviewers stop believing a sustainability section the moment it says "we will seek further funding from other sources". Credible sections separate different kinds of sustainability: financial (named income that will cover named costs, such as a contract, earned income, a partner absorbing the activity, or moving the cost into the core budget), organisational (skills, systems, materials and volunteers that remain), and outcome sustainability (changes that last for people without further funding, such as qualifications, peer networks, or a policy change). They are honest that some activities will end, and they explain a planned exit or a scaled-down version rather than implying the project will run forever. Commitments are stated only when they are real, and assumptions are visible.

<project>
{{project}}
</project>

<organisation_finances>
{{organisation_finances}}
</organisation_finances>
{{#funder_guidance}}
<funder_guidance>
{{funder_guidance}}
</funder_guidance>
{{/funder_guidance}}
</context>

<task>
1. Sort the project into components (for example staff role, delivery sessions, equipment, training resources, partnerships) and decide for each whether it continues, continues in a smaller form, is absorbed by a partner, or ends, and why.
2. For each continuing component, name the source that will pay for it after the grant, the amount needed per year, and the status of that source (secured, in discussion, assumption).
3. Describe outcome sustainability: what benefits remain for people and the community even if delivery stops.
4. Describe organisational sustainability: what capacity the grant leaves behind.
5. Write the sustainability section within the funder's limit (default about 300 to 400 words), in the funder's terms, with a clear exit or transition plan and the milestones by which the organisation will know whether continuation funding is on track.
6. Weak points: where a reviewer would doubt the plan (one funder, untested earned income, a partner without a written commitment) and how to strengthen each before submitting.
7. Gaps: missing facts, marked [NEEDED: ...].
</task>

<constraints>
- Never state that income is secured or that a partner has committed unless the input says so; label assumptions as assumptions.
- Do not invent income figures, contracts or partners.
- Do not promise the project will continue indefinitely; a planned ending is acceptable and should be stated plainly.
- Stay within the word limit and report the approximate count.
</constraints>

<output_format>
## Sustainability section
With approximate word count against the limit.
## What continues
Table: Component | After the grant | Paid by | Amount per year | Status.
## Income assumptions
## Weak points
## Gaps
</output_format>
