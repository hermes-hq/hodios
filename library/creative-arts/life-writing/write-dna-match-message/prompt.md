---
schema: 1
id: write-dna-match-message
kind: prompt
title: Write a message to a DNA match
description: Writes a first message to a DNA match on a genealogy site, short and specific about the shared line, easy to answer, and careful in case the connection reveals a family surprise.
category: life-writing
version: 1.0.0
status: incubating
stage: [discover]
role: [individual]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [genealogy, dna-testing, family-tree, first-contact, research-collaboration]
pairs_with:
  prompts: [plan-genealogy-research, break-genealogy-brick-wall]
args:
  - name: match_details
    description: What the site shows about the match (shared amount, predicted relationship, their tree or surnames if visible, shared matches) and what you know of your own tree on the likely side.
    type: text
    required: true
  - name: goal
    description: What you hope to learn, for example which line you share, help with a brick wall, or finding a biological parent or relative.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Message, Shorter version, Follow-up if no reply, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help genealogists contact DNA matches. Experienced researchers know most matches never reply, and the ones that do reply to messages that are short, friendly, specific and easy to answer: who you are, the shared amount and the line you think you share, one or two surnames and places, a single simple question, and an offer to share what you know. Long messages full of tree data go unread; vague ones ("we match, how are we related?") get no answer because the match often knows less than you. DNA can also reveal things people do not know or want to discuss: unknown adoptions, donor conception, misattributed parentage. For searches for a biological parent or close relative, first messages should be gentle and not reveal the suspected relationship until the other person shows they are open to it, because the match may not know, and others in their household may read the message.

<match_details>
{{match_details}}
</match_details>
<goal>
{{goal}}
</goal>
</context>

<task>
1. Message: 60 to 150 words. Greet, say how you match (amount and predicted relationship as the site shows), name the side and the one or two surnames and places you think connect you, ask one simple question, offer to share your tree or research, and sign off with a first name. For a close-family search, keep it general (researching family history, would welcome comparing notes) and leave the suspected relationship out.
2. Shorter version: under 50 words, for sites with message limits or a second match.
3. Follow-up if no reply: a polite one-line follow-up for after a few weeks, and a note that many matches rarely log in, so silence is not rejection.
4. Before you send: three to five checks (shared matches to narrow the side, the match's tree if visible, whether you are ready for any answer, privacy of living people in your own tree, not sharing others' DNA results without consent).
</task>

<constraints>
- Do not state a relationship as certain; predicted relationships from shared DNA have wide overlapping ranges, so say "possibly" or name the range.
- Never invent ancestors, surnames or places; use only those given.
- In a search for a biological parent, sibling or child, do not reveal or hint at a possible non-paternity event, adoption or donor conception in the first message, and suggest that the writer consider support from an experienced search angel or a support group for adoption, donor conception or unexpected parentage results.
- Do not include personal contact details beyond a first name unless the writer asks.
</constraints>

<output_format>
## Message
## Shorter version
## Follow-up if no reply
## Before you send
</output_format>
