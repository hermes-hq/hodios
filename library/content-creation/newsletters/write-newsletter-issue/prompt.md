---
schema: 1
id: write-newsletter-issue
kind: prompt
title: Write a newsletter issue
description: Writes a newsletter issue from notes and links in the author's voice, with subject lines, preview text, an intro, sections and a sign-off. Use when turning rough notes into an issue.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer, marketer, founder]
inputs: [notes, url]
output: [article, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [subject-lines, preview-text, voice-matching, email-newsletter]
pairs_with:
  prompts: [curate-link-roundup, write-blog-post-draft]
args:
  - name: notes
    description: Your notes for this issue (ideas, stories, links with your comments, announcements), plus the newsletter's name and audience if they are not obvious.
    type: text
    required: true
  - name: voice_sample
    description: One or two past issues or paragraphs you wrote, used to match your voice. Leave empty for a warm, direct voice.
    type: text
  - name: length
    description: short is about 300 words, standard about 700, long about 1,200.
    type: enum
    enum: [short, standard, long]
    default: standard
output_contract:
  format: markdown
  sections: [Subject lines, Issue, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help independent writers turn messy notes into newsletter issues that sound like them. Subscribers open a newsletter because of the person behind it, so voice matters more than polish. The subject line and the preview text decide the open; the first two sentences decide whether they keep reading; and a clear structure lets people skim to the part they care about. Readers forgive a short issue and resent a padded one. A newsletter is a letter, not a press release: first person, one reader, one idea that ties the issue together where possible.
</context>

<task>
Write a {{length}} newsletter issue from these notes.

<notes>
{{notes}}
</notes>

<voice_sample>
{{voice_sample}}
</voice_sample>

1. Find the thread that ties the notes together: the main idea, story or question of this issue. If the notes are unrelated items, lead with the strongest and present the rest as clearly separate sections.
2. Write three subject lines (under 50 characters, specific, no clickbait or ALL CAPS) and one preview text (under 90 characters) that complements rather than repeats the subject.
3. Write the issue:
   - Intro: two to four sentences that open with something specific (a moment, a question, a surprising fact from the notes) and say what this issue gives the reader.
   - Sections: one per main item, each with a short heading, the substance from the notes, and the author's take. Links go inline on the words that describe them, with a sentence on why they are worth clicking.
   - Sign-off: a short closing line in the author's voice and one ask if the notes contain one (reply, share, a link to a product or event).
4. Match the voice sample's sentence length, formality, humour and recurring phrases without copying its content. If there is no sample, write warm, direct and first person.
5. Keep to the length: short about 300 words, standard about 700, long about 1,200.
</task>

<constraints>
- Use only facts, links and opinions from the notes. Do not invent stories, quotes, numbers or URLs; mark missing pieces with `[ADD: …]`.
- Do not summarise a link's content beyond what the notes say about it.
- No filler openings ("Happy Tuesday!", "I hope this finds you well") unless the voice sample uses them.
- Plain formatting that survives email clients: headings, short paragraphs, occasional bullets. No tables.
</constraints>

<output_format>
## Subject lines
Three numbered options, then "Preview text:" and the line.

## Issue
The full issue, ready to paste into the newsletter editor.

## Before sending
Bullets: `[ADD: …]` items, links to check, and anything you assumed.
</output_format>
