---
schema: 1
id: write-wedding-toast
kind: prompt
title: Write a wedding toast
description: Writes a wedding toast for a best man, maid of honour, parent or friend around one real story, with both partners included and a clean raise of the glass.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes, preferences]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [wedding, toast, best-man, maid-of-honour, father-of-the-bride, writing-for-the-ear]
pairs_with:
  prompts: [mark-up-script-for-delivery, rehearse-speech-with-feedback, turn-script-into-cue-cards]
  personas: [speaking-coach]
args:
  - name: role
    description: Who you are to the couple and your slot, for example "best man, brother of the groom", "mother of the bride, welcome speech", "friend of both since university".
    type: string
    required: true
  - name: couple
    description: Both partners' names, how you know each of them, how they met if you know, and anything about them as a pair (what each brings out in the other).
    type: text
    required: true
  - name: stories
    description: "Your raw material: one or two stories, traits with examples, things they say, and anything to avoid (exes, family tensions, guests who do not drink, a recent loss)."
    type: text
    required: true
  - name: minutes
    description: Target length in minutes. Most toasts land best at 3 to 5.
    type: number
    default: 4
  - name: tone
    description: Optional tone, for example "funny but kind", "heartfelt, light humour", "formal, religious family".
    type: string
output_contract:
  format: markdown
  sections: [Toast, Length, Checks before the day, Delivery notes, If you run long]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A wedding toast is judged by the room, not by the friends at one table. The guests range from grandparents to children, many know only one partner, and some have had a drink. Toasts that work share a shape: a short line saying who you are, one well-told story that shows something true about one partner, a turn to the other partner and to the couple together, and a clear raise ("Please raise your glasses to…"). Toasts that fail usually do one of these: run past five minutes, rely on inside jokes, mention exes, drinking or sex, talk about the speaker more than the couple, ignore one partner (the classic best man's toast that is all about the groom), read a list of dictionary definitions or stock quotes, or roast someone in front of their new in-laws. A good test for any joke: would the partner's grandmother laugh, and would the person it is about be glad their boss heard it?

Different roles carry different jobs. A parent often welcomes the other family and guests and thanks those who helped. A best man or maid of honour usually tells the friendship story and may read short messages from absent friends. A friend of both can tell how the couple looked from the outside. In many cultures there is an order of speeches and set expectations (who thanks whom, whether religion is mentioned); the user knows these, so ask rather than assume.
</context>

<task>
Write a wedding toast. Speaker: {{role}}. Target: {{minutes}} minutes.{{#tone}} Tone: {{tone}}.{{/tone}}
<couple>
{{couple}}
</couple>
<stories>
{{stories}}
</stories>

1. If you are missing both partners' names or at least one concrete story or example, ask up to three short questions (for example "What is one moment when you saw who she really is?") and stop.
2. Pick the single story that best shows a quality the couple will need or already share. Keep a second only if the length allows. Drop anything that needs explaining.
3. Make sure both partners are in it: if the material is mostly about one, build a bridge to the other ("And then Sam arrived, and…") using only what the user gave, and add a `[detail: …]` placeholder where a fact about the other partner is needed.
4. Structure: a one-line introduction of who you are; the story, told with one or two concrete details; what it shows; the turn to the couple; one wish or line of advice that comes from the story, not a greeting card; the raise, naming both partners.
5. Write for the ear: short sentences, one idea each, room for laughter after a funny line, and [pause] at two to four points. About 130 words per minute.
6. Screen every line against the avoid list and the pitfalls in the context. Remove or soften anything that could embarrass, exclude or hurt, and record what you removed in Checks before the day.
</task>

<constraints>
- Use only the names, stories and facts the user gave. Never invent anecdotes, quotes or details; use `[story: …]` or `[detail: …]` placeholders instead.
- No exes, past relationships, hangovers, sexual innuendo, money, weight, or jokes about marriage as a trap. If the user asks for one of these, leave it out and say why in one sentence.
- No inside jokes that most guests will not get. If a private reference matters to the speaker, explain it in one line inside the toast or cut it.
- Do not assume gender roles, religion or which family pays; mirror what the user says.
- Keep it within 15 percent of the target length.
</constraints>

<output_format>
## Toast
The full text in short paragraphs with [pause] marks, ending with the raise naming both partners.
## Length
"N words, about M minutes at 130 words a minute".
## Checks before the day
What to confirm (name pronunciation, a story the person is happy to have told, order of speeches and who has the microphone), and anything removed from the material and why.
## Delivery notes
Three or four tips: hold the glass in the hand away from the microphone, look at the couple during the turn, wait for laughter, keep the notes on a card.
## If you run long
Which paragraph to cut first, and which second.
</output_format>
