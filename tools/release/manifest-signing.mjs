#!/usr/bin/env node
// Signs and verifies catalog/v1/manifest.json, the one mutable file of the catalog (every other object is named by
// its sha256). Hermes IDE refuses a runtime catalog update unless manifest.json.minisig verifies with a key it
// trusts; keys/manifest-signing.pub is that key. See RELEASING.md ("Signing key").
//
// Usage:
//   node tools/release/manifest-signing.mjs sign <catalog-v1-dir>
//       Writes <dir>/manifest.json.minisig with the secret key in $HODIOS_MANIFEST_SIGNING_KEY (the key file's
//       text) or the file named by $HODIOS_MANIFEST_SIGNING_KEY_FILE, then checks it against the public key.
//       Without a key it fails: a catalog is never published unsigned.
//   node tools/release/manifest-signing.mjs verify <catalog-v1-dir> [public-key-file]
//   node tools/release/manifest-signing.mjs keygen <secret-key-file> <public-key-file>
//       A new key pair; the secret key file is created with mode 600 and never overwritten.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generateKeyPair, signManifest, verifyManifest } from './minisign.mjs';

export const SECRET_ENV = 'HODIOS_MANIFEST_SIGNING_KEY';
export const SECRET_FILE_ENV = 'HODIOS_MANIFEST_SIGNING_KEY_FILE';
export const PUBLIC_KEY = fileURLToPath(new URL('../../keys/manifest-signing.pub', import.meta.url));
export const SIGNATURE = 'manifest.json.minisig';

/**
 * The secret key text from the environment, or an error that says what to set.
 * @param {Record<string, string | undefined>} env
 */
export function secretKeyFrom(env) {
  const inline = env[SECRET_ENV];
  if (inline && inline.trim()) return inline;
  const file = env[SECRET_FILE_ENV];
  if (file && file.trim()) {
    if (!existsSync(file)) throw new Error(`${SECRET_FILE_ENV} names ${file}, which does not exist`);
    return readFileSync(file, 'utf8');
  }
  throw new Error(
    `${SECRET_ENV} is not set: refusing to publish an unsigned catalog. In CI, add the secret ` +
      `${SECRET_ENV} to the release environment (the text of the minisign secret key file); locally, set ${SECRET_FILE_ENV} to the key file. ` +
      'See RELEASING.md.',
  );
}

/**
 * Checks `<dir>/manifest.json` against its signature and `publicKey` (a minisign.pub text).
 * @returns {ReturnType<typeof verifyManifest>}
 */
export function verifyDir(dir, publicKey = readFileSync(PUBLIC_KEY, 'utf8')) {
  const manifest = join(dir, 'manifest.json');
  if (!existsSync(manifest)) return { ok: false, code: 'missing', reason: `${manifest} is missing` };
  const sig = join(dir, SIGNATURE);
  return verifyManifest(readFileSync(manifest), existsSync(sig) ? readFileSync(sig, 'utf8') : null, [publicKey]);
}

/** Signs `<dir>/manifest.json` and checks the result against `publicKey`; throws on any failure. */
export function signDir(dir, secretKey, publicKey = readFileSync(PUBLIC_KEY, 'utf8')) {
  const manifest = join(dir, 'manifest.json');
  if (!existsSync(manifest)) throw new Error(`${manifest} is missing; run hodios build first`);
  writeFileSync(join(dir, SIGNATURE), signManifest(readFileSync(manifest), secretKey));
  const check = verifyDir(dir, publicKey);
  if (!check.ok)
    throw new Error(
      `${check.reason}. The signing key does not match keys/manifest-signing.pub: ` +
        'clients would refuse this catalog. Check the secret, or finish the key rotation in RELEASING.md.',
    );
  return check.keyId;
}

function main() {
  const [cmd, a, b] = process.argv.slice(2);
  if (cmd === 'sign' && a) {
    const keyId = signDir(a, secretKeyFrom(process.env));
    console.log(`Signed ${join(a, 'manifest.json')} with key ${keyId}; ${SIGNATURE} verifies.`);
  } else if (cmd === 'verify' && a) {
    const r = verifyDir(a, b ? readFileSync(b, 'utf8') : undefined);
    if (!r.ok) throw new Error(r.reason);
    console.log(`${join(a, SIGNATURE)} verifies with key ${r.keyId}.`);
  } else if (cmd === 'keygen' && a && b) {
    if (existsSync(a)) throw new Error(`${a} exists; refusing to overwrite a signing key`);
    const pair = generateKeyPair();
    writeFileSync(a, pair.secretKey, { mode: 0o600, flag: 'wx' });
    writeFileSync(b, pair.publicKey);
    console.log(
      `Key ${pair.keyId}: secret key in ${a} (mode 600, keep it out of every repository), public key in ${b}.`,
    );
  } else {
    throw new Error(
      'usage: manifest-signing.mjs sign <catalog-v1-dir> | verify <catalog-v1-dir> [public-key-file] | keygen <secret-key-file> <public-key-file>',
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  try {
    main();
  } catch (e) {
    console.error(`error: ${e instanceof Error ? e.message : String(e)}`);
    process.exit(1);
  }
}
