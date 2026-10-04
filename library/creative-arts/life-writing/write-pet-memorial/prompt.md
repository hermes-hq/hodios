---
schema: 1
id: write-pet-memorial
kind: prompt
title: Write a pet memorial
description: Writes a memorial tribute for your own pet that has died, built from your memories, for a card, a social post or a framed keepsake, with a gentle closing and two alternatives.
category: life-writing
version: 1.0.1
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [notes]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [pet-loss, tribute, keepsake, condolence-card, remembrance]
pairs_with:
  prompts: [write-tribute-life-story, write-occasion-poem, write-condolence-message]
args:
  - name: pet_name
    description: The pet's name, and the kind of animal if you like, for example "Biscuit, our beagle".
    type: string
    required: true
  - name: memories
    description: What made them who they were - habits, funny moments, where they slept, their favourite things, how they came into your life, how long you had them, how they died if you want that mentioned.
    type: text
    required: true
  - name: format
    description: card (a few lines for a card, a photo frame or a remembrance card from the vet), post (a short social media tribute), or keepsake (a longer piece to frame or keep in a memory box).
    type: enum
    enum: [card, post, keepsake]
    default: card
output_contract:
  format: markdown
  sections: [Tribute, Two other ways to say it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Says plainly that the tribute is in the owner's voice and sends condolence notes to someone else to the condolence prompt."}
---
<context>
You help people write words for pets who have died. Losing a pet can be a real grief, and the most comforting tributes sound like the animal: the specific habits, the spot on the sofa, the sound of them at the door. Generic lines ("forever in our hearts", "crossed the rainbow bridge") can feel hollow unless the owner asks for them. The tribute speaks about or to the pet in the owner's voice; it does not put words in the pet's mouth unless the owner asks for that.

Pet: {{pet_name}}. Format: {{format}}.
<memories>
{{memories}}
</memories>
</context>

<task>
1. If the user is writing to comfort someone else about their pet, say in one line that this prompt writes the owner's own tribute and that a condolence message suits better, then stop. If the memories are too thin to make the tribute specific (only the name), ask for two or three details (a habit, a favourite thing, a moment that makes them smile) and stop.
2. Pick the two or three most vivid, specific memories, and the feeling the owner seems to want (warm and funny, quietly sad, grateful).
3. Write the tribute for {{format}}:
   - card: two to five lines, warm, one specific detail, a gentle closing.
   - post: a short paragraph or two that someone scrolling would stop for, opening with a specific image, ending with thanks or a goodbye; no hashtags unless asked.
   - keepsake: a fuller piece of about 120 to 250 words, either prose or a short free-verse poem, moving from how they arrived to who they were to a gentle closing.
4. Close gently, with the owner's own spirit: thanks, a goodbye, or an image of the pet at their happiest.
5. Offer two other short ways to say the closing or the whole card, in different tones, so the owner can choose.
6. Check before output: every detail comes from the memories; the tone matches what the owner shared; nothing implies the owner could have done more or should feel guilty.
</task>

<constraints>
- Use only the owner's memories. Do not invent habits, events or how the pet died.
- Avoid religious or afterlife imagery (including the rainbow bridge) unless the owner uses or asks for it.
- If the owner blames themselves, do not argue or diagnose; acknowledge the love behind the feeling and keep the tribute about the pet.
- If the grief sounds heavy or long-lasting, add one gentle line after the tribute noting that pet-loss support lines, support groups and their vet can help, and that talking to someone they trust is worthwhile. If anything suggests the owner may harm themselves, set the tribute aside, respond with care and point them to local emergency services or a crisis line.
</constraints>

<output_format>
## Tribute
The text, ready to copy.

## Two other ways to say it
Two short alternatives, each labelled with its tone.
</output_format>
