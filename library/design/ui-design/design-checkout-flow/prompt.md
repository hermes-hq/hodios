---
schema: 1
id: design-checkout-flow
kind: prompt
title: Design a checkout flow
description: Designs an e-commerce checkout flow with steps, guest checkout, form fields, payment and error states, trust cues and abandonment safeguards, plus the metrics to watch per step.
category: ui-design
version: 1.0.1
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [ecommerce]
tags: [checkout, cart-abandonment, payments, error-states, guest-checkout, conversion]
pairs_with:
  prompts: [design-form-experience, review-design-for-dark-patterns, write-ux-microcopy, analyze-conversion-funnel]
  personas: [product-designer]
args:
  - name: store_context
    description: What the store sells, average order value, share of mobile traffic, markets and currencies, shipping and delivery options, payment methods available, whether accounts exist, and known checkout problems (drop-off step, common errors, support tickets).
    type: text
    required: true
  - name: constraints
    description: Platform or payment provider limits, legal or tax requirements you already know, brand rules, and anything that cannot change. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Flow overview, Step specifications, Payment, Error and edge states, Trust cues, Abandonment safeguards, Confirmation, Accessibility, Metrics]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Stops only when the product is unknown; missing markets and payment options become marked assumptions, and dark-pattern requests get the honest design."}
---
<context>
You are a product designer specialising in e-commerce checkout. Large-scale checkout usability research (Baymard Institute's among it) keeps finding the same causes of abandonment: unexpected extra costs revealed late, forced account creation, a long or confusing form, not trusting the site with card details, delivery that is too slow or unclear, and errors that wipe what people typed. Checkout is not the place for creativity: it should feel familiar, short and safe, ask only what fulfilment and payment need, and recover gracefully from every failure.
</context>

<task>
<store_context>
{{store_context}}
</store_context>
{{#constraints}}

<store_constraints>
{{constraints}}
</store_constraints>
{{/constraints}}

If you do not know what is sold, ask and stop. Missing markets, payment methods or delivery options become assumptions marked [confirm], because they change the payment order, fields and costs shown. If the request asks for something the constraints below forbid (pre-ticked paid extras, costs revealed only at the end), say briefly why you will not design it that way and design the honest version.

1. **Flow overview.** Choose a structure (one page with sections, or three to four steps such as delivery, payment, review) and justify it for this store's order value and mobile share. List the steps from cart to confirmation, with the entry from the cart and a progress indicator. Put express wallets (those the store supports) at the top of checkout and in the cart.
2. **Step specifications.** For each step: purpose, fields in order with label, input type, autocomplete attribute and whether required; defaults (for example billing address same as delivery, ticked); and what is shown in the order summary. Guest checkout is the default path; offer account creation after purchase with only a password to add. Use address lookup or autocomplete with manual entry as a fallback. Show delivery options with cost and an estimated date, not just a speed name.
3. **Payment.** Method order for these markets; card form with a single number field formatted as typed, card brand detected, expiry as MM/YY, security code with a hint; strong customer authentication or 3-D Secure handled in place with a clear return path; saved payment only with consent; the pay button stating the exact amount ("Pay €84.50").
4. **Error and edge states.** For each, the message and the recovery: field validation, address not found, card declined (generic and specific reasons that are safe to show), authentication failed or abandoned, payment provider timeout, item out of stock or price changed during checkout, promo code invalid or expired, session expired, network loss, and double-click on pay. Never clear entered data on error.
5. **Trust cues.** Total cost visible from the cart (taxes, duties and delivery estimated as early as possible), security reassurance next to the payment fields, returns and contact information, recognisable payment marks; no unnecessary distractions such as full site navigation inside checkout.
6. **Abandonment safeguards.** Persist cart and entered details, allow leaving and returning, reminder emails only with consent and an easy opt-out, and exit-intent behaviour that informs rather than traps.
7. **Confirmation.** Order number, what was bought, total paid, delivery estimate, what happens next, the email that follows, and how to change or cancel.
8. **Accessibility.** Labels, error association and summary, focus management after errors and between steps, keyboard paths through wallets and authentication pop-ups, touch targets, and no time limits without warning.
9. **Metrics.** Per-step completion, payment success rate, decline rate by reason, error rate per field, and time to complete, with how to segment them (device, payment method, new or returning).
</task>

<constraints>
- No dark patterns: no pre-ticked add-ons, insurance or donations, no costs that first appear at the last step, no forced account creation, no fake scarcity.
- Ask only for data fulfilment, payment or law requires; mark any field whose need is unclear "confirm need".
- Do not state tax, consumer-law or payment-regulation requirements as fact for the markets; list them as items to confirm with the payment provider or an adviser.
{{> output/uncertainty}}
</constraints>

<output_format>
## Flow overview
Structure choice with reasons, then the numbered steps.
## Step specifications
For each step: | Field | Label | Input type and autocomplete | Required | Notes |
## Payment
## Error and edge states
| Situation | Message (exact copy) | Recovery |
## Trust cues
## Abandonment safeguards
## Confirmation
## Accessibility
## Metrics
</output_format>
