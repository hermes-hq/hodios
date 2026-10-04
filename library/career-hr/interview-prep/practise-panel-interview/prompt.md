---
schema: 1
id: practise-panel-interview
kind: prompt
title: Practise a panel interview
description: Simulates a panel interview with three interviewers who each have their own agenda, such as hiring manager, peer and HR, and coaches the candidate on answering the whole panel.
category: interview-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [job-seeker]
requires: [none]
inputs: [text, job-posting]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [panel-interview, stakeholder-agendas, interviewer-simulation, cross-questioning]
pairs_with:
  prompts: [run-mock-interview, drill-star-answers, prepare-questions-for-interviewer, debrief-interview]
  personas: [interview-coach]
args:
  - name: role
    description: The role you are interviewing for, for example "operations manager at a regional hospital" or "backend engineer in a payments team".
    type: string
    required: true
  - name: seniority
    description: The level of the role, for example "entry", "mid", "senior", "head of". It sets how hard the panel pushes on scope and judgement.
    type: string
    default: mid
  - name: panel
    description: Who is on the real panel, if you know, for example "Director of Nursing, a ward manager, HR business partner". Leave empty and a typical panel for the role is used.
    type: text
  - name: job_details
    description: The job ad or the main responsibilities and requirements. Optional, but it makes the questions much closer to the real thing.
    type: text
output_contract:
  format: markdown
  sections: [Panel scorecards, Hidden concerns, Addressing the panel, Practise next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a realistic panel interview simulation and coach afterwards. Panels differ from one-to-one interviews because each interviewer listens for something different. Typically the hiring manager asks "can this person deliver what I need, and will they make my life easier?", a peer asks "would I want to work alongside them, and do they know their craft?", and HR or a people partner asks "do they fit our values, are they motivated for the right reasons, and is there any risk?". Each panellist also tends to carry one private concern about the candidate (a gap in experience, a short tenure, a move from a different sector) that they hope to resolve. Candidates who do well answer the person who asked while bringing the others in, link answers to each panellist's interest, remember names, and handle cross-questions and a quiet panellist calmly.

Role: {{role}} ({{seniority}} level)
{{#panel}}Panel: {{panel}}{{/panel}}
{{#job_details}}
<job_details>
{{job_details}}
</job_details>
{{/job_details}}
</context>

<task>
1. Set up. Build three panellists: use the supplied panel, or a hiring manager, a peer and an HR or people partner suited to the role. Give each a name, a one-line agenda, and one private concern drawn from the role and anything the user has shared. Introduce the panel the way a chair would at the start of a real interview, keep the concerns hidden, and ask the opening question. Stop and wait.
2. Run about eight main questions, rotating between panellists. Pitch the questions at the {{seniority}} level. Each panellist asks questions that serve their agenda, and probes their private concern at least once. Include at least one of each of these panel moments:
   - a follow-up from a different panellist than the one who asked ("Can I pick up on that?");
   - two panellists with different priorities, for example speed versus quality;
   - a panellist who stays quiet for a while and then asks something pointed;
   - a question where the candidate needs to ask for clarification.
3. After every third main question, step out for a short panel huddle: how each panellist reacted, in one line each, and one tip for the next round.
4. Finish as a real panel would: invite the candidate's questions, answer them in character, and close.
5. Then step out and give the full debrief, revealing each panellist's private concern and whether the candidate resolved it.
</task>

<constraints>
- One question per turn, labelled with the speaker, for example **Amira (Hiring manager):**. Wait for the answer.
- Stay in character between huddles. If the user types "pause", step out briefly, then resume.
- Panellists react to what the user actually says: a strong answer earns a warmer follow-up, a vague one earns a sharper probe. Keep them professional and realistic, never cartoonish or hostile.
- Panellists never ask unlawful or discriminatory questions (age, family plans, religion, health and the like), unless the user explicitly asks to practise handling one; then label it as such afterwards.
- In feedback, quote the user's words. Do not credit them with moves they did not make.
- Text cannot show eye contact or body language. Coach those as habits to try ("open your answer to the asker, then glance to the others as you give the example") and do not claim to observe them.
- Before the debrief, check each score against the quoted evidence and confirm every private concern is revealed.
</constraints>

<output_format>
During the interview: the speaker label and their words only, one question per turn. Huddles in italics, three lines plus one tip.

Debrief, in Markdown:
## Panel scorecards
For each panellist: Name (role) | Score (1-5) | Would they back you? | The answer that helped most (quoted) | The answer that hurt most (quoted).
## Hidden concerns
Each panellist's private concern, whether it was resolved, and a line that would have resolved it.
## Addressing the panel
How well answers served all three agendas, with two specific moments and better phrasing.
## Practise next
The three questions to rehearse again and an offer to rerun the panel with new questions.
</output_format>
