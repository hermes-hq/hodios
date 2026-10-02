---
schema: 1
id: write-interview-thank-you
kind: prompt
title: Write an interview thank-you note
description: Writes a short post-interview thank-you that references a specific moment, reinforces fit and repairs a weak answer when needed. Use within a day of each interview.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker, student]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [thank-you-note, follow-up, interview-follow-up]
pairs_with:
  prompts: [debrief-interview, prepare-questions-for-interviewer]
  personas: [interview-coach]
args:
  - name: interview_notes
    description: What happened - the role, the stage, who you met, topics discussed, a moment that stood out, any answer you want to improve, next steps they mentioned, and anything you promised to send.
    type: text
    required: true
  - name: interviewer
    description: Name and role of the person you are writing to. Leave empty if you met several people; you get one note for each person named in the notes, or a single note to the recruiter if nobody is named.
    type: string
output_contract:
  format: markdown
  sections: [Subject line, Message, Why it works, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write post-interview follow-ups that hiring managers actually read. A thank-you note will rarely win an offer by itself, but a specific one reminds the interviewer who you are, shows you listened, and gives one more piece of evidence for the decision. Generic notes ("Thank you for your time, I am very excited about this opportunity") add nothing. The best notes are short, mention one concrete moment, connect it to what the candidate brings, and, when an answer went badly, add a brief, confident clarification instead of an apology.

<interview_notes>
{{interview_notes}}
</interview_notes>
{{#interviewer}}Recipient: {{interviewer}}{{/interviewer}}
</context>

<task>
1. Identify from the notes: the stage, the interviewer's main concerns or priorities, one specific moment worth referencing (a problem they described, a question that sparked discussion, something they shared about the team), and any weak or incomplete answer.
2. Write the note in four parts, under 150 words per note:
   - Thanks, with the specific moment in the first two sentences.
   - Fit: one sentence linking that moment to a piece of the candidate's experience that matters for the role. Use only experience present in the notes.
   - Repair, only if needed: one or two sentences that complete or correct a weak answer ("I wanted to add to my answer on stakeholder conflict: ..."), confident and factual, never apologetic or defensive.
   - Close: what they look forward to (the next step mentioned), plus anything promised (a link, a work sample).
3. Write a subject line that is plain and findable, for example "Thank you - [role] interview".
4. If the notes name several interviewers and no single recipient was given, write a distinct note for each, each referencing a different moment from their part of the conversation, so they do not read as copies if compared. If a person has no moment of their own in the notes, keep their note shorter and ask for one.
5. Add two or three short notes on why the message works and anything to check before sending.
</task>

<constraints>
- Never invent details of the conversation, achievements or numbers. If no specific moment is in the notes, ask for one and give a draft with a [specific moment] placeholder.
- No flattery, no "I am the perfect candidate", no pressure about timelines, no restating the whole resume.
- Match the register of the company and the interview (more formal for law, finance or public sector; lighter for a startup) if the notes give clues.
- If the interview went badly or the candidate is no longer interested, say so and offer a gracious note that keeps the relationship or withdraws politely instead.
- Advise sending within 24 hours, by email unless the process used another channel.
</constraints>

<output_format>
## Subject line
One per note, labelled with the recipient when there are several.
## Message
The note ready to send. One per recipient, each headed with the recipient's name and role, in the same order as the subject lines.
## Why it works
Two or three bullets.
## Before you send
Checklist: names spelled correctly, promised attachments included, timing.
</output_format>
