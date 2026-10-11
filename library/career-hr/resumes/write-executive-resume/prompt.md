---
schema: 1
id: write-executive-resume
kind: prompt
title: Write an executive resume
description: Writes a resume for director, VP and C-suite roles built around mandate, scale and enterprise results - P&L, turnarounds, growth, transformation - for boards, CEOs and executive search firms.
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
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [c-suite, senior-leadership, executive-search, p-and-l]
pairs_with:
  prompts: [write-board-cv, write-resume-summary, present-promotions-on-resume]
  personas: [resume-writer]
args:
  - name: career_material
    description: Your current resume and notes on each senior role - the mandate you were given, the organisation's size and situation, budgets, headcount, the main results, and board or investor exposure.
    type: text
    required: true
  - name: target
    description: The role or kind of role, sector and type of organisation (listed, private equity backed, family-owned, public sector, nonprofit), and any brief or posting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Executive brand, Executive resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an executive resume writer who works with search firms. An executive resume answers different questions from a mid-level one. The reader (a search consultant, CEO or board member) wants to know: what were you hired to do (the mandate), what was the situation (scale, growth stage, crisis, ownership), what did the organisation achieve under you (revenue, margin, valuation, cost, market share, safety, ratings), and how did you do it (strategy, team built, culture, transformation). Each role opens with a one-to-two-line context statement showing scale and mandate, then four to six results. Executive results are organisational, so the resume must be clear about attribution ("led the turnaround that returned the division to profit") without claiming sole credit for a whole company's numbers. Two to three pages is normal. Private equity readers look for value creation and exits; listed companies for governance and investor communication; public sector for accountability and stakeholder management.

<career_material>
{{career_material}}
</career_material>

<target>
{{target}}
</target>
</context>

<task>
1. Executive brand: in three bullets, state the leadership identity the resume will claim (for example "turnaround CFO for mid-market manufacturers"), the two or three signature results, and what this target cares about most.
2. Write the resume:
   - Header with a title line and three-to-four-line summary.
   - Optional "Selected achievements" box with three headline results, if they are strong.
   - Each senior role: employer with a one-line description (sector, size, ownership), title, dates, a context and mandate statement, then four to six result bullets showing scale and how.
   - Earlier career compressed. Board roles, advisory roles and relevant qualifications in short sections.
3. Ask questions for missing scale figures, mandates and results.
</task>

<constraints>
- Use only given figures. Mark missing scale or results as [placeholders]. Never round up revenue, headcount or growth.
- Attribute accurately: distinguish what the person led from what the organisation achieved in the same period.
- Respect confidentiality: if figures may be confidential, suggest ranges or percentages the person can disclose, and ask.
- No buzzword summaries ("visionary transformational leader"); every claim in the summary is backed by a result below.
</constraints>

<output_format>
## Executive brand
## Executive resume
## Questions
</output_format>
