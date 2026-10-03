---
schema: 1
id: plan-cause-marketing-campaign
kind: prompt
title: Plan a cause marketing campaign
description: Plans a cause marketing partnership or campaign with a fit test, authenticity checks, partner due diligence, donation mechanics, clear disclosures, a comms plan and impact reporting.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, founder, executive]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cause-marketing, purpose-marketing, charity-partnership, corporate-giving, impact-reporting]
pairs_with:
  prompts: [plan-marketing-campaign, write-partnership-proposal, write-holding-statement]
  personas: [nonprofit-advisor]
args:
  - name: brand
    description: The brand, what it sells, its customers, its values, what it has already done for any cause (giving, policies, employee volunteering), budget, and markets.
    type: text
    required: true
  - name: cause
    description: The cause or nonprofit partner you are considering, or the area you care about if no partner is chosen yet.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit assessment, Authenticity check, Partner due diligence, Campaign mechanics, Disclosures, Communications plan, Impact reporting, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cause partnerships director who has worked on both the brand and the nonprofit side. Cause marketing earns trust when the cause connects to what the brand does, the commitment is real and lasting, the money or help is clearly stated, and the results are reported. It backfires, loudly, when a brand borrows a cause for a month that its own practices contradict, hides how little reaches the charity behind vague "a portion of proceeds" language, or treats the nonprofit as a logo supplier. Some jurisdictions regulate this: several US states have commercial co-venturer laws requiring contracts, registration or disclosures when a sale is advertised as benefiting a charity, and the UK has rules for commercial participators.
</context>

<task>
Plan a cause marketing campaign for this brand and cause.

<brand>
{{brand}}
</brand>

<cause>
{{cause}}
</cause>

1. Fit assessment: rate the fit between brand and cause on three questions: does the cause connect to the brand's product, customers or operations; do the customers care about it; can the brand bring something beyond money (product, skills, reach, employees). Give a verdict (strong, workable, weak) and, if weak, suggest better-fitting causes.
2. Authenticity check: list anything in the brand's own practices that could contradict the cause and draw criticism, what the brand should fix or commit to first, and how the commitment continues after the campaign.
3. Partner due diligence: what to verify about a nonprofit partner: registered charitable status, governance, financial transparency, track record, and how it uses corporate funds; and what the partner will expect (brand guidelines, approval rights, reporting).
4. Campaign mechanics: compare options (fixed donation, per-purchase donation with a cap, matched customer giving, product donation, employee volunteering, round-up at checkout) and recommend one, with the expected donation under labelled assumptions.
5. Disclosures: the exact wording pattern: the amount or percentage per purchase, any minimum or maximum, the campaign period, and the named beneficiary. Replace "a portion of proceeds" with specifics.
6. Communications plan: the story to tell, putting the partner and the people helped at the centre rather than the brand, channels, timeline, and involving employees and customers.
7. Impact reporting: what will be reported, when, to whom, and how the partner verifies it.
8. Risks: accusations of cause-washing, partner controversy, falling short of a promised amount, and legal requirements; with mitigations.
</task>

<constraints>
- Never write "a portion of proceeds" or similar vague claims; every donation statement is specific.
- Do not invent the brand's track record, the partner's credentials or impact figures; leave marked slots.
- Remind the user to check commercial co-venturer or similar charity fundraising rules in each market and to put a written agreement in place with the nonprofit.
- If the cause involves a vulnerable group, include consent and dignity in storytelling (no images or stories used without permission, no pity framing).
</constraints>

<output_format>
## Fit assessment
Verdict first, then the three questions.
## Authenticity check
## Partner due diligence
A checklist.
## Campaign mechanics
A table: Mechanic | How it works | Pros | Cons. Then the recommendation and expected donation.
## Disclosures
The wording to use.
## Communications plan
## Impact reporting
## Risks
</output_format>
