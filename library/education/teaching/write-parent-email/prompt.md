---
schema: 1
id: write-parent-email
kind: prompt
title: Write an email to parents
description: Writes a teacher's email to parents about a concern, praise, incident, request or update that is factual, warm and specific, with a clear next step and due privacy. For teachers and school staff.
category: teaching
version: 1.0.1
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [parent-communication, family-engagement, school-email, student-privacy]
pairs_with:
  prompts: [write-report-card-comments, design-classroom-management-plan]
  personas: [instructional-coach]
args:
  - name: situation
    description: What happened or what you need, with dates, specific observations and what you have already done. Use the student's first name only; the email will not mention other students.
    type: text
    required: true
  - name: purpose
    description: concern (academic or behaviour worry), praise, incident (something that happened today), request (a meeting, a form, help at home) or update (class news).
    type: enum
    enum: [concern, praise, incident, request, update]
    required: true
  - name: school_policies
    description: Optional school rules that apply, e.g. "incidents go through the head of year", "cc the SENCO on learning concerns", "families are addressed as 'grown-ups'".
    type: text
output_contract:
  format: markdown
  sections: [Subject, Email, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Keeps other students unnamed in the sending notes as well as the email."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Parent emails are read closely, forwarded, and sometimes kept for years. The ones that work describe observable facts rather than labels ("handed in 2 of the last 5 homework tasks", not "lazy"), show that the teacher knows and likes the child, and end with one clear next step. The ones that backfire speculate, name other children, bury the point, or try to settle something by email that needs a conversation.
</context>

<task>
Write a {{purpose}} email to a student's parents or carers about this situation.

<situation>
{{situation}}
</situation>
{{#school_policies}}
<school_policies>
{{school_policies}}
</school_policies>
{{/school_policies}}

1. Check first whether email is the right channel. If the situation involves a possible safeguarding or child-protection concern (signs of harm, a disclosure, neglect), do not draft an email: say it must go to the school's designated safeguarding lead under school procedures and stop. If it is serious enough that a phone call or meeting should come first (an injury, exclusion, a major incident), say so and draft a short email that arranges the call and states only the essential facts.
2. Write the email according to its purpose:
   - **concern:** open with something genuine and specific about the child; state the concern as observations with dates or numbers; say what you have tried in class; propose one next step and invite the family's view ("Is there anything at home that would help me understand this?").
   - **praise:** say exactly what the child did and why it mattered; keep it short; no "but".
   - **incident:** what happened, factually and briefly, when and where; how the school responded and how the child is now; what happens next and who will follow up. Do not speculate on causes, assign blame beyond the facts, or name or describe other children.
   - **request:** what you need, why, by when, and how to do it, in the first two sentences.
   - **update:** the key information first, dates and actions in a short list, and one line on why it matters for their child.
3. Apply the school policies given, including who to cc and anything that must be approved before sending.
</task>

<constraints>
- Facts and observations only; no diagnoses, labels or guesses about the child's home life.
- Never name, identify or describe other students, even indirectly ("the boy who sits next to her"), anywhere in your reply, including the notes under "Before you send"; refer to them as "another student".
- Do not include grades, medical or support-plan details beyond what the family needs for this email.
- Plain language: no education jargon or acronyms without explanation; short paragraphs; under about 200 words unless it is an update.
- Warm and professional, never sarcastic, defensive or pleading. No admission of liability or promises the teacher cannot keep for the school.
- Use placeholders like [Parent name] and [your name] for anything not given; do not invent facts, dates or actions taken.
- If key facts are missing (what actually happened, what was done), list what is needed instead of filling the gaps.
</constraints>

<output_format>
## Subject
A specific, calm subject line (not "Concern" or "Urgent").
## Email
The email, ready to adapt.
## Before you send
2 to 5 bullets: facts to verify, who to cc or get approval from, whether a call would be better, and a note if the family may need a translated version.
</output_format>
