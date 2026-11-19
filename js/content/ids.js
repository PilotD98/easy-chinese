/* Stable content IDs.
   Format: `type:scope:slug` (scope is optional for characters).
     py:t:1                 sound unit of the Pinyin stage (t tone, i initial, f final, p pair, s sandhi)
     vocab:py:ma1-妈         Pinyin-stage example word
     hanzi:爱                one character, keyed by the character itself
     vocab:hsk1:ai4-爱       numbered pinyin + surface form, so homophones stay distinct
     gram:hsk1:shi          grammar point
     read:hsk1:001          reading passage
     listen:hsk1:001        listening drill
     spk:py:greet:01        speaking phrase (set:item)
   IDs never change once published; progress records are keyed on them. */

export const ID_TYPES = ['py', 'hanzi', 'vocab', 'gram', 'read', 'listen', 'spk'];
export const ID_RE = /^(py|hanzi|vocab|gram|read|listen|spk):([^:\s]+)(?::([^\s]+))?$/u;

export function parseId(id) {
  const m = ID_RE.exec(id || '');
  if (!m) return null;
  if (m[1] === 'hanzi') return { type: 'hanzi', scope: null, slug: m[2] };
  return { type: m[1], scope: m[2], slug: m[3] ?? null };
}

export function isValidId(id) { return ID_RE.test(id || ''); }

/** Map an ID type to the progress record type used in storage. */
export function progressTypeFor(id) {
  const p = parseId(id);
  if (!p) return null;
  return { py: 'sound', hanzi: 'hanzi', vocab: 'vocab', gram: 'grammar', read: 'reading', listen: 'reading' }[p.type];
}

export const HSK_ORDER = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'];
export function isHskLevel(id) { return HSK_ORDER.includes(id); }
export function nextHsk(levelId) { const i = HSK_ORDER.indexOf(levelId); return i >= 0 && i < HSK_ORDER.length - 1 ? HSK_ORDER[i + 1] : null; }
