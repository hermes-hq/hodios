---
schema: 1
id: check-assistant-privacy-settings
kind: prompt
title: Check your AI assistant's privacy settings
description: Works out what data you share with your AI assistants and walks through the settings that control it - model training, history, memory, temporary chats, shared links and connected apps.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [data-controls, model-training-opt-out, chat-history, shared-links]
pairs_with:
  prompts: [audit-assistant-memory, review-app-permissions]
  rules: [privacy-first-assistant-rules]
args:
  - name: tools
    description: The AI assistants you use and the kind of account for each (free or paid personal, work or school account).
    type: text
    required: true
  - name: use
    description: What you put into them, for example work documents, health questions, children's homework, finances, client files.
    type: text
    required: true
  - name: country
    description: "Optional: the country you live in, for the data rights that may apply."
    type: string
output_contract:
  format: markdown
  sections: [What is at stake, Settings checklist, Habits, Work and school accounts, Check in the policy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
What happens to chat data depends on the provider, the plan and sometimes the region, and it changes often. The levers are similar across tools: whether chats may be used to improve models, how long history is kept and how to delete it, whether memory is on, temporary or incognito chats, public shared links, uploaded files, connected apps, and data export. Work and school plans are often governed by a contract with different defaults from personal plans. Deleting a chat from your history does not always mean it is deleted everywhere at once; providers may keep some data for a period for safety or legal reasons, as their policy describes.

<tools>
{{tools}}
</tools>
<use>
{{use}}
</use>
{{#country}}
Country: {{country}}
{{/country}}
</context>

<task>
1. If an account type is missing, state the assumption you make (personal account) and how the answer changes for a work account.
2. Sort what the user shares into low, medium and high sensitivity, and say what could go wrong for the high items (exposure in a shared link, use in training, someone with access to the device or account reading history).
3. Give a settings checklist that works for any assistant, described by what each setting does: model training or improvement, history and retention, memory, temporary chats, shared links, connected apps, file uploads, export and account deletion, sign-in security (two-factor). For each, the recommended choice for this user's use and what they lose by choosing it.
4. Give habits for the high-sensitivity items: temporary chats, removing names and numbers before pasting, never pasting other people's data without need, checking and revoking old shared links.
5. For work or school use, say to use the approved tool and account, and that putting employer or client data into a personal account is often against policy.
6. List the questions to answer from each provider's current privacy policy or data controls page, and mention that many countries give a right to access or delete personal data, without promising a result.
</task>

<constraints>
- Do not state any provider's current defaults, retention periods or menu names as fact. Say "check" and describe the setting by function.
- Do not give legal advice. Name data rights only in general terms.
- Recommendations follow the user's use; do not tell everyone to turn everything off.
- Keep it to what a non-technical person can do in about twenty minutes.
</constraints>

<output_format>
## What is at stake
A short table: what is shared, sensitivity, main risk.
## Settings checklist
A checkbox list grouped by setting, each with the recommended choice and the trade-off.
## Habits
Bullets.
## Work and school accounts
Two to four bullets.
## Check in the policy
Numbered questions to answer from the provider's own pages.
</output_format>
