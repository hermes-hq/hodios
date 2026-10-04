---
schema: 1
id: run-digital-skills-drop-in
kind: prompt
title: Run a digital skills drop-in
description: Designs a drop-in digital skills session for adults at a library or community centre, covering phones, email, online forms and scams, with one-to-one helper scripts and handouts.
category: course-design
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, individual]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [digital-inclusion, digital-skills, adult-learners, public-libraries, scam-awareness, volunteer-helpers]
pairs_with:
  prompts: [teach-older-relative-smartphone, design-adult-evening-class, write-reading-volunteer-guide]
args:
  - name: audience
    description: Who usually comes, for example "mostly over-70s with new smartphones", "jobseekers who need to apply online", "recent arrivals with limited English", plus devices they bring and any access needs.
    type: text
    required: true
  - name: topics
    description: What people most often ask for help with, for example "WhatsApp video calls, email, booking a GP appointment online, spotting scam texts, government benefit forms".
    type: text
    required: true
  - name: helpers
    description: How many staff or volunteer helpers are available per session.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Session format, Room and kit, Helper guide, Topic cards, Scam awareness, Handouts, Boundaries and safeguarding, Measuring impact]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design digital inclusion drop-ins for libraries, community centres and charities. A drop-in is different from a class: people arrive at different times with their own device and a specific problem, often anxious or embarrassed, and leave happiest when they solved it themselves and can do it again at home. The best helpers keep the learner's hands on the device, explain one step at a time, write the steps down in the learner's own words, and never handle passwords or money for them. Scams are a constant worry, and a drop-in is often where people first ask "is this message real?"

<audience>
{{audience}}
</audience>
<topics>
{{topics}}
</topics>
Helpers per session: {{helpers}}
</context>

<task>
1. Session format: length, how people are welcomed and triaged at the door (a short "what do you want to do today?" card), how the queue is managed with {{helpers}} helpers, when a short group spot on a common topic helps, and how sessions end with each person writing down what they learned.
2. Room and kit: seating that lets helper and learner sit side by side, Wi-Fi access and guest details, chargers for common phones, spare devices if any, magnifiers, large-print materials, and a quiet corner.
3. Helper guide:
   - The one-to-one approach: ask what they want to achieve, let them keep the device, ask before touching it, show and then let them do it, check with "show me how you would do that next time", and write steps in their words.
   - Phrases that build confidence and phrases to avoid ("it's easy", "just").
   - What to do when the device or account is locked, the person has forgotten a password, or the task needs ID documents.
4. Topic cards, one per topic in the list: the goal in the learner's words, steps at a general level that work across common phones and services (say where steps differ by device or app version), common sticking points, and a "try at home" task.
5. Scam awareness: a short segment or card on spotting scam messages, calls and websites (urgency, requests for codes or payment, unexpected links, pretending to be a bank, delivery firm or government), what to do (stop, don't click, check through an official route), and how to report suspected scams in general terms, with the local reporting route as a placeholder.
6. Handouts: outlines for a large-print one-page card per topic and a "my passwords are mine" safety card, plus a space for the learner's own notes.
7. Boundaries and safeguarding: helpers never ask for, type or write down passwords, PINs or bank details, never log in to banking or make payments for anyone, never keep personal data, and do not install apps the person has not chosen; what to do if someone has lost money to a scam (contact their bank immediately through the official number, report it) or shows signs of being financially exploited (tell the session lead and follow the organisation's safeguarding procedure).
8. Measuring impact: a light way to record visits, topics and confidence before and after, without collecting personal data beyond what the organisation needs.
9. Before answering, check every topic in the list has a card, and the format works with {{helpers}} helpers.
</task>

<constraints>
- Keep device steps general and say "the exact menu names vary by phone and app version" rather than giving step-by-step instructions you cannot be sure match the learner's device.
- Plain language for learners; no jargon on handouts without a picture or explanation.
- Respect learners' autonomy and dignity; never take over a device to save time.
- Do not recommend specific paid products or services.
- If the audience or topics are missing, ask in one line and stop.
</constraints>

<output_format>
## Session format
## Room and kit
Checklist.
## Helper guide
Bullets and short example phrases.
## Topic cards
One short card per topic: Goal | Steps | Sticking points | Try at home.
## Scam awareness
## Handouts
## Boundaries and safeguarding
## Measuring impact
</output_format>
