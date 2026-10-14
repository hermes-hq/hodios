---
schema: 1
id: plan-via-ferrata-day
kind: prompt
title: Plan a via ferrata day
description: Plans a via ferrata outing with a route matched to grade and fitness, certified kit and how to check it, clipping discipline, storm and queue timing, escape points and when to hire a guide.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [via-ferrata, klettersteig, energy-absorber, fixed-cables, alpine-day, climbing-helmet]
pairs_with:
  prompts: [plan-for-lightning-on-trail, choose-mountain-guide, set-turnaround-time]
args:
  - name: route
    description: The via ferrata or area, its grade and grading system if known (for example A to F, or K1 to K6), length, approach and descent, and the date.
    type: text
    required: true
  - name: party
    description: Who is going, ages and body weights if children or light adults are in the group, climbing or ferrata experience, fitness, head for heights, and kit owned or to rent.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Route and timing, Kit and checks, On the cable, Weather and other people, Turn-back and rescue]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan via ferrata days. A via ferrata gives access to steep terrain with steel cables, rungs and ladders, but it is still mountaineering: a fall onto a lanyard can injure badly even with the right kit, steep sections are strenuous for arms, and the line usually has few exits. The key safety items are a lanyard set with an energy absorber that meets the current standard, a harness and a helmet; old or recalled sets, home-made lanyards and slings are dangerous. Lighter people, including many children, may need a set rated for their weight or an extra rope belay. Grading systems differ (A to F in many Alpine areas, K1 to K6 in others) and guidebooks rate the hardest move, not the sustained effort. Cables attract lightning, and queues on popular routes slow everything down.

<route>
{{route}}
</route>

<party>
{{party}}
</party>
</context>

<task>
1. Fit check: compare the grade, length and exposure with the party, especially strength for steep sections, children, light adults and nerves on ladders. Suggest an easier first route or a guide if it is a stretch.
2. Route and timing: approach, the ferrata sections with grades if given, escape points, descent, and a time plan with a start early enough to be off before afternoon storms. Tell them to confirm details in a current topo or guidebook.
3. Kit and checks: harness, certified via ferrata lanyard set with energy absorber (check age, recall notices, weight range), helmet, gloves, approach shoes with grippy soles, layers, water and food. Explain how to check a rented set and to never use a sling or rope instead.
4. On the cable: always one lanyard clipped, ideally both, clip past anchors one at a time, one person per cable section between anchors, rest positions, passing and being passed, and keeping children clipped with adult help or a short rope.
5. Weather and other people: storms and cables, wet rock and rungs, falling stones from parties above, queues, and how they change the plan.
6. Turn-back and rescue: triggers (storm building, someone tiring before the crux, queues putting the finish too late), what to do if someone freezes on exposed ground, and the local emergency number to check before leaving.
</task>

<constraints>
- Never suggest improvised lanyards, slings or ropes in place of a certified energy-absorbing set.
- Do not invent route grades, timings or exits; work from what they give and tell them to check the topo.
- Recommend a guide or course for complete beginners on harder grades, and for children who are below a set weight range.
</constraints>

<output_format>
## Fit check
## Route and timing
Table: Section | Grade or difficulty | Time | Escape point.
## Kit and checks
Checklist.
## On the cable
## Weather and other people
## Turn-back and rescue
</output_format>
