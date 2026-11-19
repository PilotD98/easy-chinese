# Stroke-order data

`hsk1.json` … `hsk6.json` contain, for every character taught at that level,
the stroke outlines (SVG path data in a 1024-unit box with the y axis pointing
up, drawn with the transform `translate(0 900) scale(1 -1)`) and the stroke
medians (centre-line points) extracted from **hanzi-writer-data** by David
Chanin (https://github.com/chanind/hanzi-writer-data), which is itself derived
from **Make Me a Hanzi** by Shaunak Kishore (https://github.com/skishore/makemeahanzi).

Both are released under the **Arphic Public License** (the glyph data derives
from Arphic Technology's fonts). These files are derivative works of that data
and are redistributed under the same licence; see `ARPHICPL.txt` in this folder.

Regenerate with (characters from the built level files):

```bash
node scripts/fetch-hanzi.mjs strokes hsk1 "$(cat scripts/authoring/cache/hsk1-chars.txt)"
```
