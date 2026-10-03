---
schema: 1
id: choose-childcare
kind: prompt
title: Choose childcare
description: Compares childcare options such as nursery, childminder, nanny or family on true cost, hours, quality signs and fit, with visit questions, red flags and a timeline for securing a place.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [table, checklist, questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [childcare, nursery, daycare, childminder, nanny, return-to-work]
pairs_with:
  prompts: [prepare-for-new-baby, prepare-child-for-school, coordinate-family-calendar]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The child's age now and at the start date, for example "7 months now, starting at 11 months".
    type: string
    required: true
  - name: needs
    description: Days and hours, commute and work patterns, how much flexibility you need (shifts, late finishes, sick days), the child's needs (allergies, additional needs, siblings), and what matters to you (outdoor time, a home setting, a language).
    type: text
    required: true
  - name: budget
    description: What you can spend per month or week, with currency. Optional.
    type: string
  - name: location
    description: Country and area, so costs, regulators and help with costs fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What you need, Options compared, The true cost, Help with costs to check, Visit questions, Red flags, Decide, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents choose childcare with clear eyes. The options differ less in "quality" as a label than in fit: group settings (nurseries, daycare centres) offer reliability and social contact but close for illness and have fixed hours; home-based carers (childminders, family daycare) offer small groups and a home feel but depend on one person; nannies and au pairs offer flexibility and care for a sick child but make the parent an employer; relatives cost less in money and can cost more in relationships. The quality signs that matter most for young children are warm, responsive caregivers who stay (low staff turnover), small groups and good adult-to-child ratios, and a clean recent inspection by the regulator.

Child's age: {{child_age}}
{{#budget}}Budget: {{budget}}{{/budget}}
{{#location}}Location: {{location}}{{/location}}

<needs>
{{needs}}
</needs>
</context>

<task>
1. What you need: restate the must-haves (hours, days, flexibility, the child's needs) and the nice-to-haves in a few bullets, and flag any conflict (for example, a 7am start that most nurseries in many areas do not open for).
2. Options compared: for each realistic option (nursery or daycare centre, childminder or family daycare, nanny or nanny share, au pair if the child is old enough and the home suits, relatives, or a mix), rate fit against the stated needs: hours and flexibility, illness and holiday cover, group size and ratios, setting, continuity of carer, and what it asks of the parent.
3. The true cost: per option, the items to budget for beyond the headline fee: deposits, registration, holiday weeks charged anyway, late-pickup fees, meals and nappies, and, for a nanny, employer costs (tax, payroll, insurance, pension where required, holiday pay). Give rough monthly ranges only if a location is given, marked as estimates to check; otherwise give the formula.
4. Help with costs to check: the kinds of government support and employer schemes that often exist (funded hours, tax credits or tax-free accounts, vouchers, subsidies by income), as "check whether you qualify" with the official source to look at. If no location is given, list the types and ask for the country.
5. Visit questions: 12–15 questions grouped by care and routines, staff and turnover, safety and health, communication and settling in, and contract, plus what to observe during the visit (how carers talk to children, whether children seem engaged, cleanliness, outdoor space).
6. Red flags: signs to walk away (reluctance to let you visit or drop in, high turnover, no recent inspection or a poor one, vague answers on safeguarding, children left unattended or ignored).
7. Decide: a weighted scoring table for comparing the places visited, with the weights from the user's priorities.
8. Timeline: working back from the start date, when to join waiting lists, visit, decide, sign, and settle in (most settings recommend a gradual settling-in period of one to two weeks).
</task>

<constraints>
- Never invent provider names, prices or ratings. Name the regulator or inspection body only if you are confident of it for the given country (for example, Ofsted in England); otherwise say "your local childcare regulator".
- Ratios, licensing rules, funded hours and nanny employer duties vary by country and change; mark them as "typical, check locally".
- Respect the family's values and constraints without judging the choice to use, or not use, childcare.
- If the child has additional needs, add questions on experience, training, and how the setting works with therapists and plans.
- If the child's age or the hours needed are missing, ask; they decide which options are possible.
</constraints>

<output_format>
## What you need
## Options compared
Table: Option | Fits your hours? | Sick and holiday cover | Group size | Strengths | Watch out for.
## The true cost
## Help with costs to check
## Visit questions
Grouped lists, then "Watch for during the visit".
## Red flags
## Decide
Scoring table: Criterion | Weight | Place A | Place B | Place C.
## Timeline
</output_format>
