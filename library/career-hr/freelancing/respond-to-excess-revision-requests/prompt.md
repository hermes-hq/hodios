---
schema: 1
id: respond-to-excess-revision-requests
kind: prompt
title: Respond to a client asking for more revisions
description: Answers a client who keeps requesting revisions beyond the rounds in the agreement - checks what was agreed, separates fixes from new changes, and replies with clear options and prices.
category: freelancing
version: 1.0.0
status: incubating
stage: [build, review]
role: [designer, writer, copywriter, consultant]
requires: [none]
inputs: [message, text, document]
output: [message, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [revision-rounds, client-feedback, scope-creep, change-pricing, client-communication]
pairs_with:
  prompts: [write-scope-change-email, untangle-conflicting-client-feedback, write-statement-of-work, respond-to-unhappy-client]
  personas: [freelance-business-advisor]
args:
  - name: agreement
    description: What your proposal or contract says about revisions (number of rounds, what counts as a round, how extra rounds are charged), pasted or summarised, and the agreed brief.
    type: text
    required: true
  - name: situation
    description: The rounds done so far, the client's latest request pasted in full, and how the relationship feels (good client, payment status, deadline).
    type: text
    required: true
  - name: your_terms
    description: Your rate for extra rounds or hours, and anything you are willing to absorb. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where you stand, Sort the requests, Options, Reply, Next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers handle revision creep the way experienced designers and writers do. What they know: endless revisions usually come from an unclear brief, too many stakeholders, a client who cannot decide, or a client shopping for a different direction, and each needs a different answer; fixing your own errors or a missed brief point is not a revision and should be done without charge; "small tweaks" add up, and a project that runs two rounds over often wipes out the margin; the conversation is easier when it refers to the agreement neutrally and offers choices (consolidate feedback into one final round, buy an extra round, a change of direction quoted as new work) rather than refusing; and the best fix is upstream, a clear definition of a round, one consolidated feedback point of contact, and sign-off at each stage. If the agreement does not mention revisions, the freelancer's position is weaker and the reply must be softer.

<agreement>
{{agreement}}
</agreement>

<situation>
{{situation}}
</situation>
{{#your_terms}}
<your_terms>
{{your_terms}}
</your_terms>
{{/your_terms}}
</context>

<task>
1. Where you stand: what the agreement says, how many rounds were used, and whether the latest request is within it. If the agreement is silent or unclear on revisions, say so and adjust the strategy.
2. Sort the requests: split the latest feedback into fixes you owe (errors, missed brief points), changes within the remaining rounds, and new changes or a new direction.
3. Options: two or three, such as doing the fixes now and quoting the rest as an extra round, a final consolidated round at a set price, or re-scoping a new direction as new work. Price each from the user's terms, or mark [rate] if missing.
4. Reply: warm and matter-of-fact, under 170 words; confirms what you will do now, refers to the agreement once without blame, presents the options with prices, and asks for consolidated feedback from one person.
5. Next time: two or three changes to the proposal, contract or feedback process.
</task>

<constraints>
- Never charge for fixing the freelancer's own errors or missed brief points; say which items those are.
- Do not invent contract terms; work only from the agreement given.
- No threats to stop work or withhold files unless the agreement allows it and the user asks; even then, mention it only as a last resort.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
## Sort the requests
Table: Request | Type (fix owed, within rounds, new change) | Note.
## Options
Table: Option | What it includes | Price | Timing.
## Reply
Ready to send.
## Next time
</output_format>
