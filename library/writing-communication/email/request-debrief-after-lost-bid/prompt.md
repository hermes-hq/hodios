---
schema: 1
id: request-debrief-after-lost-bid
kind: prompt
title: Ask for feedback after losing a bid
description: Asks a buyer for feedback after you lose a tender, pitch or deal, with a few specific questions, a gracious tone and a reason for them to keep you in mind next time.
category: email
version: 1.0.0
status: incubating
stage: [review]
role: [sales-rep, founder, consultant, business-analyst]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [tender-feedback, lost-deal, bid-debrief, buyer-relationship, sales-learning]
pairs_with:
  prompts: [run-win-loss-analysis, write-follow-up-email, write-freelance-proposal]
args:
  - name: bid
    description: What you bid for, the buyer and contact, whether it was a public tender, a private RFP or an informal pitch, and how you were told you lost (pasted if possible).
    type: text
    required: true
  - name: what_you_want_to_learn
    description: What you suspect or want to know (price, scope, experience, presentation, relationship with the incumbent), and any future opportunity you know of.
    type: text
output_contract:
  format: markdown
  sections: [Email, Questions for a call, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bid teams that win more are the ones that ask for feedback every time they lose, and ask well. Buyers are more open when the request comes quickly (within a week or two), thanks them for the decision rather than contesting it, asks a handful of specific questions rather than "why didn't we win?", and offers a short call as an alternative to writing. Public-sector buyers in many countries offer or must offer a debrief, often with scores and the winner's relative strengths, sometimes within a fixed window; private buyers owe nothing, so the tone matters more. A debrief request is never the place to argue the decision; a formal challenge to a public procurement is a separate legal process with strict time limits.
</context>

<task>
Write a feedback request for this lost bid.

<bid>
{{bid}}
</bid>
{{#what_you_want_to_learn}}
<what_you_want_to_learn>
{{what_you_want_to_learn}}
</what_you_want_to_learn>
{{/what_you_want_to_learn}}

1. Note whether it looks like a public tender. If it does, say under Notes that a formal debrief may be offered or required and that any challenge has short time limits to check locally; still write the request in a non-confrontational tone.
2. Subject: "Thank you, and a request for feedback on [bid name]".
3. Open with thanks for the opportunity and the decision, and congratulate the outcome without asking who won if the buyer has not said.
4. Ask for feedback in one sentence, and offer a 15-20 minute call or a written reply, whichever is easier.
5. Ask three to five specific questions drawn from what_you_want_to_learn, for example: how our price compared, where our proposal was weakest against the criteria, whether our experience or references fell short, what the winning bid did better, and what would make us more competitive next time.
6. Close with one line about staying in touch and a relevant future opportunity if known, without a pitch.
7. Under "Questions for a call", give six to eight questions in priority order, plus two follow-ups to ask if the buyer is open.
</task>

<constraints>
- Email body under about 170 words.
- No disputing the decision, no criticism of the buyer, the process or the winner, and no "we were cheaper" claims.
- Never invent scores, competitors, prices or reasons for the loss.
- If the input wants to challenge the award, write the gracious feedback request anyway and note under Notes that a formal challenge is a separate legal step that needs specialist advice.
</constraints>

<output_format>
## Email
Subject, then body.
## Questions for a call
Numbered list.
## Notes
Public-tender points, timing and anything flagged. "None" if nothing.
</output_format>
