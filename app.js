'use strict';
const $=id=>document.getElementById(id);
const words=window.CHARADAS_WORDS;
let deck=[],index=0,score=0,skips=0,remaining=90,ticker=null,playing=false;
let motionEnabled=false,neutral=null,lastTilt=0,tiltArmed=true;
const categories=['Todas',...Object.keys(words)];
$('category').innerHTML=categories.map(c=>`<option value="${c}">${c}</option>`).join('');
function show(id){['setup','game','results'].forEach(x=>$(x).classList.toggle('hidden',x!==id));}
function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function buildDeck(){const category=$('category').value,level=$('difficulty').value;return shuffle(Object.entries(words).filter(([k])=>category==='Todas'||k===category).flatMap(([,items])=>items.filter(([,d])=>level==='all'||level===d).map(([text])=>text)));}
function nextWord(){if(index>=deck.length){deck=shuffle([...deck]);index=0;}if(!deck.length){finish();return;}$('word').textContent=deck[index++];}
function start(){clearInterval(ticker);deck=buildDeck();if(!deck.length){alert('No hay palabras para esta combinación. Elige otra dificultad.');return;}index=0;score=0;skips=0;remaining=Number($('duration').value);playing=true;neutral=null;tiltArmed=true;lastTilt=0;$('score').textContent=score;$('skips').textContent=skips;$('timer').textContent=remaining;show('game');nextWord();ticker=setInterval(()=>{remaining--;$('timer').textContent=remaining;if(remaining<=0)finish();},1000);}
function answer(correct){if(!playing)return;if(correct){$('score').textContent=++score;}else{$('skips').textContent=++skips;}nextWord();}
function finish(){if(!playing)return;playing=false;clearInterval(ticker);$('finalScore').textContent=score;$('finalSkips').textContent=`Palabras pasadas: ${skips}`;show('results');}
$('start').addEventListener('click',start);$('correct').addEventListener('click',()=>answer(true));$('pass').addEventListener('click',()=>answer(false));$('end').addEventListener('click',finish);$('again').addEventListener('click',start);$('home').addEventListener('click',()=>show('setup'));
// DeviceOrientation requiere HTTPS y permiso en algunos navegadores (iPhone).
function orientation(e){if(!motionEnabled||!playing||typeof e.beta!=='number')return;const now=Date.now();if(neutral===null){neutral=e.beta;return;}let diff=e.beta-neutral; // el ángulo cambia según cómo se sostenga el móvil
if(Math.abs(diff)<15){tiltArmed=true;return;}if(!tiltArmed||now-lastTilt<900||Math.abs(diff)<35)return;
tiltArmed=false;lastTilt=now;answer(diff>0);}
$('motion').addEventListener('click',async()=>{if(!('DeviceOrientationEvent' in window)){$('motionStatus').textContent='Este navegador no admite detección de inclinación. Usa los botones.';return;}try{if(typeof DeviceOrientationEvent.requestPermission==='function'){const permission=await DeviceOrientationEvent.requestPermission();if(permission!=='granted')throw Error('Permiso denegado');}if(!motionEnabled){window.addEventListener('deviceorientation',orientation);motionEnabled=true;}$('motionStatus').textContent='Movimiento activado. Mantén el teléfono en posición inicial y vuelve a ella entre respuestas. Si el sentido queda invertido, usa los botones.';}catch(e){$('motionStatus').textContent='No se pudo activar el movimiento: '+e.message+'. Usa los botones.';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){finish();}});
