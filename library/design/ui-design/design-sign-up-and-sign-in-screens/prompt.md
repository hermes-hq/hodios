---
schema: 1
id: design-sign-up-and-sign-in-screens
kind: prompt
title: Design sign-up and sign-in screens
description: Designs sign-up, sign-in and account recovery screens with the right sign-in methods, minimal fields, passkeys, two-factor steps, exact error copy and recovery paths.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sign-in, sign-up, passkeys, two-factor, password-reset, account-recovery]
pairs_with:
  prompts: [spec-sign-in-and-session-rules, implement-passkey-login, design-form-experience, write-ux-microcopy, design-onboarding-flow]
  personas: [product-designer]
args:
  - name: product_context
    description: What the product is, who signs up (consumers, business users invited by an admin), platforms, sign-in methods you have or are considering (password, email link, passkeys, social, SSO), whether two-factor is required, and known problems such as drop-off or lockout tickets.
    type: text
    required: true
  - name: constraints
    description: Identity provider limits, security or compliance requirements already decided, brand rules, anything fixed. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Method choice, Screen list, Sign-up, Sign-in, Two-factor, Account recovery, Errors and edge states, Accessibility, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication screens are where products lose people before they see any value. The recurring failures: asking for profile data at sign-up that could wait, password rules shown only after a failed submit, separate "sign in" and "sign up" paths that confuse returning users who forgot which they used, social buttons that create duplicate accounts, error messages that either reveal whether an email is registered or say nothing useful, recovery flows that dead-end, and two-factor setups with no backup path. Good auth design asks for the least, recognises returning users, supports password managers and passkeys, and treats lockout and recovery as first-class screens, while staying honest about security trade-offs.
</context>

<task>
<product_context>
{{product_context}}
</product_context>
{{#constraints}}

<auth_constraints>
{{constraints}}
</auth_constraints>
{{/constraints}}

If you do not know what the product is or who signs up, ask and stop. Other gaps become assumptions marked [confirm].

1. **Method choice.** Recommend the sign-in methods for this audience and say why: for example email plus password with passkeys offered after sign-up, email link or one-time code for infrequent users, social sign-in only where the audience already uses that provider, SSO for business accounts detected from the email domain. Name the trade-off of each (email links depend on inbox access; social sign-in risks duplicate accounts).
2. **Screen list.** Every screen and state from landing to signed in: identifier-first entry (email first, then route to the right method), sign-up, sign-in, verify email, two-factor setup and challenge, forgot password, reset, locked account, and signed-out states.
3. **Sign-up.** Fields in order with label, input type, autocomplete value (email, new-password, one-time-code) and whether required. Ask only what is needed to create the account; move profile questions to after sign-up. Show password rules before typing and check them live; allow paste and show/hide. Consent and terms placement without pre-ticked marketing boxes.
4. **Sign-in.** Identifier-first flow, "remember me" behaviour, passkey prompt and fallback, what happens when an email belongs to an SSO domain or a social account.
5. **Two-factor.** When to require it, setup steps with authenticator app or passkey preferred over SMS where the audience can use them, backup codes and how they are presented, and the challenge screen with "use another method".
6. **Account recovery.** Forgot password, expired or used reset links, lost two-factor device, changed email, and how support verifies identity, with the screen and message for each step.
7. **Errors and edge states.** Exact copy and recovery for: wrong password, unknown email (worded so it does not confirm whether an account exists, unless the product decides enumeration is acceptable and says so), rate limited, account locked, unverified email, link expired, social account already linked elsewhere, network failure. Never clear the typed email.
8. **Accessibility.** Meet WCAG 2.2 Accessible Authentication (Minimum), 3.3.8: no step that relies on memorising, transcribing or solving a puzzle unless an alternative exists, so allow paste and password managers, support passkeys or email links, and give any CAPTCHA a non-cognitive alternative. Also: visible labels, errors associated with their fields, focus moved to the error summary or first error, one-time-code inputs that accept paste and work with screen readers, and a warning with a way to extend before any timeout.
9. **Metrics.** Sign-up completion by step, sign-in success rate, reset requests per active user, two-factor setup rate and lockout tickets.
</task>

<constraints>
- Do not state security standards or regulations as requirements for this product; mark them as items to confirm with the security owner.
- Never recommend storing or showing passwords in ways that weaken security, disabling paste, or forced periodic password changes.
- No dark patterns: no pre-ticked marketing consent, no hidden "skip" for optional steps, no making account deletion harder than sign-up.
- Every error state has both the message and the next action.
{{> output/uncertainty}}
</constraints>

<output_format>
## Method choice
Recommended methods with reasons and trade-offs.
## Screen list
Numbered screens and states with entry points.
## Sign-up
| Field | Label | Input type and autocomplete | Required | Notes |
## Sign-in
## Two-factor
## Account recovery
## Errors and edge states
| Situation | Message (exact copy) | Next action |
## Accessibility
## Metrics
</output_format>
