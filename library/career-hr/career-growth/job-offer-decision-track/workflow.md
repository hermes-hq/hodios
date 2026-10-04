---
schema: 1
id: job-offer-decision-track
kind: workflow
title: Job offer decision track
description: Takes a job offer from receipt to decision in gated steps, from valuing the full package, research and negotiation to a comparison with the current role, the decision and a clean accept or decline.
category: career-growth
version: 1.0.0
status: incubating
stage: [discover, plan, review, ship]
role: [job-seeker]
advice_risk: [financial]
requires: [none]
inputs: [text, job-posting, preferences]
output: [table, report, script, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [job-offer, total-compensation, offer-negotiation, counteroffer, resignation, decision-matrix]
pairs_with:
  prompts: [evaluate-job-offer, negotiate-job-offer, accept-job-offer-in-writing, decline-job-offer, write-resignation-letter, respond-to-candidate-counteroffer]
  personas: [career-coach, negotiation-coach]
args:
  - name: offer_details
    description: Everything you know about the offer - title, level, base pay, bonus, equity, benefits, leave, location and remote policy, start date, notice or probation terms, the deadline to answer, and anything said verbally but not yet in writing.
    type: text
    required: true
  - name: current_role
    description: Your current job for comparison - pay and benefits, what you like and dislike, growth prospects, any bonus or vesting date coming up, your notice period, and whether a counteroffer is likely.
    type: text
    required: true
  - name: priorities
    description: What matters most to you in the next two to three years, ranked if you can - money, growth, stability, flexibility, mission, team, location, title, learning - and any hard limits.
    type: text
    required: true
steps:
  - {id: package, file: steps/01-evaluate-package.md, stage: discover, gate: approve, artifact: "offer-decision/01-package.md"}
  - {id: research, file: steps/02-research.md, stage: discover, gate: approve, artifact: "offer-decision/02-research.md"}
  - {id: negotiate, file: steps/03-negotiate.md, stage: plan, gate: approve, artifact: "offer-decision/03-negotiation.md"}
  - {id: compare, file: steps/04-compare.md, stage: review, gate: approve, artifact: "offer-decision/04-comparison.md"}
  - {id: decide, file: steps/05-decide.md, stage: review, gate: approve, artifact: "offer-decision/05-decision.md"}
  - {id: close, file: steps/06-close.md, stage: ship, gate: none, artifact: "offer-decision/06-close.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one job offer from arrival to a signed acceptance or a gracious decline, with a checkpoint after each step so nothing is decided in deadline panic: value the whole package, research the real job, negotiate once, compare honestly with staying, decide, and close cleanly, including the resignation and any counteroffer.

<offer_details>
{{offer_details}}
</offer_details>
<current_role>
{{current_role}}
</current_role>
<priorities>
{{priorities}}
</priorities>

Rules for every step:
- Keep the answer deadline in view at every step. If it is too short for this sequence, say so in step 1 and draft a polite request for more time.
- Use only facts given or confirmed; mark gaps as [X] with a question. Never invent pay data, company facts or reviews; say how to check them.
{{> guardrails/professional-limits}}
- Equity, bonuses and benefits are valued with stated assumptions and ranges, not as certain figures. Flag when a tax, visa, non-compete, repayment clause or contract term needs an adviser or official source.
- Weigh everything against the person's own priorities, not against what most people would want.
- Do not help bluff a competing offer or misstate current pay. Honest leverage only.
- Nothing is accepted or declined until step 6, and nothing is resigned until the new offer is in writing and any conditions (references, background checks, right-to-work) are cleared.
