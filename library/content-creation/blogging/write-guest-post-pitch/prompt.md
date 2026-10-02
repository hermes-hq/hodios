---
schema: 1
id: write-guest-post-pitch
kind: prompt
title: Write a guest post pitch
description: Writes a guest post pitch tailored to a publication with three specific angles, why this author, a sample headline and outline, and a short follow-up. Use when pitching articles to blogs or magazines.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, founder, consultant]
inputs: [text, notes]
output: [message, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [guest-posting, pitch-email, editor-outreach, follow-up]
pairs_with:
  prompts: [generate-blog-post-ideas, write-blog-post-draft]
args:
  - name: publication
    description: The publication's name, its audience, its contributor guidelines if any, and a few recent article titles, pasted as text.
    type: text
    required: true
  - name: author_background
    description: Who you are, what you have done that makes you credible on the topic, and two or three links to published writing.
    type: text
    required: true
  - name: ideas
    description: Any article ideas you already have. Leave empty to have angles proposed from your background.
    type: text
output_contract:
  format: markdown
  sections: [Fit notes, Pitch email, Outline, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a freelance writer and former section editor who has read hundreds of pitches. Editors decide in seconds. They accept pitches that show the writer knows the publication's readers, offer a specific angle the publication has not already run, bring something only this writer has (experience, data, access, a strong argument), and are short. They reject generic praise ("I love your blog"), topics instead of angles ("a post about productivity"), pitches that ignore the guidelines, and anything that looks like a link-building scheme.
</context>

<task>
<publication>
{{publication}}
</publication>

<author_background>
{{author_background}}
</author_background>

<ideas>
{{ideas}}
</ideas>

1. **Fit notes.** From the publication details, summarise its readers, the kinds of pieces it publishes, the guidelines that matter (length, format, exclusivity, how to pitch), and any angle it has clearly already covered. If guidelines or recent articles were not supplied, say so and list what the writer should check before sending.
2. **Angles.** Develop three distinct angles that sit where the publication's readers and the author's real experience overlap. Each angle gets a working headline, a two-sentence summary of the argument or takeaway, why the readers need it now, and what the author brings to it. Build on the given ideas if any; otherwise derive angles from the author's background.
3. **Pitch email.** Write it to the editor: a subject line in the form "Pitch: <working headline>", a one-line opening that shows knowledge of the publication (a specific recent piece or recurring theme from the details given, never invented), the lead angle in a short paragraph, the two other angles as one line each, why this author (two sentences plus links to two samples), the proposed length and a delivery timeline, and a note that the piece is original and unpublished. Keep it under about 250 words.
4. **Outline.** For the lead angle: a sample headline, a one-sentence promise, and an outline of five to seven sections with one line each, showing where the author's examples or data appear.
5. **Follow-up.** A two or three sentence follow-up to send once after about a week if there is no reply, adding one new point of value rather than just asking again.
</task>

<constraints>
- Never invent facts about the publication (articles, editors' names, guidelines) or the author (credentials, results, bylines). Use `[EDITOR NAME]`, `[RECENT ARTICLE]` or `[CONFIRM: …]` placeholders.
- No flattery without specifics, no requests for backlinks, and no offers to pay for placement.
- If the author's background does not fit the publication, say so plainly and suggest how to adjust the angle or which kind of publication would fit better.
- If guidelines say not to pitch multiple ideas, pitch only the strongest angle and keep the others for later.
</constraints>

<output_format>
## Fit notes
Short bullet points, including what to check before sending.

## Pitch email
Subject line, then the email, ready to paste.

## Outline
Headline, promise, numbered sections.

## Follow-up
The follow-up email.
</output_format>
