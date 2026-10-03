---
schema: 1
id: write-case-for-support
kind: prompt
title: Write a nonprofit case for support
description: Writes a nonprofit case for support - the need with evidence, the organisation's approach, its impact, what gifts make possible at each level and why now - plus short versions for reuse.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, writer, manager, executive]
subject: [nonprofit]
inputs: [text, document]
output: [docs, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [case-for-support, capital-campaign, major-gifts, gift-levels, theory-of-change]
pairs_with:
  prompts: [write-donor-appeal, write-grant-application, write-impact-report]
  personas: [nonprofit-advisor, grant-writer]
args:
  - name: organisation_info
    description: Who you are, whom you serve, what you do and how, results so far with figures and sources, staff and volunteers, finances in brief, and anything distinctive.
    type: text
    required: true
  - name: campaign_goal
    description: What you are raising money for - the amount, what it pays for, the timeframe, and whether it is a capital, programme or general campaign. Leave empty for a general case.
    type: text
  - name: evidence
    description: Data on the need (local statistics, research, waiting lists), evaluations, testimonials with consent, and partner endorsements, with sources and dates.
    type: text
output_contract:
  format: markdown
  sections: [Case for support, Gift table, Short versions, Evidence register, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a major-gifts and campaign fundraiser who writes cases for support. A case for support is the master argument from which every appeal, proposal, web page and conversation script is drawn. It answers the donor's questions in order: what problem, why it matters now, why this organisation, what exactly will happen with the money, what will change, and what role the donor plays. It is donor-centred ("you can"), specific rather than sentimental, and every claim can be traced to evidence. It is not a list of the organisation's activities or an annual report.
</context>

<task>
Write a case for support.

<organisation_info>
{{organisation_info}}
</organisation_info>
{{#campaign_goal}}
<campaign_goal>
{{campaign_goal}}
</campaign_goal>
{{/campaign_goal}}
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Case for support (about 800-1,200 words), in these parts:
   - Headline and opening: one sentence that states the change the donor can make, then a short, true story or picture of the need (from the evidence only).
   - The need: its scale and urgency with sourced evidence; the consequence of doing nothing.
   - Our approach: what the organisation does, why it works (a simple theory of change: activities lead to outputs lead to outcomes), and what makes it distinctive. Name partners where they matter.
   - Our impact so far: results with figures and sources; one short testimonial if supplied with consent.
   - The plan: what this campaign or the next period will achieve, with milestones and the total cost.
   - What your gift makes possible: concrete amounts linked to outcomes, using real unit costs from the information supplied.
   - Why now: a genuine reason for urgency (a match, a deadline, a waiting list, an opportunity), never manufactured.
   - Accountability: governance, how progress will be reported to donors.
   - The invitation: a clear ask and next step.
2. Gift table (for campaigns with a target): a standard pyramid where the top gift is about 10-20% of the goal and a small number of gifts make up most of it, showing number of gifts, gift size, prospects needed (typically 3-5 per gift at top levels) and cumulative total. Present it as a planning tool and say the shape should be checked against the organisation's actual prospect pool.
3. Short versions: a 100-word summary, a 3-sentence elevator version, and three key messages for conversations.
4. Evidence register: every claim in the case with its source; mark claims needing a source.
5. Gaps: missing information that would strengthen the case.
</task>

<constraints>
- Never invent statistics, results, unit costs, stories or quotes. If a number is needed and missing, insert `[EVIDENCE NEEDED: ...]` and list it under Gaps.
- Write about beneficiaries with dignity: no pity framing, no identifying details without consent, and people described as more than their need.
- Keep "you" (the donor) at the centre; reduce "we" and internal jargon.
- Urgency must be true; do not create false deadlines or exaggerate crisis.
- Plain language a newcomer can follow; short paragraphs designed to be lifted into other materials.
</constraints>

<output_format>
## Case for support
The full text with the part headings.
## Gift table
Table: Gift level | Number of gifts | Prospects needed | Subtotal | Cumulative. Omit if no target was given.
## Short versions
## Evidence register
Table: Claim | Source | Status (sourced or needed).
## Gaps
</output_format>
