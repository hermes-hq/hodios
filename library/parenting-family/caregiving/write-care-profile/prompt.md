---
schema: 1
id: write-care-profile
kind: prompt
title: Write a care profile
description: Writes a one-page profile of the person you care for, for hospitals and new carers, covering who they are, how they communicate, routines, what upsets and comforts them, and key care facts.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [about-me, person-centred, carers, dementia, learning-disability, hospital-stay]
pairs_with:
  prompts: [prepare-emergency-medical-summary, plan-respite-break, build-care-rota]
args:
  - name: about_them
    description: Notes about the person, ideally written with them - what they like to be called, life history, how they communicate and show pain, routines, food, sleep, personal care, mobility, what upsets or calms them, faith and culture.
    type: text
    required: true
  - name: care_facts
    description: Key facts copied from their care plan or prescription list, for example conditions, allergies, medicines, equipment, how they take tablets, and who to contact. Optional.
    type: text
  - name: audience
    description: Who will read it, for example hospital ward, new home care workers, respite care home, day centre. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Care profile, Key care facts, Gaps to fill, Keeping it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help family carers write a person-centred profile, the kind of one-page document used for people living with dementia, learning disabilities or complex needs when they go into hospital, start with new carers or go for respite. Staff who meet the person for the first time see a diagnosis; the profile tells them a person: that she was a headteacher and likes to be called Mrs Ahmed, that he says "I'm fine" when in pain but rubs his knee, that she will not eat if rushed, that he settles to football commentary. These details prevent distress, missed pain, poor eating and avoidable incidents. The family is the expert on the person; the clinical team is the expert on medical facts.

<about_them>
{{about_them}}
</about_them>
{{#care_facts}}
<care_facts>
{{care_facts}}
</care_facts>
{{/care_facts}}
{{#audience}}Who will read it: {{audience}}{{/audience}}
</context>

<task>
1. Care profile: a one-page profile written in the first person ("I like to be called...") where the person can contribute, or as "about [name]" if not, with short headed sections: What I like to be called; About me (a few lines of life history and what matters to me); People important to me; How I communicate (speech, hearing, sight, language, how I show yes, no, pain, worry); My routine (morning, meals, sleep); Eating and drinking (likes, dislikes, help I need); Personal care (preferences, dignity, same-gender carer if wanted); Moving about; What upsets me; What helps me feel calm; Faith, culture and things I enjoy.
2. Key care facts: conditions, allergies, medicines and how they take them, equipment and main contacts, copied exactly from what was given; no additions. If none were given, leave a short section with blanks and say to copy from the current prescription list or care plan.
3. Gaps to fill: anything a reader would need but is missing (for example how they show pain, night routine, allergies), as questions.
4. Keeping it current: where to keep copies, who to give it to, and a review date.
Tailor the emphasis to the audience if given (for a hospital: communication, pain, eating and drinking, discharge contacts; for new carers: routine and personal care).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Copy medical facts, medicines and allergies exactly as given. Never add, correct, or guess a dose, condition or allergy; mark unclear items "[check with the care team or pharmacist]".
- Write respectfully and with dignity; avoid labels like "difficult" or "aggressive". Describe behaviour and what helps ("may push away a carer if washed quickly; explain each step").
- Keep to one page for the profile; scannable headings and bullets.
- Use the person's own voice and wishes where given, and note if they did not contribute.
- If the notes describe a sudden change in the person's health or behaviour, add a line that this needs their doctor or care team now.
</constraints>

<output_format>
## Care profile
The one-page profile, ready to print.
## Key care facts
## Gaps to fill
## Keeping it current
</output_format>
