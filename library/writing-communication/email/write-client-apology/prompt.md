---
schema: 1
id: write-client-apology
kind: prompt
title: Write a client apology
description: Writes a professional apology to a client for a service failure that owns the error, states the fix and what changes, and avoids admissions beyond the facts. Use in service businesses and freelancing.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [consultant, founder, support-agent, manager]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [client-apology, service-failure, service-recovery, accountability, client-retention]
pairs_with:
  prompts: [apologize-effectively, respond-to-angry-email, write-delay-notification]
args:
  - name: what_happened
    description: The failure as plainly as you can state it, with dates, what was your responsibility, and what is still unknown.
    type: text
    required: true
  - name: impact_on_client
    description: What the failure did to the client, such as missed launch, wrong invoices to their customers, lost hours or a complaint from their boss, as far as you know.
    type: text
    required: true
  - name: fix
    description: What has already been done to fix it, and what will change so it does not happen again, only measures you have actually decided on.
    type: text
    required: true
  - name: remedy_offered
    description: Any credit, refund, free work or other remedy you are authorised to offer. Leave empty if none.
    type: text
output_contract:
  format: markdown
  sections: [Talk first?, Email, Before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients forgive service failures more readily than they forgive the way a failure is handled. A recovery apology that keeps the client names the specific failure and its effect on them, takes responsibility in the active voice ("we sent the files late"), explains the cause briefly without excuses, shows what is already fixed and what will change, and offers a remedy only if one is authorised. It goes wrong when it is vague ("any inconvenience"), conditional ("if you were affected"), blames a subcontractor the client never chose, promises "this will never happen again", or volunteers legal conclusions. Owning the facts is different from admitting legal liability: words like "negligent", "breach of contract" or "we will cover all your losses" go beyond what happened and may conflict with contract terms or insurance conditions. For failures with significant financial loss, injury, data exposure or regulatory implications, a legal or insurance review before sending is common practice, and a phone call should come first.
</context>

<task>
Write a client apology for this service failure.

<what_happened>
{{what_happened}}
</what_happened>

<impact_on_client>
{{impact_on_client}}
</impact_on_client>

<fix>
{{fix}}
</fix>
{{#remedy_offered}}
<remedy_offered>
{{remedy_offered}}
</remedy_offered>
{{/remedy_offered}}

1. If you cannot tell what failed or what was the sender's responsibility, ask and stop.
2. Talk first? Recommend a phone or video call before the email when the impact is significant (money, their customers, their reputation, a missed launch) or the relationship is long; the email then confirms the call in writing.
3. Write the email:
   - Subject: specific and calm ("The late delivery of your October payroll files").
   - First paragraph: the apology tied to the specific failure and its impact on the client, in the active voice, owning what was within the sender's control.
   - Cause in one or two sentences, factual. If the cause is not yet known, say so and when it will be. If a subcontractor or supplier was involved, the sender still owns it towards the client; name the supplier only if the client already knows about them and naming them helps.
   - What is fixed now, and what will change, using only the measures in the input. Concrete beats sweeping ("a second person now checks every file before sending" rather than "we have reviewed our processes").
   - Remedy only if authorised, stated plainly with any conditions.
   - Next step: a check-in date, a direct contact, or the call.
4. Under Before sending, list facts to verify, and flag when to involve legal, insurance or a data protection contact (money claimed, injury, data exposure, regulatory reporting, contract penalties).
</task>

<constraints>
- Under about 200 words in the body.
- One clear apology, early; no repeated apologies, no conditional or passive wording ("mistakes were made", "if this caused any inconvenience").
- Use only the facts given. Never invent causes, fixes, remedies or timelines; use `[need: …]`.
- Do not speculate about causes, characterise the failure in legal terms (negligence, breach, liability), quantify the client's losses, or promise to cover losses, unless the input explicitly authorises it. Say what happened; do not argue the legal consequences.
- Never promise that it will never happen again; describe what changes instead.
- This is a communication draft, not legal advice; when significant losses or obligations are involved, the Before sending section must say to have it reviewed.
</constraints>

<output_format>
## Talk first?
One or two sentences.
## Email
Subject line, then the body.
## Before sending
Bullets: facts to verify, reviewers to involve, and placeholders. "Ready to send" if nothing.
</output_format>
