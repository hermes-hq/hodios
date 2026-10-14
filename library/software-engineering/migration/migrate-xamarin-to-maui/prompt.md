---
schema: 1
id: migrate-xamarin-to-maui
kind: prompt
title: Migrate a Xamarin app to .NET MAUI
description: Moves a Xamarin.Forms or Xamarin native app to .NET MAUI, covering renderers to handlers, single-project structure, plugin replacements, layout differences and existing user data.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [mobile-engineer, software-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [xamarin, dotnet-maui, custom-renderers, mobile-port, cross-platform]
pairs_with:
  prompts: [port-dotnet-framework-app, plan-incremental-migration, upgrade-major-dependency]
  personas: [dotnet-engineer, migration-engineer]
args:
  - name: app
    description: Xamarin.Forms or native version, platforms targeted, custom renderers and effects, NuGet plugins in use, and how the app stores local data.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Project structure, Changes made, Data continuity, Verification, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Xamarin support ended in May 2024, so a store update now needs a MAUI or .NET for iOS and Android build. Most XAML and view models carry over, but the edges do not. MAUI uses one project with platform folders instead of one head project per platform. Custom renderers still run through a compatibility layer, but the supported path is handlers with property mappers, and effects should become handler customizations. Xamarin.Essentials is folded into MAUI namespaces; Xamarin.CommunityToolkit becomes CommunityToolkit.Maui; many third-party plugins were never ported and need replacements. Layout defaults differ (spacing, `StackLayout` versus `VerticalStackLayout`, `RelativeLayout` only in compatibility), so screens that compile can look wrong. `MessagingCenter` is deprecated in favour of a messenger, and `DependencyService` should become dependency injection in `MauiProgram`. The silent risk is existing users: the bundle id, signing and version code must continue the store listing, and data saved through Xamarin.Essentials secure storage or preferences may not be readable under the same keys, so an update can log everyone out unless it is migrated.
</context>

<task>
App: {{app}}

1. Read the solution and build the inventory: renderers, effects, platform-specific code, plugins, `DependencyService` and `MessagingCenter` uses, and local storage (preferences, secure storage, SQLite paths).
2. For each plugin, find a maintained MAUI-compatible package or a built-in API; list anything without one as a blocker before porting.
3. Create the MAUI project with the same application id, display name, version scheme and signing setup. Move shared code, resources, fonts and images into the single-project structure.
4. Port renderers and effects to handlers or mapper customizations, starting with the ones used on the most screens. Replace `DependencyService` with registrations in `MauiProgram` and `MessagingCenter` with a messenger.
5. Add a one-time migration for secure storage and preferences keys if the storage format or location differs, and confirm the SQLite file path is unchanged.
6. Build and run on each platform. Compare key screens with the Xamarin version for layout differences, then test an in-place upgrade over an installed Xamarin build to confirm users stay signed in and keep their data.
</task>

<constraints>
- Do not rely on the compatibility renderer layer as the end state without saying so as a known debt.
- Do not change the application id, signing identity or version sequence; an accidental change creates a new app in the store.
- Do not claim a plugin has a MAUI version without checking; mark it "to verify".
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: area (renderer, effect, plugin, platform code, storage) | Xamarin item | MAUI replacement | effort.
## Project structure
The new single-project layout, target frameworks and identity settings.
## Changes made
Grouped by area, with files touched.
## Data continuity
How preferences, secure storage and databases carry over for existing users.
## Verification
Per-platform checks on real devices or simulators with results.
## Remaining risks
Bullets, or "None".
</output_format>
