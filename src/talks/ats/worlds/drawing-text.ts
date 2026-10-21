export function wrapLabel(text: string, width: number, size = 26): string[] {
  const max = Math.floor(width / (size * 0.56));
  return text.split(" ").reduce<string[]>((lines,word)=>{
    const last=lines.at(-1);
    if(last && last.length+word.length+1<=max) lines[lines.length-1]+=` ${word}`;
    else lines.push(word);
    return lines;
  },[]);
}
