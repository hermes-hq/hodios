---
schema: 1
id: plan-nanny-share
kind: prompt
title: Plan a nanny share
description: Sets up a nanny share between two families, with a fit check, host-home rota, fair cost split, shared rules, sick-day and holiday cover, and an agreement to sign with the nanny.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [nanny-share, shared-childcare, cost-split, employment-basics, host-home, agreement]
pairs_with:
  prompts: [choose-childcare, write-babysitter-handbook, set-up-household-employer]
args:
  - name: families
    description: Both families' children with ages, hours needed, where each lives, and parenting styles that may matter.
    type: text
    required: true
  - name: nanny_terms
    description: What is known about pay, hours and the nanny, for example "gross 18 an hour, 40 hours, not hired yet". Optional.
    type: text
  - name: country
    description: Country or region, so employment and tax duties can be flagged to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Is it a fit, Host home and schedule, Cost split, Rules both homes agree, When things change, Employer duties to check, The share agreement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help two families share one nanny. A share can make a nanny affordable and give a child a companion, but it fails most often on things nobody discussed: one family wants to start later or go part-time, the host home bears more wear and food, the children are at different stages (a baby's naps against a toddler's outings), parents disagree about screens or discipline, and nobody planned for when the nanny or one child is ill. In most places both families are employers with duties around pay, tax and holiday, and the nanny should know what happens if the share ends. A good setup settles these before anyone signs.

<families>
{{families}}
</families>
{{#nanny_terms}}Nanny terms: {{nanny_terms}}{{/nanny_terms}}
{{#country}}Country or region: {{country}}{{/country}}
</context>

<task>
1. Is it a fit: a checklist of questions both families answer before committing: hours and days, ages and nap patterns, parenting approaches (food, screens, discipline, outings), how long each family expects to share, and plans for more children or moves. Flag the answers that would make the share hard.
2. Host home and schedule: options for where care happens (one home, alternating weeks or days), with the trade-offs, and a weekly schedule that fits both children's naps and outings.
3. Cost split: a fair split method with a worked example using {{nanny_terms}} if given: shared hours split equally, solo hours paid by the family using them, and host-home costs (food, heating, equipment, wear) either compensated or rotated. Use only the numbers given.
4. Rules both homes agree: the short list of shared rules and how disagreements are raised (between parents, not through the nanny).
5. When things change: the nanny's sickness and holiday, a child's sickness (does the well child still come, who pays), one family's holiday, notice periods if a family leaves the share, and what the nanny is told about that.
6. Employer duties to check: list the areas to check for {{country}} or the user's location: contracts, minimum pay and paid leave, tax and insurance registration, employer's liability insurance, background checks and payroll; mark each "check locally" without stating rules.
7. The share agreement: an outline of a written agreement between the families and a separate one-page summary for the nanny.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state employment law, tax rates or legal duties as fact; mark them "check locally" and suggest a payroll service or local adviser.
- Do not invent pay rates or costs; use what is given or show the method with [placeholders].
- Keep the nanny's interests in view: fair pay, clear notice, no being caught between two families.
- Check the cost split adds up to the nanny's total pay.
</constraints>

<output_format>
## Is it a fit
Checklist, then red flags.
## Host home and schedule
Options, then a table: Day | Host | Hours | Children.
## Cost split
Method, then a worked example table.
## Rules both homes agree
## When things change
Table: Situation | What happens | Who pays.
## Employer duties to check
Checklist marked "check locally".
## The share agreement
Outline.
</output_format>
