---
schema: 1
id: write-personal-letter
kind: prompt
title: Write a heartfelt personal letter
description: Writes a heartfelt personal letter to a parent, friend, child or partner from the writer's memories and feelings, in the writer's own voice, for milestones and things left unsaid.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [personal-letter, milestone, gratitude, family]
pairs_with:
  prompts: [write-condolence-message, write-thank-you-note, apologize-effectively, write-speech]
args:
  - name: recipient
    description: "Who the letter is for and your relationship, for example \"my dad, turning 70\", \"my daughter, leaving for university\", \"my best friend of 20 years\", \"my wife, our 25th anniversary\"."
    type: text
    required: true
  - name: memories_and_feelings
    description: Specific memories, things they did or said, what you are grateful for, what you have never said, how you feel now, and anything to avoid. Write it however it comes; your own words help the letter sound like you.
    type: text
    required: true
  - name: occasion
    description: "Optional: the milestone or reason, for example \"birthday\", \"wedding day\", \"retirement\", \"no occasion, just overdue\"."
    type: string
output_contract:
  format: markdown
  sections: [Letter, Choices made, Make it yours]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A personal letter matters because the recipient knows it came from the writer, so it must sound like them, not like a greeting card. Letters that move people are specific (one scene told well beats a list of virtues), honest about feeling without overstatement, and address the recipient directly. They often follow a simple arc: why I am writing now, a memory or two that show what this person means, what I have learned or am grateful for, and what I hope or wish for them. Letters fail when they are generic ("you've always been there for me"), when the writer's voice is replaced by polished phrasing they would never use, or when they slip into a speech about the writer.
</context>

<task>
Write a personal letter to: {{recipient}}.
{{#occasion}}Occasion: {{occasion}}{{/occasion}}

<memories_and_feelings>
{{memories_and_feelings}}
</memories_and_feelings>

1. If the memories and feelings are only general statements with no specific moment, ask up to three gentle questions that draw out one (for example "Is there a day with them you think about often?") and stop.
2. Study the writer's own phrasing: sentence length, formality, humour, the words they use for the recipient, and any phrases that sound like them. Write in that voice.
3. Choose the one or two strongest memories that carry what the writer most wants to say, and tell them as small scenes with the specific details given. Leave the rest out, or mention them in a line, rather than listing everything.
4. Structure the letter with a natural opening that says why now, the memories, what they mean to the writer (gratitude, pride, an apology, love, whatever the notes express), and a closing wish or promise for the future. Fit it to the occasion.
5. Use the recipient's name or the writer's name for them throughout as the notes do. Keep it to about 300 to 500 words unless the notes clearly call for shorter or longer.
</task>

<constraints>
- Use only memories, facts and feelings the writer gave. Never invent events, sayings or feelings; where a detail would help, add `[detail: …]` for the writer to fill.
- Keep the writer's voice. Prefer their exact phrases when vivid; avoid grand language, clichés and greeting-card lines they would not say.
- Honour anything they said to avoid. Do not add apologies, confessions or reconciliations the writer did not ask for, and do not soften or harden what they feel.
- If the letter is to someone who harmed the writer, or the notes show deep pain, write what they asked for with care, and mention that some people write such letters without sending them, leaving the choice to the writer. If the notes suggest the writer is in crisis or unsafe, gently point them to someone they trust or a local crisis line.
</constraints>

<output_format>
## Letter
The letter, ready to copy by hand or send.
## Choices made
Two to four bullets: which memories were used and why, and which were left out.
## Make it yours
Every `[detail: …]`, plus one or two lines where the writer might swap in their own wording.
</output_format>
