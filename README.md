# Annotation exercise — human validation session

A static web app. Participants label 10 short English texts with the Transparent
Battlefield taxonomy, then see how far they agree with the model. The facilitator
pools everyone's files to get inter-annotator agreement.

No backend, no build step, no dependencies.

## Files

| file | what it is |
|---|---|
| `index.html` | the page and all the styling |
| `app.js` | the three screens: login, annotate, results, plus facilitator mode |
| `scoring.js` | all the agreement maths and the file import/export. No DOM, so it is testable |
| `data.js` | the 10 chunks, the model's labels, the 235-path taxonomy |
| `tests.js` | unit tests for `scoring.js` — `node tests.js` |
| `build_data.py` | rebuilds `data.js` from the source exports |
| `translations.json` | the hand-checked English translations |
| `fallback/` | paper/Excel version, in case the laptops or the network fail |

## Running it locally

```
python -m http.server 8777
```

Then open <http://localhost:8777>. Opening `index.html` directly from disk also
works in most browsers.

## Publishing on GitHub Pages

1. Create a public repository and push these files to the root of `main`.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/`.
3. Wait a minute, then share the `https://<user>.github.io/<repo>/` link.

**The model's labels are in `data.js`, so anyone can read them in the page
source.** That is fine for a training exercise, but it means a determined
participant could look up the answers. If that matters, keep the repository
private and run the local server on your own laptop with participants on the
same network instead.

## Running the session

1. Participants open the link, type a name, and annotate. Roughly 15–20 minutes.
2. Each one downloads their JSON (or CSV) at the end and sends it to you.
3. You click **Facilitator**, load all the files at once, and project the result.

The facilitator screen is read-only and loads files in the browser — nothing is
uploaded anywhere.

## What the numbers mean

- **Relevance agreement** — did the human and the model agree that the text was
  worth labelling at all? Reported as a percentage and as Cohen's kappa, which
  corrects for agreement you would get by chance.
- **Dimension / Subcategory / Specific label** — F1 over the set of labels for
  each chunk, at three depths of the taxonomy. The gap between the first and the
  last is the interesting part: it is normal to agree on the area and disagree on
  the exact label.
- **Mean pairwise F1** — the humans against each other. This matters more than
  agreement with the model, because it measures whether the taxonomy is usable.
- **Fleiss' kappa** — relevance agreement across all raters at once.

With 10 chunks these are a demonstration, not a measurement: one disagreement
moves a score by about ten points. The app says so on the results screen.

## Fallback

`fallback/annotation_sheet.csv` is the same 10 chunks with one column per
dimension, and `fallback/taxonomy_reference.csv` lists all 235 paths. A sheet
filled in by hand and saved as CSV can be loaded by the facilitator screen —
it recognises the `no_labels_apply` column and reads it as a wide file.
