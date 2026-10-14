/* Annotation exercise - UI.  Depends on data.js (window.SESSION) and scoring.js. */
(function () {
  'use strict';

  var D = window.SESSION, S = window.Scoring;
  var KEY = 'annot:' + D.sessionId;
  var main = document.getElementById('main');

  // ---------------------------------------------------------------- state
  var st = { name: '', i: 0, answers: {}, done: false };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && saved.name) st = saved;
  } catch (e) { /* private window, no storage - carry on */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
  }

  // taxonomy -> {dimension: {l2: [l3,...]}}
  var TREE = {};
  D.taxonomy.forEach(function (p) {
    (TREE[p[0]] = TREE[p[0]] || {});
    (TREE[p[0]][p[1]] = TREE[p[0]][p[1]] || []).push(p[2]);
  });

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function f1txt(v) { return v === null || v === undefined ? '--' : (100 * v).toFixed(0) + '%'; }
  function kap(v) { return v === null || v === undefined ? 'n/a' : v.toFixed(2); }

  // Cohen's / Fleiss' kappa in words. The scale is the usual Landis & Koch one.
  function kappaWord(v) {
    if (v === null || v === undefined) return 'not defined here';
    if (v < 0.01) return 'no better than chance';
    if (v < 0.2) return 'barely better than chance';
    if (v < 0.4) return 'fair';
    if (v < 0.6) return 'moderate';
    if (v < 0.8) return 'substantial';
    return 'almost complete';
  }

  function header() {
    document.getElementById('hdrGroup').textContent = D.group;
    document.getElementById('hdrWho').textContent = st.name ? st.name : '';
  }

  // ------------------------------------------------------------ 1. login
  function viewLogin() {
    main.innerHTML =
      '<div class="wrap">' +
      '<h2>' + esc(D.group) + '</h2>' +
      '<p class="lede">You will read <b>' + D.chunks.length + ' short texts</b> and label them with ' +
      'the project taxonomy, exactly as the model was asked to. You will not see the ' +
      'model&rsquo;s answers until you finish. At the end you see how far you and the model agree.</p>' +
      '<div class="note"><b>Research question.</b> ' + esc(D.researchQuestion) + '</div>' +
      '<h3>Your name</h3>' +
      '<div class="row"><div style="flex:1;min-width:240px">' +
      '<input type="text" id="nm" placeholder="e.g. Pieter de Vries" autocomplete="off" ' +
      'value="' + esc(st.name) + '"></div>' +
      '<button id="go">Start</button></div>' +
      '<p class="small" style="margin-top:8px">Your name only labels your own result file. ' +
      'Your progress is saved in this browser, so you can close the tab and come back.</p>' +
      (st.name && Object.keys(st.answers).length
        ? '<div class="note" style="margin-top:18px">You have ' +
          Object.keys(st.answers).length + ' of ' + D.chunks.length +
          ' already done. Starting will continue where you left off. ' +
          '<button class="ghost" id="reset" style="padding:4px 10px;font-size:12px;margin-left:8px">' +
          'Start over</button></div>'
        : '') +
      '</div>';

    var nm = document.getElementById('nm');
    document.getElementById('go').onclick = function () {
      var v = nm.value.trim();
      if (!v) { nm.focus(); return; }
      st.name = v; save(); header();
      st.done ? viewResults() : viewAnnotate();
    };
    nm.onkeydown = function (e) { if (e.key === 'Enter') document.getElementById('go').click(); };
    var r = document.getElementById('reset');
    if (r) r.onclick = function () {
      if (!confirm('Delete your answers and start again?')) return;
      st = { name: st.name, i: 0, answers: {}, done: false }; save(); viewLogin();
    };
    nm.focus();
  }

  // --------------------------------------------------------- 2. annotate
  function cur() { return D.chunks[st.i]; }

  function ans(id) {
    if (!st.answers[id]) st.answers[id] = { status: 'labels', labels: [] };
    return st.answers[id];
  }

  function viewAnnotate() {
    var c = cur(), a = ans(c.id);
    var dims = D.hltps;

    var steps = '<div class="steps">' + D.chunks.map(function (x, n) {
      var cls = n === st.i ? 'now' : (st.answers[x.id] ? 'done' : '');
      return '<span class="' + cls + '" data-j="' + n + '" title="text ' + (n + 1) + '">' + (n + 1) + '</span>';
    }).join('') + '</div>';

    var rows = dims.map(function (h) {
      var picked = a.labels.filter(function (l) { return l.h === h; })[0];
      var opts = '<option value="">&mdash; not present &mdash;</option>';
      Object.keys(TREE[h] || {}).forEach(function (l2) {
        opts += '<optgroup label="' + esc(l2) + '">';
        TREE[h][l2].forEach(function (l3) {
          var v = l2 + '||' + l3;
          opts += '<option value="' + esc(v) + '"' +
            (picked && picked.l2 === l2 && picked.l3 === l3 ? ' selected' : '') + '>' +
            esc(l3) + '</option>';
        });
        opts += '</optgroup>';
      });
      var conf = '<div class="conf' + (picked ? '' : ' hide') + '" data-conf="' + esc(h) + '">' +
        'confidence ' + [1, 2, 3, 4, 5].map(function (k) {
          return '<button data-c="' + k + '" class="' +
            (picked && picked.conf === k ? 'sel' : '') + '">' + k + '</button>';
        }).join('') + '</div>';
      var hint = D.hints && D.hints[h] ? '<span class="hint">' + esc(D.hints[h]) + '</span>' : '';
      return '<div class="dim' + (picked ? ' on' : '') + '" data-dim="' + esc(h) + '">' +
        '<div class="nm">' + esc(h) + hint + '</div>' +
        '<div><select data-sel="' + esc(h) + '">' + opts + '</select></div>' +
        conf + '</div>';
    }).join('');

    var rules = (D.rules || []).map(function (r) {
      return '<p style="margin:0 0 8px"><b>' + esc(r[0]) + '.</b> ' + esc(r[1]) + '</p>';
    }).join('');
    var subQ = (D.subQuestions || []).map(function (q) {
      return '<li style="margin:0 0 4px">' + esc(q) + '</li>';
    }).join('');

    main.innerHTML =
      '<div class="wrap">' + steps +
      '<details id="guide"' + (st.i === 0 ? ' open' : '') + '>' +
        '<summary>The instructions the model was given</summary>' +
        '<div style="background:#fbfcfe;border:1px solid var(--line);border-radius:6px;' +
        'padding:14px 18px;margin:8px 0 14px;font-size:13.5px">' +
        '<p style="margin:0 0 6px"><b>Research question.</b> ' + esc(D.researchQuestion) + '</p>' +
        (subQ ? '<ol style="margin:0 0 12px;padding-left:20px">' + subQ + '</ol>' : '') +
        rules +
        (D.promptText
          ? '<details style="margin:12px 0 0"><summary>Read the prompt the model ' +
            'was given, word for word</summary>' +
            '<pre style="white-space:pre-wrap;font:12px/1.5 ui-monospace,Consolas,monospace;' +
            'background:#fff;border:1px solid var(--line);border-radius:5px;padding:12px 14px;' +
            'margin:8px 0 0;max-height:420px;overflow:auto">' + esc(D.promptText) + '</pre>' +
            '</details>'
          : '') +
        ((D.runFacts || []).length
          ? '<p style="margin:14px 0 6px;font-weight:700">About the run you are checking</p>' +
            D.runFacts.map(function (f) {
              return '<p style="margin:0 0 6px"><b>' + esc(f[0]) + '.</b> ' + esc(f[1]) + '</p>';
            }).join('')
          : '') +
        '</div></details>' +
      '<div class="meta">Text ' + (st.i + 1) + ' of ' + D.chunks.length +
        ' &nbsp;&middot;&nbsp; ' + esc(c.source) +
        (c.translated ? ' &nbsp;&middot;&nbsp; <b>machine-translated from Russian</b>' : '') +
      '</div>' +
      '<div class="chunk">' + esc(c.text_en) + '</div>' +
      (c.translated
        ? '<details><summary>Show the Russian original</summary>' +
          '<div class="chunk" style="border-left-color:var(--muted)">' + esc(c.text_orig) +
          '</div></details>' : '') +
      '<div class="note">' +
        '<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;margin:0">' +
        '<input type="checkbox" id="none" style="margin-top:3px"' +
        (a.status === 'none' ? ' checked' : '') + '> <span>' +
        '<b>No dimension applies &mdash; I would leave this text unlabelled.</b><br>' +
        '<span class="small">This is not a relevance vote. It means nothing in the ' +
        'taxonomy is supported by what the text actually says.</span>' +
        '</span></label></div>' +
      '<div id="dimwrap"' + (a.status === 'none' ? ' class="hide"' : '') + '>' +
        '<h3>Taxonomy &mdash; at most one label per dimension</h3>' +
        '<div class="dims">' + rows + '</div>' +
      '</div>' +
      '<div class="row" style="margin-top:20px">' +
        '<button class="ghost" id="prev"' + (st.i === 0 ? ' disabled' : '') + '>Back</button>' +
        '<span class="sp"></span>' +
        '<span class="small" id="cnt"></span>' +
        '<button id="next">' + (st.i === D.chunks.length - 1 ? 'Finish and see my result' : 'Next') + '</button>' +
      '</div></div>';

    function count() {
      var k = Object.keys(st.answers).length;
      document.getElementById('cnt').textContent = k + ' of ' + D.chunks.length + ' answered';
    }
    count();

    document.getElementById('none').onchange = function () {
      a.status = this.checked ? 'none' : 'labels';
      if (this.checked) a.labels = [];
      document.getElementById('dimwrap').className = this.checked ? 'hide' : '';
      save(); if (this.checked) viewAnnotate();
    };

    Array.prototype.forEach.call(main.querySelectorAll('[data-sel]'), function (sel) {
      sel.onchange = function () {
        var h = sel.getAttribute('data-sel');
        a.labels = a.labels.filter(function (l) { return l.h !== h; });
        if (sel.value) {
          var p = sel.value.split('||');
          a.labels.push({ h: h, l2: p[0], l3: p[1], conf: 3 });
        }
        a.status = 'labels'; save(); viewAnnotate();
      };
    });

    Array.prototype.forEach.call(main.querySelectorAll('[data-conf] button'), function (b) {
      b.onclick = function () {
        var h = b.parentNode.getAttribute('data-conf'), k = +b.getAttribute('data-c');
        a.labels.forEach(function (l) { if (l.h === h) l.conf = k; });
        save(); viewAnnotate();
      };
    });

    Array.prototype.forEach.call(main.querySelectorAll('.steps span'), function (s) {
      s.onclick = function () { st.i = +s.getAttribute('data-j'); save(); viewAnnotate(); };
    });

    document.getElementById('prev').onclick = function () {
      if (st.i > 0) { st.i--; save(); viewAnnotate(); }
    };
    document.getElementById('next').onclick = function () {
      if (st.i < D.chunks.length - 1) { st.i++; save(); viewAnnotate(); return; }
      var missing = D.chunks.filter(function (x) { return !st.answers[x.id]; }).length;
      if (missing && !confirm(missing + ' text(s) have no answer. Finish anyway?')) return;
      st.done = true; save(); viewResults();
    };
  }

  // ---------------------------------------------------------- 3. results
  function viewResults() {
    var r = S.vsModel(D.chunks, st.answers);

    // an example path, so "dimension" and "branch" are not abstract words
    var ex = null;
    D.chunks.some(function (c) { return (c.key || []).some(function (l) { ex = l; return true; }); });

    var kpis =
      '<div class="kpis">' +
      '<div class="kpi"><div class="k">Agreement with the model</div><div class="v">' +
        f1txt(r.levels.leaf.f1) +
        '</div><div class="s">how often you both chose exactly the same label</div></div>' +
      '<div class="kpi"><div class="k">Did you both label it at all</div><div class="v">' +
        (r.relevance.pct === null ? '--' : r.relevance.pct.toFixed(0) + '%') +
        '</div><div class="s">kappa ' + kap(r.relevance.kappa) + ' &mdash; ' +
        kappaWord(r.relevance.kappa) + '</div></div>' +
      '</div>';

    function step(name, val, note) {
      var pc = val === null ? 0 : Math.round(100 * val);
      return '<div style="display:grid;grid-template-columns:190px 1fr 52px;gap:12px;' +
        'align-items:center;margin:0 0 9px">' +
        '<div style="font-size:13.5px;font-weight:600">' + name + '</div>' +
        '<div style="background:#e9edf3;border-radius:3px;height:20px;position:relative">' +
        '<div style="background:var(--teal);height:20px;border-radius:3px;width:' +
        pc + '%"></div></div>' +
        '<div class="n" style="font-size:14px;font-weight:700;text-align:right">' +
        f1txt(val) + '</div>' +
        '<div></div><div class="small" style="grid-column:2/4;margin:-5px 0 0">' + note +
        '</div></div>';
    }

    var funnel =
      '<h3>Where the agreement breaks down</h3>' +
      '<p class="small" style="margin:-4px 0 12px">The same comparison three times, each ' +
      'one stricter than the last. The drop between them is the point of this exercise.</p>' +
      step('1. Same dimension', r.levels.dim.f1,
           'You both saw the same kind of thing in the text' +
           (ex ? ' &mdash; e.g. you both used <b>' + esc(ex.h) + '</b>' : '') + '.') +
      step('2. Same branch', r.levels.sub.f1,
           '&hellip; and you both narrowed it the same way' +
           (ex ? ' &mdash; <b>' + esc(ex.l2) + '</b>' : '') + '.') +
      step('3. Same exact label', r.levels.leaf.f1,
           '&hellip; and you both landed on the identical third-level label' +
           (ex ? ' &mdash; <b>' + esc(ex.l3) + '</b>' : '') +
           '. This is the headline number above.');

    function lab(n) { return n + (n === 1 ? ' label' : ' labels'); }
    var conf = (r.nMatched && r.nUnmatched)
      ? '<p class="small">Your average confidence was <b>' + r.confMatched.toFixed(1) +
        '</b> on the ' + lab(r.nMatched) + ' the model also chose, and <b>' +
        r.confUnmatched.toFixed(1) + '</b> on the ' + lab(r.nUnmatched) + ' it did not. ' +
        'If those two numbers are close, your confidence is not telling you much about ' +
        'when you are right &mdash; which is exactly the problem we have with the model.</p>'
      : '';

    var rows = D.chunks.map(function (c, n) {
      var mine = st.answers[c.id];
      var modelLeaf = {}; (c.key || []).forEach(function (l) { modelLeaf[S.project(l, 'leaf')] = 1; });
      var myLeaf = {}; ((mine && mine.labels) || []).forEach(function (l) { myLeaf[S.project(l, 'leaf')] = 1; });

      function tags(list, other) {
        if (!list || !list.length) return '<span class="tag">no label</span>';
        return list.map(function (l) {
          var k = S.project(l, 'leaf');
          return '<span class="tag ' + (other[k] ? 'ok' : 'no') + '" title="' + esc(l.h + ' > ' + l.l2) + '">' +
            esc(l.l3) + (l.conf ? ' &middot; ' + l.conf : '') + '</span>';
        }).join('');
      }
      return '<tr><td class="n">' + (n + 1) + '</td>' +
        '<td style="max-width:300px">' + esc(c.text_en.slice(0, 150)) +
          (c.text_en.length > 150 ? '&hellip;' : '') + '</td>' +
        '<td>' + (mine ? tags(mine.labels, modelLeaf) : '<span class="small">not answered</span>') + '</td>' +
        '<td>' + tags(c.key, myLeaf) +
          (c.key_why ? '<div class="small" style="margin-top:4px">' + esc(c.key_why) + '</div>' : '') +
        '</td></tr>';
    }).join('');

    main.innerHTML =
      '<div class="wrap">' +
      '<h2>' + esc(st.name) + ' &mdash; your result</h2>' +
      '<p class="lede">How far your labels and the model&rsquo;s labels agree, at three depths ' +
      'of the taxonomy. These are F1 scores: 100% means identical sets of labels.</p>' +
      kpis + funnel + conf +
      '<div class="note"><b>Read these numbers carefully.</b> ' + D.chunks.length +
      ' texts is a demonstration, not a measurement &mdash; one disagreement moves a score ' +
      'by several points. And the model is not the ground truth here. Where you disagree, ' +
      'the interesting question is which of you is right, and whether the taxonomy let you ' +
      'both be reasonable.</div>' +
      (D.benchmark
        ? '<div class="note" style="border-left-color:var(--teal);background:#f2faf9;color:#1d4a48">' +
          '<b>Something to compare against.</b> The group that built this taxonomy read ten ' +
          'of their own annotations and reckoned they would label about <b>' + D.benchmark +
          '%</b> of them differently themselves. So disagreeing with the model on roughly ' +
          'one label in five is not you doing badly &mdash; it is the normal state of ' +
          'affairs, and it is why the validation step exists.</div>'
        : '') +
      '<div class="note" style="border-left-color:var(--teal);background:#f2faf9;color:#1d4a48">' +
      '<b>About the first number.</b> The annotation prompt has no relevance field and ' +
      'never asks whether a text is relevant. But two lines of it do the job anyway: ' +
      '<i>&ldquo;if no HLTP applies at all, return an empty labels list&rdquo;</i>, and ' +
      '<i>&ldquo;generic MoD loss tallies, politics, humanitarian aid or ceremonial text ' +
      '&hellip; get no labels&rdquo;</i>. That is a relevance rule written into the guidance ' +
      'rather than into the schema &mdash; so it produces no score, no confidence and no ' +
      'audit trail, and it still removed 581 of the 1,000 chunks. The first number above is ' +
      'you and the model agreeing on whether there was anything to label at all.</div>' +
      '<h3>Text by text</h3>' +
      '<table><thead><tr><th class="n">#</th><th>Text</th><th>Your labels</th>' +
      '<th>Model labels</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<p class="small">Green = both of you chose it. Red = only one of you did. ' +
      'The number after a label is the confidence.</p>' +
      '<h3>Send your result to the facilitator</h3>' +
      '<div class="row">' +
      '<button class="gold" id="dlj">Download JSON</button>' +
      '<button class="ghost" id="dlc">Download CSV</button>' +
      '<button class="ghost" id="back">Back to the texts</button>' +
      '</div></div>';

    document.getElementById('dlj').onclick = function () {
      dl(st.name.replace(/[^\w.-]+/g, '_') + '.json',
         JSON.stringify({ sessionId: D.sessionId, annotator: st.name, answers: st.answers }, null, 1),
         'application/json');
    };
    document.getElementById('dlc').onclick = function () {
      dl(st.name.replace(/[^\w.-]+/g, '_') + '.csv',
         S.toLongCsv(st.name, D.chunks, st.answers), 'text/csv');
    };
    document.getElementById('back').onclick = function () { st.done = false; save(); viewAnnotate(); };
  }

  function dl(name, text, mime) {
    var b = new Blob([text], { type: mime + ';charset=utf-8' });
    var u = URL.createObjectURL(b), a = document.createElement('a');
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
  }

  // ------------------------------------------------------ 4. facilitator
  var people = [];

  function viewFac() {
    var body = '';
    if (people.length < 2) {
      body = '<p class="lede">Load two or more result files to see how far the group agreed ' +
             'with each other &mdash; which matters more than agreement with the model.</p>';
    } else {
      var g = S.group(D.chunks, people), pc = S.perChunk(D.chunks, people);

      body =
        '<div class="kpis">' +
        '<div class="kpi"><div class="k">Annotators</div><div class="v">' + people.length +
          '</div><div class="s">' + D.chunks.length + ' texts each</div></div>' +
        '<div class="kpi"><div class="k">Mean pairwise F1</div><div class="v">' +
          f1txt(g.meanF1.leaf) + '</div><div class="s">specific label &middot; dim ' +
          f1txt(g.meanF1.dim) + ' &middot; sub ' + f1txt(g.meanF1.sub) + '</div></div>' +
        '<div class="kpi"><div class="k">Labelled or left empty</div><div class="v">' +
          (g.meanRelevancePct === null ? '--' : g.meanRelevancePct.toFixed(0) + '%') +
          '</div><div class="s">mean over all pairs</div></div>' +
        '<div class="kpi"><div class="k">Fleiss&rsquo; kappa</div><div class="v">' +
          (g.fleiss ? kap(g.fleiss.kappa) : 'n/a') +
          '</div><div class="s">relevance, all raters</div></div>' +
        '</div>' +
        '<div class="note">Kappa corrects for agreement you would get by chance. ' +
        'Below about 0.4 the taxonomy is doing less work than it looks like; ' +
        'that is a finding about the taxonomy, not about the people.</div>';

      body += '<h3>Who agrees with whom (specific label)</h3><table><thead><tr><th></th>' +
        people.map(function (p) { return '<th class="n">' + esc(p.name.slice(0, 12)) + '</th>'; }).join('') +
        '<th class="n">vs model</th></tr></thead><tbody>' +
        people.map(function (p, i) {
          return '<tr><td><b>' + esc(p.name) + '</b></td>' +
            people.map(function (q, j) {
              if (i === j) return '<td class="n small">&mdash;</td>';
              return '<td class="n">' + f1txt(g.matrix[i][j].levels.leaf.f1) + '</td>';
            }).join('') +
            '<td class="n"><b>' + f1txt(S.vsModel(D.chunks, p.answers).levels.leaf.f1) + '</b></td></tr>';
        }).join('') + '</tbody></table>';

      body += '<h3>Where the group split</h3><table><thead><tr><th class="n">#</th>' +
        '<th>Text</th><th class="n">called relevant</th><th>most chosen labels</th>' +
        '</tr></thead><tbody>' +
        pc.map(function (x, n) {
          var c = D.chunks[n];
          var split = x.answered && x.relevant > 0 && x.relevant < x.answered;
          return '<tr><td class="n">' + (n + 1) + '</td>' +
            '<td style="max-width:280px">' + esc(c.text_en.slice(0, 110)) + '&hellip;' +
            (c.key && c.key.length ? '' : '<div class="small">model: no label</div>') + '</td>' +
            '<td class="n' + (split ? ' miss' : '') + '">' + x.relevant + ' / ' + x.answered + '</td>' +
            '<td>' + (x.picks.slice(0, 4).map(function (p) {
              return '<span class="tag">' + esc(p.path.split('|')[2]) + ' &times;' + p.n + '</span>';
            }).join('') || '<span class="small">none</span>') + '</td></tr>';
        }).join('') + '</tbody></table>' +
        '<p class="small">Rows where the group split on relevance are the ones worth ' +
        'reading out loud. They show where the research question is ambiguous, not where ' +
        'somebody made a mistake.</p>';
    }

    main.innerHTML =
      '<div class="wrap">' +
      '<h2>Facilitator &mdash; group agreement</h2>' +
      '<div class="row" style="margin:0 0 16px">' +
      '<input type="file" id="files" multiple accept=".json,.csv,.txt" style="flex:1">' +
      '<button class="ghost" id="clr">Clear</button>' +
      '<button class="ghost" id="exit">Back</button></div>' +
      '<div id="loaded" class="small" style="margin-bottom:14px">' +
        (people.length ? 'Loaded: ' + people.map(function (p) { return esc(p.name); }).join(', ')
                       : 'No files loaded yet.') +
      '</div>' + body + '</div>';

    document.getElementById('files').onchange = function (e) {
      var fs = Array.prototype.slice.call(e.target.files), left = fs.length, errs = [];
      if (!left) return;
      fs.forEach(function (f) {
        var rd = new FileReader();
        rd.onload = function () {
          try {
            var got = S.importText(String(rd.result), D.taxonomy, D.hltps);
            got.people.forEach(function (p) {
              if (!p.name) p.name = f.name.replace(/\.[^.]+$/, '');
              people = people.filter(function (q) { return q.name !== p.name; });
              people.push(p);
            });
          } catch (err) { errs.push(f.name + ': ' + err.message); }
          if (!--left) { if (errs.length) alert(errs.join('\n')); viewFac(); }
        };
        rd.onerror = function () { errs.push(f.name + ': could not be read'); if (!--left) viewFac(); };
        rd.readAsText(f);
      });
    };
    document.getElementById('clr').onclick = function () { people = []; viewFac(); };
    document.getElementById('exit').onclick = function () {
      st.name ? (st.done ? viewResults() : viewAnnotate()) : viewLogin();
    };
  }

  // ------------------------------------------------------------- startup
  document.getElementById('btnFac').onclick = viewFac;
  header();
  if (!st.name) viewLogin();
  else if (st.done) viewResults();
  else viewAnnotate();
})();
