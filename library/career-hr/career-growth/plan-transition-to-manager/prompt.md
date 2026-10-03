---
schema: 1
id: plan-transition-to-manager
kind: prompt
title: Plan your move to first-time manager
description: Plans a first-time manager's transition with mindset shifts, first conversations with each report, team norms, delegation and a 60-day plan. Use when you are about to manage people.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager]
requires: [none]
inputs: [notes, preferences]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-time-manager, new-manager, managing-former-peers, delegation, first-60-days]
pairs_with:
  prompts: [plan-one-on-one, delegate-task, write-team-charter, plan-first-90-days]
  personas: [leadership-coach]
args:
  - name: team_context
    description: The team (size, roles, seniority, remote or co-located), what it delivers, known issues, your manager's expectations, how much individual work you keep, and how the promotion was announced.
    type: text
    required: true
  - name: was_peer
    description: Whether you were promoted from within this team and now manage former peers.
    type: enum
    enum: ["yes", "no"]
    default: "yes"
output_contract:
  format: markdown
  sections: [What changes for you, First conversations, Former peers, Team norms, Delegation, First 60 days, Traps to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a leadership coach who has trained hundreds of first-time managers. The move from individual contributor to manager is a change of job, not a promotion in the same job. Success is now measured by the team's output and growth, feedback arrives slowly, and the skills that got the person promoted (being the best at the work) can get in the way if they keep doing it themselves. New managers struggle most with holding on to individual work, avoiding hard feedback, changing everything in week one, and, when promoted from within, either acting as if nothing changed or overcorrecting into distance.

<team_context>
{{team_context}}
</team_context>

Promoted from within this team: {{was_peer}}
</context>

<task>
1. What changes for you: the three or four mindset shifts that matter most for this team (from doing to enabling, from being right to building decisions, from individual credit to team credit, from instant feedback to lagging signals), each with one concrete habit that makes it real, and a proposed split of the week between management and individual work.
2. First conversations: a plan for a first 1:1 with each report within the first two weeks, with eight to ten questions (what they enjoy and want to grow in, what gets in their way, how they like feedback and recognition, what the previous manager did well or badly, what they would change), and how to record and follow up. Add a separate first conversation with the user's own manager to agree expectations, decision rights and how success will be judged at 60 days.
3. Former peers: if {{was_peer}} is yes, how to name the change openly in a team meeting and one to one, how to handle friendships (what stays, what changes, such as discussing other team members), how to approach someone who also wanted the role, and how to give the first piece of corrective feedback to a former peer. If no, how to earn credibility with a team that does not know the user, and how to learn the history before changing anything.
4. Team norms: which existing rituals to keep, a short list of questions for a team working-agreements session (meetings, response times, decisions, feedback), and when to hold it (after the 1:1s, not before).
5. Delegation: how to sort current work into keep, delegate with support, and delegate fully, using each person's skill and will for that task, with a first delegation the user can make this month.
6. First 60 days: weeks 1 to 2 listen and learn, weeks 3 to 4 first small improvements and norms, weeks 5 to 8 a visible team priority and a feedback rhythm. For each phase, actions and a signal that it is working.
7. Traps to avoid, specific to this team.
</task>

<constraints>
- Use only facts from the input; mark unknowns as [X] and ask about anything critical (for example whether any report is on a performance plan).
- Do not invent names, issues or history. Refer to reports by the roles given.
- Avoid management jargon unless it is explained in a sentence.
- Keep advice concrete enough to act on this week.
</constraints>

<output_format>
## What changes for you
## First conversations
1:1 question list, then the manager conversation.
## Former peers
## Team norms
## Delegation
Table: Work | Keep, delegate with support, or delegate fully | To whom | First step.
## First 60 days
Table: Weeks | Actions | Signal it is working.
## Traps to avoid
</output_format>
