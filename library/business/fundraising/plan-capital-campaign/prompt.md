---
schema: 1
id: plan-capital-campaign
kind: prompt
title: Plan a capital campaign
description: Plans a nonprofit capital campaign - a feasibility check, gift range chart, prospect needs, quiet and public phases, volunteer roles and a timeline.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, manager]
subject: [nonprofit]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [capital-campaign, gift-range-chart, feasibility-study, major-gifts, campaign-planning]
pairs_with:
  prompts: [write-case-for-support, plan-major-donor-cultivation, write-donor-thank-you]
  personas: [nonprofit-advisor]
args:
  - name: organisation
    description: The organisation, its annual budget and fundraising income, the size of its donor base and its largest past gifts, board giving, staff capacity for fundraising, and any past campaigns.
    type: text
    required: true
  - name: goal_amount
    description: The campaign goal and currency (for example "2.5 million GBP").
    type: string
    required: true
  - name: project
    description: What the money is for (building, renovation, endowment, equipment), the total cost and timing, money already secured, and why it matters to the people served.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Feasibility check, Gift range chart, Prospect needs, Campaign phases, Leadership and volunteer roles, Budget and staffing, Risks, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a campaign counsel who has planned capital campaigns for charities, schools, museums and community organisations. You know that capital campaigns are won or lost on a small number of large gifts secured quietly before the public launch; that the goal must come from what the top prospects can and will give, not from the project's cost; and that the board must give first and lead. You use the standard tools: a feasibility or planning study with interviews of top prospects, a gift range chart (the top gift commonly 10-20% of the goal, and roughly half or more of the goal from the top 10-20 gifts), a ratio of qualified prospects per gift needed, a quiet phase that raises a large share of the goal before announcing, and a public phase to close the gap.
</context>

<task>
Plan a capital campaign.

<organisation>
{{organisation}}
</organisation>

Goal: {{goal_amount}}

<project>
{{project}}
</project>

1. Feasibility check: compare the goal with the organisation's giving history (annual fundraising income, largest gifts, donor base size, board giving). Say whether the goal looks within reach, a stretch, or unrealistic on current evidence, and why. Recommend whether a formal feasibility study is needed, and list 8-12 questions to ask prospective top donors in feasibility interviews.
2. Gift range chart: build a chart for the goal: gift levels, number of gifts at each level, prospects needed per gift (state the ratio used, commonly 3-5 qualified prospects per gift at the top and lower ratios further down), subtotal and cumulative total and percentage. Use a top gift of 10-20% of the goal and state the choice. Show that the totals sum to the goal.
3. Prospect needs: compare the chart with what the organisation reported (for example how many donors have given at the top levels). Name the gaps, and how to find prospects: board and volunteer networks, existing major donors, foundations and trusts, companies, public funding, and wealth screening of the database.
4. Campaign phases: planning; leadership gifts from the board and campaign committee; quiet phase with major gift solicitation until a stated share of the goal is committed (commonly 50-70%); public launch; public phase with broad appeals, events and naming opportunities; close and stewardship. For each phase: duration, activities, milestones and who leads.
5. Leadership and volunteer roles: campaign chair, campaign committee, board, chief executive, development staff, volunteer solicitors, with what each does and the time it takes. Board giving expectation: 100% participation at meaningful personal levels.
6. Budget and staffing: campaign costs to plan for (staff, counsel, database, materials, events, donor recognition), as categories with placeholders, and the effect on core fundraising, which must not collapse during the campaign.
7. Risks: for example over-reliance on one donor, staff turnover, rising construction costs, donor fatigue in annual giving, pledges paid over years; with a mitigation for each.
8. Next steps: the first 90 days.
</task>

<constraints>
- Never invent donor names, gift amounts, wealth data or benchmarks as facts. The ratios above are common rules of thumb; label them so.
- Arithmetic in the gift range chart must be exact, with totals equal to the goal.
- Be candid if the goal is far beyond the organisation's giving history; suggest a smaller goal, a longer timeline or a phased project.
- Recommend that pledge agreements, naming rights terms and gift acceptance policies be reviewed by the organisation's lawyer or accountant.
- If key facts are missing (largest past gifts, board giving, donor base size), list them and state assumptions.
</constraints>

<output_format>
## Feasibility check
## Gift range chart
Table: Gift level | Gifts needed | Prospects needed | Subtotal | Cumulative | Cumulative % of goal.
## Prospect needs
## Campaign phases
Table: Phase | Duration | Key activities | Milestone | Lead.
## Leadership and volunteer roles
## Budget and staffing
## Risks
Table: Risk | Mitigation.
## Next steps
</output_format>
