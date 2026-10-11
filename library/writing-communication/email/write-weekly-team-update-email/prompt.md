---
schema: 1
id: write-weekly-team-update-email
kind: prompt
title: Write a weekly team update email
description: Writes a manager's weekly email to their own team with this week's priorities, decisions made, changes that affect their work, specific thanks and what is coming, readable in two minutes.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, engineering-manager, operations-manager, project-manager]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [team-update, weekly-update, managing-down, transparency, priorities]
pairs_with:
  prompts: [write-weekly-update-to-manager, write-team-newsletter, write-status-report]
args:
  - name: notes
    description: Your raw notes for the week - leadership news, decisions, priority changes, wins, people news, dates, anything the team asked about.
    type: text
    required: true
  - name: team_context
    description: Team size and type, for example "8-person support team across two shifts" or "remote engineering team of 5".
    type: string
output_contract:
  format: markdown
  sections: [Email, Left out, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A weekly email from a manager to the team is one of the cheapest ways to keep people aligned and to stop rumours, but most turn into a forwarded pile of leadership news nobody reads. The ones teams value answer the questions people actually have on Monday: what matters most this week and why, what was decided that affects my work, what changed (priorities, people, processes, dates), what is coming that I need to prepare for, and who did something worth noticing. They translate company news into what it means for this team, they say "I don't know yet" when that is true, and they keep a stable structure so people know where to look. Thanks should be specific (what the person did and its effect); generic praise ("great job everyone") adds nothing. Sensitive people news (performance, health, pay, departures not yet announced) never goes in.
</context>

<task>
Write this week's team update email.{{#team_context}} Team: {{team_context}}.{{/team_context}}

<notes>
{{notes}}
</notes>

1. Sort the notes into: top priorities this week, decisions, changes, coming up (dates), thanks, and leadership or company news. Drop items that do not affect this team, and list them under Left out.
2. For each item of company news kept, add one line on what it means for this team. If the meaning is not known, say "More when I know it" rather than guessing.
3. Write the email with a stable structure:
   - Subject: "Team update, week of [date]: [the one headline]".
   - One-line opener with the headline.
   - **This week's priorities:** up to three, each with why.
   - **Decided:** decisions and who they affect.
   - **Changed:** priority, process, people or date changes.
   - **Coming up:** dated items needing preparation.
   - **Thanks:** specific, named, from the notes only.
   - Close with an invitation to raise questions, and where.
   Omit empty sections rather than padding them.
4. Under Notes, flag anything that looks sensitive and should be removed or told individually first, and questions the team is likely to ask.
</task>

<constraints>
- Readable in two minutes: under about 300 words.
- Only facts from the notes; never invent wins, numbers, names or decisions.
- No spin on bad news; no corporate filler ("exciting times", "synergies").
- Never include individuals' performance, health, pay or unannounced departures.
</constraints>

<output_format>
## Email
Subject line, then the body with the sections above.
## Left out
Bullets of items dropped and why.
## Notes
Bullets: sensitive items, likely questions.
</output_format>
