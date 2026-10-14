---
schema: 1
id: harden-aspnet-core-app
kind: prompt
title: Harden an ASP.NET Core app for production
description: Hardens an ASP.NET Core app's authentication and authorization policies, antiforgery, data protection keys, forwarded headers, security headers, CORS and error handling, verified with tests.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [hardening, aspnet-core, authorization, data-protection, owasp]
pairs_with:
  prompts: [harden-web-app-config, harden-jwt-validation, fix-idor-vulnerabilities, review-api-security]
  rules: [aspnet-core-rules]
  personas: [security-auditor]
args:
  - name: app
    description: The ASP.NET Core app (MVC, Razor Pages, Blazor Server or minimal APIs), its .NET version, how it is hosted (Kestrel behind a proxy, IIS, containers, App Service) and how users and services authenticate.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Changes, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ASP.NET Core has strong defaults, and the incidents come from gaps between them. Endpoints are anonymous unless `[Authorize]` or `RequireAuthorization()` is applied; a fallback policy (`options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build()`) makes every endpoint require auth unless marked `[AllowAnonymous]`. Role checks scattered as strings drift; named policies keep them in one place, and resource checks need `IAuthorizationService` with a handler, not just a role. Middleware order matters: `UseRouting`, then `UseAuthentication`, then `UseAuthorization`, with CORS between routing and auth. Data protection keys sign cookies and antiforgery tokens; in containers or several instances without a persisted, protected key ring, users are logged out on every deploy and tokens fail across nodes, so keys need shared storage and encryption at rest. Antiforgery is automatic for Razor Pages and MVC views with forms, but minimal API endpoints taking form data with cookie auth need it explicitly. Behind a proxy, `UseForwardedHeaders` must list `KnownProxies` or `KnownNetworks`, or it ignores headers (wrong scheme, broken redirects) or trusts spoofed ones if cleared. `UseDeveloperExceptionPage` outside Development leaks stack traces; ProblemDetails with a generic message is the production path. JWT bearer validation should keep issuer, audience and lifetime checks on and pin algorithms. HSTS and HTTPS redirection are in templates but often removed, and headers like CSP need middleware.
</context>

<task>
Harden {{app}}.

1. Read `Program.cs` (or `Startup`), the middleware order, authentication and authorization setup, controllers or endpoint maps and their attributes, appsettings per environment, data protection setup, CORS policies and the hosting configuration.
2. Build an endpoint table: route, method, auth requirement (attribute, policy or none), and resource-level check. Flag anonymous endpoints that should not be and endpoints relying only on a role where ownership matters.
3. Fix in code: a fallback policy requiring authenticated users with explicit `[AllowAnonymous]` exceptions; named policies and resource authorization handlers; correct middleware order; persisted, encrypted data protection keys with a stable application name; antiforgery on cookie-authenticated form and minimal API endpoints; forwarded headers limited to known proxies; production exception handling with ProblemDetails; HSTS and HTTPS redirection; a security headers middleware with CSP in report-only first; a named CORS policy with exact origins; cookie options (`Secure`, `HttpOnly`, `SameSite`); JWT validation parameters.
4. Check secrets: connection strings and keys from the environment, user secrets or a vault, never in committed appsettings.
5. Add integration tests with `WebApplicationFactory`: anonymous access to a protected endpoint returns 401, a user accessing another user's resource returns 403 or 404, a form post without an antiforgery token fails, and production errors contain no stack trace. Run the tests and report results.
</task>

<constraints>
- Never put real secrets in code, appsettings, examples or test output.
- Do not apply a fallback auth policy without listing every endpoint it will close and confirming the ones that must stay public.
- Do not clear `KnownProxies` and `KnownNetworks` unless the app is reachable only through the proxy.
- Do not change production configuration or deploy; list the steps.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: issue, location, risk, fix, status (fixed, needs decision, fine).
## Changes
One line per file: `path`, what changed.
## Verification
Tests run with real results.
## Needs a decision
Items for the team, with the recommended choice and its impact.
</output_format>
