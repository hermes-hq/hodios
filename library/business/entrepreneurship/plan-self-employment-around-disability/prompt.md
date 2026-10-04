---
schema: 1
id: plan-self-employment-around-disability
kind: prompt
title: Plan self-employment around a disability
description: Plans self-employment that fits a disability or long-term condition - energy pacing, a flexible offer, work support and benefit effects to check, and a plan for bad days and flare-ups.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [disabled-entrepreneurs, long-term-conditions, energy-pacing, flexible-work, benefits-interaction, contingency-plan]
pairs_with:
  prompts: [prepare-disability-benefits-application, price-services, plan-side-business, start-freelance-business]
args:
  - name: idea
    description: The work you want to do on your own (for example "freelance bookkeeping", "illustration commissions", "online language lessons"), your skills and experience.
    type: text
    required: true
  - name: country
    description: Country (and region if relevant) where you live, so checks about work support and benefits are framed correctly.
    type: string
    required: true
  - name: needs
    description: Whatever you choose to share about how your condition affects work - energy patterns, good and bad days, hours you can sustain, equipment or access needs, benefits you receive. Share only what you are comfortable with.
    type: text
output_contract:
  format: markdown
  sections: [What a sustainable week looks like, Offer designed for flexibility, Pricing for real capacity, Support and benefits to check, Set-up and adjustments, Bad days and flare-ups, First steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a disabled person or someone with a long-term condition plan self-employment that works with their body and mind rather than against it. Self-employment can give control over hours, pace, place and environment that employers often do not. It fails when the plan is built on a best-day capacity and every bad week becomes a crisis, when the offer promises fast turnaround or fixed live hours the person cannot always keep, when prices are set for full-time hours they will not work, and when earnings affect disability benefits or support in ways nobody checked. Many countries have programmes that fund equipment, support workers, travel or start-up help for disabled people starting businesses; their names and rules vary.

Country: {{country}}
</context>

<task>
<idea>
{{idea}}
</idea>
{{#needs}}

<needs>
{{needs}}
</needs>
{{/needs}}

1. What a sustainable week looks like: build capacity from an average or below-average week, not the best one. Use an energy budget (for example spoons or a simple 1-10 energy scale) for the work tasks - client contact, focused work, travel, admin - and set a weekly hours ceiling with recovery time.
2. Offer designed for flexibility: shape the service so it survives bad days - asynchronous delivery where possible, turnaround times with a buffer, packages instead of on-call work, batchable tasks, remote by default if that helps, a clear booking window. Say what to avoid promising.
3. Pricing for real capacity: billable hours a year from the sustainable week (allowing for flare-up weeks), costs including any disability-related business costs, and the rate needed to hit the income goal. Show the arithmetic.
4. Support and benefits to check: how self-employed earnings may affect disability benefits or income support, permitted work or trial rules, and programmes that may fund equipment, support or travel for disabled self-employed people, start-up support, and disability-led business networks - each as a question to put to the benefits authority, a welfare rights or disability advice service, or the national employment support service in {{country}}.
5. Set-up and adjustments: workspace, assistive technology and software, routines that reduce load (templates, automation of reminders, a virtual assistant later), and how much to share with clients about the condition - it is their choice; give a neutral line they can use.
6. Bad days and flare-ups: a written plan - a message template to clients, a back-up person or a pause clause in terms, deadlines with buffers, a savings buffer target, and what to do if a longer flare-up happens.
7. First steps: four to six steps for the next month.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state benefit, tax or support programme rules or names as fact for their country; frame them as checks and say who to ask.
- Respect what the person shares; do not ask for diagnosis or medical details beyond what affects work planning.
- Do not give medical advice about managing the condition; suggest raising pacing questions with their own clinician if relevant.
- Strengths-based and practical; avoid pity or inspiration framing.
- If the idea is missing, ask for it before planning.
</constraints>

<output_format>
## What a sustainable week looks like
Table: Day | Work blocks | Energy cost | Recovery. Then the weekly ceiling.
## Offer designed for flexibility
Bullets: offer, promise, avoid promising.
## Pricing for real capacity
Arithmetic in steps.
## Support and benefits to check
Table: Question | Why it matters | Who to ask.
## Set-up and adjustments
Bullets, plus the neutral disclosure line.
## Bad days and flare-ups
Plan as a checklist, plus the client message template.
## First steps
Numbered list.
</output_format>
