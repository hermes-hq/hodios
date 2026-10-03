// minisign keys and signatures for the catalog manifest, in plain Node (no minisign binary needed).
//
// Format (https://jedisct1.github.io/minisign/), the one Hermes IDE verifies with the minisign-verify crate:
//   - signature: prehashed Ed25519 ("ED"): Ed25519 over BLAKE2b-512 of the exact manifest.json bytes, published
//     next to it as manifest.json.minisig. Line 2 carries the 8-byte key id, so keys can rotate.
//   - public key: the minisign.pub text; its base64 line ("RWQ…") is what clients compile in.
//   - secret key: a minisign secret key file without a password (kdf "\0\0"), which `minisign -S -s <file>` also
//     reads. It never goes into the repository: CI reads it from the HODIOS_MANIFEST_SIGNING_KEY secret.
import {
  createHash,
  createPrivateKey,
  createPublicKey,
  generateKeyPairSync,
  randomBytes,
  sign,
  verify,
} from 'node:crypto';

// ─── BLAKE2b (RFC 7693) ─────────────────────────────────────────────────
// Node's crypto has BLAKE2b-512 only; the secret key checksum is BLAKE2b-256, which is not a truncation.

const MASK = (1n << 64n) - 1n;
const IV = [
  0x6a09e667f3bcc908n,
  0xbb67ae8584caa73bn,
  0x3c6ef372fe94f82bn,
  0xa54ff53a5f1d36f1n,
  0x510e527fade682d1n,
  0x9b05688c2b3e6c1fn,
  0x1f83d9abfb41bd6bn,
  0x5be0cd19137e2179n,
];
const SIGMA = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
  [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
  [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
  [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
  [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
];
const rotr = (x, n) => ((x >> n) | (x << (64n - n))) & MASK;

/** @param {bigint[]} h @param {Uint8Array} block 128 bytes @param {bigint} t bytes so far @param {boolean} last */
function compress(h, block, t, last) {
  const m = [];
  for (let i = 0; i < 16; i++) m.push(Buffer.from(block.subarray(i * 8, i * 8 + 8)).readBigUInt64LE(0));
  const v = [...h, ...IV];
  v[12] ^= t & MASK;
  v[13] ^= t >> 64n;
  if (last) v[14] ^= MASK;
  /** @param {number} a @param {number} b @param {number} c @param {number} d @param {bigint} x @param {bigint} y */
  const g = (a, b, c, d, x, y) => {
    v[a] = (v[a] + v[b] + x) & MASK;
    v[d] = rotr(v[d] ^ v[a], 32n);
    v[c] = (v[c] + v[d]) & MASK;
    v[b] = rotr(v[b] ^ v[c], 24n);
    v[a] = (v[a] + v[b] + y) & MASK;
    v[d] = rotr(v[d] ^ v[a], 16n);
    v[c] = (v[c] + v[d]) & MASK;
    v[b] = rotr(v[b] ^ v[c], 63n);
  };
  for (let r = 0; r < 12; r++) {
    const s = SIGMA[r % 10];
    g(0, 4, 8, 12, m[s[0]], m[s[1]]);
    g(1, 5, 9, 13, m[s[2]], m[s[3]]);
    g(2, 6, 10, 14, m[s[4]], m[s[5]]);
    g(3, 7, 11, 15, m[s[6]], m[s[7]]);
    g(0, 5, 10, 15, m[s[8]], m[s[9]]);
    g(1, 6, 11, 12, m[s[10]], m[s[11]]);
    g(2, 7, 8, 13, m[s[12]], m[s[13]]);
    g(3, 4, 9, 14, m[s[14]], m[s[15]]);
  }
  for (let i = 0; i < 8; i++) h[i] ^= v[i] ^ v[i + 8];
}

/** Unkeyed BLAKE2b with an `outlen`-byte digest (1–64). Meant for small inputs (key checksums, tests). */
export function blake2b(data, outlen = 64) {
  const bytes = Buffer.from(data);
  const h = [...IV];
  h[0] ^= 0x01010000n ^ BigInt(outlen);
  let t = 0n;
  let off = 0;
  while (bytes.length - off > 128) {
    t += 128n;
    compress(h, bytes.subarray(off, off + 128), t, false);
    off += 128;
  }
  const last = Buffer.alloc(128);
  bytes.copy(last, 0, off);
  t += BigInt(bytes.length - off);
  compress(h, last, t, true);
  const out = Buffer.alloc(64);
  h.forEach((w, i) => out.writeBigUInt64LE(w, i * 8));
  return out.subarray(0, outlen);
}

// ─── Keys ───────────────────────────────────────────────────────────────

const b64url = (b) => Buffer.from(b).toString('base64url');

/** minisign prints a key id as the little-endian u64 of its 8 bytes, in upper-case hex. */
export const keyIdHex = (keynum) => Buffer.from(keynum).reverse().toString('hex').toUpperCase();

/**
 * Reads the base64 line of a minisign text (the line after "untrusted comment:", or a bare base64 line).
 * @param {string} text
 */
function payload(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const line = lines[0]?.startsWith('untrusted comment:') ? lines[1] : lines[0];
  if (!line) throw new Error('empty minisign text');
  return Buffer.from(line, 'base64');
}

/**
 * A minisign public key, from the minisign.pub text or its base64 line.
 * @param {string} text
 * @returns {{keynum: Buffer, keyId: string, publicKey: import('node:crypto').KeyObject, line: string}}
 */
export function parsePublicKey(text) {
  const bin = payload(text);
  if (bin.length !== 42 || bin.subarray(0, 2).toString('latin1') !== 'Ed')
    throw new Error('not a minisign Ed25519 public key');
  const keynum = bin.subarray(2, 10);
  const publicKey = createPublicKey({
    key: { kty: 'OKP', crv: 'Ed25519', x: b64url(bin.subarray(10)) },
    format: 'jwk',
  });
  return { keynum, keyId: keyIdHex(keynum), publicKey, line: bin.toString('base64') };
}

/**
 * A minisign secret key without a password. Encrypted keys are refused: CI has no terminal to type into.
 * @param {string} text the whole secret key file
 * @returns {{keynum: Buffer, keyId: string, privateKey: import('node:crypto').KeyObject, publicLine: string}}
 */
export function parseSecretKey(text) {
  let bin;
  try {
    bin = payload(text);
  } catch {
    throw new Error('the signing key is empty');
  }
  if (bin.length !== 158 || bin.subarray(0, 2).toString('latin1') !== 'Ed')
    throw new Error('the signing key is not a minisign Ed25519 secret key');
  if (bin[2] !== 0 || bin[3] !== 0)
    throw new Error('the signing key is password-protected; the release needs one without a password');
  if (bin.subarray(4, 6).toString('latin1') !== 'B2') throw new Error('the signing key has an unknown checksum type');
  const keynum = bin.subarray(54, 62);
  const sk = bin.subarray(62, 126);
  const chk = bin.subarray(126, 158);
  if (!blake2b(Buffer.concat([bin.subarray(0, 2), keynum, sk]), 32).equals(chk))
    throw new Error('the signing key is damaged (checksum mismatch)');
  const seed = sk.subarray(0, 32);
  const pk = sk.subarray(32, 64);
  const privateKey = createPrivateKey({
    key: { kty: 'OKP', crv: 'Ed25519', d: b64url(seed), x: b64url(pk) },
    format: 'jwk',
  });
  const publicLine = Buffer.concat([Buffer.from('Ed', 'latin1'), keynum, pk]).toString('base64');
  return { keynum, keyId: keyIdHex(keynum), privateKey, publicLine };
}

/**
 * A new key pair, as the texts of a minisign secret key file (no password) and a minisign.pub.
 * @returns {{secretKey: string, publicKey: string, keyId: string}}
 */
export function generateKeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const jwk = privateKey.export({ format: 'jwk' });
  const seed = Buffer.from(/** @type {string} */ (jwk.d), 'base64url');
  const pk = Buffer.from(/** @type {string} */ (publicKey.export({ format: 'jwk' }).x), 'base64url');
  const keynum = randomBytes(8);
  const sk = Buffer.concat([seed, pk]);
  const sigAlg = Buffer.from('Ed', 'latin1');
  const chk = blake2b(Buffer.concat([sigAlg, keynum, sk]), 32);
  const bin = Buffer.concat([
    sigAlg,
    Buffer.from([0, 0]), // kdf: none
    Buffer.from('B2', 'latin1'),
    Buffer.alloc(32 + 8 + 8), // kdf salt, opslimit, memlimit (unused without a password)
    keynum,
    sk,
    chk,
  ]);
  const keyId = keyIdHex(keynum);
  return {
    secretKey: `untrusted comment: minisign secret key ${keyId} (hodios manifest signing, no password)\n${bin.toString('base64')}\n`,
    publicKey: `untrusted comment: minisign public key ${keyId}\n${Buffer.concat([sigAlg, keynum, pk]).toString('base64')}\n`,
    keyId,
  };
}

// ─── Signatures ─────────────────────────────────────────────────────────

/**
 * The .minisig text for `data`: prehashed Ed25519 plus the signed trusted comment.
 * @param {Uint8Array} data
 * @param {string} secretKeyText
 * @param {{file?: string, timestamp?: number}} [opts]
 */
export function signManifest(data, secretKeyText, { file = 'manifest.json', timestamp } = {}) {
  const key = parseSecretKey(secretKeyText);
  const sig = sign(null, blake2b512(data), key.privateKey);
  const trusted = `timestamp:${timestamp ?? Math.floor(Date.now() / 1000)}\tfile:${file}\thashed`;
  const global = sign(null, Buffer.concat([sig, Buffer.from(trusted, 'utf8')]), key.privateKey);
  return [
    `untrusted comment: signature from hodios manifest key ${key.keyId}`,
    Buffer.concat([Buffer.from('ED', 'latin1'), key.keynum, sig]).toString('base64'),
    `trusted comment: ${trusted}`,
    global.toString('base64'),
    '',
  ].join('\n');
}

const blake2b512 = (data) => createHash('blake2b512').update(data).digest();

/**
 * Checks a .minisig text over `data` against any of `publicKeys` (minisign.pub texts or base64 lines), as Hermes
 * does: prehashed signatures only, the key id must be one of the keys, and the trusted comment must verify too.
 * @param {Uint8Array} data
 * @param {string | null | undefined} signatureText
 * @param {string[]} publicKeys
 * @returns {{ok: true, keyId: string} | {ok: false, code: 'missing' | 'format' | 'unknown-key' | 'invalid', reason: string}}
 */
export function verifyManifest(data, signatureText, publicKeys) {
  if (!signatureText) return { ok: false, code: 'missing', reason: 'manifest.json.minisig is missing' };
  const lines = signatureText.split(/\r?\n/);
  const bin = Buffer.from(lines[1]?.trim() ?? '', 'base64');
  const trustedLine = lines[2] ?? '';
  const global = Buffer.from(lines[3]?.trim() ?? '', 'base64');
  if (
    !lines[0]?.startsWith('untrusted comment:') ||
    bin.length !== 74 ||
    !trustedLine.startsWith('trusted comment: ') ||
    global.length !== 64
  )
    return { ok: false, code: 'format', reason: 'manifest.json.minisig is not a minisign signature' };
  if (bin.subarray(0, 2).toString('latin1') !== 'ED')
    return {
      ok: false,
      code: 'format',
      reason: 'manifest.json.minisig is not prehashed (minisign -H); Hermes refuses it',
    };
  const keynum = bin.subarray(2, 10);
  const sig = bin.subarray(10);
  const key = publicKeys.map(parsePublicKey).find((k) => k.keynum.equals(keynum));
  if (!key)
    return {
      ok: false,
      code: 'unknown-key',
      reason: `manifest.json.minisig was made with key ${keyIdHex(keynum)}, not with ${publicKeys.map((k) => parsePublicKey(k).keyId).join(' or ') || 'a trusted key'}`,
    };
  const trusted = Buffer.from(trustedLine.slice('trusted comment: '.length), 'utf8');
  if (
    !verify(null, blake2b512(data), key.publicKey, sig) ||
    !verify(null, Buffer.concat([sig, trusted]), key.publicKey, global)
  )
    return { ok: false, code: 'invalid', reason: `manifest.json.minisig does not verify with key ${key.keyId}` };
  return { ok: true, keyId: key.keyId };
}
