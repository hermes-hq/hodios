import { describe, expect, it } from 'vitest';
import { renderTerminalSvg, wrap } from './record-cli.mjs';

describe('wrap', () => {
  it('keeps short lines and breaks long ones at spaces, keeping the indent', () => {
    expect(wrap('abc', 5)).toEqual(['abc']);
    expect(wrap('  one two three', 9)).toEqual(['  one two', '  three']);
  });
  it('cuts a word longer than the width', () => {
    expect(wrap('abcdefghij', 4)).toEqual(['abcd', 'efgh', 'ij']);
  });
});

describe('renderTerminalSvg', () => {
  it('draws every command and output line, escaped, in order', () => {
    const svg = renderTerminalSvg(
      [
        { prompt: '$', command: 'echo <hi>', output: '<hi>\n' },
        { prompt: '$', command: 'true', output: '' },
      ],
      { title: 'demo' },
    );
    expect(svg).toMatch(/^<svg xmlns/);
    expect(svg).toContain('<title>demo</title>');
    expect(svg).toContain('>$ echo &lt;hi&gt;</text>');
    expect(svg.indexOf('$ echo')).toBeLessThan(svg.indexOf('>&lt;hi&gt;</text>'));
    expect(svg.indexOf('>&lt;hi&gt;</text>')).toBeLessThan(svg.indexOf('>$ true</text>'));
    expect(svg).not.toContain('<hi>');
  });
});
