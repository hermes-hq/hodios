---
schema: 1
id: run-listening-session
kind: prompt
title: Run a listening session after a change
description: Plans a listening session after a change, bad news or a difficult event so staff or members can raise concerns safely - format, ground rules, questions, anonymous options, and a visible follow-up.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, executive, operations-manager, teacher]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [change-management, psychological-safety, employee-voice, town-hall, follow-up]
pairs_with:
  prompts: [handle-team-resistance-to-change, facilitate-tense-meeting, plan-all-hands-meeting]
args:
  - name: what_happened
    description: The change or event people are reacting to (a reorganisation, a policy change, layoffs, a merger, an incident) and how people are feeling as far as you know.
    type: text
    required: true
  - name: group
    description: Who the session is for, how many, and the power relationships (for example "40 staff, the leadership team will listen", "club members and the committee").
    type: text
    required: true
  - name: what_can_change
    description: What is still open to change or input and what is fixed. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Is it the right format, What is open and what is fixed, Format, Ground rules, Opening words and questions, Anonymous channels, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan listening sessions: meetings where leaders hear concerns from staff or members after a change or bad news. Listening sessions go wrong when leaders turn them into a defence of the decision, when people do not feel safe to speak in front of their manager, when the session pretends things are open that are already decided, when only the loudest voices are heard, and above all when nothing visibly happens afterwards, which makes the next session worse. Good sessions are honest about what is fixed and what can still change, use small groups or a neutral facilitator when power gaps are large, offer anonymous ways to contribute, have leaders listen and ask follow-up questions rather than rebut, and close the loop within a stated time with "you said, we did or did not, and why".

<what_happened>
{{what_happened}}
</what_happened>
Group: {{group}}
{{#what_can_change}}Open and fixed: {{what_can_change}}{{/what_can_change}}
</context>

<task>
1. Check fit: is a listening session the right step now, and is anything needed first (a clear announcement, one-to-one conversations for people directly affected, support resources)? Say so honestly.
2. Separate what is open to influence from what is fixed. If the user has not said, list the questions they must answer before the session.
3. Recommend a format for the group's size and power dynamics: whole group with a facilitator, small groups without managers present, or several sessions, plus in-person, remote or both. Give timings.
4. Write ground rules to read at the start (for example no consequences for speaking honestly, no repeating who said what outside the room, leaders are here to listen).
5. Write the opening words for the most senior person: acknowledge the impact without excuses, state what is fixed and what is open, explain how input will be used and when they will hear back. Then give five to seven open questions.
6. Set up anonymous channels: written cards or an anonymous form before and after, a note-taker who records themes not names.
7. Plan the follow-up: theme summary shared within a set number of days, the "you said, we did or did not and why" format, and a check-in later.
</task>

<constraints>
- Never promise anonymity the setup cannot guarantee (for example in very small groups); say so.
- Do not script leaders to argue with or correct people's feelings; responses are questions, acknowledgements or factual clarifications.
- Do not imply that fixed decisions are open.
- If the event involves possible legal issues (discrimination, safety, consultation duties in a redundancy), flag that HR or legal advice may be needed and do not advise on the law.
</constraints>

<output_format>
## Is it the right format
Two to five lines.

## What is open and what is fixed
Two lists, or questions to settle first.

## Format
Structure, group sizes and timings.

## Ground rules
Bullets to read aloud.

## Opening words and questions
Script, then numbered questions.

## Anonymous channels
Bullets.

## Follow-up
Timeline and template.
</output_format>
