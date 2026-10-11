---
schema: 1
id: find-a-sponsor
kind: prompt
title: Find a sponsor
description: Plans how to earn a senior sponsor who will put your name forward in rooms you are not in - who to target, how to get on their radar with work they care about and how to ask.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sponsorship, advocacy, career-visibility, senior-leaders]
pairs_with:
  prompts: [find-mentor, increase-work-visibility, prepare-skip-level-meeting]
  personas: [career-coach]
args:
  - name: goal
    description: What you want a sponsor to help with (a promotion, a stretch role, a move into another area, being considered for leadership) and your timeline.
    type: text
    required: true
  - name: landscape
    description: Your role and track record, the senior people you know or could reach, what they care about, and any existing relationships.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Mentor or sponsor, Who could sponsor you, Earn it, Get on their radar, The ask, Keep it working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people find sponsors. A mentor gives advice; a sponsor spends their own reputation to advocate for you: putting your name forward for roles, defending you in calibration or promotion meetings, and opening doors. Because it costs them something, sponsorship is earned through work they have seen and trust, not requested cold. Sponsors are usually one or two levels up, have a seat in the decisions you care about, and benefit from your success (you solve their problems, you make them look good at spotting talent). Sponsorship often decides who is considered for senior roles and it is unevenly distributed, so people without natural access need a deliberate plan. The typical failure is asking a senior person who barely knows your work to "be my sponsor".

<goal>
{{goal}}
</goal>
<landscape>
{{landscape}}
</landscape>
</context>

<task>
1. Mentor or sponsor: in two or three sentences, explain the difference for their goal and whether they need a sponsor, a mentor or both now.
2. Who could sponsor you: list candidates from the landscape, rated on influence over the decisions that matter, exposure to their work, and how much the person's priorities overlap with what they do. Pick one or two to focus on, and note that their manager may be the first sponsor to activate.
3. Earn it: what work would be valuable to each candidate (a problem they care about, a project in their area, a contribution to their goals), and how to deliver it visibly with results.
4. Get on their radar: specific, natural ways to create contact (presenting results in their forum, a short update on work that touches their goals, asking a smart question after their talk, volunteering for their initiative), with a cadence that is not pushy.
5. The ask: once trust exists, how to make a specific request ("I'm aiming for X; would you be willing to put my name forward / give me feedback on my readiness?"), with a script, and how to make it easy to say no.
6. Keep it working: how to update a sponsor, make them look good, close the loop when they help, and maintain the relationship over time.
</task>

<constraints>
- Do not suggest flattery, favours that compromise integrity, or using personal relationships improperly.
- Do not invent people or their interests; work from the landscape given and label inferences.
- Be honest about timelines: sponsorship usually takes months of visible work.
- If their track record is thin, say what to build first.
</constraints>

<output_format>
## Mentor or sponsor
## Who could sponsor you
Table: Candidate | Influence | Exposure to your work | Overlap | Focus?
## Earn it
## Get on their radar
## The ask
Script.
## Keep it working
</output_format>
