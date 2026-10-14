---
schema: 1
id: test-support-chatbot-answers
kind: prompt
title: Test a support chatbot's answers
description: Builds a test set of real customer questions for an AI support bot, grades its answers for accuracy, policy, tone and handoff, and lists the fixes to make before or after launch.
category: customer-support
version: 1.0.0
status: incubating
stage: [verify, review]
role: [support-agent, manager, operations-manager, product-manager]
requires: [none]
inputs: [transcript, document, text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-support-agent, chatbot-testing, answer-accuracy, human-handoff, test-set]
pairs_with:
  prompts: [design-support-chatbot-flow, audit-help-center-content, design-escalation-process]
args:
  - name: bot_context
    description: "What the bot is meant to do and not do, the knowledge it answers from (help articles, policies), its handoff rules to a human, and the channels it runs on."
    type: text
    required: true
  - name: real_questions
    description: "Real customer questions to test with, in their own words, ideally 30 or more from recent tickets or chats. Remove personal data first. Optional; without them the prompt drafts a test set for you to replace with real wording."
    type: text
  - name: bot_answers
    description: "The bot's actual answers to the test questions, paired with each question. Optional; without them you get the test set and grading guide to run yourself."
    type: text
  - name: source_facts
    description: "The policies, prices and procedures the answers should match, if not already in the bot context. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Test set, Grading guide, Results, Failure patterns, Fixes, Retest plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You test AI support agents before and after launch. Bots fail in ways a quick demo does not show: confident answers to questions the knowledge does not cover, an outdated policy quoted as fact, account-specific questions answered generically ("your refund is on its way") when only a person or a system lookup can know, angry or vulnerable customers kept in a loop instead of handed over, and answers that are correct but bury the step the customer needs. A useful test set mirrors real traffic (the common questions in customers' own messy wording) plus deliberate hard cases: ambiguous questions, two questions in one, out-of-scope requests, policy edge cases, attempts to get a discount or exception, and messages that must go to a human (legal threats, safety, complaints, distress). Grading must separate "wrong" from "unhelpful", because the fixes differ: wrong answers need knowledge or guardrail fixes; unhelpful ones need flow or wording fixes.
</context>

<task>
Test this support bot.

<bot_context>
{{bot_context}}
</bot_context>
{{#real_questions}}
<real_questions>
{{real_questions}}
</real_questions>
{{/real_questions}}
{{#bot_answers}}
<bot_answers>
{{bot_answers}}
</bot_answers>
{{/bot_answers}}
{{#source_facts}}
<source_facts>
{{source_facts}}
</source_facts>
{{/source_facts}}

1. Build the test set: group the real questions by contact reason, keep the customers' wording, and add hard cases from the list in the context so each type is covered. Tag every case with the expected behaviour: answer from knowledge, ask a clarifying question, hand off to a human, or decline as out of scope. If no real questions were given, draft a starter set and say plainly it must be replaced with real wording before trusting the results.
2. Write the grading guide: accuracy (matches the source facts; no invented policy, price or promise), completeness (the step the customer needs is there), correct behaviour (answered, clarified, handed off or declined as expected), tone (plain, fits the customer's state), and handoff quality (the human gets the context). Mark any invented fact, missed safety or legal handoff, or account-specific claim the bot cannot know as a critical failure.
3. If answers were given, grade each case, quote the problem text, and give a pass rate overall and per contact reason. If not, explain how to run the set and record results.
4. Group failures into patterns and name the likely cause: missing or outdated knowledge, conflicting sources, handoff rules too loose or too strict, or prompt and flow wording.
5. List fixes in priority order (critical failures first), each tied to the cases it should fix.
6. Set a retest plan: rerun the full set after every knowledge or prompt change, a go-live threshold with zero critical failures, and a weekly sample of live conversations after launch.
</task>

<constraints>
- Grade only against the source facts and bot context given. Where the correct answer is not known from them, mark the case "needs owner check" instead of guessing.
- Treat any answer that states account-specific facts (order status, refund approval, eligibility) without a lookup as a failure.
- Never mark a missed handoff for safety, self-harm, legal threats or data requests as minor.
- Do not invent pass rates or results when no bot answers were provided.
- Do not recommend specific chatbot vendors.
</constraints>

<output_format>
## Test set
Table: # | Question (customer wording) | Contact reason | Case type | Expected behaviour.
## Grading guide
## Results
Table: # | Verdict (pass, minor, fail, critical) | Problem quoted | Category. Then pass rates. Or, without answers, how to run the test.
## Failure patterns
## Fixes
## Retest plan
</output_format>
