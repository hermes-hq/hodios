---
schema: 1
id: plan-community-content-partnerships
kind: prompt
title: Plan community content partnerships
description: Plans content partnerships with local libraries, schools, clubs, shops and charities, with shared-audience fit, formats, who does what, credit and approvals, and a simple written agreement.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, founder, marketer, editor]
subject: [nonprofit, retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [local-partnerships, co-marketing, cross-promotion, guest-takeover, partnership-agreement, community-building]
pairs_with:
  prompts: [pitch-creator-collaboration, plan-content-calendar, define-content-pillars]
args:
  - name: organisation
    description: Who you are (local creator, business, newsroom or nonprofit), your audience and channels, and what you could bring to a partner (space, reach, skills, photos, a newsletter).
    type: text
    required: true
  - name: potential_partners
    description: Local organisations you have in mind or already know, for example "the library, two primary schools, the running club, the farm shop".
    type: text
    required: true
  - name: goals
    description: What you want from partnerships, for example "reach families new to the area", "more footfall on weekdays", "stories from neighbourhoods we never cover".
    type: text
output_contract:
  format: markdown
  sections: [Partner shortlist, Partnership ideas, Who does what, Credit and approvals, Outreach message, Simple agreement, Review after the first run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a local creator, business, newsroom or nonprofit plan content made with other local organisations. Done well, partnerships reach audiences neither side reaches alone and make content more useful (a library's reading list with a bookshop, a running club's route guide with a sports shop). They go wrong when only one side benefits, when nobody agrees who posts what and when, when one partner edits the other's words without asking, or when a newsroom's partner expects favourable coverage. Good partnerships start small with one pilot, write down roles, credit and approvals in plain language, and review honestly before repeating.

{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
<organisation>
{{organisation}}
</organisation>

<potential_partners>
{{potential_partners}}
</potential_partners>

1. Partner shortlist: for each partner, the shared audience, what they would get, what you would get, effort, and any rules they work under (schools and safeguarding, charities and political neutrality, councils and procurement, sponsorship policies). Rank the top three for a first pilot.
2. Partnership ideas: two or three formats per top partner, such as a co-hosted series, guest takeover, joint event with coverage, resource guide, Q&A, behind-the-scenes swap or a shared newsletter section. Each with cadence and the first piece.
3. Who does what: drafting, photos or filming, approvals, posting, replying to comments, and measuring, with named roles.
4. Credit and approvals: how each partner is credited and tagged, logo use, who approves what and how fast, how disagreements are settled, and consent for any people, especially children, who appear.
5. Outreach message: a short first message to the top partner, specific about what is in it for them.
6. Simple agreement: a one-page plain-language template covering purpose, each side's commitments, content ownership and reuse, credit, approvals, data and photos, money (if any), how to end it, and contacts.
7. Review after the first run: what to look at and the questions to ask both sides.
</task>

<constraints>
- For newsrooms: the agreement must protect editorial independence; partners help with access and distribution but do not approve news coverage, and any paid partnership is labelled.
- Any paid or in-kind exchange that promotes a business must be disclosed to audiences.
- Do not invent partner names, contacts or local facts; use what the user gives and placeholders like [library events contact].
- The agreement template is not a legal contract; suggest a professional review if money, intellectual property or children are involved.
- If the organisation or partner list is missing, ask for them and stop.
</constraints>

<output_format>
## Partner shortlist
Table: partner | shared audience | they get | we get | effort | rules to respect | rank.

## Partnership ideas
Bullets per top partner.

## Who does what
Table: task | us | partner | by when.

## Credit and approvals
Bullets.

## Outreach message
Under 120 words.

## Simple agreement
A fill-in template with headed lines.

## Review after the first run
Bullets.
</output_format>
