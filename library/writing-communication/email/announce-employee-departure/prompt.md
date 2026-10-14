---
schema: 1
id: announce-employee-departure
kind: prompt
title: Announce an employee's departure
description: Writes a manager's note that a colleague is leaving, with only what can be said, a fair thank-you, who takes over what and from when, for resignations, retirements and involuntary exits.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [departure, resignation, people-news, transition-plan, team-announcement]
pairs_with:
  prompts: [respond-to-resignation, plan-employee-offboarding, write-farewell-message]
args:
  - name: person
    description: Name, role, last day, and how long they have been with the team.
    type: string
    required: true
  - name: exit_type
    description: Voluntary covers resignations and retirements; involuntary covers dismissals and redundancies; mutual covers agreed exits. This decides how much can be said.
    type: enum
    enum: [voluntary, involuntary, mutual]
    default: voluntary
  - name: agreed_message
    description: What the person and HR have agreed can be said, for example "leaving to join a startup" or "nothing beyond leaving". For involuntary exits this is essential.
    type: text
  - name: transition
    description: Who takes over which responsibilities, from when, and whether the role will be backfilled.
    type: text
  - name: audience
    description: Team means the person's own team; wider means other departments; clients means external contacts.
    type: enum
    enum: [team, wider, clients]
    default: team
output_contract:
  format: markdown
  sections: [Before sending, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A departure announcement is read for two things: what it says about how people are treated here, and what changes for my work. Getting it wrong is easy. Saying more than the person agreed to (where they are going, why they are leaving) breaks their trust; saying too little in a cold tone after years of service reads as erasure. For involuntary exits, anything that hints at the reason can expose the organisation and hurt the person, so the wording must stick to what HR and the person agreed, and is usually only that they are leaving and when. The order also matters: the person's own team should hear before the wider company, ideally in person, and clients should hear with a named new contact. The most useful part for readers is often the transition: who to go to for what from which date, and whether the role will be filled.
</context>

<task>
Write a departure announcement for a {{audience}} audience about: {{person}} ({{exit_type}}).

{{#agreed_message}}
<agreed_message>
{{agreed_message}}
</agreed_message>
{{/agreed_message}}
{{#transition}}
<transition>
{{transition}}
</transition>
{{/transition}}

1. Before sending: list the checks. Has the person seen and agreed the wording? Has HR approved it (essential for involuntary or mutual exits)? Has the person's own team been told in person first? For involuntary exits with no agreed message, say to get one from HR before sending and write the most neutral version.
2. Write the email:
   - Subject: "[Name] is leaving on [date]" or, for clients, "Your contact at [company]: change from [date]".
   - First line: who is leaving and their last day.
   - For voluntary exits: where they are going or why, only if in the agreed message; a specific thank-you naming one or two real contributions from the input; an invitation to a send-off if given.
   - For involuntary or mutual exits: no reason, no hint of one, no praise that sounds like a reference, and no negative words. A short, respectful line ("We thank [name] for their work and wish them well") is enough.
   - Transition: who handles what from when, and backfill plans if decided.
   - Where to send questions.
3. For clients, focus on continuity and the new contact; no internal detail.
4. Under Notes, suggest timing (after the team is told, before rumours), whether the departing person should send their own goodbye, and what not to say if asked.
</task>

<constraints>
- Under about 180 words in the body.
- Never state or imply a reason for leaving beyond the agreed message. Never mention performance, misconduct, health, pay or negotiations.
- Never invent contributions, destinations or transition owners; use `[need: …]`.
- No spin ("exciting new chapter for the team") and no coldness.
- For involuntary exits, add a line in Notes that HR or legal should review the wording before sending.
</constraints>

<output_format>
## Before sending
Bullets of checks.
## Email
Subject line, then the body.
## Notes
Bullets: timing, what to say if asked, reviews.
</output_format>
