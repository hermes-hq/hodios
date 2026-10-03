---
schema: 1
id: write-letter-to-the-editor
kind: prompt
title: Write a letter to the editor
description: Writes a short letter to a newspaper or magazine editor responding to a specific article with one point, evidence and the word limit. Use to correct, add to or challenge coverage.
category: blogging
version: 1.0.0
status: incubating
stage: [build, ship]
role: [writer, individual, researcher, executive]
inputs: [document, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [letters-page, civic-writing, rebuttal, concise-writing]
pairs_with:
  prompts: [write-op-ed, fact-check-claims]
args:
  - name: article
    description: The article you are responding to, with its headline, author, publication and date, plus the passage you are responding to (pasted or summarised).
    type: text
    required: true
  - name: point
    description: The one point you want to make, the evidence or experience behind it, and who you are (including any affiliation that a reader should know about).
    type: text
    required: true
  - name: word_limit
    description: The publication's word limit for letters.
    type: number
    default: 200
output_contract:
  format: markdown
  sections: [Letter, Submission note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help readers get letters published. Letters editors receive many more letters than they print and favour ones that respond quickly (usually within a few days of the article), name the article in the first sentence, make one clear point, add something the article lacked (a fact, a perspective, a correction, first-hand experience), and fit the published limit without needing cuts. Letters are edited for length, so the most important sentence goes first. Personal attacks on the journalist, multiple grievances, and long background get letters spiked. Most publications require the writer's full name, town and a contact number for verification, and expect the letter to be exclusive to them.
</context>

<task>
Write a letter to the editor of at most {{word_limit}} words.

<article>
{{article}}
</article>

<point_and_writer>
{{point}}
</point_and_writer>

1. Reduce the writer's material to one point. If there are several, choose the strongest and mention the others in the submission note in one line.
2. Write the letter:
   - **First sentence:** names the article (headline and date) and states the point.
   - **Body:** the evidence or experience in one to three sentences, specific and checkable.
   - **Optional:** one sentence acknowledging what the article got right, if it strengthens credibility.
   - **Close:** a single sentence that lands the point or says what should happen.
   - **Sign-off:** `[Full name], [Town]`, plus the writer's role or affiliation if relevant to the point.
3. Keep the tone firm and courteous. Disagree with claims, not with people.
4. Write a suggested headline the editor may use (letters pages often add their own).
</task>

<constraints>
- At or under {{word_limit}} words, excluding the sign-off; state the count.
- Use only the writer's facts. Anything needing a source becomes `[SOURCE: …]`. Do not invent statistics, quotes or credentials.
- Disclose an affiliation or interest the writer mentions (employer, campaign, business) in the sign-off or text.
- Do not misquote the article: refer only to what the article text or summary says.
</constraints>

<output_format>
## Letter
Suggested headline, the letter, the sign-off, and the word count.

## Submission note
How to submit: send soon after the article, paste in the email body, include full name, address or town and phone for verification, and offer it exclusively. Then any other points cut and any `[SOURCE]` items.
</output_format>
