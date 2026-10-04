---
schema: 1
id: learn-new-sport-as-adult
kind: prompt
title: Learn a new sport as an adult
description: Plans how an adult beginner learns a sport such as tennis, golf or swimming, with skill progressions, finding lessons or a club, realistic milestones and kit to borrow before buying.
category: sports
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [adult-beginner, skill-progression, sports-club, lessons, beginner-kit]
pairs_with:
  prompts: [explain-sport-to-newcomer, design-warm-up, plan-sport-conditioning]
args:
  - name: sport
    description: The sport you want to learn, for example tennis, golf, swimming, climbing, volleyball or martial arts. Add your starting point if any ("played badminton at school", "can swim one length of breaststroke").
    type: string
    required: true
  - name: weeks
    description: How many weeks the plan should cover.
    type: number
    default: 12
  - name: sessions_per_week
    description: Realistic sessions per week, counting lessons and practice.
    type: number
    default: 2
  - name: limitations
    description: Optional - injuries, health conditions, fears (for example of deep water), budget or schedule limits, and what you want out of it (social, fitness, compete one day).
    type: text
output_contract:
  format: markdown
  sections: [Where you are starting, How to get started, Skill progression, Week-by-week plan, Milestones, Kit, Staying with it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help adults take up a sport they have never played, or have not played since school. Adult beginners learn differently from children: they progress faster at first through understanding, but they are more self-conscious, more injury-prone if they do too much too soon, and more likely to quit when progress stalls or when they feel out of place. What keeps adults going is early coaching on the fundamentals, a social setting at their level, visible milestones, and not spending a fortune on kit before they know they like it.

Sport: {{sport}}
Weeks: {{weeks}}
Sessions per week: {{sessions_per_week}}
{{#limitations}}Limitations and goals: {{limitations}}{{/limitations}}
</context>

<task>
1. Where you are starting: restate the starting point and goals in two lines. If the limitations mention an injury, a heart, joint or breathing condition, pregnancy, or recent surgery, say plainly to check with a doctor or physiotherapist before starting, and keep the plan gentle until they have. If the sport itself is unclear, ask and stop.
2. How to get started: the usual routes for adults in this sport (adult beginner courses, group lessons, club taster sessions, pay-and-play venues, social leagues), what to ask when choosing a coach or club, and how to find them locally. Recommend at least a few lessons with a qualified coach for technique-heavy or risk-bearing sports such as swimming, golf, climbing and martial arts.
3. Skill progression: the ordered fundamentals for this sport, from first session to playing a real game or completing a real session, with what "good enough to move on" looks like for each.
4. Week-by-week plan for {{weeks}} weeks at {{sessions_per_week}} sessions a week: what each week focuses on, split between lessons, practice and play, with a short warm-up habit and rest days. Build load gradually and include a lighter week roughly every fourth week.
5. Milestones: four to six realistic milestones over the period (for example "rally ten shots", "swim 100 m continuous front crawl", "play nine holes"), with honest notes on what is normal for adult beginners.
6. Kit: the essentials, what to borrow or rent first, what is worth buying early for safety or comfort (properly fitted shoes, a helmet, goggles), and what to leave until later.
7. Staying with it: common reasons adults quit this sport and one counter for each, how to find people at your level, and how to handle the plateau around weeks six to eight.
8. Before answering, check that the weekly plan matches the number of weeks and sessions given and that the progression never jumps a fundamental.
</task>

<constraints>
- Not a conditioning or gym programme; mention sport-specific fitness briefly and point to a fitness plan for more.
- No medical advice; for pain that is sharp, persistent or comes with swelling, tell the user to stop and get it checked.
- Do not name specific clubs, coaches, brands or prices; describe what to look for.
- Encouraging and realistic: no promises of rapid mastery.
</constraints>

<output_format>
## Where you are starting
## How to get started
## Skill progression
Numbered, each with "ready to move on when…".
## Week-by-week plan
Table: Week | Focus | Sessions | Notes.
## Milestones
## Kit
Table: Item | Borrow, rent or buy | Why.
## Staying with it
</output_format>
