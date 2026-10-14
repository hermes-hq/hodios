---
schema: 1
id: raise-issue-about-someone-elses-child
kind: prompt
title: Raise an issue about someone else's child
description: Plans how to raise a problem with another parent about their child's behaviour toward yours, such as hitting, unkind words or exclusion, without putting them on the defensive.
category: interpersonal-communication
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [script, message, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [other-parents, playdates, childrens-behaviour, school-gate, co-operation]
pairs_with:
  prompts: [support-child-being-bullied, prepare-difficult-conversation, clear-up-misunderstanding]
  personas: [communication-coach]
args:
  - name: what_happened
    description: What the other child did, when and where, how you know (saw it, your child told you, another adult told you), and how your child was affected.
    type: text
    required: true
  - name: other_parent
    description: How well you know the other parent, and anything about how they might react.
    type: text
    required: true
  - name: setting
    description: Where it mainly happens.
    type: enum
    enum: [school-or-nursery, club-or-activity, playdates-or-home, neighbourhood, online]
    default: playdates-or-home
output_contract:
  format: markdown
  sections: [Should you go to the parent, Before you talk, Opening, What to say, If they get defensive, Next steps, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Few conversations make parents more defensive than hearing that their child has hurt someone else's, and the worry about that reaction keeps many parents silent until they are angry. The approach that works is to treat it as a shared problem between the children that both parents want to solve, not an accusation: talk privately, never in front of the children or in a group chat; describe specific behaviour rather than labels ("pushed him off the slide twice", not "your son is a bully"); say how you know and acknowledge that you have heard one side; ask what they have seen, since they may know of something going on; and propose something concrete together. Young children's behaviour (grabbing, hitting, "you're not my friend") is often developmental, while repeated targeting, threats, sexualised behaviour or injuries are more serious. Where it happens matters: incidents at school, nursery or a club are the staff's responsibility, so the school is usually the first stop, with the parent conversation optional. Parents should not discipline or confront another person's child themselves.
</context>

<task>
Help me raise this with the other child's parent. Where it happens: {{setting}}.

<what_happened>
{{what_happened}}
</what_happened>

<other_parent>
{{other_parent}}
</other_parent>

1. Decide first whether the parent is the right person. If it happens at school, nursery, a club or online through a school platform, recommend telling the staff first and say whether a parent conversation adds anything. If it involves injuries, threats, sexualised behaviour, weapons or a pattern of targeting, say it needs the school or the relevant authorities, not only a parent chat.
2. If it is unclear what happened or how I know, ask up to two short questions and stop.
3. Plan the setting and timing: private, calm, not at pick-up in front of others, and whether a call or a message to ask for a chat suits this parent.
4. Write an opening that frames it as a shared problem and assumes good intent.
5. Write what to say: the specific behaviour and how I know, the effect on my child, an acknowledgement that I have only one side, a question about what they have seen, and a concrete suggestion (supervised play, a break, both talking to our children).
6. Write calm responses to defensive replies ("my child would never", "your child started it", "kids will be kids", anger), without escalating.
7. Plan next steps: what to tell my child, how to follow up, and when to involve the school or others if it continues.
</task>

<constraints>
- No labels for the other child ("bully", "aggressive", "a problem") and no comments on the other family's parenting.
- Do not suggest confronting or disciplining the other child.
- Use only facts I gave and mark what is my child's account rather than something I saw.
- Keep spoken lines short and calm.
- If my child has been seriously hurt or is at risk, put their safety first and point to the school, a doctor or the police as appropriate.
</constraints>

<output_format>
## Should you go to the parent
Recommendation and reason.
## Before you talk
Setting, timing and how to ask for the chat.
## Opening
The first words.
## What to say
The words.
## If they get defensive
Table: If they say… | You can say…
## Next steps
What to tell my child, follow-up and escalation.
## Notes
Anything else.
</output_format>
