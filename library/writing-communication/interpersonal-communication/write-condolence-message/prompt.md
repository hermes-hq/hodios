---
schema: 1
id: write-condolence-message
kind: prompt
title: Write a condolence message
description: Writes a sincere, specific, cliché-free condolence message for a card, email or text, adapted to the relationship with the bereaved and the person who died, with an optional concrete offer of help.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [condolences, sympathy-card, grief, bereavement]
pairs_with:
  prompts: [write-personal-letter, write-thank-you-note, write-speech]
args:
  - name: relationship
    description: "Who you are writing to and who died, and your connection to each, for example \"my colleague Dana, whose father died; I never met him\" or \"my aunt, whose husband (my uncle Joe) died suddenly\"."
    type: text
    required: true
  - name: details
    description: "Optional: the medium (card, email, text, social media comment), a memory of the person who died, something you admire in them, the cause or circumstances only if relevant, the family's beliefs, and any practical help you can genuinely offer."
    type: text
output_contract:
  format: markdown
  sections: [Message, Shorter version, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People delay condolence messages because they fear saying the wrong thing, but a short, sincere message almost always helps. What comforts: naming the person who died, a specific memory or quality, acknowledging the loss plainly ("I was so sorry to hear that your father died"), and, where real, a concrete offer of help. What hurts or rings hollow: explaining the death ("everything happens for a reason", "they're in a better place" unless the bereaved share that belief), comparing it with one's own losses, "at least…", telling people how to feel, and vague offers ("let me know if you need anything") that put the work on the grieving person. The register depends on closeness: a colleague's message is short and respectful; a close friend's can be warmer and longer.
</context>

<task>
Write a condolence message.

Relationship: {{relationship}}
{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. If it is unclear who the message is to, or who died, ask briefly and stop.
2. Choose the length and register for the relationship and medium: a text or social comment of one to three sentences; a card of three to six sentences; an email or letter can be longer if the writer knew the person well.
3. Write the message:
   - acknowledge the death plainly and name the person, if their name was given;
   - include one specific memory, quality or detail from the details; if the writer did not know the person, acknowledge what they meant to the bereaved instead ("I know how much you loved talking about your dad's garden");
   - express care for the bereaved in simple words;
   - make one concrete offer only if the details include something the writer can actually do (a meal on a set day, covering a shift, a walk next week), and say no reply is needed;
   - close warmly and simply.
4. Write a shorter alternative (one or two sentences) for a different medium or a more distant relationship.
</task>

<constraints>
- Use only details provided. Never invent memories, qualities or anecdotes about the person who died; if there is no memory, keep the message honest and simple rather than generic praise.
- Avoid clichés and anything that explains, minimises or compares the loss: "everything happens for a reason", "they're in a better place", "at least they…", "I know how you feel", "stay strong", "time heals".
- Mention religion or faith only if the details say the bereaved share it.
- Do not mention the cause of death unless the details indicate it is appropriate, and never in a public post.
- Keep a workplace message appropriate for a colleague; for a manager writing to a direct report, make any offer of time off or flexibility one the manager can actually give.
</constraints>

<output_format>
## Message
The message, ready to copy into a card, email or text.
## Shorter version
One or two sentences.
## Notes
Two or three brief suggestions: when to send it, whether to follow up in a few weeks, and anything to adjust if the writer knows the family's preferences.
</output_format>
