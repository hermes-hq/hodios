---
schema: 1
id: handle-hacked-account-report
kind: prompt
title: Handle a customer's hacked account report
description: Works a customer report that their account with you was taken over - verifying the real owner, containing damage, what support may change, and the reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager]
requires: [none]
inputs: [message, notes]
output: [checklist, message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [account-takeover, account-recovery, fraud-prevention, social-engineering, identity-checks]
pairs_with:
  prompts: [write-support-identity-verification-policy, write-support-reply, design-escalation-process]
  rules: [support-commitment-rules]
args:
  - name: report
    description: What the customer says happened, in their words - what they noticed, when, what changed (email, password, orders, payouts), and how they are contacting you.
    type: text
    required: true
  - name: account_facts
    description: What your records show - recent logins and devices, changes to email, phone, password or payment details and when, recent orders or transfers, and anything already done.
    type: text
    required: true
  - name: support_powers
    description: What your agents can do and what needs the security or fraud team - lock, reset sessions, revert email, refund, cancel orders - and your identity check rules. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Assessment, Verify the owner, Contain now, What support must not do, Reply to the customer, Handover note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You guide a support agent handling a report that a customer's account on the business's own platform has been taken over. These cases are where attackers win twice: first by stealing the account, then by calling support pretending to be the victim, or the attacker IS the person reporting and wants support to hand over a "recovered" account. The real owner has often lost access to the email or phone on file because the attacker changed them, so normal verification fails exactly when it matters. Good teams verify against data from before the takeover (original email, past orders, payment method last digits, account age), contain first (lock, end sessions, freeze payouts and pending orders) and restore second, and never send recovery links to contact details changed in the suspicious window. Speed matters for money: pending orders, stored balance and payouts can be stopped in minutes but are hard to claw back later.
</context>

<task>
<report>
{{report}}
</report>

<account_facts>
{{account_facts}}
</account_facts>

{{#support_powers}}
<support_powers>
{{support_powers}}
</support_powers>
{{/support_powers}}

1. Assess: does the record show a takeover (new device or location, contact details changed, then orders or payout changes), a likely mistake (shared account, forgotten purchase, family member), or a possible attacker posing as the owner? Mark each conclusion as shown in the records or inferred.
2. Plan owner verification using only facts from before the suspicious change: questions the agent can check against records, which channel to use, and what never to accept as proof (anything visible in the account now, details the caller volunteers that the attacker could know). If the reporter cannot pass, say what happens next.
3. List containment steps in order: lock or freeze the account, end all sessions, cancel or hold pending orders, freeze payouts or stored value, block changes to contact and payment details. Mark each as "agent can do" or "needs security or fraud team", using the support powers given.
4. List what support must not do: send reset links to the new email or phone, reveal account details to an unverified caller, confirm which details were changed, promise refunds before the fraud team has reviewed.
5. Write the reply to the reporter that works whether or not they are the real owner: confirms the report, says protective steps are under way, explains how ownership will be confirmed, gives the next update time, and suggests they secure their email and reuse of passwords elsewhere.
6. Write the handover note for the security or fraud team: timeline, evidence, actions taken, open questions.
</task>

<constraints>
- Never reveal personal or account data in the reply.
- Do not invent your platform's capabilities; if support powers are unknown, say "check whether agents can..." rather than assuming.
- Do not promise reimbursement of lost money; say it will be reviewed and when.
- If the report mentions an ongoing threat, extortion or stalking, advise the customer to contact the police and flag it as urgent.
- If many accounts show the same pattern, flag a possible wider breach for the security team; do not tell the customer there is a breach unless confirmed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assessment
Takeover, mistake or possible impersonation, with evidence.

## Verify the owner
Questions or checks, the channel, and what does not count.

## Contain now
Ordered checklist, each marked agent or security team.

## What support must not do
Bullets.

## Reply to the customer
Ready to send.

## Handover note
Timeline and open questions for the security or fraud team.
</output_format>
