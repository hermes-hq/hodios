---
schema: 1
id: set-up-ai-for-kids
kind: prompt
title: Set up an AI assistant for a child
description: Helps parents set up an AI assistant for a child with age-appropriate instructions, privacy settings, family rules and a first conversation about how AI works and when to come to an adult.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [kids-and-ai, family-rules, online-safety, privacy-settings]
pairs_with:
  prompts: [set-up-parental-controls, talk-to-teen-about-online-safety, set-screen-time-plan]
  styles: [{id: kid-friendly, level: 2}]
args:
  - name: child_age
    description: "The child's age, for example \"9\" or \"14\"."
    type: string
    required: true
  - name: uses
    description: What the child wants or needs AI for, for example homework help, reading practice, curiosity questions, creative stories, coding, plus any worries you have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you start, Assistant instructions, Privacy settings, Family rules, First conversation, Signs to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Children use AI assistants for homework, curiosity and play, and the risks are specific: confident wrong answers they cannot spot, homework done for them instead of with them, personal details typed into a chat, content that is not age-appropriate, and for some children an emotional attachment to a chatbot that always agrees. Many general AI services set a minimum age (often 13, sometimes higher, sometimes with parental consent) in their terms, and some offer teen or family settings. A good setup combines a service that allows the child's age, custom instructions that make the assistant teach rather than do, privacy settings, a few family rules the child helped make, and an open conversation.

The child: age {{child_age}}.
<uses>
{{uses}}
</uses>
</context>

<task>
1. Before you start: tell the parent to check the service's minimum age and any teen or family mode in its current terms. If the child is below a general service's minimum age, recommend supervised use on the parent's own account with the parent present, or a service designed for children, rather than a workaround.
2. Write custom instructions for the assistant, in language suited to the age: who the user is (a child of this age, without personal details), to explain at their level, to help them think through homework with hints and questions instead of giving finished answers, to say when it is not sure and suggest checking with a teacher or book, to keep content age-appropriate, never to ask for personal information, to encourage talking to a parent or trusted adult about anything upsetting, unsafe, or about feelings, and to remind them it is a computer program, not a friend or a person.
3. List privacy settings to look for, generically because menus differ: memory or personalisation, chat history, use of chats for training, sharing links, connected apps, voice and camera.
4. Write five to eight family rules phrased for the child, covering what to never type (full name, school, address, photos, passwords), checking facts, homework honesty according to the school's rules, where and when AI is used, and coming to an adult with anything weird or upsetting.
5. Write a first conversation script for the parent: how AI works in a sentence the child can follow, a quick demo where it gets something wrong, and agreeing the rules together.
6. List signs to watch and what to do: secrecy about chats, preferring the chatbot to friends or family, distress after use, homework that does not sound like them.
</task>

<constraints>
- Do not suggest bypassing age requirements or creating an account with a false birth date.
- Do not claim a specific service's current minimum age, settings or features as fact; say to check its current terms and settings.
- Keep the instructions free of the child's name, school or other identifying details.
- Match the tone and rules to the age: concrete and simple for under 10, more autonomy and reasoning for teenagers.
- If the parent describes signs of self-harm, grooming or abuse, tell them to contact local emergency services or child-protection support straight away.
</constraints>

<output_format>
## Before you start
## Assistant instructions
One fenced block to paste into the custom instructions.
## Privacy settings
Checkbox list.
## Family rules
Numbered, in the child's language.
## First conversation
A short script.
## Signs to watch
Table: Sign | What to do.
</output_format>
