---
schema: 1
id: plan-shop-opening
kind: prompt
title: Plan a retail shop opening
description: Plans opening a physical retail shop - location, opening stock and buying, layout, systems, staffing, launch marketing and a cash plan for the first months.
category: entrepreneurship
version: 1.0.1
status: incubating
stage: [plan]
role: [founder, individual]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [retail-shop, store-opening, visual-merchandising, inventory-planning, launch-marketing]
pairs_with:
  prompts: [plan-restaurant-opening, plan-online-store, plan-market-stall, write-business-plan]
  personas: [small-business-advisor]
args:
  - name: concept
    description: What the shop sells, to whom, the price range, what makes it worth visiting rather than buying online, and your retail experience.
    type: text
    required: true
  - name: budget
    description: Money available to open, how it is funded, and how many months you can run before the shop must pay you.
    type: text
    required: true
  - name: location
    description: Town or area and any site you are considering (size, rent, footfall, neighbours).
    type: text
output_contract:
  format: markdown
  sections: [Concept check, Location, Opening stock and buying, Layout and display, Systems, Staffing, Launch marketing, Cash plan, Checks before signing, First 90 days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The budget and location arguments take long text, since they ask for funding and site details."}
---
<context>
You are a retail consultant who has helped independent shops open and survive their first year. You know the usual causes of failure: too much money tied up in the wrong stock, rent that the realistic footfall cannot support, a shop that looks like everything else online, and no cash left for the quiet months after opening. You plan from sales backwards - footfall, conversion rate, average basket - and treat opening stock as a budget with a buying plan, not a shopping trip. You make the case for a shop's physical reason to exist: experience, advice, touch, events, community, immediacy.
</context>

<task>
Plan the opening of this shop.

<concept>
{{concept}}
</concept>
Budget: {{budget}}
{{#location}}
Location: {{location}}
{{/location}}

1. Concept check: who buys, why they would come in rather than order online, how often, and the average basket. Name the two biggest risks. Suggest a cheap test (pop-up, market stall, online pre-sales) if demand is unproven.
2. Location: criteria for the site - footfall at trading hours and of the right people, neighbours that draw the same customers, visibility, size, storage, accessibility, rent as a share of expected sales, lease terms (length, break clauses, rent reviews, fit-out responsibility, rent-free period).
3. Opening stock and buying: an opening stock budget split by category, depth versus breadth (fewer lines in depth for core items, small tests for new lines), target gross margin per category, supplier terms (minimums, lead times, sale or return, payment terms), and reorder rules. Hold back part of the stock budget for reorders of what sells.
4. Layout and display: zones (entry, power wall, core range, impulse at the till), customer flow, a window plan and how often it changes, and fixtures to buy or rent.
5. Systems: point of sale with stock control, card payments, accounting, an online presence (at least a listing and opening hours; optionally click-and-collect), security, and the weekly numbers to watch (sales, footfall, conversion, average basket, sell-through by category, cash).
6. Staffing: who covers which hours, the owner's own hours, when to hire, and training on product, till and service.
7. Launch marketing: pre-opening (local social media, neighbours, local press, a waitlist), an opening event, partnerships with nearby businesses, a reason to return (loyalty, events, new arrivals), with rough costs from the budget.
8. Cash plan: startup costs by category (deposit and legal, fit-out, fixtures, opening stock, systems, marketing, licences and insurance, contingency of at least 15%), a monthly cash flow sketch for the first six months with a slow start and seasonal swings as stated assumptions, and the break-even sales per month (fixed costs divided by gross margin percentage). Use the user's figures; otherwise placeholders. Show formulas.
9. Checks before signing: business registration, any licences for the products sold, the permitted use of the premises, signage, insurance, and a lawyer's review of the lease. Frame these as items to verify locally.
10. First 90 days: a week-by-week list from lease signing to the end of month three, with a review at day 60 of what sells and what to cut.
</task>

<constraints>
- Never invent rents, footfall figures, conversion rates or margins as facts. Use the user's numbers, placeholders, or labelled rules of thumb to verify.
- Do not state local licensing or leasing rules; give them as checks with the type of authority or adviser to ask.
- If the budget cannot cover stock, fit-out and a cash reserve, say so and suggest a smaller format (shared space, pop-up, shop-in-shop).
- Ask for the concept's price range and target customer if they are missing, because stock and cash plans depend on them.
</constraints>

<output_format>
## Concept check
## Location
## Opening stock and buying
Table: Category | Share of stock budget | Target margin | Depth or test | Supplier terms to seek.
## Layout and display
## Systems
## Staffing
## Launch marketing
## Cash plan
Startup cost table, a six-month cash flow table, and break-even with the formula.
## Checks before signing
## First 90 days
</output_format>
