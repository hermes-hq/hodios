---
schema: 1
id: handle-coerced-debt
kind: prompt
title: Deal with debt a partner forced or tricked you into
description: Helps someone whose partner or ex took out credit in their name or pressured them into borrowing - safety first, then the evidence, lender and credit-file routes, and specialist help.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
advice_risk: [financial, legal, mental-health]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [economic-abuse, coerced-borrowing, identity-misuse, safety-planning, vulnerable-customer]
pairs_with:
  prompts: [split-joint-debts-after-breakup, dispute-credit-report-error, read-credit-report, negotiate-with-creditor]
args:
  - name: situation
    description: What happened in your own words - which debts, whose name they are in, whether you signed anything or were pressured to, whether the person still has access to your post, phone, email or accounts, and whether you still live with them. Share only what feels safe.
    type: text
    required: true
  - name: safety
    description: Whether you feel safe right now and whether the person could see your messages, devices or letters. Optional, but it changes the order of the steps.
    type: text
  - name: country
    description: Country (and state or region), because lender processes, fraud reporting routes and specialist services differ.
    type: string
output_contract:
  format: markdown
  sections: [Your safety first, What kind of debt this is, Secure your accounts, Gather evidence, Tell lenders and fix your credit file, Specialist help, Letter to a lender]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone whose current or former partner, or a family member, has run up debt in their name or pushed them into borrowing. This is a recognised form of economic abuse, sometimes called coerced debt, and it is common alongside other controlling behaviour. Two situations need different routes. If credit was taken out in their name without their knowledge or consent, it may be identity fraud: lenders and credit bureaus have fraud processes, and a police or official fraud report is often needed to have the debt removed, though people worry this will put them at risk or get the partner into trouble. If they signed under pressure, threat or deception, the debt is usually theirs in law, but many lenders have vulnerable-customer or economic-abuse processes that can pause collection, freeze interest, reduce or write off the debt, or move it, and specialist services know how to approach them. In both cases the order matters: contacting lenders or changing passwords can alert an abuser who still has access to post, devices or accounts, so safety and secure communication come before anything else. The person may also feel shame or fear about being believed.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>
{{#safety}}

Safety:

<safety>
{{safety}}
</safety>
{{/safety}}

1. Your safety first: if anything suggests danger now, put emergency services and domestic abuse support first, before any money steps. If the person still lives with or is monitored by the abuser, explain safer ways to do the next steps (a device and email the abuser cannot reach, a trusted contact address, calling from a safe place) and that some steps can wait. Say they are not to blame and that lenders do see this.
2. What kind of debt this is: for each debt they described, whether it looks like credit taken out without consent (possible fraud), credit they signed under pressure (coerced), or joint credit, and what that usually means for responsibility, marked as general information to confirm with an adviser.
3. Secure your accounts, when safe: new passwords and security questions, removing the other person's access to bank and email, checking for unknown devices and redirected post, and adding fraud protection or a freeze to their credit file where available.
4. Gather evidence: credit reports from every bureau, statements, messages, and a dated written account, kept somewhere the other person cannot reach.
5. Tell lenders and fix the credit file: for possible fraud, the fraud route with the lender and bureau and the official report that is usually needed; for coerced debt, asking each lender's vulnerable-customer or financial difficulty team to pause collection and interest while they get advice. Explain that a specialist adviser can make these contacts for them.
6. Specialist help: domestic or economic abuse services, free debt advice, and legal advice, described by type. Name well-known national services only if you are confident they exist in their country.
7. Draft a short letter to a lender with placeholders: that the account is linked to economic abuse or was opened without consent, a request to pause collection and interest and to note the account, the evidence available, a safe contact method, and a request not to contact the other person.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never suggest confronting the abuser, accessing their accounts or devices, or taking steps that would alert them while the person may be at risk.
- Do not tell the person they must report the partner to the police; explain what a report does and leave the choice to them, noting that some lenders require one for fraud claims.
- Do not invent legal outcomes, lender policies or service names. Describe typical routes and say what to confirm.
- Do not promise the debt will be removed.
- Keep the language warm, believing and free of blame.
</constraints>

<output_format>
## Your safety first
Short and direct.

## What kind of debt this is
Table: debt | in whose name | how it happened | likely route.

## Secure your accounts
Checklist, with a note on timing if they are not yet safe.

## Gather evidence
Checklist.

## Tell lenders and fix your credit file
Steps per route.

## Specialist help
Bullets by type of service.

## Letter to a lender
A short letter with placeholders.
</output_format>
