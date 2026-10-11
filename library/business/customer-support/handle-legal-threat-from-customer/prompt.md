---
schema: 1
id: handle-legal-threat-from-customer
kind: prompt
title: Handle a customer's legal threat
description: Handles a customer threatening to sue, complain to a regulator or go to the press - what to stop saying, facts to secure, who to involve and a calm holding reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, founder]
requires: [none]
advice_risk: [legal]
inputs: [message, notes]
output: [message, checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [legal-threat, regulator-complaint, press-threat, holding-reply, evidence-preservation]
pairs_with:
  prompts: [write-support-reply, design-escalation-process, write-holding-statement, decide-goodwill-refund]
  rules: [support-commitment-rules]
args:
  - name: customer_message
    description: The customer's message or a note of what they said on the call, including the exact words of the threat, and earlier messages in the thread.
    type: text
    required: true
  - name: case_facts
    description: What happened from your records - order or account, dates, amounts, what was promised, what support has already said and offered.
    type: text
    required: true
  - name: escalation_contacts
    description: Who in your business handles legal, complaints, PR or regulator contact, and any written policy for legal threats. Leave empty if you have none.
    type: text
  - name: country
    description: Country or region where the business and the customer are, if known.
    type: string
output_contract:
  format: markdown
  sections: [Threat assessment, Stop and do now, Facts to secure, Who to involve, Holding reply, Case note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach a frontline support agent or lead through a customer who has threatened legal action, a regulator or ombudsman complaint, a chargeback, or going to the press or social media. Most threats are frustration, not a plan, and the best outcome is usually fixing the underlying problem quickly. The damage comes from what support does next: arguing liability in writing, admitting fault in sweeping terms, promising outcomes, deleting or editing records, going silent, or treating the customer worse because they threatened. Experienced teams separate two things: the customer's problem, which they keep working on, and the legal or public risk, which they hand to the right person with a clean file. A threat to complain to a regulator or ombudsman is often the customer's right and should be met with the business's own complaints process and timelines, never discouraged.
</context>

<task>
<customer_message>
{{customer_message}}
</customer_message>

<case_facts>
{{case_facts}}
</case_facts>

{{#escalation_contacts}}
<escalation_contacts>
{{escalation_contacts}}
</escalation_contacts>
{{/escalation_contacts}}

{{#country}}Country or region: {{country}}{{/country}}

1. Classify the threat: lawyer or court action, regulator or ombudsman, chargeback, press or social media, or a vague "you'll hear from my lawyer". Note whether a lawyer, court papers or a regulator letter has actually arrived; real legal documents go straight to whoever handles legal and are not answered by support.
2. Rate it low, medium or high from concrete signals: money at stake, injury or safety, personal data, discrimination, a vulnerable customer, a pattern of similar complaints, a named journalist or regulator, a formal letter. Explain the rating in two lines.
3. List what the agent must stop doing now: no debate about who is legally right, no admission beyond the facts, no speculation about causes, no new promises, no deleting or editing tickets, call notes or messages.
4. List the facts and records to secure: the full thread, call recordings, order and payment records, logs, photos, staff notes, the relevant terms as they stood at the time, with dates.
5. Say who to involve and when, using the escalation contacts given. If none were given, say which role should own it (owner, complaints lead, legal adviser, insurer) and that support keeps ownership of the customer's practical problem.
6. Write a holding reply: thank them, confirm the complaint is taken seriously, say who now handles it and when they will hear next, and point to the formal complaints route. It does not admit liability, argue, threaten back or discourage them from using their rights.
7. Write a neutral case note for the ticket: facts, the threat in the customer's words, actions taken, owner, next date.
</task>

<constraints>
- Do not predict whether the customer would win, what a court or regulator would decide, or quote laws, deadlines or regulator names you were not given. Where local rules matter, say what to check and with whom.
- Use only the facts given; mark missing facts as `[CHECK: ...]`.
- The holding reply is under about 120 words, calm, and contains no apology that reads as an admission of legal fault; regret for the customer's experience is fine.
- Never advise ignoring, deleting or altering records, and never suggest pressuring the customer to drop a complaint or sign anything.
- If the message includes threats of violence or self-harm, put that first and treat it as a safety issue, not a legal one.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
## Threat assessment
Type, rating (low, medium or high) and the reasons.

## Stop and do now
Short bullets for the agent.

## Facts to secure
Checklist of records, with where each lives if known.

## Who to involve
Role or named contact, what to send them, by when.

## Holding reply
Ready to send.

## Case note
Three to six neutral lines for the ticket.
</output_format>
