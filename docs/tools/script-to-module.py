#!/usr/bin/env python3
"""Regenerates src/talks/ats/script/part-*.ts from docs/ats-talk-script.md.
Run after any change to the script doc: `python3 docs/tools/script-to-module.py`.
The picture ids and worlds are the table below; script.test.ts holds the same plan."""
import re, json, os, sys
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
doc = open(os.path.join(ROOT, 'docs/ats-talk-script.md')).read().replace('&amp;', '&')
IDS = {'1':'title','2':'world-moved','3':'position','4':'exists','4a':'fleet','5':'ladder','6':'talent','7':'enforce','8':'incidents',
 '9':'not-proposing','10':'people','11':'listen','12':'sort','13':'lanes','14':'level-up','15':'outcomes',
 '16':'levels','17':'who-decides','18':'residents','19':'decisions','20':'lets-talk'}
WORLD = {'1':'stand','2':'stand','3':'stand','4':'stand','4a':'stand','5':'taught','6':'taught','7':'taught','8':'taught',
 '9':'method','10':'method','11':'method','12':'method','13':'plan','14':'plan','15':'plan',
 '16':'ready','17':'ready','18':'ready','19':'ready','20':'ready'}
FILES = {1:('part-1-where-the-city-stands','WHERE_THE_CITY_STANDS'),2:('part-2-what-the-course-taught','WHAT_THE_COURSE_TAUGHT'),3:('part-3-what-we-would-do-first','WHAT_WE_WOULD_DO_FIRST'),4:('part-4-when-agents-come','WHEN_AGENTS_COME')}
parts=[]; pics=[]; part=0; field=''
for line in doc.split('\n'):
    ph=re.match(r'^## Part (\d)\. (.*) \(about (\d+) minutes\)$',line)
    if line.startswith('## '):
        part=int(ph[1]) if ph else 0
        if ph: parts.append((ph[2],int(ph[3])))
        field=''
    h=re.match(r'^### (\d+[a-z]?)\. (.*)$',line)
    if part and h:
        pics.append(dict(part=part,number=h[1],name=re.sub(r' \((new|two clicks)\)$','',h[2]),see=[],story=[])); field=''; continue
    if not part or not pics: continue
    p=pics[-1]
    o=re.match(r'^\*\*(On screen|You say|They see):\*\*\s*(.*)$',line); b=re.match(r'^- (.*)$',line)
    if o:
        field=o[1]
        if field=='On screen': p['show']=o[2]
        elif field=='You say': p['say']=o[2]
        elif o[2]: p['see'].append(o[2])
    elif field=='On screen' and b: p['story'].append(re.sub(r' \*\(click \d\)\*$','',b[1]))
    elif field=='They see' and b: p['see'].append(b[1])
def quoted(see):
    out=[]
    for m in re.finditer(r'"([^"]+)"',' '.join(see)):
        if m[1] not in out: out.append(m[1])
    return out
ts=lambda s: json.dumps(s, ensure_ascii=False)
order=['stand','taught','method','plan','ready']
for n,(fn,const) in FILES.items():
    ps=[p for p in pics if p['part']==n]
    worlds=sorted({WORLD[p['number']] for p in ps}, key=order.index)
    out=['import type { Picture } from "./types";','',f'/** Part {n}. {parts[n-1][0]}: slides {ps[0]["number"]} to {ps[-1]["number"]}, drawn in {"the world" if len(worlds)==1 else "the worlds"} {" and ".join("`"+w+"`" for w in worlds)}. */',f'export const {const}: Picture[] = [']
    for p in ps:
        out += ['  {', f'    id: {ts(IDS[p["number"]])},', f'    number: {ts(p["number"])},', f'    part: {n},', f'    world: {ts(WORLD[p["number"]])},',
                f'    name: {ts(p["name"])},', f'    show: {ts(p["show"])},', f'    say: {ts(p["say"])},', f'    see: [{", ".join(ts(s) for s in p["see"])}],', '    story: [']
        out += [f'      {ts(s)},' for s in p['story']]
        out += ['    ],','    steps: [', f'      {{ id: "play", show: [{", ".join(ts(q) for q in quoted(p["see"]))}] }},', '    ],', '  },']
    out.append('];')
    open(os.path.join(ROOT, f'src/talks/ats/script/{fn}.ts'),'w').write('\n'.join(out)+'\n')
print(f'{len(pics)} pictures written')
