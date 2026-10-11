---
schema: 1
id: write-birth-preferences
kind: prompt
title: Write birth preferences
description: Turns labour and birth wishes into a one-page birth preferences sheet for the maternity team, with a plan B if things change and questions for the midwife or doctor.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, notes, text]
output: [plan, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [birth-plan, labour, maternity-care, midwife, birth-partner]
pairs_with:
  prompts: [prepare-prenatal-visits, write-birth-partner-guide, plan-labour-day-logistics]
args:
  - name: wishes
    description: What matters to you for labour and birth, in your own words or rough notes, for example place of birth, pain relief you want to try or avoid, movement and positions, who is with you, monitoring, cord clamping, skin-to-skin, feeding, photos, language or cultural needs, and anything that worries you.
    type: text
    required: true
  - name: medical_context
    description: Anything your midwife or doctor has already told you that shapes the birth, for example a planned caesarean, a previous caesarean, twins, a breech baby, gestational diabetes, or "low risk so far". Optional.
    type: text
  - name: setting
    description: Where you plan to give birth (hospital labour ward, midwife-led or birth centre, home) and the country. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you finalise, Birth preferences, If things change, Questions for your midwife or doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write birth preferences the way an experienced midwife would want to read them. Midwives on a busy shift skim: a single page with short headings and bullet points gets read, four pages of prose do not. "Preferences" works better than "plan", because birth often changes course, and the sheets that help most say what matters if things change too: a caesarean, an induction, a baby who needs the neonatal team. Good preferences describe values ("I want to be told before any examination", "keep the room dim and quiet") rather than demand outcomes no one can promise. What is offered (water birth, birthing pools, gas and air, epidural availability, who can stay overnight) varies a lot by country and by unit, so options should be checked with the local maternity team.

<wishes>
{{wishes}}
</wishes>
{{#medical_context}}
<medical_context>
{{medical_context}}
</medical_context>
{{/medical_context}}
{{#setting}}Setting and country: {{setting}}{{/setting}}
</context>

<task>
1. Before you finalise: list anything in the wishes that depends on the unit (pool, birth centre, epidural on request, partner staying overnight, photos in theatre) or on their medical situation, and say to check it with their midwife or doctor. If the wishes conflict with something in the medical context, name it gently and do not resolve it yourself.
2. Birth preferences: write a one-page sheet in their voice with short headed sections: About me (name line left blank, who is with me, anything the team should know such as language, previous birth experience, anxiety, trauma or disability, only if they mentioned it); Environment; Movement and positions; Pain relief, from first choice to options they are open to; Monitoring and examinations; Second stage and birth; Straight after birth (cord clamping, skin-to-skin, who announces the sex if they want that, placenta); Feeding; Communication ("explain options and give us time to decide unless it's an emergency").
3. If things change: a short section for induction, assisted birth, caesarean (for example screen lowered, skin-to-skin in theatre, partner present, music), and the baby needing extra care (partner goes with the baby, photos, feeding wishes such as expressed colostrum). Only include what fits their wishes; mark anything they did not mention as "decide: ...".
4. Questions for your midwife or doctor: 5 to 8 questions to talk through at an appointment before about 36 weeks, focused on the open items and their medical context.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend for or against any pain relief, intervention or place of birth, and do not describe the risks of their choices in numbers. Those are conversations for their midwife or doctor, who knows their history.
- Never add medical facts, risks or conditions that were not given. If the medical context is missing, write general preferences and say the team will tailor them.
- Keep the sheet to one page: short bullets, plain words, no jargon the team would need to decode.
- Use the person's own words where they gave them. Write "we" or "I" as they did.
- Respect cultural, religious and personal wishes (for example a female clinician where possible, prayers, keeping the placenta) without judgement, marking ones the unit may need notice of.
- If the wishes mention reduced baby movements, bleeding, fluid leaking, severe headache, vision changes, severe pain, fever or feeling very unwell now, say first that this needs a call to their maternity unit or midwife today, not a birth plan.
</constraints>

<output_format>
## Before you finalise
Bullets: item to check, who to check with.
## Birth preferences
The one-page sheet with short headings and bullets, ready to print.
## If things change
## Questions for your midwife or doctor
Numbered list.
</output_format>
