---
schema: 1
id: learn-school-vocabulary-for-parents
kind: prompt
title: Learn the language of your child's school
description: Teaches parents new to a country the language of school letters, parents' evenings, school apps and absence notes, with sample messages and phrases for talking to teachers.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, parent]
subject: [education-sector]
requires: [none]
inputs: [preferences]
output: [explanation, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [newcomers, school-communication, parents-evening, absence-notes, survival-language]
pairs_with:
  prompts: [handle-foreign-language-letter, learn-survival-phrases, build-personal-phrasebook]
  personas: [esol-volunteer-tutor]
args:
  - name: language
    description: The language of the school, with the country (for example "Dutch, Netherlands", "English, Ireland", "Spanish, Spain").
    type: string
    required: true
  - name: level
    description: The parent's CEFR level in that language.
    type: enum
    enum: [a1, a2, b1]
    default: a2
  - name: native_language
    description: The parent's first language, used for explanations, meanings and the translations of the sample messages. Many newcomer parents read their own language far better than English.
    type: string
    default: English
  - name: child_stage
    description: The child's stage of education; school words differ for nursery, primary and secondary.
    type: enum
    enum: [nursery, primary, secondary]
    default: primary
  - name: country
    description: The country, if it is not clear from the language (school systems and terms differ). Optional.
    type: string
output_contract:
  format: markdown
  sections: [How school is organised, People, Letters and apps, Parents' evening, Absence and lateness, Sample messages, Asking for help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach the local language to parents who have recently moved to a country and have a child in school. School generates a stream of language a course rarely covers: letters about trips and consent, term dates and training days, homework platforms, reports, parents' evenings, and absence rules with consequences. Parents who cannot follow it miss deadlines, feel shut out, and sometimes rely on their child to translate. You give them the words and phrases to read school communication, reply to it, and talk to staff with confidence.

School language: {{language}}
{{#country}}Country: {{country}}{{/country}}
Parent's level (CEFR): {{level}}
Explanations and meanings in: {{native_language}}
Child's stage: {{child_stage}}
</context>

<task>
1. How school is organised: in {{native_language}}, four or five lines on how {{child_stage}} education is usually organised in this country, with the local terms in {{language}} (year groups or grades, terms or trimesters, typical day, report times). Label it as general; schools and regions differ.
2. Teach vocabulary and phrases in {{language}} at {{level}}, each with its meaning in {{native_language}}, grouped as:
   - people: the staff roles the parent will deal with at this stage (class teacher, head, office, special needs coordinator, school nurse or counsellor where relevant);
   - letters and apps: 15 to 20 words that appear in school letters and parent apps (consent, deadline, trip, uniform, packed lunch, training day, report, homework, fee or contribution, reply slip), with what action each usually needs;
   - parents' evening: 8 to 10 questions to ask the teacher (how is my child doing, friends, behaviour, what to practise at home, support with the language) and phrases to understand the answers;
   - absence and lateness: how to report an absence, phrases for illness, appointments and family reasons, and the words for authorised and unauthorised absence if they are used here.
3. Sample messages: three short, ready-to-adapt messages in {{language}} with a {{native_language}} translation under each: an absence note, a request for a meeting, and a reply to a trip consent letter. Use the register the school expects.
4. Asking for help: phrases to ask the school for translated letters, an interpreter for meetings, or a staff member who speaks their language; and to ask a teacher to speak slowly or write things down.
5. Before answering, check that every term matches how schools in this country actually say it at this stage, and that the messages are polite and natural.
</task>

<constraints>
- School systems, terms and rules differ by country and region. Present them as typical and tell the parent to check with their school.
- Keep the amount right for {{level}}: at A1, the most essential words and very short messages first.
- Do not advise on admissions, legal duties, fines or special needs assessments; teach the language to ask the school or the right service.
- Do not invent school names, app names or policies.
</constraints>

<output_format>
One section per heading in the output contract, explanations in {{native_language}}. Vocabulary as tables: {{language}} | {{native_language}} | What to do (for letters and apps). Sample messages as quoted blocks with the translation underneath.
</output_format>
