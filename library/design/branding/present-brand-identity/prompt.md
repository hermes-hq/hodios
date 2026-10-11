---
schema: 1
id: present-brand-identity
kind: prompt
title: Present a brand identity to decision-makers
description: Plans how to present a new brand identity to a client or board, with a storyline from strategy to idea to identity in use, slide outline, speaker notes and objection handling.
category: branding
version: 1.0.0
status: incubating
stage: [review, ship]
role: [graphic-designer, consultant, marketer]
requires: [none]
inputs: [text, document]
output: [outline, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-presentation, client-presentation, stakeholder-buy-in, visual-identity, creative-rationale]
pairs_with:
  prompts: [build-brand-platform, design-logo-concepts, outline-presentation, build-brand-guidelines]
  personas: [brand-strategist, art-director]
args:
  - name: identity
    description: The identity being presented - the strategy agreed earlier, the core idea, the logo, colours, type, graphic device, imagery, and the applications mocked up. Say if there are several routes.
    type: text
    required: true
  - name: audience
    description: Who is in the room, what they care about, their likely concerns, and how the decision will be made.
    type: text
    required: true
  - name: time
    description: Length of the slot and format (in person, video). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Presentation goal, Storyline, Slide outline, Speaker notes, Anticipated objections, Feedback and decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good identities are killed in the presentation room. The usual mistakes: opening with the logo alone on a white slide so people react to taste ("I don't like green") before they remember the strategy; showing the mark in isolation instead of in real use; presenting five equal options so the room merges them into a compromise; and closing with "what do you think?" which invites everyone to redesign. Experienced designers re-state the agreed problem and strategy first, reveal the idea before the form, show the identity working in the client's world (the sign, the app, the uniform, the invoice), recommend one route, and ask for feedback against the brief rather than personal preference. New identities also feel strange at first; good presenters say so and give people time.
</context>

<task>
Plan the presentation of this identity.

<identity>
{{identity}}
</identity>

<audience>
{{audience}}
</audience>
{{#time}}Time and format: {{time}}{{/time}}

1. **Presentation goal.** The decision you need at the end of the meeting and what a good outcome looks like.
2. **Storyline.** The arc in five or six beats: where we started (the problem), what we agreed (strategy, audience, personality), the idea, the identity, the identity in use, and next steps.
3. **Slide outline.** Slide by slide with title, content, and what the audience should feel or understand. Reveal the logo only after the idea, and show applications before system details.
4. **Speaker notes.** Short notes for the key slides: how to explain the idea in one sentence, how each element connects to the strategy, and how to acknowledge that new identities feel unfamiliar at first.
5. **Anticipated objections.** Likely objections from this audience (colour preference, "too simple", "our competitor uses blue", "can we combine routes", a CEO's personal taste), each with an answer that returns to the brief.
6. **Feedback and decision.** How to collect feedback in the room (questions framed against the brief: "does it express X to audience Y?"), who decides, what happens next, and how to avoid a redesign by committee.
</task>

<constraints>
- Do not invent research results or test scores to persuade; use only evidence the user has.
- If several routes exist, recommend one and explain why, while showing the others briefly.
- Answers to objections should listen and explain, not dismiss.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Slide outline as a table (Slide, Title, Content, Purpose). Objections as a table (Objection, Likely source, Response).
</output_format>
