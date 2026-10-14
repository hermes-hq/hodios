---
schema: 1
id: write-memoir-disclosure-letter
kind: prompt
title: Tell someone they are in your memoir
description: Writes a letter telling a family member or friend that they appear in your memoir, what you are sharing and what you are offering them, in a tone that keeps the door open.
category: life-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [writer, individual]
requires: [none]
inputs: [notes, preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [memoir, real-people, consent, family-conversations, letter-writing]
pairs_with:
  prompts: [check-memoir-for-privacy-risks, write-memoir-authors-note]
  personas: [memoir-coach]
args:
  - name: person_and_portrayal
    description: Who they are to you, how they appear in the book (which episodes, how they come across), how they are likely to feel, and your relationship now.
    type: text
    required: true
  - name: offer
    description: What you are willing to offer, for example reading the passages before publication, changing their name, correcting facts, a conversation, or nothing beyond notice. Say what you will not change.
    type: text
    required: true
  - name: publication
    description: Optional. How and when it will be shared or published.
    type: string
output_contract:
  format: markdown
  sections: [Letter, Shorter version, What this letter promises, If they react badly]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help memoir writers with one of the hardest conversations in the craft: telling people they are in the book. Experienced memoirists differ on whether to ask permission, offer a read or just give notice, but they agree on a few things. Nobody should learn they are in a book from someone else. A letter should say clearly what the book is about and why the person is in it, without apologising for the writer's right to tell their own story and without arguing the case again. Offers must be ones the writer will keep: offering a veto they will not honour is worse than offering none. Fact corrections and name changes are easy to give; changes to the writer's experience usually are not, and saying so up front prevents a worse break later.

<person_and_portrayal>
{{person_and_portrayal}}
</person_and_portrayal>
<offer>
{{offer}}
</offer>
{{#publication}}Publication: {{publication}}{{/publication}}
</context>

<task>
1. Letter: 200 to 350 words in the writer's voice. Say that the writer is writing a memoir, what it is about in one or two sentences, and that the person appears in it, with an honest, non-inflammatory summary of how (for example "including the year Dad was ill and the arguments we had about his care"). State the offer exactly and what will not change, kindly and plainly. Say when it will be shared or published if known. Invite a response and name how (a call, a reply, a meeting). Close warmly but without pleading.
2. Shorter version: under 100 words, for a person the writer is less close to or for a message rather than a letter.
3. What this letter promises: a bullet list of every commitment made in the letter, so the writer can confirm they will keep each one.
4. If they react badly: three short, calm replies for likely reactions (anger, a request to remove them, a threat to stop speaking), each restating the offer without escalating.
</task>

<constraints>
- Do not quote or restate the hurtful passages in the letter; summarise episodes neutrally.
- Never add offers the writer did not make, such as a veto or approval rights.
- Do not argue about what happened, assign blame or ask for forgiveness unless the writer asked for that.
- Do not give legal assurances or call the letter consent; if the writer needs written consent for legal reasons, say they should ask a lawyer how to get it.
- If the writer describes the person as dangerous or abusive, say that sending this letter may not be safe or necessary and suggest they think it through with someone they trust before contacting them.
</constraints>

<output_format>
## Letter
## Shorter version
## What this letter promises
## If they react badly
</output_format>
