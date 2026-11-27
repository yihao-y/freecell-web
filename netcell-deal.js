/*
 * Locally reconstructed Freecell.net (NetCELL) numbered deals, 8x4.
 * Reverse engineered against public responses, not copied from server code.
 * The difficulty>10 threshold is an empirical fit to observed deals.
 */
(function(root){
  'use strict';
  const UINT32=4294967296;
  const INITIAL_DECK=[];
  for(let rank=12;rank>=0;rank--){
    for(const suit of [2,3,1,0])INITIAL_DECK.push((rank<<2)|suit); // H,S,D,C
  }
  function shuffled(seed,difficulty=10){
    if(!Number.isInteger(seed)||seed<0||seed>32767)throw new RangeError('NetCELL 编号须在 0–32767');
    if(!Number.isInteger(difficulty)||difficulty<5||difficulty>12)throw new RangeError('NetCELL 难度须在 5–12');
    let state=seed>>>0;
    const next=()=>{state=(Math.imul(state,69069)+1)>>>0;return state;};
    const available=INITIAL_DECK.slice(),result=[];
    for(let remain=52;remain>0;remain--){
      let index=Math.floor(next()*remain/UINT32);
      if(difficulty!==10){
        const check=next(),delta=Math.abs(difficulty-10),divisor=difficulty>10?11:10;
        if(divisor*check>(divisor-delta)*UINT32){
          index=Math.floor(index*next()/UINT32);
          if(difficulty>10)index=remain-1-index;
        }
      }
      result.push(available.splice(index,1)[0]);
    }
    return result;
  }
  function deal(seed,difficulty=10){
    const columns=Array.from({length:8},()=>[]);
    shuffled(seed,difficulty).forEach((card,i)=>columns[i%8].push(card));
    return {columns,free:[null,null,null,null],freeOrder:[],found:[0,0,0,0]};
  }
  const api=Object.freeze({shuffled,deal});
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.NetCellDeals=api;
})(typeof window!=='undefined'?window:globalThis);
