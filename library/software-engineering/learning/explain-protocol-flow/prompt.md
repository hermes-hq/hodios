---
schema: 1
id: explain-protocol-flow
kind: prompt
title: Explain a protocol flow step by step
description: Explains a protocol flow such as OAuth 2.0 with PKCE, OpenID Connect, a TLS handshake, JWT session auth, CORS preflight or an HTTP request's lifecycle as a numbered sequence diagram.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, backend-engineer, security-engineer, student]
stack: []
requires: [none]
inputs: [topic, logs]
output: [explanation, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sequence-diagram, authentication, networking, web-protocols]
pairs_with:
  prompts: [implement-oauth-login, fix-oauth-login-error, explain-concept-with-code]
args:
  - name: protocol
    description: The flow to explain, as specific as you can (for example "OAuth authorization code with PKCE for a single-page app", "TLS 1.3 handshake", "CORS preflight").
    type: string
    required: true
  - name: setup
    description: Your actual setup, such as the identity provider, frameworks, or a captured request log or HAR excerpt with secrets removed.
    type: text
  - name: question
    description: The thing you are trying to understand, such as "where does the refresh token live".
    type: text
output_contract:
  format: markdown
  sections: [The parties, Sequence diagram, Step by step, What protects what, Common mistakes, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Protocol flows are taught as diagrams of arrows, but understanding comes from knowing what each message carries, who can see it, and which attack each step blocks. In OAuth the authorization code travels through the browser and is useless without the PKCE verifier; the `state` parameter stops login CSRF; the access token is for the API and the ID token is for the client. In TLS the certificate proves the server's identity only if the chain and hostname are checked. A JWT is signed, not encrypted, and cannot be revoked before it expires. A CORS preflight is the browser asking permission, so server-side tools such as curl never see CORS errors. Explanations go wrong by mixing flows (implicit versus code), versions (TLS 1.2 versus 1.3) or token types.
</context>

<task>
Explain this protocol flow: {{protocol}}
{{#setup}}
The learner's setup or captured traffic: {{setup}}
{{/setup}}
{{#question}}
The learner's question: {{question}}
{{/question}}

1. Pin down exactly which flow and version you are explaining. If the request is ambiguous (OAuth for a server app versus a single-page app, TLS 1.2 versus 1.3), choose the one that fits the setup, say so, and note how the other differs in one line.
2. List the parties (browser, client app, authorization server, resource server, client, server, DNS, proxy) and what each knows or holds at the start.
3. Draw a Mermaid sequenceDiagram with numbered messages.
4. Explain each step: who sends what to whom, the key fields or parameters it carries (names as in the specification), what the receiver checks, and what is stored afterwards and where.
5. Explain what protects what: which step blocks which attack (interception, replay, CSRF, token theft, impersonation) and what the flow does not protect against.
6. List the common implementation mistakes for this flow and the symptom each produces. If traffic was given, map each captured request to its step and point out anything missing or unexpected.
7. Answer the learner's question directly, tied to the step number.
</task>

<constraints>
- Use the field and parameter names from the relevant specification and say which specification or version the explanation follows.
- Do not recommend deprecated flows (such as the OAuth implicit grant or the password grant for third parties) as current practice; mention them only as history.
- If captured traffic contains tokens, secrets or cookies, do not repeat them; say they should be rotated if they were real.
{{> output/uncertainty}}
</constraints>

<output_format>
## The parties
A table: party, role, holds at start.
## Sequence diagram
Mermaid sequenceDiagram.
## Step by step
Numbered steps matching the diagram.
## What protects what
A table: step or mechanism, attack it blocks.
## Common mistakes
Bullets: mistake, symptom. Then the answer to the learner's question.
## Questions
What about the setup would change the explanation.
</output_format>
