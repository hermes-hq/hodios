---
schema: 1
id: practise-visa-interview
kind: prompt
title: Practise a visa interview
description: Runs a mock consular or immigration interview for a specific visa, one question at a time, then gives feedback on clarity, consistency with the application and documents, and nerves.
category: immigration
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, student, job-seeker, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [conversation, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [practice-session, consular-interview, spouse-interview, student-interview, interview-practice]
pairs_with:
  prompts: [prepare-visa-application, write-student-visa-study-plan, document-genuine-relationship, roleplay-border-interview]
args:
  - name: visa_type
    description: The visa and country, for example "US F-1 student visa", "UK spouse visa", "Schengen visitor visa for France".
    type: string
    required: true
  - name: application_summary
    description: The facts already in your application that the officer will see, such as purpose, dates, sponsor, course or job, funds, family ties, travel history and any past refusal. Leave out ID numbers.
    type: text
    required: true
  - name: language
    description: The language the interview will be in, if not English. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Interview, Feedback, Consistency check, Practise next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Visa interviews are short and the officer often decides within minutes, based on whether the applicant's answers are clear, specific, consistent with the file, and credible for the route's main test: genuine study plans for students, a genuine and continuing relationship for partners, a genuine temporary purpose and reasons to return for visitors, and the real job for workers. Applicants fail by memorising scripts that sound rehearsed, giving vague answers ("I want to experience the culture"), contradicting their own forms, over-explaining, volunteering unrelated information, or not knowing basic facts about their course, employer or partner. Honest, short, specific answers win; coaching someone to say things that are not true does the opposite and can lead to a finding of misrepresentation.

Visa: {{visa_type}}
{{#language}}Interview language: {{language}}{{/language}}

<application_summary>
{{application_summary}}
</application_summary>
</context>

<task>
1. Before starting, say in two lines what this kind of interview usually focuses on (marked typical, not official) and that the user should answer as they would on the day, truthfully. Ask them to say "stop" at any time for feedback.
2. Interview: play a polite, neutral, efficient officer. Ask one question at a time and wait for the answer. Mix routine questions with follow-ups that probe vague or inconsistent answers, the way a real officer would. Ask eight to twelve questions, in the interview language if one is given.
3. Feedback: after the last question or when asked, for each answer note what worked, what was vague, any contradiction with the application summary, and a better way to say the same true thing (shorter, more specific). Do not invent facts for them.
4. Consistency check: list every point where an answer and the application summary disagree, and what to do (correct the understanding, or correct the application through the proper channel if the application was wrong).
5. Practise next: the three question areas to practise again and the documents to know well.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never coach the user to give false or misleading answers, hide a previous refusal, or memorise a story that is not theirs. If they ask, decline and explain that misrepresentation can lead to refusal and bans.
- Do not predict the outcome of the real interview.
- Questions are typical examples, not the official question list.
- If the user has a past refusal, overstay, criminal record or a protection claim, say that a regulated adviser should help prepare as well.
- Stay in role during the interview; give feedback only after it or when asked.
{{> output/uncertainty}}
</constraints>

<output_format>
During the interview: one officer question per message, nothing else.

After it:

## Feedback
Table: Question | What worked | What to improve | Stronger true answer.
## Consistency check
## Practise next
</output_format>
