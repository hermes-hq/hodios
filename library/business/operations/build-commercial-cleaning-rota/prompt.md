---
schema: 1
id: build-commercial-cleaning-rota
kind: prompt
title: Build a commercial cleaning rota
description: Builds a cleaning schedule for a cafe, salon, gym or office with tasks by area and frequency, products and contact times from labels, staff allocation, sign-off sheets and audit checks.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate, verify]
role: [operations-manager, founder, manager]
inputs: [notes, text]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [cleaning-schedule, hygiene, disinfection, chemical-safety, colour-coding, salon, gym]
pairs_with:
  prompts: [write-opening-closing-checklist, prepare-for-food-safety-inspection, write-sop, plan-equipment-maintenance]
args:
  - name: business_type
    description: The business and what happens in it, for example "nail salon, 6 desks, pedicure spas" or "independent gym with changing rooms and showers".
    type: string
    required: true
  - name: areas
    description: Every area to clean and what is in it - front of house, kitchen, treatment rooms, toilets, changing rooms, equipment, offices, bins, outdoor areas.
    type: text
    required: true
  - name: staff
    description: Number of staff who share cleaning duties.
    type: number
    required: true
  - name: opening_hours
    description: Opening hours and quiet periods, so tasks can be placed when they will actually get done. Optional.
    type: string
  - name: products
    description: Cleaning and disinfecting products you use now, by product name and type, and whether you have their safety data sheets. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How this schedule works, Products and safety, Schedule by area, Who does what, Sign-off sheets, Audit checks, Contractor and deep-clean items]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hygiene and facilities manager who writes cleaning schedules for small businesses that inspectors, licensing officers and customers judge on sight. Schedules fail when they are a wall of tasks nobody owns, when "disinfect" is written but the product is wiped off before its contact time, when the same cloth goes from the toilet to the counter, and when sign-off sheets are filled in at the end of the week from memory. A schedule that works is short per person, placed in the quiet moments of the day, names the product and method for each task, and has a manager check that what is signed was done. Contact times, dilutions and protective equipment come from the product label and its safety data sheet, never from memory.
</context>

<task>
Build the cleaning schedule.

Business: {{business_type}}
Staff sharing cleaning: {{staff}}
{{#opening_hours}}
Opening hours: {{opening_hours}}
{{/opening_hours}}

<areas>
{{areas}}
</areas>
{{#products}}
<products_in_use>
{{products}}
</products_in_use>
{{/products}}

1. How this schedule works: explain in a few lines the frequency tiers (between each client or use, during the day, daily close, weekly, monthly, contractor), the difference between cleaning (removing dirt) and disinfecting or sanitising (killing germs on a cleaned surface for the label's contact time), and the colour-coding system for cloths, mops and buckets by area, using a common scheme and telling the user to keep to one scheme.
2. Products and safety: for each product type needed (detergent, disinfectant, food-safe sanitiser for food-contact surfaces, descaler, specialist products such as tool disinfectant for salons), say where it is used, and that the dilution, contact time and protective equipment are taken from its label and safety data sheet. Include the never-mix rule (for example, bleach with acids or ammonia), storage away from food, and who may use which chemicals. If products are listed, map them to tasks; flag any that seem wrong for the task as questions, not conclusions.
3. Schedule by area: for each area, a table of tasks with frequency, method and product, the time of day it is done, and the standard of done (what it looks like when finished).
4. Who does what: allocate tasks across {{staff}} people by shift or role, balancing the load and placing tasks in quiet periods, so each person has a short list.
5. Sign-off sheets: one per area or per shift, with date, time, task, initials and a space for problems found. Make the rule clear: sign when the task is done, not later.
6. Audit checks: a weekly manager walk-through with a short scored checklist, what to do when a check fails (redo, retrain, adjust the schedule), and a monthly review of the sheets.
7. Contractor and deep-clean items: tasks better done by specialists (extraction ducting, carpets, high-level cleaning, pest control, legionella or water system checks where relevant) as items to confirm with the relevant contractor or authority.
8. Before you answer, check that every area in the input has a schedule, every disinfecting task names the contact time as coming from the label, and no person's daily list is unreasonably long.
</task>

<constraints>
- Do not state dilution rates, contact times or exposure limits for products; refer to the label and safety data sheet for each.
- For businesses with regulated hygiene rules (food, beauty and personal care treatments, tattoo and piercing, healthcare-adjacent), say the local licensing or health authority may set specific cleaning and record rules and list them as `[CONFIRM locally: …]`.
- Keep the language simple and practical; staff may not read English as their first language, so short instructions and one task per line.
- If areas are described too vaguely to schedule, list what you need and schedule what you can.
</constraints>

<output_format>
## How this schedule works
Short paragraph or bullets, including the colour-coding table: Colour | Area.
## Products and safety
Table: Product type | Used for | Where to get dilution and contact time | Safety notes. Then the never-mix and storage rules.
## Schedule by area
One table per area: Task | Frequency | Method and product | When | Done looks like.
## Who does what
Table: Person or shift | Tasks.
## Sign-off sheets
One template sheet as a table.
## Audit checks
The weekly checklist with scores and the failure process.
## Contractor and deep-clean items
Bullets with `[CONFIRM locally: …]` where relevant.
</output_format>
