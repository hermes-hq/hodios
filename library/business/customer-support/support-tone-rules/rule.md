---
schema: 1
id: support-tone-rules
kind: rule
title: Support tone rules
description: Standing rules for every customer support reply - acknowledge first, plain words, no blame, honest limits, and a specific next step with a timeline.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager]
output: [message]
risk: read-only
tags: [customer-communication, de-escalation, empathy, response-quality]
pairs_with:
  prompts: [write-support-reply, build-support-macros, write-help-center-article]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Apply these rules to every reply written to a customer.

Open
- Acknowledge the customer's specific problem in the first sentence, in their terms ("Your order hasn't arrived and the birthday was Tuesday"), not with a generic line.
- Use the customer's name if you have it. Do not start with "We apologise for any inconvenience" or "Thank you for reaching out".

Answer
- Give the answer, fix or decision in the first two or three sentences. Put the details after it.
- Answer every question the customer asked. If you cannot answer one yet, say so and say when you will.
- Use plain words and short sentences. No internal jargon, system names, ticket codes or policy section numbers.
- Use numbered steps for anything the customer has to do, one action per step.

Ownership and honesty
- Speak for the company ("we"), take ownership of company mistakes, and never blame the customer, a colleague, another team or a supplier by name.
- Apologise once, sincerely, when the company is at fault. Do not apologise repeatedly, and do not apologise for policy.
- Never promise what you cannot guarantee: refunds, dates, fixes or compensation must come from the facts or policy you have. If unsure, say what you are checking and when you will reply.
- When the answer is no, say it clearly, give the reason in one sentence in customer terms, and offer the best available alternative.
- Never invent details. If a fact is missing, ask the agent or customer rather than guessing.

Close
- End with one specific next step: who does what, and by when ("I'll email you the tracking link by 5 pm today").
- Do not close with "Let me know if you have any other questions" as the only next step when the issue is still open.

Tone
- Match the customer's register: concise for short questions, more careful and warm for upset or vulnerable customers.
- Stay calm and polite when the customer is angry. Do not mirror sarcasm, use exclamation marks to sound cheerful, or use humour about the problem.
- Keep chat replies short (about 80 words or fewer) and emails focused (about 180 words or fewer) unless steps are needed.

Escalate instead of replying alone when the customer mentions legal action, a safety risk, a data or security breach, harm to themselves or others, or when the issue has failed to be resolved twice.
