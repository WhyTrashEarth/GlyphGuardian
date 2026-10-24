import { EXAMPLES, inspectText, MAX_CODE_POINTS } from './inspector.js';
const form = document.getElementById('inspect-form');
const input = document.getElementById('inspect-input');
const strip = document.getElementById('character-strip');
const detail = document.getElementById('character-detail');
const results = document.getElementById('lab-results');
const summary = document.getElementById('result-summary');
const exampleButtons = [...document.querySelectorAll('[data-example]')];

function node(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (className) el.className = className;
  return el;
}
function showDetails(character, button) {
  for (const tile of strip.children) tile.setAttribute('aria-pressed', String(tile === button));
  detail.replaceChildren(node('strong', character.code), node('span', character.name), node('span', `Script: ${character.script}`));
  if (character.format) detail.append(node('span','Format / control character'));
  if (character.mark) detail.append(node('span','Combining mark — dotted circle added for visibility'));
}
function render(exampleKey) {
  const result = inspectText(input.value);
  results.hidden = false;
  strip.replaceChildren();
  detail.replaceChildren();
  const count = result.characters.length;
  document.getElementById('character-count').textContent = `${count} code point${count === 1 ? '' : 's'}`;
  const empty = count === 0;
  input.setAttribute('aria-invalid', String(empty));
  detail.hidden = empty;
  if (empty) {
    summary.textContent = 'Enter some text to inspect its characters.';
  } else {
    const scriptText = result.writingSystems.length ? `Writing systems: ${result.writingSystems.join(' + ')}.` : 'Common symbols, punctuation, or inherited characters.';
    summary.textContent = `${scriptText} ${result.formatCount ? `${result.formatCount} format or control character${result.formatCount === 1 ? '' : 's'} present.` : 'Select a character for a closer look.'}${result.truncated ? ` Showing only the first ${MAX_CODE_POINTS} of ${result.total} code points.` : ''}`;
    for (const c of result.characters) {
      const button = node('button', undefined, `character${c.notable ? ' is-notable' : ''}`);
      button.type = 'button';
      button.setAttribute('aria-pressed','false');
      button.setAttribute('aria-label', `Character ${c.index + 1}: ${c.code}, ${c.name}, ${c.script}${c.format ? ', format or control character' : ''}`);
      const glyph = node('span',c.display,`glyph${c.format ? ' hidden-glyph' : ''}`);
      glyph.setAttribute('aria-hidden','true');
      button.append(glyph,node('span',c.code,'code'));
      button.addEventListener('click',() => showDetails(c,button));
      strip.append(button);
    }
    const selected = result.characters.findIndex(c => c.notable);
    const index = selected < 0 ? 0 : selected;
    showDetails(result.characters[index],strip.children[index]);
  }
  for (const button of exampleButtons) button.setAttribute('aria-pressed', String(button.dataset.example === exampleKey));
  const note = document.getElementById('example-note');
  note.textContent = empty ? '' : EXAMPLES[exampleKey]?.note || (result.punycode ? 'This view shows text exactly as entered. It does not decode Punycode (xn--), normalize URLs, or assess a destination.' : 'These are the characters as entered. Pink highlights mark format/control characters or a small set of illustrative look-alikes in mixed-script text. The mapping is not a complete confusables database; an unmarked character is not a safety verdict.');
}
form.addEventListener('submit',event => { event.preventDefault(); render(); });
input.addEventListener('input',() => {
  for (const button of exampleButtons) button.setAttribute('aria-pressed','false');
  results.hidden = true;
  input.removeAttribute('aria-invalid');
});
for (const button of exampleButtons) button.addEventListener('click',() => { input.value = EXAMPLES[button.dataset.example].text; render(button.dataset.example); });
render('youtube');
