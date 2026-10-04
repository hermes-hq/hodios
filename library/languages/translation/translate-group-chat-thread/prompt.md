---
schema: 1
id: translate-group-chat-thread
kind: prompt
title: Translate a group chat thread
description: Translates a pasted group chat with its slang and abbreviations, then sums up what was decided, what is asked of you and by when, and drafts a short reply in the group's language.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [parent, individual]
requires: [none]
inputs: [message, text]
output: [summary, message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [group-chat, slang, newcomers, school-parents, action-items]
pairs_with:
  prompts: [handle-foreign-language-letter, translate-business-email, read-foreign-signs-and-labels]
args:
  - name: chat_text
    description: The chat messages as copied, with names or initials and times if you have them. You can replace other people's names with initials.
    type: text
    required: true
  - name: your_language
    description: The language you want the translation and summary in.
    type: string
    default: English
  - name: your_name
    description: Optional. How you appear in the chat, so requests aimed at you can be spotted, for example "Lena (Mila's mum)".
    type: string
output_contract:
  format: markdown
  sections: [In short, What you need to do, Translation, Slang and abbreviations, Draft reply]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who is in a group chat in a language they are still learning: school class parents, a building's residents, a sports club, a work team. Machine translation of chats often fails on exactly the things that matter: abbreviations, slang, emoji used as answers (a thumbs-up as agreement), implied deadlines ("by Friday as usual"), polls, and who is being asked to do what. The person needs to know quickly whether they must act, and to answer in a way that fits the group's tone.

Translate into: {{your_language}}
{{#your_name}}The user appears in the chat as: {{your_name}}{{/your_name}}
</context>

<task>
<chat_text>
{{chat_text}}
</chat_text>

1. Identify the chat's language (and variety, if slang shows it) and the group's tone (formal, friendly, very casual).
2. Summarise in two to four lines what the thread is about and what was decided. Distinguish decisions from suggestions nobody confirmed.
3. List what is asked of the user or of everyone (money to send, items to bring, a form, a vote, a reply), with the deadline as stated and as a calendar date if it can be worked out, and who asked. Mark anything aimed at the user specifically.
4. Translate the thread message by message, keeping the sender labels. Translate the meaning of slang, abbreviations and emoji answers, not the letters. If the thread is long (more than about 40 messages), translate in full only the messages with decisions, requests, dates, money or anything aimed at the user, summarise the rest in one line per stretch of chat, and say that you did so.
5. Explain each slang term, abbreviation and cultural reference once, in a table.
6. Draft a short reply in the chat's language matching the group's tone, covering what the user needs to answer, with a translation underneath. If the user's position is unknown (yes or no, can they help), give two short versions.
</task>

<constraints>
- If the chat is a screenshot you cannot read clearly, or mixes several languages, say which parts you could not read or which language each part is in instead of guessing.
- Do not invent deadlines, amounts, places or decisions. If a deadline is relative ("next Tuesday") and today's date is unknown, keep it relative and say so.
- If something is ambiguous (who "you" refers to, whether a payment is optional), say so and suggest a short question the user could ask in the group.
- Keep personal details of other members out of the summary beyond names or initials needed to follow the thread.
- If the chat contains anything that looks like bullying, harassment or a safety concern involving a child, point it out plainly and suggest who to raise it with (the school, the club, the building manager), without drafting a confrontational reply.
</constraints>

<output_format>
## In short
Two to four lines.
## What you need to do
Table: Action | Deadline | Asked by | For you or everyone. "Nothing" if none.
## Translation
Message by message: **Sender (time):** translation.
## Slang and abbreviations
Table: Term | Meaning | Note.
## Draft reply
The reply in the chat's language, then the translation.
</output_format>
