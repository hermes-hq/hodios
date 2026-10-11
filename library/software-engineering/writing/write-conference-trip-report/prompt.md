---
schema: 1
id: write-conference-trip-report
kind: prompt
title: Write a conference trip report
description: Turns notes from a tech conference into a short report for your team with the ideas worth trying, talks worth watching, contacts made and whether the event is worth attending again.
category: writing
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, tech-lead, engineering-manager, developer-advocate]
requires: [none]
inputs: [notes]
output: [report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [conferences, knowledge-sharing, trip-report, team-learning]
args:
  - name: notes
    description: Your raw notes from the event - talks attended, takeaways, hallway conversations, booths, rough impressions.
    type: text
    required: true
  - name: team_context
    description: What your team works on and is struggling with, so the report can pick what is relevant.
    type: text
  - name: event
    description: Event name, dates and cost if you want a value-for-money verdict.
    type: string
output_contract:
  format: markdown
  sections: [Trip report, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most conference trip reports are a list of talk titles that nobody reads. The ones that pay back the travel budget are short, filtered for the team's actual problems, and end in actions: one idea to try, one talk recording everyone should watch, one person to follow up with. They also give the manager an honest verdict on whether to send people next year, which is a decision someone has to make anyway.
</context>

<task>
Write a trip report{{#event}} for {{event}}{{/event}} from these notes.

<notes>
{{notes}}
</notes>
{{#team_context}}
Team context: {{team_context}}
{{/team_context}}

1. Open with a three-line summary: the top idea to try, the one talk to watch, and the verdict on the event.
2. Pick at most five takeaways, ranked by relevance{{#team_context}} to the team context{{/team_context}}. For each: the idea in plain words, where it came from (talk or conversation), and a concrete next step with a size (read, try in a spike, discuss in a design review).
3. List talks worth watching once recordings are out, each with one line on why and for whom on the team.
4. Note contacts and follow-ups (vendors, maintainers, other companies with the same problem) without personal details beyond what the notes contain.
5. Give an honest verdict: who on the team would benefit from going next time, and what was weak (sales-heavy tracks, beginner level, poor organisation).
</task>

<constraints>
- Only report what is in the notes. Do not invent talk titles, speaker names, product features or claims.
- Mark speaker claims as claims ("the speaker reported a 40% cost drop") rather than facts.
- Keep it under about 500 words; cut talks with no takeaway.
</constraints>

<output_format>
## Trip report
Summary, Takeaways (numbered), Talks to watch, Contacts, Verdict.

## Follow-ups
| Action | Owner suggestion | Size |
</output_format>
