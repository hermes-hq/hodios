---
schema: 1
id: write-new-chat-handoff
kind: prompt
title: Write a handoff to continue in a new chat
description: Turns a long, drifting chat into a compact opening message for a fresh chat, with the goal, decisions and reasons, rejected options, open questions, the latest draft and the next step.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual]
requires: [none]
inputs: [transcript, text]
output: [prompt, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [long-conversations, context-window, fresh-start, conversation-summary]
pairs_with:
  prompts: [turn-chat-into-prompt, build-project-instructions]
args:
  - name: conversation
    description: The long conversation, pasted or exported, or your own notes on it if it is too long to paste.
    type: text
    required: true
  - name: next_goal
    description: "Optional: what you want to do next in the new chat."
    type: text
output_contract:
  format: markdown
  sections: [Handoff message, Superseded and dropped, Check before sending, Worth saving permanently]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long chats degrade. Early details drop out of what the assistant can attend to, it starts contradicting decisions made hours ago, re-suggests options that were already rejected, and answers slow down. Starting a fresh chat fixes this only if the new chat gets the right state. A good handoff carries the goal, the current state, the decisions with their reasons, the options already rejected and why, constraints, open questions, the latest version of any draft word for word, and the exact next step. It leaves out the back-and-forth that led there.

<conversation>
{{conversation}}
</conversation>
{{#next_goal}}
Next goal: {{next_goal}}
{{/next_goal}}
</context>

<task>
1. Read the whole conversation. For every draft, plan or list that changed over time, identify the latest version and treat earlier ones as superseded.
2. Extract the goal, current state, decisions with one-line reasons, rejected options with reasons, constraints and preferences the user stated, and open questions.
3. Where the conversation was ambiguous or the user never confirmed something, mark it "unconfirmed" rather than choosing for them.
4. Include the latest artefact (draft text, code, table, itinerary) verbatim. If it is very long, put a placeholder telling the user to attach or paste it, and name which version.
5. Write the handoff as the first message of the new chat, addressed to the assistant, ending with the next step (the user's next goal if given, otherwise the last thing in progress) and an instruction to ask before reopening settled decisions.
6. List what you dropped on purpose, and anything recurring (preferences, facts about the user) that belongs in custom instructions, memory or project instructions instead.
</task>

<constraints>
- Use only what is in the conversation. Do not resolve open questions or add new ideas.
- Keep the handoff under about 600 words, not counting the verbatim artefact.
- Leave out passwords, account numbers and other people's personal details unless the next step truly needs them, and say so under "Check before sending".
- Write in the language of the conversation.
</constraints>

<output_format>
## Handoff message
One fenced block ready to paste, with short labelled parts: Goal, Where we are, Decisions, Rejected, Constraints, Open questions, Latest version, Next step.
## Superseded and dropped
Bullets.
## Check before sending
Bullets for unconfirmed items and anything sensitive.
## Worth saving permanently
Bullets naming where each item belongs, or "Nothing".
</output_format>
