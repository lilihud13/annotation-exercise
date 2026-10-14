/* Unit tests for scoring.js.   Run:  node tests.js   */
var S = require('./scoring.js');

var pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra === undefined ? '' : '   -> ' + JSON.stringify(extra))); }
}
function near(a, b) { return a !== null && b !== null && Math.abs(a - b) < 1e-9; }
function L(h, l2, l3, conf) { return { h: h, l2: l2, l3: l3, conf: conf || null }; }

var chunks = [
  { id: 'c1', key: [L('Tech', 'Drones', 'FPV', 80)] },
  { id: 'c2', key: [] },
  { id: 'c3', key: [L('Tech', 'Drones', 'FPV', 70), L('Actor', 'MoD', 'USF', 60)] }
];
function A(o) { return o; }

console.log('\nproject / levels');
ok('dim', S.project(L('Tech', 'Drones', 'FPV'), 'dim') === 'Tech');
ok('sub', S.project(L('Tech', 'Drones', 'FPV'), 'sub') === 'Tech|Drones');
ok('leaf', S.project(L('Tech', 'Drones', 'FPV'), 'leaf') === 'Tech|Drones|FPV');

console.log('\npooledF1');
var perfect = A({ c1: { status: 'labels', labels: [L('Tech', 'Drones', 'FPV', 4)] },
                  c2: { status: 'none', labels: [] },
                  c3: { status: 'labels', labels: [L('Tech', 'Drones', 'FPV', 5), L('Actor', 'MoD', 'USF', 3)] } });
ok('identical answers -> F1 = 1 at leaf',
   near(S.pooledF1(chunks, function (c) { return S.labelsOf(perfect, c.id); },
                   function (c) { return c.key; }, 'leaf').f1, 1));

var wrongLeaf = A({ c1: { status: 'labels', labels: [L('Tech', 'Drones', 'Fixed-wing', 4)] },
                    c2: { status: 'none', labels: [] },
                    c3: { status: 'labels', labels: [L('Tech', 'Drones', 'Fixed-wing', 4), L('Actor', 'MoD', 'USF', 4)] } });
var wl = function (c) { return S.labelsOf(wrongLeaf, c.id); }, mk = function (c) { return c.key; };
ok('same subcategory, wrong leaf -> sub F1 = 1', near(S.pooledF1(chunks, wl, mk, 'sub').f1, 1));
ok('same subcategory, wrong leaf -> leaf F1 < 1', S.pooledF1(chunks, wl, mk, 'leaf').f1 < 1);
ok('dim F1 = 1 as well', near(S.pooledF1(chunks, wl, mk, 'dim').f1, 1));

console.log('\nF1 arithmetic');
// c1: human {FPV, X} vs model {FPV} -> overlap 1, |A|=2 |B|=1
var partial = A({ c1: { status: 'labels', labels: [L('Tech', 'Drones', 'FPV'), L('Tech', 'EW', 'Jammer')] },
                  c2: { status: 'none', labels: [] },
                  c3: { status: 'labels', labels: [L('Tech', 'Drones', 'FPV'), L('Actor', 'MoD', 'USF')] } });
var r = S.pooledF1(chunks, function (c) { return S.labelsOf(partial, c.id); }, mk, 'leaf');
// overlap 1+0+2 = 3 ; sizeA 2+0+2 = 4 ; sizeB 1+0+2 = 3  -> 2*3/(4+3) = 6/7
ok('pooled F1 = 6/7', near(r.f1, 6 / 7), r.f1);

console.log('\nrelevance + Cohen kappa');
var rel = S.relevance(chunks, function (c) { return S.labelsOf(perfect, c.id); }, mk);
ok('relevance 100% (pct is 0-100)', near(rel.pct, 100) && near(rel.rate, 1), rel);
ok('kappa is 1 or null when one cell is empty', rel.kappa === null || near(rel.kappa, 1), rel.kappa);
ok('cohen on a balanced table', near(S.cohen(5, 0, 0, 5), 1), S.cohen(5, 0, 0, 5));
ok('cohen = 0 at chance', near(S.cohen(25, 25, 25, 25), 0), S.cohen(25, 25, 25, 25));

console.log('\nvsModel');
var vm = S.vsModel(chunks, perfect);
ok('leaf F1 = 1', near(vm.levels.leaf.f1, 1));
ok('mean confidence on matched labels', near(vm.confMatched, (4 + 5 + 3) / 3), vm.confMatched);
ok('no unmatched labels', vm.nUnmatched === 0);

console.log('\ngroup + Fleiss');
var g = S.group(chunks, [{ name: 'a', answers: perfect }, { name: 'b', answers: perfect },
                         { name: 'c', answers: perfect }]);
ok('mean pairwise F1 = 1', near(g.meanF1.leaf, 1), g.meanF1);
ok('matrix is n x n with null diagonal', g.matrix.length === 3 && g.matrix[0][0] === null);
var g2 = S.group(chunks, [{ name: 'a', answers: perfect }, { name: 'b', answers: wrongLeaf }]);
ok('disagreement lowers leaf F1', g2.meanF1.leaf < 1 && g2.meanF1.sub === 1, g2.meanF1);
ok('Fleiss runs on relevance', g.fleiss === null || typeof g.fleiss.observed === 'number');

console.log('\nperChunk');
var pc = S.perChunk(chunks, [{ name: 'a', answers: perfect }, { name: 'b', answers: wrongLeaf }]);
ok('c2 marked irrelevant by both', pc[1].answered === 2 && pc[1].relevant === 0, pc[1]);
ok('c1 picks counted', pc[0].picks.length === 2, pc[0].picks);

console.log('\nCSV round trip');
var taxonomy = [['Tech', 'Drones', 'FPV'], ['Tech', 'Drones', 'Fixed-wing'],
                ['Tech', 'EW', 'Jammer'], ['Actor', 'MoD', 'USF']];
var hltps = ['Tech', 'Actor'];
var csv = S.toLongCsv('Liliia', chunks, perfect);
var back = S.importText(csv, taxonomy, hltps);
ok('one person back', back.people.length === 1 && back.people[0].name === 'Liliia', back.people.length);
var rt = S.vsModel(chunks, back.people[0].answers);
ok('round trip preserves leaf F1', near(rt.levels.leaf.f1, 1), rt.levels.leaf.f1);
ok('round trip preserves "no labels" on c2',
   back.people[0].answers.c2 && back.people[0].answers.c2.status === 'none',
   back.people[0].answers.c2);
ok('round trip preserves confidence', near(rt.confMatched, (4 + 5 + 3) / 3), rt.confMatched);

console.log('\nJSON import');
var j = JSON.stringify({ annotator: 'Bob', answers: perfect });
ok('json import', S.importText(j, taxonomy, hltps).people[0].name === 'Bob');

console.log('\nedge cases');
ok('no answers -> F1 null',
   S.pooledF1(chunks, function () { return null; }, mk, 'leaf').f1 === null);
var allEmpty = A({ c1: { status: 'none', labels: [] }, c2: { status: 'none', labels: [] },
                   c3: { status: 'none', labels: [] } });
var ae = S.pooledF1(chunks, function (c) { return S.labelsOf(allEmpty, c.id); }, mk, 'leaf');
ok('human labels nothing -> F1 = 0, not a crash', ae.f1 === 0 || ae.f1 === null, ae);
ok('bad format throws', (function () {
  try { S.importText('a,b\n1,2', taxonomy, hltps); return false; } catch (e) { return true; }
})());

console.log('\n' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail ? 1 : 0);
