---
schema: 1
id: write-dental-treatment-plan-letter
kind: prompt
title: Write a dental treatment plan letter
description: Writes a patient letter that explains a dentist's proposed treatment plan from their notes, with each option, stages, costs, risks the dentist named and how to ask questions.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [dentistry, treatment-plan, informed-consent, patient-letters, plain-language, dental-practice]
pairs_with:
  prompts: [rewrite-clinic-letter-for-patient, write-patient-education-handout, write-teach-back-script]
args:
  - name: dentist_notes
    description: The dentist's notes on findings and the proposed plan - what was found, each treatment option discussed (including no treatment if discussed), what each involves, number of visits, benefits and risks the dentist mentioned, and anything the patient said they prefer. Patient initial only.
    type: text
    required: true
  - name: costs
    description: The fee for each item or option, as the practice quotes it, plus payment terms, how long the estimate is valid, and whether it is publicly funded, private or insured if relevant.
    type: text
    required: true
  - name: reading_level
    description: plain is short sentences and everyday words for any reader; standard is ordinary adult prose that still explains every dental term.
    type: enum
    enum: [plain, standard]
    default: plain
output_contract:
  format: markdown
  sections: [Letter, For the dentist before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write treatment plan letters for dental practices. Patients often leave the chair having nodded through a plan they did not follow, then see a total cost and either decline everything or agree without understanding the choices. A good letter lets the patient compare the options at home, including what happens if they do nothing, see the stages and what each costs, and know how to ask questions before they consent. Consent itself happens in conversation with the dentist; the letter supports it. Everything clinical in the letter comes from the dentist's notes.

<dentist_notes>
{{dentist_notes}}
</dentist_notes>
<costs>
{{costs}}
</costs>
Reading level: {{reading_level}}
</context>

<task>
1. Read the notes and costs and list for yourself: the findings, each option, the stages and visits for each, the benefits and risks named, and the cost lines. Match every cost to an option. If a cost has no matching option, or an option has no cost, mark it in the dentist section and use "[fee to confirm]" in the letter.
2. Write the letter to the patient:
   - Opening: thank them for their visit and say what the letter is for.
   - What we found: the findings in everyday words, with a short explanation of any dental term (for example "a crown is a cap that covers the whole tooth").
   - Your options: one short section per option, in the order the dentist listed them, each covering what it involves, how many visits and roughly how long, the benefits the dentist described, the risks or downsides the dentist named, and the cost. If no treatment or a delay was discussed, include it as an option with what the dentist said could happen.
   - Comparing the options: a small table of option, visits, cost and the main points to weigh.
   - Costs and payment: totals only where they are simple sums of the given lines (show the lines), payment terms and how long the estimate is valid, as given.
   - Next steps: how to ask questions, that they can take time to decide, that the dentist will go through the plan and confirm consent before treatment starts, and how to book or decline.
   - A closing with placeholders for the dentist's name and practice details.
3. Write the dentist section: anything in the letter marked as a gap, inconsistencies between notes and costs, and points commonly covered when this type of treatment is consented that do not appear in the notes (for example alternatives, including no treatment, or how long the restoration may last), phrased as "Consider adding: …" for the dentist to decide. These never go into the letter.
4. Before answering, check every option, risk and fee in the letter against the notes and costs, and confirm no option is presented as better than another unless the dentist's notes say so.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never add findings, options, risks, success rates, lifespans or recommendations that the dentist did not write. If the notes state a recommendation, present it as the dentist's recommendation and still describe the other options fairly.
- Copy fees exactly with the currency given. Do not apply discounts, insurance or public funding rules that are not in the costs.
- For plain, use short sentences, everyday words and a reading age around 11 to 12; for standard, ordinary adult prose. In both, explain every dental term on first use and avoid acronyms.
- Use the patient's initial or a placeholder such as "[Patient name]"; leave out dates of birth and record numbers.
- Keep the tone warm and neutral. No pressure to decide, no urgency the notes do not state, no marketing language.
- If the notes do not contain at least one option with what it involves, say what is missing and stop.
</constraints>

<output_format>
## Letter
The letter, with short headings: What we found, Your options, Comparing the options, Costs and payment, Next steps.
## For the dentist before sending
Bullets: gaps, inconsistencies, and "Consider adding" points.
</output_format>

<examples>
Note "LR6 large failing filling, options: crown (2 visits) or onlay; risk of needing root canal later" becomes, at plain level:
"One of your lower back teeth on the right has a large filling that is breaking down. Dr [Name] talked with you about two ways to fix it. A crown is a cap that covers the whole tooth. It takes two visits. … Dr [Name] explained that with either option, the nerve inside the tooth might need treatment in future (a root canal)."
</examples>
