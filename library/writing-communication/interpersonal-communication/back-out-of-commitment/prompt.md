---
schema: 1
id: back-out-of-commitment
kind: prompt
title: Back out of a commitment
description: Helps withdraw from a commitment such as a volunteer role, bridesmaid duty, committee seat or group project, with timing, who to tell first, the words and a fair handover.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student]
requires: [none]
inputs: [text]
output: [script, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [saying-no, stepping-down, handover, volunteering, obligations]
pairs_with:
  prompts: [write-message-to-cancel-plans, prune-commitments, apologize-effectively]
  personas: [communication-coach]
args:
  - name: commitment
    description: What you agreed to, who is relying on you, when it happens or how long it runs, and anything you have signed or paid for.
    type: text
    required: true
  - name: reason
    description: Why you need to step back, as much as you want to share; you can mark parts as private.
    type: text
    required: true
  - name: what_i_can_offer
    description: Optional. What you can still do to soften the impact, for example finish this month, train a replacement, contribute to costs.
    type: text
output_contract:
  format: markdown
  sections: [Before you tell them, Who to tell first, The words, Handover, If they are upset, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Backing out of something you agreed to is sometimes the right call: health, money, a new job, a caring responsibility or simply realising you cannot do it well. What makes it go badly is rarely the decision itself but the way it is delivered: telling people late, letting them hear it from someone else, a vague "I might not be able to…" that leaves them unable to plan, over-explaining private reasons, or walking away with no handover. What makes it go well: telling the person most affected (the organiser, the bride, the chair, the team) first and directly, as early as possible; giving the decision clearly, with a short honest reason; acknowledging the impact on them; and offering a realistic handover such as notes, introductions, a last date or covering costs already committed. Some commitments carry formal obligations, such as notice periods in volunteer or trustee roles, non-refundable deposits or a signed agreement, and those should be checked first.
</context>

<task>
Help me back out of this commitment.

<commitment>
{{commitment}}
</commitment>

<reason>
{{reason}}
</reason>
{{#what_i_can_offer}}
<what_i_can_offer>
{{what_i_can_offer}}
</what_i_can_offer>
{{/what_i_can_offer}}

1. If it is unclear what I committed to or who relies on me, ask up to two short questions and stop.
2. Before telling them: list anything to check first (written agreements, notice periods, money paid by me or others, data or keys I hold). If my reason sounds like I might only need a reduced role, mention that option once without pushing it.
3. Say who to tell first, in what order, and how (in person or a call for the main person, then a message to others), and how soon.
4. Write the words for the main person: the decision clearly in the first two sentences, a short reason using only what I am happy to share, an acknowledgement of the impact on them, and what I can offer. Then a short message version for others affected.
5. Write a handover checklist from my input: what to pass on, to whom, and by when. Insert `[check: …]` for anything I have not said rather than inventing it.
6. Write calm replies if they are upset, try to talk me out of it, or ask for more than I can give.
</task>

<constraints>
- Do not invent obligations, notice periods or costs; tell me to check the actual agreement.
- Keep private reasons private if I marked them so; "for personal reasons" is enough.
- No grovelling or long justifications; one apology for the impact is enough.
- Do not offer anything on my behalf that I have not said I can do.
</constraints>

<output_format>
## Before you tell them
What to check first.
## Who to tell first
Order, channel and timing.
## The words
For the main person, then the message for others.
## Handover
Checklist: item, to whom, by when.
## If they are upset
Table: If they say… | You can say…
## Notes
Anything else.
</output_format>
