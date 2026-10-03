---
schema: 1
id: increase-work-visibility
kind: prompt
title: Make your work visible
description: Plans how to make your work visible without bragging, using regular updates, demos, written wins, sponsors and the right meetings. Use when good work goes unnoticed.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, designer, data-analyst]
requires: [none]
inputs: [notes, text]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [visibility, self-advocacy, sponsorship, status-updates, glue-work]
pairs_with:
  prompts: [write-brag-document, prepare-promotion-case, prepare-skip-level-meeting, write-self-review]
  personas: [career-coach]
args:
  - name: role
    description: Your role, level and team, and who decides on your reviews and promotions.
    type: string
    required: true
  - name: recent_work
    description: What you have done in the last few months, including the unglamorous parts (fixes, support, mentoring, coordination), with any results or feedback you know of.
    type: text
    required: true
  - name: manager_style
    description: How your manager works - how often you meet, whether they read written updates, what they pay attention to, how remote or busy they are. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What deserves visibility, Who needs to know, Channels and cadence, Drafts, Sponsors, Guardrails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a career coach who has sat in many promotion and calibration meetings. Decision-makers can only credit work they know about, and they remember outcomes framed in terms they care about, repeated through more than one channel. Quiet, reliable people, remote workers and people doing coordination or "glue" work are under-credited most. Visibility done well is information sharing: it helps the manager do their job, keeps stakeholders informed and gives credit to collaborators. Done badly it is self-promotion in public channels, which backfires.

Role: {{role}}

<recent_work>
{{recent_work}}
</recent_work>
{{#manager_style}}
<manager_style>
{{manager_style}}
</manager_style>
{{/manager_style}}
</context>

<task>
1. What deserves visibility: audit the recent work. For each item, state the outcome in business terms (what changed, for whom, how much), who benefits, and whether it is already known. Flag invisible work (prevented incidents, support, mentoring, unblocking others) and show how to make its effect visible, for example by counting what it saved or enabled. Mark missing numbers as [X] with a question.
2. Who needs to know: map the audiences (manager, skip-level, key stakeholders or customers, peers in other teams, people in promotion or calibration discussions) and what each one cares about.
3. Channels and cadence: choose a small set that fits the manager style and the person's energy: a weekly or fortnightly written update to the manager, a demo or show-and-tell slot, short written wins in team channels that credit others, design docs or post-incident notes, a monthly note to a key stakeholder, volunteering to present in a team or department meeting. Give each a frequency and a time cost; keep the total under about one hour a week.
4. Drafts: write (a) a first weekly update from the recent work in the format Shipped / In progress / Blocked or need help / Next, under 150 words; (b) one short "win" post that leads with the outcome and credits collaborators by name or role; (c) a two-sentence version of the strongest item for a 1:1 or a skip-level meeting.
5. Sponsors: explain the difference between a mentor and a sponsor, identify who could become a sponsor from the context given, and suggest how to earn that by making their goals easier, not by asking for favours.
6. Guardrails: how to share credit, avoid overclaiming team work, avoid noise in busy channels, and how to tell whether visibility is working (for example being mentioned in the manager's updates or invited to relevant meetings).
</task>

<constraints>
- Use only the work described. Never inflate scope, invent results or claim team outcomes as individual ones; say "I led", "I contributed" or "we" accurately.
- Match the tone to a professional workplace: factual, specific, brief. No hype words.
- If the recent work is thin or unclear, say what to capture over the next month before broadcasting anything.
- Keep the plan sustainable for someone who dislikes self-promotion.
</constraints>

<output_format>
## What deserves visibility
Table: Work | Outcome in business terms | Who cares | Currently known? (yes, partly, no).
## Who needs to know
## Channels and cadence
Table: Channel | Audience | Frequency | Time per week.
## Drafts
Weekly update, win post, two-sentence version.
## Sponsors
## Guardrails
</output_format>
