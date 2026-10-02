#!/usr/bin/env node
// Catalog CalVer: YYYY.MDD.PATCH (MDD = month * 100 + day; PATCH counts same-day releases).
// Valid semver, monotonic, and a same-day hotfix (2026.1002.1) sorts above the day's first release.
//
// Usage (CI): node tools/release/calver.mjs [existing tags...]        -> prints the next version
//             node tools/release/calver.mjs --seq [existing tags...]  -> prints the next manifest seq
//             (pass it to `hodios build --seq`)
import { pathToFileURL } from 'node:url';

/** @param {Date} date */
export function dayPrefix(date) {
  const year = date.getUTCFullYear();
  const mdd = (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
  return `${year}.${mdd}`;
}

/**
 * @param {Date} date release time (UTC)
 * @param {string[]} existingTags tags such as v2026.1002.0
 * @returns {string} the next catalog version, without the leading v
 */
export function nextCalver(date, existingTags) {
  const prefix = dayPrefix(date);
  const patches = existingTags
    .map((t) => t.replace(/^v/, ''))
    .filter((v) => v.startsWith(`${prefix}.`))
    .map((v) => Number(v.slice(prefix.length + 1)))
    .filter((n) => Number.isInteger(n) && n >= 0);
  const patch = patches.length === 0 ? 0 : Math.max(...patches) + 1;
  return `${prefix}.${patch}`;
}

/**
 * The manifest `seq` for the next release: one step per catalog release, so it only goes up.
 * @param {string[]} existingTags tags such as v2026.1002.0
 * @returns {number}
 */
export function nextSeq(existingTags) {
  return existingTags.filter((t) => /^v?20\d{2}\.\d+\.\d+$/.test(t)).length;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const args = process.argv.slice(2);
  if (args[0] === '--seq') console.log(nextSeq(args.slice(1)));
  else console.log(nextCalver(new Date(), args));
}
