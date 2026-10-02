---
schema: 1
id: build-concept-map
kind: prompt
title: Build a concept map
description: Turns a topic or chapter into a concept map with labelled links and cross-links, as Mermaid or an outline, then quizzes the learner on the links. For students who know facts but miss connections.
category: studying
version: 1.0.1
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [notes, document, topic]
output: [diagram, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [concept-map, mermaid, elaboration, propositions, retrieval-practice]
pairs_with:
  prompts: [make-study-guide, make-flashcards, run-feynman-check]
  personas: [study-coach]
args:
  - name: material
    description: The chapter, notes or topic to map. Pasted text gives the most faithful map; a bare topic name gets a standard-curriculum map.
    type: text
    required: true
  - name: focus_question
    description: Optional question the map should answer, e.g. "How does the body keep blood glucose stable?". Without one, the prompt proposes one.
    type: string
  - name: format
    description: mermaid gives a flowchart diagram to render; outline gives an indented text map that works anywhere.
    type: enum
    enum: [mermaid, outline]
    default: mermaid
output_contract:
  format: markdown
  sections: [Focus question, Concept map, Key links, Quiz]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Separates a bare topic name, which gets a standard-curriculum map, from thin notes, which are mapped as they are with an offer to extend."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A concept map in Novak's sense is not a mind map. Every link carries a linking phrase, so each concept–link–concept triple reads as a sentence that is true or false ("insulin — stimulates uptake of — glucose"). Those propositions, and especially the cross-links between distant branches, are where understanding lives. Students who memorise isolated facts usually fail exactly the questions that ask how two ideas relate.
</context>

<task>
Build a concept map of the material below and then quiz the learner on its links.

<material>
{{material}}
</material>
{{#focus_question}}
Focus question: {{focus_question}}
{{/focus_question}}

1. Decide what kind of material you have. A **bare topic** is a name of a few words with no statements in it ("Supply and demand"): map standard textbook content for the apparent level. **Notes or text** contain statements, even a single sentence: map only what they say, and if they support fewer than about 8 concepts, map those, say the material is too thin for a full map, and offer to extend it with standard content or ask for more.
2. Fix the focus question. Use the one given; if none is given, propose one that the material genuinely answers and state it.
3. Pick 12 to 25 concepts (fewer only for thin material, as in step 1). Concepts are nouns or short noun phrases (processes, structures, quantities, ideas), not sentences. Put the most general concept at the top and arrange the rest from general to specific.
4. Link them. Every link has a short verb phrase ("is converted into", "inhibits", "is measured in", "is a type of", "causes") and reads correctly as a sentence in the direction of the arrow. Avoid vague links such as "relates to" or "involves".
5. Add 3 to 6 cross-links between concepts in different branches (fewer if a thin map has few branches). These show the connections students miss; mark them as cross-links.
6. Check every proposition against the material. For a bare topic, keep to standard textbook content for the apparent level and add no contested or advanced claims. If the material contains an error, map what is correct and note the error.
7. Render the map in the {{format}} format:
   - mermaid: a `flowchart TD` code block. Give every node a short id and a quoted label, e.g. `A["Insulin"]`. Write links as `A -->|"stimulates uptake of"| B` and cross-links as dotted arrows, `A -.->|"label"| B`. Use only plain characters in labels so it renders.
   - outline: an indented list with the most general concept at the top; each child line reads "— linking phrase → Concept". List cross-links in a separate block, one sentence each.
8. Then start the quiz. Tell the learner to hide the map. Ask one question at a time and wait for each answer, 6 questions in total (fewer for a small map), mixing:
   - Fill in the missing linking phrase between two named concepts.
   - Explain how two concepts in different branches are connected (the cross-links).
   - Predict what changes elsewhere in the map if one concept changes ("If X increased, what happens to Y, and through which links?").
   After each answer, say what is right, correct what is not with reference to the map, and move on.
</task>

<constraints>
- Every link must be labelled; an unlabelled arrow is an error.
- No concept appears twice. If two branches need it, connect them with a cross-link.
- Keep labels short: concepts up to 4 words, linking phrases up to 5.
- Only include propositions the material supports. Never pad thin notes with outside content unless the learner accepts your offer to extend the map.
- Do not reveal quiz answers before the learner replies.
</constraints>

<output_format>
## Focus question
One line.
## Concept map
The map in the requested format.
## Key links
The 5 most important propositions and every cross-link, each as one plain sentence.
## Quiz
"Hide the map, then answer:" followed by question 1 only. Later questions come one per reply.
</output_format>
