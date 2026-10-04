---
schema: 1
id: practise-moderating-usability-test
kind: prompt
title: Practise moderating a usability test
description: Lets a researcher rehearse moderating a usability test with a simulated participant who thinks aloud, gets stuck and asks for help, then reviews neutrality, probing and task wording.
category: ux-research
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [spec, text]
output: [conversation, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [usability-testing, moderation-skills, think-aloud, rehearsal, simulated-participant]
pairs_with:
  prompts: [write-usability-test-plan, synthesize-usability-findings, plan-guerrilla-usability-test]
  personas: [ux-researcher]
args:
  - name: tasks
    description: The scenario tasks you plan to give participants, as you would read them aloud, plus your intro script if you have one.
    type: text
    required: true
  - name: product
    description: What is being tested and its current state - screens, flow and known problems - so the simulated participant can react realistically, for example "prototype of a mobile banking app's bill-split feature; the 'Split' button is hidden in an overflow menu".
    type: text
    required: true
  - name: participant_type
    description: The kind of participant to simulate, for example "novice", "expert power user", "quiet and hesitant", "talkative and off-topic", "screen-reader user" or a short profile from your screener.
    type: string
    default: novice
output_contract:
  format: markdown
  sections: [Set-up, Session, Debrief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moderating a usability test is a skill that is usually learned on real participants, at their expense and the study's. The common mistakes are predictable: task wording that gives away the answer by naming the button, helping too soon when the participant struggles, asking leading questions ("Was that easy?"), answering the participant's questions instead of returning them ("What would you expect?"), filling silences, forgetting to prompt think-aloud, and probing for opinions about the future instead of observing behaviour. A realistic rehearsal participant gets stuck where the product is confusing, asks the moderator for help, goes quiet, and sometimes blames themselves, so the moderator can practise staying neutral. This is different from rehearsing a discovery interview: the focus here is observing task behaviour on a product.
</context>

<task>
Run a practice usability session. I am the moderator; you play a participant of this type: {{participant_type}}.

<product>
{{product}}
</product>

<tasks>
{{tasks}}
</tasks>

Set-up (first turn only):
1. Describe the participant you will play in three lines: a fictional person (not a real one) with a relevant background, experience with similar products, and one trait that makes moderating realistic. Keep their mental model and expectations hidden.
2. Before we start, review the task wording briefly: flag any task that names a UI label, contains the answer, is not a realistic goal or bundles two tasks, and suggest a rewrite. Keep this to the tasks with problems.
3. Explain the commands: I describe what is on screen when you need it ("you see a home screen with..."), I can type "pause" to step out of the role-play, and "end session" for the debrief. Then wait for my introduction.

During the session:
4. Stay in character and think aloud in a natural way: short, sometimes trailing off, describing what you look at, expect and try. Act on the product as described in {{product}}; when you need to see something not described, ask me what is on screen rather than inventing the interface.
5. Struggle where the product is likely to be confusing for this participant type. Ask me for help at least once ("Should I click this?"), go quiet at least once, and blame yourself once ("I'm probably just bad at this").
6. React to my moderation: if I give the answer, complete the task immediately; if I ask a leading question, agree politely; if I return a question neutrally, keep trying and reveal more of your thinking; if I ask you to predict future behaviour, give a vague, unreliable answer.
7. On "pause", answer my out-of-role question briefly, then return to character.

Debrief (on "end session"):
8. Task results from the participant's side: what the participant would have done without help, and where the moderator's interventions changed the outcome.
9. Moderation review, quoting my actual words: neutrality (leading questions, praise or reassurance that biases), handling of requests for help, use of silence and think-aloud prompts, probing quality (behaviour-based follow-ups versus opinion questions), and timing.
10. Give the three changes that would most improve my next session, rewrite up to three of my questions or interventions, and give the final task wording with your suggested fixes.
</task>

<constraints>
- The participant is fictional; never base them on a real, named person.
- Quote my real words in the debrief; never invent things I said.
- Keep in-character replies short and realistic, not a stream of ideal insights.
- If the tasks or the product description are missing, ask for them and stop before starting.
</constraints>

<output_format>
## Set-up
First turn: the participant sketch, task wording notes, the commands.
## Session
In-character replies only, until "pause" or "end session".
## Debrief
Task results, Moderation review (with quotes), Three changes, Rewritten interventions, Revised task wording.
</output_format>
