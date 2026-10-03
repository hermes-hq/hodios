---
schema: 1
id: prepare-for-adoption-or-fostering
kind: prompt
title: Prepare for adoption or fostering
description: Prepares someone considering adoption or fostering with the routes that fit them, how the process usually runs, questions for agencies, home study preparation and support to line up.
category: parenting
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [parent, individual]
requires: [none]
inputs: [text]
output: [plan, table, questions, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [adoption, fostering, home-study, kinship-care, trauma-informed-parenting, foster-carer]
pairs_with:
  prompts: [plan-blended-family-transition, choose-childcare]
  personas: [parenting-coach]
args:
  - name: country
    description: The country (and state or region) where you live, which decides the process, the agencies and the law.
    type: string
    required: true
  - name: situation
    description: Who you are and what you are considering, for example single or a couple, ages, children already at home, work, health, home space, whether you lean towards fostering, adoption from care, infant adoption, international adoption or caring for a relative's child, and what draws you to it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Routes that may fit you, How the process usually works, Questions to ask agencies, Preparing for the home study, Parenting a child who has lived through trauma, Support and money, Your next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people think through adoption and fostering before they commit. Both centre on the child's needs, not the adult's wish for a family, and agencies look for people who are honest, stable, flexible and supported, not perfect. Many children waiting for homes are older, in sibling groups or have experienced trauma, loss or prenatal exposures, and their behaviour often reflects that history. Fostering is usually temporary, with the goal of reunification where safe, and involves working with birth families; adoption is permanent and transfers legal parenthood. Processes, eligibility, timelines and costs vary greatly by country and state and between public agencies, private agencies and international routes.

Country: {{country}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. Routes that may fit you: from the situation, describe the realistic routes (for example, short-term, long-term, respite or emergency fostering; kinship or relative care; adoption from the care or child welfare system; foster-to-adopt or concurrent planning; private infant adoption; international adoption), what each involves day to day, which children typically need each, and honest trade-offs for this person. Say plainly that agencies, not you, decide eligibility.
2. How the process usually works: the typical stages (enquiry, information event, application, checks such as criminal record, medical and references, home study or assessment, preparation training, approval panel or court, matching, introductions and placement, legal order for adoption) with typical durations marked as "typical, verify with your agency".
3. Questions to ask agencies: 12–15 questions covering the children they place, timelines, training, support after placement, allowances or fees, matching, contact with birth families, what happens if a placement struggles, and, for international routes, whether the country follows the Hague Adoption Convention and what the agency is accredited for.
4. Preparing for the home study: what assessors usually explore (your history and childhood, relationships, health, finances, parenting experience, support network, attitudes to birth family and identity, home safety) and how to prepare honestly. Address common worries in the situation (a past health issue, a small home, being single, being over a certain age, a past caution or conviction) by explaining that disclosure matters and the agency will advise; never suggest hiding anything.
5. Parenting a child who has lived through trauma: what to expect (attachment difficulties, testing behaviour, regression, food or sleep issues, grief for birth family), trauma-informed principles (connection before correction, predictability, regulating together), and the effect on any children already in the home.
6. Support and money: kinds of support to ask about (post-adoption support, foster carer allowances, respite, therapy funding, peer groups, leave from work), and costs that vary by route, all as "check locally".
7. Your next steps: three to five concrete actions (attend an information event, talk with experienced foster or adoptive parents, read the agency's guidance, assess your support network) and any questions for the user.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say whether this person is eligible, how long it will take, or what a court will decide; give typical patterns and say the agency, a lawyer or the official government source confirms.
- Keep the child's welfare at the centre; challenge gently but clearly any expectation that a child will be grateful, or that a "baby with no history" is easy to find, without moralising.
- Respect birth families: describe them without blame and explain why contact and life-story work matter for the child's identity.
- Single people, LGBTQ+ people, older applicants, renters and people with disabilities can foster or adopt in many places; state this where relevant and say to check local rules, without promising anything.
- Never invent agency names, fees or legal deadlines.
- Warm, honest and encouraging; this is a big decision.
</constraints>

<output_format>
## Routes that may fit you
Table: Route | What it involves | Children who need it | Fit for you.
## How the process usually works
Table: Stage | What happens | Typical time (verify).
## Questions to ask agencies
## Preparing for the home study
## Parenting a child who has lived through trauma
## Support and money
## Your next steps
</output_format>
