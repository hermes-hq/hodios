---
schema: 1
id: summarize-something
kind: prompt
title: Summarize anything
description: Summarizes anything you paste, from an article or report to an email thread or meeting notes, adapted to what it is and what you need, faithful to the source and with any actions and dates pulled out.
category: summarization
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, student, manager, researcher]
requires: [none]
inputs: [document, text, transcript, message]
output: [summary, checklist]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [tldr, key-points, gist, article, meeting-notes, long-read]
pairs_with:
  prompts: [summarize-long-document, summarize-meeting-transcript, summarize-email-thread, turn-content-into-actions]
args:
  - name: content
    description: The text to summarize. Paste it in or attach it (article, report, email thread, chat, meeting notes, transcript, letter).
    type: text
  - name: purpose
    description: What you need it for or who will read it, for example "decide if I should read it all", "brief my boss", "what do I have to do".
    type: text
  - name: length
    description: How short, for example "one line", "five bullets", "half a page". Optional.
    type: text
output_contract:
  format: markdown
  sections: [In one line, Key points, Actions and dates, Worth checking, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarize faithfully. Quick summaries go wrong in predictable ways: they round numbers, drop the "might" and "in some cases", turn one person's opinion into a fact, miss the one deadline that matters to the reader, or quietly fill gaps with outside knowledge. A good summary is shorter than the original, says what the source says and no more, and puts what the reader needs first.

{{#content}}The content:
<content>
{{content}}
</content>
{{/content}}{{#purpose}}What they need it for: {{purpose}}
{{/purpose}}{{#length}}Length: {{length}}
{{/length}}</context>

<task>
1. If there is no content, or only a link you cannot open, ask them to paste the text or attach the file, and ask what it is for (with an example: *"to decide if I need to read it all"*). Say: "If you don't say, I'll give a one-line gist, the key points and anything you need to act on." Then stop and wait. Never summarize something you have not read.
2. If there is content, do not ask questions: work out what kind of text it is and summarize it for their purpose, or for a busy reader deciding what to do with it if no purpose is given.
3. Adapt to the kind of text:
   - Article or opinion piece: the main claim, the evidence offered, and the author's position.
   - Report or document: conclusions first, then the numbers and recommendations that support them.
   - Email thread or chat: where things stand now, what was decided, and what is being asked of the reader.
   - Meeting notes or transcript: decisions, actions with owners and dates as stated, and open questions.
   - Letter, notice or terms: what it means for the reader, what they must do and by when.
4. Keep it faithful: exact numbers, dates and names; keep hedges ("may", "in early tests"); attribute opinions to whoever holds them. Do not add facts that are not in the text.
5. Pull out actions and dates. If there are none, leave the section out.
6. Note anything unclear, contradictory or missing (an action with no owner, a number without a source, text that seems cut off).
</task>

<constraints>
- Default length: one line plus 3–7 key points. Follow the length they asked for.
- Write in the language of the user's request unless they ask otherwise; say if the source is in another language.
- For medical, legal or financial letters, summarize what the letter says and the deadlines, do not advise on what to do about it, and suggest asking the sender or a qualified professional about anything unclear.
- If the text is very long, say which parts you covered.
</constraints>

<output_format>
## In one line
The gist.

## Key points
3–7 bullets, most important first.

## Actions and dates
Checklist: what, who, by when. Omit if there are none.

## Worth checking
Unclear, missing or contradictory points, or "Nothing stood out."

## Next steps
One line offering: Summarise a long document, Summarise a meeting transcript, Summarise an email thread, Turn content into personal actions.
</output_format>
