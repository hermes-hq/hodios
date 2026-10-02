---
schema: 1
id: write-occasion-poem
kind: prompt
title: Write a poem for an occasion
description: Writes a personal poem for a wedding, funeral, birthday or retirement from details about the people, sized and paced to be read aloud. Use when you need something to read at an event.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, writer]
requires: [none]
inputs: [text, preferences]
output: [article, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [occasional-verse, eulogy, wedding-reading, read-aloud]
pairs_with:
  prompts: [write-poem-in-form, critique-poem]
args:
  - name: occasion
    description: The event and your role in it, e.g. "my sister's wedding, I'm the maid of honour", "my grandfather's funeral", "a colleague's retirement party", "my son's 18th birthday".
    type: string
    required: true
  - name: details
    description: Specifics about the people, such as names, how you know them, habits, sayings, shared memories, places, objects, what they love. Also the tone you want, faith or cultural context, and anything to avoid.
    type: text
    required: true
  - name: length
    description: How long it should take to read aloud, e.g. "under a minute", "about two minutes", or a line count.
    type: string
    default: about one minute read aloud
output_contract:
  format: markdown
  sections: [Questions, Approach, Poem, Reading notes, Alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An occasion poem is heard once, by a mixed audience, often read by someone nervous. It works when it sounds like these specific people and nobody else: a real habit, a saying, a place, an object, a moment the room will recognise. It fails when it could be read at any wedding or funeral ("two hearts become one", "you are in a better place"), when it is too long to hold attention, or when its rhythm trips the reader. Poems for the ear need clear syntax, lines that end on natural pauses, a shape the listener can follow (a refrain, a list, a turn), and an ending that lands so the audience knows it is over.
</context>

<task>
Write a poem for this occasion: {{occasion}}

<details>
{{details}}
</details>

Target length: {{length}}

1. **Questions:** a personal poem needs at least three concrete specifics (a habit, a memory, a place, an object, a phrase). If the details have fewer, or you do not know the names or the reader's relationship to them, ask for exactly what is missing (at most four questions) and stop.
2. **Approach:** in three or four lines, the tone (for example joyful with gentle humour; quiet and grateful; celebratory), the shape you chose (rhymed stanzas, free verse, a list poem, a refrain), the central image that ties the details together, and who the poem addresses (the person, the audience, or both).
3. **Poem:**
   - Size it to {{length}}, at roughly 100 to 120 words per minute of unhurried reading aloud.
   - Use the provided specifics; build the poem around one or two of them rather than listing everything.
   - Fit the occasion: for a wedding, celebrate this couple and include the room; for a funeral or memorial, honour the actual life, allow grief and, where the details support it, warmth or a smile, without platitudes; for a birthday or milestone, look back and forward; for a retirement, honour the work and the person outside it, with humour that colleagues share and that cannot embarrass anyone.
   - If rhymed, use natural word order and a steady meter; if free verse, break lines where the reader should pause.
   - End with a line that is easy to say slowly and signals the close.
4. **Reading notes:** the estimated read-aloud time, where to pause, any words that are hard to say together, and one tip for delivering it (for example, look up at the last line).
5. **Alternatives:** a shorter version (about half the length) for if time is cut, and two alternative closing lines.
</task>

<constraints>
- Do not invent facts about the people (memories, names, jobs, illnesses, causes of death). Where a detail would help but is missing, use a bracketed placeholder like `[the name of her first dog]` and list it.
- Respect the faith and cultural context given. Do not add religious language or afterlife imagery unless the details call for it; when they do, use the tradition's own terms with care.
- Keep humour kind: no jokes about exes, weight, age-related decline, drinking or anything that could embarrass someone in front of family or colleagues, unless the details say the person would love exactly that joke.
- Write original verse. Do not reproduce existing poems or readings; you may suggest a well-known reading by title as an alternative only if you are sure of its author.
</constraints>

<output_format>
## Questions
Only if details are missing; otherwise "None".
## Approach
## Poem
With a title.
## Reading notes
## Alternatives
</output_format>
