import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { SECRET_ENV, SECRET_FILE_ENV, secretKeyFrom, signDir, verifyDir } from './manifest-signing.mjs';
import { generateKeyPair } from './minisign.mjs';

const tool = fileURLToPath(new URL('./manifest-signing.mjs', import.meta.url));

function catalogDir() {
  const dir = mkdtempSync(join(tmpdir(), 'hodios-sign-'));
  writeFileSync(join(dir, 'manifest.json'), '{"schema":1,"catalog":"2026.1003.1","seq":7}\n');
  return dir;
}

describe('secretKeyFrom', () => {
  it('reads the key text from the secret, or the key file', () => {
    const pair = generateKeyPair();
    expect(secretKeyFrom({ [SECRET_ENV]: pair.secretKey })).toBe(pair.secretKey);
    const file = join(catalogDir(), 'k');
    writeFileSync(file, pair.secretKey);
    expect(secretKeyFrom({ [SECRET_FILE_ENV]: file })).toBe(pair.secretKey);
  });

  it('fails clearly without a key, instead of publishing unsigned', () => {
    expect(() => secretKeyFrom({})).toThrow(/HODIOS_MANIFEST_SIGNING_KEY is not set: refusing to publish an unsigned/);
    expect(() => secretKeyFrom({ [SECRET_ENV]: '  ' })).toThrow(/not set/);
  });
});

describe('signDir and verifyDir', () => {
  it('signs manifest.json and verifies it with the matching public key', () => {
    const pair = generateKeyPair();
    const dir = catalogDir();
    expect(verifyDir(dir, pair.publicKey)).toMatchObject({ ok: false, code: 'missing' });
    expect(signDir(dir, pair.secretKey, pair.publicKey)).toBe(pair.keyId);
    expect(verifyDir(dir, pair.publicKey)).toEqual({ ok: true, keyId: pair.keyId });
    writeFileSync(join(dir, 'manifest.json'), '{"schema":1,"catalog":"2026.1003.1","seq":8}\n');
    expect(verifyDir(dir, pair.publicKey)).toMatchObject({ ok: false, code: 'invalid' });
  });

  it('refuses to sign with a key that does not match the published public key', () => {
    const dir = catalogDir();
    expect(() => signDir(dir, generateKeyPair().secretKey, generateKeyPair().publicKey)).toThrow(
      /does not match keys\/manifest-signing.pub/,
    );
  });
});

describe('the command line', () => {
  it('sign fails with a clear message and exit 1 when the secret is missing', () => {
    const env = Object.fromEntries(
      Object.entries(process.env).filter(([k]) => k !== SECRET_ENV && k !== SECRET_FILE_ENV),
    );
    const r = spawnSync(process.execPath, [tool, 'sign', catalogDir()], { env, encoding: 'utf8' });
    expect(r.status).toBe(1);
    expect(r.stderr).toMatch(/HODIOS_MANIFEST_SIGNING_KEY is not set/);
  });

  it('keygen writes a mode-600 secret key, never overwrites one, and verify checks with a given key', () => {
    const dir = catalogDir();
    const sk = join(dir, 'test.key');
    const pk = join(dir, 'test.pub');
    execFileSync(process.execPath, [tool, 'keygen', sk, pk]);
    if (process.platform !== 'win32') expect(statSync(sk).mode & 0o777).toBe(0o600);
    expect(spawnSync(process.execPath, [tool, 'keygen', sk, pk], { encoding: 'utf8' }).stderr).toMatch(
      /refusing to overwrite/,
    );
    signDir(dir, readFileSync(sk, 'utf8'), readFileSync(pk, 'utf8'));
    const out = execFileSync(process.execPath, [tool, 'verify', dir, pk], { encoding: 'utf8' });
    expect(out).toMatch(/verifies with key [0-9A-F]{16}/);
  });
});
