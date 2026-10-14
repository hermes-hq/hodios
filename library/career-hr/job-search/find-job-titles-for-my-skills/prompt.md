---
schema: 1
id: find-job-titles-for-my-skills
kind: prompt
title: Find job titles for my skills
description: Maps someone's skills and experience to the job titles and search keywords employers actually use, including adjacent titles they would miss, with the level each title fits.
category: job-search
version: 1.0.0
status: incubating
stage: [discover]
role: [job-seeker]
requires: [none]
inputs: [resume, text]
output: [table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [job-titles, keywords, transferable-skills, targeting, career-pivot]
pairs_with:
  prompts: [write-job-board-search-queries, analyze-job-posting, plan-job-search]
  personas: [career-coach]
args:
  - name: experience
    description: Your resume, or a summary of your roles, main tasks, tools, achievements and the industries you have worked in.
    type: text
    required: true
  - name: interests
    description: Optional - kinds of work you want more or less of, and anything you will not do.
    type: text
  - name: location
    description: Country or region you are searching in, since titles differ between countries and sectors.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What your experience says, Direct-fit titles, Adjacent titles, Stretch titles, Search keywords, Titles to avoid, How to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who has written and read thousands of job ads. People miss roles they are qualified for because the same work goes by different titles in different sectors, company sizes and countries (an "operations coordinator" at a start-up may be a "business support officer" in government; "customer success", "account management" and "client services" overlap heavily), and because their own job title understates or overstates what they did. Seniority words also mean different things: "manager" may or may not mean managing people, and "lead", "senior", "principal" and "head of" vary by company. Searching only for your current title shrinks the market; searching for titles you cannot evidence wastes applications.

<experience>
{{experience}}
</experience>
Location: {{location}}
{{#interests}}
<interests>
{{interests}}
</interests>
{{/interests}}
</context>

<task>
1. What your experience says: summarise the real work done (functions, scope, level, tools, domain) in recruiter language, separate from the person's official titles. Note where their title undersells or oversells the work.
2. Direct-fit titles: 4 to 8 titles a recruiter in {{location}} would use for roles this person can apply to now, with the level each fits and the evidence from their experience that supports it.
3. Adjacent titles: 4 to 8 titles in neighbouring functions or sectors where most of the experience transfers, with what transfers and the one gap to address or explain.
4. Stretch titles: 2 to 4 titles one step up or across, with what would make the application credible.
5. Search keywords: skills, tools and phrases from this person's experience that job ads in these titles commonly use, for use in job-board searches and on the resume. Include common variants and abbreviations.
6. Titles to avoid: titles that look similar but usually mean something different (for example sales-heavy roles behind a "consultant" title) or require a credential the person does not have.
7. How to check: a quick method to confirm each title is right: read 10 current postings for it and count how many must-haves the person meets, and look at people with that title on professional networks to compare backgrounds.
</task>

<constraints>
- Use only the experience given. Do not credit skills, tools or credentials the person did not mention.
- Do not quote salaries or demand figures; if useful, say how to check pay for each title locally.
- Title conventions differ by country and sector; note when a title is region-specific.
- Respect the stated interests and exclusions.
- Be honest when the experience points to a different level than the person expects.
</constraints>

<output_format>
## What your experience says
## Direct-fit titles
Table: Title | Level | Evidence from your experience.
## Adjacent titles
Table: Title | What transfers | Gap to address.
## Stretch titles
Table: Title | What would make it credible.
## Search keywords
Grouped lists: skills, tools, phrases.
## Titles to avoid
## How to check
</output_format>
