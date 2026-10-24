import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectText, EXAMPLES, MAX_CODE_POINTS } from '../site/inspector.js';
test('look-alike examples report exact replacement characters',() => {
  const youtube = inspectText(EXAMPLES.youtube.text);
  assert.equal(youtube.characters[0].code,'U+0443');
  assert.equal(youtube.characters[0].name,'CYRILLIC SMALL LETTER U');
  assert.deepEqual(youtube.writingSystems,['Cyrillic','Latin']);
  assert.equal(youtube.characters[0].notable,true);
  const paypal = inspectText(EXAMPLES.paypal.text);
  assert.deepEqual(paypal.characters.slice(0,2).map(c=>c.code),['U+0440','U+0430']);
});
test('supplementary characters count as code points, not UTF-16 halves',() => {
  const r = inspectText('A🛡️');
  assert.equal(r.total,3); assert.equal(r.characters[1].code,'U+1F6E1');
  assert.equal(r.characters[2].code,'U+FE0F'); assert.equal(r.characters[2].mark,true);
});
test('text stays unnormalized and combining marks stay separate',() => {
  assert.equal(inspectText('é').total,1);
  const r=inspectText('e\u0301');assert.equal(r.total,2);assert.equal(r.characters[1].code,'U+0301');
});
test('hidden format and bidi controls are identified without rendering as controls',() => {
  const r=inspectText('pay\u200Bpal\u202E');assert.equal(r.formatCount,2);
  for(const c of r.characters.filter(c=>c.format)){assert.equal(c.display,'· ·');assert.equal(c.notable,true);}
});
test('legitimate multilingual text is described without assigning a safety verdict',() => {
  const r=inspectText(EXAMPLES.multilingual.text);assert.deepEqual(r.writingSystems,['Latin','Han']);
  assert.equal(r.characters.filter(c=>c.notable).length,0);assert.equal('safe' in r,false);
});
test('inspection is bounded and reports truncation; empty text is supported',() => {
  assert.equal(inspectText('').total,0);
  const r=inspectText('🛡'.repeat(105));assert.equal(r.characters.length,MAX_CODE_POINTS);assert.equal(r.total,105);assert.equal(r.truncated,true);
});
test('markup-like input remains plain character data and Punycode is not decoded',() => {
  const s='<img src=x onerror=alert(1)>';assert.equal(inspectText(s).characters.map(c=>c.char).join(''),s);
  assert.equal(inspectText('xn--e1afmkfd.xn--p1ai').punycode,true);
});
