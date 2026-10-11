---
schema: 1
id: write-parent-speech-for-coming-of-age
kind: prompt
title: Write a parent's speech for a coming-of-age celebration
description: "Writes a parent's speech for a bar or bat mitzvah, confirmation, 18th or 21st birthday or similar rite, with true stories, pride without embarrassment and a wish or blessing."
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
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
tags: [bar-mitzvah, bat-mitzvah, confirmation, eighteenth-birthday, family-speech, milestone]
pairs_with:
  prompts: [plan-coming-of-age-celebration, write-quinceanera-speech, mark-up-script-for-delivery]
args:
  - name: celebration
    description: "The rite and where the speech happens, for example 'bat mitzvah, parents' words to her in the service', 'bar mitzvah party speech', 'confirmation lunch', '18th birthday party', '21st with the key tradition'."
    type: string
    required: true
  - name: child
    description: "Your child's name, who is speaking (one parent, both together, a step-parent), stories from childhood to now, what they worked on for this day (Torah portion, project, mitzvah work), what makes them who they are, family members to mention (including anyone who has died), and anything to avoid."
    type: text
    required: true
  - name: minutes
    description: Target length. Speeches in a service are often 2 to 4 minutes; at a party 3 to 5.
    type: number
    default: 3
  - name: tradition
    description: Optional. How observant or traditional the family is and any wording you already want to use (a blessing, a verse, a family saying).
    type: string
output_contract:
  format: markdown
  sections: [Speech, Length, Who says what, Checks with your child and community]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent's speech at a coming-of-age rite is spoken to the child in front of everyone, and the child is usually 12 to 21: the age most easily embarrassed in public. The speeches that land do three things: recognise the work the young person put into this day (learning a Torah portion and leading part of the service, preparing for confirmation, finishing school), show who they have become through one or two true stories that the child would be glad to have told, and pass on a wish, value or blessing for the next stage. The ones that misfire tell baby stories involving nappies or tantrums, list every achievement like a school report, compare them to siblings, talk mostly about the parents' own feelings, or air family history in front of guests. When two parents speak (including separated or blended families), splitting the speech so each has a part and neither repeats the other avoids awkwardness. In a religious service there are often rules on length, content and whether certain wording is said by the parent or the officiant; the rabbi, priest or minister is the person to check with.
</context>

<task>
Write a parent's speech for: {{celebration}}. Target: {{minutes}} minutes.{{#tradition}} Tradition: {{tradition}}.{{/tradition}}
<child>
{{child}}
</child>

1. If there is no name, no concrete story and nothing about what the child did for this day, ask up to three questions and stop.
2. Recognise the specific work or effort for this day first, in a sentence or two.
3. Choose one or two stories that show a quality the child has now; prefer stories from recent years or ones the child already tells with pride. Leave out embarrassing ones.
4. If two people are speaking, split the speech into parts with a clear handover and no repetition, and label who says what.
5. Close with a wish, value or blessing for the next stage. Use the family's own wording if given; otherwise write a wish in plain words and mark `[optional: traditional blessing, confirm wording with your rabbi, priest or community]` rather than writing religious text.
6. If a grandparent or family member has died, include one warm sentence linking them to the day only if the material mentions them.
7. Write for the ear, about 130 words per minute, with [pause] and [look at {name}] marks.
</task>

<constraints>
- Use only the stories and facts given; never invent anecdotes or achievements.
- No stories about toileting, bodies, crushes, dating or tantrums, no comparisons with siblings, no family conflicts or divorce details.
- Do not write prayers, blessings or scripture for the family unless they supply the wording; describe where one can go.
- Respect the service's limits; say that length and content in a service should be checked with the officiant.
</constraints>

<output_format>
## Speech
Full text with [pause] and [look at …] marks, and speaker labels if two people speak.
## Length
"N words, about M minutes".
## Who says what
How the parts are split, or "One speaker".
## Checks with your child and community
Stories to run past the child, wording and length to check with the officiant or venue.
</output_format>
