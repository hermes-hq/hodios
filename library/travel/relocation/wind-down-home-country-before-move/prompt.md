---
schema: 1
id: wind-down-home-country-before-move
kind: prompt
title: Wind down your home country before moving
description: Builds a keep, close or pause list for everything you leave behind when moving abroad - phone number and two-factor logins, bank accounts, mail, registrations, contracts and someone to act for you.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, parent]
requires: [none]
inputs: [preferences, notes]
output: [table, checklist, plan]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [moving-abroad, two-factor-authentication, mail-forwarding, cancel-contracts, power-of-attorney]
pairs_with:
  prompts: [plan-tax-move-abroad, plan-relocation-finances, cancel-contract-or-subscription]
args:
  - name: move
    description: The country you are leaving and the one you are moving to, the move date, how long you expect to be away, and whether you might come back.
    type: text
    required: true
  - name: life_at_home
    description: What you have in the home country - bank accounts and cards, phone contract, rent or owned home, car, insurance policies, pension or retirement accounts, subscriptions and memberships, government online accounts, doctors, and anyone who could help on your behalf. A rough list is fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Keep, close or pause, Phone and two-factor access, Money and mail, Official registrations, Someone at home, Timeline, To confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people close down the life they leave behind when they move country, so it does not cause trouble from abroad. You know what bites a year later: a bank that sends a one-time code to a home phone number that was cancelled, so the account is unreachable; a government online account whose login depends on a local number or a card reader left in a drawer; a bank or broker that closes or restricts accounts once it learns the customer is non-resident; mail that keeps going to the old address, including fines and tax letters; contracts with notice periods that keep billing after the move; deregistration from the home address that some countries require and that can change entitlements; voting from abroad that needs registering in advance; and no one at home with authority to sign for you when a paper document is needed. The fix is usually cheap if done before leaving: keep the number on a low-cost plan or move it to an eSIM, move two-factor to an app where possible, keep one account and card that work from abroad, set up mail handling, and give a trusted person a limited power of attorney.

Move: {{move}}
Life at home:
<life_at_home>
{{life_at_home}}
</life_at_home>
</context>

<task>
1. Keep, close or pause: go through everything listed and decide keep, close, pause, transfer or sell, with the notice period to check and the date to act. Add common items the user did not list (gym, library, loyalty schemes, professional memberships, medical and dental records, prescriptions, parking permits, domain names or online accounts tied to a local address).
2. Phone and two-factor access: find every account that uses the home number for codes (banks, government services, email recovery, tax, health), and plan how to keep access: keep the number on the cheapest plan, port it to an eSIM, or switch each account to an authenticator app, with a test before leaving.
3. Money and mail: which bank account and card to keep and how to ask the bank whether it allows non-resident customers, standing orders to keep or cancel, and mail handling (forwarding, a trusted person, or a mail scanning service), with a list of who must get the new address.
4. Official registrations: deregistering from the address where required, telling the tax authority and social security or pension bodies, voting from abroad, the driving licence, the car registration if selling or exporting, and children's school and health records. Frame each as to confirm with the named type of authority.
5. Someone at home: what a trusted person may need to do, and whether a limited power of attorney or a bank third-party mandate makes sense; suggest asking a lawyer or notary how to set it up.
6. Timeline: a dated plan working back from the move date, with actions that need the user present in person flagged early.
7. To confirm: the open questions for a tax adviser, a lawyer or notary, and the bank, phrased as questions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Deregistration, tax residence, pensions, social security and voting rules differ by country. Do not state them as fact; list them as questions with the type of authority or adviser that answers them.
- Do not advise keeping a home address you no longer live at to hide a move from a bank, insurer or authority; say plainly that declaring the move may change what they can keep, and that the bank or insurer must be told.
- Do not invent product names or prices for eSIM, mail or banking services.
</constraints>

<output_format>
## Keep, close or pause
A table: Item | Decision | Notice or deadline to check | Act by.
## Phone and two-factor access
A table: Account | Uses home number? | Plan | Tested?
## Money and mail
## Official registrations
A checklist with who confirms each.
## Someone at home
## Timeline
## To confirm
Questions grouped by adviser.
</output_format>
