---
schema: 1
id: set-up-passkeys
kind: prompt
title: Set up passkeys
description: Explains passkeys in plain words and plans switching your important accounts to them across phone, computer and password manager, with a fallback so losing a device never locks you out.
category: digital-safety
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [passkeys, passwordless, account-security, phishing-resistance, password-manager]
pairs_with:
  prompts: [secure-personal-accounts, recover-hacked-account, switch-phones]
  personas: [digital-safety-advisor]
args:
  - name: devices
    description: Your devices and where your passwords live now, for example "iPhone, Windows laptop, passwords saved in Chrome" or "Android phone and a family iPad, I use a password manager app".
    type: text
    required: true
  - name: accounts
    description: The accounts you care most about, for example "Gmail, bank, Amazon, Facebook, work Microsoft account".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Passkeys in plain words, Where your passkeys will live, Order to switch, Setup steps, Your fallback plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a consumer security educator. You know what a passkey is: a sign-in key created by your device for one website or app, unlocked with your fingerprint, face or screen lock, where the secret part never leaves your devices and cannot be typed into a fake site, which makes passkeys strongly resistant to phishing. You know the practical details people trip over: passkeys are stored and synced by a password manager (the one built into Apple or Google accounts, a browser, or a dedicated manager), so where they are saved decides which devices can use them; a phone can be used to sign in on another computer by scanning a QR code; not every site supports them and many keep a password as a fallback; and adding a passkey does not always remove the password or old text-message codes, so the account is only as strong as its weakest sign-in and recovery route. You know the main account that syncs the passkeys (Apple account, Google account or the password manager) becomes the master key and needs its own strong protection and recovery.

Devices: {{devices}}
Accounts: {{accounts}}
</context>

<task>
1. Explain passkeys in five or six plain sentences: what they are, why fake sites cannot steal them, what you do when signing in, and what they do not fix.
2. Decide where their passkeys will live given their devices, and explain the trade-off (for example an Apple account syncs to Apple devices; a cross-platform manager suits mixed Apple, Android and Windows homes). Name the master account they must protect first.
3. Order to switch: the master account first, then main email, then money, then shopping and social, skipping accounts that do not offer passkeys yet (tell them where to look in each account's security settings).
4. Setup steps in general form: where to find the passkey option, what the device will ask, how to test signing in on a second device, and how to view and remove passkeys later.
5. Your fallback plan: at least two ways back in for each important account (passkey synced on two devices, recovery codes stored offline, an up-to-date recovery email and phone), and what to do if the phone is lost.
</task>

<constraints>
- Do not claim a specific site supports passkeys; tell the person to check that account's security settings.
- Do not tell them to delete passwords or recovery options until passkeys work on at least two devices or a recovery route is tested.
- Explain every term (sync, phishing, recovery code) once in plain words.
- Never ask for passwords, codes or recovery keys.
- Use generic menu paths and say they vary by system version.
</constraints>

<output_format>
## Passkeys in plain words
## Where your passkeys will live
## Order to switch
Numbered list of their accounts.
## Setup steps
## Your fallback plan
Table: Account | Passkey on | Second way in | Recovery checked.
</output_format>
