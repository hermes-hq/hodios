---
schema: 1
id: interview-lapsed-users
kind: prompt
title: Interview people who stopped using your tool
description: Plans churn interviews for a free or open-source tool without telemetry, with how to find lapsed users,, a switch-interview guide and a synthesis template. Use when you need to know why people stop.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [maintainer, product-manager, founder, developer-advocate]
requires: [none]
inputs: [text, notes]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [open-source, churn-interview, switch-interview, jobs-to-be-done, retention, no-telemetry]
pairs_with:
  prompts: [synthesize-customer-interviews, analyze-cancellation-feedback, collect-adopter-stories]
args:
  - name: product
    description: What the tool does, how people get it (download, package, hosted), and what you already suspect about why people leave.
    type: text
    required: true
  - name: contact_channels
    description: Where you can reach past users - issue authors, Discussions, Discord, a mailing list, release notes, an uninstall page, social followers.
    type: text
  - name: interview_count
    description: How many interviews you can realistically run.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Who to talk to, Recruiting, Interview guide, Synthesis template, Ethics and consent]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Without telemetry, the only reliable way to learn why people stop using a tool is to ask them, and the way you ask decides whether you hear the truth. The switch interview from Jobs to Be Done reconstructs a real decision on a timeline (first thought, passive looking, trigger, active looking, decision) and maps four forces: the push of the current situation and the pull of the alternative against anxiety about the change and the habit of the old way. Run in reverse it explains churn. The Mom Test rules apply: ask about specific past events, not opinions or hypotheticals, and talk less than the interviewee. Talk to people soon after they left, roughly two weeks to two months, while they still remember why.
</context>

<task>
<product>
{{product}}
</product>
{{#contact_channels}}
Ways to reach past users:
{{contact_channels}}
{{/contact_channels}}
Target: {{interview_count}} interviews.

If you cannot tell how people get and use the tool, ask and stop.

1. **Define who counts as lapsed** for this tool (for example: installed in the last six months and has not opened it in a month, or asked for help and went quiet), plus two comparison groups worth a few interviews each: people who tried it and never got going, and people who almost left but stayed.
2. **Recruit without tracking anyone.** Use only channels where people chose to be reachable: a short opt-in line in release notes or the README, a post in the project's community, an optional "tell us why" link on an uninstall or download page, replies to people who said publicly they stopped. Write the recruiting message (under 80 words): who you are, 20 to 30 minutes, what you want to learn, that criticism is the point, and an optional thank-you you can actually give. Say how many to contact to get {{interview_count}} interviews and why.
3. **Write the interview guide** (25 minutes):
   - warm-up about their work and setup, not the tool;
   - timeline: when they started, what they hoped for, the first time it fell short, the moment they stopped, what they use now;
   - forces: what pushed them away, what pulled them to the alternative, what they worried about switching, what habit kept them;
   - one question on what would have to be true for them to come back (as a past-tense probe where possible);
   - follow-up probes such as "tell me about the last time" and "what did you do instead".
   Mark every question that is leading or hypothetical and rewrite it.
4. **Synthesis template.** One row per interview with trigger, forces, alternative chosen and quotes, then a method for clustering after five or more interviews and a rule for when a pattern is real (seen in at least three interviews, not just the loudest one).
5. **Ethics and consent.** How to ask for permission to record and to quote, how to store and delete notes, and how to report findings back to participants.
</task>

<constraints>
- Never recruit from data people did not offer for this purpose (scraped emails, commit author addresses, stargazer lists).
- Do not pitch, defend or fix during the interview; note promises to follow up and keep them.
- Do not invent findings; the output is the plan and instruments, not results.
</constraints>

<output_format>
## Who to talk to
Definitions and counts per group.
## Recruiting
Channels, message, how many to contact.
## Interview guide
Timed sections with questions and probes.
## Synthesis template
| Interview | Trigger | Push | Pull | Anxiety | Habit | Now uses | Quote |
## Ethics and consent
</output_format>
