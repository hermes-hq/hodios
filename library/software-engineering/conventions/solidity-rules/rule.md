---
schema: 1
id: solidity-rules
kind: rule
title: Solidity rules
description: Standing rules for Solidity smart contracts covering checks-effects-interactions, reentrancy guards, access control, custom errors, pinned compiler, events, safe token calls and upgrade safety.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, security-engineer]
stack: [solidity]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: frontier
level: expert
tags: [smart-contracts, reentrancy, access-control, evm, gas-optimization]
applies_to: ["**/*.sol"]
pairs_with:
  rules: [secure-coding-rules]
  personas: [security-auditor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Solidity in this project:

Deployed contracts are immutable or expensive to change, and bugs lose real money. Treat every change as security-relevant and say clearly that code you write needs an independent audit before handling real value.

**Compiler and dependencies**
- Pin the compiler version (`pragma solidity 0.8.x;` without `^`) to the version the project's toolchain (Foundry or Hardhat) uses. Use 0.8+ checked arithmetic; use `unchecked` only for proven-safe increments with a comment.
- Use audited libraries (OpenZeppelin Contracts or the project's chosen ones) for tokens, access control, reentrancy guards and signatures. Do not hand-roll ERC-20, ERC-721 or ECDSA logic.

**Checks, effects, interactions**
- In every function: validate inputs and permissions first, update state second, and make external calls (transfers, calls to other contracts, token transfers) last.
- Add `nonReentrant` to functions that make external calls and change state, and consider cross-function and read-only reentrancy across the contract.
- Prefer pull payments (users withdraw) over pushing ETH to many addresses in a loop.
- Use `call` for sending ETH and check the return value; never `transfer` or `send` with their fixed gas stipend.
- Use `SafeERC20` for token transfers; some tokens do not return a boolean, charge fees on transfer or rebase. Measure balance changes if the token type is not fixed.

**Access control**
- Every state-changing function has explicit access control (`Ownable2Step`, `AccessControl` roles) or is deliberately public with a comment. Never authorise with `tx.origin`.
- Initialise ownership and roles in the constructor or initialiser; protect initialisers against being called twice or by anyone.

**Errors, events and visibility**
- Use custom errors (`error InsufficientBalance(uint256 available, uint256 required);`) with `revert`, not long revert strings.
- Emit an event for every meaningful state change, with indexed fields for what off-chain systems filter on.
- Declare visibility on every function and state variable. Mark functions `external` when only called from outside, `view` or `pure` where possible. Use `immutable` and `constant` for values set once.

**Known pitfalls**
- Do not use `block.timestamp` or `blockhash` as randomness; use a verifiable randomness source. Allow for small timestamp drift in time checks.
- Guard price-dependent logic against oracle manipulation (no spot prices from a single pool; check oracle staleness).
- Check signatures for replay: include nonce, chain id and contract address (EIP-712), and reject malleable signatures by using the library.
- Avoid unbounded loops over user-growable arrays; they can exceed the block gas limit and lock funds.
- Watch for front-running on approvals, auctions and swaps; add slippage limits and deadlines.

**Upgradeable contracts**
- If the project uses proxies, never change the order or type of existing storage variables; append only, and use the storage layout checks of the upgrade plugin. Disable initialisers in the implementation constructor.

**Before you finish**
- Run the full test suite with Foundry or Hardhat, add tests for the failure paths and access control of every function you changed, run fuzz tests where inputs are numeric, and run Slither or the project's static analysis. Say what you ran. Never deploy to mainnet or use real keys yourself.
