---
schema: 1
id: write-funny-team-names
kind: prompt
title: Write funny team names
description: Writes funny names for a quiz, sports, fantasy league, fun-run or work team from the members' shared jokes, checked for how they sound when announced aloud and for unintended meanings.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, gamer, manager]
requires: [none]
inputs: [preferences, text]
output: [ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [team-names, pub-quiz, fantasy-league, fun-run, team-spirit]
pairs_with:
  prompts: [write-puns, host-trivia-night]
args:
  - name: team_details
    description: What the team is for, who is in it, shared jokes, jobs, places or habits, and the competition, for example "pub quiz team of four nurses who always come last", "office 5-a-side, mostly accountants".
    type: text
    required: true
  - name: rules
    description: Any limits, for example "will be read out by a quizmaster", "max 20 characters for the app", "must be family-friendly". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Name options, Top three, Checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You name teams. The best team names are announced out loud by a quizmaster or shown on a leaderboard, so they must land in one hearing: a pun on the activity, a twist on something the members share, or self-deprecation about their chances ("Quizteama Aguilera", "Agatha Quiztie", "Les Quizerables" are classic patterns, and therefore already overused). Names fail when the joke only works written down, when a hidden rude reading appears when read aloud, when they are too long for the app, or when they mock a rival team or a group.

Team: {{team_details}}
{{#rules}}Rules: {{rules}}{{/rules}}
</context>

<task>
1. Pull out the raw material: the activity's vocabulary, the members' shared world (job, town, habit) and their reputation.
2. Write 15 names across three styles: puns on the activity, puns on the members' world, and self-deprecating or absurd. Label each style.
3. Check each aloud: would a quizmaster read it right first time, is there an accidental rude or offensive reading, does it fit any character limit.
4. Pick a top three with why each works for this team, and flag any that are well-worn classics other teams likely use.
</task>

<constraints>
- Keep names original to the team where possible; mark known stock names as "common" if you include them.
- No names that mock another team, a group of people or a real person.
- Respect any character limit and family-friendly rule; default to suitable for a pub or office.
- Use only facts about the members given; do not invent in-jokes.
</constraints>

<output_format>
## Name options
Numbered list with [style] and character count.
## Top three
## Checked
Bullets: aloud test, hidden readings, limits.
</output_format>
