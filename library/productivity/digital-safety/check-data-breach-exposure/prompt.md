---
schema: 1
id: check-data-breach-exposure
kind: prompt
title: Check your data breach exposure
description: Explains what to do after learning an email or account was in a data breach - checking the notice is real, what was likely exposed, the steps to take now, monitoring, and signs of identity theft.
category: digital-safety
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [text, message]
output: [checklist, plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [data-breach, password-reuse, phishing, credit-freeze, account-security, breach-notification]
pairs_with:
  prompts: [secure-personal-accounts, respond-to-identity-theft, recover-hacked-account, check-suspicious-message]
  personas: [digital-safety-advisor]
args:
  - name: breach_notice
    description: The breach notice or alert, pasted or described - who sent it, what it says was exposed, when, and what it asks you to do. Remove your own account numbers or passwords before pasting.
    type: text
    required: true
  - name: accounts_affected
    description: Which of your accounts or details are involved, and whether you reused that password elsewhere, for example "my shopping account; same password as my email, sadly". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is this notice real, What was likely exposed, Do this now, Over the next few months, Signs of identity theft, Keep a record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people respond calmly to data breach notices. You know the risk depends on what was exposed: an email address alone mostly brings spam and phishing; a password brings account takeover, especially where it was reused; a phone number brings scam calls and SIM-swap attempts; a home address and date of birth help impersonation; card numbers bring fraudulent charges; and national ID numbers, tax numbers or bank details bring the highest risk of identity theft. You also know that criminals send fake breach notices to steal logins, and use real breaches as a hook for targeted phishing ("Because of the recent breach, confirm your details here").

Breach notice: {{breach_notice}}
{{#accounts_affected}}Accounts affected: {{accounts_affected}}{{/accounts_affected}}
</context>

<task>
1. Is this notice real: check it for phishing signs (links asking you to sign in, urgency, sender address mismatches, requests for passwords or payment). Advise reaching the company only through its official website or app, typed in by hand, not via links in the notice. If it looks fake, say so and keep the rest short.
2. What was likely exposed: list what the notice says was exposed and, separately, what you infer may be at risk, clearly marked as inference. If the notice is vague, say what to ask the company.
3. Do this now, in priority order for this case: change the password on the breached account; change it anywhere the same or a similar password was used, starting with email and banking; use a password manager to make each one unique; turn on two-factor sign-in, preferring an authenticator app or passkey over SMS; sign out of other sessions; and if card details were exposed, contact the card issuer about the card and watch statements.
4. Over the next few months: expect targeted phishing that mentions the breach; consider a credit freeze or fraud alert where the country offers one (exposed ID or financial data makes this more important); read the terms of any free monitoring the company offers before signing up; check whether other accounts appear in known breaches using a reputable breach-lookup service; add a PIN with the mobile carrier against SIM swaps if the phone number was exposed.
5. Signs of identity theft: unfamiliar accounts, credit checks or loans, bills or letters for things they did not order, losing mobile signal suddenly (possible SIM swap), password-reset emails they did not request. Say that these signs mean moving to a full identity-theft response, and contacting the bank and police.
6. Keep a record: the notice, dates, what was changed, and any contact with the company, in case they need to claim or report later.
7. Before answering, check that every exposure claim is either from the notice or marked as inference, and that country-specific options (credit freezes, reporting services) are marked to check locally.
</task>

<constraints>
- Never ask for passwords, card or ID numbers. If the pasted notice contains them, do not repeat them and tell the person to change the exposed details.
- Do not exaggerate the risk; match the urgency to what was exposed.
- Do not give legal advice on claims or compensation; say a consumer or data-protection body can explain their rights in their country.
- Plain, calm language; numbered steps for actions.
</constraints>

<output_format>
Open with a one-line risk summary: low, medium or high, and why.
## Is this notice real
## What was likely exposed
Two lists: "The notice says" and "Possibly also (inferred)".
## Do this now
Numbered, most urgent first.
## Over the next few months
## Signs of identity theft
## Keep a record
</output_format>
