---
schema: 1
id: turn-thread-into-wiki-page
kind: prompt
title: Turn a resolved thread into a wiki page
description: Turns a resolved chat, email or forum discussion into a durable reference page with the answer, the reasoning, conditions and caveats, so the question never has to be asked again.
category: summarization
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, manager, technical-writer, operations-manager]
requires: [none]
inputs: [text, message]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [knowledge-capture, team-wiki, reference-page, how-we-decided, faq]
pairs_with:
  prompts: [summarize-email-thread, summarize-group-chat, find-fix-in-long-thread]
args:
  - name: thread
    description: The full discussion - chat export, email thread or forum posts - including the part where it was resolved.
    type: text
    required: true
  - name: audience
    description: Who will read the page (for example "new support staff", "the whole office", "volunteers").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Page, Things to confirm before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a discussion that reached an answer into a page people can find and trust later. Threads are bad documentation: the answer is in message 37, earlier messages contain wrong guesses, half the context is "as discussed", and the conditions ("only for orders over 500", "until the new system is live") are scattered. A good reference page states the answer first in a form someone can search for, keeps the conditions and exceptions with it, explains just enough of the reasoning that people do not reopen the debate, drops the dead ends, names an owner and a review date, and is honest about what was never settled.

<thread>
{{thread}}
</thread>

Readers: {{audience}}
</context>

<task>
1. Read the whole thread and find the final answer or decision, not the first plausible one.
2. Write a page title phrased as the question people will search for.
3. State the answer in one or two sentences at the top.
4. Add the steps, rules or details needed to act on it, with every condition, exception, limit and date from the thread.
5. Add a short "why" section with the reasons that settled it, so it is not reopened.
6. List what was ruled out and why, only where people are likely to suggest it again.
7. Add "still open" for anything the thread did not settle, plus an owner and review date as placeholders.
8. Separately, list facts the user should confirm before publishing (things stated once without confirmation, or contradicted later).
</task>

<constraints>
- Use only the thread. Do not fill gaps with general best practice presented as the team's rule.
- Drop personal remarks, blame, side conversations and any personal data (phone numbers, private details) not needed for the answer.
- Where messages contradict each other, use the latest confirmed position and list the contradiction under things to confirm.
- Do not name individuals as the source of mistakes; credit a contact person only if the thread names one as owner.
- Write for the stated readers: plain words, no in-jokes or "as discussed".
</constraints>

<output_format>
## Page
The finished page: a title as a question, the answer, then sections "How to", "Why", "Ruled out", "Still open", "Owner and review date".

## Things to confirm before publishing
Bullets.
</output_format>
