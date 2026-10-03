---
schema: 1
id: write-email-to-professor
kind: prompt
title: Write an email to a professor
description: Writes a student's email to a professor or adviser about an extension, a grade, research, a recommendation or an absence, with correct etiquette and one clear ask.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [student]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [academic-email, extension-request, grade-appeal, recommendation-request, research-opportunity, email-etiquette]
pairs_with:
  prompts: [write-follow-up-email, request-reference, write-professional-email]
args:
  - name: purpose
    description: What the email is for. Other covers anything else, such as asking to join a full class or about a thesis topic.
    type: enum
    enum: [extension, grade-question, research-inquiry, recommendation, absence, other]
    required: true
  - name: course_or_context
    description: The course code and name, section, and term, or for research the lab or paper you are writing about, for example "BIO 214 Genetics, section 2, autumn term".
    type: string
    required: true
  - name: key_facts
    description: Everything relevant, such as the assignment and due date, what happened, what you have done so far, what you want, your year and programme, and anything the syllabus says about it.
    type: text
    required: true
  - name: deadline
    description: Any date that matters, for example the assignment due date, the application deadline for the letter, or when you need an answer.
    type: string
output_contract:
  format: markdown
  sections: [Email, Before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Professors receive many student emails and answer the ones that are easy to act on: a subject line with the course, a correct title, the student identified, one clear request and the facts needed to decide. They tend to ignore or bristle at emails that start "Hey", ask a question the syllabus answers, ask "did I miss anything important?", argue for points, or arrive the night before a deadline with no plan. Each purpose has its own conventions:

- **Extension:** ask before the deadline, give the reason briefly (no medical detail; "documentation is available through student services" is enough), say what is done, and propose a specific new date.
- **Grade question:** ask to understand the marking against the rubric, not to negotiate points; check whether the course has a waiting period or regrade form; offer office hours.
- **Research inquiry:** show you read their recent work (name it), say what you bring (courses, skills, hours per week), ask a specific question (is there space in the lab this term?), attach a CV.
- **Recommendation:** ask at least three to four weeks ahead, ask whether they can write a strong letter, give an easy way to decline, and promise a packet (CV, statement, deadlines, submission links, courses and grades with them).
- **Absence:** inform rather than ask permission unless attendance rules require it, and ask how to catch up after checking the course site.
</context>

<task>
Write a {{purpose}} email to a professor or adviser for {{course_or_context}}.{{#deadline}} Relevant date: {{deadline}}.{{/deadline}}

<key_facts>
{{key_facts}}
</key_facts>

1. If the facts lack something the ask cannot work without (for an extension: the assignment and its due date; for a recommendation: what the letter is for and its deadline; for a research inquiry: who the professor is or what their work is about), ask up to two questions and stop.
2. If the facts show the answer is probably in the syllabus or on the course site (late policy, regrade process, attendance rules), say so first under Before sending and still draft the email in case it is not.
3. Subject line: course code plus the request, for example "BIO 214 sec. 2: extension request for Lab Report 3 (due 14 Nov)".
4. Salutation: "Dear Professor [Surname]," or "Dear Dr [Surname]," using the name and title in the facts; if unknown, use `[Surname]`. Never first names unless the facts say the professor invited it.
5. First sentence: who the student is (name placeholder, course, section). Second sentence: the ask, specific and answerable with yes, no or a date.
6. Then the minimum supporting facts for the purpose, following the conventions above. Keep private matters private: name the category (medical, family emergency) only if the student wants to, never the details.
7. Close with what the student will do next or attach, thanks in one line, and a sign-off with full name and student number placeholder where the institution uses one.
</task>

<constraints>
- Under about 150 words in the body (a research inquiry may run to about 200).
- One ask per email. If the facts contain two requests, put the more urgent in the email and mention the other under Before sending.
- Use only the facts given. Never invent reasons, grades, papers, documentation or deadlines, and never write a false excuse even if asked; offer an honest version instead.
- Respectful and direct: no "Hey", no "Sorry to bother you", no pleading, no entitlement ("I deserve an A").
- Write in the conventions of the country in the facts if stated (for example "Dear Professor" in the US, "Dear Dr" for many UK academics); otherwise use "Professor".
</constraints>

<output_format>
## Email
Subject line, then the body.
## Before sending
Bullets: syllabus or policy checks, attachments, placeholders to fill, and when to follow up if there is no reply (usually after three to five working days).
</output_format>
