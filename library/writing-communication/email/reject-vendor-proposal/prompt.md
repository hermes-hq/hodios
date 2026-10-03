---
schema: 1
id: reject-vendor-proposal
kind: prompt
title: Reject a vendor proposal
description: Tells vendors or bidders who were not selected, kindly and briefly, with optional useful feedback and no commitments that create exposure. Use after a tender, RFP or pitch.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, project-manager, manager, founder]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [procurement, tender, rfp, unsuccessful-bidder, vendor-management, debrief]
pairs_with:
  prompts: [decline-request-gracefully, write-bad-news-email, write-negotiation-email]
args:
  - name: vendor
    description: The vendor and your contact there, and anything about the relationship, for example "Kestrel Print, Anna Holm, incumbent for 4 years".
    type: string
    required: true
  - name: project
    description: The tender, RFP or project name and reference, and whether this is a public-sector procurement.
    type: string
    required: true
  - name: reason
    description: Why they were not selected, ideally in terms of your evaluation criteria and scores, for example "scored lowest on implementation plan; price was second-best".
    type: text
  - name: offer_feedback
    description: Whether to include short feedback against the evaluation criteria or offer a debrief call.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Email, Feedback notes, Before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Vendors invest real time in proposals, and how they are told they lost shapes whether they bid again, how they talk about the buyer, and sometimes whether they challenge the decision. A good regret letter is prompt, states the outcome in the first lines, thanks them specifically, and closes cleanly. The risks are in what it adds: reasons that do not match the documented evaluation criteria, disclosure of a competitor's price or confidential details, hints of future work that read as a promise, or vague phrases ("at this time") that keep a door open that is actually shut. Public-sector buyers usually have formal duties on top of this, such as notifying all bidders at once, explaining scores against the published criteria, observing a standstill period before the contract is signed, and offering a debrief. Those rules vary by country and organisation.
</context>

<task>
Write a regret email to {{vendor}} for {{project}}. Include feedback: {{offer_feedback}}.

{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}

1. If it is unclear which proposal or project this is, ask and stop.
2. Write the email:
   - Subject: "[Project/reference]: outcome of your proposal".
   - First two sentences: thanks for the proposal and the outcome, stated plainly ("we have decided not to take your proposal forward" or "we have awarded the contract to another supplier").
   - One sentence of genuine, specific appreciation if the input gives something specific; otherwise a plain thank-you.
   - If feedback is included: two or three factual points tied to the evaluation criteria (for example "your implementation plan scored lower than the selected bid on resourcing detail"), without naming or quoting other bidders or their prices. Or, if the reason is thin, offer a short debrief call instead.
   - If the vendor is an incumbent, state what happens to the current contract and the transition only as given, or with placeholders.
   - A neutral close. Mention future opportunities only as "we will consider you for future opportunities that fit" if the input says so; never promise or imply future work.
3. If the project is public sector or a formal tender, add placeholders for the required elements: the award decision, the scores against criteria, the standstill period end date, and the debrief offer, and flag under Before sending that the organisation's procurement rules decide the exact content.
4. Feedback notes (when feedback is included or offered): a short internal list of the points to cover in a debrief, each tied to a criterion, plus what not to discuss.
</task>

<constraints>
- Under about 150 words in the body when feedback is not included; under about 220 with feedback.
- Never disclose the winning bidder's price, proposal content, or any other bidder's confidential information. Relative statements tied to criteria are acceptable.
- Never give reasons that are not part of the evaluation (personal dislike, a friend's company, the vendor's size or location if those were not criteria), or anything discriminatory. If the input contains such a reason, leave it out and flag it under Before sending, including any conflict of interest it suggests.
- No commitments, apologies for the outcome, or language that could read as a reason to challenge ("it was very close", "we may revisit") unless true and documented.
- Use only facts given; mark gaps `[need: …]`.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Feedback notes
Bullets for a debrief, or "Not included" when feedback is off and not offered.
## Before sending
Bullets: consistency with the evaluation record, procurement rules, timing relative to the award and the standstill period, and anything left out on purpose.
</output_format>
