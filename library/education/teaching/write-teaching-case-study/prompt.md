---
schema: 1
id: write-teaching-case-study
kind: prompt
title: Write a teaching case study
description: Writes a teaching case study for business, health, law or policy courses with a narrative, data exhibits, discussion questions and an instructor's teaching note. Use for case-method classes.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [article, questions, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [case-method, teaching-note, discussion-questions, data-exhibits, professional-education]
pairs_with:
  prompts: [generate-discussion-questions, create-rubric, design-classroom-activity]
  personas: [instructional-coach]
args:
  - name: topic
    description: The decision or problem at the centre of the case and its setting, e.g. "a regional hospital deciding whether to close its maternity unit".
    type: text
    required: true
  - name: course_level
    description: Course and level, e.g. "MBA operations management", "second-year nursing", "undergraduate public policy".
    type: string
    required: true
  - name: learning_objectives
    description: What students should be able to do after discussing the case.
    type: text
    required: true
  - name: length_words
    description: Approximate length of the case narrative in words, excluding exhibits and the teaching note.
    type: number
    default: 1500
output_contract:
  format: markdown
  sections: [Case, Exhibits, Discussion questions, Teaching note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teaching case is not a story with a moral; it is a decision a protagonist must make under uncertainty, with enough information to argue more than one side and not so much that the answer is obvious. Good cases open with the protagonist facing the decision and a deadline, give background in a logical order, put the numbers in exhibits that students must analyse themselves, and end before the decision is made. The teaching note is what makes a case usable by another instructor: objectives, a discussion plan with timing and board layout, the analysis students should reach, and what actually happened (or a plausible epilogue for a fictional case).
</context>

<task>
Write a teaching case of about {{length_words}} words for **{{course_level}}**.

<topic>
{{topic}}
</topic>

<learning_objectives>
{{learning_objectives}}
</learning_objectives>

1. Unless the user supplied real, sourced facts about a real organisation, make the case fictional or a clearly labelled composite: invented organisation and people, realistic but invented numbers. State at the top "This case is fictional" or "Based on [supplied sources]". Never present invented figures as facts about a real organisation.
2. **Case narrative:** open with the protagonist, the decision and the deadline in the first paragraph. Then the context (industry or system, organisation, history), the problem's development, the stakeholders and their positions (at least two credible, conflicting views), the options on the table, and the constraints. End with the protagonist still facing the decision. Use section headings, realistic quotes from characters and neutral narration that does not signal the "right" answer.
3. **Exhibits:** 2 to 4 exhibits (tables of financial, operational, clinical, survey or policy data; an organisation chart; a timeline) that students must use to evaluate the options. Numbers must be internally consistent and allow calculations relevant to the objectives.
4. **Discussion questions:** 4 to 6 questions for preparation and class discussion that move from diagnosis to analysis to decision and generalisation.
5. **Teaching note:**
   - synopsis and learning objectives;
   - suggested assignment questions and pre-reading (described by type; do not invent citations);
   - a discussion plan for a 75 to 90-minute class with timing, the opening question, transitions, and a board plan showing what goes on each board;
   - the analysis: worked calculations from the exhibits, the arguments for each option, and the trade-offs a strong discussion surfaces;
   - common student responses and how to push them further;
   - an epilogue (what happened, or a plausible outcome for a fictional case, labelled as such) and the key takeaways.
</task>

<constraints>
- In health and law cases, clinical or legal details must be accurate for the stated setting at a general level; mark anything jurisdiction-specific or clinically specific as "check against current guidance" rather than stating it as settled fact. The case is a teaching tool, not professional advice.
- No real patient, client or employee information. Characters are diverse and not stereotyped; avoid making the protagonist's identity the problem.
- Do not invent citations, statistics attributed to real sources or quotes from real people.
- Keep the narrative within about 15% of {{length_words}} words; exhibits and the teaching note are extra.
- Check that every number used in the teaching note's analysis appears in the exhibits and that the arithmetic is correct.
</constraints>

<output_format>
# Case title
A statement on whether the case is fictional, composite or sourced.
## Case
The narrative with subheadings.
## Exhibits
Numbered exhibits with titles and tables.
## Discussion questions
Numbered.
## Teaching note
Subheadings: Synopsis and objectives; Assignment questions; Discussion plan (with a timing table and board plan); Analysis; Common responses; Epilogue and takeaways.
</output_format>
