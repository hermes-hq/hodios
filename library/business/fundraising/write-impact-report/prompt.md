---
schema: 1
id: write-impact-report
kind: prompt
title: Write an annual impact report
description: Writes an annual impact report for a nonprofit or social enterprise - outcomes, stories, a financial summary and honest notes on what did not work - for donors or another audience.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, writer]
subject: [nonprofit]
inputs: [dataset, text, notes]
output: [report, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [impact-report, annual-report, outcomes, storytelling, transparency, social-enterprise]
pairs_with:
  prompts: [write-grant-report, write-case-for-support, write-donor-appeal]
  personas: [nonprofit-advisor]
args:
  - name: year_data
    description: The year's results - people served and outcomes with how they were measured, programmes, stories with consent noted, income and spending by category, milestones, setbacks, and plans for next year.
    type: text
    required: true
  - name: audience
    description: Who will read it (for example donors, funders, members, the local community, customers of a social enterprise), which sets tone and emphasis.
    type: string
    default: donors
  - name: length
    description: short is a 2-4 page digital report or long email; full is a complete annual impact report with all sections.
    type: enum
    enum: [short, full]
    default: short
output_contract:
  format: markdown
  sections: [Report, Design notes, Data gaps and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write impact reports for charities and social enterprises. The best ones make a supporter feel their contribution mattered and give them reasons to trust the organisation with more: they lead with change in people's lives rather than activity counts, show a small number of well-measured outcomes, tell one or two true stories that the numbers support, are open about money, and say honestly what did not work and what was learned. Readers skim, so the report has to work for someone who only reads headings, numbers and captions.
</context>

<task>
Write a {{length}} impact report for {{audience}}.

<year_data>
{{year_data}}
</year_data>

1. Choose the story of the year: from the data, the two to four outcomes that matter most to {{audience}}, and the single headline that ties them together. Prefer outcomes (changes for people) over outputs (activities and counts), but include key reach numbers.
2. Write the report. For `short`: a headline and opening line, the year in numbers (4-6 figures with plain labels), one story, what the money did (a simple income and spending summary), one honest "what we learned" paragraph, what is next, and a thank-you with a next step. For `full`, add: a message from the leader (in their voice, with placeholders for personal details), a section per programme with outcomes and how they were measured, more stories, a fuller financial summary with ratios explained plainly, partners and supporters, governance in brief, and next year's goals with measures.
3. What did not work: at least one specific shortfall, risk or mistake, with what changed as a result. Keep it factual and forward-looking.
4. Money: present income by source and spending by category, with the share spent on programmes, explained in plain words. Do not judge the organisation by overhead alone; explain what core costs make possible.
5. Tone for the audience: donors - "you made this possible", warm and specific; funders - more evidence and method; community or members - local, plain and participatory; social-enterprise customers - the link between purchases and impact.
6. Design notes: suggested visuals (one chart per key number at most, photos with consent), pull quotes and captions, and accessibility basics (alt text, contrast, plain language).
7. Data gaps and checks: missing data, numbers to verify, and consents to confirm.
</task>

<constraints>
- Use only the data given. Never invent figures, stories, quotes or outcomes; insert `[DATA NEEDED: ...]` and list it under Data gaps and checks.
- State how key outcomes were measured (survey, assessment, records) and avoid claiming the organisation alone caused a change when others contributed.
- Protect privacy: no names, faces or identifying details without recorded consent; extra care with children and people in vulnerable situations.
- Arithmetic must be right: totals, percentages and ratios.
- Plain language; no sector jargon such as "beneficiaries leveraged" or "holistic interventions".
</constraints>

<output_format>
## Report
The report text with headings, ready for design.
## Design notes
## Data gaps and checks
</output_format>
