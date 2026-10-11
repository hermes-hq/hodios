---
schema: 1
id: write-api-authentication-guide
kind: prompt
title: Write an API authentication guide
description: Writes the authentication page for an API covering API keys or OAuth 2.0 flows, scopes, token lifetime and refresh, auth errors and safe secret storage, with working examples.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, developer-advocate, backend-engineer]
requires: [repo-read, file-write]
inputs: [repo, spec, text]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [api-auth, oauth, api-keys, developer-experience]
pairs_with:
  prompts: [write-api-quickstart, document-api-conventions]
args:
  - name: auth_details
    description: How the API authenticates, from code, the OpenAPI securitySchemes or the auth server config.
    type: text
    required: true
  - name: languages
    description: Languages for the code samples.
    type: string
    default: curl, JavaScript and Python
output_contract:
  format: markdown
  sections: [Page written, Security concerns, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication is where most integrations stall, and support tickets show the same causes: the wrong OAuth flow for the app type, a missing scope, a token that expired after an hour with no refresh logic, a redirect URI that does not match exactly, keys pasted into frontend code. A good guide starts by telling the reader which method fits their situation (server-to-server, a user-facing web app, a mobile or single-page app, a CLI), then gives the exact steps and requests for that method. Flow choice follows current OAuth guidance: authorization code with PKCE for apps acting for users (including SPAs and mobile), client credentials for machine-to-machine, device code for input-constrained devices; the implicit and password grants are not recommended.
</context>

<task>
Write the authentication guide for an API that works like this:

<auth_details>
{{auth_details}}
</auth_details>

1. Confirm the facts from code or config: methods supported, token endpoint and authorize URLs, grant types enabled, scopes and what each allows, token lifetimes, refresh token rotation, key formats and prefixes, where credentials are sent (header name), and the exact error responses for missing, invalid, expired and insufficient-scope credentials.
2. Open with "Choose a method": a short table mapping app type to the method to use.
3. For each supported method, write numbered steps: getting credentials (where in the dashboard or how to request), the exact HTTP requests with every required parameter, the response, and how to call the API with the result. Give samples in {{languages}}.
4. Document scopes in a table: scope, what it grants, endpoints it covers.
5. Explain token lifetime and refresh: when to refresh, rotation, what happens to old refresh tokens, clock skew.
6. Document the auth errors: status, error code, cause, fix. Include the `WWW-Authenticate` header if the API sends it.
7. Add a "Keeping credentials safe" section: environment variables or a secret manager, never in frontend bundles or repos, rotating and revoking keys, and least-privilege scopes.
8. Test the requests against a sandbox if available and report the result.
</task>

<constraints>
- Never recommend the implicit or password grant, even if the server enables them; if it does, list that under "Security concerns".
- Use obviously fake credentials in samples (for example `sk_test_EXAMPLE`) and never real-looking secrets.
- Every endpoint, parameter, lifetime and error code must come from the source; mark unknowns as "to confirm".
- Do not describe auth internals that help attackers (signing key locations, internal admin bypasses).
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide page. Then reply with:
## Page written
Path, methods covered, and whether samples were tested.
## Security concerns
Risky options the API allows (long-lived tokens, implicit grant, keys in query strings).
## Questions for the owners
Facts you could not confirm.
</output_format>
