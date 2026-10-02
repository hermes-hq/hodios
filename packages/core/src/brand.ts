/** The brand lives here and in the repo names only. Renaming the project starts in this file. */
export const BRAND = {
  name: 'Hodios',
  tagline: 'Hodios — prompts by Hermes IDE',
  cli: 'hodios',
  npmScope: '@hermes-hq',
  sourceRepo: 'hermes-hq/hodios',
  distRepo: 'hermes-hq/hodios-dist',
  site: 'https://hermes-ide.com/prompts',
  marketplace: 'hodios',
  contentLicense: 'CC0-1.0',
  codeLicense: 'Apache-2.0',
} as const;

/** Canonical page for an entry; stamped into every export as `metadata.source`. */
export function entryUrl(id: string): string {
  return `${BRAND.site}/${id}`;
}
