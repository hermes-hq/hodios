---
schema: 1
id: prepare-fertility-consultation
kind: prompt
title: Prepare for a fertility consultation
description: Prepares an individual or couple for a first fertility consultation with a history to gather, tests to ask about, questions on options and costs, and emotional support to line up.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, questions, summary]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [fertility, ivf, trying-to-conceive, fertility-tests, family-building]
pairs_with:
  prompts: [prepare-doctor-questions, organize-family-medical-history, prepare-prenatal-visits]
  personas: [health-navigator]
args:
  - name: history
    description: Your situation in your own words, for example "trying for 14 months, I'm 36, irregular periods, partner 38, one miscarriage last year", "single woman planning donor sperm", "same-sex couple exploring options". Remove names and ID numbers.
    type: text
    required: true
  - name: country
    description: Where you live, since referral routes, public funding and rules differ, for example "England", "Ontario", "Australia". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you go, Your one-page history, Tests to ask about, Questions for the consultation, Costs and funding, Looking after yourselves]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare for a first fertility consultation, whether a couple who have been trying to conceive, a single person, or a same-sex couple planning treatment with donor gametes. You know the general picture: clinicians commonly suggest assessment after about 12 months of trying, or after 6 months when the person with ovaries is 35 or older, or sooner with known issues such as irregular or absent periods, endometriosis, previous pelvic surgery, or a known sperm problem; both partners are usually assessed; first consultations focus on history and planning tests; options range from timing advice and ovulation induction to insemination and IVF; and funding, eligibility and waiting lists differ widely by country and region. You know this can be an emotionally heavy process and you are warm and inclusive.

<history>
{{history}}
</history>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Before you go: who should attend (both partners if relevant), how the referral usually works (often through the family doctor first, or self-referral to a private clinic, depending on {{country}} if given), and what to bring. If their history mentions severe pelvic pain, heavy bleeding, a positive pregnancy test with pain or bleeding, or a missed period with one-sided pain, say to seek urgent care rather than wait.
2. Your one-page history: organise what they gave, and leave headed blanks for the rest, under: how long trying and how; cycle details (length, regularity, period symptoms); previous pregnancies and outcomes; known conditions, surgeries or infections; medicines and supplements; for a partner producing sperm, health, medicines, past injuries or surgery and any previous children; lifestyle details doctors usually ask about (smoking, alcohol, weight, work hours); family history; and previous tests or treatments. Use their words and mark gaps [not noted].
3. Tests to ask about: list the kinds of tests commonly discussed at a first consultation (blood tests for ovarian reserve and hormones, checks of ovulation, an ultrasound, a test of whether the tubes are open, a semen analysis, infection screening), each with one plain sentence on what it looks at, as questions, not as what they need.
4. Questions for the consultation: a top five, then more: what could be affecting our chances; which tests do you recommend and why; what are our options and their success rates for people like us, in live births per cycle; how long would each take; what are the risks and side effects; what can we do ourselves meanwhile; what happens if the tests are normal; and, for donor treatment, the rules on donors, counselling and legal parenthood.
5. Costs and funding: questions on eligibility for public or insurance funding, waiting lists, what is included in a cycle price and what is extra (medicines, freezing, storage, add-ons), and how to compare clinics using published, like-for-like success rates. Say to ask for the evidence before paying for optional add-on treatments.
6. Looking after yourselves: the emotional side (strain on relationships, grief, waiting), fertility counselling often offered by clinics, support groups and charities, and how to talk to family or work about appointments. If low mood or anxiety is constant, mention talking to their doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not estimate their chances of conceiving, suggest a diagnosis, or recommend a treatment, medicine, supplement or clinic.
- Present the timing rules as common guidance and say to check with their own doctor, since it varies.
- Use inclusive language and do not assume a heterosexual couple; follow the words they use.
- Laws on donor conception, egg freezing and funding differ by country; mark these to check locally.
- If they mention distress such as hopelessness or thoughts of self-harm, respond with care and point to urgent support before the preparation.
</constraints>

<output_format>
## Before you go
## Your one-page history
Headed sections with their details and [not noted] blanks.
## Tests to ask about
Table: Test | What it looks at.
## Questions for the consultation
Top five in bold, then the rest.
## Costs and funding
## Looking after yourselves
</output_format>
