const card=document.getElementById("card");
const choices=document.querySelectorAll(".choice");
const game=document.getElementById("game");
const deck=document.getElementById("deck");
const targetEl=document.getElementById("target");
const message=document.getElementById("message");
const reset=document.getElementById("reset");

const sets={low:[1,2,3,4],high:[99,77,33,11]};
let currentSet=[],target=null,locked=false;

card.addEventListener("click",e=>{
  if(e.target.closest("button"))return;
  card.classList.toggle("flipped");
});

choices.forEach(btn=>{
  btn.addEventListener("click",()=>{
    currentSet=[...sets[btn.dataset.set]];
    shuffle(currentSet);
    target=currentSet[Math.floor(Math.random()*currentSet.length)];
    targetEl.textContent=target;
    renderDeck();
    game.classList.remove("hidden");
    choices.forEach(b=>b.classList.add("hidden"));
    message.textContent="Selecciona la tarjeta donde crees que está el número.";
    message.className="message";
    locked=false;
  });
});

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
}

function renderDeck(){
  deck.innerHTML="";
  currentSet.forEach((number,index)=>{
    const car=document.createElement("button");
    car.className="car";
    car.setAttribute("aria-label","Tarjeta "+(index+1));
    car.innerHTML=`<span class="label">GTA_BOGOTA</span><span class="number">${number}</span>`;
    car.addEventListener("click",()=>select(car,number));
    deck.appendChild(car);
  });
}

function select(car,number){
  if(locked)return;
  locked=true;

  document.querySelectorAll(".car").forEach(c=>c.classList.add("revealed"));

  if(number===target){
    car.classList.add("correct");
    message.textContent="¡Correcto! App creada desde la universidad junto con el conocimiento del profesor DAVID RUGELES.";
    message.className="message win";
  }else{
    car.classList.add("wrong");
    message.textContent="Intento incorrecto. Pulsa Reiniciar para jugar otra vez.";
    message.className="message lose";
    reset.classList.remove("hidden");
  }
}

reset.addEventListener("click",()=>{
  choices.forEach(b=>b.classList.remove("hidden"));
  game.classList.add("hidden");
  reset.classList.add("hidden");
  deck.innerHTML="";
  targetEl.textContent="";
  message.textContent="";
});