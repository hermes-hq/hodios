---
schema: 1
id: sell-founding-memberships
kind: prompt
title: Sell founding memberships before opening
description: Designs a founding-member presale for a studio, class, club, coworking space or service before it opens - the offer, price, cap, deadline, go threshold, refund promise and decision rule.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder]
requires: [none]
inputs: [text, notes]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [presale, founding-members, demand-test, go-no-go, refund-policy, memberships]
pairs_with:
  prompts: [validate-business-idea, model-unit-economics, find-first-customers, write-crowdfunding-campaign]
args:
  - name: idea
    description: What will open - a yoga or climbing studio, a class series, a members' club, a coworking space, a cleaning or meal service - plus the location, planned opening date, regular price you expect to charge and the monthly costs you must cover.
    type: text
    required: true
  - name: audience
    description: Who you expect to join and how you can reach them now (a mailing list, social following, a community, past clients, neighbours).
    type: text
    required: true
  - name: presale_weeks
    description: How many weeks the presale will run.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Decision rule, Founding offer, Price and cap, Refund promise and holding the money, Campaign plan, Offer page copy, Tracking, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who wants to open a membership or recurring-service business test demand by selling founding memberships before signing a lease, buying equipment or hiring. A presale is the strongest early evidence there is, because people pay, not just say "I'd come". It goes wrong in predictable ways: the go threshold is set after the results come in (so any number becomes "good enough"), the founding discount is so deep that the business can never reach full price, the refund promise is vague, the money is spent before the decision, and the founder counts friends who joined out of kindness as market demand.

Presale length: {{presale_weeks}} weeks.
</context>

<task>
<idea>
{{idea}}
</idea>

<audience>
{{audience}}
</audience>

1. Decision rule, written first: the minimum number of paid founding members needed to proceed, derived from the monthly costs to cover (members needed at full price to break even, times a share the founders must reach, for example 30 to 50 percent of break-even members before opening). Add a stretch target and what each outcome means: go, go smaller (fewer days, shared space), extend once, or stop and refund. Show the arithmetic from their figures.
2. Founding offer: what founders get that later members do not (a locked-in rate for 12 months, first booking access, a founding name on the wall, a free guest pass, a say in the timetable). Prefer lasting perks over deep discounts.
3. Price and cap: founding price as a discount of no more than about 20 to 30 percent off the regular price, or a prepaid block (for example three months up front); a hard cap on founding places; what they pay now (full prepayment or a deposit) and when the rest is charged.
4. Refund promise and holding the money: a plain promise (full refund if the threshold is not reached by the deadline, or if opening slips by more than a stated number of weeks), how it will be paid back and how fast, and keeping the money in a separate account untouched until the go decision. Consumer rules on advance payments and cancellation differ by country; list them as checks.
5. Campaign plan: week by week across the presale - warm list and community first, a launch event or open taster session, a mid-point update with the count, a last-week deadline push. Name who to ask personally.
6. Offer page copy: headline, what it is and when it opens, founding perks, price and cap, the deadline, the refund promise in one sentence, and a single call to action.
7. Tracking: a daily table and how to read it - members by source, and the share who are not friends or family.
</task>

<constraints>
- Never invent prices, local demand, rents or legal requirements; use the user's figures, mark estimates, and say what to check.
- Never suggest spending presale money before the go decision, or hiding the refund terms.
- If regular price, monthly costs or opening date are missing, ask for them, because the threshold depends on them; meanwhile use [X] placeholders.
- Keep the copy honest: no fake scarcity, no invented testimonials or member counts.
</constraints>

<output_format>
## Decision rule
The arithmetic, then a table: Result by deadline | Decision.

## Founding offer
Bullets of perks, best first.

## Price and cap
Short table: Item | Value | Why.

## Refund promise and holding the money
The promise in plain words, then a checklist.

## Campaign plan
Table: Week | Actions | Target count.

## Offer page copy
Ready to paste, under 200 words.

## Tracking
Table template, then two lines on reading it.

## Questions
Short bullets.
</output_format>
