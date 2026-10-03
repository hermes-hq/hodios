---
schema: 1
id: write-email-to-teacher
kind: prompt
title: Write an email to a teacher
description: Writes a parent's email to a teacher about a concern, request or update that is specific, collaborative and short, and asks for one clear next step.
category: parenting
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [parent-teacher, school-communication, email-to-school, bullying, homework, advocacy]
pairs_with:
  prompts: [prepare-parent-teacher-conference, write-parent-email, help-with-homework]
  personas: [parenting-coach]
args:
  - name: issue
    description: What you want to raise and why, for example a worry about homework, friendships, bullying, grades, a diagnosis or support need, an absence, or a thank-you. Include what you have seen at home, dates if relevant, what you would like to happen, and your tone worries.
    type: text
    required: true
  - name: child_grade
    description: The child's grade, year or class, for example "Year 4", "7th grade". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Subject line, Email, Before you send, If you do not hear back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents write to their child's teacher in a way that gets a good response. Teachers read many emails between lessons, so the best ones are short, specific, start from a shared goal (the child doing well), describe what the parent has observed rather than accuse, and end with one clear request. A collaborative first email is far more likely to lead to a solution than a long or angry one, even when the parent is upset.

{{#child_grade}}Grade or year: {{child_grade}}{{/child_grade}}

<issue>
{{issue}}
</issue>
</context>

<task>
1. Identify the purpose (concern, request, update, or thank-you) and the one outcome the parent wants. If the outcome is unclear, choose the most reasonable next step (usually a short meeting or call) and note it.
2. Write two subject line options that say what it is about, without alarm words.
3. Write the email, under about 180 words:
   - a friendly opening and who the child is;
   - the reason for writing in one sentence;
   - what the parent has observed, with specifics (what, when, how often, what the child said), separating facts from the child's account;
   - a collaborative line ("I'd like to understand what you're seeing in class" or "I'd value your view");
   - one clear request with a time frame (a call or meeting this week or next, a specific adjustment, information);
   - a warm close and the best way to reach the parent.
4. Before you send: a short checklist (remove heat, check names and dates, do not copy others in on the first email, attach only what is needed).
5. If you do not hear back: a short follow-up line to send after about three school days, and who to contact next (head of year, school counsellor, principal or head teacher) if the issue is not resolved.
</task>

<constraints>
- Use only the facts the parent gave. Do not invent incidents, names, dates or diagnoses; leave placeholders such as [teacher's name] and [child's name].
- Keep the parent's legitimate concern intact while removing accusations, sarcasm and threats. If the parent is angry, keep the email calm but firm and specific.
- Do not include sensitive medical or family details beyond what the teacher needs; suggest discussing them in person if appropriate.
- If the issue involves a child's safety (bullying with injuries or threats, self-harm, abuse, a concern about a staff member), say that schools have a designated safeguarding or child-protection lead, and that the parent should contact them or the principal directly and promptly, not only the class teacher. If a child is in immediate danger, contact emergency services.
- Match the school culture the parent describes (formal or first names) and the parent's voice; plain words.
- This is a parent writing to a teacher. If the user is actually a teacher writing to a parent, say that the write-parent-email prompt fits better and still help.
</constraints>

<output_format>
## Subject line
Two options.
## Email
Ready to paste.
## Before you send
Checklist.
## If you do not hear back
Follow-up line and who to contact next.
</output_format>
