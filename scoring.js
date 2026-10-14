/* Agreement logic + file import/export. Works in the browser (window.Scoring)
   and in Node (module.exports) so it can be unit-tested.

   Data shapes
     label   {h, l2, l3, conf}            one taxonomy path (+ confidence 1-5)
     answers {chunkId: {status:'none'|'labels', labels:[label]}}   one annotator
     chunk   {id, key:[{h,l2,l3,conf}]}   key = the model's labels

   Agreement is measured at three depths of the taxonomy:
     dim  = top-level dimension only      (e.g. "Technology Domain")
     sub  = dimension + 2nd level
     leaf = full path incl. 3rd level     (the strictest)
   For each depth the labels of a chunk are a SET of paths; sets are compared
   with F1 (= 2*overlap / (size A + size B)), pooled over all chunks. F1 is
   symmetric, so it works the same for human-vs-model and human-vs-human.
*/
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Scoring = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  var LEVELS = [
    { id: 'dim', name: 'Dimension' },
    { id: 'sub', name: 'Subcategory' },
    { id: 'leaf', name: 'Specific label' }
  ];

  function project(l, level) {
    return level === 'dim' ? l.h : level === 'sub' ? l.h + '|' + l.l2 : l.h + '|' + l.l2 + '|' + l.l3;
  }
  function pathSet(labels, level) {
    var s = {};
    (labels || []).forEach(function (l) { s[project(l, level)] = 1; });
    return Object.keys(s);
  }
  function overlap(a, b) {
    var inB = {}; b.forEach(function (x) { inB[x] = 1; });
    return a.filter(function (x) { return inB[x]; }).length;
  }

  // labels of an annotator for a chunk, or null if the chunk was not answered
  function labelsOf(answers, id) {
    var a = answers && answers[id];
    if (!a) return null;
    return a.status === 'none' ? [] : (a.labels || []);
  }

  // pooled F1 over chunks. getA/getB return a label array or null (skip chunk)
  function pooledF1(chunks, getA, getB, level) {
    var tp = 0, na = 0, nb = 0, used = 0;
    chunks.forEach(function (c) {
      var A = getA(c), B = getB(c);
      if (A === null || B === null) return;
      used++;
      var sa = pathSet(A, level), sb = pathSet(B, level);
      tp += overlap(sa, sb); na += sa.length; nb += sb.length;
    });
    return { f1: (na + nb) ? 2 * tp / (na + nb) : null, tp: tp, nA: na, nB: nb, chunks: used,
             precision: na ? tp / na : null, recall: nb ? tp / nb : null };
  }

  function chunkJaccard(A, B, level) {
    var sa = pathSet(A, level), sb = pathSet(B, level);
    var inter = overlap(sa, sb), union = sa.length + sb.length - inter;
    return union ? inter / union : 1;   // both empty = perfect agreement
  }

  // binary "does this chunk have any label?" agreement between two raters
  function relevance(chunks, getA, getB) {
    var n = 0, agree = 0, a1b1 = 0, a1b0 = 0, a0b1 = 0, a0b0 = 0;
    chunks.forEach(function (c) {
      var A = getA(c), B = getB(c);
      if (A === null || B === null) return;
      n++;
      var x = A.length > 0, y = B.length > 0;
      if (x === y) agree++;
      if (x && y) a1b1++; else if (x) a1b0++; else if (y) a0b1++; else a0b0++;
    });
    // `rate` is a fraction 0-1, `pct` the same number as 0-100. Both exist
    // because confusing them silently prints "1%" where it means "100%".
    return { n: n, agree: agree, rate: n ? agree / n : null,
             pct: n ? 100 * agree / n : null, kappa: cohen(a1b1, a1b0, a0b1, a0b0),
             a1b1: a1b1, a1b0: a1b0, a0b1: a0b1, a0b0: a0b0 };
  }
  function cohen(a, b, c, d) {          // 2x2 table -> Cohen's kappa (null if undefined)
    var n = a + b + c + d; if (!n) return null;
    var po = (a + d) / n;
    var pe = ((a + b) / n) * ((a + c) / n) + ((c + d) / n) * ((b + d) / n);
    return pe >= 1 ? null : (po - pe) / (1 - pe);
  }

  // Fleiss' kappa for the binary relevance decision across >= 2 raters.
  // raters: array of answers objects; only chunks answered by ALL raters count.
  function fleissRelevance(chunks, raters) {
    var N = 0, nR = raters.length, Pbar = 0, p1 = 0;
    if (nR < 2) return { kappa: null, items: 0, raters: nR };
    chunks.forEach(function (c) {
      var ones = 0, ok = true;
      raters.forEach(function (r) { var L = labelsOf(r, c.id); if (L === null) ok = false; else if (L.length) ones++; });
      if (!ok) return;
      N++; p1 += ones;
      var zeros = nR - ones;
      Pbar += (ones * (ones - 1) + zeros * (zeros - 1)) / (nR * (nR - 1));
    });
    if (!N) return { kappa: null, items: 0, raters: nR };
    Pbar /= N; p1 /= (N * nR);
    var Pe = p1 * p1 + (1 - p1) * (1 - p1);
    return { kappa: Pe >= 1 ? null : (Pbar - Pe) / (1 - Pe), items: N, raters: nR, observed: Pbar };
  }

  function modelLabels(c) { return c.key || []; }

  // one annotator vs the model
  function vsModel(chunks, answers) {
    var getA = function (c) { return labelsOf(answers, c.id); };
    var out = { relevance: relevance(chunks, getA, modelLabels), levels: {} };
    LEVELS.forEach(function (L) { out.levels[L.id] = pooledF1(chunks, getA, modelLabels, L.id); });
    // average self-reported confidence on leaf labels that matched the model vs those that did not
    var m = [], x = [];
    chunks.forEach(function (c) {
      var A = labelsOf(answers, c.id); if (!A) return;
      var inModel = {}; modelLabels(c).forEach(function (l) { inModel[project(l, 'leaf')] = 1; });
      A.forEach(function (l) { if (l.conf) (inModel[project(l, 'leaf')] ? m : x).push(l.conf); });
    });
    out.confMatched = m.length ? m.reduce(function (a, b) { return a + b; }, 0) / m.length : null;
    out.confUnmatched = x.length ? x.reduce(function (a, b) { return a + b; }, 0) / x.length : null;
    out.nMatched = m.length; out.nUnmatched = x.length;
    return out;
  }

  // two annotators against each other
  function pair(chunks, A, B) {
    var gA = function (c) { return labelsOf(A, c.id); }, gB = function (c) { return labelsOf(B, c.id); };
    var out = { relevance: relevance(chunks, gA, gB), levels: {} };
    LEVELS.forEach(function (L) { out.levels[L.id] = pooledF1(chunks, gA, gB, L.id); });
    return out;
  }

  // whole group. people = [{name, answers}]
  function group(chunks, people) {
    var n = people.length, matrix = [], mean = {};
    LEVELS.forEach(function (L) { mean[L.id] = { sum: 0, k: 0 }; });
    var relSum = 0, relK = 0;
    for (var i = 0; i < n; i++) {
      matrix.push([]);
      for (var j = 0; j < n; j++) {
        var p = i === j ? null : pair(chunks, people[i].answers, people[j].answers);
        matrix[i].push(p);
        if (j > i && p) {
          LEVELS.forEach(function (L) { var f = p.levels[L.id].f1; if (f !== null) { mean[L.id].sum += f; mean[L.id].k++; } });
          if (p.relevance.pct !== null) { relSum += p.relevance.pct; relK++; }
        }
      }
    }
    var meanF1 = {};
    LEVELS.forEach(function (L) { meanF1[L.id] = mean[L.id].k ? mean[L.id].sum / mean[L.id].k : null; });
    return { matrix: matrix, meanF1: meanF1, meanRelevancePct: relK ? relSum / relK : null,
             fleiss: fleissRelevance(chunks, people.map(function (p) { return p.answers; })) };
  }

  // per chunk: how many people labelled it, and which leaf labels were picked how often
  function perChunk(chunks, people) {
    return chunks.map(function (c) {
      var rel = 0, ans = 0, picks = {};
      people.forEach(function (p) {
        var L = labelsOf(p.answers, c.id); if (L === null) return;
        ans++; if (L.length) rel++;
        L.forEach(function (l) { var k = project(l, 'leaf'); picks[k] = (picks[k] || 0) + 1; });
      });
      var ranked = Object.keys(picks).map(function (k) { return { path: k, n: picks[k] }; })
        .sort(function (a, b) { return b.n - a.n; });
      return { id: c.id, answered: ans, relevant: rel, picks: ranked };
    });
  }

  /* ---------------------------------------------------------------- CSV */
  function parseCsv(text) {
    var rows = [], row = [], f = '', q = false, i = 0;
    text = text.replace(/^﻿/, '');
    for (; i < text.length; i++) {
      var ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',' || ch === ';' || ch === '\t') {
        // delimiter is detected from the header line, see below
        row.push(f); f = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(f); f = ''; if (row.length > 1 || row[0] !== '') rows.push(row); row = [];
      } else f += ch;
    }
    if (f !== '' || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  function csvEscape(v) {
    v = v === null || v === undefined ? '' : String(v);
    return /[",\n\r;\t]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  }
  function toCsv(rows) { return '﻿' + rows.map(function (r) { return r.map(csvEscape).join(','); }).join('\r\n') + '\r\n'; }

  // export: one row per label; a chunk with no labels gets one row with status "none"
  function toLongCsv(name, chunks, answers) {
    var rows = [['annotator', 'chunk_id', 'status', 'dimension', 'second_level', 'third_level', 'confidence_1_5']];
    chunks.forEach(function (c) {
      var a = answers[c.id]; if (!a) return;
      if (a.status === 'none' || !a.labels || !a.labels.length) rows.push([name, c.id, 'none', '', '', '', '']);
      else a.labels.forEach(function (l) { rows.push([name, c.id, 'labels', l.h, l.l2, l.l3, l.conf || '']); });
    });
    return toCsv(rows);
  }

  function indexTaxonomy(taxonomy) {
    var byLeaf = {};
    taxonomy.forEach(function (t) { byLeaf[t[2].toLowerCase()] = { h: t[0], l2: t[1], l3: t[2] }; });
    return byLeaf;
  }

  // people = {name: answers}; returns {people:[{name,answers}], warnings:[]}
  function peopleFromLongRows(rows, taxonomy) {
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var col = function (n) { return head.indexOf(n); };
    var iA = col('annotator'), iC = col('chunk_id'), iS = col('status'), iH = col('dimension'),
        i2 = col('second_level'), i3 = col('third_level'), iF = col('confidence_1_5');
    var leaf = indexTaxonomy(taxonomy), people = {}, warnings = [];
    rows.slice(1).forEach(function (r, n) {
      var name = (r[iA] || '').trim(), id = (r[iC] || '').trim(); if (!name || !id) return;
      var p = people[name] = people[name] || {};
      var a = p[id] = p[id] || { status: 'labels', labels: [] };
      if ((r[iS] || '').trim().toLowerCase() === 'none') { a.status = 'none'; a.labels = []; return; }
      var t = leaf[(r[i3] || '').trim().toLowerCase()];
      if (!t) { warnings.push('row ' + (n + 2) + ': unknown label "' + (r[i3] || '') + '"'); return; }
      a.labels.push({ h: t.h, l2: t.l2, l3: t.l3, conf: parseInt(r[iF], 10) || null });
    });
    return { people: Object.keys(people).map(function (k) { return { name: k, answers: people[k] }; }), warnings: warnings };
  }

  // fallback spreadsheet: one row per chunk, one column per dimension holding the 3rd-level label text
  function peopleFromWideRows(rows, taxonomy, hltps) {
    var head = rows[0].map(function (h) { return h.trim(); });
    var low = head.map(function (h) { return h.toLowerCase(); });
    var iA = low.indexOf('annotator'), iC = low.indexOf('chunk_id'), iN = low.indexOf('no_labels_apply'),
        iF = low.indexOf('confidence_1_5');
    var leaf = indexTaxonomy(taxonomy), people = {}, warnings = [];
    rows.slice(1).forEach(function (r, n) {
      var name = (r[iA] || '').trim(), id = (r[iC] || '').trim(); if (!name || !id) return;
      var p = people[name] = people[name] || {};
      var labels = [];
      hltps.forEach(function (h) {
        var ci = head.indexOf(h); if (ci < 0) return;
        var v = (r[ci] || '').trim(); if (!v) return;
        var t = leaf[v.toLowerCase()];
        if (!t) { warnings.push('row ' + (n + 2) + ', ' + h + ': unknown label "' + v + '"'); return; }
        if (t.h !== h) warnings.push('row ' + (n + 2) + ': "' + v + '" belongs to ' + t.h + ', not ' + h);
        labels.push({ h: t.h, l2: t.l2, l3: t.l3, conf: iF >= 0 ? (parseInt(r[iF], 10) || null) : null });
      });
      if (labels.length) p[id] = { status: 'labels', labels: labels };
      else if ((r[iN] || '').trim()) p[id] = { status: 'none', labels: [] };
    });
    return { people: Object.keys(people).map(function (k) { return { name: k, answers: people[k] }; }), warnings: warnings };
  }

  // any supported file text -> {people, warnings}
  function importText(text, taxonomy, hltps) {
    var t = text.replace(/^﻿/, '').trim();
    if (t[0] === '{' || t[0] === '[') {
      var j = JSON.parse(t), list = Array.isArray(j) ? j : [j];
      return { people: list.map(function (x) { return { name: x.annotator, answers: x.answers }; }), warnings: [] };
    }
    var firstLine = t.split(/\r?\n/)[0];
    var delim = (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length ? ';' : ',';
    if (delim === ';') t = t.split(/\r?\n/).map(function (l) { return l; }).join('\n'); // parseCsv accepts ; too
    var rows = parseCsv(t);
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    if (head.indexOf('third_level') >= 0) return peopleFromLongRows(rows, taxonomy);
    if (head.indexOf('no_labels_apply') >= 0) return peopleFromWideRows(rows, taxonomy, hltps);
    throw new Error('Unrecognised file format (expected the app export or the fallback sheet).');
  }

  return { LEVELS: LEVELS, project: project, labelsOf: labelsOf, pooledF1: pooledF1, chunkJaccard: chunkJaccard,
           relevance: relevance, cohen: cohen, fleissRelevance: fleissRelevance, vsModel: vsModel, pair: pair,
           group: group, perChunk: perChunk, parseCsv: parseCsv, toCsv: toCsv, toLongCsv: toLongCsv,
           importText: importText };
});
