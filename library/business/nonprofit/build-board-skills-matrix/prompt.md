---
schema: 1
id: build-board-skills-matrix
kind: prompt
title: Build a board skills matrix
description: Builds a skills and diversity matrix for a nonprofit board from members' profiles and the strategy, finds the gaps that matter, and turns them into a recruitment brief and a rotation plan.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, manager]
requires: [none]
inputs: [notes, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [board-recruitment, trustees, governance, skills-audit, succession]
pairs_with:
  prompts: [run-board-self-assessment, write-trustee-induction-pack]
  personas: [nonprofit-advisor]
args:
  - name: board_members
    description: Each current board member by initials or role, with skills, experience, lived experience, term start and end date, and any office held (chair, treasurer). No personal data beyond what the board has agreed to share.
    type: text
    required: true
  - name: strategy
    description: The organisation's purpose, size and the main goals or risks for the next three years, for example a new service, a capital project, a funding shift or a regulator review.
    type: text
    required: true
  - name: country
    description: Country and legal form, for example "registered charity in Scotland" or "US 501(c)(3)". Optional; changes terms and any legal minimums.
    type: string
output_contract:
  format: markdown
  sections: [What the next three years need, Skills matrix, Gaps that matter, Term and succession risks, Recruitment brief, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a chair or chief executive renew a nonprofit board. Most boards recruit from their own networks, which reproduces the board they already have: plenty of goodwill, too few people who can read accounts, challenge a risk register or bring the view of the people the organisation serves. A useful skills matrix starts from what the next three years demand, not from a generic list of 25 skills. It scores depth honestly (a member who once sat on a finance committee is not a finance expert), counts lived experience and community connection as real expertise, and looks at term end dates, because three trustees leaving in the same year is a bigger risk than one empty column.

Board members: {{board_members}}
Strategy and risks: {{strategy}}
{{#country}}Country and legal form: {{country}}{{/country}}
</context>

<task>
1. From the strategy, name the 8 to 12 competencies the board most needs in the next three years, each with one line on why. Always include financial oversight, legal and governance, safeguarding or risk where the organisation works with vulnerable people, fundraising or income strategy, and the perspective of the people served.
2. Build the matrix: one row per member, one column per competency, scored 0 (none), 1 (working knowledge), 2 (professional depth). Add columns for term end date and diversity dimensions the board has chosen to track. Where the profile does not support a score, mark it "?" rather than guessing.
3. Identify the gaps that matter: competencies with no 2, competencies held by only one person, and any column that will empty when terms end. Rank them by the risk to the strategy.
4. Flag term and succession risks: officers with no successor, members past the maximum term in the governing document, clusters of departures, and whether the board's size suits the organisation.
5. Write a recruitment brief for the top two or three gaps: the role, the skills needed, the time commitment, where to look beyond existing networks (open advertising, trustee-matching services, professional bodies, the communities served), and how to make the role accessible (expenses, meeting times, papers in plain language).
6. List the questions only the board can answer.
</task>

<constraints>
- Score only from the information given. Do not invent members' backgrounds or credentials.
- Treat lived experience of the issue the organisation works on as expertise and say how to support such trustees well, not as a token seat.
- Rules on board size, terms, paid trustees and who may serve vary by country and governing document. Name your assumption and say to check the governing document and the regulator's guidance.
- Do not suggest recruiting someone in order to secure their personal donation or contacts without saying how that affects independence.
- Keep personal data minimal; use initials or roles.
</constraints>

<output_format>
## What the next three years need
Bullets: competency - why.
## Skills matrix
Table: Member | competencies (0, 1, 2 or ?) | Term ends.
## Gaps that matter
Ranked list with the risk each gap creates.
## Term and succession risks
## Recruitment brief
One short brief per gap: Role | Skills | Time | Where to look | Access.
## Open questions
</output_format>
