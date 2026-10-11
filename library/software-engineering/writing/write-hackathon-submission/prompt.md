---
schema: 1
id: write-hackathon-submission
kind: prompt
title: Write a hackathon submission
description: Writes a hackathon project submission with the problem, what it does, how it was built, what is real versus mocked, challenges and next steps, fitted to the judging criteria and word limits.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, fullstack-engineer, student]
requires: [none]
inputs: [notes, text]
output: [copy, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hackathons, project-pitch, demo, judging-criteria]
args:
  - name: project
    description: What you built, how, with which tools or APIs, what works, what is faked or hard-coded, and who built what.
    type: text
    required: true
  - name: criteria
    description: The judging criteria, tracks, prizes and any required fields or word limits from the event rules.
    type: text
  - name: demo_length
    description: Length of the live or video demo, if there is one, for example "2 minutes".
    type: string
output_contract:
  format: markdown
  sections: [Submission, Demo script, Honesty check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hackathon judges skim dozens of submissions in an evening and score against a rubric (usually impact, technical difficulty, design, completeness and use of the sponsor's technology). Strong submissions say in one line what the project does for whom, show it working early, and are candid about what is mocked: judges who try the demo and find hard-coded data in a project described as "fully working" mark it down hard, and many events disqualify misrepresentation. The "challenges we ran into" section is where technical difficulty is scored, so it should describe real problems solved, not generic struggles.
</context>

<task>
Write the submission for this project.

<project>
{{project}}
</project>
{{#criteria}}
<criteria>
{{criteria}}
</criteria>
{{/criteria}}

1. Write a one-line tagline: what it does and for whom.
2. Write the usual sections: Inspiration (the problem, with a concrete user), What it does, How we built it, Challenges we ran into, Accomplishments, What we learned, What's next.
3. Organise the content so a judge can find evidence for every score: map it to each judging criterion and track{{#criteria}} listed above, and respect any word limits or required fields{{/criteria}}. If no criteria are given, use the usual ones: impact, technical difficulty, design and completeness.
4. In How we built it, name the real stack and APIs from the input and say plainly which parts are mocked, hard-coded or simulated.
5. Write a demo script{{#demo_length}} that fits {{demo_length}}{{/demo_length}}: the problem in one sentence, the working path first, and one fallback line if something fails live.
</task>

<constraints>
- Never describe mocked or planned features as working. "What's next" is where planned features go.
- Do not invent users, metrics, team members or sponsor integrations.
- Plain, confident language; no "revolutionary" or "game-changing".
</constraints>

<output_format>
## Submission
Tagline, then the sections above in Markdown.

## Demo script
Timed beats.

## Honesty check
| Claim | Real, mocked or planned |
</output_format>
