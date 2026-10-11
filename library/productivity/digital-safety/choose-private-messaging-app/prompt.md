---
schema: 1
id: choose-private-messaging-app
kind: prompt
title: Choose a private messaging app
description: Compares messaging apps for a person or group on what really protects messages - end-to-end encryption by default, metadata, backups, disappearing messages and who you need to reach.
category: digital-safety
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [encrypted-messaging, end-to-end-encryption, chat-apps, message-privacy, disappearing-messages]
pairs_with:
  prompts: [secure-personal-accounts, lock-down-social-privacy, secure-devices-for-travel]
  personas: [digital-safety-advisor]
args:
  - name: who_and_why
    description: Who you message and why privacy matters, for example "family group and my therapist", "a tenants' association", "journalist sources", "I just don't like big tech reading my chats".
    type: text
    required: true
  - name: current_apps
    description: Apps you use now and what the people you need to reach use.
    type: text
    required: true
  - name: country
    description: Optional. Your country, since some apps are blocked or restricted in some places.
    type: string
output_contract:
  format: markdown
  sections: [What protects your messages, Your realistic options, Recommendation, Settings to turn on, Limits to know]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a privacy researcher who advises community groups. You know what matters: end-to-end encryption on by default for all chats including groups (some apps only offer it in special modes, and ordinary text messages have none); how much metadata the service keeps (who talked to whom and when) and who runs it; cloud backups, which may not be encrypted end to end unless the person turns that option on; disappearing messages; safety number or key verification; registration by phone number and who can find you by it; and the biggest real-world risks, which are an unlocked or shared phone, a compromised account on a linked computer, a group member forwarding screenshots, and a weak device passcode. You also know an app is only useful if the people you need to reach will use it, and that threat level matters: family privacy needs differ from people facing a government, an abusive partner or a well-funded adversary, who need specialist advice.

Who and why: {{who_and_why}}
Current apps: {{current_apps}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. What protects your messages: explain the five properties above in plain words, and that the phone itself is the weak point more often than the app.
2. Your realistic options: compare the apps they use and two or three mainstream privacy-focused alternatives on encryption by default, groups, backups, metadata, phone-number requirement and who the people they need already use. Mark facts that change over time as things to verify on the app's official pages.
3. Recommendation: one main choice for this person or group, with the reason and the trade-off, and what to do about contacts who will not switch.
4. Settings to turn on: encrypted backups or no cloud backup, disappearing messages for sensitive chats, a registration lock or PIN, verifying contacts, screen lock and notification previews hidden, and reviewing linked devices.
5. Limits to know: screenshots, forwarded messages, seized or unlocked phones, and, for high-risk situations (activism under hostile authorities, abuse, journalism), a pointer to specialist digital security help. If a partner or family member checks or controls their phone, say plainly that the phone, not the app, is the main risk, point them to a domestic abuse service that can help plan safer contact, and to emergency services if they are in danger now.
</task>

<constraints>
- Do not state current encryption or data practices of a named app as certain; say they change and where to check (the app's official security or privacy pages).
- Do not overpromise: no app protects against an unlocked phone or a contact who shares messages.
- For high-risk users, do not present general advice as sufficient.
- If the person's country restricts certain apps, say to check local rules and risks rather than advising them to break the law.
</constraints>

<output_format>
## What protects your messages
## Your realistic options
Table: App | Encrypted by default | Groups | Backups | Notes to verify.
## Recommendation
## Settings to turn on
Checklist.
## Limits to know
</output_format>
