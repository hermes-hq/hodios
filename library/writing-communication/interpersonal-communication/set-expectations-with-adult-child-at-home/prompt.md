---
schema: 1
id: set-expectations-with-adult-child-at-home
kind: prompt
title: Set expectations with an adult child at home
description: Plans a conversation with an adult child living at home about contribution, chores, guests, hours and plans for the future, ending in a simple agreement with a review date.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [adult-children, living-at-home, household-agreement, family-meeting, expectations]
pairs_with:
  prompts: [set-rent-for-adult-child-at-home, write-house-share-agreement, set-boundary]
  personas: [communication-coach]
args:
  - name: situation
    description: Who lives at home, their age, whether they work or study, how long they have been back, what is working and what is causing friction.
    type: text
    required: true
  - name: what_i_want
    description: What you would like to agree, for example a contribution, chores, guests staying over, a move-out plan, or "not sure".
    type: text
    required: true
  - name: cultural_context
    description: Optional. Family or cultural expectations about adult children living at home, for example multigenerational living being normal.
    type: text
output_contract:
  format: markdown
  sections: [What to agree, Opening the conversation, Topics to cover, The written agreement, If they push back, Review, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an adult child lives at home, friction usually comes from unspoken expectations left over from childhood: parents slipping back into rules and reminders, the young adult feeling treated like a teenager, and both resenting each other quietly. What helps is an explicit, adult-to-adult conversation that ends in a short shared agreement, framed as "how we live together now" rather than house rules. The usual topics are a financial contribution (what and when), shared chores with a clear standard, guests and partners staying over, noise, late nights and letting people know if they will not be home for dinner, use of the car and shared items, and, where it applies, a goal and rough timeline (saving for a deposit, finishing a course, finding work). Both sides should get something: in return for the contribution and chores, the adult child gets privacy and their own decisions. Agreements work best with a review date after a month or two. Expectations differ widely across families and cultures; in many, adult children living at home until marriage or for good is normal, and a move-out timeline is not the goal.
</context>

<task>
Help me plan a conversation with my adult child about living at home.

<situation>
{{situation}}
</situation>

<what_i_want>
{{what_i_want}}
</what_i_want>
{{#cultural_context}}
<cultural_context>
{{cultural_context}}
</cultural_context>
{{/cultural_context}}

1. If it is unclear who lives at home or what is causing friction, ask up to two short questions and stop.
2. Summarise what this conversation should agree, from my input, and what to leave for later. If both parents or other adults live there, suggest agreeing our position together first.
3. Write an opening that sets an adult-to-adult tone, names that the aim is a fair arrangement for everyone, and invites their view.
4. List the topics in a table: topic, my starting proposal (from my input, or `[your proposal]` where I have not said), what to ask them, and what I could be flexible on. For the amount of any money contribution, do not set a figure; suggest working it out from real household costs separately.
5. Draft a short written agreement (half a page) with a review date.
6. Write calm responses to likely pushback ("I can't afford it", "my friends' parents don't charge", "you're treating me like a kid", "I'll move out then").
7. Suggest how to review it and how to raise a broken agreement without a lecture.
</task>

<constraints>
- Respect the cultural context I give; do not assume moving out is the goal.
- No ultimatums or threats to evict unless I say I mean them; if I do, note that rules on removing a family member from a home differ by country and can need legal advice.
- Do not invent amounts, rules or timelines I did not give.
- If there is violence, threats, substance problems that put others at risk, or a serious mental-health crisis, say this needs more than a household agreement and suggest the right support.
</constraints>

<output_format>
## What to agree
Summary of the goals for this conversation.
## Opening the conversation
The opening words.
## Topics to cover
Table: Topic | Your proposal | Ask them | Flexible on
## The written agreement
The draft.
## If they push back
Table: If they say… | You can say…
## Review
How and when.
## Notes
Anything else.
</output_format>
