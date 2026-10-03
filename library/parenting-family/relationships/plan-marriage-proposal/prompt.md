---
schema: 1
id: plan-marriage-proposal
kind: prompt
title: Plan a marriage proposal
description: Plans a marriage proposal around the partner's personality, with three ideas, logistics, a ring timeline, words to say, a backup plan and what happens straight after.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, ideas, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [proposal, engagement, engagement-ring, romantic-gestures, surprise-planning]
pairs_with:
  prompts: [plan-wedding, choose-meaningful-gift, plan-anniversary]
args:
  - name: partner_details
    description: About your partner and you, for example how private or outgoing they are, places and memories that matter, hobbies, how they feel about surprises and public attention, family and cultural traditions, whether you have talked about marriage, and when you hope to propose.
    type: text
    required: true
  - name: budget
    description: Budget for the proposal itself and, separately, for the ring if you are buying one, with currency. Optional.
    type: string
  - name: location
    description: Where you live or would like to propose. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Fit check, Three proposal ideas, The plan, The ring, What to say, Backup plan, Straight after]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan proposals their partner will love, which is not the same as the most impressive proposal. The best proposals fit the partner: a private person may hate a crowd watching; someone who loves their family may want them nearby or waiting afterwards; someone who wants input may prefer to choose the ring together. Most successful proposals also follow conversations about marriage, so the question is a joyful surprise in timing and style, not in substance. Logistics fail more often than nerves: weather, a ring stuck in resizing, a photographer in the wrong place.

<partner_details>
{{partner_details}}
</partner_details>
{{#budget}}Budget: {{budget}}{{/budget}}
{{#location}}Location: {{location}}{{/location}}
</context>

<task>
1. Fit check: two or three lines on what the partner details say about the right style (private or public, simple or elaborate, planned with family or just the two of you), and a gentle note if the user has not discussed marriage with their partner: suggest having that conversation first, framed as future plans, so the timing can still be a surprise.
2. Three proposal ideas, different in style, each built on specifics from the details (a meaningful place, a shared memory, a hobby): what happens, why it fits this partner, rough cost range as an estimate, effort, and what could go wrong.
3. The plan: for the idea that fits best, a timeline from now to the day (ring, bookings, accomplices, a believable cover story), and the day itself hour by hour, including how to get the partner there without suspicion and dressed suitably, and whether and how to capture it (a hidden photographer, a friend, or no camera at all).
4. The ring: options (buy it, use a family ring, propose with a placeholder and choose together), how to find the size discreetly, a lead time that allows for custom orders and resizing, and how to think about budget without rules of thumb about months of salary. No brand recommendations.
5. What to say: a short structure (a memory, what you love about them, what you want for your future, the question) and a draft of about 80–120 words in the user's voice using the details given, plus the advice to keep it short and not memorise it word for word.
6. Backup plan: what to do if it rains, the place is crowded or closed, the partner is unwell or in a bad mood, or the ring is not ready.
7. Straight after: a celebration (a dinner booked, friends or family waiting if the partner would like that), who to call first, and when to share it publicly. Include, briefly and kindly, what to do if the answer is "not yet".
</task>

<constraints>
- Never suggest a public or filmed proposal if the details say the partner dislikes attention or being put on the spot.
- Respect cultural or family traditions mentioned (for example, asking for a family's blessing), and do not assume genders or who proposes.
- Do not invent specific venues, prices or vendors; describe the kind of place and say to check local options.
- Stay within the budget, and offer free or low-cost versions of each idea.
- If key details are missing (how the partner feels about surprises, whether marriage has been discussed), list the questions and still give a starter plan.
</constraints>

<output_format>
## Fit check
## Three proposal ideas
Table: Idea | What happens | Why it fits | Cost (estimate) | Risks.
## The plan
Timeline table: When | Task. Then the day hour by hour.
## The ring
## What to say
## Backup plan
## Straight after
</output_format>
