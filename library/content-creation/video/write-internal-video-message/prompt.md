---
schema: 1
id: write-internal-video-message
kind: prompt
title: Write an internal video message
description: Writes a short internal video script for a leader sharing news, a change, thanks or hard news, with a human opening, the message, what it means for staff and where to ask questions.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [executive, manager, operations-manager, founder]
inputs: [message, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [internal-communications, leadership-video, change-communication, all-hands, staff-update]
pairs_with:
  prompts: [adapt-script-for-teleprompter, write-short-form-script]
args:
  - name: message
    description: What you need to say - the news, change or thanks - with the facts, dates, reasons and what is still undecided. Include anything you cannot say yet.
    type: text
    required: true
  - name: audience
    description: Who will watch (for example "all 300 staff across three sites", "the support team only") and how they are likely to feel about it.
    type: string
    required: true
  - name: seconds
    description: Target running time in seconds; speech runs at roughly 130 to 150 words a minute.
    type: number
    default: 90
  - name: occasion
    description: news is an update or announcement; change affects how people work; thanks recognises effort; hard-news covers cuts, closures, departures or setbacks.
    type: enum
    enum: [news, change, thanks, hard-news]
    default: news
output_contract:
  format: markdown
  sections: [Script, On-screen text, Delivery notes, Questions to prepare for, Check before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an internal communications writer who scripts short videos for leaders. A good internal video sounds like the leader talking to colleagues, not reading a press release. Staff watch for three things: what is happening, what it means for them, and whether the leader is being straight with them. They notice spin, jargon and vague reassurance immediately. Short sentences, concrete detail, an honest admission of what is not yet known, and a clear place to ask questions build trust. For hard news, the facts come early, the tone is plain and human, and nothing is dressed up as good news.
</context>

<task>
Write a {{seconds}}-second {{occasion}} video script for {{audience}}.

<message>
{{message}}
</message>

1. If the message does not say what is happening or when, ask for that and stop.
2. Work out the word budget from {{seconds}} seconds at about 130 to 150 words a minute, and keep to it.
3. Structure the script:
   - Opening (one or two sentences): human and direct, naming why you are speaking to them today. No "I'm excited to share" for hard news; no long greeting.
   - The message: what is happening, in plain words, with the key fact or date in the first 20 seconds.
   - Why: the reason, honestly and briefly.
   - What it means for you: concrete effects on the audience's work, pay, team, schedule or customers, and what stays the same. Say what is not yet decided and when they will know.
   - For thanks: name specific actions and their effect, not generic praise.
   - Close: where and when to ask questions (a session, a channel, their manager), and one line that sounds like the leader.
4. Write for the ear: short sentences, contractions, no acronyms without explanation, numbers rounded where precision is not needed.
5. Before replying, read the script against the message: no fact added, nothing softened that the message states plainly, and the word count fits the time.
</task>

<constraints>
- Use only facts in the message. Write `[CONFIRM: …]` where a date, number or detail is missing.
- Do not promise what the message does not promise ("no one will lose their job", "nothing will change").
- For hard news involving jobs, pay, restructuring or legal matters, add a reminder under Check before recording that HR and, where relevant, legal should review the script first, and that people directly affected should usually hear it from their manager before the video goes out.
- No corporate filler ("synergy", "exciting journey", "going forward").
</constraints>

<output_format>
## Script
The spoken text with section labels in brackets and an approximate timestamp per section, then the word count and estimated running time.
## On-screen text
Captions or lower thirds: name and role, the key date or fact, where to ask questions.
## Delivery notes
Three or four bullets on tone, pace and setting.
## Questions to prepare for
The five questions staff are most likely to ask, each with what the message lets the leader answer, or "not yet known".
## Check before recording
Bullets: `[CONFIRM: …]` items and the reviews needed.
</output_format>
