---
schema: 1
id: build-browser-extension
kind: prompt
title: Build a browser extension
description: Builds a Manifest V3 browser extension with the fewest permissions that work, a service worker, content scripts, messaging and packaging for the stores. Use to turn an idea into a working extension.
category: implementation
version: 1.0.0
status: incubating
stage: [build, ship]
role: [frontend-engineer, software-engineer, fullstack-engineer]
stack: [javascript, typescript]
requires: [none]
inputs: [text, spec]
output: [code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [browser-extension, manifest-v3, chrome-extension, firefox-addon, content-scripts]
pairs_with:
  prompts: [build-ui-component, review-pr-for-security]
  personas: [frontend-engineer]
args:
  - name: feature
    description: What the extension should do, on which sites, and when it runs (on a click, on every page load, on a schedule). Mention any data it stores or sends anywhere.
    type: text
    required: true
  - name: browsers
    description: Target browsers, for example "Chrome only", "Chrome and Firefox", "Chrome, Edge and Safari".
    type: text
    default: "Chromium-based browsers (Chrome, Edge, Brave)"
output_contract:
  format: markdown
  sections: [Architecture, Permissions, Files, Cross-browser notes, Load and test, Publishing checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has shipped extensions to the Chrome Web Store and Firefox Add-ons. Manifest V3 changes how extensions are built:
- The background is a service worker that the browser stops when idle. Global variables do not survive; state goes in `chrome.storage`, and event listeners must be registered synchronously at the top level so they fire after a restart. Timers longer than a short while need `chrome.alarms`.
- Remotely hosted code is not allowed: every script must ship in the package. Fetching data is fine; fetching and running code is not.
- Request blocking and modification uses `declarativeNetRequest` rules instead of blocking `webRequest`.
- Content scripts run in an isolated world: they share the page's DOM but not its JavaScript variables.
- Permissions are reviewed by stores and shown to users. `activeTab` plus `scripting` covers "do something to the current page when the user clicks" without any host permission. Broad host permissions like `<all_urls>` slow review and scare users; `optional_permissions` and `optional_host_permissions` let the extension ask at the moment of need.

Firefox supports Manifest V3 with differences: it uses `background.scripts` (event pages) rather than `background.service_worker`, needs `browser_specific_settings.gecko.id`, and offers the promise-based `browser.*` namespace (Chrome's `chrome.*` APIs also return promises in MV3). Safari extensions are packaged through Xcode with Apple's converter. Stores require a single clear purpose, a justification for each permission and a privacy disclosure for any user data.
</context>

<task>
Build this extension.

Feature:
{{feature}}

Target browsers: {{browsers}}

1. If the feature is unclear about which sites it runs on, whether it runs automatically or on click, or what data leaves the browser, ask up to three questions and stop.
2. Describe the architecture: which parts are needed (service worker, content script, popup, options page, side panel), which does what, and the messages between them.
3. Choose the minimum permissions. For each, say why it is needed and what would break without it. Prefer `activeTab`, specific host patterns and optional permissions over broad host access.
4. Write every file: `manifest.json`, the background service worker, content scripts, UI pages and styles. Keep the code plain JavaScript or TypeScript with no build step unless the feature needs one; if it does, say so and give the build configuration.
5. Explain the cross-browser differences for the targets and how the code handles them.
6. Explain how to load it unpacked, inspect the service worker and content script, and test the main flow.
7. List what the store listing needs.
</task>

<constraints>
- No remote code, no `eval`, no inline scripts in extension pages.
- Do not send page content or browsing data off the device unless the feature requires it; if it does, say what is sent, where, and what the privacy disclosure must say.
- Sanitise anything inserted into a page's DOM; use `textContent` rather than `innerHTML` for untrusted text.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Architecture
Components and message flow, as a short list or diagram in a code block.
## Permissions
Table: Permission | Why | What breaks without it.
## Files
One code block per file, with its path as a heading.
## Cross-browser notes
Bullets per target browser.
## Load and test
Numbered steps.
## Publishing checklist
A checklist covering purpose statement, permission justifications, privacy disclosure, icons and screenshots, and version numbering.
</output_format>
