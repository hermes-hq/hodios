---
schema: 1
id: handle-repeat-complainer
kind: prompt
title: Handle a repeat complainer
description: Handles a customer who keeps complaining about the same or new issues - reviews the pattern, assigns one owner, sets a final position and drafts the closing letter.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, manager, operations-manager, founder]
requires: [none]
inputs: [ticket, message, text]
output: [plan, message, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [repeat-contacts, complaint-handling, final-response, single-point-of-contact, unreasonable-behaviour]
pairs_with:
  prompts: [set-abusive-customer-boundaries, decide-goodwill-refund, build-service-recovery-playbook]
  workflows: [customer-complaint-track]
args:
  - name: contact_history
    description: "The customer's contacts in date order: what they raised each time, what was said or offered, and what is still open. Remove personal details you do not need."
    type: text
    required: true
  - name: options_and_policy
    description: "Your complaints policy, what you can offer (refund, credit, cancellation, repair), any regulator or ombudsman route that applies, and your country. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Pattern review, What is still open, One owner and contact plan, Final position, Closing letter, For the record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support leads deal with customers who contact again and again. Most repeat complainers are made, not born: each contact is answered by a different person, nobody fixes the root issue, offers are inconsistent, and the customer learns that pushing harder gets more. The fix is to look at the whole history first, separate what is genuinely unresolved from what has been answered, give the customer one named owner, and reach a clear, fair final position in writing. A final position is not a brush-off: it says what was found, what was done, what will and will not happen, and where the customer can go next (an internal review, a regulator or ombudsman where one applies). Restricting contact is a last step for behaviour, not for persistence alone, and must not cut off a customer's legal rights or a genuinely new problem.
</context>

<task>
Work out how to handle this customer.

<contact_history>
{{contact_history}}
</contact_history>
{{#options_and_policy}}
<options_and_policy>
{{options_and_policy}}
</options_and_policy>
{{/options_and_policy}}

1. Review the pattern: list each issue raised, when, how it was handled, and whether it was resolved. Note where the business added to the problem (inconsistent answers, missed callbacks, promises not kept). Separate genuine new issues from the same issue raised again.
2. List what is still genuinely open and what a fair resolution of each would be, using the options given.
3. Set the contact plan: one named owner role, one channel, a set update rhythm, and an internal note so other agents route every new contact to the owner without reopening the argument.
4. Draft the final position: the facts found, what has been done, the one fair offer (if any), what the business will not do and why, and the next route if the customer disagrees. If the history shows the business was at fault, say so plainly.
5. Write the closing letter to the customer in plain, calm language.
6. Write the internal record: summary, final position, date, and the rule for new contacts (new issue handled normally; same issue gets the final position restated briefly). Mention a contact restriction only if behaviour (abuse, threats, very high volume) justifies it, and say it needs a manager's sign-off.
</task>

<constraints>
- Do not invent facts, offers or legal rights. Name a regulator or ombudsman route only when given or when it is clearly the customer's right in the stated country; otherwise mark [CHECK the external route for your country and sector].
- Do not label the customer as difficult in anything they may see; customers can often request records held about them.
- Do not recommend blocking a customer for persistence alone, or in a way that removes access to a service they pay for or to their legal rights.
- If the history mentions vulnerability (illness, bereavement, money hardship), adjust the tone and plan and say how.
</constraints>

<output_format>
## Pattern review
Table: Date | Issue | How handled | Resolved? | Business error?
## What is still open
## One owner and contact plan
## Final position
## Closing letter
## For the record
</output_format>
