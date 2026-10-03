---
schema: 1
id: prepare-driving-theory-test
kind: prompt
title: Prepare for a driving theory test
description: Runs driving theory test practice in the official style for the learner's country, with explanations, weak-topic tracking and hazard-perception tips where the test has that part.
category: exam-prep
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [individual, student]
requires: [none]
inputs: [preferences]
output: [quiz, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [driving-test, theory-test, hazard-perception, road-rules, learner-driver]
pairs_with:
  prompts: [quiz-me-interactively, create-memory-aids]
args:
  - name: country
    description: The country, and the state, province or territory where rules differ by region (for example United States, Canada, Australia). Add the licence category if not a car.
    type: string
    required: true
  - name: weak_topics
    description: Optional topics to focus on, for example "road signs", "stopping distances", "rules at roundabouts", "motorway rules".
    type: text
  - name: questions
    description: Number of practice questions in the session.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Results, Weak topics, Hazard perception]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Driving theory tests check whether a learner knows the rules of the road, signs, safe driving practice and, in some countries, can spot developing hazards in video clips. Formats, pass marks, question banks and the rules themselves differ by country and sometimes by state or province: which side of the road, speed limits and their units, alcohol limits, right of way at junctions. Learners pass by practising many questions in the official style and understanding the reason behind each rule, not by memorising answers. The official handbook for the country is the authority.
</context>

<task>
Run a theory test practice session of {{questions}} questions for a learner in {{country}}{{#weak_topics}}, weighted towards: {{weak_topics}}{{/weak_topics}}.

1. If the country sets its rules and tests by region (for example the United States, Canada or Australia) and no state, province or territory is given, ask for it and stop. Do not start with generic national questions.
2. Start with a short overview of the test as you understand it for this place: its parts (multiple-choice theory, hazard perception, or others), roughly how many questions and the pass requirement if you are confident, and the name of the official handbook or authority to check with. Say clearly that the learner should confirm the current format with the official source, because formats change. Then ask the first question in the same message.
3. Ask the questions one at a time, in the official style for that country: usually multiple choice with one correct answer, sometimes "choose two", and road signs described in words (shape, colour, symbol) since images are not available. Cover the official topic areas, weighted towards weak topics.
4. After each answer: say whether it is correct, explain why the right answer is right and why the tempting wrong option is wrong, and give the underlying rule or reason (for example, why stopping distance grows faster than speed). Point to the handbook section by topic.
5. Keep a running tally by topic and mention it every five questions.
6. After the last question, give the results, the weak topics with what to review, and hazard-perception tips if the test has that part.
</task>

<constraints>
- Do not state specific legal figures (speed limits, alcohol limits, fines, penalty points, minimum ages) unless you are confident they are current for that country and region; when you state one, add "check the current official handbook". Never guess a figure.
- Never claim your questions are the real test questions or from the official bank.
- Use the country's own conventions: side of the road, units, terminology (motorway or freeway, give way or yield).
- Run the session in the language the learner writes in. If they will sit the test in a different language, add the official term in that language next to key words (road signs, right of way, overtaking), so they recognise them on the day.
- One question per message, with no answer until the learner replies.
- If you do not know the country's test format or rules well, say so, offer general road-safety and sign practice, and ask the learner to paste sections from the official handbook to quiz from.
</constraints>

<output_format>
During the session: "Question k of {{questions}} (topic)", the question and the options labelled A to D. After each answer, feedback in two to four lines.
At the end:
## Results
Score and score by topic.
## Weak topics
Each with the rule to review and the handbook section to read.
## Hazard perception
If the test includes it: how hazards develop, the clues to look for (pedestrians near parked cars, brake lights, junctions, cyclists, changing traffic lights), when to respond, and the risk of clicking in patterns. Omit if the test has no such part.
</output_format>
