---
schema: 1
id: support-child-being-bullied
kind: prompt
title: Support a child being bullied
description: Plans how to support a child being bullied, with what to say, a record to keep, working with the school step by step, building confidence, warning signs and when to get more help.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, script, message, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bullying, cyberbullying, school, child-wellbeing, evidence-log, self-confidence]
pairs_with:
  prompts: [write-email-to-teacher, support-anxious-child, talk-to-teen-about-online-safety]
  personas: [parenting-coach]
args:
  - name: situation
    description: What is happening, for how long, where (classroom, playground, bus, online), what your child has told you, changes you have noticed, and anything the school already knows or has done. Leave out other children's names.
    type: text
    required: true
  - name: child_age
    description: The child's age, for example "7", "12", "15".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [First, What your child needs from you now, Talking with your child, Keep a record, Working with the school, Building confidence and safety, Watch for, Get more help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents respond when their child is being bullied. Bullying is repeated, intentional harm where there is an imbalance of power, in person or online. What helps most is a parent who listens calmly and believes the child, a written record, and steady, documented work with the school, which has a duty to act under its anti-bullying policy. What tends to backfire: confronting the other child or their parents directly, telling the child to fight back, or forcing the child into a face-to-face "resolution" with the child who bullied them. Being bullied raises the risk of anxiety, low mood and self-harm, so a child's wellbeing is watched alongside the practical steps.

Child's age: {{child_age}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. First: check for danger. If the situation mentions self-harm or talk of not wanting to live, physical assault or injury, threats, sexual images being shared, or hate based on race, religion, disability, sexuality or gender, lead with what to do now (crisis support, medical help, the police for crimes, reporting images to the platform and not forwarding them).
2. What your child needs from you now: three or four points (believe them, thank them for telling, make clear it is not their fault, do not promise secrecy if they are unsafe, involve them in the next steps).
3. Talking with your child: words to open the conversation and calm, open questions suited to the age, what to avoid saying ("just ignore it", "toughen up"), and how to agree the plan together so they do not feel it is being taken out of their hands.
4. Keep a record: a simple log template and what to capture (date, time, place, what happened, who saw, how your child was affected, who you told and what they said). For online bullying: screenshots with dates and usernames, keep the originals, and block and report on the platform after saving evidence.
5. Working with the school: the steps in order: ask for the anti-bullying policy; write to the class teacher or head of year (provide a short, factual email draft that asks for a meeting and a written plan); an agenda for the meeting (what will happen to keep my child safe now, who is my child's trusted adult, how will it be monitored, when will we review); a follow-up email confirming what was agreed; and how to escalate (head teacher, then the governing body, school board or district, then the education authority) if nothing changes after a reasonable time.
6. Building confidence and safety: safe people and places at school, a buddy, practising short assertive responses through role play, friendships and activities outside school where they feel competent, and keeping routines and sleep steady.
7. Watch for: signs the bullying is continuing or affecting wellbeing (not wanting to go to school, lost or damaged belongings, unexplained injuries, changes in sleep, eating or mood, withdrawing, secrecy about phones).
8. Get more help if: list when to contact the family doctor or a child mental health service, and when it is a matter for the police.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the child described as well as to the parent.
- Do not label the other child or advise contacting their family directly; route it through the school.
- Do not tell the child to retaliate physically.
- Fit everything to the age: simpler words and more parent action for young children, more control and privacy for teenagers.
- School procedures and laws differ by country and school; describe the typical route and tell the parent to check the school's own policy.
- Warm and steady: the parent may be angry or frightened; acknowledge that briefly.
</constraints>

<output_format>
## First
One line, or the urgent steps.
## What your child needs from you now
## Talking with your child
## Keep a record
Table template: Date | Where | What happened | Who saw | Effect on my child | Reported to.
## Working with the school
Numbered steps, with the email draft and the meeting agenda.
## Building confidence and safety
## Watch for
## Get more help if
</output_format>
