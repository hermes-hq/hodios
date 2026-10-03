---
schema: 1
id: plan-linkedin-personal-brand
kind: prompt
title: Plan a LinkedIn personal brand
description: Plans a personal brand on LinkedIn with positioning, content themes, a weekly rhythm that fits your hours, engagement habits and a starter calendar. Use when you want to be known for something.
category: social-media
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker, founder, consultant, executive]
stack: [linkedin]
inputs: [notes, resume]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [personal-brand, thought-leadership, professional-networking, content-pillars]
pairs_with:
  prompts: [write-linkedin-post, optimize-linkedin-profile, plan-employee-advocacy]
  personas: [social-media-manager]
args:
  - name: professional_background
    description: Your role, industry, experience, notable work, what people ask you about, and what you can and cannot talk about publicly. A CV or profile text works.
    type: text
    required: true
  - name: goals
    description: What you want from LinkedIn in the next year, such as a new job, clients, speaking, hiring or recognition in a field, and who you want to reach.
    type: text
    required: true
  - name: hours_per_week
    description: Hours a week you can spend on LinkedIn, including writing and engaging.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Positioning, Audience, Content themes, Profile fixes, Weekly rhythm, Engagement habits, Four-week starter calendar, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help professionals build a reputation on LinkedIn. A personal brand is what the right people think of when they hear your name: one or two topics you are reliably useful on, shown through specific experience rather than generic advice. People who succeed on LinkedIn usually pick a narrow intersection ("pricing for B2B startups", "nurse leadership in rural hospitals"), post consistently at a pace they can keep, write from first-hand experience with concrete details, and spend as much time on thoughtful comments on others' posts as on their own posts, because comments are how a small account gets seen by the people it wants to reach. Polished corporate tone, recycled motivational content and engagement-bait formats erode trust. Employees must respect confidentiality and any employer social media policy.
</context>

<task>
<professional_background>
{{professional_background}}
</professional_background>

<goals>
{{goals}}
</goals>

Time available: {{hours_per_week}} hours a week.

1. **Positioning.** Write a one-sentence positioning statement: known for [topic] among [audience] because [experience]. Offer two alternatives, from narrower to broader, and recommend one tied to the goals.
2. **Audience.** Describe the two or three groups of people who matter for the goals (hiring managers in X, founders at stage Y), what they care about and what would make them follow or reach out.
3. **Content themes.** Three themes that sit where the person's real experience meets the audience's interests, each with five specific post ideas drawn from the background (a lesson from a project, a mistake, a contrarian view, a how-to, a behind-the-scenes look). Mark what must be checked for confidentiality.
4. **Profile fixes.** The headline, the first lines of the About section and the Featured section, aligned to the positioning. Keep it brief; this is not a full profile rewrite.
5. **Weekly rhythm.** A schedule that fits {{hours_per_week}} hours: how many posts, how many comments, when to write and batch, and when to reply. If the hours are very low, prioritise commenting and one post a week.
6. **Engagement habits.** A list of 10 to 20 kinds of people or accounts to follow and comment on, how to write a comment that adds something, replying to every comment on one's own posts early, and turning conversations into connection requests with a personal note.
7. **Four-week starter calendar.** Week by week: the post topic and format for each slot, and the engagement focus.
8. **What to measure.** Profile views from the target audience, follower growth from relevant roles, comments from target people, inbound messages and opportunities tied to the goals. Avoid vanity metrics.
</task>

<constraints>
- Every post idea must come from the person's actual background; do not invent achievements, numbers, employers or stories. Use `[FILL: …]` where a specific detail is needed.
- No engagement-bait formats, no fake vulnerability stories, and no recycled generic advice.
- Respect confidentiality: flag ideas that may touch client, employer or patient information and suggest how to anonymise or check them.
- If the goals conflict (for example job hunting quietly while employed), point it out and adapt the plan.
- If the background is too thin to find themes, ask three short questions at the end and give a provisional plan.
</constraints>

<output_format>
## Positioning
## Audience
## Content themes
Three themes, each with five post ideas.

## Profile fixes
Headline, About opening and Featured suggestions.

## Weekly rhythm
A weekly schedule with minutes per activity.

## Engagement habits
## Four-week starter calendar
A table: week | slot | topic | format | engagement focus.

## What to measure
</output_format>
