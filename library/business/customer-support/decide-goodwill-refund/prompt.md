---
schema: 1
id: decide-goodwill-refund
kind: prompt
title: Decide a goodwill refund
description: Weighs a refund or credit request outside policy - fault, cost, customer value, precedent and public risk - and recommends refund, partial, credit or a kind no, with the wording.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, support-agent, operations-manager]
requires: [none]
inputs: [message, text]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [goodwill-gesture, refund-decision, store-credit, policy-exception, precedent]
pairs_with:
  prompts: [write-support-reply, build-service-recovery-playbook, resolve-cancellation-fee-dispute]
  rules: [support-commitment-rules]
args:
  - name: request
    description: The customer's request in their words, what they bought, when, the price, and what went wrong from their side.
    type: text
    required: true
  - name: policy
    description: Your refund or returns policy as written, and who may approve exceptions and up to what amount.
    type: text
    required: true
  - name: customer_history
    description: Optional. How long they have been a customer, roughly what they spend, past complaints or refunds, and whether the issue is public (a review or social post).
    type: text
output_contract:
  format: markdown
  sections: [Factors, Recommendation, Reply, Record note]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner or support lead decide on a refund or credit that the policy does not cover. Exceptions are where money and reputation are won or lost: a well-judged gesture can keep a customer for years, while a habit of giving in to whoever complains loudest teaches customers that policy is optional and is unfair to those who did not push. Experienced owners decide on five factors, not on mood: who was at fault, what it costs (a credit costs the margin, not the price), what the customer is worth over time, what precedent it sets, and whether the issue is public. Statutory rights (faulty goods, services not as described) are not goodwill; if the request is really a legal right, say so and route it to the normal process.
</context>

<task>
<request>
{{request}}
</request>

<policy>
{{policy}}
</policy>

{{#customer_history}}
<customer_history>
{{customer_history}}
</customer_history>
{{/customer_history}}

1. Check first whether the request is actually inside the policy or a likely legal right (faulty, not as described, never delivered). If so, say "not a goodwill case" and what normal remedy applies, noting that the user should check local consumer rules.
2. Score each factor as for, against or neutral, with a one-line reason:
   - Fault: ours, shared, the customer's, or nobody's (bad luck).
   - Cost: the real cost of each option (refund = full price; store credit = roughly the cost of goods if used; partial refund = the amount).
   - Customer value: tenure, spend, likelihood to return.
   - Precedent: would you be happy to give the same to every customer in the same situation? Could you write it into the policy?
   - Public risk: is it in a review or post, and how would the decision read if quoted?
   - Abuse signals: repeated exceptions, changing stories (signals only, never proof).
3. Recommend one option from the ladder: full refund, partial refund, store credit or voucher, exchange or redo, a small gesture (free delivery next time), or a kind no with an alternative. Name the cheapest option that genuinely solves the customer's problem, and who must approve it.
4. Write the reply: acknowledge the situation, give the decision in the first two sentences, call an exception "a one-off" so it does not become an entitlement, or for a no, give the reason in customer terms and the best alternative. Under about 120 words.
5. Write the record note so the next agent sees what was given and why.
6. If the same exception keeps coming up, suggest the policy change that would make it a rule instead.
</task>

<constraints>
- Use only the facts given. If the price, purchase date or what went wrong is missing, ask for it and stop.
- Never accuse the customer of abuse in the reply.
- Do not exceed the approval limits in the policy; if the best option needs higher approval, say who.
- Do not present a statutory right as a favour.
{{> output/uncertainty}}
</constraints>

<output_format>
## Factors
Table: factor | for, against or neutral | reason.

## Recommendation
The option, its cost, who approves, and the runner-up option.

## Reply
Ready to send.

## Record note
Two or three lines, plus a policy suggestion if the case is recurring.
</output_format>
