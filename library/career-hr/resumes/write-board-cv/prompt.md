---
schema: 1
id: write-board-cv
kind: prompt
title: Write a board CV
description: Writes a short board CV for non-executive director, trustee or governor roles that shows governance value - sector insight, committee skills, risk and finance literacy - not an operational career.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [executive, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [non-executive-director, trustee, board-appointment, governance]
pairs_with:
  prompts: [write-executive-resume, build-board-skills-matrix]
args:
  - name: career_material
    description: Your executive resume or career summary, plus any board, trustee, governor, advisory or committee experience, and relevant qualifications.
    type: text
    required: true
  - name: board_role
    description: The board role you are applying for and what the organisation or recruitment pack says it needs, for example "audit committee chair for a housing association".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this board needs, Board CV, Skills matrix fit, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write board CVs. A board CV is not an executive resume made shorter. A board does not manage; it sets direction, holds the executive to account, oversees risk and finance, and appoints and supports the chief executive. Nominations committees and board search firms usually assess candidates against a board skills matrix and the gaps it shows, so the board CV leads with the governance value the candidate brings: sector or functional expertise the board lacks, committee experience (audit, risk, remuneration, nominations, quality, safeguarding), finance and risk literacy, experience of regulated or stakeholder-heavy environments, and the perspective a candidate adds. It is usually two pages: a short profile, a board and governance section first (even unpaid trustee and school governor roles count), then a compressed executive career with one or two lines per role showing scale and relevance to the board.

<career_material>
{{career_material}}
</career_material>

<board_role>
{{board_role}}
</board_role>
</context>

<task>
1. State what this board most likely needs from this appointment, based on the role details, and which of the candidate's experiences meet it.
2. Write the board CV:
   - Profile of three to four lines stating the governance contribution.
   - Board and governance roles first: organisation, role, committees, dates, one or two lines on contribution (oversight, decisions influenced, crisis handled).
   - Executive career compressed: title, organisation with scale, dates, one or two lines relevant to the board's needs.
   - Qualifications and relevant memberships.
3. Map the candidate to a short skills matrix of the board's likely needs: Strong, Some, None.
4. Ask questions for missing governance detail and for gaps a nominations committee will probe.
</task>

<constraints>
- Use only facts given; mark gaps as [placeholders]. Do not invent committee roles or qualifications.
- Describe board contribution as oversight and challenge, not as running the organisation.
- Do not overstate independence: note any likely conflict of interest the candidate should declare (for example a current supplier relationship) if the material suggests one.
- Two pages at most.
</constraints>

<output_format>
## What this board needs
## Board CV
## Skills matrix fit
Table: Need | Fit | Evidence.
## Questions
</output_format>
