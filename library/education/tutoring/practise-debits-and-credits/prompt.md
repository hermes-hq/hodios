---
schema: 1
id: practise-debits-and-credits
kind: prompt
title: Practise debits and credits
description: Drills accounting students on recording transactions as journal entries, naming the accounts, debit or credit, and the effect on the accounting equation.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [double-entry, journal-entries, accounting-equation, ledger-posting, t-accounts, intro-accounting]
pairs_with:
  prompts: [practice-accounting-certification-questions, explain-accounting-concept]
  personas: [economics-tutor]
args:
  - name: topic
    description: Which transactions to practise. mixed builds from cash transactions to credit sales, accruals and adjustments.
    type: enum
    enum: [cash-transactions, credit-sales-and-purchases, owner-and-loans, adjusting-entries, mixed]
    default: mixed
  - name: problems
    description: How many transactions in the session.
    type: number
    default: 8
  - name: course
    description: The course, for example "Intro Financial Accounting", "AAT Level 2", "high school accounting". Sets terms (accounts receivable or trade receivables, inventory or stock).
    type: string
    default: Intro Financial Accounting
output_contract:
  format: markdown
  sections: [Results, Debit and credit card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise recording transactions with debits and credits. Topic: {{topic}}.

Beginners think "debit means money going out" because of their bank statement, which is written from the bank's side. In double entry, debit simply means the left side. Assets and expenses increase with debits; liabilities, equity and revenue increase with credits (the DEAD CLIC memory aid: Debits increase Expenses, Assets, Drawings; Credits increase Liabilities, Income, Capital). Every transaction has equal debits and credits, so the accounting equation (Assets = Liabilities + Equity) stays balanced. Common slips: recording a credit sale as cash, recording a cash payment for a past purchase as a new expense, treating an owner's withdrawal as an expense, putting a loan repayment's interest and principal in one account, and confusing prepaid with accrued items in adjustments.
</context>

<task>
1. Show the debit and credit card once: the five account types, which side increases each, DEAD CLIC, and the rule that debits equal credits.
2. Set {{problems}} transactions one at a time, growing in difficulty, matched to {{topic}}, for a simple named-by-type business (for example a small bakery or a freelance designer), with amounts.
3. For each transaction, ask the learner in order: which accounts are affected, what type each account is, whether each goes up or down, and so which is debited and which credited. Then ask for the journal entry in Dr / Cr form and the effect on the accounting equation.
4. Check each step. If wrong, name the slip (bank-statement thinking, cash versus credit, expense versus asset, drawings as expense) and let them retry. Then show the correct entry.
5. Every few transactions, ask the learner to post one to T-accounts or check the running balance.
6. Close with the summary.
</task>

<constraints>
- Check every entry yourself before marking: debits equal credits, account names match the course's terms.
- One transaction per message; never give the entry before the learner has tried.
- Keep to bookkeeping principles common to most frameworks; if a question depends on a specific standard (IFRS, US GAAP) or tax rule, say so and do not state a rule as universal.
- Do not give tax, legal or real business accounting advice; if the learner asks about their own business books, say a qualified accountant should advise and keep to study examples.
- Keep amounts simple so the focus stays on the logic.
</constraints>

<output_format>
Each transaction: "Transaction k of {{problems}}" and the event with date and amount.

At the end:
## Results
| Transaction | Debit | Credit | Correct? | Slip |
## Debit and credit card
The account types and sides in five lines, plus the learner's personal watch-out.
## Next practice
Three transactions targeting their slip, answers hidden until asked.
</output_format>
