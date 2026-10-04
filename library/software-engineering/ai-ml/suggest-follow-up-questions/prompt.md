---
schema: 1
id: suggest-follow-up-questions
kind: prompt
title: Suggest follow-up questions after an answer
description: Suggests short follow-up questions a user might ask next, grounded in the last answer and the app's scope, avoiding repeats and out-of-scope topics. Use for suggestion chips in chat apps.
category: ai-ml
version: 1.0.1
status: incubating
stage: [build, operate]
role: [ml-engineer, product-manager]
stack: [llm-apps]
requires: [none]
inputs: [text, spec]
output: [questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: intermediate
tags: [suggested-questions, conversational-ux, chat-ui, engagement]
pairs_with:
  prompts: [answer-from-retrieved-context, route-user-request]
args:
  - name: last_answer
    description: The assistant's most recent answer, as shown to the user.
    type: text
    required: true
  - name: app_scope
    description: What the app can and cannot help with, for example "Help centre for a project management tool. Covers features, billing and integrations. No legal, HR or general coding advice."
    type: text
    required: true
  - name: count
    description: How many suggestions to return at most. Fewer is allowed when there are not enough good ones.
    type: number
    default: 3
  - name: previous_questions
    description: Optional questions the user already asked in this session, one per line, so suggestions do not repeat them.
    type: text
output_contract:
  format: json
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The example no longer breaks the rule against yes/no questions."}
---
<context>
Suggested follow-ups appear as tappable chips under an answer. Good chips save typing and reveal what the app can do; bad ones repeat what was just answered, lead to topics the app will refuse, or bait users toward content the product should not encourage. Every chip you write will be sent back to the assistant word for word when tapped.

<app_scope>
{{app_scope}}
</app_scope>

<last_answer>
{{last_answer}}
</last_answer>
{{#previous_questions}}

<previous_questions>
{{previous_questions}}
</previous_questions>
{{/previous_questions}}
</context>

<task>
Write up to {{count}} follow-up questions.

1. Read the last answer and find natural next steps: a detail it mentioned but did not explain, the obvious next action ("How do I set that up?"), a common related problem, or a comparison the user may need.
2. Make the set useful as a whole: each question takes a different direction; avoid three variations of one idea.
3. Write each one in the user's voice, as a complete question that makes sense when sent on its own, short enough for a button (one line, a handful of words).
4. Keep each inside the app scope. If the last answer touched an out-of-scope topic, steer suggestions back to what the app covers.
5. If the last answer was a refusal, an error or "I don't know", suggest in-scope alternatives the app can answer, or return an empty list if there are none.
6. Check before output: none duplicates or rephrases a previous question or something the last answer already fully covered; every one is in scope; each makes sense without context. Remove any that fail rather than padding to the count.
</task>

<constraints>
- Write in the language of the last answer.
- No yes/no questions unless the answer leads to an action ("Can I undo this?").
- No questions about the assistant itself, sensitive personal topics, or anything the scope excludes.
- Do not invent product features or facts; questions may only presuppose what the last answer or the scope states.
</constraints>

<output_format>
One JSON object and nothing else:
{"questions": ["How do I invite guests to a project?", "What can guests see in a project?", "What's the limit on guests per plan?"]}
</output_format>
