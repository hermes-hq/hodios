---
schema: 1
id: prepare-menopause-appointment
kind: prompt
title: Prepare for a menopause appointment
description: Prepares for a perimenopause or menopause appointment with a symptom record, health details that affect treatment choices, questions on HRT and alternatives, and a 30-second opening.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [table, questions, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [menopause, perimenopause, hrt, womens-health, hot-flushes, midlife-health]
pairs_with:
  prompts: [plan-menopause-lifestyle, build-symptom-log, prepare-doctor-questions, prepare-treatment-decision]
  personas: [health-navigator]
args:
  - name: symptoms
    description: What you have noticed and how it affects you, for example "night sweats most nights, waking at 3am, short temper, brain fog at work, periods every 6 weeks and heavier".
    type: text
    required: true
  - name: age
    description: Your age in years. Optional.
    type: number
  - name: history
    description: Health details that may matter, for example last period, contraception, conditions, medicines, history of breast cancer, blood clots, migraine, liver disease, family history. Optional.
    type: text
  - name: hopes
    description: What you want from the appointment, for example "discuss HRT", "rule out other causes", "non-hormonal options only". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your 30-second opening, Symptom record, Health details to mention, Questions about treatment options, Get checked promptly if, After the appointment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for an appointment about perimenopause or menopause symptoms. Perimenopause can start years before periods stop and the symptoms are wider than most people expect: hot flushes and night sweats, sleep problems, low mood, anxiety and irritability, brain fog, joint aches, palpitations, vaginal dryness and urinary symptoms, changes in libido, and irregular or heavier periods. Many guidelines say that over about 45 the diagnosis is usually made from symptoms, and that hormone blood tests are often not needed because levels fluctuate; under 40, symptoms and stopped periods need assessment for premature ovarian insufficiency. Appointments go better when the person brings a few weeks of symptom records with their impact on daily life, the health details that affect treatment choice, and clear questions. Treatment options include hormone replacement therapy (different oestrogen routes such as patch, gel, spray or tablet, plus a progestogen if they have a uterus), local vaginal oestrogen, non-hormonal prescription options, and lifestyle and psychological approaches; the balance of benefits and risks is individual. Contraception is still needed in perimenopause.

Symptoms: {{symptoms}}
{{#age}}Age: {{age}}{{/age}}
{{#history}}Health details: {{history}}{{/history}}
{{#hopes}}What they want: {{hopes}}{{/hopes}}
</context>

<task>
1. Your 30-second opening: a script naming the main symptoms, how long, the impact on work, sleep or relationships, and what they want from the visit ("I'd like to talk about whether HRT is an option for me").
2. Symptom record: a table template prefilled from {{symptoms}}, with columns for frequency, severity 0 to 10 and impact, plus a period column (dates, flow) and a note to keep it for two to four weeks before the visit if there is time. Include symptoms they may not link to menopause as prompts to consider, phrased as questions.
3. Health details to mention: the details from their notes that clinicians weigh when discussing treatment (breast cancer, blood clots or stroke, migraine, liver disease, unexplained bleeding, blood pressure, smoking, family history), plus current contraception and medicines. Explain in one line why each matters, without saying it rules anything out.
4. Questions about treatment options: top three first, then the rest, covering whether HRT is suitable for me and why or why not, which type and route and why, benefits and risks for someone with my history, how long before it helps and when it is reviewed, non-hormonal options, local treatment for vaginal or urinary symptoms, contraception during perimenopause, and support for mood and sleep.
5. Get checked promptly if: bleeding after periods have stopped for 12 months, bleeding after sex or between periods, very heavy bleeding, or mood so low they feel hopeless or have thoughts of self-harm. If they are under 40 and periods have stopped or become very irregular, add asking about assessment for early menopause.
6. After the appointment: what to note (what was agreed, review date, what to do if side effects), and that it is reasonable to ask for a second appointment or a clinician with a menopause interest if they feel unheard.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not recommend for or against HRT or any medicine, and do not give doses. Do not quote risk percentages unless you state the source type and that individual risk differs.
- Do not say the symptoms are definitely menopause; other causes (thyroid problems, anaemia, depression, medicine side effects) are part of what the clinician considers, and they can ask about them.
- Do not dismiss or exaggerate symptoms. Validate the impact briefly, once.
- If thoughts of self-harm appear, follow the guidance above before anything else.
</constraints>

<output_format>
## Your 30-second opening
## Symptom record
Table: Symptom | How often | Severity 0-10 | Impact on daily life. Then a short period record.
## Health details to mention
## Questions about treatment options
Top 3, then the rest.
## Get checked promptly if
## After the appointment
</output_format>
