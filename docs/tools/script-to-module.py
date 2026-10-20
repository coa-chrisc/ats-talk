#!/usr/bin/env python3
"""Regenerates src/talks/ats/script/part-*.ts from docs/ats-talk-script.md.
Run after any change to the script doc: `python3 docs/tools/script-to-module.py`.
The picture ids and worlds are the table below; script.test.ts holds the same plan."""
import re, json, os, sys
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
doc = open(os.path.join(ROOT, 'docs/ats-talk-script.md')).read().replace('&amp;', '&')
IDS = {'1':'title','2':'four-ideas','3':'spending','4':'agents','5':'fleet-defined','6':'stumbled',
 '7':'ladder','8':'enforce','9':'people','10':'earn',
 '11':'track','12':'exists','13':'infrastructure','14':'fits','15':'fleet',
 '16':'not-proposing','17':'consortium','18':'program-team','19':'listen','20':'sort','21':'lanes','22':'level-up','23':'outcomes',
 '24':'levels','25':'who-decides','26':'residents','27':'could-be','28':'applied','29':'lets-talk'}
WORLD = {}
for n in ['1','2']: WORLD[n]='brought'
for n in ['3','4','5','6']: WORLD[n]='enterprise'
for n in ['7','8','9','10']: WORLD[n]='ideas'
for n in ['11','12','13','14','15']: WORLD[n]='stands'
for n in ['16','17','18','19','20','21','22','23']: WORLD[n]='first'
for n in ['24','25','26','27','28','29']: WORLD[n]='ready'
FILES = {1:('part-1-what-we-brought-back','WHAT_WE_BROUGHT_BACK'),2:('part-2-where-enterprise-is','WHERE_ENTERPRISE_IS'),3:('part-3-the-four-ideas','THE_FOUR_IDEAS'),4:('part-4-where-the-city-stands','WHERE_THE_CITY_STANDS'),5:('part-5-what-we-would-do-first','WHAT_WE_WOULD_DO_FIRST'),6:('part-6-ready-the-ask-the-reveal','READY_THE_ASK_THE_REVEAL')}
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
order=['brought','enterprise','ideas','stands','first','ready']
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
