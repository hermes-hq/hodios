---
schema: 1
id: write-eulogy
kind: prompt
title: Write a eulogy
description: Writes a eulogy from family memories that shows who the person was through a few true stories, with checks for the family and support for delivering it while grieving.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [eulogy, funeral, memorial-service, bereavement, tribute, writing-for-the-ear]
pairs_with:
  prompts: [write-funeral-order-of-service, write-obituary, mark-up-script-for-delivery]
  workflows: [funeral-planning-track]
args:
  - name: person
    description: Who died, your relationship to them, and the service, for example "my grandmother Elsie, 91, Church of England funeral", "my friend Tomás, 44, humanist celebration of life", "my father, Muslim family, short words after the prayer".
    type: string
    required: true
  - name: memories
    description: "Everything you have: stories, sayings, what they loved, how they treated people, work and passions, who they leave behind, other people's memories, and anything sensitive (estrangement, cause of death, faith differences, a second family)."
    type: text
    required: true
  - name: minutes
    description: The time you have been given. Often 3 to 7 minutes; ask the officiant if unsure.
    type: number
    default: 5
  - name: other_speakers
    description: Optional. Who else is speaking and what they will cover, so you do not repeat each other.
    type: text
output_contract:
  format: markdown
  sections: [Eulogy, Length, Family check, If emotion takes over, Placeholders]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A eulogy is not an obituary read aloud. The obituary gives the facts of a life; the eulogy shows the character, so that people in the room recognise the person and feel they were with them for a few minutes. That comes from a small number of specific stories, the things they said, and the way they treated people, not from a list of jobs and dates. Gentle humour is usually welcome when it is affectionate and true to the person; it gives the room permission to breathe.

The common failures are predictable: trying to include everyone and everything, so it runs long and reads like a list; idealising the person until the family no longer recognises them; revealing something private or contested in front of people who did not know; speaking more about the speaker's grief than about the person; and only discovering at the lectern that some sentences cannot be said without breaking down. Practical facts also matter: the officiant sets the time, some traditions keep remarks brief or place them outside the main rite, and the family should hear the text before the day so nobody is surprised.
</context>

<task>
Write a eulogy for: {{person}}. Time available: {{minutes}} minutes.
<memories>
{{memories}}
</memories>
{{#other_speakers}}
<other_speakers>
{{other_speakers}}
</other_speakers>
{{/other_speakers}}

1. If the memories contain no specific story, saying or habit, ask up to three gentle questions that would draw one out (for example "What would they say if they walked in right now?", "What is something they did that nobody else would have done?") and stop.
2. Name two or three qualities that the memories actually show, and pick one story or concrete detail for each. If other speakers are covering something, leave it to them.
3. Structure: an opening that brings the person into the room (a scene, a phrase they used), the life in two or three sentences only as much as the stories need, the stories with what each shows, what they leave in the people here, and a short close that speaks to them or about them in a way the family would recognise.
4. Write for the ear: short sentences, plain words, about 120 words per minute because people speak slower when grieving. Put [pause] where the room will need a moment.
5. Mark the two or three lines most likely to be hard to say with [hard line] so the speaker can rehearse them most.
6. If the memories include something sensitive, leave it out by default and list it in Family check with a suggested neutral wording if the family wants it acknowledged.
</task>

<constraints>
- Use only the memories given. Never invent stories, quotes, achievements or feelings; use `[story: …]` placeholders where one would help.
- Honest, not idealised: if the memories describe a difficult person, find true qualities and do not paper over everything with praise; never criticise them from the lectern either.
- Do not state the cause of death, family conflicts, estrangements or private matters unless the user says the family has agreed.
- Follow the tradition the user names for religious language; add none if they name none. Do not choose scripture or prayers for them.
- Stay within 10 percent of the time given; going over at a funeral pushes the rest of the service.
</constraints>

<output_format>
## Eulogy
The full text in short paragraphs, with [pause] and [hard line] marks.
## Length
"N words, about M minutes at 120 words a minute".
## Family check
Facts and names to confirm with the family (spellings, dates, who is mentioned), and anything sensitive left out with a neutral alternative.
## If emotion takes over
Practical help: print in large type, have water, a stand-by reader who has a copy, what to say if you need to stop ("Give me a moment"), and that the room will wait.
## Placeholders
Each placeholder to fill. "None" if none.
</output_format>
