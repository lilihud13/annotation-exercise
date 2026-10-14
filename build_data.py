# -*- coding: utf-8 -*-
"""
Builds data.js for the annotation session app.

Inputs (all local):
  taxonomy   russia_drone_ew_taxonomy_v3.csv   (the taxonomy the model used)
  run        review_transparent_battlefield_1000.csv   (model labels + original text)
  english    translations.json                  (hand-checked English text per chunk)

The model's labels go into the KEY (shown to participants only after they
finish). Run:  python -I build_data.py
"""
import csv, json, os, re, sys
from collections import OrderedDict, defaultdict

csv.field_size_limit(10 ** 9)
sys.stdout.reconfigure(encoding='utf-8')

HERE = os.path.dirname(os.path.abspath(__file__))
DL = r'C:\Users\lilii\Downloads'
TAXONOMY = os.path.join(DL, 'russia_drone_ew_taxonomy_v3.csv')
RUN = os.path.join(DL, 'review_transparent_battlefield_1000.csv')
TRANSLATIONS = os.path.join(HERE, 'translations.json')
OUT = os.path.join(HERE, 'data.js')

# order in which participants see the chunks (TB chunk_id). Mix of easy/hard,
# labelled/unlabelled. 1, 676 and 678 are chunks the model left unlabelled.
ORDER = ['694', '1', '927', '697', '676', '684', '904', '678', '188', '679',
         '685', '700', '688', '943', '151']

# The real annotation prompt lives in annotation_prompt.txt. The 235-row
# taxonomy block is cut out of it for display (participants get it as dropdowns),
# so what they read is the instructions and nothing else.
PROMPT_FILE = os.path.join(HERE, 'annotation_prompt.txt')


def prompt_text():
    s = open(PROMPT_FILE, encoding='utf-8').read()
    a = s.index('HLTP,2nd Level TE,3rd Level TE')
    b = s.rindex('------', 0, s.index('DECISION RULES'))
    note = ('\n\n    [ the 235 taxonomy rows are omitted here — they are\n'
            '      the dropdowns you are filling in ]\n\n')
    cut = s[:a].rstrip() + note + s[b:]
    return re.sub(r'\n{3,}', '\n\n', cut).strip()


# The short version, shown above the full text. Wording follows the prompt.
RULES = [
    ('One label per dimension',
     'Look at each dimension separately and choose at most one third-level '
     'label for it.'),
    ('Only what the text says',
     'Give a label only when the text itself supports it. Do not infer from '
     'background knowledge what the text does not say.'),
    ('Do not force a fit',
     'If no element of a dimension applies, leave that dimension empty.'),
    ('Empty is a valid answer',
     'If no dimension applies at all, label nothing. The prompt says so '
     'explicitly, and the model did it for 581 of the 1,000 chunks in this run.'),
    ('What gets no labels',
     'Generic Ministry of Defence loss tallies, politics, humanitarian aid or '
     'ceremonial text with no substantive drone, EW, innovation or lessons '
     'content. That one sentence is the entire relevance rule.'),
    ('Confidence',
     'How certain you are, where the middle of the scale means a coin flip. '
     'Lower it when the text is short, ambiguous or lacks context. The model '
     'used 0-100; you have 1-5.'),
]

SUB_QUESTIONS = [
    'Who. Which state and non-state actors make up the ecosystem, and what role '
    'does each play?',
    'How it works. How does a drone or EW innovation move from a need at the '
    'front to a fielded system, and what slows it down?',
    'NATO countries. What NATO and Western militaries learn from this war, and '
    'how they develop, use and counter drones and EW themselves.',
]

# Facts about the run, from the group's own Methodenotitie (14 Oct 2026).
RUN_FACTS = [
    ('Model', 'Claude Sonnet 5.5, with no special settings - so not temperature 0.'),
    ('Taxonomy', '11 dimensions, 59 second-level and 235 third-level elements. '
                 '110 of the 235 were never used on this run, and 9 second-level '
                 'elements never appeared at all.'),
    ('Corpus', '1,000 chunks, all from January to March 2026. 85% news via the '
               'Integrum archive, 8% Telegram, 999 of 1,000 in Russian. No Ministry '
               'of Defence, Rostec or company sources at all.'),
    ('Empty results', '581 of the 1,000 chunks came back with no label. Nothing '
                      'failed technically - the model found nothing to attach.'),
    ('Known overlap', 'Two dimensions co-occur 94% of the time and three '
                      'second-level elements overlap completely. If two labels feel '
                      'as though they always go together, you are seeing something real.'),
]

