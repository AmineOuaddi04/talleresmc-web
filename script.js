const services={
  mecanica:{kicker:'01 / MECÁNICA GENERAL',description:'Revisiones, puesta a punto y reparación de averías. De los frenos al motor, miramos lo que necesita tu vehículo para que siga en marcha.',image:'./assets/taller1.jpg',alt:'Interior real de Talleres MC con vehículos en elevadores',subject:'mecánica'},
  chapa:{kicker:'02 / CHAPA Y PINTURA',description:'Un golpe cambia la carrocería, no tus planes. Trabajamos chapa y pintura para devolver a tu coche su forma y acabado.',image:'./assets/lavado.jpg',alt:'Cabina de pintura real de Talleres MC',subject:'chapa y pintura'},
  electricidad:{kicker:'03 / ELECTRICIDAD DEL AUTOMÓVIL',description:'Luces, arranque y sistemas eléctricos: localizamos la incidencia y nos ocupamos de la reparación que corresponda.',image:'./assets/taller3.jpg',alt:'Vista real de la zona de reparación de Talleres MC',subject:'electricidad del automóvil'},
  neumaticos:{kicker:'04 / NEUMÁTICOS',description:'El contacto con la carretera empieza por las ruedas. Revisamos su estado y te ayudamos con la sustitución cuando hace falta.',image:'./assets/mantenimiento.jpg',alt:'Vehículos en el área de mantenimiento de Talleres MC',subject:'neumáticos'}
};
const tabs=[...document.querySelectorAll('.service-item')];
const panel=document.getElementById('service-panel');
const serviceImage=document.getElementById('service-image');
const serviceKicker=document.getElementById('service-kicker');
const serviceDescription=document.getElementById('service-description');
const serviceContact=document.getElementById('service-contact');
let serviceTimer;
function activateService(key,focus=false){
  const data=services[key];if(!data)return;
  const tab=tabs.find(item=>item.dataset.service===key);
  tabs.forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1});
  panel.setAttribute('aria-labelledby',tab.id);
  panel.classList.add('changing');clearTimeout(serviceTimer);
  serviceTimer=setTimeout(()=>{serviceImage.src=data.image;serviceImage.alt=data.alt;serviceKicker.textContent=data.kicker;serviceDescription.textContent=data.description;serviceContact.href=`mailto:talleresmc@ymail.com?subject=${encodeURIComponent('Consulta sobre '+data.subject)}`;panel.classList.remove('changing')},150);
  if(focus)tab.focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateService(tab.dataset.service));
  tab.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else next=(index+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;activateService(tabs[next].dataset.service,true)});
});
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');document.body.classList.toggle('menu-open',open)});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');document.body.classList.remove('menu-open')}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('menu-open')){menuButton.click();menuButton.focus()}});
const header=document.querySelector('.site-header');
function updateScroll(){header.classList.toggle('scrolled',window.scrollY>45);const statement=document.querySelector('.statement');const rect=statement.getBoundingClientRect();if(rect.top<innerHeight&&rect.bottom>0)statement.style.setProperty('--statement-shift',`${Math.round((innerHeight-rect.top)*.035)}px`)}
window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.11,rootMargin:'0px 0px -25px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
