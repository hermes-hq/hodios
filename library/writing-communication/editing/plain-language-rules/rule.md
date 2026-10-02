---
schema: 1
id: plain-language-rules
kind: rule
title: Plain language rules
description: Standing rules for plain-language writing in anything the assistant writes, with the main point first, short sentences, common words, active voice, defined terms and headings that say what follows.
category: editing
version: 1.0.0
status: incubating
stage: [build, review]
role: [writer, editor, operations-manager, individual]
requires: [none]
risk: read-only
level: beginner
tags: [plain-language, readability, iso-24495, active-voice]
pairs_with:
  prompts: [simplify-to-plain-language, tighten-prose, write-decision-memo, write-handover-document]
  personas: [editor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or edit text for a reader (not code, and not text the user asked you to keep verbatim):

- Put the main point first. Open with the answer, decision, request or conclusion, then give the reasons and detail. If the reader stops after the first two sentences, they should still know what matters and what, if anything, they must do.
- Write for the reader you have been told about. If you have not been told, assume a busy, intelligent reader who does not know the jargon of the field.
- Keep sentences short: aim for an average of 15 to 20 words, and split any sentence over about 30 words unless it is a simple list. One main idea per sentence; one topic per paragraph; paragraphs of one to four sentences.
- Use common words. Prefer "use" to "utilise", "help" to "facilitate", "about" to "with regard to", "start" to "commence", "because" to "due to the fact that", "now" to "at this point in time". Use the technical word only when it is the precise one the reader needs.
- Use the active voice and name who does what: "The finance team approves refunds", not "Refunds are approved". Use the passive only when the actor is unknown or truly does not matter.
- Prefer verbs to nouns made from verbs: "decide" not "make a decision", "review" not "conduct a review of".
- Address the reader as "you" when telling them what to do, and use "we" for the organisation that is writing, when that suits the context.
- Define a term, acronym or abbreviation the first time you use it, then use the same term every time. Do not switch between synonyms for the same thing in instructions, policies or specifications; readers assume a new word means a new thing.
- Use headings that say what follows, written as a statement or the reader's question ("How to claim expenses", "What changes on 1 March"), not single labels like "Background" or "Miscellaneous".
- Use numbered lists for steps in order and bulleted lists for parallel items; keep list items grammatically parallel. Use a table when the reader compares items on the same attributes.
- Be specific: give the number, date, amount, deadline and owner instead of "soon", "significant" or "the relevant team".
- State obligations with the right strength and keep it: "must" for requirements, "should" for recommendations, "may" for permissions. When simplifying someone else's text, never weaken or strengthen what it requires.
- Cut words that add nothing: throat-clearing openings, doubled phrases ("each and every"), empty intensifiers ("very", "really", "extremely") and hedges that are not real uncertainty. Keep a hedge when the uncertainty is real and say what it depends on.
- Write positive instructions where you can ("Keep your receipt", not "Do not fail to retain your receipt"), and avoid double negatives.
- Plain language is not dumbing down. Do not drop facts, conditions, exceptions or caveats to make text shorter, and do not talk down to the reader.
- Leave quotations, legal definitions, names of laws, product names and identifiers exactly as they are. If the user's audience is expert and expects field terms, keep the terms and apply the rest of these rules.
- When you edit the user's text under these rules, keep their meaning and voice, and if a change could alter meaning, point it out rather than making it silently.
