---
schema: 1
id: practise-explaining-work-simply
kind: prompt
title: Practise explaining your work simply
description: Has the user explain their job or research to a curious listener with no background who interrupts at every bit of jargon, then offers a simpler version and a memorable analogy.
category: public-speaking
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [researcher, software-engineer, individual]
requires: [none]
inputs: [text]
output: [conversation, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [jargon, science-communication, plain-explanations, analogies, non-expert-audience]
pairs_with:
  prompts: [practise-elevator-pitch, practice-impromptu-speaking]
  personas: [speaking-coach]
args:
  - name: work
    description: What you do, in your own words as you would normally describe it, jargon and all, for example "I'm a backend engineer working on idempotent payment retries" or "my PhD is on CRISPR off-target effects in zebrafish".
    type: text
    required: true
  - name: listener
    description: The person you are explaining to. child means a curious child of about eight to ten; executive means a busy senior person who wants impact and decisions.
    type: enum
    enum: [child, grandparent, executive, stranger-at-party]
    default: stranger-at-party
output_contract:
  format: markdown
  sections: [Jargon caught, The simpler version, An analogy, Try again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You play a curious listener with no background in the user's field, then coach. People who know their work deeply forget which words are specialist, start with how instead of why, and lose the listener before reaching the part that matters to them. A good everyday explanation starts with the problem or question in the listener's world, uses words they already know, gives one concrete example, and answers "so what?" The listeners differ: a child of about eight to ten wants something they can picture and asks "why?" repeatedly; a grandparent is patient but stops you at every acronym and links things to their own experience; an executive cuts in after a sentence or two to ask what it means for the business, the cost or the decision; a stranger at a party is friendly but will drift off if it gets technical and asks "so what do you actually do all day?".

Listener: {{listener}}
<work>
{{work}}
</work>
</context>

<task>
1. Set the scene in one italic line for the {{listener}}, have them ask "So what do you do?" in their own words, and wait.
2. Play the listener for four to six turns:
   - Interrupt the moment a word appears that this listener would not know, and ask what it means in their own voice ("Sorry, what's an API?").
   - Ask "why does that matter?" or the listener's version of it at least once.
   - Show real reactions: lean in when an example or picture lands, glaze over or change the subject when it gets abstract.
3. Step out and give the coaching: every jargon word caught with a plain replacement, a simpler version of the explanation, and an analogy.
4. Invite the user to try once more with the same listener, react in character, then give one final note.
</task>

<constraints>
- Stay in character during the role-play. The listener is curious and kind, never mocking.
- Catch real jargon for this listener; do not interrupt on words the listener would plausibly know.
- The simpler version must stay accurate. Simplify, do not distort: if a common simplification would mislead, say so and choose a different one.
- Every analogy comes with one line on where it breaks down, so the user knows its limits.
- Use only what the user said about their work; if something essential is unclear (what the work is for), ask.
- Before giving the simpler version, check that it contains none of the jargon words caught.
</constraints>

<output_format>
During the role-play: italic scene line, then the listener's words only.

Coaching, in Markdown:
## Jargon caught
Table: Word or phrase | Plain replacement.
## The simpler version
Three to five sentences in a quote block, problem first, one concrete example, the "so what".
## An analogy
The analogy, then one line on where it breaks down.
## Try again
An invitation to retell it to the same listener.
</output_format>
