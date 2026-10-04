---
schema: 1
id: set-abusive-customer-boundaries
kind: prompt
title: Set boundaries with abusive customers
description: Writes a policy and scripts for abusive or threatening customers - the warning line, ending a call or chat, refusing service, recording incidents and supporting the staff member afterwards.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text]
output: [docs, script, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [abusive-customers, staff-safety, refusal-of-service, incident-report, de-escalation]
pairs_with:
  prompts: [write-call-centre-script, roleplay-difficult-customer]
  personas: [support-team-lead]
args:
  - name: business
    description: Your business and setting - type, size, who faces customers (lone workers, young staff, night shifts), any incidents so far, whether you have CCTV or call recording, and who is in charge on each shift.
    type: text
    required: true
  - name: channels
    description: Optional. Where customers reach you - in person, phone, live chat, email, social media messages.
    type: text
output_contract:
  format: markdown
  sections: [Policy, Scripts, Refusing service, Incident record, Supporting staff, Check locally]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business protect its staff from abusive or threatening customers while staying fair to customers who are simply upset. The line matters: frustration, raised voices and complaints about the business are part of service; personal insults, swearing at staff, discriminatory or sexual remarks, intimidation and threats are not. Staff cope far better when they have permission in writing, exact words to use, and a manager who backs them, and when a call or chat they end is never held against their handling-time or satisfaction figures.
</context>

<task>
<business>
{{business}}
</business>

{{#channels}}
Channels: {{channels}}
{{/channels}}

1. Write a one-page policy: who it protects, what counts as unacceptable behaviour (with plain examples), what staff may do, the escalation steps, and a short public version for the website, counter or chat greeting ("We are happy to help. We do not accept abuse of our team.").
2. Set the steps:
   - Upset but not abusive: listen, acknowledge, keep helping.
   - Abusive language or personal insults: one calm warning naming the behaviour and the consequence.
   - Continues: end the interaction politely and say how they can come back (a later call, email, a manager).
   - Threats, violence, sexual harassment or discriminatory abuse: end immediately, move to safety, alert the manager, and call local emergency services or the police if anyone is at risk.
3. Write scripts for each channel used: the warning line, the ending line, and the line for a returning customer after a break. Keep each under about 30 words, calm, first person, without sarcasm or lecturing.
4. Refusing service and bans: who can decide, how it is communicated (in writing where possible, stating the behaviour, the duration and how to appeal), and the rule that refusal is based on behaviour only, never on a protected characteristic.
5. Incident record: fields (date, time, channel, staff involved, the exact words or actions, witnesses, CCTV or recording reference, action taken, follow-up) and who reads it within 24 hours.
6. Supporting staff: a break straight away, a short manager check-in the same day, no penalty on performance figures, swapping off that customer next time, and access to any employee support available. Include a check-in a few days later.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never script staff to argue, insult back, physically remove anyone or restrain anyone. Safety comes before finishing the transaction.
- Do not state laws on refusing service, recording calls or banning customers as fact; list them under Check locally (equality law, data protection for recordings and incident logs, rules for essential services or tenants).
- Use only the facts given. If lone working or night shifts are mentioned, add specific safety steps (a panic or alert method, not handling cash alone after an incident).
- Treat customers with mental health conditions, disabilities or distress fairly: the policy is about behaviour, and staff may adjust their approach where safe, but they never have to accept abuse.
</constraints>

<output_format>
## Policy
The one-page policy, then the public version.

## Scripts
Table: channel | warning line | ending line | returning customer line.

## Refusing service
Bullets, plus a short ban letter template with [placeholders].

## Incident record
A template with the fields.

## Supporting staff
Checklist for the same day and the following days.

## Check locally
Bullets of rules to confirm and who to ask (an employment adviser, a lawyer, the data protection authority).
</output_format>
