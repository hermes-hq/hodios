---
schema: 1
id: refactor-massive-view-controller
kind: prompt
title: Refactor a massive UIKit view controller
description: Splits an oversized UIKit view controller into child view controllers, data sources, view models and navigation helpers, keeping lifecycle timing, delegate wiring and behaviour unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer]
stack: [ios]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [uikit, view-controllers, mvvm, child-view-controllers]
pairs_with:
  prompts: [migrate-views-to-declarative-ui, decouple-for-testability]
  personas: [swift-ios-engineer]
  rules: [swift-style-rules]
args:
  - name: controller
    description: The view controller to split, as a path or pasted code, whether it uses storyboards or code layout, and the iOS deployment target.
    type: text
    required: true
  - name: test_command
    description: The xcodebuild test command or scheme, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Responsibilities, Proposed split, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an iOS engineer. A massive view controller typically does networking, parsing, caching, table or collection view data source and delegate work, form validation, keyboard handling, navigation and alerts, all in one 2,000-line file. The splits that work in UIKit:

- **Data source and delegate objects** (or `UITableViewDiffableDataSource`) for list handling, owned strongly by the controller because table views hold their data source and delegate weakly; an object created inline and not stored is deallocated and the table goes blank.
- **A view model or presenter** holding state and logic (loading, formatting, validation) with no UIKit imports, so it can be unit tested; it exposes state and callbacks or a publisher.
- **Child view controllers** for independent regions of the screen, added with `addChild`, `view` added to the hierarchy, then `didMove(toParent:)`; done wrong, child lifecycle methods (`viewWillAppear`) do not fire.
- **Navigation** moved to a coordinator or router only if the project already uses one; otherwise a small closure the controller calls.

Lifecycle and wiring traps: code moved out of `viewDidLoad` or `viewWillAppear` must still run at the same moment; `@IBOutlet` and `@IBAction` connections and storyboard segue identifiers break silently when moved to another class; notification observers and KVO must be removed or tied to the right owner's lifetime; closures capturing `self` from the view model create retain cycles unless `[weak self]` is used; and UI updates must stay on the main thread when callbacks come from network queues.
</context>

<task>
Split {{controller}}.

1. Read the controller and list its responsibilities with line ranges: networking, persistence, list data source and delegate, form logic, keyboard, navigation, alerts, layout. Note lifecycle methods and what each triggers, and storyboard outlets, actions and segues.
2. Propose the split (data source objects, view model, child controllers, navigation helper), the ownership of each (who holds strong references), and how the view model reports changes. Follow patterns the project already uses. Wait for approval.
3. Make sure tests cover the logic you move (unit tests for the view model's logic as you extract it) and list the manual checks for UI flows that have no UI tests.
4. Extract in steps: pure logic into the view model, then data source and delegate objects, then child controllers, then navigation. Keep outlet and segue wiring intact, run the build and tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step, and check for retain cycles in new closures.
5. Report the diff, the new file layout, test results and the manual UI checks still to do.
</task>

<constraints>
- Same screens, flows, timing of lifecycle work, and storyboard connections.
- No retain cycles: closures from long-lived objects capture self weakly; UI updates stay on the main thread.
- Do not migrate to SwiftUI, Combine or a new architecture framework in this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, responsibility, lifecycle hook or wiring involved.
## Proposed split
New types, ownership and communication.
## Steps
Numbered steps, each with its check.
## Diff
The change and the new file layout.
## Check
Build and test results, manual UI checks remaining.
</output_format>
