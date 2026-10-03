---
schema: 1
id: handle-foreign-language-letter
kind: prompt
title: Handle an official letter in a foreign language
description: Translates an official letter received in a foreign language, explains what it requires and by when, and drafts a reply in that language for an expat or immigrant.
category: translation
version: 1.0.0
status: incubating
stage: [discover, build]
role: [individual, traveler, student]
advice_risk: [legal, financial]
requires: [none]
inputs: [document, message, image]
output: [rewrite, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [expats, immigrants, government-letters, bureaucracy, deadlines, reply-draft, moving-abroad]
pairs_with:
  prompts: [translate-personal-document, translate-business-email, explain-legal-letter]
  personas: [translator]
args:
  - name: letter_text
    description: The full letter as written, including the sender, reference numbers, the date on the letter, headings, small print and any form fields. Mask personal numbers you do not want to share, but keep the reference format visible.
    type: text
    required: true
  - name: your_language
    description: The language you want the explanation in (for example "English", "Ukrainian").
    type: string
    required: true
  - name: your_situation
    description: Anything that helps, such as the country you live in, when the letter arrived, what you think it is about, what you have already done, and what you want to reply. Optional.
    type: text
output_contract:
  format: markdown
  sections: [In short, Translation, What it asks you to do, Deadlines, Draft reply, Before you send, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help expats and immigrants deal with official letters in a language they do not read well: letters from tax offices, immigration and residence authorities, registry offices, health insurers, landlords, utilities, banks, courts, schools and debt collectors. These letters are dense, use administrative terms, and often hide the most important facts in small print: what the reader must do, by when, what happens if they do not, and how to object. Missing a deadline because the letter was not understood is a common and avoidable harm. Official letters also attract scams that imitate them.

Explain in {{your_language}}.
{{#your_situation}}
<situation>
{{your_situation}}
</situation>
{{/your_situation}}

<letter>
{{letter_text}}
</letter>
</context>

<task>
1. Identify the sender, the type of letter (information, request for documents, payment demand, decision with right of appeal, appointment, reminder, warning) and the language. If the letter is incomplete (missing pages, attachments, the back side), say so first.
2. Give a two-to-three-line summary in {{your_language}}: what it is about, what you must do, and the most important date.
3. Translate the whole letter faithfully into {{your_language}}, keeping reference numbers, amounts and dates exactly, with administrative terms explained in brackets the first time.
4. List the required actions in order: what to do, which documents or payments are needed, how to respond (online portal, post, in person), and what happens if nothing is done, as the letter states it.
5. Work out the deadlines. Quote the deadline wording exactly in the original language. If it is a period ("within one month of notification") rather than a date, explain from when it usually runs (the letter's date, the date of delivery, or a deemed delivery date some days after posting, depending on the country and the type of letter), show the earliest possible deadline as the safe date, and say this must be confirmed.
6. Draft a reply in the letter's language, with a translation into {{your_language}} below it. Match the formal conventions of that country (reference line, salutation, closing) and include the reference number. Base it on the user's situation; if they have not said what they want to reply, draft the most likely useful reply (submitting the requested documents, asking for more time, asking a clarifying question, or acknowledging) and say what you assumed. Use placeholders in square brackets for anything you do not know. Two exceptions: if the letter shows scam signs (step 7), write no reply at all; and if the only real response is a formal appeal, objection or court filing, do not draft that filing, because its form and grounds decide the outcome. Instead draft a short request to the sender for anything needed to prepare it (the full file, the reasons, a copy of the decision) only if that would help, and send the user to the help named under "When to get help".
7. Check for scam signs: payment to an unusual account, pressure to pay immediately by gift card or crypto, links to unofficial websites, mismatched sender details. If any are present, tell the user to contact the authority through its official website or phone number, not the details in the letter.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain what the letter says and what it asks for. Do not predict the outcome of an appeal, a residence decision or a dispute, and do not tell the user whether to contest a decision or pay a disputed amount; say who can advise.
- For letters about immigration status, court proceedings, eviction, large debts or deadlines to appeal, put "When to get help" near the top as well and name the kind of help: an immigration lawyer or accredited adviser, a tenants' association, a debt advice service, legal aid, or the consulate.
- Never invent laws, article numbers, deadlines or office procedures. Name your assumption about the country and tell the user to check.
- Keep the draft reply factual and polite; do not admit liability, waive rights or make promises on the user's behalf beyond what they asked for.
</constraints>

<output_format>
## In short
Two or three lines in {{your_language}}.
## Translation
The full letter translated, numbers and dates exact.
## What it asks you to do
Numbered actions.
## Deadlines
Table: Deadline wording (original) | Meaning | Safe date | Confirm with.
## Draft reply
The reply in the letter's language, then its translation. For a suspected scam, one line saying not to reply. For a decision that needs a formal appeal, one line saying why no appeal is drafted, then any short request to the sender.
## Before you send
Checklist: attachments, signature, copy kept, proof of sending, deadline.
## When to get help
The kind of adviser for this letter and what to bring.
</output_format>
