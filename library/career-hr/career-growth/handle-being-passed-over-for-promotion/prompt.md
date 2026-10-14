---
schema: 1
id: handle-being-passed-over-for-promotion
kind: prompt
title: Handle being passed over for promotion
description: Helps you respond after missing a promotion - steady the first reaction, get specific feedback, agree a dated path with your manager, and decide whether to stay and push or move on.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [plan, script, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [missed-promotion, career-setback, feedback-conversation, next-level]
pairs_with:
  prompts: [prepare-promotion-case, decide-whether-to-quit, build-development-plan]
  personas: [career-coach]
args:
  - name: situation
    description: The role you went for, who got it or what you were told, any reasons given, how long you have been at your level, and how you are reacting.
    type: text
    required: true
  - name: criteria
    description: The promotion criteria or next-level expectations if you have them, pasted or summarised.
    type: text
output_contract:
  format: markdown
  sections: [The first 48 hours, What the decision tells you, Feedback conversation, Your path to yes, Stay or go, Signs to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people deal with a promotion that went to someone else, or did not happen. The common mistakes are reacting in public, asking "why not me?" in a way that sounds like an argument, accepting a vague "keep doing what you're doing", and staying for years on a promise with no date. Promotions are usually decided on evidence of already working at the next level, visibility to the people in the decision, timing and budget, and sometimes politics. A useful no turns into specific gaps, examples of what next-level work looks like, a sponsor in the room, and a date to check progress. Sometimes the honest reading is that the path is blocked (no budget, no role, a manager who will not sponsor), and leaving is the better move.

<situation>
{{situation}}
</situation>
{{#criteria}}
<criteria>
{{criteria}}
</criteria>
{{/criteria}}
</context>

<task>
1. The first 48 hours: what to do and not do (congratulate the person who got it if there was one, avoid venting at work or online, avoid deciding to quit that day), and a short neutral line to use with colleagues.
2. What the decision tells you: from the reasons given and the criteria, list the likely explanations (evidence gap, visibility gap, timing or budget, no open role, fit with a specific opening, relationship issues) and say which seem most likely and what would confirm them.
3. Feedback conversation: a request for a meeting a few days later and a script built on curiosity: ask what the deciding factors were, what next-level work they would need to see, two examples of it, who else has a say, and when to review progress. Include how to respond calmly if the feedback feels unfair, and how to close with an agreed next step.
4. Your path to yes: turn the likely gaps into a three to six month plan with specific pieces of work, visibility actions, evidence to collect and a check-in date, in a short table. If criteria were given, map gaps to them.
5. Stay or go: questions that show whether the path is real (Is there a role and budget? Will the manager sponsor them? Has anyone at their level been promoted recently? Did the feedback name things they can actually change?) and a simple rule for when to start looking elsewhere.
6. Signs to watch: signals over the next months that the commitment is being kept or not.
</task>

<constraints>
- Do not assume the decision was unfair or fair; work from what they were told and say what is unknown.
- If the situation suggests discrimination or retaliation, note that this is a different issue, suggest keeping records and getting HR, union or legal advice, and do not judge it yourself.
- Keep scripts curious and short. No blame, no comparisons with the person promoted.
- If their account shows a clear gap they have not seen, name it kindly.
</constraints>

<output_format>
## The first 48 hours
## What the decision tells you
Table: Possible reason | Likelihood | How to confirm.
## Feedback conversation
Meeting request, then script.
## Your path to yes
Table: Gap | Action | Evidence | By when.
## Stay or go
## Signs to watch
</output_format>
