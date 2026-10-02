---
schema: 1
id: write-student-recommendation-letter
kind: prompt
title: Write a student recommendation letter
description: Writes a recommendation letter for a student from the teacher's own observations, tied to what the programme values, with honest comparative statements. For teachers and professors.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [recommendation-letter, reference-letter, college-admissions, graduate-admissions]
pairs_with:
  prompts: [write-report-card-comments]
args:
  - name: student_notes
    description: Your notes on the student, covering courses, grades or rank if relevant, specific moments you observed, work you saw, growth over time, and any weakness you will need to address. Facts and anecdotes, not adjectives.
    type: text
    required: true
  - name: program
    description: What the letter is for, e.g. "undergraduate admission, mechanical engineering", "PhD in neuroscience", "Rhodes Scholarship", "summer research internship", and what it values if known.
    type: string
    required: true
  - name: relationship
    description: Optional, how and for how long you know the student, e.g. "taught her AP Chemistry and supervised her science fair project, 2 years".
    type: text
output_contract:
  format: markdown
  sections: [Letter, Placeholders to fill, Claims to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Admissions readers see thousands of letters calling students "hardworking" and "a pleasure to have in class". What moves them is evidence only the recommender has: a specific moment, a comparison with other students the writer has taught, and qualities that match what the programme is looking for. Research on recommendation letters also shows a consistent bias: letters for women and for some minority students lean on effort words ("diligent", "dependable") and doubt raisers, while letters for others get standout words ("brilliant", "exceptional"). A good letter checks for that.
</context>

<task>
Draft a recommendation letter for this student for {{program}}.

<notes>
{{student_notes}}
</notes>
{{#relationship}}Relationship: {{relationship}}{{/relationship}}

1. Work out what {{program}} values (for example, research potential and independence for a PhD; intellectual curiosity, character and contribution for undergraduate admissions; leadership and service for some scholarships). Choose the 2 or 3 qualities from the notes that best match, each backed by a specific observation.
2. Structure the letter:
   - **Opening:** who you are, how long and in what capacity you have known the student, and a clear statement of your level of recommendation.
   - **Body:** one paragraph per quality, each built on a specific anecdote or piece of work from the notes: what the student did, what it shows and why it matters for {{program}}.
   - **Comparison:** an honest comparative statement where the notes support it ("one of the two strongest students in the 150 I have taught in this course over six years"). If the notes do not support a comparison, leave a placeholder and ask the teacher to supply one rather than inventing it.
   - **Addressing a weakness or context** only if the notes raise it, framed honestly and with evidence of growth.
   - **Close:** a summary recommendation and an offer to be contacted.
3. Run a bias and specificity check on your draft: replace generic praise with evidence, balance effort words with ability and achievement words where the evidence supports them, remove doubt raisers ("although", "may", faint praise), and make sure nothing about appearance, personality stereotypes or personal life appears unless relevant and agreed.
</task>

<constraints>
- Use only facts in the notes. Never invent anecdotes, grades, ranks, awards or comparisons; put [placeholders] where the letter needs something the notes do not have.
- About one page (350 to 600 words) unless the programme asks otherwise.
- If the notes are too thin for an honest, specific letter (no observations, only adjectives), say what is needed and give 4 to 6 questions to prompt the teacher's memory, instead of writing a generic letter.
- If the notes suggest the teacher cannot honestly give a positive recommendation, say so plainly and suggest discussing it with the student or declining, rather than writing a lukewarm letter that harms them.
- Do not include protected or sensitive personal information (health, disability, family circumstances) unless the notes say the student asked for it to be included.
</constraints>

<output_format>
## Letter
The full draft, with [placeholders] for the recommender's name, title, institution and any missing facts.
## Placeholders to fill
A list.
## Claims to verify
Each factual claim in the letter, so the teacher can confirm it against their records.
</output_format>
