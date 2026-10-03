---
schema: 1
id: plan-customer-advisory-board
kind: prompt
title: Plan a customer advisory board
description: Plans a customer advisory board with a charter, member criteria, invitation, meeting agendas, feedback capture and a close-the-loop routine. Use when starting or rebooting a CAB.
category: user-feedback
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive, marketer]
requires: [none]
inputs: [text]
output: [plan, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [customer-advisory-board, customer-research, b2b, executive-sponsorship]
pairs_with:
  prompts: [close-feedback-loop, plan-beta-program, analyze-user-feedback]
args:
  - name: product_and_goal
    description: The product, the company stage, what you want the advisory board to help with (strategy, roadmap feedback, early access, references), who will own it, and the budget for travel and events.
    type: text
    required: true
  - name: customer_segments
    description: The customer segments, sizes and regions you serve, and any customers already interested. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Charter, Membership, Invitation, Programme calendar, Meeting agendas, Feedback capture, Closing the loop, Governance, Measures and risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have run customer advisory boards (CABs) for B2B software companies. A good CAB is a small group of customers who help shape strategy, not a support channel, a sales event or a focus group for the loudest account. CABs fail when membership is the biggest logos only, when meetings are 90 minutes of roadmap slides, when members never hear what happened to their input, and when the company implies roadmap promises it cannot keep. A CAB works when members talk to each other about real problems, get early and honest access to thinking, and see their influence.
</context>

<task>
<product_and_goal>
{{product_and_goal}}
</product_and_goal>
{{#customer_segments}}

<customer_segments>
{{customer_segments}}
</customer_segments>
{{/customer_segments}}

If the purpose of the board is unclear, propose the most likely purpose for this product stage, label it as an assumption, and continue.

1. **Charter.** Purpose in one sentence, what the board is and is not for (no sales pitches, no support escalations), what members get (influence, early access, peer network, recognition) and what the company commits to (honest updates, closing the loop), term length (12 to 24 months) and the executive sponsor.
2. **Membership.** Selection criteria (strategic fit, ability to speak for their organisation, willingness to share, mix of segments, sizes, regions and maturity, including at least one less happy customer), the size (8 to 15 members), and a composition grid against the segments. Exclude members whose companies compete directly with each other, or plan how to handle it.
3. **Invitation.** A personal invitation email from the executive sponsor: why them, what is involved (time commitment, meeting count, format), what they get, confidentiality, and how to reply. Under 200 words.
4. **Programme calendar.** A year: a kickoff, two or three virtual sessions of about 90 minutes, and one in-person session if the budget allows, with themes for each and the work between meetings (short surveys, 1:1s, previews).
5. **Meeting agendas.** For the kickoff and one regular session: timings, with no more than a third of the time presenting; most time on facilitated discussion of problems, trade-offs and priorities between members; a closing round on what we heard.
6. **Feedback capture.** A note-taking template (topic, member, verbatim comment, context, agreement across members, follow-up), how input is tagged and stored with other customer feedback, and who owns synthesis.
7. **Closing the loop.** A summary to members within a week, "you said, we did, we decided not to and why" at the next meeting, and individual follow-ups.
8. **Governance.** Confidentiality agreement, a gifts and expenses policy (check the members' own company policies, especially in the public sector), no paid incentives that could affect references, recording consent, and a note to avoid any discussion of pricing or commercial terms between members who might compete.
9. **Measures and risks.** How you will know it is working (attendance, member retention, decisions influenced, referenceability) and the main risks with mitigations.
</task>

<constraints>
- Do not invent customer names or claim specific customers are interested unless the input says so.
- Never promise roadmap commitments in the invitation or agendas; say "we will share our current thinking".
- Keep tools and budgets as placeholders when not given, for example [budget] or [CAB lead].
{{> output/uncertainty}}
</constraints>

<output_format>
## Charter
## Membership
Criteria, then | Segment | Seats | Example profile |
## Invitation
## Programme calendar
| When | Format | Theme | Between-meeting work |
## Meeting agendas
## Feedback capture
## Closing the loop
## Governance
## Measures and risks
</output_format>
