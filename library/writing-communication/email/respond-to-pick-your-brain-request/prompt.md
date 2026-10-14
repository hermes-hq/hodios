---
schema: 1
id: respond-to-pick-your-brain-request
kind: prompt
title: Reply to a "pick your brain" request
description: Replies to someone asking for free advice or a coffee chat with a kind, clear choice - a short answer, a resource, a paid option or a polite no - that protects your time.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [consultant, founder, individual]
requires: [none]
inputs: [message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [free-advice, boundaries, saying-no, coffee-chat, paid-consultation]
pairs_with:
  prompts: [decline-request-gracefully, decline-spec-work-request, price-services]
args:
  - name: request
    description: The message you received, pasted in full, and who the person is to you (stranger, friend of a friend, former client, student).
    type: text
    required: true
  - name: response_type
    description: How you want to respond.
    type: enum
    enum: [answer-briefly, point-to-resource, offer-paid-session, decline, let-me-choose]
    default: let-me-choose
  - name: my_situation
    description: Your work, how much free help you give and to whom, any paid option (rate, booking link placeholder, office hours), and resources you have (articles, a talk, a course).
    type: text
output_contract:
  format: markdown
  sections: [Recommended approach, Reply, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People with expertise get a steady stream of "can I pick your brain over coffee?" messages. Saying yes to all of them quietly eats a working week; ignoring them feels rude. Experienced consultants and founders handle them by sorting first: a specific question can often be answered in three lines by email, a common question deserves a link to something already written, a request that is really consulting deserves a paid option stated without apology, and some deserve a kind no. The reply should never make the person feel stupid for asking, and it should turn a vague "coffee" into a specific question before agreeing to any time.
</context>

<task>
Reply to this request. Preferred response: {{response_type}}.

<request>
{{request}}
</request>
{{#my_situation}}
<my_situation>
{{my_situation}}
</my_situation>
{{/my_situation}}

1. Identify what the person actually wants (a specific answer, general career advice, help with their business, a sales lead, a favour) and how specific it is.
2. If the response type is let-me-choose, recommend one: answer-briefly if the question is specific and quick; point-to-resource if a resource in my_situation covers it; offer-paid-session if it is real consulting work; decline if it is outside my scope or I have no capacity. Explain the choice in two sentences.
3. Write the reply (under about 130 words):
   - Thank them briefly and specifically.
   - answer-briefly: answer in three to five lines, from the user's own expertise as stated; if the question needs facts I do not have, use [placeholders] for the user to fill rather than inventing an answer.
   - point-to-resource: name the resource from my_situation and say which part helps.
   - offer-paid-session: state the paid option plainly once, without apology or justification, with a booking placeholder.
   - decline: a clear no in the first two sentences, with a short honest reason if wanted, and one alternative only if a real one exists.
   - If the request is vague, ask them to send the specific question by email first.
4. Under Notes, give one line on how to handle a follow-up push.
</task>

<constraints>
- Kind and brief; no lecture on the value of the user's time.
- Never invent rates, resources, links or expert answers the user has not given.
- Do not promise a call "sometime" that the user does not intend to have.
- If the request is from a student or someone in an underrepresented group and my_situation says the user offers some free help to them, honour that.
</constraints>

<output_format>
## Recommended approach
The chosen response and why.
## Reply
Ready to send.
## Notes
Follow-up handling and placeholders.
</output_format>
