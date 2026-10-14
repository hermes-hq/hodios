---
schema: 1
id: choose-spa-token-storage
kind: prompt
title: Choose where a web or mobile app stores auth tokens
description: Decides where a single-page or mobile app keeps its auth tokens (HttpOnly cookies, memory, a backend-for-frontend, secure storage) for its threat model, then implements the choice.
category: security
version: 1.0.0
status: incubating
stage: [design, build]
role: [frontend-engineer, fullstack-engineer, mobile-engineer, architect]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [adr, code]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [token-storage, backend-for-frontend, cookies, authentication]
pairs_with:
  prompts: [implement-jwt-refresh-tokens, implement-token-refresh-interceptor, add-csrf-protection, implement-oauth-login]
  personas: [security-auditor]
args:
  - name: app
    description: The app (SPA, server-rendered, mobile, desktop), how it signs in (own API, OIDC provider), and where the API lives relative to the frontend.
    type: text
    required: true
  - name: current_approach
    description: Where tokens are kept today, if anywhere.
    type: text
  - name: stack
    description: Frontend and backend frameworks. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Decision, Options compared, Implementation, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The question "localStorage or cookies?" usually hides the real trade-off. Any token JavaScript can read (localStorage, sessionStorage, IndexedDB, a non-HttpOnly cookie) can be stolen by one XSS bug and used from the attacker's machine until it expires. Tokens kept only in memory survive XSS slightly better but are lost on reload, so they need a silent refresh, and XSS can still make requests while the page is open. HttpOnly, Secure, SameSite cookies cannot be read by scripts, which limits XSS to acting within the session, but they bring CSRF and need the API on the same site (or careful CORS with credentials). The IETF OAuth working group's guidance for browser-based apps ranks the backend-for-frontend (BFF) pattern as the most secure option: a small server-side component holds the OAuth tokens and gives the browser only an HttpOnly session cookie. Refresh tokens in the browser are the highest-value target; if one must live there, it needs rotation with reuse detection. Mobile apps should use the Keychain on iOS and the Android Keystore (directly or through a library that encrypts with a Keystore key), never plain preferences or AsyncStorage, and OAuth flows there use PKCE through the system browser. Third-party cookie blocking breaks cookies set by an API on a different site, which often decides the design.
</context>

<task>
Decide and implement token storage for {{app}}.
{{#current_approach}}Today: {{current_approach}}{{/current_approach}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the current sign-in, token handling and API client code, and check the domains of frontend and API (same site, subdomains, or different sites).
2. Ask only what the code cannot answer and the choice depends on: whether third parties call the API with the same tokens, whether a server component can be added, and the session length the product needs.
3. Compare the realistic options for this app (HttpOnly session cookie, BFF, in-memory access token with a refresh cookie, platform secure storage for mobile) on XSS impact, CSRF exposure, cross-site cookie limits, refresh behaviour, and effort. Pick one and say why.
4. Implement it with the smallest change: cookie flags and paths, the BFF routes or proxy if chosen, CSRF protection where cookies are used, removal of tokens from web storage including a one-time cleanup for existing users, and secure storage APIs on mobile.
5. Write tests: tokens never appear in web storage or JavaScript-readable cookies, cookie flags are set, CSRF protection works where cookies are used, and the session survives a page reload as required.
6. Run the tests and the type check.
</task>

<constraints>
- Do not present any storage choice as making XSS harmless; say what XSS can still do.
- Stay on where tokens live and how the browser or app sends them. If the app has no token issuance, rotation or reuse detection yet, say so and treat building that as a separate job rather than redesigning the token server here.
- Never store refresh tokens in localStorage or plain mobile preferences.
- If a BFF or cookie change needs infrastructure (a new server route, a domain change), describe it and ask before adding it.
- Keep signed-in users signed in through the change where possible, or say who will be signed out.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Decision
The chosen storage in two or three sentences, and the main reason.
## Options compared
Table: option, XSS impact, CSRF exposure, works with this domain setup, refresh behaviour, effort.
## Implementation
One line per file: `path`, what changed.
## Verification
Tests and commands run, and their actual results.
## Follow-ups
Related hardening that is still needed, such as a Content Security Policy.
</output_format>
