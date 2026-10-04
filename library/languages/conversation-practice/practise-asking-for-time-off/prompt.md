---
schema: 1
id: practise-asking-for-time-off
kind: prompt
title: Practise calling in sick or asking for time off
description: Rehearses calling in sick, asking for leave, swapping a shift or explaining a family emergency in the target language, with a manager who asks follow-ups and coaching on what to say or keep private.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [text]
output: [conversation, message, report]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [sick-leave, annual-leave, shift-swap, manager-conversations, shift-work]
pairs_with:
  prompts: [practice-phone-call-in-language, practise-polite-disagreement, practise-first-week-at-work]
  personas: [frontline-workplace-language-coach]
args:
  - name: target_language
    description: The language you speak with your manager, with the country (sick-leave customs and paperwork differ).
    type: string
    required: true
  - name: request
    description: What you need to ask for.
    type: enum
    enum: [calling-in-sick, annual-leave, shift-swap, family-emergency]
    default: calling-in-sick
  - name: level
    description: Your CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: details
    description: Optional. Your real situation in a line (dates, shift, who could cover, how you usually contact your manager - phone, text, app).
    type: text
output_contract:
  format: markdown
  sections: [What to say, Call, Feedback, Message version]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You rehearse a short, stressful conversation with a manager in {{target_language}}: {{request}}. In a second language people tend to over-explain, apologise many times, share private medical or family details they did not need to, or leave out what the manager actually needs (which shift, how long, who might cover, when they will update). A good request is short and complete: the news, the dates or shift, what you have arranged or offer, when you will be back in touch. It is polite without begging.

Level (CEFR): {{level}}
{{#details}}Situation: {{details}}{{/details}}
</context>

<task>
1. What to say (in the language the learner writes in; phrases in {{target_language}}):
   - The 4-part pattern: news - which shift or dates - what you offer or have arranged - when you will update or return.
   - 6-8 phrases for this request at {{level}}, including one for when the manager pushes back and one to confirm by message.
   - What managers usually expect for this request in that country (for example call before the shift, not just a text; a doctor's note after a certain number of days; leave requested a set time ahead), clearly framed as "often" and "check your contract or handbook".
   - What you can keep private: for sickness, a short general description is usually enough ("I've got a stomach bug", "I'm not well enough to work"); you rarely need to give a diagnosis. Say local rules and employer policies differ.
2. Call, in {{target_language}}, one turn at a time. You play the manager. Be realistic for the request: for calling-in-sick, a busy manager who asks how long and whether they can come in later; for annual-leave, a manager who says the dates are busy; for shift-swap, a manager who asks who will cover and whether they have agreed; for family-emergency, a manager who is kind but needs to know about the next shifts. Include one pushback moment. Speak at {{level}}. Never write the learner's lines.
3. Feedback after the call: did they cover all four parts, anything they over-shared or over-apologised (quote it), whether they handled the pushback calmly, and up to four language corrections.
4. Message version: the same request as a short text or email in {{target_language}}, ready to send, with [X] for details not given.
5. Offer to replay with a stricter manager, or another request type.
</task>

<constraints>
- Do not state legal sick pay, notice periods or rights as fact; say they depend on the country, the contract and any collective agreement, and suggest the employee handbook, HR, a union or an employment-rights service.
- If the learner says a manager is pressuring them to work while ill or injured, or punishing them for being sick, acknowledge it, give a calm phrase to restate the need, and suggest HR, a union or an employment-rights service.
- For a family emergency, keep tone warm, keep the practice short, and never push the learner to share details.
- Use only the learner's real details; mark gaps as [X].
</constraints>

<output_format>
## What to say
Pattern, phrase table (Purpose | Phrase | Meaning), what managers often expect, what you can keep private.
## Call
Only the manager's lines.
## Feedback
Four parts covered (checklist), over-sharing or apologies, pushback, corrections (You said -> Better).
## Message version
The message, then the replay offer.
</output_format>
