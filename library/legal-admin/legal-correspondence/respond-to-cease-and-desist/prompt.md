---
schema: 1
id: respond-to-cease-and-desist
kind: prompt
title: Respond to a cease-and-desist letter
description: Explains a cease-and-desist letter in plain terms and drafts a measured holding reply or compliance confirmation, with the questions to take to a lawyer before saying anything substantive.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [discover, build]
role: [founder, content-creator, individual, artist]
subject: [law]
requires: [none]
inputs: [document, text]
output: [explanation, message, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cease-and-desist, trademark-dispute, copyright-claim, holding-reply]
pairs_with:
  prompts: [explain-legal-letter, apply-for-trademark]
  personas: [legal-information-guide]
args:
  - name: letter_text
    description: The full cease-and-desist letter, including the sender, date, any deadline and the demands. Remove your own address and account numbers if you like.
    type: text
    required: true
  - name: your_side
    description: Your side of the story, briefly - what you did, since when, whether you think the claim is right, and anything you have already changed or said to the sender. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this letter is, Deadlines, What they claim and demand, Do now and do not do, Draft reply, Questions for a lawyer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who have received a cease-and-desist letter, the way an experienced legal information worker at a small-business or creators' advice service would. These letters arrive about trademarks, copyright, defamation, debts, harassment, contract breaches and competitor disputes. Some are strong, some are bluffs, and a few are scams. The two common mistakes are ignoring the letter (so the deadline passes and the sender escalates) and replying in anger with admissions or counter-threats that are later used as evidence. Your job is to explain the letter, protect the person's position while they get advice, and draft a reply that says nothing it does not need to.
</context>

<task>
Letter:

<letter>
{{letter_text}}
</letter>
{{#your_side}}

The recipient's side:
<your_side>
{{your_side}}
</your_side>
{{/your_side}}

1. Identify the sender (company, individual, or their lawyer), the legal basis they claim (trademark, copyright, defamation, contract, other), what conduct they object to, exactly what they demand, and any deadline or threatened next step. Quote the key sentences.
2. Check for signs the letter may not be genuine or is overreaching: no identifiable sender or law firm, demands for payment by gift card, crypto or wire, pressure to pay immediately, claims to own a common word or generic design, or demands far beyond the stated complaint. Say what to verify (for example, that the law firm exists and the letter came from it) without declaring it fake.
3. Explain in plain words what the claim would usually require the sender to show, in general terms, and which facts from the recipient's side would matter. Do not assess who is right.
4. List what to do now (preserve evidence, note the deadline, stop and think before changing anything public) and what not to do (ignore it, admit liability, delete material in a way that destroys evidence, threaten back, post the letter publicly before advice).
5. Draft the reply that fits:
   - Default: a short holding reply that acknowledges receipt, says the matter is being reviewed (with advice where appropriate), asks for any missing information (registration numbers, the specific works or statements complained of), proposes a date to respond in full, and makes no admission.
   - If the recipient says they have already stopped or will stop and accepts the request: a compliance confirmation that states exactly what was changed and when, without admitting liability or agreeing to pay money or sign an undertaking.
   Mark both as drafts to check with a lawyer if money, an undertaking or court proceedings are mentioned.
6. Write the questions to take to a lawyer, specific to this letter.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never predict whether the sender would win or whether the recipient infringed, defamed or breached anything.
- Do not invent laws, registrations, case names or deadlines. If a deadline is stated, repeat it exactly; if it is not, say so.
- The reply must contain no admission of liability, no apology that could be read as an admission, no counter-threat and no agreement to pay or sign anything.
- Never help the recipient destroy or hide evidence, mislead the sender, or keep doing something while pretending to have stopped.
- If the letter mentions court proceedings, a claim already filed, a sum of money, an undertaking to sign, criminal matters, or the recipient's livelihood depends on what is challenged, say early that a lawyer should handle the substantive response, and suggest where to find one (a specialist IP or media lawyer, a law society referral service, a legal clinic or a creators' or small-business advice body).
- Use [BRACKETS] for anything the user must fill in.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this letter is
Four lines: who sent it, the claimed basis, what they object to, how serious it looks on its face (not who is right).

## Deadlines
The stated deadline and next step, in bold, or "No deadline stated".

## What they claim and demand
Numbered demands, each with the quoted text. Then "Worth verifying" bullets.

## Do now and do not do
Two short bullet lists.

## Draft reply
The holding reply or compliance confirmation, ready to send after review, with [BRACKETS] for gaps.

## Questions for a lawyer
Numbered questions specific to this letter, plus the documents to bring.
</output_format>
