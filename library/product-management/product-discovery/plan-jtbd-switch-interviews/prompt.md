---
schema: 1
id: plan-jtbd-switch-interviews
kind: prompt
title: Plan jobs-to-be-done switch interviews
description: Plans switch interviews with recent buyers, with a timeline from first thought to purchase and probes for the push, pull, anxiety and habit forces.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, ux-researcher, marketer, founder]
requires: [none]
inputs: [text]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [jobs-to-be-done, switch-interviews, forces-of-progress, buying-timeline, customer-interviews]
pairs_with:
  prompts: [define-jobs-to-be-done, write-interview-outreach-messages, interview-non-customers, synthesize-customer-interviews]
args:
  - name: product_or_category
    description: The product or category people switched to (yours or a competitor's), and what they typically switched from.
    type: text
    required: true
  - name: who_switched
    description: Who you can reach that recently bought, signed up, upgraded or switched, and roughly when they did it.
    type: text
    required: true
  - name: learning_goal
    description: What you want to learn (why people buy, what triggers the search, what nearly stopped them) and the decision it informs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who to interview, Recruiting, Interview guide, Forces probes, Capturing the timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a jobs-to-be-done researcher who runs switch interviews. A switch interview reconstructs one real purchase or switch as a documentary: from the first thought that something had to change, through passive looking, the event that started active looking, comparing and deciding, to first use and whether it stuck. Asking "why did you buy?" gets a tidy rationalisation; walking through the timeline with concrete details (where they were, who was involved, what else they considered, what they almost did instead) gets the real causes. The four forces explain the switch: the push of the current situation, the pull of the new solution, the anxiety about the new solution, and the habit of the present way. The best participants switched recently (within about the last 90 days, so memory is fresh) and made a real choice with their own money or authority. Interviewing people who considered switching but did not is just as valuable, because habit and anxiety show up most clearly there.
</context>

<task>
Product or category and what people switched from:

<product_or_category>
{{product_or_category}}
</product_or_category>

Who can be reached: {{who_switched}}

Learning goal:

<learning_goal>
{{learning_goal}}
</learning_goal>

1. Define who to interview: recent switchers (with a recency window), the decision maker or the person who drove the switch, a few who switched away or considered and stayed put, and exclusions (people given the product by an employer without choice, if the goal is about buying). Suggest a number (often 8 to 12 per segment before patterns repeat) and how to split it.
2. Give recruiting criteria and a short screener: when they bought or switched, what they used before, their role in the decision. Note to recruit by behaviour from records (sign-up date, plan change) rather than self-description.
3. Write the interview guide (about 45 to 60 minutes) as a timeline walk-through: set the scene (the day they bought or signed up: where, which device, who was there); go back to first thought (when did they first realise the old way was not working, what happened that day); passive looking (what they noticed or heard, from whom); the trigger for active looking (the event that made it urgent); comparing (what else they considered, including doing nothing, and how they compared); deciding (what tipped it, who had to agree, what almost stopped them); first use and since (did it do the job, what surprised them, would they switch again). Each section has neutral probes for concrete detail.
4. Write probes for each force: push (what was going wrong, what it cost), pull (what they imagined life would be like), anxiety (what worried them about the new option, what they did to reduce the worry), habit (what they liked about the old way, what they had to give up or learn).
5. Give a capture template: a timeline with dated events, a forces grid with quotes, and the job statement candidate ("When [situation], I want to [motivation], so I can [outcome]") to fill after each interview for later synthesis.
</task>

<constraints>
- No questions about future intentions or hypothetical features; every question is about what happened.
- Do not lead with the product's features or ask people to rate the product; the interview is about their decision, not your product.
- Keep personal details minimal; ask for consent to record and avoid collecting sensitive information beyond what the goal needs.
- If the people available did not actually choose (for example assigned users) or switched long ago, say how that weakens the evidence and suggest how to find better participants.
- Do not invent forces or findings; the output is a plan and guide, not results.
</constraints>

<output_format>
## Who to interview
Segments with counts, recency window and exclusions.

## Recruiting
Criteria and screener questions.

## Interview guide
Timed sections in timeline order, each with main questions and probes.

## Forces probes
Four subsections: push, pull, anxiety, habit, each with three to five probes.

## Capturing the timeline
The capture template: timeline table, forces grid and job statement line.
</output_format>
