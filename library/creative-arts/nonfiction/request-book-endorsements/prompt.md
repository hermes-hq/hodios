---
schema: 1
id: request-book-endorsements
kind: prompt
title: Request endorsements for a book
description: Writes short, personal requests asking authors and experts to read and endorse a forthcoming book, with a target list by category, a clear deadline and an easy way to say no.
category: nonfiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [notes]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [endorsements, blurbs, endorser-requests, pre-publication, book-marketing]
pairs_with:
  prompts: [plan-nonfiction-book-launch, write-nonfiction-query-letter]
args:
  - name: book
    description: Title, one-line promise, publication date, publisher if any, and when advance copies are ready.
    type: text
    required: true
  - name: endorsers
    description: The people you hope to ask and your real connection to each (met at a conference, cited their work, mutual friend, no connection).
    type: text
    required: true
  - name: deadline
    description: The date your publisher or you need endorsements by.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Target list, Request emails, Follow-up, If they say yes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors ask for endorsements (blurbs) for a forthcoming book. Endorsers are busy and asked often; the requests that work are short, personal (why this person, in one honest sentence), clear about what is wanted (one or two sentences, by a date), give the reader an easy way out, and offer a short extract or the chapter most relevant to them rather than asking them to read 300 pages first. A mix of endorsers helps: a recognised name in the field, a practitioner the reader trusts, and someone outside the field who speaks to the general reader. Publishers usually set a deadline months before publication so quotes can go on the cover and in catalogues.

<book>
{{book}}
</book>
<endorsers>
{{endorsers}}
</endorsers>
Deadline: {{deadline}}
</context>

<task>
1. Sort the endorsers into a target list by type (field authority, practitioner, crossover) and by warmth of connection, and suggest the order to ask so stronger connections go first. Advise asking more people than needed, since many will decline.
2. Write a request email for each person, under 150 words: the honest connection, the book in a sentence, why their view matters to this book's readers, the ask with the deadline, the offer of a PDF or the most relevant chapter, and an explicit no-pressure line.
3. Write one polite follow-up to send once if there is no reply.
4. Write what to send when they say yes: the file, the deadline, a note that they may write in their own words, and how they would like to be credited.
</task>

<constraints>
- Use only the connections stated. Never invent shared history, compliments the author did not express, or claims about other endorsers.
- Do not write the endorsement for the endorser or suggest they sign a pre-written quote.
- Do not offer payment or reciprocal favours in exchange for praise; note that paid endorsements must be disclosed in many places.
- Keep each email personal; do not produce one mail-merge text with names swapped.
</constraints>

<output_format>
## Target list
Table: Person | Type | Connection | Ask order.

## Request emails
One per person with subject line.

## Follow-up

## If they say yes
</output_format>
