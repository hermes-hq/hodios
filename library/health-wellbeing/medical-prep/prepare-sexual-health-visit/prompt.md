---
schema: 1
id: prepare-sexual-health-visit
kind: prompt
title: Prepare for a sexual health visit
description: Prepares for a sexual health or STI testing visit with what usually happens, the questions you will likely be asked, testing windows to ask about, and words for raising awkward topics.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, questions, explanation]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [sexual-health, sti-testing, hiv-testing, prep, sexual-health-clinic]
pairs_with:
  prompts: [prepare-contraception-consultation, prepare-doctor-questions, practise-describing-symptoms]
  personas: [health-navigator]
args:
  - name: reason
    description: Why you are going, for example "routine check, new partner", "a partner told me they have chlamydia", "discharge and pain when peeing", "want to ask about PrEP", "condom split last weekend".
    type: text
    required: true
  - name: details
    description: Anything else you want to prepare, such as when the possible exposure was, symptoms and when they started, contraception, previous tests, or what you find hard to say. Optional; share only what you are comfortable with.
    type: text
  - name: country
    description: Country, because services, cost and how to book (walk-in, online kits, family doctor) differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Act now if, What usually happens, Questions you will likely be asked, Saying it out loud, Questions to ask, After the visit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for a sexual health appointment or STI test. These visits are routine for clinicians and confidential in most places, yet embarrassment makes people delay, leave out details, or not ask what they came to ask. The questions staff ask (when they last had sex, the gender of partners, types of sex such as oral, vaginal or anal, condom use, symptoms, contraception, previous tests) are not judgement: they decide which tests and which body sites to test, because a urine test alone can miss throat or rectal infections. Timing matters: testing too soon after an exposure can miss an infection, so clinics may test now and again later (bacterial infections such as chlamydia and gonorrhoea are commonly tested about two weeks after exposure, while HIV and syphilis tests may need repeating several weeks later, depending on the test). Two things are time-critical: HIV post-exposure prophylaxis (PEP) works best as early as possible and must be started within 72 hours, and emergency contraception works better the sooner it is taken. Many services offer pre-exposure prophylaxis (PrEP), vaccines (such as hepatitis B and HPV), self-taken swabs, and anonymous partner notification.

Reason: {{reason}}
{{#details}}Details: {{details}}{{/details}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Act now if: if the exposure was in the last 72 hours and may carry HIV risk, tell them to go today to a sexual health clinic or emergency department and ask about PEP; if there was a risk of pregnancy, mention emergency contraception from a pharmacy or clinic today; if there was sexual assault, say specialist sexual assault services can help with medical care, evidence collection if they want it, and support, with no obligation to report to police; severe pelvic or testicular pain, or pain with a possible pregnancy, needs urgent care today. If none apply, say so in one line.
2. What usually happens: booking options (walk-in, appointment, online or postal test kits where available), registration and confidentiality, the conversation, which samples are typical (urine, self-taken or clinician swabs, blood), whether an examination may be offered if they have symptoms, and how results are given.
3. Questions you will likely be asked: a list with a one-line "why they ask" for each, so nothing feels like judgement.
4. Saying it out loud: short phrases for the things people find hard, built from their reason and any details they gave (for example "I'd like a full check including throat and rectal swabs", "A partner told me they tested positive for…", "I'd like to ask about PrEP", "I have a symptom I'm embarrassed about"), plus the reminder that they can write it down and hand it over.
5. Questions to ask: whether testing now is too early for any infection and when to retest, which sites are being tested, when and how results come, what happens if a result is positive, whether partners need testing or treatment and how anonymous notification works, and about PrEP, vaccines or contraception if relevant.
6. After the visit: avoiding sex until results or treatment are complete if advised, finishing any treatment as instructed, retesting if told to, and that a positive result for common infections is usually straightforward to treat (without diagnosing them).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not say whether symptoms are a particular infection, and do not recommend medicines or doses.
- Testing windows are general; say the clinic will advise on timing for their tests.
- Neutral, non-judgemental language; do not assume gender of partners, relationship type or number of partners.
- Do not ask for more sexual detail than needed to prepare; remind them they share only what they want.
- If there is any sign of assault, coercion or a minor at risk, prioritise safety and specialist services.
</constraints>

<output_format>
## Act now if
## What usually happens
## Questions you will likely be asked
Question | Why they ask.
## Saying it out loud
## Questions to ask
## After the visit
</output_format>
