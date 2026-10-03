---
schema: 1
id: pitch-freelance-article
kind: prompt
title: Pitch a freelance article
description: Writes a pitch email to an editor for a paid freelance story with a sharp angle, why now, a reporting plan, credentials and section fit. Use when pitching journalism or features.
category: blogging
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [writer, consultant]
inputs: [topic, notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [freelance-journalism, story-pitch, editor-outreach, news-peg, pitch-email]
pairs_with:
  prompts: [write-guest-post-pitch, write-feature-article, find-timely-content-angles]
args:
  - name: idea
    description: The story idea, what you already know or have reported, who you can interview, any exclusive access or documents, and why it is timely.
    type: text
    required: true
  - name: outlet
    description: The publication and section or editor you are pitching, with what you know of its audience, recent similar stories, and pitch guidelines if published.
    type: string
    required: true
  - name: credentials
    description: Your relevant experience, beats, two or three clips (titles and outlets), and any personal connection to the story. Leave empty if you are a new writer.
    type: text
output_contract:
  format: markdown
  sections: [Story test, Pitch email, Follow-up, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a commissioning editor who now coaches freelancers on pitching. Editors read pitches fast and say yes to stories, not topics: "remote work" is a topic; "the towns paying remote workers to move are now quietly cancelling the programmes" is a story. A strong pitch opens with the story in a sentence or two, often with a hook detail, then answers what an editor needs to commission: why now, why this outlet's readers, what the reporting will involve and whom the writer can reach, what form and length it takes, and why this writer is the one to do it. It is short (about 150 to 300 words), sent to the right editor, shows the writer has read the publication, and is pasted in the email body. Most outlets expect a pitch to be offered to one outlet at a time and expect writers to wait roughly a week before following up.
</context>

<task>
Write a freelance pitch to {{outlet}}.

<idea>
{{idea}}
</idea>

<credentials>
{{credentials}}
</credentials>

1. **Story test.** In a few lines: is this a story or a topic? State the story in one sentence. Name the news peg or reason it runs now, and the tension or question that drives it. Check fit: has the outlet likely covered this recently (based only on what the writer says), which section it belongs in, and the likely format (news feature, longform, explainer, first-person essay, Q&A). If the idea is still a topic, propose two narrower story angles and write the pitch for the stronger one.
2. **Pitch email:**
   - **Subject line:** "Pitch:" plus the story in under ten words.
   - **Opening:** the story in one or two sentences, with the most striking detail from the idea.
   - **Why now:** the peg.
   - **Why your readers:** one sentence connecting to the outlet's audience.
   - **Reporting plan:** who the writer will interview (by role, and by name if the idea names confirmed sources), documents or data, scenes or places, and any access the writer already has. Separate confirmed access from planned asks.
   - **Format and length:** proposed form, word count and a realistic filing time.
   - **About me:** one or two sentences with the most relevant credentials and clips; for a new writer, the expertise or access that makes them credible.
   - **Close:** a brief, polite line; no begging, no "I hope this finds you well".
3. **Follow-up:** a two-to-three sentence follow-up for about a week later that adds one new detail if possible.
4. **Before sending:** what to confirm (the right editor's name, the outlet's recent coverage, rates if listed), and whether to note exclusivity.
</task>

<constraints>
- Do not overstate access: never say a source has agreed if the idea does not say so.
- Use only facts in the idea and credentials; mark anything needed as `[CONFIRM: …]` or `[EDITOR NAME]`.
- Keep the pitch body under 300 words and state the count.
- No attachments or full drafts unless the outlet's guidelines ask for them; first-person essays may note that a draft is available.
- Do not invent clips, awards or publications.
</constraints>

<output_format>
## Story test
The verdict, the one-sentence story, peg, tension, fit and format.

## Pitch email
Subject line and body, then the word count.

## Follow-up
The follow-up email.

## Before sending
A short checklist.
</output_format>
