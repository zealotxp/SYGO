// Minimal DOM stub to execute app.js init paths per page and catch runtime errors.
const fs = require('fs');
const vm = require('vm');
const appjs = fs.readFileSync('js/app.js', 'utf8');

function FakeEl(tag) {
  this.tag = tag || 'div';
  this._id = '';
  this.className = '';
  this.style = {};
  this.dataset = {};
  this._text = '';
  this._html = '';
  this.children = [];
  this.attrs = {};
  this.onclick = null;
  const self = this;
  this.classList = {
    add(c){ if(!self.className.split(' ').includes(c)) self.className = (self.className+' '+c).trim(); },
    remove(c){ self.className = self.className.split(' ').filter(x=>x&&x!==c).join(' '); },
    toggle(c,on){ if(on===undefined){ self.classList.contains(c)?self.classList.remove(c):self.classList.add(c);} else { on?self.classList.add(c):self.classList.remove(c);} },
    contains(c){ return self.className.split(' ').includes(c); }
  };
}
Object.defineProperty(FakeEl.prototype, 'textContent', {
  get(){ return this._text; }, set(v){ this._text = String(v); }
});
Object.defineProperty(FakeEl.prototype, 'innerHTML', {
  get(){ return this._html; }, set(v){ this._html = String(v); }
});
FakeEl.prototype.setAttribute = function(k,v){ this.attrs[k]=v; };
FakeEl.prototype.getAttribute = function(k){ return this.attrs[k] ?? null; };
FakeEl.prototype.appendChild = function(c){ this.children.push(c); return c; };
FakeEl.prototype.addEventListener = function(){};
FakeEl.prototype.querySelector = function(sel){
  // return a stub element (id-based or class-based) so chains don't crash
  if (sel.indexOf('#') !== -1) {
    const id = sel.split('#')[1].split(' ')[0].split('.')[0];
    return getEl(id);
  }
  return new FakeEl();
};
FakeEl.prototype.querySelectorAll = function(){ return []; };

const registry = {};
function getEl(id){ if(!registry[id]){ const e=new FakeEl(); e._id=id; registry[id]=e; } return registry[id]; }

let domReady = null;
const document = {
  getElementById: (id)=>getEl(id),
  querySelector: (sel)=>{ if(sel.indexOf('#')!==-1){ const id=sel.split('#')[1].split(' ')[0].split('.')[0]; return getEl(id);} return new FakeEl(); },
  querySelectorAll: ()=>[],
  createElement: (t)=>new FakeEl(t),
  addEventListener: (ev,cb)=>{ if(ev==='DOMContentLoaded') domReady = cb; },
  body: new FakeEl('body')
};
document.body.dataset.page = 'home';

const ctx = {
  document,
  window: { L: undefined },
  location: { search: '' },
  history: { length: 2, back(){} },
  sessionStorage: { _d:{}, getItem(k){return this._d[k]||null;}, setItem(k,v){this._d[k]=v;}, removeItem(k){delete this._d[k];} },
  URLSearchParams,
  setTimeout: (fn)=>{ /* don't actually run timers */ return 0; },
  setInterval: ()=>0,
  alert: ()=>{},
  console
};
ctx.window.document = document;
vm.createContext(ctx);
vm.runInContext(appjs, ctx);

const pages = ['home','search','drug-detail','merchant-detail','appointment','map-picker','my-appointments','profile','all-drugs','all-merchants','about','privacy','agreement','login'];
// also test detail pages with an id param (simulate ?id=3)
const paramCases = { 'drug-detail':'?id=3', 'merchant-detail':'?id=2', 'appointment':'?drug=3&merchant=1' };
let fail = 0;
for (const p of pages) {
  document.body.dataset.page = p;
  ctx.location.search = paramCases[p] || '';
  // reset registry for isolation
  for (const k in registry) delete registry[k];
  try {
    if (domReady) domReady();
    console.log('OK  ', p, ctx.location.search);
  } catch(e) {
    fail++;
    console.log('FAIL', p, '->', e.message);
  }
}
console.log(fail === 0 ? 'ALL INIT PATHS OK' : (fail + ' PAGE(S) FAILED'));
