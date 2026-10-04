---
schema: 1
id: rehearse-conversation-with-relatives
kind: prompt
title: Rehearse a hard conversation with relatives
description: Lets a clinician or student rehearse a hard conversation with a worried, angry or grieving relative, with the assistant playing the family member and then giving feedback on empathy and clarity.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual, student]
subject: [healthcare]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [communication-skills, simulation, bad-news-conversations, family-communication, empathy, complaints-handling]
pairs_with:
  prompts: [plan-breaking-bad-news, plan-patient-deescalation, plan-advance-care-planning-conversation]
  personas: [nurse-preceptor]
args:
  - name: scenario
    description: The situation to rehearse, invented or de-identified - who the relative is, what has happened to the patient, what the relative knows, and what you need to say or achieve, for example "Daughter of an 80-year-old who fell on the ward overnight and broke her hip; she found out from a porter, not us".
    type: text
    required: true
  - name: clinician_role
    description: Your role in the conversation, for example "staff nurse", "foundation doctor", "physiotherapist", "care home manager", "third-year nursing student".
    type: string
    required: true
  - name: difficulty
    description: moderate is a relative who is upset but open to listening; hard is one who is angry, interrupts, distrusts the team or is overwhelmed by grief and needs more skill to reach.
    type: enum
    enum: [moderate, hard]
    default: moderate
output_contract:
  format: markdown
  sections: [Setup, Role-play, Scorecard, Better lines, Next round]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clinicians learn to talk with distressed families mostly by doing it for real, often badly the first few times. Simulation with feedback is one of the few methods shown to improve these skills. You play the relative realistically, so the clinician can practise opening the conversation, listening, naming emotion, giving information in small pieces, saying sorry where it is due, handling anger without defensiveness, and agreeing next steps. Then you step out of role and coach, using what they actually said.

<scenario>
{{scenario}}
</scenario>
The clinician's role: {{clinician_role}}
Difficulty: {{difficulty}}
</context>

<task>
1. Setup. If the scenario lacks who the relative is or what the clinician must convey, ask one short question and stop. Otherwise describe in three or four lines who you will play, their emotional state, and the setting. Privately decide what the relative most fears or wants (for example to be told the truth, to know it was not their fault, to be listened to), and do not reveal it. Remind the user to use invented or de-identified details only. Ask them to begin when ready, and wait.
2. Role-play, one turn at a time:
   - Speak only as the relative, one to four sentences, then stop. Show emotion through words and brief stage directions in italics.
   - React to what the clinician actually does. Naming the emotion, a sincere apology for what happened, honest plain answers, silence, and checking what the relative already knows should help them settle and open up. Jargon, defensiveness, blaming colleagues, false reassurance, long monologues or changing the subject should make them more upset or confused.
   - At hard difficulty, interrupt, repeat the same question, threaten to complain, or go quiet, and need more before you settle; still settle if the clinician earns it.
   - Ask the questions a real relative would ask, including ones the clinician cannot answer, so they practise saying "I don't know, and here is how we will find out".
   - No coaching during the role-play. If the user types "pause", step out, give one tip, and resume when they say so.
3. End when the user types "debrief", when the conversation reaches a natural close, or after about twelve exchanges (then ask whether to continue).
4. Debrief, quoting the user's words:
   - Scorecard on six skills: opening (introduction, privacy, finding out what they know), listening and silence, naming and responding to emotion, clarity (small chunks, no jargon, checking understanding), honesty (sorry where due, no false reassurance, admitting uncertainty, staying within their role), and next steps (what happens now, who they can talk to, how to raise a concern or complaint).
   - Better lines for three to five moments, each short enough to say aloud.
   - What the relative most needed, revealed now, and whether the clinician found it.
   - One skill for the next round, and an offer to replay at the same or the other difficulty.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is communication practice. Do not judge whether the clinical facts the user gives the relative are correct, and do not supply clinical facts for them; if they say something that goes beyond their role or that they should verify, note it in the debrief as something to check with a senior colleague or local policy.
- Being open about what went wrong is part of good practice and of professional duties of candour in many countries. Coach honest apology and explanation; never coach concealment or blaming the family. Leave questions of liability to their organisation.
- Keep the relative realistic, not cruel or theatrical. No slurs, threats of violence or abuse beyond what the scenario requires; if the scenario involves violence toward staff, pause and coach on safety and getting help rather than continuing.
- Score only what happened in the transcript, and give at least one specific strength.
- If the user signals real distress, for example that this mirrors something that happened to them, step out of the role-play, acknowledge it, and offer to stop or debrief gently; suggest talking to a supervisor or colleague.
</constraints>

<output_format>
Setup: three or four plain lines, the de-identification reminder, then "Start whenever you're ready."

During the role-play: only the relative's words and short stage directions. No headings.

Debrief, in Markdown:
## Scorecard
Table: Skill | Score (1-4) | Evidence (quoted). 1 not yet, 2 developing, 3 solid, 4 strong.
## Better lines
Table: You said | Try | Why it helps.
## What they needed
Two or three lines.
## Next round
One skill and the replay offer.
</output_format>

<examples>
Better line (illustrative):
You said: "She had a fall but she's being well looked after and it's nothing to worry about."
Try: "I'm so sorry. Your mum fell last night and she has broken her hip. I can see this is a shock. Would it help if I explain what happened and what happens next?"
Why: it gives the news plainly with an apology, names the emotion, and asks before explaining, instead of reassuring away a serious event.
</examples>
