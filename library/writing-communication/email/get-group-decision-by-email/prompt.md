---
schema: 1
id: get-group-decision-by-email
kind: prompt
title: Get a group decision by email
description: Asks a group to choose between a few options by email, with a recommendation, a one-line reply format, a deadline and a stated default if nobody answers, so it does not need a meeting.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, project-manager, operations-manager, individual]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [group-decision, options, default-option, async, consensus]
pairs_with:
  prompts: [write-decision-memo, replace-meeting-with-async, request-approval-by-email]
args:
  - name: decision
    description: What needs deciding, the options you see, and anything you know about cost, effort or preferences for each.
    type: text
    required: true
  - name: group
    description: Who is deciding, how many people, and how the decision is made, for example "5 team leads, majority" or "3 co-founders, must be unanimous" or "committee, I decide after input".
    type: string
    required: true
  - name: deadline
    description: When the decision is needed and why.
    type: string
output_contract:
  format: markdown
  sections: [Decision rule check, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Group decisions by email stall for predictable reasons: the options are not clearly listed, nobody knows how the decision will be made (majority, consensus, someone decides after input), replies come back as essays that do not pick anything, half the group never answers, and reply-all debates spiral. The email that closes in a day lists two to four labelled options with their main trade-off, gives the sender's recommendation, states the decision rule, asks for a one-line reply in a fixed format ("A", "B", or "A, but…"), sets a deadline, and says what happens if someone does not reply (silence counts as agreement with the recommendation, or the organiser decides). Asking people to reply only to the sender, not to all, keeps the thread from becoming a debate; a summary of the result goes to everyone afterwards. Some decisions should not be made by email: ones that are contentious, affect people's jobs, or need a formal vote with a quorum.
</context>

<task>
Write a group decision email for: {{group}}.{{#deadline}} Deadline: {{deadline}}.{{/deadline}}

<decision>
{{decision}}
</decision>

1. If the options or the question are not clear, ask and stop.
2. Decision rule check: state how the decision will be made, based on the group description. If it is not clear, propose a rule (for example "majority of replies by the deadline; ties broken by the organiser") and flag it. If the decision looks contentious or needs a formal vote, say a meeting or formal process may be better and why, but still write the email.
3. Write the email:
   - Subject: "Decision needed by [date]: [question] (reply A/B/C)".
   - First lines: the question in one sentence, the deadline and the reply format.
   - Options as labelled bullets (A, B, C), each with one line on what it means and the main trade-off. Keep them parallel and fair, including the ones the sender does not favour.
   - "My recommendation: B, because …" in one or two lines.
   - Decision rule and default: "If I don't hear from you by [time], I'll count it as agreement with B."
   - "Please reply to me only; I'll send the result to everyone on [date]."
4. Under Notes, give a one-line result message template to send afterwards, and suggest a reminder the day before the deadline.
</task>

<constraints>
- Under about 180 words in the body.
- No more than four options; merge or drop weak ones and say so in Notes.
- Options described from the input only; never invent costs or facts. Use `[need: …]`.
- Fair framing: no loaded wording that pushes one option beyond the stated recommendation.
- The silence-means-agreement default is only appropriate for low-stakes decisions; for decisions with money, safety or people impact, require explicit replies and say so.
</constraints>

<output_format>
## Decision rule check
One to three sentences.
## Email
Subject line, then the body.
## Notes
Result message template, reminder timing, options merged or dropped.
</output_format>