# The group read ten of their own annotations and estimated how many they would
# label differently themselves. The fairest benchmark participants have.
BENCHMARK = 20


PLATFORM = [('telegram', 'Telegram'), ('integrum', 'News archive'), ('vk', 'VK'),
            ('bluesky', 'Bluesky'), ('evp', 'EVP-MIL')]


def platform(db):
    for k, v in PLATFORM:
        if db.lower().startswith(k):
            return v
    return db


def source_label(row):
    name = re.sub(r'\s*\(retrieved from:.*?\)\s*$', '', row['doc_source']).strip()
    return '%s · %s · %s' % (platform(row['doc_database']), name, row['doc_date'])


def main():
    tax = list(csv.DictReader(open(TAXONOMY, encoding='utf-8-sig', newline='')))
    taxonomy = [[r['HLTP'], r['2nd Level TE'], r['3rd Level TE']] for r in tax]
    leaves = [t[2] for t in taxonomy]
    dup = {l for l in leaves if leaves.count(l) > 1}
    assert not dup, 'third-level names are not unique: %s' % dup
    hltps = list(OrderedDict.fromkeys(t[0] for t in taxonomy))
    legal = set(map(tuple, taxonomy))

    by = defaultdict(list)
    for r in csv.DictReader(open(RUN, encoding='utf-8-sig', newline='')):
        by[r['chunk_id']].append(r)
    tr = json.load(open(TRANSLATIONS, encoding='utf-8'))

    chunks = []
    for cid in ORDER:
        rows = by[cid]
        head = rows[0]
        key = []
        for r in rows:
            if not r['HLTP']:
                continue
            path = (r['HLTP'], r['2nd_level'], r['3rd_level'])
            assert path in legal, 'model label not in taxonomy: %s' % (path,)
            key.append({'h': path[0], 'l2': path[1], 'l3': path[2],
                        'conf': int(r['confidence']), 'why': r['label_reasoning']})
        orig = re.sub(r'^https?://\S+\s*', '', head['chunk_content']).strip()
        english = tr.get(cid) or (orig if not re.search('[\u0400-\u04FF]', orig) else None)
        assert english, 'no English text for chunk %s' % cid
        chunks.append({'id': cid, 'source': source_label(head), 'text_en': english,
                       'text_orig': orig, 'translated': tr.get(cid) is not None,
                       'key': key, 'key_why': head['overall_reasoning']})

    data = {
        'sessionId': 'tb-2026-10-training',
        'group': 'Transparent Battlefield',
        'domain': 'Russian innovation cycle for EW/UAS in the Russia-Ukraine war',
        'researchQuestion': (
            'How did the Russian military innovation ecosystem around drones and electronic '
            'warfare (EW) make fast innovation possible between 2023 and 2026, and which of its '
            'mechanisms can NATO countries use to speed up their own innovation cycles?'),
        'subQuestions': SUB_QUESTIONS, 'hltps': hltps,
        'rules': RULES, 'promptText': prompt_text(),
        'runFacts': RUN_FACTS, 'benchmark': BENCHMARK,
        'taxonomy': taxonomy, 'chunks': chunks,
    }
    with open(OUT, 'w', encoding='utf-8') as fh:
        fh.write('window.SESSION = ' + json.dumps(data, ensure_ascii=False, indent=1) + ';\n')

    nlab = sum(1 for c in chunks if c['key'])
    print('taxonomy: %d paths, %d dimensions' % (len(taxonomy), len(hltps)))
    print('chunks: %d (%d with model labels, %d unlabelled)' % (len(chunks), nlab, len(chunks) - nlab))
    print('model labels per chunk:', [len(c['key']) for c in chunks])
    print('wrote', OUT, os.path.getsize(OUT), 'bytes')


if __name__ == '__main__':
    main()
