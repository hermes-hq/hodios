---
schema: 1
id: capture-staff-know-how-for-faq
kind: prompt
title: Capture staff know-how for an FAQ
description: Interviews a long-serving staff member one question at a time to capture the answers they give customers from memory, then turns them into FAQ entries and saved replies with gaps flagged.
category: customer-support
version: 1.0.0
status: incubating
stage: [discover, build]
role: [founder, manager, operations-manager]
requires: [none]
inputs: [text]
output: [questions, docs, copy]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [knowledge-capture, tacit-knowledge, staff-interview, saved-replies, faq-writing]
pairs_with:
  prompts: [write-faq-from-documents, build-support-macros, write-help-center-article]
args:
  - name: business
    description: The business and who is being interviewed - their role, how long they have been there, and what customers ask them about. The staff member can type the answers themselves, or a manager can type for them.
    type: text
    required: true
  - name: topic
    description: The area to cover in this session, for example "bookings and cancellations" or "product care". Optional; without it the session starts with the most common questions overall.
    type: string
output_contract:
  format: markdown
  sections: [FAQ entries, Saved replies, Gaps and conflicts, Next session]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses capture what their most experienced person knows before it walks out of the door. Long-serving staff answer dozens of customer questions from memory, including the unwritten exceptions ("we can usually do it next day if they call before 11"), the real reasons behind rules, and the wording that calms people down. Asked to "write an FAQ" they produce five generic lines; interviewed well they produce gold. A good interview asks about real recent customers rather than rules in the abstract, one question at a time, follows up on "it depends", and captures the exact words they use.
</context>

<task>
<business>
{{business}}
</business>
{{#topic}}
Topic for this session: {{topic}}
{{/topic}}

1. Open: thank the interviewee, explain in two sentences that you will ask about real customer questions one at a time, that rough answers are fine, and that they can type "skip", "pause" or "done" at any time. Then ask the first question.
2. Interview, one question per turn, then wait:
   - start with "What do customers ask you most often{{#topic}} about {{topic}}{{/topic}}?" and work through their list;
   - for each question: "What do you usually say?", then "When is the answer different?" and "What do customers misunderstand?";
   - ask for the exact words they use with an upset customer;
   - ask "What would a new person get wrong here?";
   - when they say "it depends", ask what it depends on until the rule is clear.
   Briefly reflect back each answer in one line so they can correct it. Keep turns short. After about 12 to 15 questions, or on "done", stop.
3. FAQ entries: rewrite each answer as a customer-facing question and answer in plain words, in the business's voice, without internal shorthand.
4. Saved replies: for the questions that come by message, a ready-to-send reply with [placeholders].
5. Gaps and conflicts: answers that depend on one person's judgement, conflict with each other or with written policy if mentioned, or need the owner to decide.
6. Next session: the topics still to cover.
</task>

<constraints>
- One question per turn; never ask a list of questions at once.
- Use only what the interviewee says; do not fill gaps with typical industry answers. Unclear points go in Gaps and conflicts.
- Customer-facing text never includes internal shortcuts, staff names, or exceptions the owner has not approved; list those as decisions for the owner.
- Be respectful of the interviewee's expertise; no testing or correcting them.
</constraints>

<output_format>
During the interview: one short reflection line, then one question.
At the end:
## FAQ entries
Bold question, answer below, two to five sentences.
## Saved replies
Each with a bold label.
## Gaps and conflicts
Bullets with who should decide.
## Next session
Bullets.
</output_format>
