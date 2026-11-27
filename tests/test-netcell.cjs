// Run with: node tests/test-netcell.cjs
const assert=require('node:assert/strict');
const N=require('../netcell-deal.js');
const ranks='A23456789TJQK',suits='CDHS';
const labels=cards=>cards.map(c=>ranks[c>>2]+suits[c&3]);
const fixtures=[[12345,5,"KD 7S TH 4H JS 6D 2H"],[12345,9,"JD 8H TH JC 3H 8S 4S"],[12345,10,"JD 5S 4C 2S 9C 6D 5D"],[12345,11,"JD 9C JC JS 4S TC 5S"],[12346,10,"JD KD 6C 5D KS 6S 3S"],[12347,10,"JD 8C 5S 5H 4C 9S 4S"],[20000,10,"9H 7C 8D KC 3D 3H 5D"],[24680,11,"8H 9C 2S 8S 7H JS 6C"],[24680,12,"8H 9C 2S 3H 5S JD 9D"]];
for(const [seed,difficulty,firstColumn] of fixtures){
  assert.equal(labels(N.deal(seed,difficulty).columns[0]).join(' '),firstColumn);
}
for(let difficulty=5;difficulty<=12;difficulty++){
  for(const seed of [0,1,24680,32767]){
    const board=N.deal(seed,difficulty);
    assert.deepEqual(board.columns.flat().slice().sort((a,b)=>a-b),Array.from({length:52},(_,i)=>i));
    assert.equal(N.shuffled(seed,difficulty).length,52);
  }
}
for(const seed of [-1,32768,1.5])assert.throws(()=>N.deal(seed,10));
for(const difficulty of [4,13,7.5])assert.throws(()=>N.deal(12345,difficulty));
console.log('PASS 9 known website deals + all difficulty levels and range checks');
