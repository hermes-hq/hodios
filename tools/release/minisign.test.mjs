import { createHash, randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { blake2b, generateKeyPair, parsePublicKey, parseSecretKey, signManifest, verifyManifest } from './minisign.mjs';

const manifest = Buffer.from('{"schema":1,"catalog":"2026.1003.1","seq":7}\n');

describe('blake2b', () => {
  it('matches the RFC 7693 and libsodium vectors for a 32-byte digest', () => {
    expect(blake2b('', 32).toString('hex')).toBe('0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8');
    expect(blake2b('abc', 32).toString('hex')).toBe('bddd813c634239723171ef3fee98579b94964e3bb1cb3e427262c8c068d52319');
  });

  it('matches Node for a 64-byte digest at every block boundary', () => {
    for (const n of [0, 1, 127, 128, 129, 256, 1000]) {
      const data = randomBytes(n);
      expect(blake2b(data).equals(createHash('blake2b512').update(data).digest())).toBe(true);
    }
  });
});

describe('keys', () => {
  it('generates a minisign key pair whose halves match', () => {
    const pair = generateKeyPair();
    expect(pair.publicKey).toMatch(/^untrusted comment: minisign public key [0-9A-F]{16}\nRW/);
    const sk = parseSecretKey(pair.secretKey);
    const pk = parsePublicKey(pair.publicKey);
    expect(sk.keyId).toBe(pair.keyId);
    expect(pk.keyId).toBe(pair.keyId);
    expect(sk.publicLine).toBe(pk.line);
  });

  it('refuses an empty, damaged or password-protected secret key', () => {
    const pair = generateKeyPair();
    expect(() => parseSecretKey('')).toThrow(/empty/);
    const [comment, line] = pair.secretKey.split('\n');
    const bin = Buffer.from(line, 'base64');
    const flip = (i) => {
      const b = Buffer.from(bin);
      b[i] ^= 1;
      return `${comment}\n${b.toString('base64')}\n`;
    };
    expect(() => parseSecretKey(flip(100))).toThrow(/checksum/);
    const encrypted = Buffer.from(bin);
    encrypted.write('Sc', 2, 'latin1');
    expect(() => parseSecretKey(`${comment}\n${encrypted.toString('base64')}\n`)).toThrow(/password/);
  });

  it('the committed public key is a minisign Ed25519 key', () => {
    const text = readFileSync(new URL('../../keys/manifest-signing.pub', import.meta.url), 'utf8');
    const key = parsePublicKey(text);
    expect(text).toContain(`minisign public key ${key.keyId}`);
    expect(key.line).toMatch(/^RW/);
  });
});

describe('signatures', () => {
  const pair = generateKeyPair();
  const other = generateKeyPair();

  it('accepts a prehashed signature over the exact bytes, with any trusted key', () => {
    const sig = signManifest(manifest, pair.secretKey, { timestamp: 1759000000 });
    expect(sig.split('\n')[2]).toBe('trusted comment: timestamp:1759000000\tfile:manifest.json\thashed');
    expect(verifyManifest(manifest, sig, [pair.publicKey])).toEqual({ ok: true, keyId: pair.keyId });
    // A rotation trusts two keys for a while; the base64 line alone works too.
    expect(verifyManifest(manifest, sig, [other.publicKey, parsePublicKey(pair.publicKey).line])).toEqual({
      ok: true,
      keyId: pair.keyId,
    });
  });

  it('refuses changed bytes, another key, a missing or garbled signature, and an edited trusted comment', () => {
    const sig = signManifest(manifest, pair.secretKey);
    const changed = Buffer.from(manifest);
    changed[3] ^= 1;
    expect(verifyManifest(changed, sig, [pair.publicKey])).toMatchObject({ ok: false, code: 'invalid' });
    expect(verifyManifest(manifest, sig, [other.publicKey])).toMatchObject({
      ok: false,
      code: 'unknown-key',
      reason: expect.stringContaining(pair.keyId),
    });
    expect(verifyManifest(manifest, null, [pair.publicKey])).toMatchObject({ ok: false, code: 'missing' });
    expect(verifyManifest(manifest, 'nonsense', [pair.publicKey])).toMatchObject({ ok: false, code: 'format' });
    const edited = sig.replace('file:manifest.json', 'file:other.json');
    expect(verifyManifest(manifest, edited, [pair.publicKey])).toMatchObject({ ok: false, code: 'invalid' });
  });

  it('refuses a legacy (not prehashed) signature, as Hermes does', () => {
    const sig = signManifest(manifest, pair.secretKey).split('\n');
    const bin = Buffer.from(sig[1], 'base64');
    bin.write('Ed', 0, 'latin1');
    sig[1] = bin.toString('base64');
    expect(verifyManifest(manifest, sig.join('\n'), [pair.publicKey])).toMatchObject({ ok: false, code: 'format' });
  });
});
