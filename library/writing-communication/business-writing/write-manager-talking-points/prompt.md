---
schema: 1
id: write-manager-talking-points
kind: prompt
title: Write manager talking points for a change
description: Writes talking points, likely questions with honest answers and a do-not-say list so every manager can cascade an organisational change to their team consistently and truthfully.
category: business-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [manager, executive, operations-manager, engineering-manager]
requires: [none]
inputs: [text, notes]
output: [outline, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-communication, cascade, reorg, internal-comms, faq-prep]
pairs_with:
  prompts: [write-internal-announcement, prepare-difficult-conversation, write-faq-from-documents]
args:
  - name: change_summary
    description: What is changing and why, in your own words, for example a reorganisation, new policy, office move, tool rollout or budget cut.
    type: text
    required: true
  - name: what_is_confirmed
    description: What has actually been decided and can be shared, with dates, and what is still open or undecided. Be explicit about the open parts.
    type: text
    required: true
  - name: sensitive_points
    description: Anything managers must handle carefully or not share yet, such as headcount impact, individual cases, legal or consultation constraints, or rumours already circulating.
    type: text
output_contract:
  format: markdown
  sections: [Core message, Talking points, Likely questions, Do not say, Notes for managers, Open items]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a change is cascaded through managers, each team hears a slightly different version. Within a day the differences become rumours, and the most anxious version wins. Talking points exist so that every manager says the same true things, admits the same unknowns, and answers the predictable questions without improvising. The failures are predictable too: false reassurance ("nobody's job is affected") that later turns out wrong, corporate language that sounds evasive, managers speculating about undecided details, and managers distancing themselves ("I don't agree with this either, but…"), which destroys trust in both the change and the manager.

Write as an experienced internal communications lead who has run many cascades: plain words, honest about uncertainty, specific about what happens next.
</context>

<task>
Prepare a cascade pack for managers.

<change_summary>
{{change_summary}}
</change_summary>

<what_is_confirmed>
{{what_is_confirmed}}
</what_is_confirmed>
{{#sensitive_points}}
<sensitive_points>
{{sensitive_points}}
</sensitive_points>
{{/sensitive_points}}

1. If you cannot tell what is changing, for whom, or when, ask up to three questions and stop.
2. Separate confirmed facts from open questions. Every talking point must rest on a confirmed fact; open items become honest "not decided yet" answers with when people will hear more (or `[need: date of next update]`).
3. Write the core message: three sentences a manager could say from memory, covering what is changing, why, and what it means for the team.
4. Write talking points in the order a team meeting would go: what is changing; why now; what it means for this team (with a placeholder for the manager to add team-specific detail); what is not changing; timeline; what happens next and where to get help. Use short spoken sentences, not slide fragments.
5. Draft the questions people will actually ask, including the uncomfortable ones (job security, pay, workload, "was this decided already?", "why weren't we consulted?", "what happens to my project?"). For each, give an honest answer of two to four sentences. Where the answer is unknown, say so plainly and say when or how it will be answered.
6. Write a do-not-say list: phrases that would be false, speculative, legally risky, or that undermine the message, each with what to say instead. Include anything in the sensitive points that must not be shared yet.
7. Add notes for managers: how to open the conversation, how to respond to strong emotions, what to do with questions they cannot answer (write them down and send them to a named route), and when to escalate individual concerns to HR.
</task>

<constraints>
- Never state as fact anything not in what_is_confirmed. No false reassurance, no guesses about numbers, dates or individuals.
- If the change affects jobs, pay, contracts or working conditions, add a line advising that HR (and where relevant legal or employee representatives) review the pack before use, because consultation and disclosure rules may apply.
- Plain spoken language. Ban jargon such as "synergies", "right-sizing", "going forward we will leverage".
- The manager speaks for the organisation: no talking points that blame leadership or disown the decision, and no spin that hides real downsides.
</constraints>

<output_format>
## Core message
Three sentences.
## Talking points
Numbered sections as in step 4, with `[Manager: add …]` where team-specific detail belongs.
## Likely questions
`**Q:** …` then `**A:** …`, hardest questions first.
## Do not say
Table: Do not say · Why · Say instead.
## Notes for managers
Short bullets.
## Open items
Bullets: undecided points and missing facts, with who owns each. "None" if none.
</output_format>
