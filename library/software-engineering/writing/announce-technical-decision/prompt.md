---
schema: 1
id: announce-technical-decision
kind: prompt
title: Announce a technical decision to engineering
description: Announces a technical decision already made to the wider engineering organisation, with the rationale, alternatives rejected, what changes for whom and when, and when it will be revisited.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, architect, engineering-manager]
requires: [none]
inputs: [document, notes]
output: [message, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [decision-communication, engineering-announcement, rationale, change-management, adr]
pairs_with:
  prompts: [write-decision-memo, write-cross-team-migration-request, write-tool-adoption-proposal]
args:
  - name: decision
    description: The decision, who made it, the ADR or RFC if any, the reasons, the options considered and what changes.
    type: text
    required: true
  - name: audience
    description: Who reads it (whole engineering org, specific teams), where (email, Slack, wiki), and expected reactions or objections.
    type: text
output_contract:
  format: markdown
  sections: [Announcement, Short version, Placeholders]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A decision that people learn about by rumour or by a failing build gets relitigated for months. Engineers accept decisions they would not have made when they can see that the alternatives were considered seriously, why the trade-off was made, what it costs them personally (work, deadlines, things they can no longer use), and that there is a defined path to raise new evidence. Announcements fail when they sell instead of explain, hide the costs, leave out who is affected and by when, or invite open debate on something that is already decided, which invites a thread of re-arguing.
</context>

<task>
Write the announcement of this decision.

<decision>
{{decision}}
</decision>
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. Open with the decision in one sentence and the date it takes effect.
2. Explain why in three to five sentences: the problem, the deciding factors, and the trade-off accepted.
3. List the alternatives considered and the main reason each was not chosen, fairly stated.
4. Say what changes for whom: who must do something, by when, what stays the same, and what support or docs exist.
5. Acknowledge the costs and the groups for whom this is worse, honestly.
6. Say how to raise new information (a specific channel or owner) and when or under what conditions the decision will be revisited.
7. Link the full ADR or RFC if one exists, using a placeholder.
{{#audience}}8. Anticipate the objections mentioned and address each briefly.{{/audience}}
</task>

<constraints>
- Do not oversell or describe the chosen option as perfect; do not misrepresent rejected options.
- Do not invent dates, owners or migration steps not in the input; use placeholders and list them.
- Make clear the decision is made; invite questions and new evidence, not a re-vote.
- Under about 400 words for the main message.
</constraints>

<output_format>
## Announcement
Title, then the message.

## Short version
Two or three sentences for a chat channel, linking to the full announcement.

## Placeholders
Facts to fill before sending.
</output_format>
