---
schema: 1
id: reply-to-cold-sales-email
kind: prompt
title: Reply to a cold sales email
description: Replies to an unsolicited sales pitch with the right short answer - a clear no with a removal request, a not-now with a real date, or interest with the qualifying questions that save a wasted call.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, founder, operations-manager, individual]
requires: [none]
inputs: [message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [vendor-pitch, sales-outreach-reply, not-interested, buyer-questions, unsubscribe-request]
pairs_with:
  prompts: [decline-request-gracefully, compare-vendors, reject-vendor-proposal]
args:
  - name: pitch
    description: The sales email or LinkedIn message you received, pasted in full, including any follow-ups.
    type: text
    required: true
  - name: stance
    description: Your answer.
    type: enum
    enum: [no, not-now, interested, let-me-choose]
    default: let-me-choose
  - name: situation
    description: Your role, whether you already use a similar product, budget or contract timing (for example "our current contract renews in March"), and anything you must know before taking a call (price range, integrations, security requirements).
    type: text
output_contract:
  format: markdown
  sections: [Reply, If they keep following up, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sales sequences are automated: a cold email with no reply is followed by four to eight more, so silence often costs more time than one short answer. Buyers who handle many pitches use three replies. A clear no ("not a fit for us, please remove me from this sequence") ends most sequences, because sales teams prefer an honest no to a dead lead. A not-now with a real trigger ("our contract renews in March; contact me in January") gets one useful contact later instead of weekly nudges. Interest is best expressed as qualifying questions by email (price range, minimum term, integrations, data location, references) before agreeing to a demo, which filters out most poor fits in one exchange. Pitches that look like phishing (urgent payment, login links, unexpected attachments) should not be answered at all.
</context>

<task>
Write a reply to this pitch. Stance: {{stance}}.

<pitch>
{{pitch}}
</pitch>
{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}

1. Check the pitch for phishing or scam signs (requests for payment or credentials, login or invoice links, impersonation of a known supplier, pressure to act today). If present, do not write a reply; explain the signs under Notes and suggest reporting it or checking with IT.
2. If the stance is let-me-choose, recommend no, not-now or interested based on the situation and say why in one sentence under Notes.
3. Reply, under about 70 words:
   - no: thank them in five words or fewer, say it is not a fit, ask to be removed from the sequence and the list. No reason needed beyond one short phrase.
   - not-now: say when it would be relevant and why (contract renewal, budget cycle), give the month to contact you, and ask for no follow-ups before then.
   - interested: three to five qualifying questions from the situation (price range and pricing model, minimum contract term, integration with the tools named, data location and security certifications, two customer references similar in size), and say a call can follow if the answers fit.
4. Under "If they keep following up", a one-line firmer reply for the no or not-now case.
</task>

<constraints>
- Polite, brief and final; no sarcasm, no long explanations, no fake reasons.
- Never invent the user's contracts, budgets, renewal dates or tools; use [placeholders].
- Do not include personal details or internal information the seller does not need (team size, budget figures) unless the user wants to share them.
</constraints>

<output_format>
## Reply
Ready to send.
## If they keep following up
One line.
## Notes
Stance reasoning or scam signs. "None" if nothing.
</output_format>
