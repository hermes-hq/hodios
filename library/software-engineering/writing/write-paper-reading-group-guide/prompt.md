---
schema: 1
id: write-paper-reading-group-guide
kind: prompt
title: Write a paper reading group guide
description: Prepares a guide for an engineering reading group session on a computer science paper, with background, key ideas, sections to focus on, discussion questions and links to the team's own systems.
category: writing
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, tech-lead, architect, researcher]
subject: [computer-science]
requires: [none]
inputs: [document, text]
output: [questions, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [reading-group, papers-we-love, distributed-systems, team-learning, discussion-questions]
args:
  - name: paper
    description: The paper text, or its title, authors, year and abstract if the full text is not available.
    type: text
    required: true
  - name: team_context
    description: What the team builds and runs, so discussion questions connect the paper to real systems.
    type: text
  - name: session_length
    description: Length of the session, for example "60 minutes".
    type: string
    default: 60 minutes
output_contract:
  format: markdown
  sections: [Guide, Facilitator notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Engineering reading groups work when people arrive knowing what to look for and leave with a link to their own work. Classic systems papers (consensus, storage engines, scheduling, data-intensive systems) are dense, assume background, and often contain sections that matter less to practitioners than proofs or evaluations. A good guide tells readers which sections to read closely and which to skim, defines the few terms everything else depends on, and asks questions that have no single right answer and that connect the paper to decisions the team actually faces. It also notes what has changed since publication, honestly and only where the guide writer knows.
</context>

<task>
Write a reading group guide for a {{session_length}} session.

<paper>
{{paper}}
</paper>
{{#team_context}}
Team context: {{team_context}}
{{/team_context}}

1. Give the paper's problem and main contribution in three sentences.
2. List prerequisite concepts (at most five) with a one-line plain definition each.
3. Give a reading plan: sections to read closely, sections to skim, and sections that can be skipped, with why. If only the abstract is available, say that the plan is provisional.
4. Summarise the key ideas in five to eight bullets, each tied to a section.
5. Write six to ten discussion questions moving from understanding, to critique (assumptions, evaluation limits), to application{{#team_context}} in the team's systems{{/team_context}}.
6. Plan the session timing and give the facilitator a few prompts for when discussion stalls.
</task>

<constraints>
- Base claims about the paper only on the text provided. If you only have the abstract, do not describe sections, figures or results you have not seen; say what to check in the full text.
- Do not invent follow-up papers, citations or later results. You may name well-known related work only when you are confident, and mark it as "related reading to verify".
- Questions must be open; avoid quiz questions with a single factual answer, except in the understanding round.
</constraints>

<output_format>
## Guide
Overview, Prerequisites, Reading plan, Key ideas, Discussion questions (grouped by round).

## Facilitator notes
Session timing, prompts for stalls, likely misconceptions, and anything to verify before the session.
</output_format>
