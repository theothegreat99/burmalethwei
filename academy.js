'use strict';
const topics = [
 ['heritage','History','Burmese sporting heritage','Explore Lethwei as a traditional Myanmar sporting practice and cultural institution.'],
 ['limbs','Terminology','The nine limbs','The nickname refers to the sport’s use of fists, elbows, knees, feet and the head.'],
 ['punch','Terminology','Punches','Jab, cross, hook and overhand are common names in striking-sport vocabulary.'],
 ['kick','Terminology','Kicks','Round kick and push kick are terms used in the sport.'],
 ['close','Terminology','Close-range vocabulary','Elbows, knees, headbutts and clinches are categories of sporting actions. Head contact carries serious injury risks.'],
 ['balance','Terminology','Footwork and balance','Footwork, defensive movement, sweeps and throws appear in discussions of the sport. Rules vary by event.'],
 ['yay','Ceremony','Lethwei Yay','A traditional ceremonial performance associated with Lethwei events.'],
 ['respect','Ceremony','Let Oat Chi','A joined-palms gesture of respect.'],
 ['lekkha','Ceremony','Lekkha Moun','A traditional gesture associated with Lethwei culture.'],
 ['rules','Wellbeing','Rules and athlete welfare','Competition rules differ by organizer. Qualified officials and medical supervision are important.'],
 ['health','Wellbeing','Head injury awareness','Suspected concussion requires stopping activity and obtaining medical assessment.']
];
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
const saved=read('bl-academy-read',[]);const done=new Set(Array.isArray(saved)?saved:[]);let filter='All';
const filters=document.querySelector('#filters'),grid=document.querySelector('#topics'),progress=document.querySelector('#ac-progress');
function render(){filters.replaceChildren();for(const name of ['All','History','Terminology','Ceremony','Wellbeing']){const b=document.createElement('button');b.textContent=name;b.setAttribute('aria-pressed',String(filter===name));b.onclick=()=>{filter=name;render();};filters.append(b);}grid.replaceChildren();for(const [id,category,title,description] of topics.filter(t=>filter==='All'||t[1]===filter)){const card=document.createElement('article');card.className='ac-topic';const label=document.createElement('small');label.textContent=category;const h=document.createElement('h3');h.textContent=title;const p=document.createElement('p');p.textContent=description;const b=document.createElement('button');b.className='btn';b.textContent=done.has(id)?'✓ Read — undo':'Mark as read';b.onclick=()=>{done.has(id)?done.delete(id):done.add(id);const ok=write('bl-academy-read',[...done]);render();if(!ok)progress.textContent+=' (Not saved: browser storage unavailable.)';};card.append(label,h,p,b);grid.append(card);}progress.textContent=`${topics.filter(t=>done.has(t[0])).length} of ${topics.length} topics read`;}
render();const status=document.querySelector('#interest-status');if(read('bl-academy-interest',false))status.textContent='Interest saved on this device.';document.querySelector('#interest-button').onclick=()=>{status.textContent=write('bl-academy-interest',true)?'Interest saved on this device. No data has been sent.':'Browser storage is unavailable.';};
