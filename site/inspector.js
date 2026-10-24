export const MAX_CODE_POINTS = 100;
export const EXAMPLES = {
  youtube: { text: 'уoutube.com', note: 'The first letter is Cyrillic у (U+0443), not Latin y (U+0079). The spelling looks familiar, but the characters are different.' },
  paypal: { text: 'раypal.com', note: 'The first two letters are Cyrillic р (U+0440) and а (U+0430), not Latin p and a. This is an illustrative look-alike, not a report about a website.' },
  multilingual: { text: 'café 東京', note: 'Latin letters, an accented letter, and Japanese kanji can belong together. Multiple writing systems alone do not establish deception.' },
  invisible: { text: 'pay\u200Bpal.com', note: 'There is a zero-width space (U+200B) after “pay”. Some characters affect text without drawing a visible letter. This text is not being evaluated as a valid domain.' }
};

const scripts = [
  ['Latin', /\p{Script=Latin}/u], ['Cyrillic', /\p{Script=Cyrillic}/u],
  ['Greek', /\p{Script=Greek}/u], ['Han', /\p{Script=Han}/u],
  ['Hiragana', /\p{Script=Hiragana}/u], ['Katakana', /\p{Script=Katakana}/u],
  ['Hangul', /\p{Script=Hangul}/u], ['Arabic', /\p{Script=Arabic}/u],
  ['Hebrew', /\p{Script=Hebrew}/u], ['Devanagari', /\p{Script=Devanagari}/u],
  ['Thai', /\p{Script=Thai}/u], ['Inherited', /\p{Script=Inherited}/u],
  ['Common', /\p{Script=Common}/u]
];
const names = new Map([
  ['а','CYRILLIC SMALL LETTER A'],['А','CYRILLIC CAPITAL LETTER A'],
  ['р','CYRILLIC SMALL LETTER ER'],['Р','CYRILLIC CAPITAL LETTER ER'],
  ['у','CYRILLIC SMALL LETTER U'],['У','CYRILLIC CAPITAL LETTER U'],
  ['о','CYRILLIC SMALL LETTER O'],['О','CYRILLIC CAPITAL LETTER O'],
  ['е','CYRILLIC SMALL LETTER IE'],['Е','CYRILLIC CAPITAL LETTER IE'],
  ['с','CYRILLIC SMALL LETTER ES'],['х','CYRILLIC SMALL LETTER HA'],
  ['ο','GREEK SMALL LETTER OMICRON'],['υ','GREEK SMALL LETTER UPSILON'],
  ['é','LATIN SMALL LETTER E WITH ACUTE'],['東','CJK UNIFIED IDEOGRAPH-6771'],
  ['京','CJK UNIFIED IDEOGRAPH-4EAC'],['.','FULL STOP'],['-','HYPHEN-MINUS'],
  ['_','LOW LINE'],['/','SOLIDUS'],[':','COLON'],['@','COMMERCIAL AT'],
  [' ','SPACE'],['\t','CHARACTER TABULATION'],['\n','LINE FEED'],
  ['\u200B','ZERO WIDTH SPACE'],['\u200C','ZERO WIDTH NON-JOINER'],
  ['\u200D','ZERO WIDTH JOINER'],['\u200E','LEFT-TO-RIGHT MARK'],
  ['\u200F','RIGHT-TO-LEFT MARK'],['\u202E','RIGHT-TO-LEFT OVERRIDE'],
  ['\uFEFF','ZERO WIDTH NO-BREAK SPACE'],['\u0301','COMBINING ACUTE ACCENT']
]);
const illustratedLookalikes = new Set(Array.from('аАрРуУоОеЕсхου'));
function characterName(char) {
  if (names.has(char)) return names.get(char);
  if (/^[A-Z]$/.test(char)) return `LATIN CAPITAL LETTER ${char}`;
  if (/^[a-z]$/.test(char)) return `LATIN SMALL LETTER ${char.toUpperCase()}`;
  if (/^[0-9]$/.test(char)) return `DIGIT ${['ZERO','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE'][Number(char)]}`;
  return 'Unicode character';
}
export function inspectText(raw) {
  const all = Array.from(String(raw));
  const characters = all.slice(0, MAX_CODE_POINTS).map((char, index) => {
    const codePoint = char.codePointAt(0);
    const format = /[\p{Cf}\p{Cc}\p{Zl}\p{Zp}]/u.test(char);
    const mark = /\p{M}/u.test(char);
    const whitespace = /\s/u.test(char);
    const script = scripts.find(([, pattern]) => pattern.test(char))?.[0] || 'Other script';
    return { char, index, code: `U+${codePoint.toString(16).toUpperCase().padStart(4,'0')}`, script, name: characterName(char), format, mark, whitespace,
      display: format ? '· ·' : whitespace ? '␠' : mark ? `◌${char}` : char };
  });
  const writingSystems = [...new Set(characters.map(c => c.script).filter(s => !['Common','Inherited'].includes(s)))];
  const mixed = writingSystems.length > 1;
  characters.forEach(c => { c.notable = c.format || (mixed && illustratedLookalikes.has(c.char)); });
  return { characters, writingSystems, mixed, truncated: all.length > MAX_CODE_POINTS, total: all.length,
    formatCount: characters.filter(c => c.format).length, punycode: String(raw).toLowerCase().includes('xn--') };
}
