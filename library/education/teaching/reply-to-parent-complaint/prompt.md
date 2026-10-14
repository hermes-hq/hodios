---
schema: 1
id: reply-to-parent-complaint
kind: prompt
title: Reply to a parent complaint
description: Drafts a calm teacher reply to an upset parent's email that acknowledges the concern, sets out facts, explains next steps, and moves to a call or meeting when email is the wrong place.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [message, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [parent-communication, complaint-handling, de-escalation, school-email]
pairs_with:
  prompts: [write-parent-email, prepare-parent-teacher-conference, respond-to-grade-appeal]
args:
  - name: parent_email
    description: The parent's email, with the child's name reduced to first name or initials and other students' names removed.
    type: text
    required: true
  - name: facts
    description: What actually happened from your side, with dates, what you have already done, and anything you are unsure of.
    type: text
    required: true
  - name: school_policies
    description: Optional relevant policies, e.g. "complaints go to head of year after first reply", "homework policy", "marks can be re-checked within 10 days".
    type: text
output_contract:
  format: markdown
  sections: [Read of the situation, Reply, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An angry parent email is usually about worry for their child, even when it is phrased as an attack. Replies that work acknowledge the feeling and the concern without admitting fault that has not been established, state the facts briefly and neutrally, show what the teacher has done or will do, and move anything complex or heated to a phone call or meeting. Replies that backfire are defensive, long, argue point by point, criticise the child, mention other children, or are sent within minutes while the teacher is upset. Some emails should not be answered by the teacher alone: threats, abusive language, allegations against staff, legal threats, and anything touching safeguarding go to a senior leader first.
</context>

<task>
Draft a reply to this parent email.
<parent_email>
{{parent_email}}
</parent_email>
<facts>
{{facts}}
</facts>
{{#school_policies}}
<school_policies>
{{school_policies}}
</school_policies>
{{/school_policies}}

1. Read the situation: what the parent is really worried about, which points are factual disagreements, which are feelings, and whether anything means the teacher should not reply alone (abuse, threats, allegations against a staff member, legal action, safeguarding). If so, say so first and draft only a brief holding reply ("Thank you for your email. I have passed it to [senior leader], who will be in touch by [date].") for a senior leader to approve.
2. Otherwise draft the reply:
   - thank them and acknowledge the concern in one or two sentences, naming what matters to them;
   - set out the relevant facts briefly and neutrally, from the facts given only;
   - say what has been or will be done, and correct any misunderstanding gently;
   - propose a call or meeting with two time options if the issue is complex or emotions are high;
   - close warmly with a focus on the child's success.
3. Keep it under about 200 words. Do not respond to every point; respond to what matters.
4. Apply the school policies given, including escalation routes.
</task>

<constraints>
- Never admit fault, liability or a breach of policy that the facts do not establish; acknowledging feelings is not admitting fault.
- Never mention or describe other students, even if the parent did.
- No defensive phrasing ("As I already explained", "I'm sure you'll agree"), sarcasm or criticism of the child or parent.
- Do not invent facts, dates, actions taken or promises the school has not approved. Use [placeholders] for anything missing.
- If the facts given are thin, say what the teacher should check before replying.
</constraints>

<output_format>
## Read of the situation
Two to four bullets, including whether to escalate.
## Reply
Subject line, then the email.
## Before you send
Bullets: wait time, who to cc or inform, facts to check, keep a copy.
</output_format>
