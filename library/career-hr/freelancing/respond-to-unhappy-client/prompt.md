---
schema: 1
id: respond-to-unhappy-client
kind: prompt
title: Respond to a client unhappy with your work
description: Helps a freelancer whose client is unhappy with a delivery - sorts brief miss from taste or scope change, checks the agreement, picks fix, partial refund or hold firm, and writes the reply.
category: freelancing
version: 1.0.0
status: incubating
stage: [review]
role: [designer, writer, software-engineer, consultant]
requires: [none]
inputs: [message, text, document]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [client-complaint, deliverable-quality, revisions, refund-request, client-relationship]
pairs_with:
  prompts: [write-scope-change-email, untangle-conflicting-client-feedback, part-ways-with-client, write-statement-of-work]
  personas: [freelance-business-advisor]
args:
  - name: complaint
    description: The client's message or a summary of the call, in their words where possible.
    type: text
    required: true
  - name: agreement
    description: What was agreed - the brief, scope, acceptance criteria, revision rounds, and payment status (paid, part-paid, unpaid).
    type: text
    required: true
  - name: your_view
    description: What you delivered, where you think they are right and wrong, how much revision time you could give, and how much you value the client.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Options, Recommendation, Reply, Prevent next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer handle a client who is unhappy with delivered work. What experienced freelancers know: complaints fall into a few different kinds that need different answers. A genuine miss against the brief or a defect is fixed without argument. A taste disagreement within the brief is handled through the agreed revision rounds. A change of direction ("we've rethought the audience") is new scope and is priced. And sometimes the complaint is really about something else: budget pressure, an internal stakeholder who was not consulted, or the client's own late inputs. Answering quickly, calmly and in writing, acknowledging what is fair before addressing what is not, keeps most relationships. A partial refund can be the cheapest fix when the relationship is ending anyway, but should not be the reflex.

<complaint>
{{complaint}}
</complaint>

<agreement>
{{agreement}}
</agreement>

<your_view>
{{your_view}}
</your_view>
</context>

<task>
1. Diagnosis: split the complaint into specific points. For each, classify it as a miss against the brief or defect, taste within scope, new scope, or unclear, with the evidence from the agreement. Note any underlying issue the message hints at.
2. Options: fix the brief misses at no cost; use the remaining revision rounds; quote the new-scope items; offer a call to agree direction; partial refund or ending the project with payment for work done. Show the cost of each to the freelancer.
3. Recommendation: one combined approach in three sentences, using how much the freelancer values the client and the payment status.
4. Reply: acknowledge the concern, agree plainly where they are right, explain briefly what is within the agreement and what is new, propose the next step with a date. No defensiveness, no over-apology.
5. Prevent next time: one or two changes to the brief, sign-off points or feedback process.
</task>

<constraints>
- Judge each point against the written agreement; if the agreement is silent or vague, say so rather than deciding for either side.
- Do not tell the freelancer they are right when the evidence shows a real miss.
- Do not threaten, withhold already-paid work or offer a refund the freelancer has not said they can afford.
- Keep the reply under 200 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Table: Point | Type | Evidence.

## Options
Bullets with cost.

## Recommendation
Three sentences.

## Reply
Ready to send.

## Prevent next time
Bullets.
</output_format>
